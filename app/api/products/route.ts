import { NextResponse } from 'next/server';
import { Product } from '@/lib/types/product';

// Dados mockados para exemplo
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Produto 1',
    description: 'Descrição do produto 1',
    price: 99.99,
    stock: 10,
    images: ['/placeholder.jpg'],
    category: 'Categoria 1',
    features: [
      {
        title: 'Feature 1',
        description: 'Descrição da feature 1',
        icon: 'check'
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Produto 2',
    description: 'Descrição do produto 2',
    price: 149.99,
    stock: 5,
    images: ['/placeholder.jpg'],
    category: 'Categoria 2',
    features: [
      {
        title: 'Feature 2',
        description: 'Descrição da feature 2',
        icon: 'star'
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedProducts = mockProducts.slice(start, end);

  return NextResponse.json({
    products: paginatedProducts,
    total: mockProducts.length,
    page,
    limit
  });
} 