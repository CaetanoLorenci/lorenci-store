import Link from 'next/link';
import { getConfig } from '@/lib/config';

export function Navbar() {
  const config = getConfig();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-auto"
                src={config.header.logo.imagem}
                alt={config.site.nome}
              />
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 