"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Upload, Camera, Wifi, Tv, CookingPotIcon as Kitchen, AirVent, Car, Utensils, Coffee } from "lucide-react"

export default function NuevaPropiedad() {
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    tipoPropiedad: "",
    ubicacion: "",
    ciudad: "",
    precio: "",
    habitaciones: "1",
    banos: "1",
    capacidad: "1",
    metrosCuadrados: "",
    servicios: [] as string[],
    normas: [] as string[],
    imagen: "/images/property1.png", // Imagen por defecto
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => {
      const services = [...prev.servicios]
      if (services.includes(service)) {
        return { ...prev, servicios: services.filter((s) => s !== service) }
      } else {
        return { ...prev, servicios: [...services, service] }
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validación básica
    if (!formData.titulo || !formData.descripcion || !formData.ubicacion || !formData.precio) {
      toast({
        title: "Error en el formulario",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Crear nueva propiedad
    try {
      // Obtener propiedades existentes
      const propiedadesGuardadas = JSON.parse(localStorage.getItem("miKazaPropiedades") || "[]")

      // Crear nueva propiedad
      const nuevaPropiedad = {
        id: Date.now(),
        ...formData,
        precio: Number.parseInt(formData.precio),
        habitaciones: Number.parseInt(formData.habitaciones),
        banos: Number.parseInt(formData.banos),
        capacidad: Number.parseInt(formData.capacidad),
        metrosCuadrados: formData.metrosCuadrados ? Number.parseInt(formData.metrosCuadrados) : 0,
        estado: "pendiente",
        fechaCreacion: new Date().toISOString(),
        reservas: 0,
        calificacion: 0,
      }

      // Guardar en localStorage
      const nuevasPropiedades = [...propiedadesGuardadas, nuevaPropiedad]
      localStorage.setItem("miKazaPropiedades", JSON.stringify(nuevasPropiedades))

      // Mostrar mensaje de éxito
      toast({
        title: "¡Propiedad creada!",
        description: "Tu propiedad ha sido enviada para revisión.",
      })

      // Redireccionar al dashboard
      setTimeout(() => {
        router.push("/anfitrion/dashboard")
      }, 1500)
    } catch (error) {
      console.error("Error al guardar la propiedad:", error)
      toast({
        title: "Error al crear la propiedad",
        description: "Ha ocurrido un error. Por favor intenta nuevamente.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  const serviciosDisponibles = [
    { id: "wifi", label: "WiFi", icon: <Wifi className="h-4 w-4" /> },
    { id: "tv", label: "TV", icon: <Tv className="h-4 w-4" /> },
    { id: "cocina", label: "Cocina", icon: <Kitchen className="h-4 w-4" /> },
    { id: "aire", label: "Aire acondicionado", icon: <AirVent className="h-4 w-4" /> },
    { id: "parking", label: "Estacionamiento", icon: <Car className="h-4 w-4" /> },
    { id: "desayuno", label: "Desayuno", icon: <Coffee className="h-4 w-4" /> },
    { id: "restaurante", label: "Restaurante", icon: <Utensils className="h-4 w-4" /> },
  ]

  const tiposPropiedades = ["Apartamento", "Casa", "Habitación", "Cabaña", "Villa", "Loft", "Finca", "Hostal", "Hotel"]

  const ciudadesColombia = [
    "Bogotá",
    "Medellín",
    "Cali",
    "Barranquilla",
    "Cartagena",
    "Santa Marta",
    "Villa de Leyva",
    "Guatapé",
    "San Andrés",
    "Leticia",
    "Otra",
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="anfitrion" />

      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Publicar nueva propiedad</h1>
            <p className="text-gray-600">Completa el formulario para publicar tu inmueble en Mi Kaza</p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Información básica</h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="titulo" className="text-base">
                      Título de la propiedad <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="titulo"
                      name="titulo"
                      placeholder="Ej: Apartamento acogedor en el centro de Bogotá"
                      value={formData.titulo}
                      onChange={handleChange}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="descripcion" className="text-base">
                      Descripción <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="descripcion"
                      name="descripcion"
                      placeholder="Describe tu propiedad, destacando sus características principales..."
                      value={formData.descripcion}
                      onChange={handleChange}
                      className="mt-1 min-h-[120px]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tipoPropiedad" className="text-base">
                        Tipo de propiedad <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.tipoPropiedad}
                        onValueChange={(value) => handleSelectChange("tipoPropiedad", value)}
                      >
                        <SelectTrigger id="tipoPropiedad" className="mt-1">
                          <SelectValue placeholder="Selecciona el tipo de propiedad" />
                        </SelectTrigger>
                        <SelectContent>
                          {tiposPropiedades.map((tipo) => (
                            <SelectItem key={tipo} value={tipo}>
                              {tipo}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="ciudad" className="text-base">
                        Ciudad <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.ciudad}
                        onValueChange={(value) => {
                          handleSelectChange("ciudad", value)
                          if (formData.ubicacion === "") {
                            setFormData((prev) => ({ ...prev, ubicacion: `${value}, Colombia` }))
                          }
                        }}
                      >
                        <SelectTrigger id="ciudad" className="mt-1">
                          <SelectValue placeholder="Selecciona la ciudad" />
                        </SelectTrigger>
                        <SelectContent>
                          {ciudadesColombia.map((ciudad) => (
                            <SelectItem key={ciudad} value={ciudad}>
                              {ciudad}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="ubicacion" className="text-base">
                      Dirección completa <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="ubicacion"
                      name="ubicacion"
                      placeholder="Ej: Calle 123 #45-67, Barrio Los Rosales"
                      value={formData.ubicacion}
                      onChange={handleChange}
                      className="mt-1"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Características y precio</h2>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="precio" className="text-base">
                      Precio por noche (COP) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="precio"
                      name="precio"
                      type="number"
                      placeholder="Ej: 150000"
                      value={formData.precio}
                      onChange={handleChange}
                      className="mt-1"
                      min="0"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="habitaciones" className="text-base">
                        Habitaciones
                      </Label>
                      <Select
                        value={formData.habitaciones}
                        onValueChange={(value) => handleSelectChange("habitaciones", value)}
                      >
                        <SelectTrigger id="habitaciones" className="mt-1">
                          <SelectValue placeholder="Número de habitaciones" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="banos" className="text-base">
                        Baños
                      </Label>
                      <Select value={formData.banos} onValueChange={(value) => handleSelectChange("banos", value)}>
                        <SelectTrigger id="banos" className="mt-1">
                          <SelectValue placeholder="Número de baños" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="capacidad" className="text-base">
                        Capacidad (huéspedes)
                      </Label>
                      <Select
                        value={formData.capacidad}
                        onValueChange={(value) => handleSelectChange("capacidad", value)}
                      >
                        <SelectTrigger id="capacidad" className="mt-1">
                          <SelectValue placeholder="Número de huéspedes" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="metrosCuadrados" className="text-base">
                      Metros cuadrados
                    </Label>
                    <Input
                      id="metrosCuadrados"
                      name="metrosCuadrados"
                      type="number"
                      placeholder="Ej: 80"
                      value={formData.metrosCuadrados}
                      onChange={handleChange}
                      className="mt-1"
                      min="0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Servicios disponibles</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {serviciosDisponibles.map((servicio) => (
                    <div key={servicio.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={servicio.id}
                        checked={formData.servicios.includes(servicio.label)}
                        onCheckedChange={() => handleServiceToggle(servicio.label)}
                      />
                      <Label htmlFor={servicio.id} className="flex items-center cursor-pointer">
                        <span className="mr-2">{servicio.icon}</span>
                        {servicio.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Fotos</h2>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="mb-4">
                    <div className="mx-auto w-12 h-12 rounded-full bg-[#e6f4f9] flex items-center justify-center">
                      <Upload className="h-6 w-6 text-[#5f9bbd]" />
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      Arrastra y suelta tus fotos aquí, o haz clic para seleccionarlas
                    </p>
                    <p className="text-xs text-gray-500">Formatos aceptados: JPG, PNG. Máximo 10 MB por imagen.</p>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="mt-2"
                    onClick={() => {
                      toast({
                        title: "Función no disponible",
                        description: "La carga de imágenes no está disponible en esta versión de demostración.",
                      })
                    }}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Seleccionar fotos
                  </Button>

                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <div className="relative aspect-square rounded-md overflow-hidden border border-gray-200">
                      <Image src="/images/property1.png" alt="Imagen de muestra" fill className="object-cover" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-4 mt-8">
              <Button type="button" variant="outline" onClick={() => router.push("/anfitrion/dashboard")}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-[#87CEEB] hover:bg-[#5f9bbd]" disabled={isSubmitting}>
                {isSubmitting ? "Publicando..." : "Publicar propiedad"}
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
