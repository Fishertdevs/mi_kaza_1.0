"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, UserCheck, Mail, Eye, LogOut, Settings } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function UsuariosAdminPage() {
  const router = useRouter()
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [filtroEstado, setFiltroEstado] = useState("todos")
  const [busqueda, setBusqueda] = useState("")
  const [adminInfo, setAdminInfo] = useState({ name: "Administrador", email: "admin@mikaza.co" })
  const [usuarios, setUsuarios] = useState([])

  // Cargar usuarios registrados desde localStorage
  useEffect(() => {
    const usuariosGuardados = JSON.parse(localStorage.getItem("miKazaUsuarios") || "[]")
    setUsuarios(usuariosGuardados)

    // Verificar si hay un usuario actual y agregarlo a la lista si no existe
    const currentUserEmail = localStorage.getItem("miKazaUserEmail")
    const currentUserName = localStorage.getItem("miKazaUserName")
    const currentUserType = localStorage.getItem("miKazaUserType")

    if (currentUserEmail && currentUserName && currentUserType) {
      const usuarioExistente = usuariosGuardados.find((u) => u.email === currentUserEmail)

      if (!usuarioExistente) {
        const nuevoUsuario = {
          id: Date.now(),
          nombre: currentUserName,
          email: currentUserEmail,
          tipo: currentUserType,
          estado: "activo",
          fechaRegistro: new Date().toLocaleDateString("es-CO"),
          avatar: "/diverse-avatars.png",
        }

        const nuevosUsuarios = [...usuariosGuardados, nuevoUsuario]
        localStorage.setItem("miKazaUsuarios", JSON.stringify(nuevosUsuarios))
        setUsuarios(nuevosUsuarios)
      }
    }
  }, [])

  const filtrarUsuarios = () => {
    return usuarios.filter((usuario) => {
      const cumpleTipo = filtroTipo === "todos" || usuario.tipo === filtroTipo
      const cumpleEstado = filtroEstado === "todos" || usuario.estado === filtroEstado
      const cumpleBusqueda =
        usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        usuario.email.toLowerCase().includes(busqueda.toLowerCase())

      return cumpleTipo && cumpleEstado && cumpleBusqueda
    })
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

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "activo":
        return <Badge className="bg-green-500">Activo</Badge>
      case "inactivo":
        return <Badge className="bg-red-500">Inactivo</Badge>
      case "pendiente":
        return <Badge className="bg-yellow-500">Pendiente</Badge>
      default:
        return <Badge>{estado}</Badge>
    }
  }

  const usuariosFiltrados = filtrarUsuarios()

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/admin/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con información del administrador y botón de cierre de sesión */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-[#e6f4f9] flex items-center justify-center mr-3">
              <Settings className="h-5 w-5 text-[#5f9bbd]" />
            </div>
            <div>
              <h2 className="font-semibold">{adminInfo.name}</h2>
              <p className="text-sm text-gray-500">{adminInfo.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost">
              <Link href="/admin/dashboard">Volver al Dashboard</Link>
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-[#FF5A5F]">Gestión de Usuarios</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filtros y Búsqueda</CardTitle>
            <CardDescription>Filtra y busca usuarios por tipo, estado o nombre/email</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar por nombre o email"
                  className="pl-10"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-48">
                  <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                    <SelectTrigger>
                      <div className="flex items-center">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Tipo de usuario" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los tipos</SelectItem>
                      <SelectItem value="huesped">Huésped</SelectItem>
                      <SelectItem value="anfitrion">Anfitrión</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-full md:w-48">
                  <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                    <SelectTrigger>
                      <div className="flex items-center">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Estado" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los estados</SelectItem>
                      <SelectItem value="activo">Activo</SelectItem>
                      <SelectItem value="inactivo">Inactivo</SelectItem>
                      <SelectItem value="pendiente">Pendiente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Lista de Usuarios</CardTitle>
              <Button className="bg-[#FF5A5F] hover:bg-[#FF385C]">Añadir Usuario</Button>
            </div>
            <CardDescription>Total: {usuariosFiltrados.length} usuarios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha de Registro</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usuariosFiltrados.length > 0 ? (
                    usuariosFiltrados.map((usuario) => (
                      <TableRow key={usuario.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={usuario.avatar || "/placeholder.svg"} alt={usuario.nombre} />
                              <AvatarFallback>{usuario.nombre.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{usuario.nombre}</span>
                          </div>
                        </TableCell>
                        <TableCell>{usuario.email}</TableCell>
                        <TableCell>{getTipoBadge(usuario.tipo)}</TableCell>
                        <TableCell>{getEstadoBadge(usuario.estado)}</TableCell>
                        <TableCell>{usuario.fechaRegistro}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Mail className="h-4 w-4" />
                            </Button>
                            {usuario.estado === "pendiente" ? (
                              <Button variant="ghost" size="icon" className="text-green-500">
                                <UserCheck className="h-4 w-4" />
                              </Button>
                            ) : null}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No hay usuarios registrados. Los usuarios aparecerán aquí cuando se registren.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
