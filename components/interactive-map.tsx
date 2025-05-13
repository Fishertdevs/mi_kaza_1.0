"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface CityMarker {
  id: number
  name: string
  position: { x: number; y: number }
  properties: number
}

export function InteractiveMap() {
  const [activeCity, setActiveCity] = useState<number | null>(null)

  const cities: CityMarker[] = [
    { id: 1, name: "Bogotá", position: { x: 50, y: 40 }, properties: 120 },
    { id: 2, name: "Medellín", position: { x: 35, y: 35 }, properties: 85 },
    { id: 3, name: "Cartagena", position: { x: 30, y: 15 }, properties: 95 },
    { id: 4, name: "Cali", position: { x: 30, y: 50 }, properties: 65 },
    { id: 5, name: "Santa Marta", position: { x: 40, y: 10 }, properties: 70 },
    { id: 6, name: "Barranquilla", position: { x: 35, y: 8 }, properties: 55 },
    { id: 7, name: "Villa de Leyva", position: { x: 45, y: 35 }, properties: 40 },
    { id: 8, name: "Guatapé", position: { x: 38, y: 32 }, properties: 30 },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Explora Colombia</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Descubre alojamientos en las ciudades más populares de Colombia. Haz clic en los marcadores para ver más
          información.
        </p>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative aspect-[4/3] w-full">
            <Image src="/simplified-colombia-map.png" alt="Mapa de Colombia" fill className="object-contain" />

            {cities.map((city) => (
              <div
                key={city.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${city.position.x}%`, top: `${city.position.y}%` }}
                onMouseEnter={() => setActiveCity(city.id)}
                onMouseLeave={() => setActiveCity(null)}
              >
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: activeCity === city.id ? 1.3 : 1 }}
                  className="relative"
                >
                  <div className="w-4 h-4 bg-[#87CEEB] rounded-full border-2 border-white shadow-md" />
                  {activeCity === city.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white rounded-lg shadow-lg p-3"
                    >
                      <div className="text-center">
                        <h3 className="font-bold text-gray-800">{city.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{city.properties} propiedades</p>
                        <Link
                          href="/propiedades"
                          className="inline-block text-xs px-3 py-1 bg-[#87CEEB] hover:bg-[#5f9bbd] text-white rounded-md transition"
                        >
                          Ver alojamientos
                        </Link>
                      </div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-white"></div>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
