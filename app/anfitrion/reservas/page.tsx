"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import { Calendar, MessageCircle, CheckCircle, XCircle } from "lucide-react"

export default function ReservasAnfitrionPage() {
  const [activeTab, setActiveTab] = useState("pendientes")

  const reservasPendientes = [
    {
      id: 1,
      propiedad: "Apartamento en Bogotá",
      imagen: "/images/property-bogota.png",
      huesped: {
        nombre: "Carlos Rodríguez",
        avatar: "/diverse-avatars.png",
      },
      fechaInicio: "15 de mayo, 2023",
      fechaFin: "20 de mayo, 2023",
      precio: "$750.000 COP",
      estado: "pendiente",
    },
    {
      id: 2,
      propiedad: "Cabaña en Guatapé",
      imagen: "/images/property-guatape.png",
      huesped: {
        nombre: "Laura Gómez",
        avatar: "/diverse-avatars.png",
      },
      fechaInicio: "10 de junio, 2023",
      fechaFin: "15 de junio, 2023",
      precio: "$1.200.000 COP",
      estado: "pendiente",
    },
  ]

  const reservasConfirmadas = [
    {
      id: 3,
      propiedad: "Apartamento en Bogotá",
      imagen: "/images/property-bogota.png",
      huesped: {
        nombre: "María López",
        avatar: "/diverse-avatars.png",
      },
      fechaInicio: "25 de mayo, 2023",
      fechaFin: "30 de mayo, 2023",
      precio: "$750.000 COP",
      estado: "confirmada",
    },
  ]

  const reservasHistoricas = [
    {
      id: 4,
      propiedad: "Casa en Santa Marta",
      imagen: "/images/property-santa-marta.png",
      huesped: {
        nombre: "Juan Pérez",
        avatar: "/diverse-avatars.png",
      },
      fechaInicio: "5 de enero, 2023",
      fechaFin: "10 de enero, 2023",
      precio: "$950.000 COP",
      estado: "completada",
    },
    {
      id: 5,
      propiedad: "Apartamento en Bogotá",
      imagen: "/images/property-bogota.png",
      huesped: {
        nombre: "Ana Martínez",
        avatar: "/diverse-avatars.png",
      },
      fechaInicio: "20 de febrero, 2023",
      fechaFin: "25 de febrero, 2023",
      precio: "$680.000 COP",
      estado: "completada",
    },
    {
      id: 6,
      propiedad: "Cabaña en Guatapé",
      imagen: "/images/property-guatape.png",
      huesped: {
        nombre: "Pedro Sánchez",
        avatar: "/diverse-avatars.png",
      },
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
      <h1 className="text-3xl font-bold mb-6 text-[#FF5A5F]">Reservas de mis Propiedades</h1>

      <Tabs defaultValue="pendientes" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
          <TabsTrigger value="confirmadas">Confirmadas</TabsTrigger>
          <TabsTrigger value="historicas">Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="pendientes">
          {reservasPendientes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reservasPendientes.map((reserva) => (
                <Card key={reserva.id}>
                  <div className="flex flex-col md:flex-row">
                    <div className="relative h-48 md:h-auto md:w-1/3">
                      <Image
                        src={reserva.imagen || "/placeholder.svg"}
                        alt={reserva.propiedad}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="flex-1">
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>{reserva.propiedad}</CardTitle>
                          {getEstadoBadge(reserva.estado)}
                        </div>
                        <CardDescription className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {reserva.fechaInicio} - {reserva.fechaFin}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center mb-4">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage
                              src={reserva.huesped.avatar || "/placeholder.svg"}
                              alt={reserva.huesped.nombre}
                            />
                            <AvatarFallback>{reserva.huesped.nombre.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{reserva.huesped.nombre}</span>
                        </div>
                        <p className="font-semibold text-lg">{reserva.precio}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Contactar
                        </Button>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            className="flex items-center text-red-500 border-red-200 hover:bg-red-50"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Rechazar
                          </Button>
                          <Button className="flex items-center bg-[#FF5A5F] hover:bg-[#FF385C]">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Aceptar
                          </Button>
                        </div>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No tienes reservas pendientes</h3>
              <p className="text-gray-500">Las solicitudes de reserva aparecerán aquí</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="confirmadas">
          {reservasConfirmadas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reservasConfirmadas.map((reserva) => (
                <Card key={reserva.id}>
                  <div className="flex flex-col md:flex-row">
                    <div className="relative h-48 md:h-auto md:w-1/3">
                      <Image
                        src={reserva.imagen || "/placeholder.svg"}
                        alt={reserva.propiedad}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="flex-1">
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>{reserva.propiedad}</CardTitle>
                          {getEstadoBadge(reserva.estado)}
                        </div>
                        <CardDescription className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {reserva.fechaInicio} - {reserva.fechaFin}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center mb-4">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage
                              src={reserva.huesped.avatar || "/placeholder.svg"}
                              alt={reserva.huesped.nombre}
                            />
                            <AvatarFallback>{reserva.huesped.nombre.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{reserva.huesped.nombre}</span>
                        </div>
                        <p className="font-semibold text-lg">{reserva.precio}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="flex items-center w-full">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Contactar huésped
                        </Button>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No tienes reservas confirmadas</h3>
              <p className="text-gray-500">Las reservas confirmadas aparecerán aquí</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="historicas">
          {reservasHistoricas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reservasHistoricas.map((reserva) => (
                <Card key={reserva.id}>
                  <div className="flex flex-col md:flex-row">
                    <div className="relative h-48 md:h-auto md:w-1/3">
                      <Image
                        src={reserva.imagen || "/placeholder.svg"}
                        alt={reserva.propiedad}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="flex-1">
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle>{reserva.propiedad}</CardTitle>
                          {getEstadoBadge(reserva.estado)}
                        </div>
                        <CardDescription className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {reserva.fechaInicio} - {reserva.fechaFin}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center mb-4">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage
                              src={reserva.huesped.avatar || "/placeholder.svg"}
                              alt={reserva.huesped.nombre}
                            />
                            <AvatarFallback>{reserva.huesped.nombre.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{reserva.huesped.nombre}</span>
                        </div>
                        <p className="font-semibold text-lg">{reserva.precio}</p>
                      </CardContent>
                      <CardFooter>
                        {reserva.estado === "completada" && (
                          <Button variant="outline" className="w-full">
                            Ver detalles
                          </Button>
                        )}
                      </CardFooter>
                    </div>
                  </div>
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
