"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Trash2, Eye, ArrowLeft } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

interface Propiedad {
  id: number
  titulo: string
  descripcion: string
  ubicacion: string
  precio: number
  imagen: string
  estado: "activo" | "pendiente" | "inactivo" | "rechazado"
  fechaCreacion: string
  tipoPropiedad?: string
  capacidad?: number
  habitaciones?: number
  banos?: number
  servicios?: string[]
}

export default function PropiedadDetallePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [propiedad, setPropiedad] = useState<Propiedad | null>(null)
  const [loading, setLoading] = useState(true)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("detalles")

  useEffect(() => {
    const propiedadId = Number.parseInt(params.id)
    const propiedadesGuardadas = JSON.parse(localStorage.getItem("miKazaPropiedades") || "[]")
    const propiedadEncontrada = propiedadesGuardadas.find((p: Propiedad) => p.id === propiedadId)

    if (propiedadEncontrada) {
      setPropiedad(propiedadEncontrada)
    } else {
      toast({
        title: "Error",
        description: "No se encontró la propiedad solicitada",
        variant: "destructive",
      })
      router.push("/anfitrion/propiedades")
    }

    setLoading(false)
  }, [params.id, router, toast])

  const handleDeleteProperty = () => {
    if (!propiedad) return

    const propiedadesGuardadas = JSON.parse(localStorage.getItem("miKazaPropiedades") || "[]")
    const nuevasPropiedades = propiedadesGuardadas.filter((p: Propiedad) => p.id !== propiedad.id)

    localStorage.setItem("miKazaPropiedades", JSON.stringify(nuevasPropiedades))

    toast({
      title: "Propiedad eliminada",
      description: "La propiedad ha sido eliminada correctamente",
      duration: 3000,
    })

    router.push("/anfitrion/propiedades")
  }

  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(precio)
  }

  const formatearFecha = (fechaString: string) => {
    const fecha = new Date(fechaString)
    return fecha.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar userType="anfitrion" />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-[#87CEEB] border-r-transparent"></div>
            <p className="mt-2 text-gray-500">Cargando información de la propiedad...</p>
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
            <p className="text-xl font-bold">Propiedad no encontrada</p>
            <Button onClick={() => router.push("/anfitrion/propiedades")} className="mt-4">
              Volver a mis propiedades
            </Button>
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
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Volver
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold flex-grow">{propiedad.titulo}</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/anfitrion/propiedades/editar/${params.id}`)}
            >
              <Edit className="h-4 w-4 mr-1" />
              Editar
            </Button>
            <Button variant="destructive" size="sm" onClick={() => setShowDeleteDialog(true)}>
              <Trash2 className="h-4 w-4 mr-1" />
              Eliminar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 relative rounded-lg overflow-hidden h-[400px]">
            <Image src={propiedad.imagen || "/placeholder.svg"} alt={propiedad.titulo} fill className="object-cover" />
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Estado de la propiedad</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium">Estado actual:</span>
                  <Badge
                    className={
                      propiedad.estado === "activo"
                        ? "bg-green-100 text-green-800"
                        : propiedad.estado === "pendiente"
                          ? "bg-yellow-100 text-yellow-800"
                          : propiedad.estado === "inactivo"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-red-100 text-red-800"
                    }
                  >
                    {propiedad.estado === "activo"
                      ? "Activo"
                      : propiedad.estado === "pendiente"
                        ? "Pendiente"
                        : propiedad.estado === "inactivo"
                          ? "Inactivo"
                          : "Rechazado"}
                  </Badge>
                </div>
                <Button className="w-full mb-2" variant={propiedad.estado === "activo" ? "destructive" : "default"}>
                  {propiedad.estado === "activo" ? "Desactivar propiedad" : "Activar propiedad"}
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href={`/propiedades/${propiedad.id}`} target="_blank" rel="noopener noreferrer">
                    <Eye className="h-4 w-4 mr-2" />
                    Vista previa
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Información general</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Tipo:</span>
                  <span className="font-medium">{propiedad.tipoPropiedad || "No especificado"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Ubicación:</span>
                  <span className="font-medium">{propiedad.ubicacion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Precio por noche:</span>
                  <span className="font-medium">{formatearPrecio(propiedad.precio)}</span>
                </div>
                {propiedad.capacidad && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Capacidad:</span>
                    <span className="font-medium">{propiedad.capacidad} huéspedes</span>
                  </div>
                )}
                {propiedad.habitaciones && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Habitaciones:</span>
                    <span className="font-medium">{propiedad.habitaciones}</span>
                  </div>
                )}
                {propiedad.banos && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Baños:</span>
                    <span className="font-medium">{propiedad.banos}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">Fecha de creación:</span>
                  <span className="font-medium">{formatearFecha(propiedad.fechaCreacion)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="detalles">Detalles</TabsTrigger>
            <TabsTrigger value="reservas">Reservas</TabsTrigger>
            <TabsTrigger value="ingresos">Ingresos</TabsTrigger>
            <TabsTrigger value="mensajes">Mensajes</TabsTrigger>
          </TabsList>

          <TabsContent value="detalles">
            <Card>
              <CardHeader>
                <CardTitle>Descripción</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{propiedad.descripcion}</p>
              </CardContent>
            </Card>

            {propiedad.servicios && propiedad.servicios.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Servicios y comodidades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {propiedad.servicios.map((servicio, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-[#87CEEB] rounded-full mr-2"></div>
                        <span>{servicio}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="reservas">
            <Card>
              <CardHeader>
                <CardTitle>Reservas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-500">No hay reservas disponibles para esta propiedad.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ingresos">
            <Card>
              <CardHeader>
                <CardTitle>Ingresos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-500">No hay información de ingresos disponible para esta propiedad.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mensajes">
            <Card>
              <CardHeader>
                <CardTitle>Mensajes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-500">No hay mensajes relacionados con esta propiedad.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Estás seguro?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. Eliminarás permanentemente esta propiedad y todas sus reservaciones
              asociadas.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteProperty}>
              Eliminar propiedad
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
