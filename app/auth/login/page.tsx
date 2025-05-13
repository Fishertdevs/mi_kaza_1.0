"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const registered = searchParams.get("registered") === "true"
  const userType = searchParams.get("type") || ""

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("huesped")

  useEffect(() => {
    // Si viene de registro, establecer la pestaña activa según el tipo de usuario
    if (registered && userType) {
      setActiveTab(userType)
    }
  }, [registered, userType])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!formData.email || !formData.password) {
      setError("Por favor completa todos los campos")
      return
    }

    setLoading(true)

    try {
      // Simulación de login
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Verificar si es el administrador
      if (activeTab === "admin" && formData.email === "admin@mikaza.co" && formData.password === "admin123") {
        localStorage.setItem("adminAuth", "true")
        router.push("/admin/dashboard")
        return
      }

      // Verificar credenciales desde localStorage
      const storedEmail = localStorage.getItem("miKazaUserEmail")
      const storedPassword = localStorage.getItem("miKazaUserPassword")
      const storedUserType = localStorage.getItem("miKazaUserType")
      const storedUserName = localStorage.getItem("miKazaUserName")

      if (
        storedEmail === formData.email &&
        storedPassword === formData.password &&
        (activeTab === storedUserType || activeTab === "cualquiera")
      ) {
        // Marcar como logueado según el tipo de usuario
        if (storedUserType === "huesped") {
          localStorage.setItem("huespedLoggedIn", "true")
          router.push("/huesped/dashboard")
        } else if (storedUserType === "anfitrion") {
          localStorage.setItem("anfitrionLoggedIn", "true")
          router.push("/anfitrion/dashboard")
        }
      } else {
        // Verificar si existe el usuario en la lista de usuarios registrados
        const usuarios = JSON.parse(localStorage.getItem("miKazaUsuarios") || "[]")
        const usuarioEncontrado = usuarios.find(
          (u) => u.email === formData.email && (activeTab === u.tipo || activeTab === "cualquiera"),
        )

        if (usuarioEncontrado) {
          // Guardar datos del usuario en localStorage para simular sesión
          localStorage.setItem("miKazaUserEmail", usuarioEncontrado.email)
          localStorage.setItem("miKazaUserName", usuarioEncontrado.nombre)
          localStorage.setItem("miKazaUserType", usuarioEncontrado.tipo)
          localStorage.setItem("miKazaUserPassword", formData.password) // Guardar contraseña para simulación

          // Marcar como logueado según el tipo de usuario
          if (usuarioEncontrado.tipo === "huesped") {
            localStorage.setItem("huespedLoggedIn", "true")
            router.push("/huesped/dashboard")
          } else if (usuarioEncontrado.tipo === "anfitrion") {
            localStorage.setItem("anfitrionLoggedIn", "true")
            router.push("/anfitrion/dashboard")
          }
        } else {
          setError("Credenciales incorrectas o tipo de usuario no coincide")
        }
      }
    } catch (err) {
      setError("Error al iniciar sesión. Inténtalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Link href="/">
            <div className="flex items-center">
              <div className="w-12 h-12 relative mr-2">
                <Image src="/images/logo.png" alt="Mi Kaza Logo" fill className="object-contain" />
              </div>
              <span className="text-2xl font-bold text-[#5f9bbd]">Mi Kaza</span>
            </div>
          </Link>
        </div>

        {registered && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Registro exitoso</AlertTitle>
            <AlertDescription className="text-green-700">
              Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión.
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Iniciar Sesión</CardTitle>
            <CardDescription className="text-center">Accede a tu cuenta de Mi Kaza</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="huesped">Huésped</TabsTrigger>
                <TabsTrigger value="anfitrion">Anfitrión</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
              </TabsList>

              <TabsContent value="huesped">
                <form onSubmit={handleSubmit}>
                  {error && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Contraseña</Label>
                        <Link href="/auth/recuperar" className="text-sm text-[#5f9bbd] hover:underline">
                          ¿Olvidaste tu contraseña?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full mt-6 bg-[#87CEEB] hover:bg-[#5f9bbd]" disabled={loading}>
                    {loading ? "Iniciando sesión..." : "Iniciar sesión"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="anfitrion">
                <form onSubmit={handleSubmit}>
                  {error && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Contraseña</Label>
                        <Link href="/auth/recuperar" className="text-sm text-[#5f9bbd] hover:underline">
                          ¿Olvidaste tu contraseña?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full mt-6 bg-[#87CEEB] hover:bg-[#5f9bbd]" disabled={loading}>
                    {loading ? "Iniciando sesión..." : "Iniciar sesión"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="admin">
                <form onSubmit={handleSubmit}>
                  {error && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Contraseña</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full mt-6 bg-[#87CEEB] hover:bg-[#5f9bbd]" disabled={loading}>
                    {loading ? "Iniciando sesión..." : "Iniciar sesión"}
                  </Button>

                  <div className="mt-4 text-sm text-gray-500 text-center">
                    <p>Para acceso de administrador:</p>
                    <p>Email: admin@mikaza.co</p>
                    <p>Contraseña: admin123</p>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{" "}
              {activeTab === "huesped" ? (
                <Link href="/registro/huesped" className="text-[#5f9bbd] hover:underline">
                  Regístrate como huésped
                </Link>
              ) : activeTab === "anfitrion" ? (
                <Link href="/registro/anfitrion" className="text-[#5f9bbd] hover:underline">
                  Regístrate como anfitrión
                </Link>
              ) : (
                <span className="text-gray-400">Contacta al administrador</span>
              )}
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
