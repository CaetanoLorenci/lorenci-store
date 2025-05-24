'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/lib/types/product';
import { getProducts, updateProductStock } from '@/lib/api/products';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilters } from '@/components/ProductFilters';
import { Cart } from '@/components/Cart';
import { CartProvider } from '@/lib/context/CartContext';

export default function PortfolioPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const response = await getProducts();
      setProducts(response.products);
      setFilteredProducts(response.products);
    } catch (err) {
      setError('Erro ao carregar produtos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleStockUpdate(id: string, newStock: number) {
    try {
      const updatedProduct = await updateProductStock(id, newStock);
      setProducts(products.map(p => p.id === id ? updatedProduct : p));
      setFilteredProducts(filteredProducts.map(p => p.id === id ? updatedProduct : p));
    } catch (err) {
      console.error('Erro ao atualizar estoque:', err);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <CartProvider>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Nossa Vitrine</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filtros */}
          <div className="lg:col-span-1">
            <ProductFilters
              products={products}
              onFilter={setFilteredProducts}
            />
          </div>

          {/* Grid de produtos */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onStockUpdate={handleStockUpdate}
                />
              ))}
            </div>
          </div>

          {/* Carrinho */}
          <div className="lg:col-span-1">
            <Cart />
          </div>
        </div>
      </div>
    </CartProvider>
  );
}
