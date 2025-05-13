"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Property {
  id: number
  title: string
  description: string
  price: number
  location: string
  image: string
  capacity: number
  services: string[]
}

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [showDevModal, setShowDevModal] = useState(false)

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowDevModal(true)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <>
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        <Link href={`/propiedades/${property.id}`}>
          <div className="relative h-48 w-full">
            <Image src={property.image || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
            <button
              onClick={toggleFavorite}
              className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
            >
              <Heart
                className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"}`}
                strokeWidth={2}
              />
            </button>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg mb-1 line-clamp-1">{property.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{property.location}</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>{property.capacity} huéspedes</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {property.services.slice(0, 3).map((service, index) => (
                <span key={index} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-md">
                  {service}
                </span>
              ))}
              {property.services.length > 3 && (
                <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-md">
                  +{property.services.length - 3}
                </span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span className="font-bold text-lg">{formatPrice(property.price)}</span>
                <span className="text-gray-600 text-sm"> / noche</span>
              </div>
              <button className="text-[#87CEEB] hover:text-[#5f9bbd] font-medium text-sm">Ver detalles</button>
            </div>
          </div>
        </Link>
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
              Esta funcionalidad estará disponible en la versión 2.0 de Mi Kaza.
            </div>
            <div className="text-gray-600 text-center">¡Gracias por tu paciencia!</div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
