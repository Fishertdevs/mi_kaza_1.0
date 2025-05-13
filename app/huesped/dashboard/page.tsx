"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Heart,
  Search,
  MessageSquare,
  Calendar,
  Star,
  MapPin,
  ChevronDown,
  ChevronUp,
  Send,
  Filter,
  Clock,
  Download,
  Printer,
  Share2,
  Info,
  CheckCircle,
  Users,
  BedDouble,
  Bath,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSearchParams, useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Datos de ejemplo para favoritos
const favoritosIniciales = [
  {
    id: 1,
    titulo: "Apartamento en Chapinero",
    ubicacion: "Bogotá, Colombia",
    precio: 150000,
    imagen: "/images/property1.png",
    calificacion: 4.7,
    caracteristicas: ["2 habitaciones", "1 baño", "Wifi", "Cocina"],
  },
  {
    id: 4,
    titulo: "Casa Colonial en Villa de Leyva",
    ubicacion: "Villa de Leyva, Colombia",
    precio: 280000,
    imagen: "/images/property4.png",
    calificacion: 4.9,
    caracteristicas: ["4 habitaciones", "3 baños", "Piscina", "Jardín"],
  },
]

// Datos de ejemplo para reservas (se reemplazarán con localStorage)
const reservasIniciales = []

// Datos de ejemplo para mensajes
const mensajesIniciales = [
  {
    id: 1,
    remitente: "Laura Martínez",
    propiedad: "Apartamento en Chapinero",
    mensaje: "Hola, gracias por tu reserva. Cualquier duda estoy a tu disposición.",
    fecha: "2023-05-10T14:30:00",
    leido: false,
    avatar: "/images/team2.png",
    conversacion: [
      {
        id: 1,
        emisor: "Laura Martínez",
        mensaje: "Hola, gracias por tu reserva. Cualquier duda estoy a tu disposición.",
        fecha: "2023-05-10T14:30:00",
        esAnfitrion: true,
      },
      {
        id: 2,
        emisor: "Tú",
        mensaje: "Gracias Laura. ¿Podrías indicarme cómo llegar desde el aeropuerto?",
        fecha: "2023-05-10T15:45:00",
        esAnfitrion: false,
      },
      {
        id: 3,
        emisor: "Laura Martínez",
        mensaje:
          "Claro, puedes tomar un taxi o Uber directamente. También hay un bus que sale cada 30 minutos. Te enviaré las indicaciones detalladas por correo.",
        fecha: "2023-05-10T16:20:00",
        esAnfitrion: true,
      },
    ],
  },
  {
    id: 2,
    remitente: "Carlos Rodríguez",
    propiedad: "Casa en Cartagena",
    mensaje: "Tu reserva está pendiente de confirmación. Te avisaré pronto.",
    fecha: "2023-05-09T10:15:00",
    leido: true,
    avatar: "/images/team1.png",
    conversacion: [
      {
        id: 1,
        emisor: "Carlos Rodríguez",
        mensaje: "Tu reserva está pendiente de confirmación. Te avisaré pronto.",
        fecha: "2023-05-09T10:15:00",
        esAnfitrion: true,
      },
    ],
  },
]

// Datos de ejemplo para historial de viajes
const viajesIniciales = [
  {
    id: 1,
    propiedad: "Cabaña en Guatapé",
    ubicacion: "Guatapé, Colombia",
    fechaInicio: "2023-01-05",
    fechaFin: "2023-01-10",
    calificacion: 5,
    comentario: "Excelente lugar, muy tranquilo y con vistas increíbles.",
    imagen: "/images/property-guatape.png",
    anfitrion: "Miguel Ángel",
    anfitrionImagen: "/images/team3.png",
    precio: 950000,
  },
  {
    id: 2,
    propiedad: "Apartamento en Medellín",
    ubicacion: "Medellín, Colombia",
    fechaInicio: "2023-02-15",
    fechaFin: "2023-02-20",
    calificacion: 4,
    comentario: "Buena ubicación y comodidades. El anfitrión muy atento.",
    imagen: "/images/property2.png",
    anfitrion: "Ana María",
    anfitrionImagen: "/images/team4.png",
    precio: 680000,
  },
]

