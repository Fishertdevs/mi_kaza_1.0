"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"

export default function VerificacionPage() {
  const [codigo, setCodigo] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulación de verificación
    if (codigo === "123456") {
      setSuccess(true)
      setError("")
    } else {
      setError("Código de verificación incorrecto. Por favor, intente nuevamente.")
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#FF5A5F] to-[#FF385C] p-4">
      <div className="mb-8">
        <Image
          src="/images/logo.png"
          alt="Mi Kaza Logo"
          width={150}
          height={150}
          className="rounded-full bg-white p-2"
        />
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Verificación de Cuenta</CardTitle>
          <CardDescription className="text-center">
            Ingrese el código de verificación enviado a su correo electrónico
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium text-green-600">¡Verificación Exitosa!</h3>
              <p className="text-gray-600">Su cuenta ha sido verificada correctamente.</p>
              <Button className="w-full bg-[#FF5A5F] hover:bg-[#FF385C]">
                <Link href="/auth/login">Iniciar Sesión</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="codigo">Código de Verificación</Label>
                <Input
                  id="codigo"
                  placeholder="Ingrese el código de 6 dígitos"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  className="text-center text-lg tracking-widest"
                  maxLength={6}
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
              <Button type="submit" className="w-full bg-[#FF5A5F] hover:bg-[#FF385C]">
                Verificar
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-gray-500">
            ¿No recibió el código? <button className="text-[#FF5A5F] hover:underline">Reenviar código</button>
          </div>
          <div className="text-sm text-center text-gray-500">
            <Link href="/auth/login" className="text-[#FF5A5F] hover:underline">
              Volver al inicio de sesión
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
