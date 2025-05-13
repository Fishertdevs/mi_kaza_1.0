"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, Upload, Shield } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DatosPersonalesModal } from "@/components/datos-personales-modal"

export default function RegistroAnfitrionPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    tipoDocumento: "",
    numeroDocumento: "",
    direccion: "",
    telefono: "",
    password: "",
    confirmPassword: "",
    documentoIdentidad: null as File | null,
    terminosCondiciones: false,
    tratamientoDatos: false,
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showDatosModal, setShowDatosModal] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, documentoIdentidad: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validaciones básicas
    if (
      !formData.nombre ||
      !formData.email ||
      !formData.tipoDocumento ||
      !formData.numeroDocumento ||
      !formData.telefono
    ) {
      setError("Por favor completa todos los campos obligatorios")
      return
    }

    // Validación de contraseña
    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    // Validación de coincidencia de contraseñas
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (!formData.terminosCondiciones || !formData.tratamientoDatos) {
      setError("Debes aceptar los términos y condiciones y la política de tratamiento de datos")
      return
    }

    if (!formData.documentoIdentidad) {
      setError("Debes subir tu documento de identidad")
      return
    }

    setLoading(true)

    try {
      // Simulación de registro
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Guardar en localStorage para simular base de datos
      localStorage.setItem("miKazaUserEmail", formData.email)
      localStorage.setItem("miKazaUserName", formData.nombre)
      localStorage.setItem("miKazaUserType", "anfitrion")
      localStorage.setItem("miKazaUserPassword", formData.password) // Guardar contraseña para simulación

      // Añadir el usuario a la lista de usuarios activos del administrador
      const usuarios = JSON.parse(localStorage.getItem("miKazaUsuarios") || "[]")
      const nuevoUsuario = {
        id: Date.now(),
        nombre: formData.nombre,
        email: formData.email,
        tipo: "anfitrion",
        estado: "activo",
        fechaRegistro: new Date().toLocaleDateString("es-CO"),
        avatar: "/diverse-avatars.png",
      }

      // Verificar si el usuario ya existe para no duplicarlo
      const usuarioExistente = usuarios.find((u) => u.email === formData.email)
      if (!usuarioExistente) {
        localStorage.setItem("miKazaUsuarios", JSON.stringify([...usuarios, nuevoUsuario]))
      }

      // Redirigir al login después del registro exitoso
      router.push("/auth/login?registered=true&type=anfitrion")
    } catch (err) {
      setError("Error al registrar usuario. Inténtalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const handleDatosAceptados = () => {
    // Guardar la aceptación en localStorage para futuras sesiones
    localStorage.setItem("datosPersonalesAceptados", "true")
    setFormData((prev) => ({ ...prev, tratamientoDatos: true }))
    setShowDatosModal(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 py-10">
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
            <CardTitle className="text-2xl text-center">Registro de Anfitrión</CardTitle>
            <CardDescription className="text-center">Crea tu cuenta para publicar tus propiedades</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre completo</Label>
                  <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
                </div>

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

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tipoDocumento">Tipo de documento</Label>
                    <Select
                      onValueChange={(value) => handleSelectChange("tipoDocumento", value)}
                      value={formData.tipoDocumento}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CC">Cédula de Ciudadanía</SelectItem>
                        <SelectItem value="CE">Cédula de Extranjería</SelectItem>
                        <SelectItem value="NIT">NIT</SelectItem>
                        <SelectItem value="PP">Pasaporte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numeroDocumento">Número de documento</Label>
                    <Input
                      id="numeroDocumento"
                      name="numeroDocumento"
                      value={formData.numeroDocumento}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input
                    id="direccion"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono de contacto</Label>
                  <Input
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                    <p className="text-xs text-gray-500">Mínimo 6 caracteres</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="documentoIdentidad">Documento de identidad (PDF o imagen)</Label>
                  <div className="border border-input rounded-md p-2">
                    <label
                      htmlFor="documentoIdentidad"
                      className="flex items-center justify-center gap-2 cursor-pointer py-2"
                    >
                      <Upload className="h-5 w-5 text-gray-500" />
                      <span className="text-sm text-gray-500">
                        {formData.documentoIdentidad ? formData.documentoIdentidad.name : "Subir archivo"}
                      </span>
                      <Input
                        id="documentoIdentidad"
                        name="documentoIdentidad"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terminosCondiciones"
                      checked={formData.terminosCondiciones}
                      onCheckedChange={(checked) => handleCheckboxChange("terminosCondiciones", checked as boolean)}
                    />
                    <Label htmlFor="terminosCondiciones" className="text-sm leading-tight">
                      Acepto los{" "}
                      <Link href="/terminos" className="text-[#5f9bbd] hover:underline">
                        términos y condiciones
                      </Link>{" "}
                      de Mi Kaza
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="tratamientoDatos"
                      checked={formData.tratamientoDatos}
                      onCheckedChange={(checked) => {
                        if (checked === false) {
                          // Si desmarca, mostrar el modal para confirmar
                          setShowDatosModal(true)
                        } else {
                          // Si marca, aceptar directamente
                          handleDatosAceptados()
                        }
                      }}
                    />
                    <Label htmlFor="tratamientoDatos" className="text-sm leading-tight">
                      Autorizo el{" "}
                      <Link href="/tratamiento-datos" className="text-[#5f9bbd] hover:underline">
                        tratamiento de mis datos personales
                      </Link>{" "}
                      según la Ley 1581 de 2012
                    </Label>
                  </div>

                  <div className="flex items-center text-sm mt-2">
                    <Shield className="h-4 w-4 text-[#5f9bbd] mr-1" />
                    <Link href="/tratamiento-datos" className="text-[#5f9bbd] hover:underline" target="_blank">
                      Ver política de tratamiento de datos completa
                    </Link>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full mt-6 bg-[#87CEEB] hover:bg-[#5f9bbd]" disabled={loading}>
                {loading ? "Registrando..." : "Registrarse"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/auth/login" className="text-[#5f9bbd] hover:underline">
                Inicia sesión
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>

      <DatosPersonalesModal
        isOpen={showDatosModal}
        onClose={() => setShowDatosModal(false)}
        onAccept={handleDatosAceptados}
      />
    </div>
  )
}
