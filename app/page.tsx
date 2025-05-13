"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { HeroSection } from "@/components/hero-section"
import { PropertyCard } from "@/components/property-card"
import { InteractiveMap } from "@/components/interactive-map"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function Home() {
  const [showDevModal, setShowDevModal] = useState(false)
  const [showSearchModal, setShowSearchModal] = useState(false)

  // Datos de ejemplo para las propiedades destacadas
  const featuredProperties = [
    {
      id: 1,
      title: "Apartamento con vista al mar en Cartagena",
      description: "Hermoso apartamento con vista al mar en el centro histórico de Cartagena",
      price: 250000,
      location: "Cartagena, Bolívar",
      image: "/images/property1.png",
      capacity: 4,
      services: ["WiFi", "Cocina", "Piscina", "Aire acondicionado"],
    },
    {
      id: 2,
      title: "Casa campestre en Villa de Leyva",
      description: "Espaciosa casa campestre ideal para familias y grupos grandes",
      price: 320000,
      location: "Villa de Leyva, Boyacá",
      image: "/images/property2.png",
      capacity: 8,
      services: ["WiFi", "Cocina", "Jardín", "Parrilla"],
    },
    {
      id: 3,
      title: "Loft moderno en Medellín",
      description: "Loft moderno y acogedor en el corazón de El Poblado",
      price: 180000,
      location: "Medellín, Antioquia",
      image: "/images/property3.png",
      capacity: 2,
      services: ["WiFi", "Cocina", "Gimnasio", "Terraza"],
    },
  ]

  // Datos de ejemplo para las ciudades populares
  const popularCities = [
    {
      id: 1,
      name: "Bogotá",
      properties: 120,
      image: "/images/bogota.png",
    },
    {
      id: 2,
      name: "Medellín",
      properties: 85,
      image: "/images/medellin.png",
    },
    {
      id: 3,
      name: "Cartagena",
      properties: 95,
      image: "/images/cartagena.png",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />

        {/* Propiedades Destacadas */}
        <section className="py-16 bg-[#f5f5f5]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Propiedades Destacadas</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/propiedades"
                className="inline-flex items-center px-6 py-3 bg-[#87CEEB] hover:bg-[#5f9bbd] text-white font-medium rounded-md transition"
              >
                Ver todas las propiedades
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Mapa Interactivo */}
        <InteractiveMap />

        {/* Ciudades Populares */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Ciudades Populares</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {popularCities.map((city) => (
                <div key={city.id} className="relative rounded-xl overflow-hidden shadow-lg group">
                  <div className="relative h-80 w-full">
                    <Image
                      src={city.image || "/placeholder.svg"}
                      alt={city.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{city.name}</h3>
                    <p className="mb-4">{city.properties} propiedades</p>
                    <button
                      onClick={() => setShowDevModal(true)}
                      className="inline-block px-4 py-2 bg-white text-[#87CEEB] rounded-md font-medium hover:bg-gray-100 transition"
                    >
                      Explorar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={() => setShowDevModal(true)}
                className="inline-flex items-center px-6 py-3 bg-[#87CEEB] hover:bg-[#5f9bbd] text-white font-medium rounded-md transition"
              >
                Ver todas las ciudades
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Sección para Anfitriones */}
        <section className="py-16 bg-[#f5f5f5]">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">¿Tienes una propiedad para alquilar?</h2>
                <p className="text-gray-600 mb-6 text-lg">
                  Únete a nuestra comunidad de anfitriones y comienza a generar ingresos con tu propiedad. Ofrecemos
                  herramientas fáciles de usar, soporte personalizado y millones de huéspedes potenciales.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Publicación gratuita de tu propiedad</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Control total sobre precios y disponibilidad</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Pagos seguros y puntuales</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Soporte 24/7 para ti y tus huéspedes</span>
                  </li>
                </ul>
                <Link
                  href="/registro/anfitrion"
                  className="inline-flex items-center px-6 py-3 bg-[#87CEEB] hover:bg-[#5f9bbd] text-white font-medium rounded-md transition"
                >
                  Conviértete en anfitrión
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
              <div className="md:w-1/2">
                <div className="relative h-96 w-full rounded-xl overflow-hidden shadow-xl">
                  <Image src="/images/host.png" alt="Conviértete en anfitrión" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Modal de Función en Desarrollo */}
      <Dialog open={showDevModal} onOpenChange={setShowDevModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-[#5f9bbd]">Función en Desarrollo</DialogTitle>
          </DialogHeader>
          <div className="py-6">
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-[#87CEEB]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <div className="text-gray-600 mb-4 text-center">
              Estamos trabajando en esta funcionalidad para la versión 2.0 de Mi Kaza.
            </div>
            <div className="text-gray-600 text-center">¡Gracias por tu paciencia!</div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Búsqueda en Desarrollo */}
      <Dialog open={showSearchModal} onOpenChange={setShowSearchModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-[#5f9bbd]">Función en Desarrollo</DialogTitle>
          </DialogHeader>
          <div className="py-6">
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-[#87CEEB]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <div className="text-gray-600 mb-4 text-center">
              La búsqueda avanzada estará disponible en la versión 2.0 de Mi Kaza.
            </div>
            <div className="text-gray-600 text-center">¡Gracias por tu paciencia!</div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
