"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  BedDouble,
  Bath,
  Wifi,
  Utensils,
  Car,
  Tv,
  Snowflake,
  DollarSign,
  Save,
  Trash2,
  AlertTriangle,
  X,
  Plus,
  Clock,
  Users,
  Home,
  ArrowLeft,
  Eye,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

interface Propiedad {
  id: number
  titulo: string
  descripcion: string
  tipoPropiedad?: string
  ubicacion: string
  direccion?: string
  ciudad?: string
  precio: number
  capacidad: number
  habitaciones?: number
  banos?: number
  metrosCuadrados?: number
  servicios?: string[]
  normas?: string[]
  imagen: string
  imagenes?: string[]
  estado: "activo" | "pendiente" | "inactivo" | "rechazado"
  fechaCreacion: string
  reservas?: number
  calificacion?: number
  politicaCancelacion?: string
  horaCheckIn?: string
  horaCheckOut?: string
  permiteMascotas?: boolean
  permiteFiestas?: boolean
  permiteFumar?: boolean
  descuentoLargaEstancia?: number
  descuentoReservaAnticipada?: number
}

export default function EditarPropiedadPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [propiedad, setPropiedad] = useState<Propiedad | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("informacion")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [nuevaImagen, setNuevaImagen] = useState("")
  const [nuevaNorma, setNuevaNorma] = useState("")

  // Cargar datos de la propiedad
  useEffect(() => {
    const propiedadId = Number.parseInt(params.id)

    // Intentar cargar propiedades desde localStorage
    const propiedadesGuardadas = JSON.parse(localStorage.getItem("miKazaPropiedades") || "[]")

    // Buscar la propiedad por ID
    const propiedadEncontrada = propiedadesGuardadas.find((p: Propiedad) => p.id === propiedadId)

    if (propiedadEncontrada) {
      // Añadir campos adicionales si no existen
      const propiedadCompleta = {
        ...propiedadEncontrada,
        direccion: propiedadEncontrada.direccion || "Calle 123 #45-67",
        ciudad: propiedadEncontrada.ciudad || propiedadEncontrada.ubicacion.split(",")[0].trim(),
        imagenes: propiedadEncontrada.imagenes || [
          propiedadEncontrada.imagen,
          "/placeholder.svg?key=w6n6a",
          "/placeholder.svg?key=ernza",
        ],
        politicaCancelacion: propiedadEncontrada.politicaCancelacion || "flexible",
        horaCheckIn: propiedadEncontrada.horaCheckIn || "15:00",
        horaCheckOut: propiedadEncontrada.horaCheckOut || "11:00",
        permiteMascotas:
          propiedadEncontrada.permiteMascotas !== undefined ? propiedadEncontrada.permiteMascotas : false,
        permiteFiestas: propiedadEncontrada.permiteFiestas !== undefined ? propiedadEncontrada.permiteFiestas : false,
        permiteFumar: propiedadEncontrada.permiteFumar !== undefined ? propiedadEncontrada.permiteFumar : false,
        descuentoLargaEstancia: propiedadEncontrada.descuentoLargaEstancia || 0,
        descuentoReservaAnticipada: propiedadEncontrada.descuentoReservaAnticipada || 0,
        normas: propiedadEncontrada.normas || ["Check-in: 15:00", "Check-out: 11:00", "No ruido después de las 22:00"],
      }

      setPropiedad(propiedadCompleta)
    } else {
      // Si no se encuentra, crear una propiedad de ejemplo
      const propiedadEjemplo: Propiedad = {
        id: propiedadId,
        titulo: "Propiedad no encontrada",
        descripcion: "No se encontró la propiedad solicitada",
        ubicacion: "Desconocida",
        precio: 0,
        capacidad: 0,
        imagen: "/placeholder.svg",
        estado: "inactivo",
        fechaCreacion: new Date().toISOString(),
        direccion: "",
        ciudad: "",
        imagenes: ["/placeholder.svg"],
        politicaCancelacion: "flexible",
        horaCheckIn: "15:00",
        horaCheckOut: "11:00",
        permiteMascotas: false,
        permiteFiestas: false,
        permiteFumar: false,
        descuentoLargaEstancia: 0,
        descuentoReservaAnticipada: 0,
        normas: [],
      }

      setPropiedad(propiedadEjemplo)

      toast({
        title: "Propiedad no encontrada",
        description: "No se encontró la propiedad con el ID especificado.",
        variant: "destructive",
      })
    }

    setLoading(false)
  }, [params.id, toast])

  // Guardar cambios
  const guardarCambios = () => {
    if (!propiedad) return

    setIsSubmitting(true)

    // Simulación de guardado
    setTimeout(() => {
      // Obtener todas las propiedades
      const propiedadesGuardadas = JSON.parse(localStorage.getItem("miKazaPropiedades") || "[]")

      // Actualizar la propiedad
      const propiedadesActualizadas = propiedadesGuardadas.map((p: Propiedad) =>
        p.id === propiedad.id ? propiedad : p,
      )

      // Guardar en localStorage
      localStorage.setItem("miKazaPropiedades", JSON.stringify(propiedadesActualizadas))

      // Actualizar también en el localStorage del anfitrión si existe
      const propiedadesAnfitrion = JSON.parse(localStorage.getItem("miKazaPropiedadesAnfitrion") || "[]")
      if (propiedadesAnfitrion.length > 0) {
        const propiedadesAnfitrionActualizadas = propiedadesAnfitrion.map((p: Propiedad) =>
          p.id === propiedad.id ? propiedad : p,
        )
        localStorage.setItem("miKazaPropiedadesAnfitrion", JSON.stringify(propiedadesAnfitrionActualizadas))
      }

      setIsSubmitting(false)

      toast({
        title: "Cambios guardados",
        description: "Los cambios en la propiedad han sido guardados correctamente.",
        duration: 3000,
      })

      // Redireccionar al dashboard
      router.push("/anfitrion/propiedades")
    }, 1500)
  }

  // Eliminar propiedad
  const eliminarPropiedad = () => {
    if (!propiedad) return

    setIsSubmitting(true)

    // Simulación de eliminación
    setTimeout(() => {
      // Obtener todas las propiedades
      const propiedadesGuardadas = JSON.parse(localStorage.getItem("miKazaPropiedades") || "[]")

      // Filtrar la propiedad a eliminar
      const propiedadesActualizadas = propiedadesGuardadas.filter((p: Propiedad) => p.id !== propiedad.id)

      // Guardar en localStorage
      localStorage.setItem("miKazaPropiedades", JSON.stringify(propiedadesActualizadas))

      // Actualizar también en el localStorage del anfitrión si existe
      const propiedadesAnfitrion = JSON.parse(localStorage.getItem("miKazaPropiedadesAnfitrion") || "[]")
      if (propiedadesAnfitrion.length > 0) {
        const propiedadesAnfitrionActualizadas = propiedadesAnfitrion.filter((p: Propiedad) => p.id !== propiedad.id)
        localStorage.setItem("miKazaPropiedadesAnfitrion", JSON.stringify(propiedadesAnfitrionActualizadas))
      }

      setIsSubmitting(false)
      setShowDeleteDialog(false)

      toast({
        title: "Propiedad eliminada",
        description: "La propiedad ha sido eliminada correctamente.",
        duration: 3000,
      })

      // Redireccionar al dashboard
      router.push("/anfitrion/propiedades")
    }, 1500)
  }

  // Añadir imagen
  const agregarImagen = () => {
    if (!propiedad || !nuevaImagen) return

    // Validar que sea una URL
    if (!nuevaImagen.startsWith("http") && !nuevaImagen.startsWith("/")) {
      toast({
        title: "URL inválida",
        description: "Por favor ingresa una URL válida para la imagen.",
        variant: "destructive",
      })
      return
    }

    // Añadir la imagen
    setPropiedad({
      ...propiedad,
      imagenes: [...(propiedad.imagenes || []), nuevaImagen],
    })

    // Limpiar el campo
    setNuevaImagen("")

    toast({
      title: "Imagen añadida",
      description: "La imagen ha sido añadida correctamente.",
      duration: 2000,
    })
  }

  // Eliminar imagen
  const eliminarImagen = (index: number) => {
    if (!propiedad || !propiedad.imagenes) return

    // No permitir eliminar si solo queda una imagen
    if (propiedad.imagenes.length <= 1) {
      toast({
        title: "No se puede eliminar",
        description: "Debes mantener al menos una imagen para la propiedad.",
        variant: "destructive",
      })
      return
    }

    // Eliminar la imagen
    const nuevasImagenes = [...propiedad.imagenes]
    nuevasImagenes.splice(index, 1)

    // Si se elimina la imagen principal, actualizar también el campo imagen
    const nuevaImagenPrincipal = index === 0 ? nuevasImagenes[0] : propiedad.imagen

    setPropiedad({
      ...propiedad,
      imagenes: nuevasImagenes,
      imagen: nuevaImagenPrincipal,
    })
  }

  // Establecer imagen principal
  const establecerImagenPrincipal = (index: number) => {
    if (!propiedad || !propiedad.imagenes) return

    setPropiedad({
      ...propiedad,
      imagen: propiedad.imagenes[index],
    })

    toast({
      title: "Imagen principal actualizada",
      description: "Se ha establecido la nueva imagen principal.",
      duration: 2000,
    })
  }

  // Añadir norma
  const agregarNorma = () => {
    if (!propiedad || !nuevaNorma) return

    // Añadir la norma
    setPropiedad({
      ...propiedad,
      normas: [...(propiedad.normas || []), nuevaNorma],
    })

    // Limpiar el campo
    setNuevaNorma("")
  }

  // Eliminar norma
  const eliminarNorma = (index: number) => {
    if (!propiedad || !propiedad.normas) return

    // Eliminar la norma
    const nuevasNormas = [...propiedad.normas]
    nuevasNormas.splice(index, 1)

    setPropiedad({
      ...propiedad,
      normas: nuevasNormas,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar userType="anfitrion" />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-solid border-[#87CEEB] border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Cargando información de la propiedad...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!propiedad) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar userType="anfitrion" />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Propiedad no encontrada</h2>
            <p className="text-gray-600 mb-4">No se pudo encontrar la propiedad solicitada.</p>
            <Button onClick={() => router.push("/anfitrion/propiedades")}>Volver a mis propiedades</Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar userType="anfitrion" />

      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" className="mr-4" onClick={() => router.push("/anfitrion/propiedades")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Editar Propiedad</h1>
            <p className="text-gray-600">
              ID: {propiedad.id} • {propiedad.estado === "activo" ? "Publicada" : "No publicada"}
            </p>
          </div>
          <div className="ml-auto flex space-x-2">
            <Button variant="outline" onClick={() => window.open(`/propiedades/${propiedad.id}`, "_blank")}>
              <Eye className="h-4 w-4 mr-2" />
              Vista previa
            </Button>
            <Button className="bg-[#87CEEB] hover:bg-[#5f9bbd]" onClick={guardarCambios} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent"></div>
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Guardar cambios
                </>
              )}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="informacion" className="w-full" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="informacion">Información Básica</TabsTrigger>
            <TabsTrigger value="caracteristicas">Características</TabsTrigger>
            <TabsTrigger value="fotos">Fotos</TabsTrigger>
            <TabsTrigger value="politicas">Políticas y Precios</TabsTrigger>
          </TabsList>

          <TabsContent value="informacion">
            <Card>
              <CardHeader>
                <CardTitle>Información Básica</CardTitle>
                <CardDescription>Actualiza la información principal de tu propiedad</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="titulo">Título de la propiedad</Label>
                  <Input
                    id="titulo"
                    value={propiedad.titulo}
                    onChange={(e) => setPropiedad({ ...propiedad, titulo: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Textarea
                    id="descripcion"
                    rows={5}
                    value={propiedad.descripcion}
                    onChange={(e) => setPropiedad({ ...propiedad, descripcion: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de propiedad</Label>
                  <Select
                    value={propiedad.tipoPropiedad || "apartamento"}
                    onValueChange={(value) => setPropiedad({ ...propiedad, tipoPropiedad: value })}
                  >
                    <SelectTrigger id="tipo">
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
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input
                    id="direccion"
                    value={propiedad.direccion || ""}
                    onChange={(e) => setPropiedad({ ...propiedad, direccion: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ciudad">Ciudad</Label>
                  <Select
                    value={propiedad.ciudad || ""}
                    onValueChange={(value) => setPropiedad({ ...propiedad, ciudad: value })}
                  >
                    <SelectTrigger id="ciudad">
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

                <div className="space-y-2">
                  <Label htmlFor="ubicacion">Ubicación completa</Label>
                  <Input
                    id="ubicacion"
                    value={propiedad.ubicacion}
                    onChange={(e) => setPropiedad({ ...propiedad, ubicacion: e.target.value })}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Esta es la ubicación que se mostrará a los huéspedes (ej: "Cartagena, Bolívar")
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estado">Estado de publicación</Label>
                  <Select
                    value={propiedad.estado}
                    onValueChange={(value: "activo" | "pendiente" | "inactivo" | "rechazado") =>
                      setPropiedad({ ...propiedad, estado: value })
                    }
                  >
                    <SelectTrigger id="estado">
                      <SelectValue placeholder="Selecciona el estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="activo">Publicada (Activa)</SelectItem>
                      <SelectItem value="inactivo">No publicada (Inactiva)</SelectItem>
                      <SelectItem value="pendiente">En revisión (Pendiente)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setShowCancelDialog(true)}>
                  Cancelar
                </Button>
                <Button onClick={() => setActiveTab("caracteristicas")} className="bg-[#87CEEB] hover:bg-[#5f9bbd]">
                  Siguiente
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="caracteristicas">
            <Card>
              <CardHeader>
                <CardTitle>Características y Servicios</CardTitle>
                <CardDescription>Detalla las características y servicios que ofrece tu propiedad</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="precio">Precio por noche (COP)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="precio"
                        className="pl-10"
                        value={propiedad.precio}
                        onChange={(e) => setPropiedad({ ...propiedad, precio: Number.parseInt(e.target.value) || 0 })}
                        type="number"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="habitaciones">Habitaciones</Label>
                    <div className="relative">
                      <BedDouble className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="habitaciones"
                        className="pl-10"
                        value={propiedad.habitaciones || 0}
                        onChange={(e) =>
                          setPropiedad({ ...propiedad, habitaciones: Number.parseInt(e.target.value) || 0 })
                        }
                        type="number"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="banos">Baños</Label>
                    <div className="relative">
                      <Bath className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="banos"
                        className="pl-10"
                        value={propiedad.banos || 0}
                        onChange={(e) => setPropiedad({ ...propiedad, banos: Number.parseInt(e.target.value) || 0 })}
                        type="number"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="capacidad">Capacidad (huéspedes)</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="capacidad"
                        className="pl-10"
                        value={propiedad.capacidad}
                        onChange={(e) =>
                          setPropiedad({ ...propiedad, capacidad: Number.parseInt(e.target.value) || 0 })
                        }
                        type="number"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="metros">Metros cuadrados</Label>
                    <div className="relative">
                      <Home className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="metros"
                        className="pl-10"
                        value={propiedad.metrosCuadrados || 0}
                        onChange={(e) =>
                          setPropiedad({ ...propiedad, metrosCuadrados: Number.parseInt(e.target.value) || 0 })
                        }
                        type="number"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Servicios disponibles</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="wifi"
                        checked={(propiedad.servicios || []).includes("WiFi")}
                        onCheckedChange={(checked) => {
                          const servicios = [...(propiedad.servicios || [])]
                          if (checked) {
                            if (!servicios.includes("WiFi")) servicios.push("WiFi")
                          } else {
                            const index = servicios.indexOf("WiFi")
                            if (index !== -1) servicios.splice(index, 1)
                          }
                          setPropiedad({ ...propiedad, servicios })
                        }}
                      />
                      <Label htmlFor="wifi" className="flex items-center">
                        <Wifi className="h-4 w-4 mr-2" />
                        WiFi
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="cocina"
                        checked={(propiedad.servicios || []).includes("Cocina")}
                        onCheckedChange={(checked) => {
                          const servicios = [...(propiedad.servicios || [])]
                          if (checked) {
                            if (!servicios.includes("Cocina")) servicios.push("Cocina")
                          } else {
                            const index = servicios.indexOf("Cocina")
                            if (index !== -1) servicios.splice(index, 1)
                          }
                          setPropiedad({ ...propiedad, servicios })
                        }}
                      />
                      <Label htmlFor="cocina" className="flex items-center">
                        <Utensils className="h-4 w-4 mr-2" />
                        Cocina
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="estacionamiento"
                        checked={(propiedad.servicios || []).includes("Estacionamiento")}
                        onCheckedChange={(checked) => {
                          const servicios = [...(propiedad.servicios || [])]
                          if (checked) {
                            if (!servicios.includes("Estacionamiento")) servicios.push("Estacionamiento")
                          } else {
                            const index = servicios.indexOf("Estacionamiento")
                            if (index !== -1) servicios.splice(index, 1)
                          }
                          setPropiedad({ ...propiedad, servicios })
                        }}
                      />
                      <Label htmlFor="estacionamiento" className="flex items-center">
                        <Car className="h-4 w-4 mr-2" />
                        Estacionamiento
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="tv"
                        checked={(propiedad.servicios || []).includes("TV")}
                        onCheckedChange={(checked) => {
                          const servicios = [...(propiedad.servicios || [])]
                          if (checked) {
                            if (!servicios.includes("TV")) servicios.push("TV")
                          } else {
                            const index = servicios.indexOf("TV")
                            if (index !== -1) servicios.splice(index, 1)
                          }
                          setPropiedad({ ...propiedad, servicios })
                        }}
                      />
                      <Label htmlFor="tv" className="flex items-center">
                        <Tv className="h-4 w-4 mr-2" />
                        TV
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="aire"
                        checked={(propiedad.servicios || []).includes("Aire acondicionado")}
                        onCheckedChange={(checked) => {
                          const servicios = [...(propiedad.servicios || [])]
                          if (checked) {
                            if (!servicios.includes("Aire acondicionado")) servicios.push("Aire acondicionado")
                          } else {
                            const index = servicios.indexOf("Aire acondicionado")
                            if (index !== -1) servicios.splice(index, 1)
                          }
                          setPropiedad({ ...propiedad, servicios })
                        }}
                      />
                      <Label htmlFor="aire" className="flex items-center">
                        <Snowflake className="h-4 w-4 mr-2" />
                        Aire acondicionado
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="piscina"
                        checked={(propiedad.servicios || []).includes("Piscina")}
                        onCheckedChange={(checked) => {
                          const servicios = [...(propiedad.servicios || [])]
                          if (checked) {
                            if (!servicios.includes("Piscina")) servicios.push("Piscina")
                          } else {
                            const index = servicios.indexOf("Piscina")
                            if (index !== -1) servicios.splice(index, 1)
                          }
                          setPropiedad({ ...propiedad, servicios })
                        }}
                      />
                      <Label htmlFor="piscina">Piscina</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="jacuzzi"
                        checked={(propiedad.servicios || []).includes("Jacuzzi")}
                        onCheckedChange={(checked) => {
                          const servicios = [...(propiedad.servicios || [])]
                          if (checked) {
                            if (!servicios.includes("Jacuzzi")) servicios.push("Jacuzzi")
                          } else {
                            const index = servicios.indexOf("Jacuzzi")
                            if (index !== -1) servicios.splice(index, 1)
                          }
                          setPropiedad({ ...propiedad, servicios })
                        }}
                      />
                      <Label htmlFor="jacuzzi">Jacuzzi</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="gimnasio"
                        checked={(propiedad.servicios || []).includes("Gimnasio")}
                        onCheckedChange={(checked) => {
                          const servicios = [...(propiedad.servicios || [])]
                          if (checked) {
                            if (!servicios.includes("Gimnasio")) servicios.push("Gimnasio")
                          } else {
                            const index = servicios.indexOf("Gimnasio")
                            if (index !== -1) servicios.splice(index, 1)
                          }
                          setPropiedad({ ...propiedad, servicios })
                        }}
                      />
                      <Label htmlFor="gimnasio">Gimnasio</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("informacion")}>
                  Anterior
                </Button>
                <Button onClick={() => setActiveTab("fotos")} className="bg-[#87CEEB] hover:bg-[#5f9bbd]">
                  Siguiente
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="fotos">
            <Card>
              <CardHeader>
                <CardTitle>Fotos de la propiedad</CardTitle>
                <CardDescription>Gestiona las fotos que se mostrarán a los huéspedes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Imagen principal</Label>
                  <div className="relative h-64 w-full">
                    <Image
                      src={propiedad.imagen || "/placeholder.svg"}
                      alt={propiedad.titulo}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Esta es la imagen principal que se mostrará en los listados. Para cambiarla, selecciona "Establecer
                    como principal" en una de las imágenes de abajo.
                  </p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Todas las imágenes</h3>
                    <p className="text-sm text-gray-500">{propiedad.imagenes?.length || 0} imágenes</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {propiedad.imagenes?.map((imagen, index) => (
                      <div key={index} className="relative group">
                        <div className="relative h-48 w-full">
                          <Image
                            src={imagen || "/placeholder.svg"}
                            alt={`Imagen ${index + 1}`}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex space-x-2">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => establecerImagenPrincipal(index)}
                              disabled={propiedad.imagen === imagen}
                            >
                              {propiedad.imagen === imagen ? "Imagen principal" : "Establecer como principal"}
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => eliminarImagen(index)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        {propiedad.imagen === imagen && (
                          <Badge className="absolute top-2 left-2 bg-green-500">Principal</Badge>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-end space-x-2">
                    <div className="flex-grow space-y-2">
                      <Label htmlFor="nueva-imagen">Añadir nueva imagen</Label>
                      <Input
                        id="nueva-imagen"
                        placeholder="URL de la imagen"
                        value={nuevaImagen}
                        onChange={(e) => setNuevaImagen(e.target.value)}
                      />
                    </div>
                    <Button onClick={agregarImagen} disabled={!nuevaImagen}>
                      <Plus className="h-4 w-4 mr-2" />
                      Añadir
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("caracteristicas")}>
                  Anterior
                </Button>
                <Button onClick={() => setActiveTab("politicas")} className="bg-[#87CEEB] hover:bg-[#5f9bbd]">
                  Siguiente
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="politicas">
            <Card>
              <CardHeader>
                <CardTitle>Políticas y Precios</CardTitle>
                <CardDescription>Configura las políticas de tu propiedad y precios especiales</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="check-in">Hora de check-in</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="check-in"
                        className="pl-10"
                        value={propiedad.horaCheckIn || "15:00"}
                        onChange={(e) => setPropiedad({ ...propiedad, horaCheckIn: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="check-out">Hora de check-out</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input
                        id="check-out"
                        className="pl-10"
                        value={propiedad.horaCheckOut || "11:00"}
                        onChange={(e) => setPropiedad({ ...propiedad, horaCheckOut: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="politica-cancelacion">Política de cancelación</Label>
                  <Select
                    value={propiedad.politicaCancelacion || "flexible"}
                    onValueChange={(value) => setPropiedad({ ...propiedad, politicaCancelacion: value })}
                  >
                    <SelectTrigger id="politica-cancelacion">
                      <SelectValue placeholder="Selecciona la política de cancelación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flexible">Flexible (reembolso completo 24h antes)</SelectItem>
                      <SelectItem value="moderada">Moderada (reembolso 5 días antes)</SelectItem>
                      <SelectItem value="estricta">Estricta (reembolso 7 días antes, 50%)</SelectItem>
                      <SelectItem value="no-reembolsable">No reembolsable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Normas de la casa</h3>
                  <div className="space-y-3">
                    {propiedad.normas?.map((norma, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                        <span>{norma}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => eliminarNorma(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-end space-x-2">
                    <div className="flex-grow space-y-2">
                      <Label htmlFor="nueva-norma">Añadir nueva norma</Label>
                      <Input
                        id="nueva-norma"
                        placeholder="Ej: No se permiten mascotas"
                        value={nuevaNorma}
                        onChange={(e) => setNuevaNorma(e.target.value)}
                      />
                    </div>
                    <Button onClick={agregarNorma} disabled={!nuevaNorma}>
                      <Plus className="h-4 w-4 mr-2" />
                      Añadir
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Permisos</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="mascotas">Mascotas permitidas</Label>
                        <p className="text-sm text-gray-500">¿Se permiten mascotas en la propiedad?</p>
                      </div>
                      <Switch
                        id="mascotas"
                        checked={propiedad.permiteMascotas || false}
                        onCheckedChange={(checked) => setPropiedad({ ...propiedad, permiteMascotas: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="fiestas">Fiestas permitidas</Label>
                        <p className="text-sm text-gray-500">¿Se permiten fiestas o eventos en la propiedad?</p>
                      </div>
                      <Switch
                        id="fiestas"
                        checked={propiedad.permiteFiestas || false}
                        onCheckedChange={(checked) => setPropiedad({ ...propiedad, permiteFiestas: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="fumar">Fumar permitido</Label>
                        <p className="text-sm text-gray-500">¿Se permite fumar dentro de la propiedad?</p>
                      </div>
                      <Switch
                        id="fumar"
                        checked={propiedad.permiteFumar || false}
                        onCheckedChange={(checked) => setPropiedad({ ...propiedad, permiteFumar: checked })}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Descuentos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="descuento-estancia">Descuento por larga estancia (%)</Label>
                      <Input
                        id="descuento-estancia"
                        type="number"
                        min="0"
                        max="100"
                        value={propiedad.descuentoLargaEstancia || 0}
                        onChange={(e) =>
                          setPropiedad({
                            ...propiedad,
                            descuentoLargaEstancia: Number.parseInt(e.target.value) || 0,
                          })
                        }
                      />
                      <p className="text-xs text-gray-500">Descuento aplicado a reservas de 7 noches o más</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="descuento-anticipada">Descuento por reserva anticipada (%)</Label>
                      <Input
                        id="descuento-anticipada"
                        type="number"
                        min="0"
                        max="100"
                        value={propiedad.descuentoReservaAnticipada || 0}
                        onChange={(e) =>
                          setPropiedad({
                            ...propiedad,
                            descuentoReservaAnticipada: Number.parseInt(e.target.value) || 0,
                          })
                        }
                      />
                      <p className="text-xs text-gray-500">
                        Descuento aplicado a reservas realizadas con 30 días o más de anticipación
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("fotos")}>
                  Anterior
                </Button>
                <Button className="bg-[#87CEEB] hover:bg-[#5f9bbd]" onClick={guardarCambios} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent"></div>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Guardar cambios
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            className="text-red-500 border-red-200 hover:bg-red-50"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar propiedad
          </Button>
          <Button className="bg-[#87CEEB] hover:bg-[#5f9bbd]" onClick={guardarCambios} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent"></div>
                Guardando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Guardar cambios
              </>
            )}
          </Button>
        </div>
      </main>

      {/* Diálogo para confirmar eliminación */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar propiedad</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar esta propiedad? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 border border-red-200 rounded-lg bg-red-50">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-red-600">Advertencia</p>
                <p className="text-sm text-red-500">Al eliminar esta propiedad:</p>
                <ul className="text-sm text-red-500 list-disc list-inside mt-2">
                  <li>Se eliminará permanentemente de la plataforma</li>
                  <li>Se perderán todas las reservas futuras asociadas</li>
                  <li>No podrás recuperar esta información</li>
                </ul>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={eliminarPropiedad} disabled={isSubmitting}>
              {isSubmitting ? "Eliminando..." : "Eliminar permanentemente"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para confirmar cancelación */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancelar edición</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas cancelar la edición? Los cambios no guardados se perderán.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              Continuar editando
            </Button>
            <Button variant="destructive" onClick={() => router.push("/anfitrion/propiedades")}>
              Cancelar y salir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
