"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { User, Shield, Bell, Save, AlertTriangle, CheckCircle } from "lucide-react"

export default function AdminSettingsPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Configuración de perfil
  const [profileSettings, setProfileSettings] = useState({
    name: "Administrador Mi Kaza",
    email: "admin@mikaza.co",
    phone: "+57 601 123 4567",
    bio: "Administrador principal de la plataforma Mi Kaza.",
  })

  // Configuración de seguridad
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    loginNotifications: true,
    sessionTimeout: "30",
  })

  // Configuración de notificaciones
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newUserNotifications: true,
    newPropertyNotifications: true,
    reportNotifications: true,
    dailySummary: false,
    weeklySummary: true,
  })

  useEffect(() => {
    // Verificar autenticación
    const adminAuth = localStorage.getItem("adminAuth")
    if (adminAuth) {
      setIsAuthenticated(true)
    } else {
      // Redirigir a la página de login si no está autenticado
      router.push("/admin/login")
    }
  }, [router])

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileSettings((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSecuritySettings((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleToggleChange = (name: string, checked: boolean, settingType: "security" | "notification") => {
    if (settingType === "security") {
      setSecuritySettings((prev) => ({
        ...prev,
        [name]: checked,
      }))
    } else {
      setNotificationSettings((prev) => ({
        ...prev,
        [name]: checked,
      }))
    }
  }

  const handleSaveSettings = () => {
    setIsSaving(true)

    // Simulación de guardado
    setTimeout(() => {
      setIsSaving(false)
      setShowSuccess(true)

      // Ocultar mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    }, 1500)
  }

  if (!isAuthenticated) {
    return null // No renderizar nada mientras redirige
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType="admin" />

      <main className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Configuración</h1>
            <p className="text-gray-600">Administra la configuración de tu cuenta</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button onClick={() => router.push("/admin/dashboard")} variant="outline">
              Volver al dashboard
            </Button>
          </div>
        </div>

        {showSuccess && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Cambios guardados</AlertTitle>
            <AlertDescription className="text-green-700">
              La configuración se ha actualizado correctamente.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="profile" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile" className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span>Perfil</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              <span>Seguridad</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              <span>Notificaciones</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Información de perfil</CardTitle>
                <CardDescription>Actualiza tu información personal y de contacto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input id="name" name="name" value={profileSettings.name} onChange={handleProfileChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profileSettings.email}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" name="phone" value={profileSettings.phone} onChange={handleProfileChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Biografía</Label>
                  <Textarea id="bio" name="bio" rows={4} value={profileSettings.bio} onChange={handleProfileChange} />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings} className="bg-[#87CEEB] hover:bg-[#5f9bbd]" disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Guardando..." : "Guardar cambios"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de seguridad</CardTitle>
                <CardDescription>
                  Administra la seguridad de tu cuenta y las preferencias de autenticación
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Autenticación de dos factores</h3>
                    <p className="text-sm text-gray-500">Añade una capa adicional de seguridad a tu cuenta</p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorEnabled}
                    onCheckedChange={(checked) => handleToggleChange("twoFactorEnabled", checked, "security")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notificaciones de inicio de sesión</h3>
                    <p className="text-sm text-gray-500">
                      Recibe notificaciones cuando alguien inicie sesión en tu cuenta
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.loginNotifications}
                    onCheckedChange={(checked) => handleToggleChange("loginNotifications", checked, "security")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Tiempo de expiración de sesión (minutos)</Label>
                  <Input
                    id="sessionTimeout"
                    name="sessionTimeout"
                    type="number"
                    min="5"
                    max="120"
                    value={securitySettings.sessionTimeout}
                    onChange={handleSecurityChange}
                  />
                </div>
                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    Cambiar contraseña
                  </Button>
                </div>
                <Alert variant="destructive" className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Zona de peligro</AlertTitle>
                  <AlertDescription>
                    Las siguientes acciones son irreversibles y pueden afectar permanentemente a tu cuenta.
                  </AlertDescription>
                </Alert>
                <div className="pt-2">
                  <Button variant="destructive" className="w-full">
                    Eliminar cuenta
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings} className="bg-[#87CEEB] hover:bg-[#5f9bbd]" disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Guardando..." : "Guardar cambios"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Preferencias de notificaciones</CardTitle>
                <CardDescription>Configura cómo y cuándo quieres recibir notificaciones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notificaciones por correo electrónico</h3>
                    <p className="text-sm text-gray-500">Recibe notificaciones importantes por correo electrónico</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => handleToggleChange("emailNotifications", checked, "notification")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Nuevos usuarios</h3>
                    <p className="text-sm text-gray-500">Recibe notificaciones cuando se registren nuevos usuarios</p>
                  </div>
                  <Switch
                    checked={notificationSettings.newUserNotifications}
                    onCheckedChange={(checked) => handleToggleChange("newUserNotifications", checked, "notification")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Nuevas propiedades</h3>
                    <p className="text-sm text-gray-500">
                      Recibe notificaciones cuando se publiquen nuevas propiedades
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.newPropertyNotifications}
                    onCheckedChange={(checked) =>
                      handleToggleChange("newPropertyNotifications", checked, "notification")
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Reportes y denuncias</h3>
                    <p className="text-sm text-gray-500">
                      Recibe notificaciones sobre reportes de usuarios o propiedades
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.reportNotifications}
                    onCheckedChange={(checked) => handleToggleChange("reportNotifications", checked, "notification")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Resumen diario</h3>
                    <p className="text-sm text-gray-500">Recibe un resumen diario de la actividad de la plataforma</p>
                  </div>
                  <Switch
                    checked={notificationSettings.dailySummary}
                    onCheckedChange={(checked) => handleToggleChange("dailySummary", checked, "notification")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Resumen semanal</h3>
                    <p className="text-sm text-gray-500">
                      Recibe un resumen semanal con estadísticas y métricas de la plataforma
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.weeklySummary}
                    onCheckedChange={(checked) => handleToggleChange("weeklySummary", checked, "notification")}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings} className="bg-[#87CEEB] hover:bg-[#5f9bbd]" disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Guardando..." : "Guardar cambios"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
