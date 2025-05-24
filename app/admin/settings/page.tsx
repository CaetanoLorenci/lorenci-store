import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Settings {
  storeName: string;
  storeDescription: string;
  storeEmail: string;
  storePhone: string;
  storeAddress: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentMethods: {
    creditCard: boolean;
    debitCard: boolean;
    pix: boolean;
    boleto: boolean;
  };
  shippingMethods: {
    correios: boolean;
    melhorEnvio: boolean;
  };
  whatsappNumber: string;
  whatsappEnabled: boolean;
  lowStockThreshold: number;
  enableNotifications: boolean;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    storeName: '',
    storeDescription: '',
    storeEmail: '',
    storePhone: '',
    storeAddress: {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: '',
    },
    paymentMethods: {
      creditCard: true,
      debitCard: true,
      pix: true,
      boleto: true,
    },
    shippingMethods: {
      correios: true,
      melhorEnvio: true,
    },
    whatsappNumber: '',
    whatsappEnabled: true,
    lowStockThreshold: 5,
    enableNotifications: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const response = await fetch('/api/admin/settings');
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error('Failed to load settings:', error);
      setError('Erro ao carregar configurações');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      alert('Configurações salvas com sucesso!');
    } catch (error) {
      console.error('Failed to save settings:', error);
      setError('Erro ao salvar configurações');
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
          Configurações
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Configure as opções do seu sistema
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Store Information */}
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Informações da Loja
          </h3>
          <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="storeName"
                className="block text-sm font-medium text-gray-700"
              >
                Nome da Loja
              </label>
              <input
                type="text"
                name="storeName"
                id="storeName"
                value={settings.storeName}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    storeName: e.target.value,
                  }))
                }
                required
                className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="storeEmail"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="storeEmail"
                id="storeEmail"
                value={settings.storeEmail}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    storeEmail: e.target.value,
                  }))
                }
                required
                className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="storePhone"
                className="block text-sm font-medium text-gray-700"
              >
                Telefone
              </label>
              <input
                type="tel"
                name="storePhone"
                id="storePhone"
                value={settings.storePhone}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    storePhone: e.target.value,
                  }))
                }
                required
                className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="storeDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Descrição
              </label>
              <textarea
                name="storeDescription"
                id="storeDescription"
                rows={3}
                value={settings.storeDescription}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    storeDescription: e.target.value,
                  }))
                }
                className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Store Address */}
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Endereço da Loja
          </h3>
          <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="street"
                className="block text-sm font-medium text-gray-700"
              >
                Rua
              </label>
              <input
                type="text"
                name="street"
                id="street"
                value={settings.storeAddress.street}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    storeAddress: {
                      ...prev.storeAddress,
                      street: e.target.value,
                    },
                  }))
                }
                required
                className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="number"
                className="block text-sm font-medium text-gray-700"
              >
                Número
              </label>
              <input
                type="text"
                name="number"
                id="number"
                value={settings.storeAddress.number}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    storeAddress: {
                      ...prev.storeAddress,
                      number: e.target.value,
                    },
                  }))
                }
                required
                className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="complement"
                className="block text-sm font-medium text-gray-700"
              >
                Complemento
              </label>
              <input
                type="text"
                name="complement"
                id="complement"
                value={settings.storeAddress.complement}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    storeAddress: {
                      ...prev.storeAddress,
                      complement: e.target.value,
                    },
                  }))
                }
                className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="neighborhood"
                className="block text-sm font-medium text-gray-700"
              >
                Bairro
              </label>
              <input
                type="text"
                name="neighborhood"
                id="neighborhood"
                value={settings.storeAddress.neighborhood}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    storeAddress: {
                      ...prev.storeAddress,
                      neighborhood: e.target.value,
                    },
                  }))
                }
                required
                className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                Cidade
              </label>
              <input
                type="text"
                name="city"
                id="city"
                value={settings.storeAddress.city}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    storeAddress: {
                      ...prev.storeAddress,
                      city: e.target.value,
                    },
                  }))
                }
                required
                className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                Estado
              </label>
              <input
                type="text"
                name="state"
                id="state"
                value={settings.storeAddress.state}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    storeAddress: {
                      ...prev.storeAddress,
                      state: e.target.value,
                    },
                  }))
                }
                required
                className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="zipCode"
                className="block text-sm font-medium text-gray-700"
              >
                CEP
              </label>
              <input
                type="text"
                name="zipCode"
                id="zipCode"
                value={settings.storeAddress.zipCode}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    storeAddress: {
                      ...prev.storeAddress,
                      zipCode: e.target.value,
                    },
                  }))
                }
                required
                className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Métodos de Pagamento
          </h3>
          <div className="mt-5 space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="creditCard"
                  name="creditCard"
                  type="checkbox"
                  checked={settings.paymentMethods.creditCard}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      paymentMethods: {
                        ...prev.paymentMethods,
                        creditCard: e.target.checked,
                      },
                    }))
                  }
                  className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="creditCard"
                  className="font-medium text-gray-700"
                >
                  Cartão de Crédito
                </label>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="debitCard"
                  name="debitCard"
                  type="checkbox"
                  checked={settings.paymentMethods.debitCard}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      paymentMethods: {
                        ...prev.paymentMethods,
                        debitCard: e.target.checked,
                      },
                    }))
                  }
                  className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="debitCard"
                  className="font-medium text-gray-700"
                >
                  Cartão de Débito
                </label>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="pix"
                  name="pix"
                  type="checkbox"
                  checked={settings.paymentMethods.pix}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      paymentMethods: {
                        ...prev.paymentMethods,
                        pix: e.target.checked,
                      },
                    }))
                  }
                  className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="pix" className="font-medium text-gray-700">
                  PIX
                </label>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="boleto"
                  name="boleto"
                  type="checkbox"
                  checked={settings.paymentMethods.boleto}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      paymentMethods: {
                        ...prev.paymentMethods,
                        boleto: e.target.checked,
                      },
                    }))
                  }
                  className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="boleto"
                  className="font-medium text-gray-700"
                >
                  Boleto
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Methods */}
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Métodos de Envio
          </h3>
          <div className="mt-5 space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="correios"
                  name="correios"
                  type="checkbox"
                  checked={settings.shippingMethods.correios}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      shippingMethods: {
                        ...prev.shippingMethods,
                        correios: e.target.checked,
                      },
                    }))
                  }
                  className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="correios"
                  className="font-medium text-gray-700"
                >
                  Correios
                </label>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="melhorEnvio"
                  name="melhorEnvio"
                  type="checkbox"
                  checked={settings.shippingMethods.melhorEnvio}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      shippingMethods: {
                        ...prev.shippingMethods,
                        melhorEnvio: e.target.checked,
                      },
                    }))
                  }
                  className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="melhorEnvio"
                  className="font-medium text-gray-700"
                >
                  Melhor Envio
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Settings */}
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Configurações do WhatsApp
          </h3>
          <div className="mt-5 space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="whatsappEnabled"
                  name="whatsappEnabled"
                  type="checkbox"
                  checked={settings.whatsappEnabled}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      whatsappEnabled: e.target.checked,
                    }))
                  }
                  className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="whatsappEnabled"
                  className="font-medium text-gray-700"
                >
                  Habilitar Notificações
                </label>
                <p className="text-gray-500">
                  Receba notificações de novos pedidos e estoque baixo
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor="whatsappNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Número do WhatsApp
              </label>
              <input
                type="tel"
                name="whatsappNumber"
                id="whatsappNumber"
                value={settings.whatsappNumber}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    whatsappNumber: e.target.value,
                  }))
                }
                className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Stock Settings */}
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Configurações de Estoque
          </h3>
          <div className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="lowStockThreshold"
                className="block text-sm font-medium text-gray-700"
              >
                Limite de Estoque Baixo
              </label>
              <input
                type="number"
                name="lowStockThreshold"
                id="lowStockThreshold"
                value={settings.lowStockThreshold}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    lowStockThreshold: parseInt(e.target.value),
                  }))
                }
                min="1"
                className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              <p className="mt-2 text-sm text-gray-500">
                Quantidade mínima de produtos para considerar estoque baixo
              </p>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="enableNotifications"
                  name="enableNotifications"
                  type="checkbox"
                  checked={settings.enableNotifications}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      enableNotifications: e.target.checked,
                    }))
                  }
                  className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="enableNotifications"
                  className="font-medium text-gray-700"
                >
                  Notificações de Estoque
                </label>
                <p className="text-gray-500">
                  Receba notificações quando o estoque estiver baixo
                </p>
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

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {isSaving ? 'Salvando...' : 'Salvar Configurações'}
          </button>
        </div>
      </form>
    </div>
  );
} 