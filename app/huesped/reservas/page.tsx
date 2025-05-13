"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

export default function ReservasPage() {
  const [activeTab, setActiveTab] = useState("activas")

  const reservasActivas = [
    {
      id: 1,
      propiedad: "Apartamento en Bogotá",
      imagen: "/images/property-bogota.png",
      fechaInicio: "15 de mayo, 2023",
      fechaFin: "20 de mayo, 2023",
      precio: "$750.000 COP",
      estado: "confirmada",
    },
    {
      id: 2,
      propiedad: "Cabaña en Guatapé",
      imagen: "/images/property-guatape.png",
      fechaInicio: "10 de junio, 2023",
      fechaFin: "15 de junio, 2023",
      precio: "$1.200.000 COP",
      estado: "pendiente",
    },
  ]

  const reservasHistoricas = [
    {
      id: 3,
      propiedad: "Casa en Santa Marta",
      imagen: "/images/property-santa-marta.png",
      fechaInicio: "5 de enero, 2023",
      fechaFin: "10 de enero, 2023",
      precio: "$950.000 COP",
      estado: "completada",
    },
    {
      id: 4,
      propiedad: "Apartamento en Medellín",
      imagen: "/images/property1.png",
      fechaInicio: "20 de febrero, 2023",
      fechaFin: "25 de febrero, 2023",
      precio: "$680.000 COP",
      estado: "completada",
    },
    {
      id: 5,
      propiedad: "Casa en Cartagena",
      imagen: "/images/property2.png",
      fechaInicio: "15 de marzo, 2023",
      fechaFin: "20 de marzo, 2023",
      precio: "$1.100.000 COP",
      estado: "cancelada",
    },
  ]

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "confirmada":
        return <Badge className="bg-green-500">Confirmada</Badge>
      case "pendiente":
        return <Badge className="bg-yellow-500">Pendiente</Badge>
      case "completada":
        return <Badge className="bg-blue-500">Completada</Badge>
      case "cancelada":
        return <Badge className="bg-red-500">Cancelada</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-[#FF5A5F]">Mis Reservas</h1>

      <Tabs defaultValue="activas" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="activas">Reservas Activas</TabsTrigger>
          <TabsTrigger value="historicas">Historial de Reservas</TabsTrigger>
        </TabsList>

        <TabsContent value="activas">
          {reservasActivas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reservasActivas.map((reserva) => (
                <Card key={reserva.id} className="overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image
                      src={reserva.imagen || "/placeholder.svg"}
                      alt={reserva.propiedad}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{reserva.propiedad}</CardTitle>
                      {getEstadoBadge(reserva.estado)}
                    </div>
                    <CardDescription>
                      {reserva.fechaInicio} - {reserva.fechaFin}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-lg">{reserva.precio}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Ver detalles</Button>
                    {reserva.estado === "pendiente" && (
                      <Button className="bg-[#FF5A5F] hover:bg-[#FF385C]">Confirmar pago</Button>
                    )}
                    {reserva.estado === "confirmada" && (
                      <Button className="bg-[#FF5A5F] hover:bg-[#FF385C]">Contactar anfitrión</Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No tienes reservas activas</h3>
              <p className="text-gray-500 mb-6">¡Explora propiedades y haz tu primera reserva!</p>
              <Button className="bg-[#FF5A5F] hover:bg-[#FF385C]">
                <Link href="/propiedades">Explorar propiedades</Link>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="historicas">
          {reservasHistoricas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reservasHistoricas.map((reserva) => (
                <Card key={reserva.id} className="overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image
                      src={reserva.imagen || "/placeholder.svg"}
                      alt={reserva.propiedad}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{reserva.propiedad}</CardTitle>
                      {getEstadoBadge(reserva.estado)}
                    </div>
                    <CardDescription>
                      {reserva.fechaInicio} - {reserva.fechaFin}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-lg">{reserva.precio}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Ver detalles</Button>
                    {reserva.estado === "completada" && <Button variant="outline">Dejar reseña</Button>}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No tienes reservas anteriores</h3>
              <p className="text-gray-500">Tu historial de reservas aparecerá aquí</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
