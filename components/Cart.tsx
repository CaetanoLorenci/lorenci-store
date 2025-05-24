import { useCart } from '@/lib/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export function Cart() {
  const { items, removeItem, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Carrinho</h2>
        <p className="text-gray-500">Seu carrinho está vazio</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Carrinho</h2>
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.product.id} className="flex items-center space-x-4">
            <div className="relative h-20 w-20 flex-shrink-0">
              <Image
                src={item.product.images[0] || '/placeholder.jpg'}
                alt={item.product.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium">{item.product.name}</h3>
              <p className="text-sm text-gray-500">
                R$ {item.product.price.toFixed(2)}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="px-2 py-1 bg-gray-100 rounded"
                >
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-100 rounded"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => removeItem(item.product.id)}
              className="text-red-500 hover:text-red-700"
            >
              Remover
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t">
        <div className="flex justify-between mb-4">
          <span className="font-medium">Total:</span>
          <span className="font-bold">R$ {total.toFixed(2)}</span>
        </div>
        <Link
          href="/checkout"
          className="block w-full bg-primary text-white text-center py-2 rounded hover:bg-primary/90 transition-colors"
        >
          Finalizar Compra
        </Link>
      </div>
    </div>
  );
} 