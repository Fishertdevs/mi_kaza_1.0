"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Bell, CreditCard, Lock, Globe, Calendar, Save, Loader2, Check, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function HostSettings() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("notificaciones")
  const [isSaving, setIsSaving] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  // Estados para las configuraciones
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      newReservations: true,
      messages: true,
      reminders: true,
      marketing: false,
    },
    push: {
      newReservations: true,
      messages: true,
      reminders: false,
      marketing: false,
    },
    sms: {
      newReservations: false,
      messages: false,
      reminders: false,
      marketing: false,
    },
  })

  const [paymentSettings, setPaymentSettings] = useState({
    defaultMethod: "bank",
    bankAccount: "•••• •••• •••• 4567",
    paymentFrequency: "monthly",
    currency: "COP",
    autoWithdraw: true,
    minWithdrawAmount: 100000,
  })

  const [privacySettings, setPrivacySettings] = useState({
    showProfileInfo: true,
    showContactInfo: false,
    showReviews: true,
    dataSharing: false,
    activityTracking: true,
  })

  const [reservationSettings, setReservationSettings] = useState({
    instantBooking: true,
    minStay: 2,
    maxStay: 30,
    advanceBooking: 6,
    checkInTime: "15:00",
    checkOutTime: "11:00",
    autoAccept: false,
  })

  // Función para guardar cambios
  const handleSave = async () => {
    setIsSaving(true)
    // Simulamos una llamada a la API
    setTimeout(() => {
      setIsSaving(false)
      setSavedSuccess(true)

      // Ocultar mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setSavedSuccess(false)
      }, 3000)

      // Aquí iría la lógica para guardar los cambios en la base de datos
    }, 1500)
  }

  // Función para manejar cambios en notificaciones
  const handleNotificationChange = (
    channel: "email" | "push" | "sms",
    setting: "newReservations" | "messages" | "reminders" | "marketing",
    value: boolean,
  ) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [setting]: value,
      },
    }))
  }

  // Función para manejar cambios en configuración de privacidad
  const handlePrivacyChange = (setting: string, value: boolean) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [setting]: value,
    }))
  }

  // Función para manejar cambios en configuración de reservas
  const handleReservationChange = (setting: string, value: any) => {
    setReservationSettings((prev) => ({
      ...prev,
      [setting]: value,
    }))
  }

  // Función para cerrar sesión
  const handleLogout = () => {
    // Eliminar datos de sesión del localStorage
    localStorage.removeItem("anfitrionLoggedIn")
    localStorage.removeItem("userData")
    localStorage.removeItem("userRole")
    localStorage.removeItem("authToken")

    // Redireccionar al login
    router.push("/auth/login")
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-2">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Volver
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold flex-grow">Configuración</h1>
        <div className="flex items-center gap-2">
          {savedSuccess && (
            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 flex items-center">
              <Check className="h-3 w-3 mr-1" />
              Guardado
            </Badge>
          )}
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-1" />
                Guardar cambios
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-2">
                <Button
                  variant={activeTab === "notificaciones" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("notificaciones")}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notificaciones
                </Button>
                <Button
                  variant={activeTab === "pagos" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("pagos")}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pagos
                </Button>
                <Button
                  variant={activeTab === "privacidad" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("privacidad")}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Privacidad y seguridad
                </Button>
                <Button
                  variant={activeTab === "reservas" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("reservas")}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Reservas
                </Button>
                <Button
                  variant={activeTab === "preferencias" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("preferencias")}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Preferencias
                </Button>
                <Separator className="my-2" />
                <Button variant="destructive" className="w-full justify-start" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar sesión
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          {activeTab === "notificaciones" && (
            <Card>
              <CardHeader>
                <CardTitle>Configuración de notificaciones</CardTitle>
                <CardDescription>
                  Personaliza cómo y cuándo quieres recibir notificaciones sobre tu actividad como anfitrión.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Notificaciones por correo electrónico</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-reservations" className="font-medium">
                          Nuevas reservas
                        </Label>
                        <p className="text-sm text-gray-500">
                          Recibe notificaciones cuando un huésped realice una reserva
                        </p>
                      </div>
                      <Switch
                        id="email-reservations"
                        checked={notificationSettings.email.newReservations}
                        onCheckedChange={(value) => handleNotificationChange("email", "newReservations", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-messages" className="font-medium">
                          Mensajes
                        </Label>
                        <p className="text-sm text-gray-500">
                          Recibe notificaciones cuando un huésped te envíe un mensaje
                        </p>
                      </div>
                      <Switch
                        id="email-messages"
                        checked={notificationSettings.email.messages}
                        onCheckedChange={(value) => handleNotificationChange("email", "messages", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-reminders" className="font-medium">
                          Recordatorios
                        </Label>
                        <p className="text-sm text-gray-500">Recibe recordatorios sobre próximas llegadas y salidas</p>
                      </div>
                      <Switch
                        id="email-reminders"
                        checked={notificationSettings.email.reminders}
                        onCheckedChange={(value) => handleNotificationChange("email", "reminders", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-marketing" className="font-medium">
                          Marketing y promociones
                        </Label>
                        <p className="text-sm text-gray-500">Recibe información sobre promociones y novedades</p>
                      </div>
                      <Switch
                        id="email-marketing"
                        checked={notificationSettings.email.marketing}
                        onCheckedChange={(value) => handleNotificationChange("email", "marketing", value)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Notificaciones push</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push-reservations" className="font-medium">
                          Nuevas reservas
                        </Label>
                        <p className="text-sm text-gray-500">
                          Recibe notificaciones cuando un huésped realice una reserva
                        </p>
                      </div>
                      <Switch
                        id="push-reservations"
                        checked={notificationSettings.push.newReservations}
                        onCheckedChange={(value) => handleNotificationChange("push", "newReservations", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push-messages" className="font-medium">
                          Mensajes
                        </Label>
                        <p className="text-sm text-gray-500">
                          Recibe notificaciones cuando un huésped te envíe un mensaje
                        </p>
                      </div>
                      <Switch
                        id="push-messages"
                        checked={notificationSettings.push.messages}
                        onCheckedChange={(value) => handleNotificationChange("push", "messages", value)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Notificaciones SMS</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sms-reservations" className="font-medium">
                          Nuevas reservas
                        </Label>
                        <p className="text-sm text-gray-500">Recibe SMS cuando un huésped realice una reserva</p>
                      </div>
                      <Switch
                        id="sms-reservations"
                        checked={notificationSettings.sms.newReservations}
                        onCheckedChange={(value) => handleNotificationChange("sms", "newReservations", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sms-messages" className="font-medium">
                          Mensajes
                        </Label>
                        <p className="text-sm text-gray-500">Recibe SMS cuando un huésped te envíe un mensaje</p>
                      </div>
                      <Switch
                        id="sms-messages"
                        checked={notificationSettings.sms.messages}
                        onCheckedChange={(value) => handleNotificationChange("sms", "messages", value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "pagos" && (
            <Card>
              <CardHeader>
                <CardTitle>Configuración de pagos</CardTitle>
                <CardDescription>
                  Administra tus métodos de pago y configura cómo quieres recibir tus ingresos.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Método de pago predeterminado</h3>
                  <RadioGroup
                    value={paymentSettings.defaultMethod}
                    onValueChange={(value) => setPaymentSettings({ ...paymentSettings, defaultMethod: value })}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2 border rounded-lg p-3">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="flex-grow">
                        <div className="font-medium">Transferencia bancaria</div>
                        <div className="text-sm text-gray-500">{paymentSettings.bankAccount}</div>
                      </Label>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </div>

                    <div className="flex items-center space-x-2 border rounded-lg p-3">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex-grow">
                        <div className="font-medium">PayPal</div>
                        <div className="text-sm text-gray-500">No configurado</div>
                      </Label>
                      <Button variant="outline" size="sm">
                        Configurar
                      </Button>
                    </div>

                    <div className="flex items-center space-x-2 border rounded-lg p-3">
                      <RadioGroupItem value="nequi" id="nequi" />
                      <Label htmlFor="nequi" className="flex-grow">
                        <div className="font-medium">Nequi</div>
                        <div className="text-sm text-gray-500">No configurado</div>
                      </Label>
                      <Button variant="outline" size="sm">
                        Configurar
                      </Button>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="payment-frequency" className="text-lg font-medium">
                      Frecuencia de pago
                    </Label>
                    <Select
                      value={paymentSettings.paymentFrequency}
                      onValueChange={(value) => setPaymentSettings({ ...paymentSettings, paymentFrequency: value })}
                    >
                      <SelectTrigger id="payment-frequency" className="mt-2">
                        <SelectValue placeholder="Selecciona frecuencia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="biweekly">Quincenal</SelectItem>
                        <SelectItem value="monthly">Mensual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="currency" className="text-lg font-medium">
                      Moneda
                    </Label>
                    <Select
                      value={paymentSettings.currency}
                      onValueChange={(value) => setPaymentSettings({ ...paymentSettings, currency: value })}
                    >
                      <SelectTrigger id="currency" className="mt-2">
                        <SelectValue placeholder="Selecciona moneda" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="COP">Peso Colombiano (COP)</SelectItem>
                        <SelectItem value="USD">Dólar Estadounidense (USD)</SelectItem>
                        <SelectItem value="EUR">Euro (EUR)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-withdraw" className="font-medium">
                        Retiro automático
                      </Label>
                      <p className="text-sm text-gray-500">Transferir automáticamente los pagos a tu cuenta</p>
                    </div>
                    <Switch
                      id="auto-withdraw"
                      checked={paymentSettings.autoWithdraw}
                      onCheckedChange={(value) => setPaymentSettings({ ...paymentSettings, autoWithdraw: value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="min-withdraw" className="font-medium">
                      Monto mínimo de retiro
                    </Label>
                    <Input
                      id="min-withdraw"
                      type="number"
                      className="mt-2"
                      value={paymentSettings.minWithdrawAmount}
                      onChange={(e) =>
                        setPaymentSettings({ ...paymentSettings, minWithdrawAmount: Number.parseInt(e.target.value) })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "privacidad" && (
            <Card>
              <CardHeader>
                <CardTitle>Privacidad y seguridad</CardTitle>
                <CardDescription>Configura tus preferencias de privacidad y seguridad.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-profile" className="font-medium">
                        Mostrar información de perfil
                      </Label>
                      <p className="text-sm text-gray-500">Permite que otros usuarios vean tu información de perfil</p>
                    </div>
                    <Switch
                      id="show-profile"
                      checked={privacySettings.showProfileInfo}
                      onCheckedChange={(value) => handlePrivacyChange("showProfileInfo", value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-contact" className="font-medium">
                        Mostrar información de contacto
                      </Label>
                      <p className="text-sm text-gray-500">Permite que los huéspedes vean tu información de contacto</p>
                    </div>
                    <Switch
                      id="show-contact"
                      checked={privacySettings.showContactInfo}
                      onCheckedChange={(value) => handlePrivacyChange("showContactInfo", value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-reviews" className="font-medium">
                        Mostrar reseñas
                      </Label>
                      <p className="text-sm text-gray-500">
                        Permite que otros usuarios vean las reseñas de tus propiedades
                      </p>
                    </div>
                    <Switch
                      id="show-reviews"
                      checked={privacySettings.showReviews}
                      onCheckedChange={(value) => handlePrivacyChange("showReviews", value)}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="data-sharing" className="font-medium">
                        Compartir datos con terceros
                      </Label>
                      <p className="text-sm text-gray-500">
                        Permite que compartamos tus datos con servicios de terceros
                      </p>
                    </div>
                    <Switch
                      id="data-sharing"
                      checked={privacySettings.dataSharing}
                      onCheckedChange={(value) => handlePrivacyChange("dataSharing", value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="activity-tracking" className="font-medium">
                        Seguimiento de actividad
                      </Label>
                      <p className="text-sm text-gray-500">
                        Permite que registremos tu actividad para mejorar el servicio
                      </p>
                    </div>
                    <Switch
                      id="activity-tracking"
                      checked={privacySettings.activityTracking}
                      onCheckedChange={(value) => handlePrivacyChange("activityTracking", value)}
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Seguridad de la cuenta</h3>
                  <div className="space-y-4">
                    <Button variant="outline">Cambiar contraseña</Button>
                    <Button variant="outline">Configurar autenticación de dos factores</Button>
                    <Button variant="outline">Ver sesiones activas</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "reservas" && (
            <Card>
              <CardHeader>
                <CardTitle>Configuración de reservas</CardTitle>
                <CardDescription>Personaliza cómo quieres gestionar las reservas de tus propiedades.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="instant-booking" className="font-medium">
                      Reserva instantánea
                    </Label>
                    <p className="text-sm text-gray-500">Permite que los huéspedes reserven sin aprobación previa</p>
                  </div>
                  <Switch
                    id="instant-booking"
                    checked={reservationSettings.instantBooking}
                    onCheckedChange={(value) => handleReservationChange("instantBooking", value)}
                  />
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="min-stay" className="font-medium">
                      Estancia mínima (noches)
                    </Label>
                    <Input
                      id="min-stay"
                      type="number"
                      className="mt-2"
                      value={reservationSettings.minStay}
                      onChange={(e) => handleReservationChange("minStay", Number.parseInt(e.target.value))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="max-stay" className="font-medium">
                      Estancia máxima (noches)
                    </Label>
                    <Input
                      id="max-stay"
                      type="number"
                      className="mt-2"
                      value={reservationSettings.maxStay}
                      onChange={(e) => handleReservationChange("maxStay", Number.parseInt(e.target.value))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="advance-booking" className="font-medium">
                      Reserva anticipada (meses)
                    </Label>
                    <Input
                      id="advance-booking"
                      type="number"
                      className="mt-2"
                      value={reservationSettings.advanceBooking}
                      onChange={(e) => handleReservationChange("advanceBooking", Number.parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="check-in-time" className="font-medium">
                      Hora de check-in
                    </Label>
                    <Input
                      id="check-in-time"
                      type="time"
                      className="mt-2"
                      value={reservationSettings.checkInTime}
                      onChange={(e) => handleReservationChange("checkInTime", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="check-out-time" className="font-medium">
                      Hora de check-out
                    </Label>
                    <Input
                      id="check-out-time"
                      type="time"
                      className="mt-2"
                      value={reservationSettings.checkOutTime}
                      onChange={(e) => handleReservationChange("checkOutTime", e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-accept" className="font-medium">
                      Aceptación automática
                    </Label>
                    <p className="text-sm text-gray-500">Acepta automáticamente las solicitudes de reserva</p>
                  </div>
                  <Switch
                    id="auto-accept"
                    checked={reservationSettings.autoAccept}
                    onCheckedChange={(value) => handleReservationChange("autoAccept", value)}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "preferencias" && (
            <Card>
              <CardHeader>
                <CardTitle>Preferencias</CardTitle>
                <CardDescription>Configura tus preferencias generales de la plataforma.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Idioma</h3>
                  <Select defaultValue="es">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="pt">Português</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Zona horaria</h3>
                  <Select defaultValue="america-bogota">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una zona horaria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america-bogota">América/Bogotá</SelectItem>
                      <SelectItem value="america-mexico">América/Ciudad de México</SelectItem>
                      <SelectItem value="america-new_york">América/Nueva York</SelectItem>
                      <SelectItem value="europe-madrid">Europa/Madrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Tema</h3>
                  <RadioGroup defaultValue="light">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light">Claro</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark">Oscuro</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="system" />
                      <Label htmlFor="system">Usar configuración del sistema</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
