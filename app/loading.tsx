"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Loader2 } from 'lucide-react'

export default function Loading() {
  const [quote, setQuote] = useState("")

  const quotes = [
    "Tu hogar lejos de casa",
    "Donde los recuerdos se crean",
    "Vive como un local, donde sea que vayas",
    "Descubre lugares únicos para quedarte",
    "Cada estancia cuenta una historia",
    "Hospedaje con corazón",
    "Más que un lugar para dormir",
    "Experiencias auténticas en cada destino"
  ]

  useEffect(() => {
    // Seleccionar una frase aleatoria
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(randomQuote)
  }, [])

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
      <div className="relative">
        {/* Círculos animados alrededor del logo */}
        <div className="absolute inset-0 -m-8 rounded-full bg-[#87CEEB]/10 animate-pulse"></div>
        <div className="absolute inset-0 -m-4 rounded-full bg-[#87CEEB]/20 animate-ping" style={{ animationDuration: '3s' }}></div>
        
        {/* Contenedor del logo con borde mejorado */}
        <div className="relative w-60 h-60 mb-8">
          <div className="absolute inset-0 rounded-full bg-white shadow-lg"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#87CEEB]/30 to-[#5f9bbd]/30 animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-48 h-48">
              <Image 
                src="/images/logo.png" 
                alt="Mi Kaza Logo" 
                fill 
                className="object-contain drop-shadow-xl"
                style={{ 
                  filter: 'drop-shadow(0 0 10px rgba(135, 206, 235, 0.5))'
                }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Texto animado */}
      <div className="flex flex-col items-center mt-4 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
        <div className="flex items-center justify-center mb-3">
          <Loader2 className="h-6 w-6 animate-spin text-[#87CEEB] mr-2" />
          <span className="text-[#5f9bbd] font-medium text-xl">Cargando Mi Kaza</span>
        </div>
        
        {/* Frase célebre animada */}
        <div className="text-[#87CEEB] text-lg font-light italic animate-fadeIn" style={{ animationDelay: '1s' }}>
          "{quote}"
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }
      `}</style>
    </div>
  )
}
