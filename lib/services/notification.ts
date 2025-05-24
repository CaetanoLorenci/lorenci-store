const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL;
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const STORE_PHONE = process.env.STORE_PHONE;

interface SendMessageParams {
  to: string;
  message: string;
}

interface OrderNotificationParams {
  orderId: string;
  customerName: string;
  customerPhone: string;
  total: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

interface LowStockNotificationParams {
  productName: string;
  currentStock: number;
  minStock: number;
}

export async function sendWhatsAppMessage({
  to,
  message,
}: SendMessageParams): Promise<void> {
  const response = await fetch(`${WHATSAPP_API_URL}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: {
        body: message,
      },
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to send WhatsApp message');
  }
}

export async function sendOrderNotification({
  orderId,
  customerName,
  customerPhone,
  total,
  items,
}: OrderNotificationParams): Promise<void> {
  // Notificar o cliente
  const customerMessage = `
🎉 *Pedido Confirmado!*
Olá ${customerName}, seu pedido #${orderId} foi recebido com sucesso!

📦 *Itens do Pedido:*
${items.map(item => `- ${item.name} (${item.quantity}x) - R$ ${item.price.toFixed(2)}`).join('\n')}

💰 *Total: R$ ${total.toFixed(2)}*

Acompanhe seu pedido pelo WhatsApp ou pelo site.
Em caso de dúvidas, entre em contato conosco.
  `.trim();

  await sendWhatsAppMessage({
    to: customerPhone,
    message: customerMessage,
  });

  // Notificar a loja
  const storeMessage = `
🛍️ *Novo Pedido Recebido!*
Pedido #${orderId}

👤 *Cliente:* ${customerName}
📱 *Telefone:* ${customerPhone}

📦 *Itens:*
${items.map(item => `- ${item.name} (${item.quantity}x) - R$ ${item.price.toFixed(2)}`).join('\n')}

💰 *Total: R$ ${total.toFixed(2)}*

Acesse o painel administrativo para mais detalhes.
  `.trim();

  await sendWhatsAppMessage({
    to: STORE_PHONE!,
    message: storeMessage,
  });
}

export async function sendLowStockNotification({
  productName,
  currentStock,
  minStock,
}: LowStockNotificationParams): Promise<void> {
  const message = `
⚠️ *Alerta de Estoque Baixo!*
O produto "${productName}" está com estoque baixo.

📊 *Situação Atual:*
- Estoque atual: ${currentStock} unidades
- Estoque mínimo: ${minStock} unidades

Por favor, verifique o estoque e faça a reposição se necessário.
  `.trim();

  await sendWhatsAppMessage({
    to: STORE_PHONE!,
    message,
  });
}

export async function sendOrderStatusUpdate(
  orderId: string,
  customerPhone: string,
  status: string,
  trackingCode?: string
): Promise<void> {
  let message = `
📦 *Atualização do Pedido #${orderId}*
Status: ${status}
  `.trim();

  if (trackingCode) {
    message += `\n\n📮 *Código de Rastreio:* ${trackingCode}`;
  }

  await sendWhatsAppMessage({
    to: customerPhone,
    message,
  });
} 