import { Payment, PaymentMethod } from '../types/order';

const MERCADOPAGO_API_URL = process.env.MERCADOPAGO_API_URL;
const MERCADOPAGO_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;

interface CreatePaymentParams {
  amount: number;
  method: PaymentMethod;
  installments?: number;
  customer: {
    email: string;
    name: string;
  };
  description: string;
}

export async function createPayment({
  amount,
  method,
  installments,
  customer,
  description,
}: CreatePaymentParams): Promise<Payment> {
  const response = await fetch(`${MERCADOPAGO_API_URL}/v1/payments`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      transaction_amount: amount,
      description,
      payment_method_id: method,
      payer: {
        email: customer.email,
        first_name: customer.name.split(' ')[0],
        last_name: customer.name.split(' ').slice(1).join(' '),
      },
      installments: method === 'credit_card' ? installments : 1,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create payment');
  }

  const data = await response.json();

  return {
    method,
    status: 'pending',
    transactionId: data.id,
    pixCode: method === 'pix' ? data.point_of_interaction.transaction_data.qr_code : undefined,
    boletoUrl: method === 'boleto' ? data.transaction_details.external_resource_url : undefined,
  };
}

export async function getPaymentStatus(paymentId: string): Promise<Payment['status']> {
  const response = await fetch(`${MERCADOPAGO_API_URL}/v1/payments/${paymentId}`, {
    headers: {
      'Authorization': `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get payment status');
  }

  const data = await response.json();

  switch (data.status) {
    case 'approved':
      return 'approved';
    case 'rejected':
      return 'rejected';
    default:
      return 'pending';
  }
} 