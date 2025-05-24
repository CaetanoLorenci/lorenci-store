import { Product } from './product';

export type PaymentMethod = 'credit_card' | 'pix' | 'boleto';
export type ShippingMethod = 'correios' | 'melhor_envio';
export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

export interface Address {
  street: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Customer {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Payment {
  method: PaymentMethod;
  installments?: number;
  status: 'pending' | 'approved' | 'rejected';
  transactionId?: string;
  pixCode?: string;
  boletoUrl?: string;
}

export interface Shipping {
  method: ShippingMethod;
  zipCode: string;
  price: number;
  estimatedDays: number;
  trackingCode?: string;
  status: 'pending' | 'shipped' | 'delivered';
}

export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed' | 'free_shipping';
  value: number;
  minValue?: number;
  expiresAt?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  customer: Customer;
  payment: Payment;
  shipping: Shipping;
  coupon?: Coupon;
  status: OrderStatus;
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderResponse {
  orders: Order[];
  total: number;
  page: number;
  limit: number;
} 