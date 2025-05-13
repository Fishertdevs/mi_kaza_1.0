"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, MapPin, Filter } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function PropiedadesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [selectedCity, setSelectedCity] = useState<string>("")
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  // Obtener propiedades del localStorage o usar las predeterminadas
  const getProperties = () => {
    if (typeof window !== "undefined") {
      const storedProperties = localStorage.getItem("miKazaPropiedades")
      if (storedProperties) {
        return JSON.parse(storedProperties)
      }
    }

    // Propiedades predeterminadas
    return [
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
        price: 350000,
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
      {
        id: 4,
        title: "Apartamento en Bogotá",
        description: "Cómodo apartamento en la zona norte de Bogotá, cerca a centros comerciales",
        price: 200000,
        location: "Bogotá, Cundinamarca",
        image: "/images/property-bogota.png",
        capacity: 3,
        services: ["WiFi", "Cocina", "TV", "Lavadora"],
      },
      {
        id: 5,
        title: "Cabaña en Guatapé",
        description: "Hermosa cabaña con vista al embalse de Guatapé, perfecta para desconectar",
        price: 280000,
        location: "Guatapé, Antioquia",
        image: "/images/property-guatape.png",
        capacity: 6,
        services: ["WiFi", "Cocina", "Jacuzzi", "Chimenea"],
      },
      {
        id: 6,
        title: "Casa en Santa Marta",
        description: "Casa a pocos minutos de la playa en el sector de El Rodadero",
        price: 320000,
        location: "Santa Marta, Magdalena",
        image: "/images/property-santa-marta.png",
        capacity: 8,
        services: ["WiFi", "Cocina", "Piscina", "Parrilla"],
      },
    ]
  }

  const properties = getProperties()

  const cities = ["Bogotá", "Medellín", "Cartagena", "Santa Marta", "Villa de Leyva", "Guatapé", "Cali", "Barranquilla"]
  const services = [
    "WiFi",
    "Cocina",
    "Piscina",
    "Aire acondicionado",
    "Jardín",
    "Parrilla",
    "Gimnasio",
    "Terraza",
    "TV",
    "Lavadora",
    "Jacuzzi",
    "Chimenea",
  ]

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]))
  }

  const filteredProperties = properties.filter((property) => {
    // Filtrar por término de búsqueda
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtrar por ciudad
    const matchesCity = selectedCity ? property.location.includes(selectedCity) : true

    // Filtrar por rango de precio
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1]

    // Filtrar por servicios
    const matchesServices =
      selectedServices.length === 0 || selectedServices.every((service) => property.services.includes(service))

    return matchesSearch && matchesCity && matchesPrice && matchesServices
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="bg-[#e6f4f9] py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Encuentra tu alojamiento ideal</h1>

            <div className="bg-white rounded-lg shadow-md p-4 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Buscar por ubicación, nombre o descripción"
                    className="pl-10 h-12"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="h-12 md:w-auto">
                      <Filter className="mr-2 h-4 w-4" />
                      Filtros
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <SheetHeader>
                      <SheetTitle>Filtros de búsqueda</SheetTitle>
                      <SheetDescription>Ajusta los filtros para encontrar el alojamiento perfecto</SheetDescription>
                    </SheetHeader>
                    <div className="py-6 space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Ciudad</h3>
                        <Select value={selectedCity} onValueChange={setSelectedCity}>
                          <SelectTrigger>
                            <SelectValue placeholder="Todas las ciudades" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todas las ciudades</SelectItem>
                            {cities.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium">Rango de precio</h3>
                          <span className="text-sm text-gray-500">
                            {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                          </span>
                        </div>
                        <Slider
                          defaultValue={[0, 1000000]}
                          max={1000000}
                          step={50000}
                          value={priceRange}
                          onValueChange={setPriceRange}
                          className="mt-2"
                        />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Servicios</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {services.map((service) => (
                            <div key={service} className="flex items-center space-x-2">
                              <Checkbox
                                id={`service-${service}`}
                                checked={selectedServices.includes(service)}
                                onCheckedChange={() => handleServiceToggle(service)}
                              />
                              <Label htmlFor={`service-${service}`} className="text-sm">
                                {service}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button
                        className="w-full bg-[#87CEEB] hover:bg-[#5f9bbd]"
                        onClick={() => {
                          // Aplicar filtros
                          document.body.click() // Cerrar el sheet
                        }}
                      >
                        Aplicar filtros
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>

                <Button className="h-12 bg-[#87CEEB] hover:bg-[#5f9bbd]">
                  <Search className="mr-2 h-5 w-5" />
                  Buscar
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-12 px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {filteredProperties.length}{" "}
              {filteredProperties.length === 1 ? "propiedad encontrada" : "propiedades encontradas"}
            </h2>
            <Select defaultValue="relevance">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevancia</SelectItem>
                <SelectItem value="price_asc">Precio: menor a mayor</SelectItem>
                <SelectItem value="price_desc">Precio: mayor a menor</SelectItem>
                <SelectItem value="rating">Calificación</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No se encontraron propiedades</h3>
              <p className="text-gray-500 mb-6">Intenta ajustar los filtros de búsqueda</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCity("")
                  setPriceRange([0, 1000000])
                  setSelectedServices([])
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
