import { useState, useEffect } from 'react';
import { Product } from '@/lib/types/product';

interface ProductFiltersProps {
  products: Product[];
  onFilter: (filteredProducts: Product[]) => void;
}

export function ProductFilters({ products, onFilter }: ProductFiltersProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [stockFilter, setStockFilter] = useState<'all' | 'available' | 'out'>('all');

  // Extrair categorias únicas dos produtos
  const categories = ['all', ...new Set(products.map(p => p.category))];

  useEffect(() => {
    let filtered = [...products];

    // Filtro de busca
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        p => p.name.toLowerCase().includes(searchLower) ||
             p.description.toLowerCase().includes(searchLower)
      );
    }

    // Filtro de categoria
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filtro de preço
    filtered = filtered.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Filtro de estoque
    if (stockFilter === 'available') {
      filtered = filtered.filter(p => p.stock > 0);
    } else if (stockFilter === 'out') {
      filtered = filtered.filter(p => p.stock === 0);
    }

    onFilter(filtered);
  }, [search, selectedCategory, priceRange, stockFilter, products, onFilter]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="space-y-4">
        {/* Busca */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Buscar produtos
          </label>
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            placeholder="Buscar por nome ou descrição..."
          />
        </div>

        {/* Categorias */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Categoria
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'Todas as categorias' : category}
              </option>
            ))}
          </select>
        </div>

        {/* Faixa de preço */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Faixa de preço
          </label>
          <div className="mt-1 flex items-center space-x-2">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="Min"
            />
            <span>-</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              placeholder="Max"
            />
          </div>
        </div>

        {/* Filtro de estoque */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Disponibilidade
          </label>
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value as 'all' | 'available' | 'out')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="all">Todos</option>
            <option value="available">Disponível</option>
            <option value="out">Esgotado</option>
          </select>
        </div>
      </div>
    </div>
  );
} 