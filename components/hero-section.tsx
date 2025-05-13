"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Info } from "lucide-react"

export function HeroSection() {
  const [showDevModal, setShowDevModal] = useState(false)

  return (
    <section className="relative h-[600px] w-full">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.png"
          alt="Mi Kaza - Encuentra tu hogar lejos de casa"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Contenido */}
      <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6">
          Encuentra tu hogar lejos de casa
        </h1>
        <p className="text-xl md:text-2xl text-center mb-8 max-w-3xl">
          Descubre alojamientos únicos en toda Colombia para estadías cortas o largas
        </p>

        {/* Barra de búsqueda */}
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-2">
              <label htmlFor="location" className="block text-gray-700 text-sm font-medium mb-1">
                ¿A dónde quieres ir?
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="location"
                  placeholder="Destino"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#87CEEB] text-gray-700"
                  onClick={() => setShowDevModal(true)}
                  readOnly
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#87CEEB]">
                  <Info className="h-5 w-5" />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 mb-4 md:mb-0 md:mx-2">
              <label htmlFor="dates" className="block text-gray-700 text-sm font-medium mb-1">
                ¿Cuándo viajas?
              </label>
              <input
                type="text"
                id="dates"
                placeholder="Fechas"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#87CEEB] text-gray-700"
                onClick={() => setShowDevModal(true)}
                readOnly
              />
            </div>
            <div className="w-full md:w-1/3 mb-4 md:mb-0 md:ml-2">
              <label htmlFor="guests" className="block text-gray-700 text-sm font-medium mb-1">
                ¿Cuántos son?
              </label>
              <input
                type="text"
                id="guests"
                placeholder="Huéspedes"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#87CEEB] text-gray-700"
                onClick={() => setShowDevModal(true)}
                readOnly
              />
            </div>
            <button
              onClick={() => setShowDevModal(true)}
              className="w-full md:w-auto mt-4 md:mt-0 md:ml-4 px-6 py-2 bg-[#87CEEB] hover:bg-[#5f9bbd] text-white font-medium rounded-md transition flex-shrink-0"
            >
              Buscar
            </button>
          </div>
        </div>
      </div>

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
              La búsqueda avanzada estará disponible en la versión 2.0 de Mi Kaza.
            </div>
            <div className="text-gray-600 text-center">¡Gracias por tu paciencia!</div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
