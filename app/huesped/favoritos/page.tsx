"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Heart, Share2, MapPin, Star } from "lucide-react"

export default function FavoritosPage() {
  const [favoritos, setFavoritos] = useState([
    {
      id: 1,
      titulo: "Apartamento en Bogotá",
      imagen: "/images/property-bogota.png",
      ubicacion: "Chapinero, Bogotá",
      precio: "$350.000 COP",
      porNoche: true,
      rating: 4.8,
      reviews: 24,
      caracteristicas: ["2 habitaciones", "1 baño", "Wifi", "Cocina"],
    },
    {
      id: 2,
      titulo: "Cabaña en Guatapé",
      imagen: "/images/property-guatape.png",
      ubicacion: "Guatapé, Antioquia",
      precio: "$280.000 COP",
      porNoche: true,
      rating: 4.9,
      reviews: 36,
      caracteristicas: ["3 habitaciones", "2 baños", "Piscina", "Vista al lago"],
    },
    {
      id: 3,
      titulo: "Casa en Santa Marta",
      imagen: "/images/property-santa-marta.png",
      ubicacion: "Rodadero, Santa Marta",
      precio: "$420.000 COP",
      porNoche: true,
      rating: 4.7,
      reviews: 18,
      caracteristicas: ["4 habitaciones", "3 baños", "Aire acondicionado", "Cerca a la playa"],
    },
  ])

  const eliminarFavorito = (id: number) => {
    setFavoritos(favoritos.filter((fav) => fav.id !== id))
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-[#FF5A5F]">Mis Favoritos</h1>

      {favoritos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoritos.map((propiedad) => (
            <Card key={propiedad.id} className="overflow-hidden">
              <div className="relative">
                <div className="relative h-64 w-full">
                  <Image
                    src={propiedad.imagen || "/placeholder.svg"}
                    alt={propiedad.titulo}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="absolute top-3 right-3 flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-white hover:bg-white/90"
                    onClick={() => eliminarFavorito(propiedad.id)}
                  >
                    <Heart className="h-5 w-5 fill-[#FF5A5F] text-[#FF5A5F]" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full bg-white hover:bg-white/90">
                    <Share2 className="h-5 w-5 text-gray-700" />
                  </Button>
                </div>
              </div>

              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{propiedad.titulo}</CardTitle>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{propiedad.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">({propiedad.reviews})</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  {propiedad.ubicacion}
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {propiedad.caracteristicas.map((caracteristica, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-100">
                      {caracteristica}
                    </Badge>
                  ))}
                </div>
                <p className="font-semibold text-lg">
                  {propiedad.precio}
                  {propiedad.porNoche && <span className="text-sm font-normal text-gray-500"> / noche</span>}
                </p>
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button variant="outline">Ver detalles</Button>
                <Button className="bg-[#FF5A5F] hover:bg-[#FF385C]">
                  <Link href={`/propiedades/${propiedad.id}`}>Reservar</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
          <div className="mb-4">
            <Heart className="h-16 w-16 mx-auto text-gray-300" />
          </div>
          <h3 className="text-xl font-medium mb-2">No tienes propiedades favoritas</h3>
          <p className="text-gray-500 mb-6">Guarda tus propiedades favoritas para encontrarlas fácilmente después</p>
          <Button className="bg-[#FF5A5F] hover:bg-[#FF385C]">
            <Link href="/propiedades">Explorar propiedades</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
