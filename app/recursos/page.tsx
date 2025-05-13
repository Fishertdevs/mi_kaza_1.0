"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Version2Modal } from "@/components/version2-modal"
import { FileText, Book, Video, Download, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function RecursosPage() {
  const [showVersion2Modal, setShowVersion2Modal] = useState(false)
  const [featureInDevelopment, setFeatureInDevelopment] = useState("")

  const handleVerMas = (recurso: string) => {
    setFeatureInDevelopment(`acceso a ${recurso}`)
    setShowVersion2Modal(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="bg-[#e6f4f9] py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Recursos</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
              Encuentra guías, tutoriales y documentación para aprovechar al máximo Mi Kaza
            </p>
          </div>
        </div>

        <div className="container mx-auto py-12 px-4">
          <Tabs defaultValue="guias" className="w-full">
            <div className="flex justify-center mb-8 overflow-x-auto">
              <TabsList>
                <TabsTrigger value="guias" className="flex items-center">
                  <Book className="mr-2 h-4 w-4" />
                  Guías
                </TabsTrigger>
                <TabsTrigger value="tutoriales" className="flex items-center">
                  <Video className="mr-2 h-4 w-4" />
                  Tutoriales
                </TabsTrigger>
                <TabsTrigger value="documentos" className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Documentos
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="guias">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Guía para huéspedes",
                    description: "Aprende a buscar, reservar y disfrutar de tu estancia en Mi Kaza.",
                    link: "/nosotros",
                  },
                  {
                    title: "Guía para anfitriones",
                    description: "Todo lo que necesitas saber para publicar y gestionar tu propiedad.",
                    link: "/nosotros",
                  },
                  {
                    title: "Guía de seguridad",
                    description: "Consejos para mantener tu cuenta y tus datos seguros.",
                    link: "#",
                    inDevelopment: true,
                  },
                  {
                    title: "Guía de pagos",
                    description: "Información sobre métodos de pago, reembolsos y facturación.",
                    link: "#",
                    inDevelopment: true,
                  },
                  {
                    title: "Guía de verificación",
                    description: "Cómo verificar tu cuenta y subir tus documentos.",
                    link: "#",
                    inDevelopment: true,
                  },
                  {
                    title: "Guía de resolución de problemas",
                    description: "Soluciones a problemas comunes en la plataforma.",
                    link: "#",
                    inDevelopment: true,
                  },
                ].map((guia, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="mb-4 flex justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#e6f4f9] flex items-center justify-center">
                          <Book className="h-6 w-6 text-[#5f9bbd]" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-center">{guia.title}</h3>
                      <p className="text-gray-600 mb-4 text-center flex-grow">{guia.description}</p>
                      {guia.inDevelopment ? (
                        <Button
                          onClick={() => handleVerMas(guia.title.toLowerCase())}
                          variant="outline"
                          className="w-full"
                        >
                          Ver guía
                        </Button>
                      ) : (
                        <Button asChild variant="outline" className="w-full">
                          <Link href={guia.link}>Ver guía</Link>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tutoriales">
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-4">Tutoriales en video</h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Estamos preparando una serie de tutoriales en video para ayudarte a utilizar todas las funciones de Mi
                  Kaza. Pronto estarán disponibles.
                </p>
                <Button
                  onClick={() => {
                    setFeatureInDevelopment("tutoriales en video")
                    setShowVersion2Modal(true)
                  }}
                  className="bg-[#87CEEB] hover:bg-[#5f9bbd]"
                >
                  <Video className="mr-2 h-4 w-4" />
                  Ver tutoriales
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="documentos">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-xl font-semibold mb-6 text-center">Documentos disponibles</h3>

                <div className="space-y-4">
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-[#e6f4f9] flex items-center justify-center mr-4">
                          <FileText className="h-5 w-5 text-[#5f9bbd]" />
                        </div>
                        <div>
                          <h4 className="font-medium">Manual de Usuario</h4>
                          <p className="text-sm text-gray-500">PDF - 2.5 MB</p>
                        </div>
                      </div>
                      <Button asChild variant="ghost" size="sm">
                        <Link href="/manual-usuario.pdf" download>
                          <Download className="h-4 w-4 mr-2" />
                          Descargar
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  {[
                    "Términos y Condiciones",
                    "Política de Privacidad",
                    "Política de Cancelación",
                    "Guía de Verificación de Identidad",
                    "Manual para Anfitriones",
                  ].map((doc, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-[#e6f4f9] flex items-center justify-center mr-4">
                            <FileText className="h-5 w-5 text-[#5f9bbd]" />
                          </div>
                          <div>
                            <h4 className="font-medium">{doc}</h4>
                            <p className="text-sm text-gray-500">PDF</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setFeatureInDevelopment(`descarga de ${doc}`)
                            setShowVersion2Modal(true)
                          }}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Descargar
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 bg-[#e6f4f9] rounded-lg p-8 text-center max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-2">¿Necesitas más recursos?</h3>
            <p className="text-gray-600 mb-4">
              Estamos constantemente añadiendo nuevos recursos para ayudarte a aprovechar al máximo Mi Kaza.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild variant="outline">
                <Link href="/nosotros">
                  <Book className="mr-2 h-4 w-4" />
                  Ver manual de usuario
                </Link>
              </Button>
              <Button asChild className="bg-[#87CEEB] hover:bg-[#5f9bbd]">
                <Link href="/contacto">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Contactar soporte
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <Version2Modal open={showVersion2Modal} onOpenChange={setShowVersion2Modal} feature={featureInDevelopment} />
    </div>
  )
}
