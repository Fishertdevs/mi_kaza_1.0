"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Version2Modal } from "@/components/version2-modal"
import Image from "next/image"
import { Search, MapPin, ArrowRight } from "lucide-react"

export default function CiudadesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showVersion2Modal, setShowVersion2Modal] = useState(false)
  const [featureInDevelopment, setFeatureInDevelopment] = useState("")

  const handleVerMas = (ciudad: string) => {
    setFeatureInDevelopment(`exploración detallada de ${ciudad}`)
    setShowVersion2Modal(true)
  }

  const ciudadesDestacadas = [
    {
      nombre: "Bogotá",
      imagen: "/images/bogota.png",
      propiedades: 120,
      descripcion:
        "La capital de Colombia, una metrópolis vibrante con una mezcla única de historia colonial y modernidad.",
    },
    {
      nombre: "Medellín",
      imagen: "/images/medellin.png",
      propiedades: 85,
      descripcion: "Conocida como la 'Ciudad de la Eterna Primavera' por su clima agradable durante todo el año.",
    },
    {
      nombre: "Cartagena",
      imagen: "/images/cartagena.png",
      propiedades: 64,
      descripcion: "Ciudad amurallada con hermosas playas y una rica historia colonial en la costa caribeña.",
    },
    {
      nombre: "Santa Marta",
      imagen: "/images/santa-marta.png",
      propiedades: 42,
      descripcion: "Destino turístico con playas paradisíacas y el Parque Nacional Natural Tayrona.",
    },
    {
      nombre: "Cali",
      imagen: "/images/cali.png",
      propiedades: 38,
      descripcion: "La capital mundial de la salsa, conocida por su ambiente festivo y su rica cultura.",
    },
    {
      nombre: "Villa de Leyva",
      imagen: "/images/villa-de-leyva.png",
      propiedades: 25,
      descripcion: "Pueblo colonial con una de las plazas más grandes de América y arquitectura bien preservada.",
    },
    {
      nombre: "Barranquilla",
      imagen: "/images/barranquilla.png",
      propiedades: 30,
      descripcion: "Hogar del famoso Carnaval de Barranquilla, una celebración cultural reconocida por la UNESCO.",
    },
    {
      nombre: "Guatapé",
      imagen: "/images/guatape.png",
      propiedades: 18,
      descripcion:
        "Colorido pueblo cerca de Medellín, famoso por la Piedra del Peñol y sus casas decoradas con zócalos.",
    },
  ]

  const filteredCiudades = ciudadesDestacadas.filter((ciudad) =>
    ciudad.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="bg-[#e6f4f9] py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Explora por Ciudades</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
              Descubre los mejores alojamientos en las ciudades más populares de Colombia
            </p>

            <div className="max-w-2xl mx-auto relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Buscar ciudad..."
                className="pl-10 h-12 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button className="absolute right-1 top-1 bg-[#87CEEB] hover:bg-[#5f9bbd]">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-12 px-4">
          <Tabs defaultValue="todas" className="w-full">
            <div className="flex justify-center mb-8 overflow-x-auto">
              <TabsList>
                <TabsTrigger value="todas">Todas las ciudades</TabsTrigger>
                <TabsTrigger value="costa">Costa Caribe</TabsTrigger>
                <TabsTrigger value="andina">Región Andina</TabsTrigger>
                <TabsTrigger value="pacifico">Costa Pacífica</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="todas">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredCiudades.map((ciudad) => (
                  <Card key={ciudad.nombre} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={ciudad.imagen || "/placeholder.svg"}
                        alt={ciudad.nombre}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold">{ciudad.nombre}</h3>
                        <p className="text-sm">{ciudad.propiedades} propiedades</p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{ciudad.descripcion}</p>
                      <Button
                        onClick={() => handleVerMas(ciudad.nombre)}
                        variant="outline"
                        className="w-full hover:bg-[#e6f4f9]"
                      >
                        Ver más <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="costa">
              <div className="text-center py-12">
                <Button
                  onClick={() => {
                    setFeatureInDevelopment("filtrado por regiones")
                    setShowVersion2Modal(true)
                  }}
                  className="bg-[#87CEEB] hover:bg-[#5f9bbd]"
                >
                  Ver ciudades de la Costa Caribe
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="andina">
              <div className="text-center py-12">
                <Button
                  onClick={() => {
                    setFeatureInDevelopment("filtrado por regiones")
                    setShowVersion2Modal(true)
                  }}
                  className="bg-[#87CEEB] hover:bg-[#5f9bbd]"
                >
                  Ver ciudades de la Región Andina
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="pacifico">
              <div className="text-center py-12">
                <Button
                  onClick={() => {
                    setFeatureInDevelopment("filtrado por regiones")
                    setShowVersion2Modal(true)
                  }}
                  className="bg-[#87CEEB] hover:bg-[#5f9bbd]"
                >
                  Ver ciudades de la Costa Pacífica
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 bg-[#e6f4f9] rounded-lg p-8 text-center max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-2">¿No encuentras tu ciudad?</h3>
            <p className="text-gray-600 mb-4">
              Estamos expandiendo constantemente nuestra cobertura. Pronto tendremos más ciudades disponibles.
            </p>
            <Button
              onClick={() => {
                setFeatureInDevelopment("solicitud de nuevas ciudades")
                setShowVersion2Modal(true)
              }}
              className="bg-[#87CEEB] hover:bg-[#5f9bbd]"
            >
              Sugerir una ciudad
            </Button>
          </div>
        </div>
      </main>

      <Footer />

      <Version2Modal open={showVersion2Modal} onOpenChange={setShowVersion2Modal} feature={featureInDevelopment} />
    </div>
  )
}
