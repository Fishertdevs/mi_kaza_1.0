"use client"

import { CardFooter } from "@/components/ui/card"

import { useRef } from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import {
  Home,
  Calendar,
  PlusCircle,
  MessageSquare,
  Bell,
  Star,
  DollarSign,
  ArrowUpRight,
  Eye,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  FileText,
  Settings,
  Download,
  Save,
  Clock,
  Percent,
  AlertCircle,
  CalendarDays,
  MapPin,
  Copy,
  Printer,
  Share2,
  Building,
  LogOut,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import { es } from "date-fns/locale"

// Tipos
interface Propiedad {
  id: number
  titulo: string
  descripcion: string
  ubicacion: string
  precio: number
  imagen: string
  estado: "activo" | "pendiente" | "inactivo" | "rechazado"
  fechaCreacion: string
  reservas?: number
  calificacion?: number
  capacidad?: number
  habitaciones?: number
  banos?: number
  servicios?: string[]
  ingresos?: number
  ocupacion?: number
}

interface Reserva {
  id: number
  propiedadId: number
  propiedadTitulo: string
  propiedadImagen: string
  huesped: string
  huespedEmail?: string
  huespedTelefono?: string
  fechaLlegada: string
  fechaSalida: string
  estado: "confirmada" | "pendiente" | "cancelada" | "completada"
  total: number
  fechaReserva?: string
  metodoPago?: string
  numeroHuespedes?: number
  solicitudesEspeciales?: string
  codigoReserva?: string
}

interface Mensaje {
  id: number
  remitente: string
  contenido: string
  fecha: string
  leido: boolean
  propiedadId?: number
  propiedadTitulo?: string
  avatar?: string
  conversacion?: Array<{
    id: number
    remitente: "huesped" | "anfitrion"
    contenido: string
    fecha: string
  }>
}

interface Pago {
  id: number
  propiedadId: number
  propiedadTitulo: string
  reservaId: number
  monto: number
  fecha: string
  estado: "completado" | "pendiente" | "fallido"
  metodoPago: string
  comision: number
  montoNeto: number
  referencia: string
}

interface Notificacion {
  id: number
  tipo: "reserva" | "mensaje" | "pago" | "sistema"
  titulo: string
  descripcion: string
  fecha: string
  leida: boolean
  enlace?: string
}

interface PlantillaMensaje {
  id: number
  titulo: string
  contenido: string
}

interface Usuario {
  nombre: string
  email: string
  tipo: string
}

interface Antecedente {
  id: number
  huespedId: number
  huespedNombre: string
  huespedEmail: string
  fechaCarga: string
  estado: "verificado" | "pendiente" | "rechazado"
  documento: string
  reservaId: number
  propiedadId: number
  propiedadTitulo: string
}

export default function AnfitrionDashboardPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [propiedades, setPropiedades] = useState<Propiedad[]>([])
  const [reservas, setReservas] = useState<Reserva[]>([])
  const [mensajes, setMensajes] = useState<Mensaje[]>([])
  const [pagos, setPagos] = useState<Pago[]>([])
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([])
  const [plantillasMensaje, setPlantillasMensaje] = useState<PlantillaMensaje[]>([])
  const [antecedentes, setAntecedentes] = useState<Antecedente[]>([])
  const [loading, setLoading] = useState(true)
  const [propiedadAEliminar, setPropiedadAEliminar] = useState<number | null>(null)
  const [respuestaMensaje, setRespuestaMensaje] = useState("")
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState<Mensaje | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showNotificaciones, setShowNotificaciones] = useState(false)
  const [showPlantillasDialog, setShowPlantillasDialog] = useState(false)
  const [nuevaPlantilla, setNuevaPlantilla] = useState({ titulo: "", contenido: "" })
  const [showCalendarioReservas, setShowCalendarioReservas] = useState(false)
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | undefined>(new Date())
  const [showFacturaDialog, setShowFacturaDialog] = useState(false)
  const [facturaSeleccionada, setFacturaSeleccionada] = useState<Pago | null>(null)
  const [filtroReservas, setFiltroReservas] = useState("todas")
  const [filtroPagos, setFiltroPagos] = useState("todos")
  const [showConfiguracionPagos, setShowConfiguracionPagos] = useState(false)
  const [metodoPagoPreferido, setMetodoPagoPreferido] = useState("transferencia")
  const [datosFacturacion, setDatosFacturacion] = useState({
    nombre: "Carlos Rodríguez",
    documento: "1098765432",
    direccion: "Calle 123 #45-67, Bogotá",
    telefono: "+57 300 123 4567",
    email: "carlos.rodriguez@ejemplo.com",
  })
  const [showDetallePropiedad, setShowDetallePropiedad] = useState(false)
  const [propiedadSeleccionada, setpropiedadSeleccionada] = useState<Propiedad | null>(null)
  const [showDetalleReserva, setShowDetalleReserva] = useState(false)
  const [reservaSeleccionada, setReservaSeleccionada] = useState<Reserva | null>(null)
  const imprimirRef = useRef<HTMLDivElement>(null)
  const [usuario, setUsuario] = useState<Usuario>({
    nombre: "Usuario Anfitrión",
    email: "anfitrion@ejemplo.com",
    tipo: "anfitrion",
  })

  // Cargar datos
  useEffect(() => {
    // Simulación de carga de datos
    setTimeout(() => {
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
      // Intentar cargar propiedades desde localStorage
      const propiedadesGuardadas = localStorage.getItem("miKazaPropiedadesAnfitrion")

      if (propiedadesGuardadas) {
        setPropiedades(JSON.parse(propiedadesGuardadas))
      } else {
        // Datos de ejemplo
        const propiedadesEjemplo: Propiedad[] = [
          {
            id: 1,
            titulo: "Apartamento con vista al mar en Cartagena",
            descripcion: "Hermoso apartamento con vista al mar en el centro histórico de Cartagena",
            ubicacion: "Cartagena, Bolívar",
            precio: 250000,
            imagen: "/images/property1.png",
            estado: "activo",
            fechaCreacion: "2025-01-15T10:30:00Z",
            reservas: 3,
            calificacion: 4.8,
            capacidad: 4,
            habitaciones: 2,
            banos: 1,
            servicios: ["WiFi", "Cocina", "Piscina", "Aire acondicionado"],
            ingresos: 2250000,
            ocupacion: 75,
          },
          {
            id: 2,
            titulo: "Casa campestre en Villa de Leyva",
            descripcion: "Espaciosa casa campestre ideal para familias y grupos grandes",
            ubicacion: "Villa de Leyva, Boyacá",
            precio: 350000,
            imagen: "/images/property2.png",
            estado: "pendiente",
            fechaCreacion: "2025-02-20T14:45:00Z",
            capacidad: 8,
            habitaciones: 4,
            banos: 3,
            servicios: ["WiFi", "Cocina", "Jardín", "Parrilla"],
            ingresos: 0,
            ocupacion: 0,
          },
          {
            id: 3,
            titulo: "Loft moderno en Medellín",
            descripcion: "Loft moderno y acogedor en el corazón de El Poblado",
            ubicacion: "Medellín, Antioquia",
            precio: 180000,
            imagen: "/images/property3.png",
            estado: "activo",
            fechaCreacion: "2025-01-05T09:15:00Z",
            reservas: 5,
            calificacion: 4.5,
            capacidad: 2,
            habitaciones: 1,
            banos: 1,
            servicios: ["WiFi", "Cocina", "Gimnasio", "Terraza"],
            ingresos: 1800000,
            ocupacion: 60,
          },
        ]

        setPropiedades(propiedadesEjemplo)

        // Guardar en localStorage
        localStorage.setItem("miKazaPropiedadesAnfitrion", JSON.stringify(propiedadesEjemplo))
      }

      // Cargar reservas desde localStorage o usar datos de ejemplo
      const reservasGuardadas = localStorage.getItem("miKazaReservasAnfitrion")
      if (reservasGuardadas) {
        setReservas(JSON.parse(reservasGuardadas))
      } else {
        // Datos de reservas de ejemplo
        const reservasEjemplo = [
          {
            id: 1,
            propiedadId: 1,
            propiedadTitulo: "Apartamento con vista al mar en Cartagena",
            propiedadImagen: "/images/property1.png",
            huesped: "Laura Martínez",
            huespedEmail: "laura.martinez@ejemplo.com",
            huespedTelefono: "+57 300 987 6543",
            fechaLlegada: "2025-06-15",
            fechaSalida: "2025-06-20",
            estado: "confirmada",
            total: 1250000,
            fechaReserva: "2025-03-10T15:30:00Z",
            metodoPago: "Tarjeta de crédito",
            numeroHuespedes: 3,
            solicitudesEspeciales: "Necesitamos una cuna para bebé",
            codigoReserva: "MK-25061501",
          },
          {
            id: 2,
            propiedadId: 3,
            propiedadTitulo: "Loft moderno en Medellín",
            propiedadImagen: "/images/property3.png",
            huesped: "Carlos Gómez",
            huespedEmail: "carlos.gomez@ejemplo.com",
            huespedTelefono: "+57 310 123 4567",
            fechaLlegada: "2025-05-10",
            fechaSalida: "2025-05-15",
            estado: "pendiente",
            total: 900000,
            fechaReserva: "2025-03-05T10:15:00Z",
            metodoPago: "Pendiente",
            numeroHuespedes: 2,
            codigoReserva: "MK-25051002",
          },
          {
            id: 3,
            propiedadId: 1,
            propiedadTitulo: "Apartamento con vista al mar en Cartagena",
            propiedadImagen: "/images/property1.png",
            huesped: "Ana Rodríguez",
            huespedEmail: "ana.rodriguez@ejemplo.com",
            huespedTelefono: "+57 320 456 7890",
            fechaLlegada: "2025-07-05",
            fechaSalida: "2025-07-10",
            estado: "confirmada",
            total: 1250000,
            fechaReserva: "2025-03-12T09:45:00Z",
            metodoPago: "Transferencia bancaria",
            numeroHuespedes: 4,
            solicitudesEspeciales: "Llegamos tarde, después de las 22:00",
            codigoReserva: "MK-25070503",
          },
          {
            id: 4,
            propiedadId: 3,
            propiedadTitulo: "Loft moderno en Medellín",
            propiedadImagen: "/images/property3.png",
            huesped: "Pedro Sánchez",
            huespedEmail: "pedro.sanchez@ejemplo.com",
            huespedTelefono: "+57 315 789 0123",
            fechaLlegada: "2025-04-20",
            fechaSalida: "2025-04-25",
            estado: "completada",
            total: 900000,
            fechaReserva: "2025-02-15T14:20:00Z",
            metodoPago: "Tarjeta de crédito",
            numeroHuespedes: 2,
            codigoReserva: "MK-25042004",
          },
          {
            id: 5,
            propiedadId: 1,
            propiedadTitulo: "Apartamento con vista al mar en Cartagena",
            propiedadImagen: "/images/property1.png",
            huesped: "María López",
            huespedEmail: "maria.lopez@ejemplo.com",
            huespedTelefono: "+57 300 234 5678",
            fechaLlegada: "2025-08-10",
            fechaSalida: "2025-08-15",
            estado: "pendiente",
            total: 1250000,
            fechaReserva: "2025-03-18T11:30:00Z",
            metodoPago: "Pendiente",
            numeroHuespedes: 2,
            solicitudesEspeciales: "Preferimos piso alto con buena vista",
            codigoReserva: "MK-25081005",
          },
        ]
        setReservas(reservasEjemplo)
        localStorage.setItem("miKazaReservasAnfitrion", JSON.stringify(reservasEjemplo))
      }

      // Cargar antecedentes desde localStorage o usar datos de ejemplo
      const antecedentesGuardados = localStorage.getItem("miKazaAntecedentes")
      if (antecedentesGuardados) {
        setAntecedentes(JSON.parse(antecedentesGuardados))
      } else {
        // Datos de antecedentes de ejemplo
        const antecedentesEjemplo: Antecedente[] = [
          {
            id: 1,
            huespedId: 101,
            huespedNombre: "Laura Martínez",
            huespedEmail: "laura.martinez@ejemplo.com",
            fechaCarga: "2025-03-10T15:30:00Z",
            estado: "verificado",
            documento: "/placeholder.svg?key=documento1",
            reservaId: 1,
            propiedadId: 1,
            propiedadTitulo: "Apartamento con vista al mar en Cartagena",
          },
          {
            id: 2,
            huespedId: 102,
            huespedNombre: "Carlos Gómez",
            huespedEmail: "carlos.gomez@ejemplo.com",
            fechaCarga: "2025-03-05T10:15:00Z",
            estado: "pendiente",
            documento: "/placeholder.svg?key=documento2",
            reservaId: 2,
            propiedadId: 3,
            propiedadTitulo: "Loft moderno en Medellín",
          },
          {
            id: 3,
            huespedId: 103,
            huespedNombre: "Ana Rodríguez",
            huespedEmail: "ana.rodriguez@ejemplo.com",
            fechaCarga: "2025-03-12T09:45:00Z",
            estado: "verificado",
            documento: "/placeholder.svg?key=documento3",
            reservaId: 3,
            propiedadId: 1,
            propiedadTitulo: "Apartamento con vista al mar en Cartagena",
          },
        ]

        setAntecedentes(antecedentesEjemplo)
        localStorage.setItem("miKazaAntecedentes", JSON.stringify(antecedentesEjemplo))
      }

      // Datos de mensajes de ejemplo
      setMensajes([
        {
          id: 1,
          remitente: "Laura Martínez",
          contenido: "Hola, me gustaría saber si el apartamento tiene aire acondicionado en todas las habitaciones.",
          fecha: "2025-03-15T14:30:00Z",
          leido: false,
          propiedadId: 1,
          propiedadTitulo: "Apartamento con vista al mar en Cartagena",
          avatar: "/placeholder.svg?key=huesped1",
          conversacion: [
            {
              id: 1,
              remitente: "huesped",
              contenido:
                "Hola, me gustaría saber si el apartamento tiene aire acondicionado en todas las habitaciones.",
              fecha: "2025-03-15T14:30:00Z",
            },
          ],
        },
        {
          id: 2,
          remitente: "Carlos Gómez",
          contenido:
            "¿El loft tiene estacionamiento disponible? Viajaré en carro y necesito saber si hay donde dejarlo.",
          fecha: "2025-03-14T10:15:00Z",
          leido: true,
          propiedadId: 3,
          propiedadTitulo: "Loft moderno en Medellín",
          avatar: "/placeholder.svg?key=huesped2",
          conversacion: [
            {
              id: 1,
              remitente: "huesped",
              contenido:
                "¿El loft tiene estacionamiento disponible? Viajaré en carro y necesito saber si hay donde dejarlo.",
              fecha: "2025-03-14T10:15:00Z",
            },
            {
              id: 2,
              remitente: "anfitrion",
              contenido:
                "Hola Carlos, sí, el edificio cuenta con estacionamiento para huéspedes sin costo adicional. Solo necesitas registrar tu vehículo en recepción al llegar.",
              fecha: "2025-03-14T11:30:00Z",
            },
            {
              id: 3,
              remitente: "huesped",
              contenido: "¡Perfecto! Muchas gracias por la información.",
              fecha: "2025-03-14T12:45:00Z",
            },
          ],
        },
        {
          id: 3,
          remitente: "Ana Rodríguez",
          contenido: "¿Puedo hacer check-in más temprano? Mi vuelo llega a las 10 am.",
          fecha: "2025-03-13T18:45:00Z",
          leido: false,
          propiedadId: 1,
          propiedadTitulo: "Apartamento con vista al mar en Cartagena",
          avatar: "/placeholder.svg?key=huesped3",
          conversacion: [
            {
              id: 1,
              remitente: "huesped",
              contenido: "¿Puedo hacer check-in más temprano? Mi vuelo llega a las 10 am.",
              fecha: "2025-03-13T18:45:00Z",
            },
          ],
        },
      ])

      // Datos de pagos de ejemplo
      setPagos([
        {
          id: 1,
          propiedadId: 1,
          propiedadTitulo: "Apartamento con vista al mar en Cartagena",
          reservaId: 1,
          monto: 1250000,
          fecha: "2025-03-10T15:30:00Z",
          estado: "completado",
          metodoPago: "Tarjeta de crédito",
          comision: 125000,
          montoNeto: 1125000,
          referencia: "PAY-25031001",
        },
        {
          id: 2,
          propiedadId: 1,
          propiedadTitulo: "Apartamento con vista al mar en Cartagena",
          reservaId: 3,
          monto: 1250000,
          fecha: "2025-03-12T09:45:00Z",
          estado: "completado",
          metodoPago: "Transferencia bancaria",
          comision: 125000,
          montoNeto: 1125000,
          referencia: "PAY-25031202",
        },
        {
          id: 3,
          propiedadId: 3,
          propiedadTitulo: "Loft moderno en Medellín",
          reservaId: 4,
          monto: 900000,
          fecha: "2025-02-15T14:20:00Z",
          estado: "completado",
          metodoPago: "Tarjeta de crédito",
          comision: 90000,
          montoNeto: 810000,
          referencia: "PAY-25021503",
        },
        {
          id: 4,
          propiedadId: 3,
          propiedadTitulo: "Loft moderno en Medellín",
          reservaId: 2,
          monto: 900000,
          fecha: "2025-03-05T10:15:00Z",
          estado: "pendiente",
          metodoPago: "Pendiente",
          comision: 90000,
          montoNeto: 810000,
          referencia: "PAY-25030504",
        },
      ])

      // Datos de notificaciones de ejemplo
      setNotificaciones([
        {
          id: 1,
          tipo: "reserva",
          titulo: "Nueva solicitud de reserva",
          descripcion: "Has recibido una nueva solicitud de reserva para 'Apartamento con vista al mar en Cartagena'",
          fecha: "2025-03-18T11:30:00Z",
          leida: false,
          enlace: "/anfitrion/reservas",
        },
        {
          id: 2,
          tipo: "mensaje",
          titulo: "Nuevo mensaje",
          descripcion: "Laura Martínez te ha enviado un mensaje sobre 'Apartamento con vista al mar en Cartagena'",
          fecha: "2025-03-15T14:30:00Z",
          leida: false,
          enlace: "/anfitrion/mensajes",
        },
        {
          id: 3,
          tipo: "pago",
          titulo: "Pago recibido",
          descripcion: "Has recibido un pago de $1,250,000 por la reserva de Ana Rodríguez",
          fecha: "2025-03-12T09:45:00Z",
          leida: true,
          enlace: "/anfitrion/pagos",
        },
        {
          id: 4,
          tipo: "sistema",
          titulo: "Actualización de políticas",
          descripcion: "Hemos actualizado nuestras políticas de cancelación. Por favor revisa los cambios.",
          fecha: "2025-03-01T08:00:00Z",
          leida: true,
          enlace: "/politicas",
        },
      ])

      // Plantillas de mensajes
      setPlantillasMensaje([
        {
          id: 1,
          titulo: "Bienvenida",
          contenido:
            "¡Hola! Gracias por tu interés en mi propiedad. Estoy a tu disposición para resolver cualquier duda que tengas.",
        },
        {
          id: 2,
          titulo: "Información de check-in",
          contenido:
            "El check-in es a partir de las 15:00 y el check-out hasta las 11:00. Si necesitas horarios especiales, házmelo saber con anticipación.",
        },
        {
          id: 3,
          titulo: "Confirmación de reserva",
          contenido:
            "¡Excelente! Tu reserva ha sido confirmada. Unos días antes de tu llegada te enviaré los detalles para el check-in.",
        },
      ])

      setLoading(false)
    }, 1500)
  }, [])

  // Cambiar estado de antecedente
  const cambiarEstadoAntecedente = (id: number, nuevoEstado: "verificado" | "rechazado") => {
    const nuevosAntecedentes = antecedentes.map((antecedente) =>
      antecedente.id === id ? { ...antecedente, estado: nuevoEstado } : antecedente,
    )

    setAntecedentes(nuevosAntecedentes)
    localStorage.setItem("miKazaAntecedentes", JSON.stringify(nuevosAntecedentes))

    toast({
      title: "Estado actualizado",
      description: `El antecedente ha sido ${nuevoEstado === "verificado" ? "verificado" : "rechazado"}.`,
      duration: 3000,
    })
  }

  // Filtrar antecedentes por estado
  const [filtroAntecedentes, setFiltroAntecedentes] = useState("todos")

  const filtrarAntecedentes = () => {
    if (filtroAntecedentes === "todos") {
      return antecedentes
    }
    return antecedentes.filter((antecedente) => antecedente.estado === filtroAntecedentes)
  }

  // Datos para gráficos
  const datosIngresos = [
    { mes: "Ene", ingresos: 1200000 },
    { mes: "Feb", ingresos: 1500000 },
    { mes: "Mar", ingresos: 1800000 },
    { mes: "Abr", ingresos: 2200000 },
    { mes: "May", ingresos: 1900000 },
    { mes: "Jun", ingresos: 2500000 },
  ]

  const datosOcupacion = [
    { mes: "Ene", ocupacion: 65 },
    { mes: "Feb", ocupacion: 75 },
    { mes: "Mar", ocupacion: 85 },
    { mes: "Abr", ocupacion: 90 },
    { mes: "May", ocupacion: 80 },
    { mes: "Jun", ocupacion: 95 },
  ]

  const datosTipoReserva = [
    { name: "Fin de semana", value: 45 },
    { name: "Semana completa", value: 30 },
    { name: "Larga estancia", value: 15 },
    { name: "Días laborales", value: 10 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  // Formatear precio
  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(precio)
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

  // Eliminar propiedad
  const eliminarPropiedad = (id: number) => {
    setIsSubmitting(true)

    // Simulación de eliminación
    setTimeout(() => {
      const nuevasPropiedades = propiedades.filter((propiedad) => propiedad.id !== id)
      setPropiedades(nuevasPropiedades)

      // Actualizar localStorage
      localStorage.setItem("miKazaPropiedadesAnfitrion", JSON.stringify(nuevasPropiedades))

      // Actualizar también las propiedades globales
      const propiedadesGlobales = JSON.parse(localStorage.getItem("miKazaPropiedades") || "[]")
      const nuevasPropiedadesGlobales = propiedadesGlobales.filter((propiedad: Propiedad) => propiedad.id !== id)
      localStorage.setItem("miKazaPropiedades", JSON.stringify(nuevasPropiedadesGlobales))

      setPropiedadAEliminar(null)
      setIsSubmitting(false)

      toast({
        title: "Propiedad eliminada",
        description: "La propiedad ha sido eliminada correctamente.",
        duration: 3000,
      })
    }, 1000)
  }

  // Responder mensaje
  const responderMensaje = () => {
    if (!respuestaMensaje.trim() || !mensajeSeleccionado) {
      toast({
        title: "Error",
        description: "Por favor escribe un mensaje de respuesta.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulación de envío de respuesta
    setTimeout(() => {
      // Marcar mensaje como leído
      const nuevosMensajes = mensajes.map((mensaje) =>
        mensaje.id === mensajeSeleccionado.id ? { ...mensaje, leido: true } : mensaje,
      )
      setMensajes(nuevosMensajes)

      setMensajeSeleccionado(null)
      setRespuestaMensaje("")
      setIsSubmitting(false)

      toast({
        title: "Mensaje enviado",
        description: "Tu respuesta ha sido enviada correctamente.",
        duration: 3000,
      })
    }, 1000)
  }

  // Cambiar estado de reserva
  const cambiarEstadoReserva = (id: number, nuevoEstado: "confirmada" | "cancelada" | "completada") => {
    const nuevasReservas = reservas.map((reserva) =>
      reserva.id === id ? { ...reserva, estado: nuevoEstado } : reserva,
    )
    setReservas(nuevasReservas)

    toast({
      title: "Estado actualizado",
      description: `La reserva ha sido ${
        nuevoEstado === "confirmada"
          ? "confirmada"
          : nuevoEstado === "cancelada"
            ? "cancelada"
            : "marcada como completada"
      }.`,
      duration: 3000,
    })
  }

  // Marcar notificación como leída
  const marcarNotificacionLeida = (id: number) => {
    const nuevasNotificaciones = notificaciones.map((notif) => (notif.id === id ? { ...notif, leida: true } : notif))
    setNotificaciones(nuevasNotificaciones)
  }

  // Marcar todas las notificaciones como leídas
  const marcarTodasLeidas = () => {
    const nuevasNotificaciones = notificaciones.map((notif) => ({ ...notif, leida: true }))
    setNotificaciones(nuevasNotificaciones)
    toast({
      title: "Notificaciones actualizadas",
      description: "Todas las notificaciones han sido marcadas como leídas",
      duration: 3000,
    })
  }

  // Guardar nueva plantilla de mensaje
  const guardarPlantilla = () => {
    if (!nuevaPlantilla.titulo || !nuevaPlantilla.contenido) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      })
      return
    }

    const id = plantillasMensaje.length > 0 ? Math.max(...plantillasMensaje.map((p) => p.id)) + 1 : 1
    const nuevasPlantillas = [...plantillasMensaje, { ...nuevaPlantilla, id }]
    setPlantillasMensaje(nuevasPlantillas)
    setNuevaPlantilla({ titulo: "", contenido: "" })
    setShowPlantillasDialog(false)

    toast({
      title: "Plantilla guardada",
      description: "La plantilla ha sido guardada correctamente",
      duration: 3000,
    })
  }

  // Usar plantilla en respuesta
  const usarPlantilla = (plantilla: PlantillaMensaje) => {
    setRespuestaMensaje(plantilla.contenido)
  }

  // Eliminar plantilla
  const eliminarPlantilla = (id: number) => {
    const nuevasPlantillas = plantillasMensaje.filter((p) => p.id !== id)
    setPlantillasMensaje(nuevasPlantillas)

    toast({
      title: "Plantilla eliminada",
      description: "La plantilla ha sido eliminada correctamente",
      duration: 3000,
    })
  }

  // Guardar configuración de pagos
  const guardarConfiguracionPagos = () => {
    setIsSubmitting(true)

    setTimeout(() => {
      setShowConfiguracionPagos(false)
      setIsSubmitting(false)

      toast({
        title: "Configuración guardada",
        description: "Tu configuración de pagos ha sido actualizada",
        duration: 3000,
      })
    }, 1000)
  }

  // Imprimir factura
  const imprimirFactura = () => {
    if (imprimirRef.current) {
      const ventanaImpresion = window.open("", "_blank")
      if (ventanaImpresion) {
        ventanaImpresion.document.write(`
          <html>
            <head>
              <title>Factura - Mi Kaza</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .factura { max-width: 800px; margin: 0 auto; }
                .header { text-align: center; margin-bottom: 30px; }
                .logo { font-size: 24px; font-weight: bold; color: #5f9bbd; }
                .info-factura { display: flex; justify-content: space-between; margin-bottom: 20px; }
                .detalles { margin: 20px 0; }
                table { width: 100%; border-collapse: collapse; }
                th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
                .total { text-align: right; margin-top: 30px; }
                .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #666; }
              </style>
            </head>
            <body>
              ${imprimirRef.current.innerHTML}
            </body>
          </html>
        `)
        ventanaImpresion.document.close()
        ventanaImpresion.print()
      }
    }
  }

  // Filtrar reservas por estado
  const filtrarReservas = () => {
    if (filtroReservas === "todas") {
      return reservas
    }
    return reservas.filter((reserva) => reserva.estado === filtroReservas)
  }

  // Filtrar pagos por estado
  const filtrarPagos = () => {
    if (filtroPagos === "todos") {
      return pagos
    }
    return pagos.filter((pago) => pago.estado === filtroPagos)
  }

  // Obtener reservas para una fecha específica
  const obtenerReservasPorFecha = (fecha: Date) => {
    return reservas.filter((reserva) => {
      const fechaLlegada = new Date(reserva.fechaLlegada)
      const fechaSalida = new Date(reserva.fechaSalida)
      return fecha >= fechaLlegada && fecha <= fechaSalida
    })
  }

  // Cambiar estado de propiedad
  const cambiarEstadoPropiedad = (id: number, nuevoEstado: "activo" | "inactivo") => {
    const nuevasPropiedades = propiedades.map((propiedad) =>
      propiedad.id === id ? { ...propiedad, estado: nuevoEstado } : propiedad,
    )
    setPropiedades(nuevasPropiedades)
    localStorage.setItem("miKazaPropiedadesAnfitrion", JSON.stringify(nuevasPropiedades))

    toast({
      title: "Estado actualizado",
      description: `La propiedad ha sido ${nuevoEstado === "activo" ? "activada" : "desactivada"} correctamente`,
      duration: 3000,
    })
  }

  // Copiar al portapapeles
  const copiarAlPortapapeles = (texto: string) => {
    navigator.clipboard.writeText(texto)
    toast({
      title: "Copiado",
      description: "El texto ha sido copiado al portapapeles",
      duration: 2000,
    })
  }

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("anfitrionLoggedIn")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("userData")
    router.push("/auth/login")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Panel de Anfitrión</h1>
            <p className="text-gray-600">
              ¡Bienvenido, {usuario.nombre}! Gestiona tus propiedades, reservas y mensajes
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <Popover open={showNotificaciones} onOpenChange={setShowNotificaciones}>
              <PopoverTrigger asChild>
                <div className="relative cursor-pointer">
                  <Bell className="h-6 w-6 text-gray-600" />
                  {notificaciones.filter((n) => !n.leida).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notificaciones.filter((n) => !n.leida).length}
                    </span>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="font-medium">Notificaciones</h3>
                  <Button variant="ghost" size="sm" onClick={marcarTodasLeidas}>
                    Marcar todas como leídas
                  </Button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notificaciones.length > 0 ? (
                    notificaciones.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${!notif.leida ? "bg-blue-50" : ""}`}
                        onClick={() => {
                          marcarNotificacionLeida(notif.id)
                          setShowNotificaciones(false)
                        }}
                      >
                        <div className="flex items-start">
                          <div className="mr-3">
                            {notif.tipo === "reserva" ? (
                              <Calendar className="h-5 w-5 text-blue-500" />
                            ) : notif.tipo === "mensaje" ? (
                              <MessageSquare className="h-5 w-5 text-green-500" />
                            ) : notif.tipo === "pago" ? (
                              <DollarSign className="h-5 w-5 text-yellow-500" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-purple-500" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{notif.titulo}</p>
                            <p className="text-xs text-gray-500 mt-1">{notif.descripcion}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(notif.fecha).toLocaleDateString("es-CO", {
                                day: "numeric",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">No tienes notificaciones</div>
                  )}
                </div>
                <div className="p-2 border-t text-center">
                  <Button variant="link" size="sm" className="text-[#5f9bbd]">
                    Ver todas las notificaciones
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors"
            >
              <LogOut size={18} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Ingresos Totales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-[#5f9bbd] mr-2" />
                <div className="text-2xl font-bold">{formatearPrecio(5200000)}</div>
                <Badge
                  variant="outline"
                  className="ml-auto flex items-center bg-green-50 text-green-700 border-green-200"
                >
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  12%
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Reservas Activas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-[#5f9bbd] mr-2" />
                <div className="text-2xl font-bold">8</div>
                <Badge
                  variant="outline"
                  className="ml-auto flex items-center bg-green-50 text-green-700 border-green-200"
                >
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  5%
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Calificación Promedio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-2" />
                <div className="text-2xl font-bold">4.7</div>
                <Badge
                  variant="outline"
                  className="ml-auto flex items-center bg-green-50 text-green-700 border-green-200"
                >
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  2%
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="propiedades" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="propiedades" className="text-base">
              <Home className="h-4 w-4 mr-2" />
              Propiedades
            </TabsTrigger>
            <TabsTrigger value="reservas" className="text-base">
              <Calendar className="h-4 w-4 mr-2" />
              Reservas
            </TabsTrigger>
            <TabsTrigger value="mensajes" className="h-4 w-4 mr-2 text-base">
              <MessageSquare className="h-4 w-4 mr-2" />
              Mensajes
            </TabsTrigger>
            <TabsTrigger value="pagos" className="text-base">
              <DollarSign className="h-4 w-4 mr-2" />
              Pagos
            </TabsTrigger>
            <TabsTrigger value="antecedentes" className="text-base">
              <FileText className="h-4 w-4 mr-2" />
              Antecedentes
            </TabsTrigger>
            <TabsTrigger value="estadisticas" className="text-base">
              <BarChart className="h-4 w-4 mr-2" />
              Estadísticas
            </TabsTrigger>
            <TabsTrigger value="gestiones" className="text-base">
              <Building className="h-4 w-4 mr-2" />
              Gestiones
            </TabsTrigger>
          </TabsList>

          <TabsContent value="propiedades">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Mis Propiedades</h2>
            </div>

            {propiedades.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {propiedades.map((propiedad) => (
                  <Card key={propiedad.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={propiedad.imagen || "/placeholder.svg"}
                        alt={propiedad.titulo}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge
                          className={`${
                            propiedad.estado === "activo"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : propiedad.estado === "pendiente"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                : propiedad.estado === "rechazado"
                                  ? "bg-red-100 text-red-800 hover:bg-red-100"
                                  : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }`}
                        >
                          {propiedad.estado === "activo"
                            ? "Activo"
                            : propiedad.estado === "pendiente"
                              ? "Pendiente"
                              : propiedad.estado === "rechazado"
                                ? "Rechazado"
                                : "Inactivo"}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-1 line-clamp-1">{propiedad.titulo}</h3>
                      <p className="text-gray-500 text-sm mb-2">{propiedad.ubicacion}</p>
                      <p className="font-bold text-[#5f9bbd] mb-3">{formatearPrecio(propiedad.precio)} / noche</p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {propiedad.reservas && (
                          <div className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
                            {propiedad.reservas} reservas
                          </div>
                        )}
                        {propiedad.calificacion && (
                          <div className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded-md flex items-center">
                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-1" />
                            {propiedad.calificacion}
                          </div>
                        )}
                        <div className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-md">
                          Creado: {new Date(propiedad.fechaCreacion).toLocaleDateString()}
                        </div>
                      </div>

                      {(propiedad.estado === "activo" || propiedad.estado === "inactivo") && (
                        <div className="flex items-center justify-between mb-3 p-2 bg-gray-50 rounded-md">
                          <span className="text-sm">
                            {propiedad.estado === "activo" ? "Propiedad visible" : "Propiedad oculta"}
                          </span>
                          <Switch
                            checked={propiedad.estado === "activo"}
                            onCheckedChange={(checked) =>
                              cambiarEstadoPropiedad(propiedad.id, checked ? "activo" : "inactivo")
                            }
                          />
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-end items-center border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 border-red-200 hover:bg-red-50"
                        onClick={() => setPropiedadAEliminar(propiedad.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Eliminar
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <Home className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium mb-2">No tienes propiedades</h3>
                <p className="text-gray-500 mb-6">Comienza a publicar tus propiedades para recibir reservas.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="reservas">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Mis Reservas</h2>
              <div className="flex space-x-2">
                <Select value={filtroReservas} onValueChange={setFiltroReservas}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas las reservas</SelectItem>
                    <SelectItem value="confirmada">Confirmadas</SelectItem>
                    <SelectItem value="pendiente">Pendientes</SelectItem>
                    <SelectItem value="completada">Completadas</SelectItem>
                    <SelectItem value="cancelada">Canceladas</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  className="flex items-center"
                  onClick={() => setShowCalendarioReservas(!showCalendarioReservas)}
                >
                  <CalendarDays className="h-4 w-4 mr-2" />
                  {showCalendarioReservas ? "Ocultar calendario" : "Ver calendario"}
                </Button>
              </div>
            </div>

            {showCalendarioReservas && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Calendario de reservas</CardTitle>
                  <CardDescription>Vista de ocupación de tus propiedades</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <CalendarComponent
                        mode="single"
                        selected={fechaSeleccionada}
                        onSelect={setFechaSeleccionada}
                        className="rounded-md border"
                        locale={es}
                      />
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="font-medium mb-4">
                        Reservas para el{" "}
                        {fechaSeleccionada
                          ? format(fechaSeleccionada, "d 'de' MMMM, yyyy", { locale: es })
                          : "día seleccionado"}
                      </h3>
                      {fechaSeleccionada && obtenerReservasPorFecha(fechaSeleccionada).length > 0 ? (
                        <div className="space-y-4">
                          {obtenerReservasPorFecha(fechaSeleccionada).map((reserva) => (
                            <div key={reserva.id} className="flex items-center p-3 border rounded-md">
                              <div className="relative h-12 w-12 mr-3">
                                <Image
                                  src={reserva.propiedadImagen || "/placeholder.svg"}
                                  alt={reserva.propiedadTitulo}
                                  fill
                                  className="object-cover rounded-md"
                                />
                              </div>
                              <div className="flex-grow">
                                <p className="font-medium">{reserva.propiedadTitulo}</p>
                                <p className="text-sm text-gray-500">
                                  {reserva.huesped} • {new Date(reserva.fechaLlegada).toLocaleDateString()} -{" "}
                                  {new Date(reserva.fechaSalida).toLocaleDateString()}
                                </p>
                              </div>
                              <Badge
                                className={`${
                                  reserva.estado === "confirmada"
                                    ? "bg-green-100 text-green-800"
                                    : reserva.estado === "pendiente"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : reserva.estado === "cancelada"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {reserva.estado === "confirmada"
                                  ? "Confirmada"
                                  : reserva.estado === "pendiente"
                                    ? "Pendiente"
                                    : reserva.estado === "cancelada"
                                      ? "Cancelada"
                                      : "Completada"}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 border rounded-md">
                          <Calendar className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                          <p className="text-gray-500">No hay reservas para esta fecha</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {filtrarReservas().length > 0 ? (
              <div className="space-y-4">
                {filtrarReservas().map((reserva) => (
                  <Card key={reserva.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative h-24 w-24 md:h-32 md:w-32 flex-shrink-0">
                          <Image
                            src={reserva.propiedadImagen || "/placeholder.svg"}
                            alt={reserva.propiedadTitulo}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                            <div>
                              <h3 className="font-semibold text-lg mb-1">{reserva.propiedadTitulo}</h3>
                              <p className="text-gray-500 text-sm mb-2">Huésped: {reserva.huesped}</p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <div className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
                                  Llegada: {formatearFecha(reserva.fechaLlegada)}
                                </div>
                                <div className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
                                  Salida: {formatearFecha(reserva.fechaSalida)}
                                </div>
                                <Badge
                                  className={`${
                                    reserva.estado === "confirmada"
                                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                                      : reserva.estado === "pendiente"
                                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                        : reserva.estado === "cancelada"
                                          ? "bg-red-100 text-red-800 hover:bg-red-100"
                                          : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                  }`}
                                >
                                  {reserva.estado === "confirmada"
                                    ? "Confirmada"
                                    : reserva.estado === "pendiente"
                                      ? "Pendiente"
                                      : reserva.estado === "cancelada"
                                        ? "Cancelada"
                                        : "Completada"}
                                </Badge>
                              </div>
                              {reserva.codigoReserva && (
                                <div className="flex items-center mb-3">
                                  <p className="text-sm text-gray-500 mr-2">Código: {reserva.codigoReserva}</p>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0"
                                    onClick={() => copiarAlPortapapeles(reserva.codigoReserva || "")}
                                  >
                                    <Copy className="h-3 w-3" />
                                    <span className="sr-only">Copiar código</span>
                                  </Button>
                                </div>
                              )}
                            </div>
                            <div className="mt-2 md:mt-0 text-right">
                              <div className="font-bold text-[#5f9bbd] text-lg">{formatearPrecio(reserva.total)}</div>
                              <p className="text-gray-500 text-xs">Total de la reserva</p>
                              {reserva.numeroHuespedes && (
                                <p className="text-gray-500 text-xs mt-1">{reserva.numeroHuespedes} huéspedes</p>
                              )}
                            </div>
                          </div>
                          <Separator className="my-3" />
                          <div className="flex flex-wrap gap-2 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setReservaSeleccionada(reserva)
                                setShowDetalleReserva(true)
                              }}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Detalles
                            </Button>
                            {reserva.estado === "pendiente" && (
                              <>
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => cambiarEstadoReserva(reserva.id, "confirmada")}
                                >
                                  <CheckCircle2 className="h-4 w-4 mr-1" />
                                  Confirmar
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-500 border-red-200 hover:bg-red-50"
                                  onClick={() => cambiarEstadoReserva(reserva.id, "cancelada")}
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Rechazar
                                </Button>
                              </>
                            )}
                            {reserva.estado === "confirmada" && (
                              <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700"
                                onClick={() => cambiarEstadoReserva(reserva.id, "completada")}
                              >
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                Marcar como completada
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium mb-2">No tienes reservas</h3>
                <p className="text-gray-500">Cuando recibas reservas para tus propiedades, aparecerán aquí.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="mensajes">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Mis Mensajes</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Todos
                </Button>
                <Button variant="outline" size="sm" className="text-yellow-600 border-yellow-200">
                  No leídos ({mensajes.filter((m) => !m.leido).length})
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowPlantillasDialog(true)}>
                  <Save className="h-4 w-4 mr-1" />
                  Plantillas
                </Button>
              </div>
            </div>

            {mensajes.length > 0 ? (
              <div className="space-y-4">
                {mensajes.map((mensaje) => (
                  <Card key={mensaje.id} className={mensaje.leido ? "" : "border-l-4 border-l-[#87CEEB]"}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage
                              src={mensaje.avatar || "/placeholder.svg?key=huesped"}
                              alt={mensaje.remitente}
                            />
                            <AvatarFallback>{mensaje.remitente.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{mensaje.remitente}</div>
                            <div className="text-xs text-gray-500">{formatearFecha(mensaje.fecha)}</div>
                          </div>
                        </div>
                        {!mensaje.leido && <Badge className="bg-[#87CEEB] hover:bg-[#5f9bbd]">Nuevo</Badge>}
                      </div>

                      {mensaje.propiedadTitulo && (
                        <div className="text-sm text-gray-500 mb-2">Re: {mensaje.propiedadTitulo}</div>
                      )}

                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1" className="border-none">
                          <AccordionTrigger className="py-2 text-sm text-gray-700 hover:no-underline">
                            Ver conversación
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3 mb-3">
                              {mensaje.conversacion ? (
                                mensaje.conversacion.map((msg, index) => (
                                  <div
                                    key={index}
                                    className={`p-3 rounded-lg ${
                                      msg.remitente === "anfitrion" ? "bg-blue-50 ml-6" : "bg-gray-50 mr-6"
                                    }`}
                                  >
                                    <div className="flex items-center mb-1">
                                      <span className="text-xs font-medium">
                                        {msg.remitente === "anfitrion" ? "Tú" : mensaje.remitente}
                                      </span>
                                      <span className="text-xs text-gray-500 ml-2">
                                        {new Date(msg.fecha).toLocaleTimeString([], {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })}
                                      </span>
                                    </div>
                                    <p className="text-sm">{msg.contenido}</p>
                                  </div>
                                ))
                              ) : (
                                <div className="p-3 bg-gray-50 rounded-lg mr-6">
                                  <div className="flex items-center mb-1">
                                    <span className="text-xs font-medium">{mensaje.remitente}</span>
                                    <span className="text-xs text-gray-500 ml-2">
                                      {new Date(mensaje.fecha).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </span>
                                  </div>
                                  <p className="text-sm">{mensaje.contenido}</p>
                                </div>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      <div className="flex justify-end mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="mr-2"
                          onClick={() => {
                            // Marcar como leído
                            const nuevosMensajes = mensajes.map((m) =>
                              m.id === mensaje.id ? { ...m, leido: true } : m,
                            )
                            setMensajes(nuevosMensajes)
                          }}
                        >
                          {mensaje.leido ? "Marcar como no leído" : "Marcar como leído"}
                        </Button>
                        <Button
                          size="sm"
                          className="bg-[#87CEEB] hover:bg-[#5f9bbd]"
                          onClick={() => setMensajeSeleccionado(mensaje)}
                        >
                          Responder
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium mb-2">No tienes mensajes</h3>
                <p className="text-gray-500">Cuando recibas mensajes de huéspedes interesados, aparecerán aquí.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="pagos">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Mis Pagos</h2>
              <div className="flex space-x-2">
                <Select value={filtroPagos} onValueChange={setFiltroPagos}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los pagos</SelectItem>
                    <SelectItem value="completado">Completados</SelectItem>
                    <SelectItem value="pendiente">Pendientes</SelectItem>
                    <SelectItem value="fallido">Fallidos</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="flex items-center" onClick={() => setShowConfiguracionPagos(true)}>
                  <Settings className="h-4 w-4 mr-2" />
                  Configuración
                </Button>
              </div>
            </div>

            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle>Resumen de pagos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                      <h3 className="font-medium">Pagos recibidos</h3>
                    </div>
                    <p className="text-2xl font-bold">
                      {formatearPrecio(
                        pagos.filter((p) => p.estado === "completado").reduce((sum, p) => sum + p.montoNeto, 0),
                      )}
                    </p>
                    <p className="text-sm text-gray-500">Total neto después de comisiones</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                      <h3 className="font-medium">Pagos pendientes</h3>
                    </div>
                    <p className="text-2xl font-bold">
                      {formatearPrecio(
                        pagos.filter((p) => p.estado === "pendiente").reduce((sum, p) => sum + p.montoNeto, 0),
                      )}
                    </p>
                    <p className="text-sm text-gray-500">Próximos a recibir</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Percent className="h-5 w-5 text-blue-600 mr-2" />
                      <h3 className="font-medium">Comisiones</h3>
                    </div>
                    <p className="text-2xl font-bold">
                      {formatearPrecio(pagos.reduce((sum, p) => sum + p.comision, 0))}
                    </p>
                    <p className="text-sm text-gray-500">Total de comisiones de la plataforma</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Historial de pagos</CardTitle>
                <CardDescription>Registro de todos los pagos recibidos por tus propiedades</CardDescription>
              </CardHeader>
              <CardContent>
                {filtrarPagos().length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Referencia</TableHead>
                        <TableHead>Propiedad</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Método</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Monto bruto</TableHead>
                        <TableHead>Comisión</TableHead>
                        <TableHead>Monto neto</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtrarPagos().map((pago) => (
                        <TableRow key={pago.id}>
                          <TableCell className="font-medium">{pago.referencia}</TableCell>
                          <TableCell>{pago.propiedadTitulo}</TableCell>
                          <TableCell>
                            {new Date(pago.fecha).toLocaleDateString("es-CO", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </TableCell>
                          <TableCell>{pago.metodoPago}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                pago.estado === "completado"
                                  ? "bg-green-100 text-green-800"
                                  : pago.estado === "pendiente"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }
                            >
                              {pago.estado === "completado"
                                ? "Completado"
                                : pago.estado === "pendiente"
                                  ? "Pendiente"
                                  : "Fallido"}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatearPrecio(pago.monto)}</TableCell>
                          <TableCell>{formatearPrecio(pago.comision)}</TableCell>
                          <TableCell className="font-medium">{formatearPrecio(pago.montoNeto)}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setFacturaSeleccionada(pago)
                                setShowFacturaDialog(true)
                              }}
                            >
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">Ver factura</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium mb-2">No hay pagos disponibles</h3>
                    <p className="text-gray-500">
                      {filtroPagos !== "todos"
                        ? `No tienes pagos con estado "${filtroPagos}"`
                        : "Cuando recibas pagos por tus reservas, aparecerán aquí"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="antecedentes">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Antecedentes de Huéspedes</h2>
              <div className="flex space-x-2">
                <Select value={filtroAntecedentes} onValueChange={setFiltroAntecedentes}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los antecedentes</SelectItem>
                    <SelectItem value="verificado">Verificados</SelectItem>
                    <SelectItem value="pendiente">Pendientes</SelectItem>
                    <SelectItem value="rechazado">Rechazados</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Documentos de antecedentes judiciales</CardTitle>
                <CardDescription>
                  Revisa los antecedentes de los huéspedes que han reservado tus propiedades
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filtrarAntecedentes().length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Huésped</TableHead>
                        <TableHead>Propiedad</TableHead>
                        <TableHead>Fecha de carga</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtrarAntecedentes().map((antecedente) => (
                        <TableRow key={antecedente.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg?key=huesped" alt={antecedente.huespedNombre} />
                                <AvatarFallback>{antecedente.huespedNombre.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{antecedente.huespedNombre}</p>
                                <p className="text-xs text-gray-500">{antecedente.huespedEmail}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{antecedente.propiedadTitulo}</TableCell>
                          <TableCell>{formatearFecha(antecedente.fechaCarga)}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                antecedente.estado === "verificado"
                                  ? "bg-green-100 text-green-800"
                                  : antecedente.estado === "pendiente"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }
                            >
                              {antecedente.estado === "verificado"
                                ? "Verificado"
                                : antecedente.estado === "pendiente"
                                  ? "Pendiente"
                                  : "Rechazado"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4 mr-1" />
                                    Ver documento
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                  <DialogHeader>
                                    <DialogTitle>Antecedentes de {antecedente.huespedNombre}</DialogTitle>
                                    <DialogDescription>
                                      Documento cargado el {formatearFecha(antecedente.fechaCarga)}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="py-4">
                                    <div className="border rounded-lg p-4 mb-4">
                                      <div className="aspect-[3/4] relative bg-gray-100 mb-4">
                                        <Image
                                          src={antecedente.documento || "/placeholder.svg"}
                                          alt="Documento de antecedentes"
                                          fill
                                          className="object-contain"
                                        />
                                      </div>
                                      <p className="text-center text-sm text-gray-500">
                                        Documento de antecedentes judiciales
                                      </p>
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    {antecedente.estado === "pendiente" && (
                                      <>
                                        <Button
                                          variant="outline"
                                          className="text-red-500 border-red-200 hover:bg-red-50"
                                          onClick={() => cambiarEstadoAntecedente(antecedente.id, "rechazado")}
                                        >
                                          <XCircle className="h-4 w-4 mr-1" />
                                          Rechazar
                                        </Button>
                                        <Button
                                          className="bg-green-600 hover:bg-green-700"
                                          onClick={() => cambiarEstadoAntecedente(antecedente.id, "verificado")}
                                        >
                                          <CheckCircle2 className="h-4 w-4 mr-1" />
                                          Aprobar
                                        </Button>
                                      </>
                                    )}
                                    {antecedente.estado !== "pendiente" && <Button onClick={() => {}}>Cerrar</Button>}
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>

                              {antecedente.estado === "pendiente" && (
                                <>
                                  <Button
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => cambiarEstadoAntecedente(antecedente.id, "verificado")}
                                  >
                                    <CheckCircle2 className="h-4 w-4 mr-1" />
                                    Aprobar
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => cambiarEstadoAntecedente(antecedente.id, "rechazado")}
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Rechazar
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-12 border rounded-lg">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium mb-2">No hay antecedentes disponibles</h3>
                    <p className="text-gray-500">
                      Cuando los huéspedes reserven tus propiedades, sus antecedentes aparecerán aquí.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="estadisticas">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Ingresos Mensuales</CardTitle>
                  <CardDescription>Ingresos generados en los últimos 6 meses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={datosIngresos}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mes" />
                        <YAxis
                          tickFormatter={(value) =>
                            new Intl.NumberFormat("es-CO", {
                              notation: "compact",
                              compactDisplay: "short",
                              currency: "COP",
                            }).format(value)
                          }
                        />
                        <RechartsTooltip
                          formatter={(value) =>
                            new Intl.NumberFormat("es-CO", {
                              style: "currency",
                              currency: "COP",
                              maximumFractionDigits: 0,
                            }).format(Number(value))
                          }
                        />
                        <Bar dataKey="ingresos" fill="#87CEEB" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tasa de Ocupación</CardTitle>
                  <CardDescription>Porcentaje de ocupación mensual</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={datosOcupacion}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mes" />
                        <YAxis domain={[0, 100]} />
                        <RechartsTooltip formatter={(value) => [`${value}%`, "Ocupación"]} />
                        <Line type="monotone" dataKey="ocupacion" stroke="#87CEEB" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Distribución de Reservas</CardTitle>
                <CardDescription>Tipos de reservas recibidas</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col lg:flex-row items-center">
                <div className="w-full lg:w-1/2 h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={datosTipoReserva}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {datosTipoReserva.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip formatter={(value) => [`${value}%`, "Porcentaje"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
                  <div className="space-y-4">
                    {datosTipoReserva.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div
                          className="w-4 h-4 rounded-full mr-2"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <div className="flex-grow">{item.name}</div>
                        <div className="font-medium">{item.value}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gestiones">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Gestiones de Inmuebles</h2>
              <p className="text-gray-600">Publica y administra tus propiedades</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="h-5 w-5 mr-2 text-[#87CEEB]" />
                    Publicar Nuevo Inmueble
                  </CardTitle>
                  <CardDescription>
                    Crea un nuevo anuncio para tu propiedad y comienza a recibir reservas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Completa la información de tu propiedad, sube fotos y establece tu disponibilidad y precios.
                  </p>
                  <Button asChild className="w-full bg-[#87CEEB] hover:bg-[#5f9bbd]">
                    <Link href="/anfitrion/propiedades/nuevo">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Publicar inmueble
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Diálogo para confirmar eliminación de propiedad */}
      <Dialog open={propiedadAEliminar !== null} onOpenChange={() => setPropiedadAEliminar(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar propiedad</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar esta propiedad? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPropiedadAEliminar(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => propiedadAEliminar && eliminarPropiedad(propiedadAEliminar)}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Eliminando..." : "Eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para responder mensaje */}
      <Dialog open={mensajeSeleccionado !== null} onOpenChange={() => setMensajeSeleccionado(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Responder mensaje</DialogTitle>
            <DialogDescription>Responde al mensaje de {mensajeSeleccionado?.remitente}</DialogDescription>
          </DialogHeader>
          <div className="bg-gray-50 p-3 rounded-md mb-4">
            <p className="text-sm text-gray-700">{mensajeSeleccionado?.contenido}</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="respuesta">Tu respuesta</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Save className="h-4 w-4 mr-1" />
                      Usar plantilla
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium">Plantillas guardadas</h4>
                      {plantillasMensaje.length > 0 ? (
                        <div className="max-h-60 overflow-y-auto">
                          {plantillasMensaje.map((plantilla) => (
                            <div
                              key={plantilla.id}
                              className="p-2 hover:bg-gray-50 rounded cursor-pointer"
                              onClick={() => {
                                usarPlantilla(plantilla)
                                document
                                  .querySelector('[data-state="open"][data-side="bottom"]')
                                  ?.setAttribute("data-state", "closed")
                              }}
                            >
                              <p className="font-medium text-sm">{plantilla.titulo}</p>
                              <p className="text-xs text-gray-500 line-clamp-2">{plantilla.contenido}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No tienes plantillas guardadas</p>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                        onClick={() => {
                          document
                            .querySelector('[data-state="open"][data-side="bottom"]')
                            ?.setAttribute("data-state", "closed")
                          setShowPlantillasDialog(true)
                        }}
                      >
                        <PlusCircle className="h-4 w-4 mr-1" />
                        Nueva plantilla
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <Textarea
                id="respuesta"
                placeholder="Escribe tu respuesta aquí..."
                rows={5}
                value={respuestaMensaje}
                onChange={(e) => setRespuestaMensaje(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMensajeSeleccionado(null)}>
              Cancelar
            </Button>
            <Button className="bg-[#87CEEB] hover:bg-[#5f9bbd]" onClick={responderMensaje} disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar respuesta"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para gestionar plantillas de mensajes */}
      <Dialog open={showPlantillasDialog} onOpenChange={setShowPlantillasDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Plantillas de mensajes</DialogTitle>
            <DialogDescription>Crea y gestiona plantillas para responder rápidamente a tus huéspedes</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titulo-plantilla">Título de la plantilla</Label>
              <Input
                id="titulo-plantilla"
                placeholder="Ej: Bienvenida, Información de check-in..."
                value={nuevaPlantilla.titulo}
                onChange={(e) => setNuevaPlantilla({ ...nuevaPlantilla, titulo: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contenido-plantilla">Contenido</Label>
              <Textarea
                id="contenido-plantilla"
                placeholder="Escribe el contenido de tu plantilla..."
                rows={5}
                value={nuevaPlantilla.contenido}
                onChange={(e) => setNuevaPlantilla({ ...nuevaPlantilla, contenido: e.target.value })}
              />
            </div>

            {plantillasMensaje.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium mb-2">Plantillas guardadas</h4>
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {plantillasMensaje.map((plantilla) => (
                    <div key={plantilla.id} className="flex items-center justify-between p-2 border rounded-md">
                      <div className="overflow-hidden">
                        <p className="font-medium text-sm">{plantilla.titulo}</p>
                        <p className="text-xs text-gray-500 truncate">{plantilla.contenido}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => eliminarPlantilla(plantilla.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPlantillasDialog(false)}>
              Cancelar
            </Button>
            <Button className="bg-[#87CEEB] hover:bg-[#5f9bbd]" onClick={guardarPlantilla}>
              Guardar plantilla
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para ver factura */}
      <Dialog open={showFacturaDialog} onOpenChange={setShowFacturaDialog}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Factura #{facturaSeleccionada?.referencia}</DialogTitle>
            <DialogDescription>Detalles del pago recibido</DialogDescription>
          </DialogHeader>
          <div ref={imprimirRef}>
            <div className="p-6 border rounded-lg">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-[#5f9bbd]">Mi Kaza</h2>
                  <p className="text-gray-500">Plataforma de alojamientos</p>
                </div>
                <div className="text-right">
                  <h3 className="font-bold">FACTURA</h3>
                  <p className="text-gray-500">#{facturaSeleccionada?.referencia}</p>
                  <p className="text-gray-500">
                    Fecha: {facturaSeleccionada ? formatearFecha(facturaSeleccionada.fecha) : ""}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="font-medium mb-2">Facturado a:</h4>
                  <p>{datosFacturacion.nombre}</p>
                  <p>Documento: {datosFacturacion.documento}</p>
                  <p>{datosFacturacion.direccion}</p>
                  <p>{datosFacturacion.telefono}</p>
                  <p>{datosFacturacion.email}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Detalles del pago:</h4>
                  <p>Método: {facturaSeleccionada?.metodoPago}</p>
                  <p>Estado: {facturaSeleccionada?.estado === "completado" ? "Pagado" : "Pendiente"}</p>
                  <p>Propiedad: {facturaSeleccionada?.propiedadTitulo}</p>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descripción</TableHead>
                    <TableHead className="text-right">Monto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Reserva en {facturaSeleccionada?.propiedadTitulo}</TableCell>
                    <TableCell className="text-right">
                      {facturaSeleccionada ? formatearPrecio(facturaSeleccionada.monto) : ""}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Comisión de la plataforma (10%)</TableCell>
                    <TableCell className="text-right text-red-500">
                      -{facturaSeleccionada ? formatearPrecio(facturaSeleccionada.comision) : ""}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="mt-6 text-right">
                <p className="font-medium">
                  Subtotal: {facturaSeleccionada ? formatearPrecio(facturaSeleccionada.monto) : ""}
                </p>
                <p className="text-red-500">
                  Comisión: -{facturaSeleccionada ? formatearPrecio(facturaSeleccionada.comision) : ""}
                </p>
                <p className="text-xl font-bold mt-2">
                  Total neto: {facturaSeleccionada ? formatearPrecio(facturaSeleccionada.montoNeto) : ""}
                </p>
              </div>

              <div className="mt-8 pt-8 border-t text-center text-gray-500 text-sm">
                <p>Gracias por usar Mi Kaza como plataforma para tus alojamientos.</p>
                <p>Para cualquier consulta sobre este pago, contacta a soporte@mikaza.co</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setShowFacturaDialog(false)}>
                Cerrar
              </Button>
              <Button variant="outline" onClick={imprimirFactura}>
                <Printer className="h-4 w-4 mr-2" />
                Imprimir
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Descargar PDF
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para configuración de pagos */}
      <Dialog open={showConfiguracionPagos} onOpenChange={setShowConfiguracionPagos}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configuración de pagos</DialogTitle>
            <DialogDescription>Configura tus preferencias para recibir pagos por tus propiedades</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="metodo-pago">Método de pago preferido</Label>
              <Select value={metodoPagoPreferido} onValueChange={setMetodoPagoPreferido}>
                <SelectTrigger id="metodo-pago">
                  <SelectValue placeholder="Selecciona un método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transferencia">Transferencia bancaria</SelectItem>
                  <SelectItem value="nequi">Nequi</SelectItem>
                  <SelectItem value="daviplata">Daviplata</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Datos de facturación</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre completo</Label>
                  <Input
                    id="nombre"
                    value={datosFacturacion.nombre}
                    onChange={(e) => setDatosFacturacion({ ...datosFacturacion, nombre: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="documento">Documento de identidad</Label>
                  <Input
                    id="documento"
                    value={datosFacturacion.documento}
                    onChange={(e) => setDatosFacturacion({ ...datosFacturacion, documento: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input
                    id="direccion"
                    value={datosFacturacion.direccion}
                    onChange={(e) => setDatosFacturacion({ ...datosFacturacion, direccion: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    value={datosFacturacion.telefono}
                    onChange={(e) => setDatosFacturacion({ ...datosFacturacion, telefono: e.target.value })}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    value={datosFacturacion.email}
                    onChange={(e) => setDatosFacturacion({ ...datosFacturacion, email: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="notificaciones-pago">Notificaciones de pago</Label>
                <Switch id="notificaciones-pago" defaultChecked />
              </div>
              <p className="text-sm text-gray-500">
                Recibe notificaciones por correo electrónico cuando recibas un pago
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfiguracionPagos(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-[#87CEEB] hover:bg-[#5f9bbd]"
              onClick={guardarConfiguracionPagos}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : "Guardar configuración"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para ver detalles de propiedad */}
      <Dialog open={showDetallePropiedad} onOpenChange={setShowDetallePropiedad}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalles de la propiedad</DialogTitle>
          </DialogHeader>
          {propiedadSeleccionada && (
            <div className="space-y-6">
              <div className="relative h-64 w-full">
                <Image
                  src={propiedadSeleccionada.imagen || "/placeholder.svg"}
                  alt={propiedadSeleccionada.titulo}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{propiedadSeleccionada.titulo}</h2>
                  <div className="flex items-center text-gray-500 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {propiedadSeleccionada.ubicacion}
                  </div>
                </div>
                <Badge
                  className={`${
                    propiedadSeleccionada.estado === "activo"
                      ? "bg-green-100 text-green-800"
                      : propiedadSeleccionada.estado === "pendiente"
                        ? "bg-yellow-100 text-yellow-800"
                        : propiedadSeleccionada.estado === "rechazado"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {propiedadSeleccionada.estado === "activo"
                    ? "Activo"
                    : propiedadSeleccionada.estado === "pendiente"
                      ? "Pendiente"
                      : propiedadSeleccionada.estado === "rechazado"
                        ? "Rechazado"
                        : "Inactivo"}
                </Badge>
              </div>

              <p className="text-gray-700">{propiedadSeleccionada.descripcion}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Precio por noche</p>
                  <p className="font-bold text-[#5f9bbd]">{formatearPrecio(propiedadSeleccionada.precio)}</p>
                </div>
                {propiedadSeleccionada.capacidad && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Capacidad</p>
                    <p className="font-bold">{propiedadSeleccionada.capacidad} huéspedes</p>
                  </div>
                )}
                {propiedadSeleccionada.habitaciones && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Habitaciones</p>
                    <p className="font-bold">{propiedadSeleccionada.habitaciones}</p>
                  </div>
                )}
                {propiedadSeleccionada.banos && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Baños</p>
                    <p className="font-bold">{propiedadSeleccionada.banos}</p>
                  </div>
                )}
              </div>

              {propiedadSeleccionada.servicios && propiedadSeleccionada.servicios.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">Servicios</h3>
                  <div className="flex flex-wrap gap-2">
                    {propiedadSeleccionada.servicios.map((servicio, index) => (
                      <Badge key={index} variant="outline" className="bg-[#e6f4f9] text-[#5f9bbd]">
                        {servicio}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Estadísticas</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Fecha de creación:</span>
                      <span>{formatearFecha(propiedadSeleccionada.fechaCreacion)}</span>
                    </div>
                    {propiedadSeleccionada.reservas !== undefined && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Reservas totales:</span>
                        <span>{propiedadSeleccionada.reservas}</span>
                      </div>
                    )}
                    {propiedadSeleccionada.calificacion !== undefined && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Calificación promedio:</span>
                        <span className="flex items-center">
                          {propiedadSeleccionada.calificacion}
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 ml-1" />
                        </span>
                      </div>
                    )}
                    {propiedadSeleccionada.ingresos !== undefined && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Ingresos generados:</span>
                        <span>{formatearPrecio(propiedadSeleccionada.ingresos)}</span>
                      </div>
                    )}
                    {propiedadSeleccionada.ocupacion !== undefined && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Tasa de ocupación:</span>
                        <span>{propiedadSeleccionada.ocupacion}%</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Acciones rápidas</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href={`/propiedades/${propiedadSeleccionada.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver como huésped
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href={`/anfitrion/propiedades/editar/${propiedadSeleccionada.id}`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar propiedad
                      </Link>
                    </Button>
                    {(propiedadSeleccionada.estado === "activo" || propiedadSeleccionada.estado === "inactivo") && (
                      <Button
                        variant="outline"
                        className={`w-full justify-start ${
                          propiedadSeleccionada.estado === "activo"
                            ? "text-red-500 hover:text-red-600"
                            : "text-green-500 hover:text-green-600"
                        }`}
                        onClick={() => {
                          cambiarEstadoPropiedad(
                            propiedadSeleccionada.id,
                            propiedadSeleccionada.estado === "activo" ? "inactivo" : "activo",
                          )
                          setpropiedadSeleccionada({
                            ...propiedadSeleccionada,
                            estado: propiedadSeleccionada.estado === "activo" ? "inactivo" : "activo",
                          })
                        }}
                      >
                        {propiedadSeleccionada.estado === "activo" ? (
                          <>
                            <XCircle className="h-4 w-4 mr-2" />
                            Desactivar propiedad
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Activar propiedad
                          </>
                        )}
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="w-full justify-start text-red-500 hover:text-red-600"
                      onClick={() => {
                        setShowDetallePropiedad(false)
                        setPropiedadAEliminar(propiedadSeleccionada.id)
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Eliminar propiedad
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Diálogo para ver detalles de reserva */}
      <Dialog open={showDetalleReserva} onOpenChange={setShowDetalleReserva}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalles de la reserva</DialogTitle>
            <DialogDescription>Código de reserva: {reservaSeleccionada?.codigoReserva}</DialogDescription>
          </DialogHeader>
          {reservaSeleccionada && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative h-40 w-full md:w-1/3">
                  <Image
                    src={reservaSeleccionada.propiedadImagen || "/placeholder.svg"}
                    alt={reservaSeleccionada.propiedadTitulo}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{reservaSeleccionada.propiedadTitulo}</h2>
                  <Badge
                    className={`mt-2 ${
                      reservaSeleccionada.estado === "confirmada"
                        ? "bg-green-100 text-green-800"
                        : reservaSeleccionada.estado === "pendiente"
                          ? "bg-yellow-100 text-yellow-800"
                          : reservaSeleccionada.estado === "cancelada"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {reservaSeleccionada.estado === "confirmada"
                      ? "Confirmada"
                      : reservaSeleccionada.estado === "pendiente"
                        ? "Pendiente"
                        : reservaSeleccionada.estado === "cancelada"
                          ? "Cancelada"
                          : "Completada"}
                  </Badge>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Fecha de llegada</p>
                      <p className="font-medium">{formatearFecha(reservaSeleccionada.fechaLlegada)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fecha de salida</p>
                      <p className="font-medium">{formatearFecha(reservaSeleccionada.fechaSalida)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Huéspedes</p>
                      <p className="font-medium">{reservaSeleccionada.numeroHuespedes || "No especificado"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fecha de reserva</p>
                      <p className="font-medium">
                        {reservaSeleccionada.fechaReserva
                          ? formatearFecha(reservaSeleccionada.fechaReserva)
                          : "No disponible"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Información del huésped</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src="/placeholder.svg?key=huesped" alt={reservaSeleccionada.huesped} />
                        <AvatarFallback>{reservaSeleccionada.huesped.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{reservaSeleccionada.huesped}</p>
                        {reservaSeleccionada.huespedEmail && (
                          <p className="text-sm text-gray-500">{reservaSeleccionada.huespedEmail}</p>
                        )}
                      </div>
                    </div>

                    {reservaSeleccionada.huespedTelefono && (
                      <div className="flex items-center">
                        <Button variant="outline" size="sm" className="mr-2">
                          Llamar
                        </Button>
                        <p>{reservaSeleccionada.huespedTelefono}</p>
                      </div>
                    )}

                    <Button variant="outline" size="sm" className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Enviar mensaje
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Detalles del pago</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Total</span>
                        <span className="font-bold">{formatearPrecio(reservaSeleccionada.total)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Método de pago</span>
                        <span>{reservaSeleccionada.metodoPago || "No especificado"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Estado del pago</span>
                        <Badge
                          className={
                            reservaSeleccionada.estado === "confirmada" || reservaSeleccionada.estado === "completada"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {reservaSeleccionada.estado === "confirmada" || reservaSeleccionada.estado === "completada"
                            ? "Pagado"
                            : "Pendiente"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {reservaSeleccionada.solicitudesEspeciales && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Solicitudes especiales</h4>
                      <div className="bg-yellow-50 p-3 rounded-lg text-sm">
                        {reservaSeleccionada.solicitudesEspeciales}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div className="flex justify-between">
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    <Printer className="h-4 w-4 mr-2" />
                    Imprimir
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartir
                  </Button>
                </div>

                {reservaSeleccionada.estado === "pendiente" && (
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 border-red-200 hover:bg-red-50"
                      onClick={() => {
                        cambiarEstadoReserva(reservaSeleccionada.id, "cancelada")
                        setReservaSeleccionada({ ...reservaSeleccionada, estado: "cancelada" })
                      }}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Rechazar
                    </Button>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        cambiarEstadoReserva(reservaSeleccionada.id, "confirmada")
                        setReservaSeleccionada({ ...reservaSeleccionada, estado: "confirmada" })
                      }}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Confirmar
                    </Button>
                  </div>
                )}

                {reservaSeleccionada.estado === "confirmada" && (
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      cambiarEstadoReserva(reservaSeleccionada.id, "completada")
                      setReservaSeleccionada({ ...reservaSeleccionada, estado: "completada" })
                    }}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Marcar como completada
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
