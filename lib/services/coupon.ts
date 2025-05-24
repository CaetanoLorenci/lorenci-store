import { Coupon } from '../types/order';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ValidateCouponParams {
  code: string;
  total: number;
}

interface CouponResponse {
  coupon: Coupon;
  discount: number;
}

export async function validateCoupon({
  code,
  total,
}: ValidateCouponParams): Promise<CouponResponse> {
  const response = await fetch(`${API_URL}/coupons/validate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code,
      total,
    }),
  });

  if (!response.ok) {
    throw new Error('Invalid coupon');
  }

  const data = await response.json();

  return {
    coupon: {
      code: data.code,
      type: data.type,
      value: data.value,
      minValue: data.minValue,
      expiresAt: data.expiresAt,
    },
    discount: calculateDiscount(total, data),
  };
}

function calculateDiscount(total: number, coupon: any): number {
  if (total < coupon.minValue) {
    return 0;
  }

  if (coupon.type === 'percentage') {
    return (total * coupon.value) / 100;
  }

  return coupon.value;
}

export async function applyCoupon(
  orderId: string,
  couponCode: string
): Promise<void> {
  const response = await fetch(`${API_URL}/orders/${orderId}/coupon`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      couponCode,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to apply coupon');
  }
} 