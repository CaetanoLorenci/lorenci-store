import { Shipping, ShippingMethod } from '../types/order';

const CORREIOS_API_URL = process.env.CORREIOS_API_URL;
const MELHOR_ENVIO_API_URL = process.env.MELHOR_ENVIO_API_URL;
const MELHOR_ENVIO_TOKEN = process.env.MELHOR_ENVIO_TOKEN;

interface ShippingItem {
  weight: number;
  length: number;
  width: number;
  height: number;
}

interface CalculateShippingParams {
  zipCode: string;
  items: ShippingItem[];
  method: ShippingMethod;
}

interface ShippingOption {
  name: string;
  price: number;
  deliveryTime: number;
  carrier: string;
}

export async function calculateShipping({
  zipCode,
  items,
  method,
}: CalculateShippingParams): Promise<ShippingOption[]> {
  if (method === 'correios') {
    return calculateCorreiosShipping(zipCode, items);
  } else {
    return calculateMelhorEnvioShipping(zipCode, items);
  }
}

async function calculateCorreiosShipping(
  zipCode: string,
  items: ShippingItem[]
): Promise<ShippingOption[]> {
  const response = await fetch(`${CORREIOS_API_URL}/calculador/CalcPrecoPrazo.aspx`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nCdServico: ['04014', '04510'], // PAC e SEDEX
      sCepOrigem: process.env.STORE_ZIP_CODE,
      sCepDestino: zipCode,
      nVlPeso: items.reduce((total, item) => total + item.weight, 0),
      nCdFormato: 1, // Caixa/Pacote
      nVlComprimento: Math.max(...items.map(item => item.length)),
      nVlAltura: Math.max(...items.map(item => item.height)),
      nVlLargura: Math.max(...items.map(item => item.width)),
      nVlDiametro: 0,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to calculate Correios shipping');
  }

  const data = await response.json();

  return data.map((service: any) => ({
    name: service.Codigo === '04014' ? 'PAC' : 'SEDEX',
    price: parseFloat(service.Valor.replace(',', '.')),
    deliveryTime: parseInt(service.PrazoEntrega),
    carrier: 'Correios',
  }));
}

async function calculateMelhorEnvioShipping(
  zipCode: string,
  items: ShippingItem[]
): Promise<ShippingOption[]> {
  const response = await fetch(`${MELHOR_ENVIO_API_URL}/api/v2/me/shipment/calculate`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${MELHOR_ENVIO_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: {
        postal_code: process.env.STORE_ZIP_CODE,
      },
      to: {
        postal_code: zipCode,
      },
      products: items.map(item => ({
        id: '1',
        width: item.width,
        height: item.height,
        length: item.length,
        weight: item.weight,
        insurance_value: 0,
        quantity: 1,
      })),
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to calculate Melhor Envio shipping');
  }

  const data = await response.json();

  return data.map((service: any) => ({
    name: service.name,
    price: service.price,
    deliveryTime: service.delivery_time,
    carrier: service.carrier,
  }));
}

export async function generateShippingLabel(
  orderId: string,
  method: ShippingMethod
): Promise<{ trackingCode: string; labelUrl: string }> {
  if (method === 'correios') {
    return generateCorreiosLabel(orderId);
  } else {
    return generateMelhorEnvioLabel(orderId);
  }
}

async function generateCorreiosLabel(orderId: string) {
  // Implementar geração de etiqueta dos Correios
  throw new Error('Not implemented');
}

async function generateMelhorEnvioLabel(orderId: string) {
  const response = await fetch(`${MELHOR_ENVIO_API_URL}/api/v2/me/shipment/generate`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${MELHOR_ENVIO_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      order_id: orderId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate shipping label');
  }

  const data = await response.json();

  return {
    trackingCode: data.tracking_code,
    labelUrl: data.label_url,
  };
} 