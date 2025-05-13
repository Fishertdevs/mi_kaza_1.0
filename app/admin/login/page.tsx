"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Eye, EyeOff, KeyRound, Mail, ShieldCheck } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("admin@mikaza.co")
  const [password, setPassword] = useState("Admin123*")
  const [verificationCode, setVerificationCode] = useState("123456")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Verificar si ya está autenticado
  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth")
    if (adminAuth) {
      router.push("/admin/dashboard")
    }
  }, [router])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validar todos los campos
    if (!email || !password || !verificationCode) {
      setError("Por favor, completa todos los campos")
      setIsLoading(false)
      return
    }

    // Simulación de validación de credenciales
    setTimeout(() => {
      // Credenciales de prueba
      if (email === "admin@mikaza.co" && password === "Admin123*" && verificationCode === "123456") {
        // Guardar estado de autenticación
        localStorage.setItem(
          "adminAuth",
          JSON.stringify({
            email,
            timestamp: new Date().toISOString(),
          }),
        )

        // Redirigir al dashboard
        router.push("/admin/dashboard")
      } else {
        setError("Credenciales incorrectas. Verifica tu email, contraseña y código de verificación.")
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-6">
              <Image src="/images/logo.png" alt="Mi Kaza Logo" width={60} height={60} className="h-12 w-auto" />
            </div>
            <Tabs defaultValue="administrador" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="huesped" onClick={() => router.push("/auth/login?type=huesped")}>
                  Huésped
                </TabsTrigger>
                <TabsTrigger value="anfitrion" onClick={() => router.push("/auth/login?type=anfitrion")}>
                  Anfitrión
                </TabsTrigger>
                <TabsTrigger value="administrador">Administrador</TabsTrigger>
              </TabsList>
            </Tabs>
            <CardTitle className="text-2xl text-center">Acceso Administrador</CardTitle>
            <CardDescription className="text-center">Ingresa tus credenciales para acceder al panel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@mikaza.co"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Código de verificación</Label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="code"
                    type="text"
                    placeholder="123456"
                    className="pl-10"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength={6}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full bg-[#87CEEB] hover:bg-[#5f9bbd]" disabled={isLoading}>
                {isLoading ? "Verificando..." : "Iniciar sesión"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-gray-500">
              <p>Para acceder al panel de prueba, usa:</p>
              <p className="mt-1">
                <strong>Email:</strong> admin@mikaza.co | <strong>Contraseña:</strong> Admin123*
              </p>
              <p className="mt-1">
                <strong>Código de verificación:</strong> 123456
              </p>
            </div>
            <div className="text-center text-sm">
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                Volver a la página principal
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
