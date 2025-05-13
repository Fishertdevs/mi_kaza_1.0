"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  MapPin,
  Users,
  BedDouble,
  Bath,
  Home,
  Star,
  Check,
  Share2,
  Heart,
  ChevronLeft,
  Info,
  CheckCircle,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PaymentDialog } from "./payment-dialog"

// Tipo para las propiedades
interface Propiedad {
  id: number
  titulo: string
  descripcion: string
  tipoPropiedad?: string
  ubicacion: string
  precio: number
  precioPorPersona?: number
  capacidad: number
  habitaciones?: number
  banos?: number
  metrosCuadrados?: number
  servicios?: string[]
  normas?: string[]
  imagen: string
  estado: "activo" | "pendiente" | "inactivo" | "rechazado"
  fechaCreacion: string
  reservas?: number
  calificacion?: number
  coordenadas?: {
    lat: number
    lng: number
  }
}

// Tipo para las reseñas
interface Resena {
  id: number
  usuario: string
  avatar: string
  calificacion: number
  comentario: string
  fecha: string
}

// Descripciones de propiedades
const propertyDescriptions = {
  villaDeLeyva: {
    titulo: "Casa campestre con jardín en Villa de Leyva",
    descripcion:
      "Encantadora casa colonial a solo 10 minutos del centro histórico de Villa de Leyva. Disfruta de amplios jardines con vistas panorámicas a las montañas y el valle. La propiedad cuenta con una acogedora chimenea para las noches frescas, terraza con hamacas y espacios diseñados para la relajación y el descanso. Ideal para familias o grupos que buscan tranquilidad sin alejarse demasiado del encanto colonial del pueblo. A corta distancia de viñedos, museos y sitios de interés histórico.",
    tipoPropiedad: "Casa",
    ubicacion: "Villa de Leyva, Boyacá",
    precio: 380000,
    precioPorPersona: 45000,
    capacidad: 8,
    habitaciones: 4,
    banos: 3,
    metrosCuadrados: 220,
    servicios: ["WiFi", "Cocina completa", "Chimenea", "Jardín", "Terraza", "Parrilla", "Estacionamiento", "Lavadora"],
    normas: [
      "No fumar dentro de la casa",
      "Mascotas permitidas con previo aviso",
      "Check-in: 15:00",
      "Check-out: 12:00",
    ],
    coordenadas: {
      lat: 5.6339,
      lng: -73.5259,
    },
  },
  medellin: {
    titulo: "Loft moderno en El Poblado, Medellín",
    descripcion:
      "Espectacular loft de diseño contemporáneo ubicado en la exclusiva zona de El Poblado. Amplios ventanales del piso al techo que ofrecen vistas impresionantes de la ciudad y las montañas. A solo 5 minutos caminando del Parque Lleras, restaurantes de alta cocina y las mejores tiendas. El edificio cuenta con gimnasio completo, piscina en la terraza y seguridad 24/7. Interior decorado por reconocidos diseñadores locales, con acabados de lujo y tecnología inteligente. Perfecto para viajeros de negocios o parejas que buscan una experiencia urbana sofisticada.",
    tipoPropiedad: "Loft",
    ubicacion: "El Poblado, Medellín",
    precio: 320000,
    precioPorPersona: 50000,
    capacidad: 4,
    habitaciones: 1,
    banos: 1,
    metrosCuadrados: 85,
    servicios: [
      "WiFi de alta velocidad",
      "Smart TV",
      "Cocina equipada",
      "Aire acondicionado",
      "Gimnasio",
      "Piscina",
      "Seguridad 24/7",
      "Estacionamiento",
    ],
    normas: ["No fumar", "No mascotas", "No fiestas", "Check-in: 14:00", "Check-out: 11:00"],
    coordenadas: {
      lat: 6.2086,
      lng: -75.5695,
    },
  },
  bogota: {
    titulo: "Apartamento con terraza en Chapinero Alto, Bogotá",
    descripcion:
      "Luminoso y acogedor apartamento ubicado en Chapinero Alto con impresionantes vistas a los cerros orientales. A pocas cuadras de la Zona G, con los mejores restaurantes de la ciudad, y cerca de estaciones de TransMilenio para fácil movilidad. Cuenta con dos dormitorios cómodos, sala de estar con chimenea eléctrica y una terraza privada perfecta para disfrutar del atardecer bogotano. La cocina está completamente equipada para que puedas preparar tus propias comidas. El edificio ofrece seguridad las 24 horas y estacionamiento para visitantes. Ideal para parejas, familias pequeñas o profesionales que visitan la ciudad.",
    tipoPropiedad: "Apartamento",
    ubicacion: "Chapinero Alto, Bogotá",
    precio: 280000,
    precioPorPersona: 40000,
    capacidad: 6,
    habitaciones: 2,
    banos: 2,
    metrosCuadrados: 95,
    servicios: [
      "WiFi",
      "Terraza privada",
      "Chimenea eléctrica",
      "Cocina equipada",
      "Lavadora/Secadora",
      "Calefacción",
      "TV por cable",
      "Seguridad 24/7",
    ],
    normas: ["No fumar", "No mascotas", "Check-in: 14:00", "Check-out: 12:00", "Silencio después de las 22:00"],
    coordenadas: {
      lat: 4.6486,
      lng: -74.0565,
    },
  },
  guatape: {
    titulo: "Cabaña con vista al Peñol en Guatapé",
    descripcion:
      "Espectacular cabaña de madera ubicada a orillas del embalse de Guatapé con vistas directas al famoso Peñol. Cuenta con muelle privado para actividades acuáticas y un jacuzzi exterior desde donde podrás contemplar los atardeceres más hermosos. El interior de estilo rústico-chic combina la calidez de la madera con todas las comodidades modernas. La sala principal tiene una chimenea de leña y ventanales panorámicos que enmarcan el paisaje. Tres habitaciones con camas cómodas y baños completos. Cocina totalmente equipada y zona de barbacoa exterior. Perfecta para desconectar en familia o con amigos en un entorno natural incomparable.",
    tipoPropiedad: "Cabaña",
    ubicacion: "Guatapé, Antioquia",
    precio: 420000,
    precioPorPersona: 55000,
    capacidad: 8,
    habitaciones: 3,
    banos: 2,
    metrosCuadrados: 140,
    servicios: [
      "Muelle privado",
      "Jacuzzi exterior",
      "Chimenea",
      "WiFi",
      "Cocina completa",
      "Zona de barbacoa",
      "Estacionamiento",
      "Kayaks disponibles",
    ],
    normas: [
      "No fumar dentro de la cabaña",
      "Mascotas permitidas con depósito adicional",
      "Check-in: 15:00",
      "Check-out: 12:00",
    ],
    coordenadas: {
      lat: 6.2342,
      lng: -75.1574,
    },
  },
  santaMarta: {
    titulo: "Casa frente al mar en Taganga, Santa Marta",
    descripcion:
      "Impresionante casa de playa en primera línea de mar con acceso directo a una pequeña playa semi-privada en la bahía de Taganga. Disfruta de una piscina de borde infinito con vistas panorámicas al mar Caribe y atardeceres espectaculares. La propiedad de estilo mediterráneo cuenta con espacios abiertos que aprovechan la brisa marina y la luz natural. Cuatro amplias habitaciones con aire acondicionado y vistas al mar, cocina gourmet completamente equipada y múltiples terrazas para relajarse. Personal de servicio disponible bajo petición para limpieza diaria y preparación de comidas típicas de la región. A solo 15 minutos en coche del centro histórico de Santa Marta y 25 minutos del Parque Tayrona.",
    tipoPropiedad: "Casa",
    ubicacion: "Taganga, Santa Marta",
    precio: 550000,
    precioPorPersona: 60000,
    capacidad: 8,
    habitaciones: 4,
    banos: 4,
    metrosCuadrados: 280,
    servicios: [
      "Acceso directo a la playa",
      "Piscina infinita",
      "Aire acondicionado",
      "WiFi",
      "Cocina gourmet",
      "Múltiples terrazas",
      "Servicio de limpieza",
      "Estacionamiento",
    ],
    normas: [
      "No fumar dentro de la casa",
      "No mascotas",
      "No fiestas sin autorización previa",
      "Check-in: 16:00",
      "Check-out: 11:00",
    ],
    coordenadas: {
      lat: 11.2674,
      lng: -74.1915,
    },
  },
}

