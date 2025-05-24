import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Coupon } from '../../../lib/types/order';

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadCoupons();
  }, []);

  async function loadCoupons() {
    try {
      const response = await fetch('/api/admin/coupons');
      const data = await response.json();
      setCoupons(data);
    } catch (error) {
      console.error('Failed to load coupons:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteCoupon(code: string) {
    if (!confirm('Tem certeza que deseja excluir este cupom?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/coupons/${code}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete coupon');
      }

      setCoupons((prevCoupons) =>
        prevCoupons.filter((coupon) => coupon.code !== code)
      );
    } catch (error) {
      console.error('Failed to delete coupon:', error);
      alert('Erro ao excluir cupom');
    }
  }

  const filteredCoupons = coupons.filter((coupon) =>
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Cupons
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Gerencie os cupons de desconto da sua loja
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-4">
          <button
            onClick={() => router.push('/admin/coupons/new')}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Novo Cupom
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700"
          >
            Buscar
          </label>
          <input
            type="text"
            name="search"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder="Código do cupom"
          />
        </div>
      </div>

      {/* Coupons List */}
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Código
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Desconto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Validade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="relative px-6 py-3">
                      <span className="sr-only">Ações</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCoupons.map((coupon) => (
                    <tr key={coupon.code}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {coupon.code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {coupon.type === 'percentage'
                          ? `${coupon.value}%`
                          : `R$ ${coupon.value.toFixed(2)}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {coupon.expiresAt
                          ? new Date(coupon.expiresAt).toLocaleDateString()
                          : 'Sem validade'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            coupon.active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {coupon.active ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() =>
                            router.push(`/admin/coupons/${coupon.code}/edit`)
                          }
                          className="text-primary hover:text-primary-dark mr-4"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteCoupon(coupon.code)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 