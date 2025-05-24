import { Product, ProductResponse } from '../types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function getProducts(page = 1, limit = 10): Promise<ProductResponse> {
  const response = await fetch(`${API_URL}/products?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

export async function getProduct(id: string): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
}

export async function updateProductStock(id: string, stock: number): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}/stock`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ stock }),
  });
  if (!response.ok) {
    throw new Error('Failed to update product stock');
  }
  return response.json();
} 