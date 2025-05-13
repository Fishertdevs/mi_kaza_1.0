"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Mail, Phone, MapPin, Calendar, Shield, Star, Edit, Camera, Save, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Datos simulados del anfitrión
const hostData = {
  id: "host123",
  name: "Ana María Gómez",
  email: "ana.gomez@example.com",
  phone: "+57 300 123 4567",
  address: "Medellín, Colombia",
  bio: "Soy una anfitriona apasionada por brindar experiencias únicas a mis huéspedes. Me encanta viajar y conocer nuevas culturas, por lo que entiendo lo importante que es sentirse como en casa cuando estás lejos.",
  joinDate: "2022-05-15",
  verified: true,
  rating: 4.9,
  reviews: 42,
  profileImage: "/images/anfitrion1.png",
  properties: 3,
  languages: ["Español", "Inglés", "Portugués"],
  responseRate: 98,
  responseTime: "1 hora",
  identityVerified: true,
  emailVerified: true,
  phoneVerified: true,
  superhost: true,
}

export default function HostProfile() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [profileData, setProfileData] = useState(hostData)
  const [activeTab, setActiveTab] = useState("perfil")

  // Función para formatear fechas
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("es-CO", options)
  }

  // Función para manejar cambios en los campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Función para guardar cambios
  const handleSave = async () => {
    setIsSaving(true)
    // Simulamos una llamada a la API
    setTimeout(() => {
      setIsSaving(false)
      setIsEditing(false)
      // Aquí iría la lógica para guardar los cambios en la base de datos
    }, 1500)
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-2">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Volver
        </Button>
        <h1 className="text-2xl md:text-3xl font-bold flex-grow">Mi Perfil</h1>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} size="sm">
            <Edit className="h-4 w-4 mr-1" />
            Editar perfil
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsEditing(false)
                setProfileData(hostData) // Restaurar datos originales
              }}
            >
              Cancelar
            </Button>
            <Button size="sm" onClick={handleSave} disabled={isSaving}>
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
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="relative mb-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={profileData.profileImage || "/placeholder.svg"} alt={profileData.name} />
                  <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full">
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <h2 className="text-xl font-bold mb-1">{profileData.name}</h2>

              <div className="flex items-center mb-3">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-sm">
                  {profileData.rating} ({profileData.reviews} reseñas)
                </span>
              </div>

              {profileData.superhost && <Badge className="mb-3">Superanfitrión</Badge>}

              <div className="text-sm text-gray-500 mb-2">
                <Calendar className="h-4 w-4 inline mr-1" />
                Miembro desde {formatDate(profileData.joinDate)}
              </div>

              <div className="text-sm text-gray-500">
                <MapPin className="h-4 w-4 inline mr-1" />
                {profileData.address}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Verificaciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Identidad</span>
                </div>
                <Badge variant={profileData.identityVerified ? "default" : "outline"}>
                  {profileData.identityVerified ? "Verificado" : "Pendiente"}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Correo electrónico</span>
                </div>
                <Badge variant={profileData.emailVerified ? "default" : "outline"}>
                  {profileData.emailVerified ? "Verificado" : "Pendiente"}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Teléfono</span>
                </div>
                <Badge variant={profileData.phoneVerified ? "default" : "outline"}>
                  {profileData.phoneVerified ? "Verificado" : "Pendiente"}
                </Badge>
              </div>

              {!profileData.identityVerified && (
                <Button variant="outline" className="w-full mt-2">
                  Completar verificaciones
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="perfil">Información personal</TabsTrigger>
              <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
              <TabsTrigger value="resenas">Reseñas</TabsTrigger>
            </TabsList>

            <TabsContent value="perfil" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información personal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nombre completo</Label>
                          <Input id="name" name="name" value={profileData.name} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Correo electrónico</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={profileData.email}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Teléfono</Label>
                          <Input id="phone" name="phone" value={profileData.phone} onChange={handleChange} />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address">Ubicación</Label>
                          <Input id="address" name="address" value={profileData.address} onChange={handleChange} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Biografía</Label>
                        <Textarea id="bio" name="bio" value={profileData.bio} onChange={handleChange} rows={4} />
                      </div>

                      <div className="space-y-2">
                        <Label>Idiomas</Label>
                        <div className="flex flex-wrap gap-2">
                          {profileData.languages.map((language, index) => (
                            <Badge key={index} variant="outline" className="px-3 py-1">
                              {language}
                            </Badge>
                          ))}
                          <Button variant="outline" size="sm" className="h-8">
                            + Añadir idioma
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Nombre completo</h3>
                            <p>{profileData.name}</p>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Correo electrónico</h3>
                            <p>{profileData.email}</p>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Teléfono</h3>
                            <p>{profileData.phone}</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Ubicación</h3>
                            <p>{profileData.address}</p>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Idiomas</h3>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {profileData.languages.map((language, index) => (
                                <Badge key={index} variant="outline">
                                  {language}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Propiedades</h3>
                            <p>{profileData.properties} propiedades</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Biografía</h3>
                        <p className="text-gray-700">{profileData.bio}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="estadisticas" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Tasa de respuesta</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{profileData.responseRate}%</p>
                    <p className="text-sm text-gray-500">Tiempo promedio: {profileData.responseTime}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Calificación</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <p className="text-2xl font-bold mr-1">{profileData.rating}</p>
                      <Star className="h-5 w-5 text-yellow-500" />
                    </div>
                    <p className="text-sm text-gray-500">{profileData.reviews} reseñas</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Propiedades</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{profileData.properties}</p>
                    <p className="text-sm text-gray-500">Activas</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Rendimiento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Tasa de ocupación</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Tasa de cancelación</span>
                      <span className="font-medium">3%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: "3%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Reservas completadas</span>
                      <span className="font-medium">95%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "95%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resenas" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Reseñas de huéspedes</CardTitle>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 mr-1" />
                    <span className="font-bold">{profileData.rating}</span>
                    <span className="text-gray-500 ml-1">({profileData.reviews})</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border-b pb-4">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Juan Diego</p>
                            <p className="text-sm text-gray-500">Marzo 2023</p>
                          </div>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${star <= 5 ? "text-yellow-500" : "text-gray-300"}`}
                              fill={star <= 5 ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">
                        Ana es una anfitriona excepcional. El apartamento estaba impecable y la comunicación fue
                        excelente. Siempre estuvo disponible para resolver nuestras dudas. ¡Definitivamente volveríamos
                        a hospedarnos en sus propiedades!
                      </p>
                    </div>

                    <div className="border-b pb-4">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarFallback>MC</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">María Camila</p>
                            <p className="text-sm text-gray-500">Febrero 2023</p>
                          </div>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${star <= 5 ? "text-yellow-500" : "text-gray-300"}`}
                              fill={star <= 5 ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">
                        La casa era exactamente como en las fotos, muy limpia y con una ubicación perfecta. Ana nos dio
                        excelentes recomendaciones sobre restaurantes y actividades en la zona. Recomiendo 100%
                        hospedarse con ella.
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarFallback>RL</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Roberto López</p>
                            <p className="text-sm text-gray-500">Enero 2023</p>
                          </div>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${star <= 4 ? "text-yellow-500" : "text-gray-300"}`}
                              fill={star <= 4 ? "currentColor" : "none"}
                            />
                          ))}
                          <Star className="h-4 w-4 text-gray-300" />
                        </div>
                      </div>
                      <p className="text-gray-700">
                        Buena experiencia en general. El apartamento es cómodo y bien ubicado. Tuvimos un pequeño
                        inconveniente con el agua caliente, pero Ana lo solucionó rápidamente. La comunicación fue muy
                        buena.
                      </p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-6">
                    Ver todas las reseñas
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