export default function PropiedadDetallePage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [propiedad, setPropiedad] = useState<Propiedad | null>(null)
  const [loading, setLoading] = useState(true)
  const [fechaLlegada, setFechaLlegada] = useState<Date | undefined>(undefined)
  const [fechaSalida, setFechaSalida] = useState<Date | undefined>(undefined)
  const [huespedes, setHuespedes] = useState(1)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mensajeAnfitrion, setMensajeAnfitrion] = useState("")
  const [showPagoDialog, setShowPagoDialog] = useState(false)
  const [showConfirmacionDialog, setShowConfirmacionDialog] = useState(false)
  const [mapaUrl, setMapaUrl] = useState("")

  // Reseñas de ejemplo
  const resenas: Resena[] = [
    {
      id: 1,
      usuario: "Laura Martínez",
      avatar: "/diverse-avatars.png",
      calificacion: 5,
      comentario: "Excelente ubicación y muy limpio. El anfitrión fue muy amable y atento. Definitivamente volveré.",
      fecha: "2025-03-15",
    },
    {
      id: 2,
      usuario: "Carlos Gómez",
      avatar: "/diverse-avatars.png",
      calificacion: 4,
      comentario:
        "Muy buena experiencia. El apartamento es tal como se ve en las fotos. La zona es tranquila y segura.",
      fecha: "2025-02-28",
    },
    {
      id: 3,
      usuario: "Ana Rodríguez",
      avatar: "/diverse-avatars.png",
      calificacion: 5,
      comentario: "Todo perfecto. La comunicación con el anfitrión fue excelente y el lugar es hermoso.",
      fecha: "2025-02-10",
    },
  ]

  // Cargar datos de la propiedad
  useEffect(() => {
    const propiedadId = Number(params.id)

    // Intentar cargar propiedades desde localStorage
    const propiedadesGuardadas = JSON.parse(localStorage.getItem("miKazaPropiedades") || "[]")

    // Buscar la propiedad por ID
    const propiedadEncontrada = propiedadesGuardadas.find((p: Propiedad) => p.id === propiedadId)

    if (propiedadEncontrada) {
      setPropiedad(propiedadEncontrada)

      // Generar URL del mapa
      if (propiedadEncontrada.coordenadas) {
        const { lat, lng } = propiedadEncontrada.coordenadas
        const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=600x400&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=YOUR_API_KEY`
        setMapaUrl(mapUrl)
      }
    } else {
      // Si no se encuentra, cargar una propiedad según el ID
      let propiedadDetallada: Propiedad | null = null

      switch (propiedadId) {
        case 1: // Cartagena
          propiedadDetallada = {
            id: propiedadId,
            titulo: "Apartamento con vista al mar en Cartagena",
            descripcion:
              "Hermoso apartamento con vista al mar en el centro histórico de Cartagena. Disfruta de la brisa marina y las hermosas puestas de sol desde el balcón. A pocos minutos caminando de restaurantes, tiendas y atracciones turísticas. El apartamento cuenta con todas las comodidades para hacer de tu estadía una experiencia inolvidable. Ideal para parejas o pequeñas familias que buscan disfrutar de lo mejor de Cartagena.",
            tipoPropiedad: "Apartamento",
            ubicacion: "Cartagena, Bolívar",
            precio: 250000,
            precioPorPersona: 35000,
            capacidad: 6,
            habitaciones: 2,
            banos: 1,
            metrosCuadrados: 80,
            servicios: [
              "WiFi",
              "Cocina",
              "Piscina",
              "Aire acondicionado",
              "TV",
              "Lavadora",
              "Secadora",
              "Estacionamiento",
            ],
            normas: ["No fumar", "No mascotas", "Check-in: 15:00", "Check-out: 11:00"],
            imagen: "/images/property1.png",
            estado: "activo",
            fechaCreacion: "2025-01-15T10:30:00Z",
            reservas: 3,
            calificacion: 4.8,
            coordenadas: {
              lat: 10.391049,
              lng: -75.479426,
            },
          }
          break
        case 2: // Villa de Leyva
          propiedadDetallada = {
            id: propiedadId,
            titulo: propertyDescriptions.villaDeLeyva.titulo,
            descripcion: propertyDescriptions.villaDeLeyva.descripcion,
            tipoPropiedad: propertyDescriptions.villaDeLeyva.tipoPropiedad,
            ubicacion: propertyDescriptions.villaDeLeyva.ubicacion,
            precio: propertyDescriptions.villaDeLeyva.precio,
            precioPorPersona: propertyDescriptions.villaDeLeyva.precioPorPersona,
            capacidad: 8,
            habitaciones: 4,
            banos: 3,
            metrosCuadrados: 220,
            servicios: propertyDescriptions.villaDeLeyva.servicios,
            normas: propertyDescriptions.villaDeLeyva.normas,
            imagen: "/images/property2.png",
            estado: "activo",
            fechaCreacion: "2025-01-10T14:20:00Z",
            reservas: 5,
            calificacion: 4.9,
            coordenadas: propertyDescriptions.villaDeLeyva.coordenadas,
          }
          break
        case 3: // Medellín
          propiedadDetallada = {
            id: propiedadId,
            titulo: propertyDescriptions.medellin.titulo,
            descripcion: propertyDescriptions.medellin.descripcion,
            tipoPropiedad: propertyDescriptions.medellin.tipoPropiedad,
            ubicacion: propertyDescriptions.medellin.ubicacion,
            precio: propertyDescriptions.medellin.precio,
            precioPorPersona: propertyDescriptions.medellin.precioPorPersona,
            capacidad: 4,
            habitaciones: 1,
            banos: 1,
            metrosCuadrados: 85,
            servicios: propertyDescriptions.medellin.servicios,
            normas: propertyDescriptions.medellin.normas,
            imagen: "/images/property3.png",
            estado: "activo",
            fechaCreacion: "2025-01-05T09:15:00Z",
            reservas: 8,
            calificacion: 4.7,
            coordenadas: propertyDescriptions.medellin.coordenadas,
          }
          break
        case 4: // Bogotá
          propiedadDetallada = {
            id: propiedadId,
            titulo: propertyDescriptions.bogota.titulo,
            descripcion: propertyDescriptions.bogota.descripcion,
            tipoPropiedad: propertyDescriptions.bogota.tipoPropiedad,
            ubicacion: propertyDescriptions.bogota.ubicacion,
            precio: propertyDescriptions.bogota.precio,
            precioPorPersona: propertyDescriptions.bogota.precioPorPersona,
            capacidad: 6,
            habitaciones: 2,
            banos: 2,
            metrosCuadrados: 95,
            servicios: propertyDescriptions.bogota.servicios,
            normas: propertyDescriptions.bogota.normas,
            imagen: "/images/property-bogota.png",
            estado: "activo",
            fechaCreacion: "2025-01-20T11:45:00Z",
            reservas: 4,
            calificacion: 4.6,
            coordenadas: propertyDescriptions.bogota.coordenadas,
          }
          break
        case 5: // Guatapé
          propiedadDetallada = {
            id: propiedadId,
            titulo: propertyDescriptions.guatape.titulo,
            descripcion: propertyDescriptions.guatape.descripcion,
            tipoPropiedad: propertyDescriptions.guatape.tipoPropiedad,
            ubicacion: propertyDescriptions.guatape.ubicacion,
            precio: propertyDescriptions.guatape.precio,
            precioPorPersona: propertyDescriptions.guatape.precioPorPersona,
            capacidad: 8,
            habitaciones: 3,
            banos: 2,
            metrosCuadrados: 140,
            servicios: propertyDescriptions.guatape.servicios,
            normas: propertyDescriptions.guatape.normas,
            imagen: "/images/property-guatape.png",
            estado: "activo",
            fechaCreacion: "2025-01-25T16:30:00Z",
            reservas: 6,
            calificacion: 4.9,
            coordenadas: propertyDescriptions.guatape.coordenadas,
          }
          break
        case 6: // Santa Marta
          propiedadDetallada = {
            id: propiedadId,
            titulo: propertyDescriptions.santaMarta.titulo,
            descripcion: propertyDescriptions.santaMarta.descripcion,
            tipoPropiedad: propertyDescriptions.santaMarta.tipoPropiedad,
            ubicacion: propertyDescriptions.santaMarta.ubicacion,
            precio: propertyDescriptions.santaMarta.precio,
            precioPorPersona: propertyDescriptions.santaMarta.precioPorPersona,
            capacidad: 8,
            habitaciones: 4,
            banos: 4,
            metrosCuadrados: 280,
            servicios: propertyDescriptions.santaMarta.servicios,
            normas: propertyDescriptions.santaMarta.normas,
            imagen: "/images/property-santa-marta.png",
            estado: "activo",
            fechaCreacion: "2025-01-30T13:10:00Z",
            reservas: 7,
            calificacion: 4.8,
            coordenadas: propertyDescriptions.santaMarta.coordenadas,
          }
          break
        default:
          // Propiedad por defecto (Cartagena)
          propiedadDetallada = {
            id: propiedadId,
            titulo: "Apartamento con vista al mar en Cartagena",
            descripcion:
              "Hermoso apartamento con vista al mar en el centro histórico de Cartagena. Disfruta de la brisa marina y las hermosas puestas de sol desde el balcón. A pocos minutos caminando de restaurantes, tiendas y atracciones turísticas. El apartamento cuenta con todas las comodidades para hacer de tu estadía una experiencia inolvidable. Ideal para parejas o pequeñas familias que buscan disfrutar de lo mejor de Cartagena.",
            tipoPropiedad: "Apartamento",
            ubicacion: "Cartagena, Bolívar",
            precio: 250000,
            precioPorPersona: 35000,
            capacidad: 6,
            habitaciones: 2,
            banos: 1,
            metrosCuadrados: 80,
            servicios: [
              "WiFi",
              "Cocina",
              "Piscina",
              "Aire acondicionado",
              "TV",
              "Lavadora",
              "Secadora",
              "Estacionamiento",
            ],
            normas: ["No fumar", "No mascotas", "Check-in: 15:00", "Check-out: 11:00"],
            imagen: "/images/property1.png",
            estado: "activo",
            fechaCreacion: "2025-01-15T10:30:00Z",
            reservas: 3,
            calificacion: 4.8,
            coordenadas: {
              lat: 10.391049,
              lng: -75.479426,
            },
          }
      }

      setPropiedad(propiedadDetallada)

      // Generar URL del mapa
      if (propiedadDetallada && propiedadDetallada.coordenadas) {
        const { lat, lng } = propiedadDetallada.coordenadas
        // Usar una API de mapas estáticos que no requiera clave API para desarrollo
        setMapaUrl(
          `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01}%2C${lat - 0.01}%2C${lng + 0.01}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lng}`,
        )
      }
    }

    setLoading(false)
  }, [params.id])

  // Formatear precio
  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(precio)
  }

  // Calcular total de la reserva
  const calcularTotal = () => {
    if (!fechaLlegada || !fechaSalida || !propiedad) return 0

    const diffTime = Math.abs(fechaSalida.getTime() - fechaLlegada.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    // Precio base por noche
    const precioPorNoche = propiedad.precio

    // Cargo adicional por persona (si hay más de 2 personas)
    const cargoAdicionalPersonas =
      huespedes > 2 ? (huespedes - 2) * (propiedad.precioPorPersona || 30000) * diffDays : 0

    return precioPorNoche * diffDays + cargoAdicionalPersonas
  }

  // Manejar reserva
  const handleReserva = () => {
    if (!fechaLlegada || !fechaSalida) {
      toast({
        title: "Error",
        description: "Por favor selecciona las fechas de llegada y salida",
        variant: "destructive",
      })
      return
    }

    // Mostrar diálogo de pago
    setShowPagoDialog(true)
  }

  // Completar reserva después del pago
  const handleCompletarReserva = () => {
    setIsSubmitting(true)

    // Simulación de proceso de pago y reserva
    setTimeout(() => {
      setIsSubmitting(false)
      setShowPagoDialog(false)
      setShowConfirmacionDialog(true)

      // Generar código único de reserva
      const codigoReserva = `MK-${Math.floor(100000 + Math.random() * 900000)}`

      // Generar indicaciones aleatorias según la ubicación
      const indicaciones = generarIndicacionesLlegada(propiedad.ubicacion)

      // Obtener información del usuario actual
      const nombreUsuario = localStorage.getItem("miKazaUserName") || "Usuario Huésped"
      const emailUsuario = localStorage.getItem("miKazaUserEmail") || "huesped@ejemplo.com"

      // Crear objeto de reserva
      const nuevaReserva = {
        id: Date.now(),
        codigoReserva: codigoReserva,
        propiedad: propiedad.titulo,
        ubicacion: propiedad.ubicacion,
        anfitrion: "Laura Martínez",
        anfitrionImagen: "/images/team2.png",
        anfitrionTelefono: "+57 315 123 4567",
        fechaInicio: fechaLlegada.toISOString(),
        fechaFin: fechaSalida.toISOString(),
        estado: "confirmada",
        huespedes: huespedes,
        total: calcularTotal() + 50000 + Math.round(calcularTotal() * 0.1),
        subtotal: calcularTotal(),
        tarifaLimpieza: 50000,
        tarifaServicio: Math.round(calcularTotal() * 0.1),
        imagen: propiedad.imagen,
        fechaReserva: new Date().toISOString(),
        metodoPago: "Tarjeta terminada en 3456",
        indicacionesLlegada: indicaciones,
        servicios: propiedad.servicios || [],
        normas: propiedad.normas || [],
        habitaciones: propiedad.habitaciones || 1,
        banos: propiedad.banos || 1,
        metrosCuadrados: propiedad.metrosCuadrados || 0,
        propiedadId: propiedad.id,
        propiedadTitulo: propiedad.titulo,
        propiedadImagen: propiedad.imagen,
        huesped: nombreUsuario,
        huespedEmail: emailUsuario,
        huespedTelefono: "+57 300 123 4567",
      }

      // Guardar la reserva en localStorage para el huésped
      const reservasExistentes = JSON.parse(localStorage.getItem("miKazaReservas") || "[]")
      localStorage.setItem("miKazaReservas", JSON.stringify([nuevaReserva, ...reservasExistentes]))

      // Guardar la reserva en localStorage para el anfitrión
      const reservasAnfitrion = JSON.parse(localStorage.getItem("miKazaReservasAnfitrion") || "[]")
      localStorage.setItem("miKazaReservasAnfitrion", JSON.stringify([nuevaReserva, ...reservasAnfitrion]))

      // Simular la carga de antecedentes del huésped
      const nuevoAntecedente = {
        id: Date.now() + 1,
        huespedId: Date.now(),
        huespedNombre: nombreUsuario,
        huespedEmail: emailUsuario,
        fechaCarga: new Date().toISOString(),
        estado: "pendiente",
        documento: "/placeholder.svg?key=documento-nuevo",
        reservaId: nuevaReserva.id,
        propiedadId: propiedad.id,
        propiedadTitulo: propiedad.titulo,
      }

      // Guardar el antecedente en localStorage
      const antecedentesExistentes = JSON.parse(localStorage.getItem("miKazaAntecedentes") || "[]")
      localStorage.setItem("miKazaAntecedentes", JSON.stringify([nuevoAntecedente, ...antecedentesExistentes]))

      toast({
        title: "¡Reserva exitosa!",
        description: "Tu reserva ha sido confirmada. Puedes ver los detalles en tu perfil.",
        duration: 5000,
      })
    }, 2000)
  }

  // Generar indicaciones de llegada según la ubicación
  const generarIndicacionesLlegada = (ubicacion: string) => {
    const ciudad = ubicacion.split(",")[0].trim()

    const indicacionesGenerales = [
      `Desde el aeropuerto de ${ciudad}, puedes tomar un taxi que tarda aproximadamente 30 minutos.`,
      `La propiedad está ubicada a 10 minutos caminando del centro histórico de ${ciudad}.`,
      `El edificio es de color blanco con detalles azules, tiene el número 42 en la entrada.`,
      `Al llegar, contacta al anfitrión para recibir las llaves. El código de acceso es 5678.`,
      `Hay estacionamiento disponible en el edificio, debes solicitar un pase al guardia de seguridad.`,
      `La parada de autobús más cercana es "Plaza Central", a 200 metros de la propiedad.`,
    ]

    // Indicaciones específicas según la ciudad
    let indicacionesEspecificas = []

    if (ciudad.includes("Cartagena")) {
      indicacionesEspecificas = [
        "La propiedad está dentro de la ciudad amurallada, cerca del Baluarte de Santo Domingo.",
        "Recomendamos llegar en taxi ya que las calles son estrechas y puede ser difícil encontrar estacionamiento.",
        "El edificio tiene una puerta colonial de madera con un llamador en forma de león.",
      ]
    } else if (ciudad.includes("Bogotá")) {
      indicacionesEspecificas = [
        "La propiedad está en la zona de Chapinero, cerca de la Zona G.",
        "Puedes tomar TransMilenio hasta la estación Calle 72 y caminar 5 minutos hacia el este.",
        "El edificio tiene seguridad 24/7 y debes anunciarte en recepción.",
      ]
    } else if (ciudad.includes("Medellín")) {
      indicacionesEspecificas = [
        "La propiedad está en El Poblado, a 10 minutos del Parque Lleras.",
        "Desde el aeropuerto José María Córdova, toma un taxi blanco oficial (aprox. 45 minutos).",
        "El edificio tiene una fachada moderna con jardín vertical en la entrada.",
      ]
    } else {
      indicacionesEspecificas = [
        `La propiedad está en una zona residencial tranquila de ${ciudad}.`,
        "Recomendamos usar aplicaciones de navegación para llegar sin problemas.",
        "El edificio tiene un portón negro con intercomunicador.",
      ]
    }

    return [...indicacionesGenerales, ...indicacionesEspecificas]
  }

  // Manejar envío de mensaje al anfitrión
  const handleEnviarMensaje = () => {
    if (!mensajeAnfitrion.trim()) {
      toast({
        title: "Error",
        description: "Por favor escribe un mensaje",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulación de envío de mensaje
    setTimeout(() => {
      setIsSubmitting(false)
      setMensajeAnfitrion("")

      toast({
        title: "Mensaje enviado",
        description: "Tu mensaje ha sido enviado al anfitrión. Te responderá a la brevedad.",
        duration: 3000,
      })
    }, 1500)
  }

  // Renderizar estrellas según calificación
  const renderEstrellas = (calificacion: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((estrella) => (
          <Star
            key={estrella}
            className={`h-4 w-4 ${estrella <= calificacion ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  // Formatear fecha
  const formatearFecha = (fechaString: string) => {
    const fecha = new Date(fechaString)
    return fecha.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Renderizar mapa interactivo
  const renderMapaInteractivo = () => {
    if (!propiedad || !propiedad.coordenadas) return null

    return (
      <div className="relative aspect-video rounded-lg overflow-hidden border">
        <iframe
          src={mapaUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Mapa de ${propiedad.ubicacion}`}
        ></iframe>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-solid border-[#87CEEB] border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Cargando detalles de la propiedad...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!propiedad) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto py-12 px-4">
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Home className="h-10 w-10 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Propiedad no encontrada</h1>
            <p className="text-gray-600 mb-8">
              Lo sentimos, la propiedad que estás buscando no existe o ha sido eliminada.
            </p>
            <Button asChild className="bg-[#87CEEB] hover:bg-[#5f9bbd]">
              <Link href="/propiedades">Ver otras propiedades</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="mb-6">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/propiedades">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Volver a propiedades
            </Link>
          </Button>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <h1 className="text-3xl font-bold">{propiedad.titulo}</h1>
            <div className="flex items-center mt-2 md:mt-0 space-x-2">
              <Button
                variant="outline"
                size="sm"
                className={`flex items-center ${isFavorite ? "text-red-500" : ""}`}
                onClick={() => {
                  setIsFavorite(!isFavorite)
                  toast({
                    title: isFavorite ? "Eliminado de favoritos" : "Añadido a favoritos",
                    duration: 2000,
                  })
                }}
              >
                <Heart className={`mr-1 h-4 w-4 ${isFavorite ? "fill-red-500" : ""}`} />
                {isFavorite ? "Guardado" : "Guardar"}
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Share2 className="mr-1 h-4 w-4" />
                Compartir
              </Button>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-600 mb-4">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{propiedad.ubicacion}</span>
            {propiedad.calificacion && (
              <>
                <span className="mx-2">•</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                  <span>{propiedad.calificacion}</span>
                  <span className="ml-1">({resenas.length} reseñas)</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Imagen principal */}
        <div className="mb-8">
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
            <Image
              src={propiedad.imagen || "/placeholder.svg"}
              alt={propiedad.titulo}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    {propiedad.tipoPropiedad} en {propiedad.ubicacion.split(",")[0]}
                  </h2>
                  <div className="flex flex-wrap items-center text-gray-600">
                    <div className="flex items-center mr-4 mb-2 md:mb-0">
                      <Users className="h-4 w-4 mr-1" />
                      <span>Máximo {propiedad.capacidad} huéspedes</span>
                    </div>
                    {propiedad.habitaciones && (
                      <div className="flex items-center mr-4 mb-2 md:mb-0">
                        <BedDouble className="h-4 w-4 mr-1" />
                        <span>{propiedad.habitaciones} habitaciones</span>
                      </div>
                    )}
                    {propiedad.banos && (
                      <div className="flex items-center mr-4 mb-2 md:mb-0">
                        <Bath className="h-4 w-4 mr-1" />
                        <span>{propiedad.banos} baños</span>
                      </div>
                    )}
                    {propiedad.metrosCuadrados && (
                      <div className="flex items-center mb-2 md:mb-0">
                        <Home className="h-4 w-4 mr-1" />
                        <span>{propiedad.metrosCuadrados} m²</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="text-2xl font-bold text-[#5f9bbd] mb-1">
                    {formatearPrecio(propiedad.precio)}
                    <span className="text-sm font-normal text-gray-600"> / noche</span>
                  </div>
                  {propiedad.precioPorPersona && (
                    <div className="text-sm text-gray-600">
                      +{formatearPrecio(propiedad.precioPorPersona)} por persona adicional
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-b py-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Descripción</h3>
                <p className="text-gray-700 whitespace-pre-line">{propiedad.descripcion}</p>
              </div>

              {propiedad.servicios && propiedad.servicios.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Lo que ofrece este alojamiento</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3">
                    {propiedad.servicios.map((servicio, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="h-5 w-5 text-[#5f9bbd] mr-2" />
                        <span>{servicio}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {propiedad.normas && propiedad.normas.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Normas de la casa</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3">
                    {propiedad.normas.map((norma, index) => (
                      <div key={index} className="flex items-center">
                        <Info className="h-5 w-5 text-[#5f9bbd] mr-2" />
                        <span>{norma}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Ubicación</h3>
              {renderMapaInteractivo()}
              <p className="mt-2 text-gray-600">
                Ubicación exacta proporcionada después de la reserva por motivos de seguridad.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Reseñas</h3>
                {propiedad.calificacion && (
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="font-medium">{propiedad.calificacion}</span>
                    <span className="text-gray-600 ml-1">({resenas.length} reseñas)</span>
                  </div>
                )}
              </div>

              {resenas.length > 0 ? (
                <div className="space-y-6">
                  {resenas.map((resena) => (
                    <div key={resena.id} className="border-b pb-6">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 relative rounded-full overflow-hidden mr-3">
                          <Image
                            src={resena.avatar || "/placeholder.svg"}
                            alt={resena.usuario}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{resena.usuario}</div>
                          <div className="text-sm text-gray-500">{formatearFecha(resena.fecha)}</div>
                        </div>
                      </div>
                      <div className="mb-2">{renderEstrellas(resena.calificacion)}</div>
                      <p className="text-gray-700">{resena.comentario}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border rounded-lg">
                  <Star className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <h4 className="text-lg font-medium mb-2">Sin reseñas aún</h4>
                  <p className="text-gray-500">Sé el primero en dejar una reseña para esta propiedad.</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="text-2xl font-bold text-[#5f9bbd] mb-1">
                    {formatearPrecio(propiedad.precio)}
                    <span className="text-sm font-normal text-gray-600"> / noche</span>
                  </div>
                  {propiedad.precioPorPersona && (
                    <div className="text-sm text-gray-600">
                      +{formatearPrecio(propiedad.precioPorPersona)} por persona adicional
                    </div>
                  )}
                  {propiedad.calificacion && (
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="font-medium">{propiedad.calificacion}</span>
                      <span className="text-gray-600 ml-1">({resenas.length} reseñas)</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <Label htmlFor="fechas">Fechas</Label>
                    <div className="flex items-center border rounded-md mt-1 overflow-hidden">
                      <div className="flex-1 p-3 border-r">
                        <div className="text-sm text-gray-500">Llegada</div>
                        <input
                          type="date"
                          className="w-full border-none p-0 focus:outline-none focus:ring-0"
                          value={fechaLlegada ? fechaLlegada.toISOString().split("T")[0] : ""}
                          onChange={(e) => {
                            if (e.target.value) {
                              setFechaLlegada(new Date(e.target.value))
                            }
                          }}
                          min={new Date().toISOString().split("T")[0]} // Deshabilita fechas anteriores al día actual
                        />
                      </div>
                      <div className="flex-1 p-3">
                        <div className="text-sm text-gray-500">Salida</div>
                        <input
                          type="date"
                          className="w-full border-none p-0 focus:outline-none focus:ring-0"
                          value={fechaSalida ? fechaSalida.toISOString().split("T")[0] : ""}
                          onChange={(e) => {
                            if (e.target.value) {
                              setFechaSalida(new Date(e.target.value))
                            }
                          }}
                          min={
                            fechaLlegada
                              ? new Date(fechaLlegada.getTime() + 86400000).toISOString().split("T")[0]
                              : new Date().toISOString().split("T")[0]
                          } // Mínimo día siguiente a la llegada o día actual
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="huespedes">Huéspedes</Label>
                    <div className="flex items-center border rounded-md p-3 mt-1">
                      <div className="flex-1">
                        <div className="font-medium">
                          {huespedes} huésped{huespedes !== 1 ? "es" : ""}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 rounded-full"
                          onClick={() => setHuespedes((prev) => Math.max(1, prev - 1))}
                          disabled={huespedes <= 1}
                        >
                          -
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 rounded-full"
                          onClick={() => setHuespedes((prev) => Math.min(propiedad.capacidad, prev + 1))}
                          disabled={huespedes >= propiedad.capacidad}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-[#87CEEB] hover:bg-[#5f9bbd] mb-4" onClick={handleReserva}>
                  Reservar
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    // Verificar si el usuario está logueado
                    const isLoggedIn = localStorage.getItem("miKazaUserEmail") ? true : false

                    if (isLoggedIn) {
                      // Mostrar modal de mensaje
                      document.getElementById("mensaje-anfitrion-trigger")?.click()
                    } else {
                      // Mostrar modal de login
                      setShowLoginDialog(true)
                    }
                  }}
                >
                  Contactar al anfitrión
                </Button>

                {fechaLlegada && fechaSalida && (
                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>
                        {formatearPrecio(propiedad.precio)} x{" "}
                        {Math.ceil(Math.abs((fechaSalida.getTime() - fechaLlegada.getTime()) / (1000 * 60 * 60 * 24)))}{" "}
                        noches
                      </span>
                      <span>
                        {formatearPrecio(
                          propiedad.precio *
                            Math.ceil(
                              Math.abs((fechaSalida.getTime() - fechaLlegada.getTime()) / (1000 * 60 * 60 * 24)),
                            ),
                        )}
                      </span>
                    </div>
                    {huespedes > 2 && (
                      <div className="flex justify-between">
                        <span>Cargo por {huespedes - 2} persona(s) adicional(es)</span>
                        <span>
                          {formatearPrecio(
                            (huespedes - 2) *
                              (propiedad.precioPorPersona || 30000) *
                              Math.ceil(
                                Math.abs((fechaSalida.getTime() - fechaLlegada.getTime()) / (1000 * 60 * 60 * 24)),
                              ),
                          )}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Tarifa de limpieza</span>
                      <span>{formatearPrecio(50000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tarifa de servicio</span>
                      <span>{formatearPrecio(Math.round(calcularTotal() * 0.1))}</span>
                    </div>
                    <div className="border-t pt-3 mt-3 flex justify-between font-bold">
                      <span>Total</span>
                      <span>{formatearPrecio(calcularTotal() + 50000 + Math.round(calcularTotal() * 0.1))}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Diálogo para mensaje al anfitrión */}
      <Dialog>
        <DialogTrigger id="mensaje-anfitrion-trigger" className="hidden">
          Abrir
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contactar al anfitrión</DialogTitle>
            <DialogDescription>
              Envía un mensaje al anfitrión para resolver tus dudas sobre la propiedad.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="mensaje" className="mb-2 block">
              Tu mensaje
            </Label>
            <Textarea
              id="mensaje"
              placeholder="Escribe tu mensaje aquí..."
              rows={5}
              value={mensajeAnfitrion}
              onChange={(e) => setMensajeAnfitrion(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => document.getElementById("mensaje-anfitrion-trigger")?.click()}>
              Cancelar
            </Button>
            <Button className="bg-[#87CEEB] hover:bg-[#5f9bbd]" onClick={handleEnviarMensaje} disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar mensaje"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para login */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Iniciar sesión</DialogTitle>
            <DialogDescription>Debes iniciar sesión para contactar al anfitrión.</DialogDescription>
          </DialogHeader>
          <div className="py-4 flex justify-center">
            <Button asChild className="bg-[#87CEEB] hover:bg-[#5f9bbd]">
              <Link href="/auth/login">Iniciar sesión</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Diálogo para pago */}
      <PaymentDialog
        open={showPagoDialog}
        onOpenChange={setShowPagoDialog}
        onComplete={handleCompletarReserva}
        total={calcularTotal() + 50000 + Math.round(calcularTotal() * 0.1)}
      />

      {/* Diálogo de confirmación de reserva */}
      <Dialog open={showConfirmacionDialog} onOpenChange={setShowConfirmacionDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-green-600">
              <CheckCircle className="mr-2 h-5 w-5" /> ¡Reserva confirmada!
            </DialogTitle>
            <DialogDescription>Tu reserva ha sido confirmada exitosamente</DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-4">
              <h3 className="font-medium text-green-800 mb-2">Detalles de la reserva</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Propiedad:</span>
                  <span className="font-medium">{propiedad.titulo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fechas:</span>
                  <span className="font-medium">
                    {fechaLlegada?.toLocaleDateString()} - {fechaSalida?.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Huéspedes:</span>
                  <span className="font-medium">{huespedes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total pagado:</span>
                  <span className="font-medium">
                    {formatearPrecio(calcularTotal() + 50000 + Math.round(calcularTotal() * 0.1))}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-center text-gray-600 mb-4">
              Hemos enviado un correo electrónico con todos los detalles de tu reserva.
            </p>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              className="sm:flex-1"
              onClick={() => {
                setShowConfirmacionDialog(false)
              }}
            >
              Cerrar
            </Button>
            <Button
              className="sm:flex-1 bg-[#87CEEB] hover:bg-[#5f9bbd]"
              onClick={() => {
                setShowConfirmacionDialog(false)
                router.push("/huesped/dashboard?tab=reservas&new=true")
              }}
            >
              Ver mis reservas
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
