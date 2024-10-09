import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Productos
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/category/muebles" className="text-base text-gray-300 hover:text-white">
                      Muebles
                    </Link>
                  </li>
                  <li>
                    <Link to="/category/decoracion" className="text-base text-gray-300 hover:text-white">
                      Decoración
                    </Link>
                  </li>
                  <li>
                    <Link to="/category/iluminacion" className="text-base text-gray-300 hover:text-white">
                      Iluminación
                    </Link>
                  </li>
                  <li>
                    <Link to="/category/textiles" className="text-base text-gray-300 hover:text-white">
                      Textiles
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Soporte
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/faq" className="text-base text-gray-300 hover:text-white">
                      Preguntas frecuentes
                    </Link>
                  </li>
                  <li>
                    <Link to="/shipping" className="text-base text-gray-300 hover:text-white">
                      Envíos
                    </Link>
                  </li>
                  <li>
                    <Link to="/returns" className="text-base text-gray-300 hover:text-white">
                      Devoluciones
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-base text-gray-300 hover:text-white">
                      Contacto
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Empresa
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/about" className="text-base text-gray-300 hover:text-white">
                      Sobre nosotros
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-base text-gray-300 hover:text-white">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/careers" className="text-base text-gray-300 hover:text-white">
                      Empleo
                    </Link>
                  </li>
                  <li>
                    <Link to="/press" className="text-base text-gray-300 hover:text-white">
                      Prensa
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/privacy" className="text-base text-gray-300 hover:text-white">
                      Privacidad
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="text-base text-gray-300 hover:text-white">
                      Términos
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 xl:mt-0">
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Suscríbete a nuestro boletín
            </h3>
            <p className="mt-4 text-base text-gray-300">
              Las últimas noticias, artículos y recursos, enviados a tu bandeja de entrada semanalmente.
            </p>
            <form className="mt-4 sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">Correo electrónico</label>
              <input type="email" name="email-address" id="email-address" autoComplete="email" required className="appearance-none min-w-0 w-full bg-white border border-transparent rounded-md py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white focus:placeholder-gray-400" placeholder="Ingresa tu email" />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button type="submit" className="w-full bg-indigo-500 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500">
                  Suscribirse
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-6 w-6" aria-hidden="true" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" aria-hidden="true" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" aria-hidden="true" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">YouTube</span>
              <Youtube className="h-6 w-6" aria-hidden="true" />
            </a>
          </div>
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; 2023 MuareHome, Inc. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer