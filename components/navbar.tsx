"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, User, LogOut, Home, Search, MessageSquare, Calendar, Bell, AlertCircle, DollarSign } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface NavbarProps {
  userType?: "huesped" | "anfitrion" | "admin" | null
}

export function Navbar({ userType = null }: NavbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(
    userType !== null ||
      pathname.includes("/huesped") ||
      pathname.includes("/anfitrion") ||
      pathname.includes("/admin"),
  )

  // Determinar el tipo de usuario basado en la ruta si no se proporciona
  const determineUserType = (): "huesped" | "anfitrion" | "admin" | null => {
    if (userType) return userType
    if (pathname.includes("/huesped")) return "huesped"
    if (pathname.includes("/anfitrion")) return "anfitrion"
    if (pathname.includes("/admin")) return "admin"
    return null
  }

  const currentUserType = determineUserType()

  // Obtener nombre del usuario si está disponible
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    const storedName = localStorage.getItem("miKazaUserName")
    if (storedName) {
      setUserName(storedName)
    }
  }, [])

  const handleLogout = () => {
    // Eliminar datos de sesión del localStorage
    localStorage.removeItem("miKazaUserName")
    localStorage.removeItem("miKazaUserEmail")
    localStorage.removeItem("miKazaUserType")
    localStorage.removeItem("auth")
    localStorage.removeItem("adminAuth")

    // Redirigir a la página de login
    router.push("/auth/login")
  }

  const [showNotificaciones, setShowNotificaciones] = useState(false)
  const [notificaciones, setNotificaciones] = useState([
    {
      id: 1,
      tipo: "reserva",
      titulo: "Nueva reserva",
      descripcion: "Tienes una nueva reserva para tu propiedad.",
      fecha: new Date(),
      leida: false,
    },
    {
      id: 2,
      tipo: "mensaje",
      titulo: "Nuevo mensaje",
      descripcion: "Tienes un nuevo mensaje de un huésped.",
      fecha: new Date(),
      leida: false,
    },
    {
      id: 3,
      tipo: "pago",
      titulo: "Pago recibido",
      descripcion: "Has recibido un pago por una de tus propiedades.",
      fecha: new Date(),
      leida: true,
    },
  ])

  const marcarNotificacionLeida = (id: number) => {
    setNotificaciones((prev) => prev.map((n) => (n.id === id ? { ...n, leida: true } : n)))
  }

  const marcarTodasLeidas = () => {
    setNotificaciones((prev) => prev.map((n) => ({ ...n, leida: true })))
  }

  const isAdminLoginPage = pathname.includes("/admin/login")

  return (
    <>
      {isAdminLoginPage ? null : (
        <header className="sticky top-0 z-50 w-full border-b bg-white">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 relative mr-2">
                  <Image src="/images/logo.png" alt="Mi Kaza Logo" fill className="object-contain" />
                </div>
                <span className="text-xl font-bold text-[#5f9bbd]">Mi Kaza</span>
              </Link>
            </div>

            {/* Navegación para escritorio */}
            <nav className="hidden md:flex items-center gap-6">
              {!isLoggedIn ? (
                <>
                  <Link href="/propiedades" className="text-gray-600 hover:text-[#5f9bbd]">
                    Explorar
                  </Link>
                  <Link href="/ciudades" className="text-gray-600 hover:text-[#5f9bbd]">
                    Ciudades
                  </Link>
                  <Link href="/nosotros" className="text-gray-600 hover:text-[#5f9bbd]">
                    Nosotros
                  </Link>
                  <Link href="/contacto" className="text-gray-600 hover:text-[#5f9bbd]">
                    Contacto
                  </Link>
                  <div className="flex items-center gap-2">
                    <Button asChild variant="outline">
                      <Link href="/auth/login">Iniciar sesión</Link>
                    </Button>
                    <Button asChild className="bg-[#87CEEB] hover:bg-[#5f9bbd]">
                      <Link href="/registro/huesped">Registrarse</Link>
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {currentUserType === "huesped" && (
                    <>
                      <Link href="/huesped/dashboard" className="text-gray-600 hover:text-[#5f9bbd]">
                        Inicio
                      </Link>
                      <Link href="/propiedades" className="text-gray-600 hover:text-[#5f9bbd]">
                        Explorar
                      </Link>
                      <Link href="/huesped/reservas" className="text-gray-600 hover:text-[#5f9bbd]">
                        Mis Reservas
                      </Link>
                      <Link href="/huesped/mensajes" className="text-gray-600 hover:text-[#5f9bbd]">
                        Mensajes
                      </Link>
                    </>
                  )}

                  {/* No mostrar navegación para anfitriones */}

                  {currentUserType === "anfitrion" && (
                    <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      Cerrar sesión
                    </Button>
                  )}

                  {currentUserType === "admin" && (
                    <>
                      <Link href="/admin/dashboard" className="text-gray-600 hover:text-[#5f9bbd]">
                        Dashboard
                      </Link>
                      <Link href="/admin/usuarios" className="text-gray-600 hover:text-[#5f9bbd]">
                        Usuarios
                      </Link>
                      <Link href="/admin/propiedades" className="text-gray-600 hover:text-[#5f9bbd]">
                        Propiedades
                      </Link>
                      <Link href="/admin/reportes" className="text-gray-600 hover:text-[#5f9bbd]">
                        Reportes
                      </Link>
                    </>
                  )}

                  {currentUserType !== "anfitrion" && (
                    <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      Cerrar sesión
                    </Button>
                  )}
                </>
              )}
            </nav>

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
            </div>

            {/* Menú móvil */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-4 mt-8">
                  {!isLoggedIn ? (
                    <>
                      <Link href="/propiedades" className="flex items-center gap-2 py-2">
                        <Search className="h-5 w-5" />
                        Explorar
                      </Link>
                      <Link href="/ciudades" className="flex items-center gap-2 py-2">
                        <Search className="h-5 w-5" />
                        Ciudades
                      </Link>
                      <Link href="/nosotros" className="flex items-center gap-2 py-2">
                        <Home className="h-5 w-5" />
                        Nosotros
                      </Link>
                      <Link href="/contacto" className="flex items-center gap-2 py-2">
                        <MessageSquare className="h-5 w-5" />
                        Contacto
                      </Link>
                      <div className="flex flex-col gap-2 mt-4">
                        <Button asChild variant="outline" className="w-full">
                          <Link href="/auth/login">Iniciar sesión</Link>
                        </Button>
                        <Button asChild className="w-full bg-[#87CEEB] hover:bg-[#5f9bbd]">
                          <Link href="/registro/huesped">Registrarse</Link>
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      {currentUserType === "huesped" && (
                        <>
                          <Link href="/huesped/dashboard" className="flex items-center gap-2 py-2">
                            <Home className="h-5 w-5" />
                            Inicio
                          </Link>
                          <Link href="/propiedades" className="flex items-center gap-2 py-2">
                            <Search className="h-5 w-5" />
                            Explorar
                          </Link>
                          <Link href="/huesped/reservas" className="flex items-center gap-2 py-2">
                            <Calendar className="h-5 w-5" />
                            Mis Reservas
                          </Link>
                          <Link href="/huesped/mensajes" className="flex items-center gap-2 py-2">
                            <MessageSquare className="h-5 w-5" />
                            Mensajes
                          </Link>
                        </>
                      )}

                      {/* No mostrar navegación para anfitriones */}

                      {currentUserType === "admin" && (
                        <>
                          <Link href="/admin/dashboard" className="flex items-center gap-2 py-2">
                            <Home className="h-5 w-5" />
                            Dashboard
                          </Link>
                          <Link href="/admin/usuarios" className="flex items-center gap-2 py-2">
                            <User className="h-5 w-5" />
                            Usuarios
                          </Link>
                          <Link href="/admin/propiedades" className="flex items-center gap-2 py-2">
                            <Search className="h-5 w-5" />
                            Propiedades
                          </Link>
                          <Link href="/admin/reportes" className="flex items-center gap-2 py-2">
                            <Calendar className="h-5 w-5" />
                            Reportes
                          </Link>
                        </>
                      )}

                      <div className="border-t mt-4 pt-4">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 py-2 text-red-500 w-full text-left"
                        >
                          <LogOut className="h-5 w-5" />
                          Cerrar sesión
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>
      )}
    </>
  )
}
