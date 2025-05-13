"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, MessageSquare, Star, Award, Heart, Calendar, MapPin, Info } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"

export default function ComunidadPage() {
  const [showVersion2Modal, setShowVersion2Modal] = useState(false)
  const [featureInDevelopment, setFeatureInDevelopment] = useState("")

  const handleVerMas = (feature: string) => {
    setFeatureInDevelopment(feature)
    setShowVersion2Modal(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="bg-[#e6f4f9] py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Comunidad Mi Kaza</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
              Conecta con otros usuarios, comparte experiencias y participa en eventos exclusivos
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => handleVerMas("registro en la comunidad")}
                className="bg-[#87CEEB] hover:bg-[#5f9bbd]"
              >
                <Users className="mr-2 h-4 w-4" />
                Unirse a la comunidad
              </Button>
              <div className="flex items-center text-[#5f9bbd] bg-[#d1ecf7] px-4 py-2 rounded-md">
                <Info className="mr-2 h-5 w-5" />
                <span>Esta función estará disponible en la versión 2.0 de Mi Kaza</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-12 px-4">
          <Tabs defaultValue="foro" className="w-full">
            <div className="flex justify-center mb-8 overflow-x-auto">
              <TabsList>
                <TabsTrigger value="foro" className="flex items-center">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Foro
                </TabsTrigger>
                <TabsTrigger value="experiencias" className="flex items-center">
                  <Star className="mr-2 h-4 w-4" />
                  Experiencias
                </TabsTrigger>
                <TabsTrigger value="eventos" className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Eventos
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="foro">
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold mb-4">Foro de la comunidad</h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Comparte tus experiencias, haz preguntas y conecta con otros usuarios de Mi Kaza. Nuestro foro es el
                  lugar perfecto para intercambiar consejos sobre viajes y alojamientos.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    onClick={() => handleVerMas("foro de la comunidad")}
                    className="bg-[#87CEEB] hover:bg-[#5f9bbd]"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Acceder al foro
                  </Button>
                  <div className="flex items-center text-[#5f9bbd] bg-[#d1ecf7] px-4 py-2 rounded-md">
                    <Info className="mr-2 h-5 w-5" />
                    <span>Esta función estará disponible en la versión 2.0 de Mi Kaza</span>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-xl font-semibold mb-6 text-center">Temas populares</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {[
                    {
                      title: "Mejores zonas para alojarse en Cartagena",
                      replies: 24,
                      views: 156,
                      lastActivity: "hace 2 horas",
                    },
                    {
                      title: "Consejos para anfitriones principiantes",
                      replies: 42,
                      views: 310,
                      lastActivity: "hace 5 horas",
                    },
                    {
                      title: "¿Cómo conseguir mejores calificaciones como huésped?",
                      replies: 18,
                      views: 97,
                      lastActivity: "hace 1 día",
                    },
                    {
                      title: "Recomendaciones de restaurantes en Medellín",
                      replies: 36,
                      views: 245,
                      lastActivity: "hace 2 días",
                    },
                  ].map((tema, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <h4
                          className="font-medium text-[#5f9bbd] mb-2 cursor-pointer hover:underline"
                          onClick={() => handleVerMas(`tema "${tema.title}"`)}
                        >
                          {tema.title}
                        </h4>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{tema.replies} respuestas</span>
                          <span>{tema.views} vistas</span>
                          <span>Actualizado {tema.lastActivity}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="experiencias">
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold mb-4">Experiencias compartidas</h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Descubre las experiencias de otros usuarios y comparte las tuyas. Desde aventuras emocionantes hasta
                  relajantes escapadas, encuentra inspiración para tu próximo viaje.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    onClick={() => handleVerMas("compartir experiencias")}
                    className="bg-[#87CEEB] hover:bg-[#5f9bbd]"
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Compartir mi experiencia
                  </Button>
                  <div className="flex items-center text-[#5f9bbd] bg-[#d1ecf7] px-4 py-2 rounded-md">
                    <Info className="mr-2 h-5 w-5" />
                    <span>Esta función estará disponible en la versión 2.0 de Mi Kaza</span>
                  </div>
                </div>
              </div>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Un fin de semana mágico en Villa de Leyva",
                    author: "Carlos Rodríguez",
                    image: "/images/villa-de-leyva.png",
                    likes: 42,
                    comments: 8,
                  },
                  {
                    title: "Mi experiencia como anfitrión en Cartagena",
                    author: "Ana Martínez",
                    image: "/images/cartagena.png",
                    likes: 36,
                    comments: 12,
                  },
                  {
                    title: "Descubriendo los secretos de Guatapé",
                    author: "Juan Pérez",
                    image: "/images/guatape.png",
                    likes: 28,
                    comments: 5,
                  },
                ].map((exp, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image src={exp.image || "/placeholder.svg"} alt={exp.title} fill className="object-cover" />
                    </div>
                    <CardContent className="p-4">
                      <h4
                        className="font-medium mb-2 cursor-pointer hover:text-[#5f9bbd]"
                        onClick={() => handleVerMas(`experiencia "${exp.title}"`)}
                      >
                        {exp.title}
                      </h4>
                      <p className="text-sm text-gray-500 mb-4">Por {exp.author}</p>
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center">
                          <Heart className="h-4 w-4 mr-1 text-red-500" />
                          {exp.likes} me gusta
                        </span>
                        <span className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1 text-[#5f9bbd]" />
                          {exp.comments} comentarios
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="eventos">
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold mb-4">Eventos de la comunidad</h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Participa en eventos exclusivos para miembros de la comunidad Mi Kaza. Desde encuentros virtuales
                  hasta actividades presenciales, hay algo para todos.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    onClick={() => handleVerMas("calendario de eventos")}
                    className="bg-[#87CEEB] hover:bg-[#5f9bbd]"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Ver calendario de eventos
                  </Button>
                  <div className="flex items-center text-[#5f9bbd] bg-[#d1ecf7] px-4 py-2 rounded-md">
                    <Info className="mr-2 h-5 w-5" />
                    <span>Esta función estará disponible en la versión 2.0 de Mi Kaza</span>
                  </div>
                </div>
              </div>

              <div className="mt-12 max-w-4xl mx-auto">
                <h3 className="text-xl font-semibold mb-6 text-center">Próximos eventos</h3>
                <div className="space-y-6">
                  {[
                    {
                      title: "Webinar: Cómo ser un anfitrión 5 estrellas",
                      date: "15 de junio, 2025",
                      time: "18:00 - 19:30",
                      type: "Virtual",
                      participants: 120,
                    },
                    {
                      title: "Encuentro de anfitriones en Bogotá",
                      date: "22 de junio, 2025",
                      time: "16:00 - 20:00",
                      type: "Presencial",
                      location: "Hotel W Bogotá",
                      participants: 45,
                    },
                    {
                      title: "Taller: Fotografía profesional para tu propiedad",
                      date: "5 de julio, 2025",
                      time: "10:00 - 12:00",
                      type: "Virtual",
                      participants: 85,
                    },
                  ].map((evento, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <h4 className="font-medium text-lg mb-2">{evento.title}</h4>
                            <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 gap-y-1 sm:gap-x-4">
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {evento.date}
                              </span>
                              <span>{evento.time}</span>
                              <span className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                {evento.participants} participantes
                              </span>
                            </div>
                            {evento.location && (
                              <p className="text-sm text-gray-600 mt-1">
                                <MapPin className="h-4 w-4 inline mr-1" />
                                {evento.location}
                              </p>
                            )}
                          </div>
                          <div className="mt-4 md:mt-0">
                            <Button
                              onClick={() => handleVerMas(`registro al evento "${evento.title}"`)}
                              variant="outline"
                              className="hover:bg-[#e6f4f9]"
                            >
                              Inscribirse
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 bg-[#e6f4f9] rounded-lg p-8 text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-[#5f9bbd]" />
            </div>
            <h3 className="text-xl font-bold mb-2">Programa de embajadores</h3>
            <p className="text-gray-600 mb-4">
              ¿Eres un usuario activo de Mi Kaza? Únete a nuestro programa de embajadores y obtén beneficios exclusivos
              mientras ayudas a crecer nuestra comunidad.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => handleVerMas("programa de embajadores")}
                className="bg-[#87CEEB] hover:bg-[#5f9bbd]"
              >
                Conocer más
              </Button>
              <div className="flex items-center text-[#5f9bbd] bg-[#d1ecf7] px-4 py-2 rounded-md">
                <Info className="mr-2 h-5 w-5" />
                <span>Esta función estará disponible en la versión 2.0 de Mi Kaza</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Modal de Función en Desarrollo */}
      <Dialog open={showVersion2Modal} onOpenChange={setShowVersion2Modal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-[#5f9bbd]">Función en Desarrollo</DialogTitle>
          </DialogHeader>
          <div className="py-6">
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-[#87CEEB]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <div className="text-gray-600 mb-4 text-center">
              {featureInDevelopment
                ? `La función "${featureInDevelopment}" estará disponible en la versión 2.0 de Mi Kaza.`
                : "Esta funcionalidad estará disponible en la versión 2.0 de Mi Kaza."}
            </div>
            <div className="text-gray-600 text-center">¡Gracias por tu paciencia!</div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
