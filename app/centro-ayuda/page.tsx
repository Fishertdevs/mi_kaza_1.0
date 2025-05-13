"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Download, FileText, HelpCircle, Mail, MessageSquare, Phone, Search } from "lucide-react"

export default function CentroAyudaPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isDownloading, setIsDownloading] = useState(false)
  const [activeTab, setActiveTab] = useState("guias")
  const [filteredFaqs, setFilteredFaqs] = useState(faqs)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (searchQuery.trim() === "") {
      setFilteredFaqs(faqs)
      return
    }

    const filtered = faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    setFilteredFaqs(filtered)
    setActiveTab("faqs")
  }

  const handleDownloadManual = async () => {
    try {
      setIsDownloading(true)
      const response = await fetch("/api/download-pdf")

      if (!response.ok) {
        throw new Error("Error al descargar el manual")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "Manual_Usuario_MiKaza_2025.pdf"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error descargando el manual:", error)
      alert("Hubo un error al descargar el manual. Por favor intenta de nuevo.")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Centro de Ayuda</h1>

      <div className="max-w-2xl mx-auto mb-10">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Buscar en el centro de ayuda..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit" className="bg-[#5f9bbd] hover:bg-[#4a7a96]">
            Buscar
          </Button>
        </form>
      </div>

      <Tabs defaultValue="guias" value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="guias" className="flex items-center gap-2">
            <BookOpen size={16} />
            <span>Guías y tutoriales</span>
          </TabsTrigger>
          <TabsTrigger value="faqs" className="flex items-center gap-2">
            <HelpCircle size={16} />
            <span>Preguntas frecuentes</span>
          </TabsTrigger>
          <TabsTrigger value="contacto" className="flex items-center gap-2">
            <MessageSquare size={16} />
            <span>Contacto directo</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="guias" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#5f9bbd]" />
                Manual de Usuario
              </CardTitle>
              <CardDescription>Guía completa para utilizar la plataforma Mi Kaza</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-[#e6f7ff] p-2 rounded-md">
                    <FileText className="h-6 w-6 text-[#5f9bbd]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Manual de Usuario Mi Kaza</h3>
                    <p className="text-sm text-gray-500">Versión 2.0 - 2025</p>
                  </div>
                </div>
                <Button
                  onClick={handleDownloadManual}
                  variant="outline"
                  className="flex items-center gap-2"
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-[#5f9bbd] border-t-transparent rounded-full" />
                      <span>Descargando...</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      <span>Descargar PDF</span>
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faqs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preguntas Frecuentes</CardTitle>
              <CardDescription>Respuestas a las dudas más comunes sobre Mi Kaza</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-8">
                  <HelpCircle className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium">No se encontraron resultados</h3>
                  <p className="text-gray-500 mt-1">No hay preguntas frecuentes que coincidan con tu búsqueda.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacto" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contacto Directo</CardTitle>
              <CardDescription>¿No encontraste lo que buscabas? Contáctanos directamente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-5 flex flex-col items-center text-center">
                  <div className="bg-[#e6f7ff] p-3 rounded-full mb-3">
                    <Mail className="h-6 w-6 text-[#5f9bbd]" />
                  </div>
                  <h3 className="font-medium mb-2">Correo Electrónico</h3>
                  <p className="text-gray-600 mb-4">Escríbenos y te responderemos en un plazo de 24 horas.</p>
                  <Link href="mailto:soporte@mikaza.com" className="text-[#5f9bbd] hover:underline font-medium">
                    soporte@mikaza.com
                  </Link>
                </div>

                <div className="border rounded-lg p-5 flex flex-col items-center text-center">
                  <div className="bg-[#e6f7ff] p-3 rounded-full mb-3">
                    <Phone className="h-6 w-6 text-[#5f9bbd]" />
                  </div>
                  <h3 className="font-medium mb-2">Teléfono</h3>
                  <p className="text-gray-600 mb-4">Disponible de lunes a viernes de 8:00 AM a 6:00 PM.</p>
                  <Link href="tel:+573001234567" className="text-[#5f9bbd] hover:underline font-medium">
                    +57 300 123 4567
                  </Link>
                </div>
              </div>

              <div className="border rounded-lg p-5">
                <h3 className="font-medium mb-4 text-center">Formulario de Contacto</h3>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Nombre completo
                      </label>
                      <Input id="name" placeholder="Tu nombre" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Correo electrónico
                      </label>
                      <Input id="email" type="email" placeholder="tu@email.com" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Asunto
                    </label>
                    <Input id="subject" placeholder="¿Sobre qué nos quieres contactar?" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Escribe tu mensaje aquí..."
                    ></textarea>
                  </div>

                  <Button className="w-full bg-[#5f9bbd] hover:bg-[#4a7a96]">Enviar mensaje</Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const faqs = [
  {
    question: "¿Cómo puedo registrarme en Mi Kaza?",
    answer:
      "Para registrarte en Mi Kaza, haz clic en el botón 'Registrarse' en la esquina superior derecha de la página principal. Luego, elige si quieres registrarte como huésped o anfitrión y completa el formulario con tus datos personales.",
  },
  {
    question: "¿Cómo puedo publicar mi propiedad?",
    answer:
      "Para publicar tu propiedad, primero debes registrarte como anfitrión. Una vez que hayas iniciado sesión, ve a tu panel de anfitrión y haz clic en 'Añadir nueva propiedad'. Completa todos los detalles requeridos, sube fotos de calidad y establece tu disponibilidad y precios.",
  },
  {
    question: "¿Cuáles son las formas de pago aceptadas?",
    answer:
      "Mi Kaza acepta múltiples formas de pago, incluyendo tarjetas de crédito y débito (Visa, MasterCard, American Express), PayPal, y transferencias bancarias en Colombia. Todos los pagos se procesan de manera segura a través de nuestra plataforma.",
  },
  {
    question: "¿Cómo funciona el proceso de reserva?",
    answer:
      "Para reservar una propiedad, selecciona las fechas de tu estancia, verifica la disponibilidad, y haz clic en 'Reservar'. Deberás realizar el pago para confirmar tu reserva. Una vez confirmada, recibirás los detalles de contacto del anfitrión y la dirección exacta de la propiedad.",
  },
  {
    question: "¿Cuál es la política de cancelación?",
    answer:
      "Las políticas de cancelación pueden variar según cada propiedad. En general, ofrecemos tres niveles: flexible (reembolso completo hasta 24 horas antes), moderada (reembolso del 50% hasta 5 días antes) y estricta (reembolso del 50% hasta 7 días antes). Siempre verifica la política específica de la propiedad antes de reservar.",
  },
  {
    question: "¿Cómo me comunico con el anfitrión?",
    answer:
      "Una vez que hayas realizado una reserva, podrás comunicarte directamente con el anfitrión a través de nuestro sistema de mensajería integrado. También tendrás acceso a su número de teléfono para comunicación directa en caso de emergencia.",
  },
  {
    question: "¿Qué hago si tengo un problema durante mi estancia?",
    answer:
      "Si tienes algún problema durante tu estancia, primero intenta resolverlo directamente con el anfitrión. Si no puedes resolver el problema, contáctanos a través de la sección 'Ayuda' en la aplicación o sitio web, o llama a nuestro número de atención al cliente disponible 24/7.",
  },
  {
    question: "¿Cómo funciona el sistema de verificación de identidad?",
    answer:
      "Para garantizar la seguridad de todos los usuarios, verificamos la identidad tanto de huéspedes como de anfitriones. Este proceso incluye la verificación de documentos de identidad, correo electrónico, número de teléfono y, en algunos casos, redes sociales.",
  },
]
