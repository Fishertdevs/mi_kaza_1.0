"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function RecuperarContrasenaPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [codigo, setCodigo] = useState("")
  const [nuevaContrasena, setNuevaContrasena] = useState("")
  const [confirmarContrasena, setConfirmarContrasena] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [paso, setPaso] = useState(1) // 1: Email, 2: Código, 3: Nueva contraseña, 4: Éxito
  const [codigoGenerado, setCodigoGenerado] = useState("")

  const handleSolicitarCodigo = async (e) => {
    e.preventDefault()
    setError("")

    if (!email) {
      setError("Por favor ingresa tu correo electrónico")
      return
    }

    setLoading(true)

    try {
      // Verificar si el correo existe en el sistema (simulado)
      const usuarios = JSON.parse(localStorage.getItem("miKazaUsuarios") || "[]")
      const usuarioExistente = usuarios.find((u) => u.email === email)

      if (!usuarioExistente) {
        setError("No existe una cuenta asociada a este correo electrónico")
        setLoading(false)
        return
      }

      // Simular envío de código
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generar código de 6 dígitos
      const codigo = Math.floor(100000 + Math.random() * 900000).toString()
      setCodigoGenerado(codigo)

      // Avanzar al siguiente paso
      setPaso(2)
    } catch (err) {
      setError("Error al procesar la solicitud. Inténtalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const handleVerificarCodigo = async (e) => {
    e.preventDefault()
    setError("")

    if (!codigo) {
      setError("Por favor ingresa el código de verificación")
      return
    }

    setLoading(true)

    try {
      // Simular verificación
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Verificar código
      if (codigo !== codigoGenerado) {
        setError("El código ingresado no es válido")
        setLoading(false)
        return
      }

      // Avanzar al siguiente paso
      setPaso(3)
    } catch (err) {
      setError("Error al verificar el código. Inténtalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const handleCambiarContrasena = async (e) => {
    e.preventDefault()
    setError("")

    if (!nuevaContrasena || !confirmarContrasena) {
      setError("Por favor completa todos los campos")
      return
    }

    if (nuevaContrasena.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    if (nuevaContrasena !== confirmarContrasena) {
      setError("Las contraseñas no coinciden")
      return
    }

    setLoading(true)

    try {
      // Simular cambio de contraseña
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Actualizar contraseña en localStorage
      const usuarios = JSON.parse(localStorage.getItem("miKazaUsuarios") || "[]")
      const usuarioIndex = usuarios.findIndex((u) => u.email === email)

      if (usuarioIndex !== -1) {
        // Actualizar contraseña del usuario
        localStorage.setItem("miKazaUserPassword", nuevaContrasena)
      }

      // Avanzar al paso final
      setPaso(4)
    } catch (err) {
      setError("Error al cambiar la contraseña. Inténtalo de nuevo.")
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

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Recuperar Contraseña</CardTitle>
            <CardDescription className="text-center">
              {paso === 1 && "Ingresa tu correo electrónico para recuperar tu contraseña"}
              {paso === 2 && "Ingresa el código de verificación enviado a tu correo"}
              {paso === 3 && "Establece tu nueva contraseña"}
              {paso === 4 && "¡Contraseña actualizada con éxito!"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {paso === 1 && (
              <form onSubmit={handleSolicitarCodigo} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-[#87CEEB] hover:bg-[#5f9bbd]" disabled={loading}>
                  {loading ? "Enviando..." : "Enviar código de recuperación"}
                </Button>
              </form>
            )}

            {paso === 2 && (
              <form onSubmit={handleVerificarCodigo} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="codigo">Código de verificación</Label>
                  <Input
                    id="codigo"
                    type="text"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    placeholder="123456"
                    maxLength={6}
                    required
                  />
                  <p className="text-sm text-gray-500">
                    Para fines de demostración, el código es: <strong>{codigoGenerado}</strong>
                  </p>
                </div>
                <Button type="submit" className="w-full bg-[#87CEEB] hover:bg-[#5f9bbd]" disabled={loading}>
                  {loading ? "Verificando..." : "Verificar código"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => setPaso(1)}
                  disabled={loading}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                </Button>
              </form>
            )}

            {paso === 3 && (
              <form onSubmit={handleCambiarContrasena} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nuevaContrasena">Nueva contraseña</Label>
                  <Input
                    id="nuevaContrasena"
                    type="password"
                    value={nuevaContrasena}
                    onChange={(e) => setNuevaContrasena(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  <p className="text-xs text-gray-500">Mínimo 6 caracteres</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmarContrasena">Confirmar contraseña</Label>
                  <Input
                    id="confirmarContrasena"
                    type="password"
                    value={confirmarContrasena}
                    onChange={(e) => setConfirmarContrasena(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-[#87CEEB] hover:bg-[#5f9bbd]" disabled={loading}>
                  {loading ? "Actualizando..." : "Cambiar contraseña"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => setPaso(2)}
                  disabled={loading}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                </Button>
              </form>
            )}

            {paso === 4 && (
              <div className="space-y-4">
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">¡Contraseña actualizada!</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Tu contraseña ha sido actualizada correctamente.
                  </AlertDescription>
                </Alert>
                <Button
                  type="button"
                  className="w-full bg-[#87CEEB] hover:bg-[#5f9bbd]"
                  onClick={() => router.push("/auth/login")}
                >
                  Ir a iniciar sesión
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            {paso !== 4 && (
              <p className="text-sm text-gray-600">
                ¿Recordaste tu contraseña?{" "}
                <Link href="/auth/login" className="text-[#5f9bbd] hover:underline">
                  Iniciar sesión
                </Link>
              </p>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
