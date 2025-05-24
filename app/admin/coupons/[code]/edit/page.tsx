import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Coupon } from '../../../../../lib/types/order';

interface CouponFormProps {
  params: {
    code: string;
  };
}

export default function CouponForm({ params }: CouponFormProps) {
  const [coupon, setCoupon] = useState<Partial<Coupon>>({
    code: '',
    type: 'percentage',
    value: 0,
    expiresAt: '',
    active: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const isNew = params.code === 'new';

  useEffect(() => {
    if (!isNew) {
      loadCoupon();
    } else {
      setIsLoading(false);
    }
  }, [params.code]);

  async function loadCoupon() {
    try {
      const response = await fetch(`/api/admin/coupons/${params.code}`);
      const data = await response.json();
      setCoupon({
        ...data,
        expiresAt: data.expiresAt
          ? new Date(data.expiresAt).toISOString().split('T')[0]
          : '',
      });
    } catch (error) {
      console.error('Failed to load coupon:', error);
      setError('Erro ao carregar cupom');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      const response = await fetch(
        `/api/admin/coupons${isNew ? '' : `/${params.code}`}`,
        {
          method: isNew ? 'POST' : 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(coupon),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to save coupon');
      }

      router.push('/admin/coupons');
    } catch (error) {
      console.error('Failed to save coupon:', error);
      setError('Erro ao salvar cupom');
    } finally {
      setIsSaving(false);
    }
  }

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
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          {isNew ? 'Novo Cupom' : 'Editar Cupom'}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {isNew
            ? 'Crie um novo cupom de desconto'
            : 'Edite as informações do cupom'}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Code */}
            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-700"
              >
                Código
              </label>
              <input
                type="text"
                name="code"
                id="code"
                value={coupon.code}
                onChange={(e) =>
                  setCoupon((prev) => ({ ...prev, code: e.target.value }))
                }
                required
                disabled={!isNew}
                className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            {/* Type */}
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Tipo
              </label>
              <select
                id="type"
                name="type"
                value={coupon.type}
                onChange={(e) =>
                  setCoupon((prev) => ({
                    ...prev,
                    type: e.target.value as 'percentage' | 'fixed',
                  }))
                }
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
              >
                <option value="percentage">Porcentagem</option>
                <option value="fixed">Valor Fixo</option>
              </select>
            </div>

            {/* Value */}
            <div>
              <label
                htmlFor="value"
                className="block text-sm font-medium text-gray-700"
              >
                Valor
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  name="value"
                  id="value"
                  value={coupon.value}
                  onChange={(e) =>
                    setCoupon((prev) => ({
                      ...prev,
                      value: parseFloat(e.target.value),
                    }))
                  }
                  required
                  min="0"
                  step={coupon.type === 'percentage' ? '1' : '0.01'}
                  className="focus:ring-primary focus:border-primary block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">
                    {coupon.type === 'percentage' ? '%' : 'R$'}
                  </span>
                </div>
              </div>
            </div>

            {/* Expires At */}
            <div>
              <label
                htmlFor="expiresAt"
                className="block text-sm font-medium text-gray-700"
              >
                Data de Validade
              </label>
              <input
                type="date"
                name="expiresAt"
                id="expiresAt"
                value={coupon.expiresAt}
                onChange={(e) =>
                  setCoupon((prev) => ({ ...prev, expiresAt: e.target.value }))
                }
                className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            {/* Active */}
            <div className="sm:col-span-2">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="active"
                    name="active"
                    type="checkbox"
                    checked={coupon.active}
                    onChange={(e) =>
                      setCoupon((prev) => ({ ...prev, active: e.target.checked }))
                    }
                    className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="active"
                    className="font-medium text-gray-700"
                  >
                    Ativo
                  </label>
                  <p className="text-gray-500">
                    Desmarque esta opção para desativar o cupom
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push('/admin/coupons')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {isSaving ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
} 