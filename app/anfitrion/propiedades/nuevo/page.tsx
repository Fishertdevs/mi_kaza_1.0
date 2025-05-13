"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Upload, BedDouble, Bath, Wifi, Utensils, Car, Tv, Snowflake, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function NuevaPropiedadPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    tipo: "",
    direccion: "",
    ciudad: "",
    precio: "",
    habitaciones: "",
    banos: "",
    huespedes: "",
    servicios: {
      wifi: false,
      cocina: false,
      estacionamiento: false,
      tv: false,
      aireAcondicionado: false,
      lavadora: false,
      piscina: false,
      jacuzzi: false,
    },
    imagenes: [],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleServiceChange = (service: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      servicios: {
        ...prev.servicios,
        [service]: checked,
      },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Obtener propiedades existentes del localStorage
    const propiedadesGuardadas = JSON.parse(localStorage.getItem("miKazaPropiedades") || "[]")

    // Crear nueva propiedad
    const nuevaPropiedad = {
      id: Date.now(), // Usar timestamp como ID único
      titulo: formData.titulo,
      descripcion: formData.descripcion,
      tipoPropiedad: formData.tipo,
      ubicacion: `${formData.ciudad}, ${
        formData.ciudad === "bogota"
          ? "Cundinamarca"
          : formData.ciudad === "medellin"
            ? "Antioquia"
            : formData.ciudad === "cali"
              ? "Valle del Cauca"
              : formData.ciudad === "cartagena"
                ? "Bolívar"
                : formData.ciudad === "santa-marta"
                  ? "Magdalena"
                  : formData.ciudad === "barranquilla"
                    ? "Atlántico"
                    : formData.ciudad === "villa-de-leyva"
                      ? "Boyacá"
                      : "Antioquia"
      }`,
      precio: Number.parseInt(formData.precio),
      capacidad: Number.parseInt(formData.huespedes),
      habitaciones: Number.parseInt(formData.habitaciones),
      banos: Number.parseInt(formData.banos),
      servicios: Object.entries(formData.servicios)
        .filter(([_, value]) => value)
        .map(([key, _]) => {
          switch (key) {
            case "wifi":
              return "WiFi"
            case "cocina":
              return "Cocina"
            case "estacionamiento":
              return "Estacionamiento"
            case "tv":
              return "TV"
            case "aireAcondicionado":
              return "Aire acondicionado"
            case "lavadora":
              return "Lavadora"
            case "piscina":
              return "Piscina"
            case "jacuzzi":
              return "Jacuzzi"
            default:
              return key
          }
        }),
      imagen: `/images/property${Math.floor(Math.random() * 6) + 1}.png`, // Imagen aleatoria de las existentes
      estado: "pendiente",
      fechaCreacion: new Date().toISOString(),
      reservas: 0,
      calificacion: 0,
    }

    // Agregar la nueva propiedad al array
    const nuevasPropiedades = [...propiedadesGuardadas, nuevaPropiedad]

    // Guardar en localStorage
    localStorage.setItem("miKazaPropiedades", JSON.stringify(nuevasPropiedades))

    // Mostrar mensaje de éxito
    toast({
      title: "Propiedad creada con éxito",
      description: "Tu propiedad ha sido enviada para revisión y pronto estará disponible.",
      duration: 3000,
    })

    // Redireccionar a la lista de propiedades
    router.push("/anfitrion/propiedades")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="anfitrion" />

      <main className="flex-grow container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-[#FF5A5F]">Publicar Nueva Propiedad</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Formulario de Publicación</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Información Básica</h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="titulo">Título de la propiedad*</Label>
                    <Input
                      id="titulo"
                      name="titulo"
                      placeholder="Ej: Apartamento moderno en el centro de Bogotá"
                      value={formData.titulo}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descripcion">Descripción*</Label>
                    <Textarea
                      id="descripcion"
                      name="descripcion"
                      placeholder="Describe tu propiedad, destacando sus características principales..."
                      rows={4}
                      value={formData.descripcion}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tipo">Tipo de propiedad*</Label>
                      <Select
                        onValueChange={(value) => handleSelectChange("tipo", value)}
                        value={formData.tipo}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el tipo de propiedad" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apartamento">Apartamento</SelectItem>
                          <SelectItem value="casa">Casa</SelectItem>
                          <SelectItem value="cabaña">Cabaña</SelectItem>
                          <SelectItem value="finca">Finca</SelectItem>
                          <SelectItem value="habitacion">Habitación</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ciudad">Ciudad*</Label>
                      <Select
                        onValueChange={(value) => handleSelectChange("ciudad", value)}
                        value={formData.ciudad}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona la ciudad" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bogota">Bogotá</SelectItem>
                          <SelectItem value="medellin">Medellín</SelectItem>
                          <SelectItem value="cali">Cali</SelectItem>
                          <SelectItem value="cartagena">Cartagena</SelectItem>
                          <SelectItem value="santa-marta">Santa Marta</SelectItem>
                          <SelectItem value="barranquilla">Barranquilla</SelectItem>
                          <SelectItem value="villa-de-leyva">Villa de Leyva</SelectItem>
                          <SelectItem value="guatape">Guatapé</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="direccion">Dirección*</Label>
                    <Input
                      id="direccion"
                      name="direccion"
                      placeholder="Dirección completa"
                      value={formData.direccion}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <Separator />

                <h2 className="text-xl font-semibold">Características y Precio</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="precio">Precio por noche (COP)*</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="precio"
                        name="precio"
                        placeholder="Ej: 150000"
                        className="pl-10"
                        value={formData.precio}
                        onChange={handleChange}
                        type="number"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="habitaciones">Habitaciones*</Label>
                    <div className="relative">
                      <BedDouble className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="habitaciones"
                        name="habitaciones"
                        placeholder="Ej: 2"
                        className="pl-10"
                        value={formData.habitaciones}
                        onChange={handleChange}
                        type="number"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="banos">Baños*</Label>
                    <div className="relative">
                      <Bath className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="banos"
                        name="banos"
                        placeholder="Ej: 1"
                        className="pl-10"
                        value={formData.banos}
                        onChange={handleChange}
                        type="number"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="huespedes">Capacidad (huéspedes)*</Label>
                    <Input
                      id="huespedes"
                      name="huespedes"
                      placeholder="Ej: 4"
                      value={formData.huespedes}
                      onChange={handleChange}
                      type="number"
                      required
                    />
                  </div>
                </div>

                <Separator />

                <h2 className="text-xl font-semibold">Servicios disponibles</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="wifi"
                      checked={formData.servicios.wifi}
                      onCheckedChange={(checked) => handleServiceChange("wifi", checked as boolean)}
                    />
                    <Label htmlFor="wifi" className="flex items-center">
                      <Wifi className="h-4 w-4 mr-2" />
                      WiFi
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="cocina"
                      checked={formData.servicios.cocina}
                      onCheckedChange={(checked) => handleServiceChange("cocina", checked as boolean)}
                    />
                    <Label htmlFor="cocina" className="flex items-center">
                      <Utensils className="h-4 w-4 mr-2" />
                      Cocina
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="estacionamiento"
                      checked={formData.servicios.estacionamiento}
                      onCheckedChange={(checked) => handleServiceChange("estacionamiento", checked as boolean)}
                    />
                    <Label htmlFor="estacionamiento" className="flex items-center">
                      <Car className="h-4 w-4 mr-2" />
                      Estacionamiento
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tv"
                      checked={formData.servicios.tv}
                      onCheckedChange={(checked) => handleServiceChange("tv", checked as boolean)}
                    />
                    <Label htmlFor="tv" className="flex items-center">
                      <Tv className="h-4 w-4 mr-2" />
                      TV
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="aireAcondicionado"
                      checked={formData.servicios.aireAcondicionado}
                      onCheckedChange={(checked) => handleServiceChange("aireAcondicionado", checked as boolean)}
                    />
                    <Label htmlFor="aireAcondicionado" className="flex items-center">
                      <Snowflake className="h-4 w-4 mr-2" />
                      Aire acondicionado
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="lavadora"
                      checked={formData.servicios.lavadora}
                      onCheckedChange={(checked) => handleServiceChange("lavadora", checked as boolean)}
                    />
                    <Label htmlFor="lavadora">Lavadora</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="piscina"
                      checked={formData.servicios.piscina}
                      onCheckedChange={(checked) => handleServiceChange("piscina", checked as boolean)}
                    />
                    <Label htmlFor="piscina">Piscina</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="jacuzzi"
                      checked={formData.servicios.jacuzzi}
                      onCheckedChange={(checked) => handleServiceChange("jacuzzi", checked as boolean)}
                    />
                    <Label htmlFor="jacuzzi">Jacuzzi</Label>
                  </div>
                </div>

                <Separator />

                <h2 className="text-xl font-semibold">Fotos de la propiedad</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="flex flex-col items-center">
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <h3 className="text-lg font-medium">Arrastra y suelta tus fotos aquí</h3>
                    <p className="text-sm text-gray-500 mb-4">O haz clic para seleccionar archivos</p>
                    <Button variant="outline" type="button">
                      Seleccionar archivos
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">
                      Formatos permitidos: JPG, PNG. Máximo 10 MB por imagen.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terminos" required />
                  <Label htmlFor="terminos" className="text-sm">
                    Acepto los{" "}
                    <a href="/terminos" className="text-[#FF5A5F] hover:underline">
                      términos y condiciones
                    </a>{" "}
                    y confirmo que la información proporcionada es verídica.
                  </Label>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline" type="button" onClick={() => router.push("/anfitrion/propiedades")}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-[#FF5A5F] hover:bg-[#FF385C]">
                  Publicar Propiedad
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
