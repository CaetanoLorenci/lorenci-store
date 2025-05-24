import Image from 'next/image';
import { Product } from '@/lib/types/product';
import { useCart } from '@/lib/context/CartContext';

interface ProductCardProps {
  product: Product;
  onStockUpdate?: (id: string, stock: number) => void;
}

export function ProductCard({ product, onStockUpdate }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (product.stock > 0) {
      addItem(product, 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={product.images[0] || '/placeholder.jpg'}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            R$ {product.price.toFixed(2)}
          </span>
          <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `Em estoque: ${product.stock}` : 'Fora de estoque'}
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          {onStockUpdate && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onStockUpdate(product.id, product.stock - 1)}
                disabled={product.stock <= 0}
                className="px-3 py-1 bg-red-500 text-white rounded disabled:opacity-50"
              >
                -
              </button>
              <button
                onClick={() => onStockUpdate(product.id, product.stock + 1)}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                +
              </button>
            </div>
          )}
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
} 