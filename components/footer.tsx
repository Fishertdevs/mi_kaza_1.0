import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 relative mr-2">
                <Image src="/images/logo.png" alt="Mi Kaza Logo" fill className="object-contain" />
              </div>
              <span className="text-xl font-bold text-[#5f9bbd]">Mi Kaza</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Encuentra el alojamiento perfecto o publica tu propiedad en Mi Kaza, la plataforma líder de alquiler de
              inmuebles en Colombia.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" target="_blank" className="text-gray-400 hover:text-[#5f9bbd]">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://instagram.com" target="_blank" className="text-gray-400 hover:text-[#5f9bbd]">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com" target="_blank" className="text-gray-400 hover:text-[#5f9bbd]">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Explorar</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/propiedades" className="text-gray-600 hover:text-[#5f9bbd] text-sm">
                  Propiedades
                </Link>
              </li>
              <li>
                <Link href="/ciudades" className="text-gray-600 hover:text-[#5f9bbd] text-sm">
                  Ciudades
                </Link>
              </li>
              <li>
                <Link href="/destacados" className="text-gray-600 hover:text-[#5f9bbd] text-sm">
                  Destacados
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Anfitriones</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/registro/anfitrion" className="text-gray-600 hover:text-[#5f9bbd] text-sm">
                  Conviértete en anfitrión
                </Link>
              </li>
              <li>
                <Link href="/recursos" className="text-gray-600 hover:text-[#5f9bbd] text-sm">
                  Recursos
                </Link>
              </li>
              <li>
                <Link href="/comunidad" className="text-gray-600 hover:text-[#5f9bbd] text-sm">
                  Comunidad
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Soporte</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/centro-ayuda" className="text-gray-600 hover:text-[#5f9bbd] text-sm">
                  Centro de ayuda
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-600 hover:text-[#5f9bbd] text-sm">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-gray-600 hover:text-[#5f9bbd] text-sm">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-gray-600 hover:text-[#5f9bbd] text-sm">
                  Política de privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-gray-500">© 2025 Mi Kaza. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
