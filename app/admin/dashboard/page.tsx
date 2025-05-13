"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Home,
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  BarChart4,
  Calendar,
  MessageSquare,
  LogOut,
  Mail,
  Phone,
  Shield,
  Eye,
} from "lucide-react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js"
import { Line, Bar, Doughnut } from "react-chartjs-2"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement)

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [adminInfo, setAdminInfo] = useState({ name: "Administrador", email: "admin@mikaza.co" })
  const [stats, setStats] = useState({
    propiedades: 0,
    usuarios: 0,
    ingresos: 0,
    pendientes: 0,
  })

  // Datos para los gráficos
  const lineChartData = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
    datasets: [
      {
        label: "Reservas",
        data: [65, 78, 90, 81, 95, 110],
        borderColor: "#5f9bbd",
        backgroundColor: "rgba(95, 155, 189, 0.1)",
        tension: 0.3,
      },
    ],
  }

  const barChartData = {
    labels: ["Bogotá", "Medellín", "Cartagena", "Cali", "Santa Marta", "Barranquilla"],
    datasets: [
      {
        label: "Propiedades",
        data: [42, 35, 28, 22, 18, 15],
        backgroundColor: "rgba(95, 155, 189, 0.7)",
      },
    ],
  }

  const doughnutChartData = {
    labels: ["Apartamentos", "Casas", "Cabañas", "Fincas", "Otros"],
    datasets: [
      {
        data: [45, 30, 15, 8, 2],
        backgroundColor: ["#5f9bbd", "#87CEEB", "#e6f4f9", "#4682B4", "#B0E0E6"],
        borderWidth: 1,
      },
    ],
  }

  // Datos de usuarios activos
  const activeUsers = [
    {
      id: 1,
      name: "Carlos Rodríguez",
      email: "carlos.rodriguez@example.com",
      phone: "+57 300 123 4567",
      type: "anfitrion",
      registrationDate: "2025-01-15",
      lastLogin: "2025-05-10",
      status: "activo",
      properties: 2,
      avatar: "/diverse-avatars.png",
    },
    {
      id: 2,
      name: "Laura Gómez",
      email: "laura.gomez@example.com",
      phone: "+57 311 987 6543",
      type: "huesped",
      registrationDate: "2025-02-20",
      lastLogin: "2025-05-09",
      status: "activo",
      properties: 0,
      avatar: "/diverse-avatars.png",
    },
    {
      id: 3,
      name: "Juan Pérez",
      email: "juan.perez@example.com",
      phone: "+57 315 456 7890",
      type: "anfitrion",
      registrationDate: "2025-03-05",
      lastLogin: "2025-05-11",
      status: "activo",
      properties: 1,
      avatar: "/diverse-avatars.png",
    },
    {
      id: 4,
      name: "María López",
      email: "maria.lopez@example.com",
      phone: "+57 320 789 0123",
      type: "huesped",
      registrationDate: "2025-03-10",
      lastLogin: "2025-05-08",
      status: "activo",
      properties: 0,
      avatar: "/diverse-avatars.png",
    },
    {
      id: 5,
      name: "Pedro Martínez",
      email: "pedro.martinez@example.com",
      phone: "+57 310 234 5678",
      type: "anfitrion",
      registrationDate: "2025-04-15",
      lastLogin: "2025-05-10",
      status: "activo",
      properties: 3,
      avatar: "/diverse-avatars.png",
    },
    {
      id: 6,
      name: "Ana Sánchez",
      email: "ana.sanchez@example.com",
      phone: "+57 300 876 5432",
      type: "huesped",
      registrationDate: "2025-04-20",
      lastLogin: "2025-05-09",
      status: "activo",
      properties: 0,
      avatar: "/diverse-avatars.png",
    },
    {
      id: 7,
      name: "Miguel Torres",
      email: "miguel.torres@example.com",
      phone: "+57 315 678 9012",
      type: "anfitrion",
      registrationDate: "2025-05-01",
      lastLogin: "2025-05-11",
      status: "activo",
      properties: 1,
      avatar: "/diverse-avatars.png",
    },
    {
      id: 8,
      name: "Sofía Ramírez",
      email: "sofia.ramirez@example.com",
      phone: "+57 320 345 6789",
      type: "huesped",
      registrationDate: "2025-05-05",
      lastLogin: "2025-05-10",
      status: "activo",
      properties: 0,
      avatar: "/diverse-avatars.png",
    },
  ]

  useEffect(() => {
    // Simulación de carga de datos
    const timer = setTimeout(() => {
      setStats({
        propiedades: 125,
        usuarios: 350,
        ingresos: 25000000,
        pendientes: 15,
      })
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("es-CO", options)
  }

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/admin/login")
  }

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case "huesped":
        return <Badge className="bg-blue-500">Huésped</Badge>
      case "anfitrion":
        return <Badge className="bg-purple-500">Anfitrión</Badge>
      case "admin":
        return <Badge className="bg-gray-800">Administrador</Badge>
      default:
        return <Badge>{tipo}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con información del administrador y botón de cierre de sesión */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-[#e6f4f9] flex items-center justify-center mr-3">
              <Users className="h-5 w-5 text-[#5f9bbd]" />
            </div>
            <div>
              <h2 className="font-semibold">{adminInfo.name}</h2>
              <p className="text-sm text-gray-500">{adminInfo.email}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
            <p className="text-gray-600">Gestión de la plataforma Mi Kaza</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-[#e6f4f9] flex items-center justify-center">
                  <Home className="h-6 w-6 text-[#5f9bbd]" />
                </div>
                <span className="text-3xl font-bold">{loading ? "..." : stats.propiedades}</span>
              </div>
              <h3 className="font-semibold">Propiedades</h3>
              <p className="text-sm text-gray-500">Total de inmuebles en la plataforma</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-[#e6f4f9] flex items-center justify-center">
                  <Users className="h-6 w-6 text-[#5f9bbd]" />
                </div>
                <span className="text-3xl font-bold">{loading ? "..." : stats.usuarios}</span>
              </div>
              <h3 className="font-semibold">Usuarios</h3>
              <p className="text-sm text-gray-500">Total de usuarios registrados</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-[#e6f4f9] flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-[#5f9bbd]" />
                </div>
                <span className="text-3xl font-bold">{loading ? "..." : formatCurrency(stats.ingresos)}</span>
              </div>
              <h3 className="font-semibold">Ingresos</h3>
              <p className="text-sm text-gray-500">Ingresos totales de la plataforma</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-[#e6f4f9] flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-[#5f9bbd]" />
                </div>
                <span className="text-3xl font-bold">{loading ? "..." : stats.pendientes}</span>
              </div>
              <h3 className="font-semibold">Pendientes</h3>
              <p className="text-sm text-gray-500">Verificaciones pendientes</p>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart4 className="h-5 w-5 mr-2 text-[#5f9bbd]" />
                Reservas mensuales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Line
                  data={lineChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "top" as const,
                      },
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Home className="h-5 w-5 mr-2 text-[#5f9bbd]" />
                Propiedades por ciudad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Bar
                  data={barChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "top" as const,
                      },
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Home className="h-5 w-5 mr-2 text-[#5f9bbd]" />
                Tipos de propiedades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <Doughnut
                  data={doughnutChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "right" as const,
                      },
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-[#5f9bbd]" />
                Actividad reciente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    icon: <Users className="h-4 w-4" />,
                    text: "Nuevo usuario registrado: María González",
                    email: "maria.gonzalez@example.com",
                    time: "Hace 10 minutos",
                  },
                  {
                    icon: <Home className="h-4 w-4" />,
                    text: "Nueva propiedad publicada: Apartamento en Bogotá",
                    email: "ana.gomez@example.com",
                    time: "Hace 25 minutos",
                  },
                  {
                    icon: <CheckCircle className="h-4 w-4" />,
                    text: "Verificación aprobada: Juan Pérez",
                    email: "juan.perez@example.com",
                    time: "Hace 1 hora",
                  },
                  {
                    icon: <DollarSign className="h-4 w-4" />,
                    text: "Nueva reserva: Cabaña en Guatapé por 3 noches",
                    email: "cliente@example.com",
                    time: "Hace 2 horas",
                  },
                  {
                    icon: <MessageSquare className="h-4 w-4" />,
                    text: "Nuevo mensaje de soporte: Consulta sobre pagos",
                    email: "soporte@mikaza.co",
                    time: "Hace 3 horas",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-[#e6f4f9] flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-[#5f9bbd]">{item.icon}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.text}</p>
                      <p className="text-xs text-gray-500">
                        {item.email} • {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sección de Usuarios Activos (reemplazando las pestañas anteriores) */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-[#5f9bbd]" />
                Usuarios Activos
              </CardTitle>
              <Button asChild className="bg-[#87CEEB] hover:bg-[#5f9bbd]">
                <Link href="/admin/usuarios">Ver todos los usuarios</Link>
              </Button>
            </div>
            <p className="text-sm text-gray-500">Huéspedes y anfitriones registrados en Mi Kaza</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Usuario</th>
                    <th className="text-left py-3 px-4 font-medium">Tipo</th>
                    <th className="text-left py-3 px-4 font-medium">Contacto</th>
                    <th className="text-left py-3 px-4 font-medium">Registro</th>
                    <th className="text-left py-3 px-4 font-medium">Último acceso</th>
                    <th className="text-left py-3 px-4 font-medium">Propiedades</th>
                    <th className="text-left py-3 px-4 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {activeUsers.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{getTipoBadge(user.type)}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col">
                          <div className="flex items-center text-xs text-gray-600 mb-1">
                            <Mail className="h-3 w-3 mr-1" />
                            {user.email}
                          </div>
                          <div className="flex items-center text-xs text-gray-600">
                            <Phone className="h-3 w-3 mr-1" />
                            {user.phone}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{formatDate(user.registrationDate)}</td>
                      <td className="py-3 px-4">{formatDate(user.lastLogin)}</td>
                      <td className="py-3 px-4">
                        {user.type === "anfitrion" ? (
                          <Badge className="bg-[#5f9bbd]">{user.properties}</Badge>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button asChild size="sm" variant="outline">
                            <Link href={`/admin/usuarios/${user.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              Ver
                            </Link>
                          </Button>
                          <Button size="sm" variant="outline" className="flex items-center">
                            <Mail className="h-4 w-4 mr-1" />
                            Contactar
                          </Button>
                          {user.status === "activo" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700 flex items-center"
                            >
                              <Shield className="h-4 w-4 mr-1" />
                              Suspender
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
