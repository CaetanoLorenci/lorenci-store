import { NextResponse } from 'next/server';
import { Product } from '@/lib/types/product';

// Dados mockados para exemplo (mesmo array da rota anterior)
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

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { stock } = await request.json();
    const productIndex = mockProducts.findIndex(p => p.id === params.id);

    if (productIndex === -1) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    if (stock < 0) {
      return NextResponse.json(
        { error: 'Estoque não pode ser negativo' },
        { status: 400 }
      );
    }

    mockProducts[productIndex] = {
      ...mockProducts[productIndex],
      stock,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(mockProducts[productIndex]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao atualizar estoque' },
      { status: 500 }
    );
  }
} 