export default function HuespedDashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")
  const isNewReserva = searchParams.get("new") === "true"

  const [favoritos, setFavoritos] = useState(favoritosIniciales)
  const [reservas, setReservas] = useState(reservasIniciales)
  const [mensajes, setMensajes] = useState(mensajesIniciales)
  const [viajes, setViajes] = useState(viajesIniciales)
  const [busqueda, setBusqueda] = useState("")
  const [mensajesNoLeidos, setMensajesNoLeidos] = useState(0)
  const [reservasPendientes, setReservasPendientes] = useState(0)
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState(null)
  const [nuevoMensaje, setNuevoMensaje] = useState("")
  const [filtroReservas, setFiltroReservas] = useState("todas")
  const [ordenViajes, setOrdenViajes] = useState("recientes")
  const [mostrarDetallesViaje, setMostrarDetallesViaje] = useState(null)
  const [calificacionEditar, setCalificacionEditar] = useState(0)
  const [comentarioEditar, setComentarioEditar] = useState("")
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null)
  const [showReciboDialog, setShowReciboDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("favoritos")
  const [highlightedReserva, setHighlightedReserva] = useState(null)
  const [usuario, setUsuario] = useState({
    nombre: "Usuario Huésped",
    email: "huesped@ejemplo.com",
    tipo: "huesped",
  })

  // Efecto para cargar reservas desde localStorage
  useEffect(() => {
    // Cargar reservas desde localStorage
    const reservasGuardadas = JSON.parse(localStorage.getItem("miKazaReservas") || "[]")
    if (reservasGuardadas.length > 0) {
      setReservas(reservasGuardadas)

      // Si hay una nueva reserva, destacarla
      if (isNewReserva && reservasGuardadas.length > 0) {
        setHighlightedReserva(reservasGuardadas[0].id)
      }
    }

    // Cargar datos del usuario desde localStorage
    const nombreUsuario = localStorage.getItem("miKazaUserName")
    const emailUsuario = localStorage.getItem("miKazaUserEmail")
    const tipoUsuario = localStorage.getItem("miKazaUserType")

    if (nombreUsuario && emailUsuario && tipoUsuario) {
      setUsuario({
        nombre: nombreUsuario,
        email: emailUsuario,
        tipo: tipoUsuario,
      })
    }

    // Establecer la pestaña activa según el parámetro de URL
    if (tabParam && ["favoritos", "reservas", "mensajes", "viajes"].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [tabParam, isNewReserva])

  // Efecto para calcular estadísticas
  useEffect(() => {
    // Calcular mensajes no leídos
    const noLeidos = mensajes.filter((m) => !m.leido).length
    setMensajesNoLeidos(noLeidos)

    // Calcular reservas pendientes
    const pendientes = reservas.filter((r) => r.estado === "Pendiente").length
    setReservasPendientes(pendientes)
  }, [mensajes, reservas])

  // Función para marcar mensaje como leído
  const marcarComoLeido = (id) => {
    setMensajes(mensajes.map((m) => (m.id === id ? { ...m, leido: true } : m)))
  }

  // Función para eliminar favorito
  const eliminarFavorito = (id) => {
    setFavoritos(favoritos.filter((f) => f.id !== id))
  }

  // Función para cancelar reserva
  const cancelarReserva = (id) => {
    // Actualizar en el estado
    const reservasActualizadas = reservas.map((r) => (r.id === id ? { ...r, estado: "Cancelada" } : r))
    setReservas(reservasActualizadas)

    // Actualizar en localStorage
    localStorage.setItem("miKazaReservas", JSON.stringify(reservasActualizadas))
  }

  // Función para filtrar propiedades por búsqueda
  const filtrarPropiedades = () => {
    if (!busqueda) return favoritos

    return favoritos.filter(
      (f) =>
        f.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        f.ubicacion.toLowerCase().includes(busqueda.toLowerCase()),
    )
  }

  // Función para enviar un nuevo mensaje
  const enviarMensaje = () => {
    if (!nuevoMensaje.trim() || !mensajeSeleccionado) return

    const mensajeActualizado = mensajes.map((m) => {
      if (m.id === mensajeSeleccionado.id) {
        const nuevaConversacion = [
          ...m.conversacion,
          {
            id: m.conversacion.length + 1,
            emisor: "Tú",
            mensaje: nuevoMensaje,
            fecha: new Date().toISOString(),
            esAnfitrion: false,
          },
        ]
        return { ...m, conversacion: nuevaConversacion }
      }
      return m
    })

    setMensajes(mensajeActualizado)
    setNuevoMensaje("")
  }

  // Función para filtrar reservas
  const filtrarReservas = () => {
    if (filtroReservas === "todas") return reservas
    return reservas.filter((r) => r.estado.toLowerCase() === filtroReservas.toLowerCase())
  }

  // Función para ordenar viajes
  const ordenarViajes = () => {
    if (ordenViajes === "recientes") {
      return [...viajes].sort((a, b) => new Date(b.fechaInicio) - new Date(a.fechaInicio))
    } else {
      return [...viajes].sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio))
    }
  }

  // Función para editar calificación y comentario
  const guardarCalificacion = (id) => {
    setViajes(
      viajes.map((v) => (v.id === id ? { ...v, calificacion: calificacionEditar, comentario: comentarioEditar } : v)),
    )
    setMostrarDetallesViaje(null)
  }

  // Función para formatear precio
  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(precio)
  }

  // Función para imprimir recibo
  const imprimirRecibo = () => {
    window.print()
  }

  // Función para cerrar sesión
  const handleLogout = () => {
    // Eliminar datos de sesión del localStorage
    localStorage.removeItem("huespedLoggedIn")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("userData")
    localStorage.removeItem("userRole")
    localStorage.removeItem("authToken")

    // Redireccionar al login
    router.push("/auth/login")
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Panel de Huésped</h1>
          <p className="text-gray-600">
            ¡Bienvenido a tu panel de huésped, {usuario.nombre}! Aquí podrás gestionar tus reservas y favoritos.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/propiedades">
            <Button className="bg-primary hover:bg-primary/90">
              <Search className="mr-2 h-4 w-4" /> Buscar Alojamientos
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?key=huesped" alt={usuario.nombre} />
                  <AvatarFallback>{usuario.nombre.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="px-2 py-1.5 text-sm">
                <p className="font-medium">{usuario.nombre}</p>
                <p className="text-xs text-muted-foreground">{usuario.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/huesped/perfil">Mi Perfil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/huesped/configuracion">Configuración</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Favoritos</p>
              <h3 className="text-2xl font-bold">{favoritos.length}</h3>
            </div>
            <Heart className="h-8 w-8 text-primary" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Mensajes No Leídos</p>
              <h3 className="text-2xl font-bold">{mensajesNoLeidos}</h3>
            </div>
            <MessageSquare className="h-8 w-8 text-primary" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Reservas Pendientes</p>
              <h3 className="text-2xl font-bold">{reservasPendientes}</h3>
            </div>
            <Calendar className="h-8 w-8 text-primary" />
          </CardContent>
        </Card>
      </div>

      {/* Tabs para diferentes secciones */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-1 md:grid-cols-4 mb-4">
          <TabsTrigger value="favoritos">
            <Heart className="mr-2 h-4 w-4" /> Favoritos
          </TabsTrigger>
          <TabsTrigger value="reservas">
            <Calendar className="mr-2 h-4 w-4" /> Mis Reservas
            {isNewReserva && <span className="ml-2 bg-green-500 text-white rounded-full px-2 py-1 text-xs">Nueva</span>}
          </TabsTrigger>
          <TabsTrigger value="mensajes">
            <MessageSquare className="mr-2 h-4 w-4" /> Mensajes
            {mensajesNoLeidos > 0 && (
              <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">{mensajesNoLeidos}</span>
            )}
          </TabsTrigger>
          <TabsTrigger value="viajes">
            <MapPin className="mr-2 h-4 w-4" /> Historial de Viajes
          </TabsTrigger>
        </TabsList>

        {/* Contenido de Favoritos */}
        <TabsContent value="favoritos" className="space-y-4">
          <div className="flex mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar en favoritos..."
                className="pl-10"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtrarPropiedades().map((favorito) => (
              <Card key={favorito.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={favorito.imagen || "/placeholder.svg"}
                    alt={favorito.titulo}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <button
                    className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md"
                    onClick={() => eliminarFavorito(favorito.id)}
                  >
                    <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                  </button>
                </div>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{favorito.titulo}</CardTitle>
                      <CardDescription>{favorito.ubicacion}</CardDescription>
                    </div>
                    <span className="flex items-center text-sm">
                      {favorito.calificacion}
                      <Star className="h-4 w-4 text-yellow-500 ml-1 fill-yellow-500" />
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {favorito.caracteristicas &&
                      favorito.caracteristicas.map((caracteristica, index) => (
                        <Badge key={index} variant="outline" className="bg-gray-100">
                          {caracteristica}
                        </Badge>
                      ))}
                  </div>
                  <div className="flex justify-between text-sm mb-4">
                    <span>Precio por noche:</span>
                    <span className="font-semibold">${favorito.precio.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <Link href={`/propiedades/${favorito.id}`}>
                      <Button variant="outline" size="sm">
                        Ver Detalles
                      </Button>
                    </Link>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      Reservar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filtrarPropiedades().length === 0 && (
              <div className="col-span-full text-center py-12">
                <Heart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No tienes favoritos</h3>
                <p className="text-gray-500 mb-4">Agrega propiedades a tus favoritos para verlas aquí</p>
                <Link href="/propiedades">
                  <Button className="bg-primary hover:bg-primary/90">Explorar Propiedades</Button>
                </Link>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Contenido de Reservas */}
        <TabsContent value="reservas">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Mis Reservas</CardTitle>
                  <CardDescription>Gestiona tus reservas actuales y futuras</CardDescription>
                </div>
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4 text-gray-500" />
                  <Select value={filtroReservas} onValueChange={setFiltroReservas}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filtrar por estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas las reservas</SelectItem>
                      <SelectItem value="confirmada">Confirmadas</SelectItem>
                      <SelectItem value="pendiente">Pendientes</SelectItem>
                      <SelectItem value="cancelada">Canceladas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filtrarReservas().map((reserva) => (
                  <div
                    key={reserva.id}
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      highlightedReserva === reserva.id
                        ? "bg-green-100 border-green-300 shadow-md"
                        : reserva.estado === "Confirmada"
                          ? "bg-green-50 border-green-200"
                          : reserva.estado === "Pendiente"
                            ? "bg-yellow-50 border-yellow-200"
                            : "bg-red-50 border-red-200"
                    }`}
                  >
                    {highlightedReserva === reserva.id && (
                      <div className="bg-green-600 text-white px-3 py-1 rounded-md mb-3 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span>¡Nueva reserva confirmada!</span>
                      </div>
                    )}
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="relative h-32 md:w-48 rounded-md overflow-hidden">
                        <Image
                          src={reserva.imagen || "/placeholder.svg"}
                          alt={reserva.propiedad}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{reserva.propiedad}</h4>
                            <p className="text-sm text-muted-foreground">{reserva.ubicacion}</p>
                            {reserva.codigoReserva && (
                              <p className="text-xs text-gray-500 mt-1">Código: {reserva.codigoReserva}</p>
                            )}
                          </div>
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              reserva.estado === "Confirmada"
                                ? "bg-green-100 text-green-800"
                                : reserva.estado === "Pendiente"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {reserva.estado}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={reserva.anfitrionImagen || "/placeholder.svg"}
                                alt={reserva.anfitrion}
                              />
                              <AvatarFallback>{reserva.anfitrion?.charAt(0) || "A"}</AvatarFallback>
                            </Avatar>
                            <span>{reserva.anfitrion}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Total:</span>
                            <p className="font-semibold">{formatearPrecio(reserva.total)}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Llegada:</span>
                            <p>{new Date(reserva.fechaInicio).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Salida:</span>
                            <p>{new Date(reserva.fechaFin).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setReservaSeleccionada(reserva)
                              setShowReciboDialog(true)
                            }}
                          >
                            <Download className="mr-1 h-4 w-4" /> Recibo
                          </Button>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <MapPin className="mr-1 h-4 w-4" /> Indicaciones
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Indicaciones para llegar</DialogTitle>
                                <DialogDescription>Cómo llegar a {reserva.propiedad}</DialogDescription>
                              </DialogHeader>
                              <div className="py-4">
                                <div className="mb-4 rounded-md overflow-hidden">
                                  <div className="aspect-video relative">
                                    <Image
                                      src="/placeholder.svg?key=map&text=Mapa de ubicación"
                                      alt="Mapa de ubicación"
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  {reserva.indicacionesLlegada ? (
                                    <ul className="space-y-2">
                                      {reserva.indicacionesLlegada.map((indicacion, index) => (
                                        <li key={index} className="flex items-start">
                                          <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">
                                            {index + 1}
                                          </span>
                                          <span>{indicacion}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <p className="text-gray-500">
                                      No hay indicaciones disponibles. Por favor contacta al anfitrión.
                                    </p>
                                  )}
                                </div>

                                <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-md">
                                  <h4 className="font-medium text-blue-800 flex items-center mb-2">
                                    <Info className="h-4 w-4 mr-1" /> Contacto del anfitrión
                                  </h4>
                                  <p className="text-sm">
                                    <span className="font-medium">Nombre:</span> {reserva.anfitrion}
                                  </p>
                                  <p className="text-sm">
                                    <span className="font-medium">Teléfono:</span>{" "}
                                    {reserva.anfitrionTelefono || "+57 300 123 4567"}
                                  </p>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button className="w-full bg-primary hover:bg-primary/90">
                                  <Share2 className="mr-2 h-4 w-4" /> Compartir ubicación
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <MessageSquare className="mr-1 h-4 w-4" /> Contactar
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Contactar a {reserva.anfitrion}</DialogTitle>
                                <DialogDescription>
                                  Envía un mensaje sobre tu reserva en {reserva.propiedad}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="flex items-start space-x-4 pt-4">
                                <Avatar>
                                  <AvatarImage
                                    src={reserva.anfitrionImagen || "/placeholder.svg"}
                                    alt={reserva.anfitrion}
                                  />
                                  <AvatarFallback>{reserva.anfitrion?.charAt(0) || "A"}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <Textarea placeholder="Escribe tu mensaje aquí..." className="min-h-[100px]" />
                                </div>
                              </div>
                              <DialogFooter className="sm:justify-end">
                                <DialogClose asChild>
                                  <Button type="button" variant="secondary">
                                    Cancelar
                                  </Button>
                                </DialogClose>
                                <Button type="button" className="bg-primary hover:bg-primary/90">
                                  <Send className="mr-2 h-4 w-4" /> Enviar Mensaje
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          <Link href={`/propiedades/${reserva.id}`}>
                            <Button variant="outline" size="sm">
                              Ver Propiedad
                            </Button>
                          </Link>

                          {reserva.estado !== "Cancelada" && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                  Cancelar Reserva
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Confirmar cancelación</DialogTitle>
                                  <DialogDescription>
                                    ¿Estás seguro de que deseas cancelar tu reserva en {reserva.propiedad}? Esta acción
                                    no se puede deshacer.
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button variant="outline">No, mantener reserva</Button>
                                  </DialogClose>
                                  <DialogClose asChild>
                                    <Button variant="destructive" onClick={() => cancelarReserva(reserva.id)}>
                                      Sí, cancelar reserva
                                    </Button>
                                  </DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {filtrarReservas().length === 0 && (
                  <div className="text-center py-8">
                    <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500 mb-4">
                      No tienes reservas {filtroReservas !== "todas" ? `${filtroReservas}s` : ""} actualmente
                    </p>
                    <Link href="/propiedades">
                      <Button className="bg-primary hover:bg-primary/90">Explorar Propiedades</Button>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contenido de Mensajes */}
        <TabsContent value="mensajes">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle>Mensajes</CardTitle>
              <CardDescription>Comunicación con tus anfitriones</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
              <div className="flex h-full border rounded-md">
                {/* Lista de conversaciones */}
                <div className="w-1/3 border-r overflow-y-auto">
                  {mensajes.map((mensaje) => (
                    <div
                      key={mensaje.id}
                      className={`p-3 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                        mensajeSeleccionado?.id === mensaje.id ? "bg-gray-100" : ""
                      } ${!mensaje.leido ? "bg-blue-50" : ""}`}
                      onClick={() => {
                        setMensajeSeleccionado(mensaje)
                        marcarComoLeido(mensaje.id)
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src={mensaje.avatar || "/placeholder.svg"} alt={mensaje.remitente} />
                          <AvatarFallback>{mensaje.remitente.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium truncate">{mensaje.remitente}</h4>
                            <span className="text-xs text-gray-500">
                              {new Date(mensaje.fecha).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">{mensaje.propiedad}</p>
                          <p className="text-xs text-gray-500 truncate">{mensaje.mensaje}</p>
                        </div>
                        {!mensaje.leido && <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>}
                      </div>
                    </div>
                  ))}

                  {mensajes.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                      <MessageSquare className="h-12 w-12 text-gray-300 mb-2" />
                      <p className="text-gray-500">No tienes mensajes</p>
                    </div>
                  )}
                </div>

                {/* Detalle de la conversación */}
                <div className="w-2/3 flex flex-col">
                  {mensajeSeleccionado ? (
                    <>
                      <div className="p-4 border-b bg-gray-50">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={mensajeSeleccionado.avatar || "/placeholder.svg"}
                              alt={mensajeSeleccionado.remitente}
                            />
                            <AvatarFallback>{mensajeSeleccionado.remitente.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{mensajeSeleccionado.remitente}</h3>
                            <p className="text-sm text-gray-600">{mensajeSeleccionado.propiedad}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {mensajeSeleccionado.conversacion.map((msg) => (
                          <div key={msg.id} className={`flex ${msg.esAnfitrion ? "justify-start" : "justify-end"}`}>
                            <div
                              className={`max-w-[80%] p-3 rounded-lg ${
                                msg.esAnfitrion ? "bg-gray-100 text-gray-800" : "bg-primary text-white"
                              }`}
                            >
                              <p className="text-sm">{msg.mensaje}</p>
                              <p className="text-xs mt-1 opacity-70">
                                {new Date(msg.fecha).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-3 border-t">
                        <div className="flex gap-2">
                          <Textarea
                            placeholder="Escribe tu mensaje..."
                            className="min-h-[60px] resize-none"
                            value={nuevoMensaje}
                            onChange={(e) => setNuevoMensaje(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault()
                                enviarMensaje()
                              }
                            }}
                          />
                          <Button
                            className="bg-primary hover:bg-primary/90 self-end"
                            onClick={enviarMensaje}
                            disabled={!nuevoMensaje.trim()}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                      <MessageSquare className="h-16 w-16 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-700 mb-1">Selecciona una conversación</h3>
                      <p className="text-gray-500">Elige un mensaje de la lista para ver la conversación</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contenido de Historial de Viajes */}
        <TabsContent value="viajes">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Historial de Viajes</CardTitle>
                  <CardDescription>Tus experiencias anteriores con Mi Kaza</CardDescription>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-gray-500" />
                  <Select value={ordenViajes} onValueChange={setOrdenViajes}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Ordenar por fecha" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recientes">Más recientes primero</SelectItem>
                      <SelectItem value="antiguos">Más antiguos primero</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {ordenarViajes().map((viaje) => (
                  <div key={viaje.id} className="border rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative h-48 md:h-auto md:w-1/3">
                        <Image
                          src={viaje.imagen || "/placeholder.svg"}
                          alt={viaje.propiedad}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="p-4 md:p-6 flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-semibold">{viaje.propiedad}</h3>
                            <p className="text-gray-600">{viaje.ubicacion}</p>
                          </div>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${
                                  i < viaje.calificacion ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Fechas</p>
                            <p className="font-medium">
                              {new Date(viaje.fechaInicio).toLocaleDateString()} -{" "}
                              {new Date(viaje.fechaFin).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Anfitrión</p>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={viaje.anfitrionImagen || "/placeholder.svg"} alt={viaje.anfitrion} />
                                <AvatarFallback>{viaje.anfitrion.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span>{viaje.anfitrion}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Total</p>
                            <p className="font-medium">${viaje.precio.toLocaleString()}</p>
                          </div>
                        </div>

                        {viaje.comentario && (
                          <div className="mb-4">
                            <p className="text-sm text-gray-500 mb-1">Tu comentario:</p>
                            <p className="text-gray-700 italic">"{viaje.comentario}"</p>
                          </div>
                        )}

                        <div className="flex justify-between items-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setMostrarDetallesViaje(mostrarDetallesViaje === viaje.id ? null : viaje.id)}
                          >
                            {mostrarDetallesViaje === viaje.id ? (
                              <>
                                <ChevronUp className="mr-1 h-4 w-4" /> Ocultar detalles
                              </>
                            ) : (
                              <>
                                <ChevronDown className="mr-1 h-4 w-4" /> Ver detalles
                              </>
                            )}
                          </Button>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" className="bg-primary hover:bg-primary/90">
                                <Star className="mr-1 h-4 w-4" /> Editar Calificación
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Calificar tu estancia</DialogTitle>
                                <DialogDescription>Comparte tu experiencia en {viaje.propiedad}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div>
                                  <label className="block text-sm font-medium mb-2">Calificación</label>
                                  <div className="flex gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <button
                                        key={i}
                                        type="button"
                                        onClick={() => setCalificacionEditar(i + 1)}
                                        className="focus:outline-none"
                                      >
                                        <Star
                                          className={`h-8 w-8 ${
                                            i < calificacionEditar ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                                          }`}
                                        />
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium mb-2">Comentario</label>
                                  <Textarea
                                    placeholder="Comparte tu experiencia..."
                                    className="min-h-[100px]"
                                    value={comentarioEditar}
                                    onChange={(e) => setComentarioEditar(e.target.value)}
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button variant="outline">Cancelar</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                  <Button
                                    className="bg-primary hover:bg-primary/90"
                                    onClick={() => guardarCalificacion(viaje.id)}
                                  >
                                    Guardar Calificación
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>

                        {mostrarDetallesViaje === viaje.id && (
                          <div className="mt-4 pt-4 border-t">
                            <h4 className="font-medium mb-2">Detalles de la estancia</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-500">Duración</p>
                                <p className="font-medium">
                                  {Math.ceil(
                                    (new Date(viaje.fechaFin) - new Date(viaje.fechaInicio)) / (1000 * 60 * 60 * 24),
                                  )}{" "}
                                  días
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Precio por noche</p>
                                <p className="font-medium">
                                  $
                                  {Math.round(
                                    viaje.precio /
                                      Math.ceil(
                                        (new Date(viaje.fechaFin) - new Date(viaje.fechaInicio)) /
                                          (1000 * 60 * 60 * 24),
                                      ),
                                  ).toLocaleString()}
                                </p>
                              </div>
                              <div className="md:col-span-2">
                                <p className="text-sm text-gray-500 mb-1">Acciones</p>
                                <div className="flex flex-wrap gap-2">
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button variant="outline" size="sm">
                                          <MessageSquare className="mr-1 h-4 w-4" /> Contactar anfitrión
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Contacta con {viaje.anfitrion}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>

                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button variant="outline" size="sm">
                                          <Calendar className="mr-1 h-4 w-4" /> Reservar de nuevo
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Haz una nueva reserva en {viaje.propiedad}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {viajes.length === 0 && (
                  <div className="text-center py-8">
                    <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No tienes viajes anteriores</h3>
                    <p className="text-gray-500 mb-4">Tus estancias completadas aparecerán aquí</p>
                    <Link href="/propiedades">
                      <Button className="bg-primary hover:bg-primary/90">Explorar Propiedades</Button>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Diálogo para mostrar recibo */}
      <Dialog open={showReciboDialog} onOpenChange={setShowReciboDialog}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Recibo de reserva</DialogTitle>
            <DialogDescription>Detalles de tu reserva en {reservaSeleccionada?.propiedad}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {reservaSeleccionada && (
              <div className="border rounded-lg p-6" id="recibo-para-imprimir">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-primary">Mi Kaza</h2>
                    <p className="text-sm text-gray-500">Tu hogar lejos de casa</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Recibo de reserva</p>
                    <p className="text-sm text-gray-500">
                      Fecha: {new Date(reservaSeleccionada.fechaReserva || new Date()).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">Código: {reservaSeleccionada.codigoReserva || "MK-123456"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-medium mb-2 text-gray-700">Detalles de la propiedad</h3>
                    <div className="space-y-1">
                      <p className="font-medium">{reservaSeleccionada.propiedad}</p>
                      <p className="text-sm">{reservaSeleccionada.ubicacion}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {reservaSeleccionada.habitaciones && (
                          <Badge variant="outline" className="bg-gray-100">
                            <BedDouble className="h-3 w-3 mr-1" /> {reservaSeleccionada.habitaciones} hab.
                          </Badge>
                        )}
                        {reservaSeleccionada.banos && (
                          <Badge variant="outline" className="bg-gray-100">
                            <Bath className="h-3 w-3 mr-1" /> {reservaSeleccionada.banos} baños
                          </Badge>
                        )}
                        {reservaSeleccionada.huespedes && (
                          <Badge variant="outline" className="bg-gray-100">
                            <Users className="h-3 w-3 mr-1" /> {reservaSeleccionada.huespedes} huéspedes
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 text-gray-700">Detalles de la estancia</h3>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm">Check-in:</span>
                        <span className="font-medium">
                          {new Date(reservaSeleccionada.fechaInicio).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Check-out:</span>
                        <span className="font-medium">
                          {new Date(reservaSeleccionada.fechaFin).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Duración:</span>
                        <span className="font-medium">
                          {Math.ceil(
                            (new Date(reservaSeleccionada.fechaFin) - new Date(reservaSeleccionada.fechaInicio)) /
                              (1000 * 60 * 60 * 24),
                          )}{" "}
                          noches
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Estado:</span>
                        <span
                          className={`font-medium ${
                            reservaSeleccionada.estado === "Confirmada"
                              ? "text-green-600"
                              : reservaSeleccionada.estado === "Pendiente"
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          {reservaSeleccionada.estado}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-b py-4 mb-6">
                  <h3 className="font-medium mb-3 text-gray-700">Desglose de precios</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">
                        {formatearPrecio(
                          reservaSeleccionada.subtotal /
                            Math.ceil(
                              (new Date(reservaSeleccionada.fechaFin) - new Date(reservaSeleccionada.fechaInicio)) /
                                (1000 * 60 * 60 * 24),
                            ),
                        )}{" "}
                        x{" "}
                        {Math.ceil(
                          (new Date(reservaSeleccionada.fechaFin) - new Date(reservaSeleccionada.fechaInicio)) /
                            (1000 * 60 * 60 * 24),
                        )}{" "}
                        noches
                      </span>
                      <span>{formatearPrecio(reservaSeleccionada.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Tarifa de limpieza</span>
                      <span>{formatearPrecio(reservaSeleccionada.tarifaLimpieza)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Tarifa de servicio</span>
                      <span>{formatearPrecio(reservaSeleccionada.tarifaServicio)}</span>
                    </div>
                    <div className="flex justify-between font-bold pt-2 border-t mt-2">
                      <span>Total</span>
                      <span>{formatearPrecio(reservaSeleccionada.total)}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-2 text-gray-700">Información de pago</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">Método de pago:</span>
                      <span>{reservaSeleccionada.metodoPago || "Tarjeta terminada en 3456"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Fecha de pago:</span>
                      <span>{new Date(reservaSeleccionada.fechaReserva || new Date()).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Estado del pago:</span>
                      <span className="text-green-600 font-medium">Completado</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
                  <p className="mb-2">
                    <span className="font-medium">Política de cancelación:</span> Cancelación gratuita hasta 7 días
                    antes de la llegada. Después de ese período, se cobrará el 50% del total.
                  </p>
                  <p>
                    <span className="font-medium">Nota:</span> Este recibo es un comprobante de tu reserva. Por favor,
                    consérvalo para cualquier consulta futura.
                  </p>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">¡Gracias por elegir Mi Kaza para tu estancia!</p>
                  <p className="text-xs text-gray-400">© 2025 Mi Kaza. Todos los derechos reservados.</p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReciboDialog(false)}>
              Cerrar
            </Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={imprimirRecibo}>
              <Printer className="mr-2 h-4 w-4" /> Imprimir recibo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
