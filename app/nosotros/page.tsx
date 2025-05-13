"use client"

import { useState, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FileDown, BookOpen, School, Users, Home, Shield } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function NosotrosPage() {
  const [activeTab, setActiveTab] = useState("proyecto")
  const manualRef = useRef<HTMLDivElement>(null)

  const scrollToManual = () => {
    manualRef.current?.scrollIntoView({ behavior: "smooth" })
    setActiveTab("manual")
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="bg-[#e6f4f9] py-12">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Acerca de Mi Kaza
            </motion.h1>
            <motion.p
              className="text-lg text-gray-700 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Proyecto académico desarrollado para la asignatura de Práctica de Ingeniería 4 de la Universidad Central -
              Semestre 2025-1S
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button onClick={scrollToManual} className="bg-[#87CEEB] hover:bg-[#5f9bbd]">
                <BookOpen className="mr-2 h-4 w-4" />
                Ver Manual de Usuario
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto py-12 px-4">
          <Tabs defaultValue="proyecto" value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="proyecto">El Proyecto</TabsTrigger>
                <TabsTrigger value="manual" ref={manualRef}>
                  Manual de Usuario
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="proyecto">
              <motion.div variants={container} initial="hidden" animate="show">
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <motion.div variants={item} className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="md:w-1/3">
                        <div className="relative w-full h-64">
                          <Image src="/images/logo.png" alt="Logo Mi Kaza" fill className="object-contain" />
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <h2 className="text-2xl font-bold mb-4">Proyecto Académico</h2>
                        <p className="mb-4">
                          Mi Kaza es un proyecto desarrollado para la materia de Práctica de Ingeniería 4 de la
                          Universidad Central, durante el primer semestre de 2025.
                        </p>
                        <p className="mb-4">
                          El objetivo principal de este proyecto es crear una plataforma de alquiler de inmuebles entre
                          personas (modelo tipo Airbnb), enfocada en el mercado colombiano, cumpliendo todos los
                          requisitos legales y técnicos.
                        </p>
                        <div className="flex items-center space-x-2 text-[#5f9bbd]">
                          <School className="h-5 w-5" />
                          <span className="font-medium">Universidad Central - 2025-1S</span>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={item} className="border-t pt-6">
                      <h3 className="text-xl font-semibold mb-4">Características principales</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="bg-[#e6f4f9] p-1 rounded-full mr-3 mt-1">
                            <svg
                              className="h-4 w-4 text-[#5f9bbd]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span>Registro y autenticación de usuarios (huéspedes, anfitriones y administradores)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-[#e6f4f9] p-1 rounded-full mr-3 mt-1">
                            <svg
                              className="h-4 w-4 text-[#5f9bbd]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span>Publicación y búsqueda de inmuebles con filtros avanzados</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-[#e6f4f9] p-1 rounded-full mr-3 mt-1">
                            <svg
                              className="h-4 w-4 text-[#5f9bbd]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span>Sistema de reservas y pagos en línea</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-[#e6f4f9] p-1 rounded-full mr-3 mt-1">
                            <svg
                              className="h-4 w-4 text-[#5f9bbd]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span>Chat en tiempo real entre huéspedes y anfitriones</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-[#e6f4f9] p-1 rounded-full mr-3 mt-1">
                            <svg
                              className="h-4 w-4 text-[#5f9bbd]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span>Verificación de antecedentes judiciales para mayor seguridad</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-[#e6f4f9] p-1 rounded-full mr-3 mt-1">
                            <svg
                              className="h-4 w-4 text-[#5f9bbd]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span>Panel de administración para gestión de usuarios y contenido</span>
                        </li>
                      </ul>
                    </motion.div>

                    <motion.div variants={item} className="border-t pt-6">
                      <h3 className="text-xl font-semibold mb-4">Equipo de desarrollo</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <Users className="h-8 w-8 mx-auto mb-2 text-[#5f9bbd]" />
                          <span className="text-sm font-medium">Estudiantes de Ingeniería</span>
                          <p className="text-xs text-gray-500">Universidad Central</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <School className="h-8 w-8 mx-auto mb-2 text-[#5f9bbd]" />
                          <span className="text-sm font-medium">Docentes</span>
                          <p className="text-xs text-gray-500">Facultad de Ingeniería</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <BookOpen className="h-8 w-8 mx-auto mb-2 text-[#5f9bbd]" />
                          <span className="text-sm font-medium">Asignatura</span>
                          <p className="text-xs text-gray-500">Práctica de Ingeniería 4</p>
                        </div>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="manual">
              <motion.div variants={container} initial="hidden" animate="show">
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <motion.div variants={item} className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold">Manual de Usuario</h2>
                      <Button
                        onClick={() => {
                          const link = document.createElement("a")
                          link.href = "/manual-usuario.pdf"
                          link.download = "Manual_Usuario_MiKaza.pdf"
                          document.body.appendChild(link)
                          link.click()
                          document.body.removeChild(link)
                        }}
                        className="bg-[#87CEEB] hover:bg-[#5f9bbd]"
                      >
                        <FileDown className="mr-2 h-4 w-4" />
                        Descargar PDF
                      </Button>
                    </motion.div>

                    <motion.div variants={item}>
                      <Tabs defaultValue="huespedes" className="w-full">
                        <TabsList className="w-full justify-start mb-6 overflow-x-auto flex-nowrap">
                          <TabsTrigger value="huespedes" className="flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            Para Huéspedes
                          </TabsTrigger>
                          <TabsTrigger value="anfitriones" className="flex items-center">
                            <Home className="h-4 w-4 mr-2" />
                            Para Anfitriones
                          </TabsTrigger>
                          <TabsTrigger value="administradores" className="flex items-center">
                            <Shield className="h-4 w-4 mr-2" />
                            Para Administradores
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="huespedes">
                          <div className="space-y-6">
                            <div className="bg-[#e6f4f9] p-4 rounded-lg mb-6">
                              <p className="text-sm">
                                Esta sección del manual está dirigida a los usuarios que desean encontrar y reservar
                                alojamientos en la plataforma Mi Kaza. Aquí encontrarás toda la información necesaria
                                para registrarte, buscar propiedades, realizar reservas y gestionar tu cuenta.
                              </p>
                            </div>

                            <Accordion type="single" collapsible className="w-full">
                              <AccordionItem value="item-1">
                                <AccordionTrigger className="text-lg font-medium">
                                  Registro e inicio de sesión
                                </AccordionTrigger>
                                <AccordionContent className="space-y-4">
                                  <h4 className="font-medium">Cómo registrarse como huésped</h4>
                                  <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                                    <li>Haz clic en "Registrarse" en la página principal.</li>
                                    <li>Selecciona la opción "Huésped".</li>
                                    <li>
                                      Completa el formulario con tus datos personales (nombre, correo electrónico, tipo
                                      y número de documento, dirección).
                                    </li>
                                    <li>Crea una contraseña segura.</li>
                                    <li>Sube tus antecedentes judiciales para verificación (formato PDF o imagen).</li>
                                    <li>Acepta los términos y condiciones y la política de tratamiento de datos.</li>
                                    <li>Haz clic en "Registrarse".</li>
                                  </ol>

                                  <div className="mt-4">
                                    <h4 className="font-medium">Inicio de sesión</h4>
                                    <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                                      <li>Haz clic en "Iniciar sesión" en la página principal.</li>
                                      <li>Selecciona la pestaña "Huésped".</li>
                                      <li>Ingresa tu correo electrónico y contraseña.</li>
                                      <li>Haz clic en "Iniciar sesión".</li>
                                    </ol>
                                  </div>

                                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-4">
                                    <p className="text-sm text-yellow-800">
                                      <strong>Nota:</strong> Tu cuenta estará pendiente de aprobación hasta que un
                                      administrador verifique tus antecedentes judiciales. Recibirás un correo
                                      electrónico cuando tu cuenta sea aprobada.
                                    </p>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>

                              <AccordionItem value="item-2">
                                <AccordionTrigger className="text-lg font-medium">
                                  Búsqueda de propiedades
                                </AccordionTrigger>
                                <AccordionContent className="space-y-4">
                                  <h4 className="font-medium">Cómo buscar alojamientos</h4>
                                  <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                                    <li>
                                      Utiliza el buscador en la página principal o haz clic en "Explorar" en el menú de
                                      navegación.
                                    </li>
                                    <li>Ingresa tu destino, fechas de llegada y salida, y número de huéspedes.</li>
                                    <li>Haz clic en "Buscar".</li>
                                    <li>
                                      Utiliza los filtros disponibles para refinar tu búsqueda (precio, servicios, tipo
                                      de propiedad, etc.).
                                    </li>
                                    <li>Explora los resultados y haz clic en una propiedad para ver más detalles.</li>
                                  </ol>

                                  <div className="mt-4">
                                    <h4 className="font-medium">Filtros de búsqueda</h4>
                                    <p className="text-gray-700 mb-2">Puedes filtrar las propiedades por:</p>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                      <li>Rango de precios</li>
                                      <li>Ubicación (ciudad, barrio)</li>
                                      <li>Servicios (WiFi, piscina, cocina, etc.)</li>
                                      <li>Capacidad (número de huéspedes)</li>
                                      <li>Tipo de propiedad (apartamento, casa, cabaña, etc.)</li>
                                      <li>Calificación</li>
                                    </ul>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>

                              <AccordionItem value="item-3">
                                <AccordionTrigger className="text-lg font-medium">Reservas y pagos</AccordionTrigger>
                                <AccordionContent className="space-y-4">
                                  <h4 className="font-medium">Cómo realizar una reserva</h4>
                                  <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                                    <li>Selecciona la propiedad que deseas reservar.</li>
                                    <li>Verifica la disponibilidad para tus fechas de viaje.</li>
                                    <li>Haz clic en "Reservar".</li>
                                    <li>
                                      Revisa los detalles de la reserva (fechas, número de huéspedes, precio total).
                                    </li>
                                    <li>Completa la información de pago.</li>
                                    <li>Haz clic en "Confirmar reserva".</li>
                                  </ol>

                                  <div className="mt-4">
                                    <h4 className="font-medium">Métodos de pago aceptados</h4>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                      <li>Tarjetas de crédito (Visa, Mastercard, American Express)</li>
                                      <li>Tarjetas de débito</li>
                                      <li>PSE (Pagos Seguros en Línea)</li>
                                      <li>Transferencia bancaria (para reservas a largo plazo)</li>
                                    </ul>
                                  </div>

                                  <div className="mt-4">
                                    <h4 className="font-medium">Políticas de cancelación</h4>
                                    <p className="text-gray-700 mb-2">
                                      Las políticas de cancelación varían según la propiedad:
                                    </p>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                      <li>
                                        <strong>Flexible:</strong> Reembolso completo si cancelas hasta 24 horas antes
                                        del check-in.
                                      </li>
                                      <li>
                                        <strong>Moderada:</strong> Reembolso del 50% si cancelas hasta 5 días antes del
                                        check-in.
                                      </li>
                                      <li>
                                        <strong>Estricta:</strong> Reembolso del 50% si cancelas hasta 7 días antes del
                                        check-in.
                                      </li>
                                    </ul>
                                    <p className="text-gray-700 mt-2">
                                      Revisa siempre la política de cancelación específica de cada propiedad antes de
                                      reservar.
                                    </p>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>

                              <AccordionItem value="item-4">
                                <AccordionTrigger className="text-lg font-medium">Gestión de reservas</AccordionTrigger>
                                <AccordionContent className="space-y-4">
                                  <h4 className="font-medium">Cómo ver y gestionar tus reservas</h4>
                                  <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                                    <li>Inicia sesión en tu cuenta.</li>
                                    <li>
                                      Haz clic en "Mis reservas" en el menú de navegación o en tu panel de huésped.
                                    </li>
                                    <li>Verás una lista de todas tus reservas (actuales, pasadas y canceladas).</li>
                                    <li>Haz clic en una reserva para ver sus detalles.</li>
                                  </ol>

                                  <div className="mt-4">
                                    <h4 className="font-medium">Cómo cancelar una reserva</h4>
                                    <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                                      <li>Ve a "Mis reservas".</li>
                                      <li>Selecciona la reserva que deseas cancelar.</li>
                                      <li>Haz clic en "Cancelar reserva".</li>
                                      <li>Confirma la cancelación.</li>
                                      <li>
                                        El reembolso se procesará según la política de cancelación de la propiedad.
                                      </li>
                                    </ol>
                                  </div>

                                  <div className="mt-4">
                                    <h4 className="font-medium">Cómo modificar una reserva</h4>
                                    <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                                      <li>Ve a "Mis reservas".</li>
                                      <li>Selecciona la reserva que deseas modificar.</li>
                                      <li>Haz clic en "Modificar reserva".</li>
                                      <li>Realiza los cambios necesarios (fechas, número de huéspedes).</li>
                                      <li>Confirma los cambios.</li>
                                      <li>
                                        Si hay diferencia en el precio, se te cobrará o reembolsará según corresponda.
                                      </li>
                                    </ol>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>

                              <AccordionItem value="item-5">
                                <AccordionTrigger className="text-lg font-medium">
                                  Comunicación con anfitriones
                                </AccordionTrigger>
                                <AccordionContent className="space-y-4">
                                  <h4 className="font-medium">Cómo contactar a un anfitrión</h4>
                                  <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                                    <li>Desde la página de la propiedad, haz clic en "Contactar anfitrión".</li>
                                    <li>Escribe tu mensaje con tus preguntas o inquietudes.</li>
                                    <li>Haz clic en "Enviar".</li>
                                    <li>
                                      También puedes contactar al anfitrión después de realizar una reserva desde la
                                      sección "Mis mensajes".
                                    </li>
                                  </ol>

                                  <div className="mt-4">
                                    <h4 className="font-medium">Chat en tiempo real</h4>
                                    <p className="text-gray-700 mb-2">
                                      Una vez confirmada tu reserva, tendrás acceso al chat en tiempo real con el
                                      anfitrión:
                                    </p>
                                    <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                                      <li>Ve a "Mis mensajes" en tu panel de huésped.</li>
                                      <li>Selecciona la conversación con el anfitrión.</li>
                                      <li>Escribe tu mensaje y haz clic en "Enviar".</li>
                                      <li>Recibirás notificaciones cuando el anfitrión responda.</li>
                                    </ol>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </div>
                        </TabsContent>

                        <TabsContent value="anfitriones">
                          <div className="space-y-6">
                            <div className="bg-[#e6f4f9] p-4 rounded-lg mb-6">
                              <p className="text-sm">
                                Esta sección del manual está dirigida a los usuarios que desean publicar y alquilar sus
                                propiedades en la plataforma Mi Kaza. Aquí encontrarás toda la información necesaria
                                para registrarte como anfitrión, publicar propiedades, gestionar reservas y recibir
                                pagos.
                              </p>
                            </div>

                            <Accordion type="single" collapsible className="w-full">
                              <AccordionItem value="item-1">
                                <AccordionTrigger className="text-lg font-medium">
                                  Registro como anfitrión
                                </AccordionTrigger>
                                <AccordionContent className="space-y-4">
                                  <h4 className="font-medium">Cómo registrarse como anfitrión</h4>
                                  <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                                    <li>Haz clic en "Registrarse" en la página principal.</li>
                                    <li>Selecciona la opción "Anfitrión".</li>
                                    <li>
                                      Completa el formulario con tus datos personales (nombre, correo electrónico,
                                      etc.).
                                    </li>
                                    <li>Crea una contraseña segura.</li>
                                    <li>Acepta los términos y condiciones y la política de tratamiento de datos.</li>
                                    <li>Haz clic en "Registrarse".</li>
                                  </ol>

                                  <div className="mt-4">
                                    <h4 className="font-medium">Verificación de identidad</h4>
                                    <p className="text-gray-700 mb-2">
                                      Para mayor seguridad, deberás verificar tu identidad:
                                    </p>
                                    <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                                      <li>Sube una copia de tu documento de identidad.</li>
                                      <li>Proporciona un número de teléfono para verificación.</li>
                                      <li>Completa la información de tu cuenta bancaria para recibir pagos.</li>
                                    </ol>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>

                              <AccordionItem value="item-2">
                                <AccordionTrigger className="text-lg font-medium">
                                  Publicación de propiedades
                                </AccordionTrigger>
                                <AccordionContent className="space-y-4">
                                  <h4 className="font-medium">Cómo publicar una propiedad</h4>
                                  <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                                    <li>Inicia sesión en tu cuenta de anfitrión.</li>
                                    <li>Haz clic en "Publicar inmueble" en tu panel de anfitrión.</li>
                                    <li>
                                      Completa la información básica de la propiedad (tipo, ubicación, capacidad).
                                    </li>
                                    <li>Añade una descripción detallada de la propiedad.</li>
                                    <li>Sube fotos de alta calidad (mínimo 5 fotos).</li>
                                    <li>Especifica los servicios disponibles (WiFi, cocina, piscina, etc.).</li>
                                    <li>
                                      Establece el precio por noche y políticas adicionales (limpieza, depósito de
                                      seguridad).
                                    </li>
                                    <li>Configura tu calendario de disponibilidad.</li>
                                    <li>Establece las políticas de cancelación.</li>
                                    <li>Haz clic en "Publicar".</li>
                                  </ol>

                                  <div className="mt-4">
                                    <h4 className="font-medium">Consejos para una publicación exitosa</h4>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                      <li>Usa fotos de alta calidad y bien iluminadas.</li>
                                      <li>Escribe una descripción detallada y honesta.</li>
                                      <li>Destaca las características únicas de tu propiedad.</li>
                                      <li>Menciona puntos de interés cercanos.</li>
                                      <li>
                                        Establece un precio competitivo basado en propiedades similares en la zona.
                                      </li>
                                      <li>Mantén actualizado tu calendario de disponibilidad.</li>
                                    </ul>
                                  </div>

                                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-4">
                                    <p className="text-sm text-yellow-800">
                                      <strong>Nota:</strong> Tu propiedad será revisada por un administrador antes de
                                      ser publicada. Recibirás un correo electrónico cuando tu propiedad sea aprobada.
                                    </p>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>

                              <AccordionItem value="item-3">
                                <AccordionTrigger className="text-lg font-medium">Gestión de reservas</AccordionTrigger>
                                <AccordionContent className="space-y-4">
                                  <h4 className="font-medium">Cómo gestionar las reservas</h4>
                                  <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                                    <li>Inicia sesión en tu cuenta de anfitrión.</li>
                                    <li>Haz clic en "Reservas" en tu panel de anfitrión.</li>
                                    <li>
                                      Verás una lista de todas las reservas (pendientes, confirmadas, completadas,
                                      canceladas).
                                    </li>
                                    <li>Haz clic en una reserva para ver sus detalles.</li>
                                  </ol>

                                  <div className="mt-4">
                                    <h4 className="font-medium">Cómo aceptar o rechazar una reserva</h4>
                                    <p className="text-gray-700 mb-2">
                                      Si has configurado tu propiedad con "Reserva instantánea", las reservas se
                                      confirmarán automáticamente. Si no, deberás aceptarlas manualmente:
                                    </p>
                                    <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                                      <li>Ve a "Reservas" y selecciona la reserva pendiente.</li>
                                      <li>
                                        Revisa los detalles de la reserva y verifica los antecedentes del huésped.
                                      </li>
                                      <li>Haz clic en "Aceptar" o "Rechazar".</li>
                                      <li>Si rechazas una reserva, deberás proporcionar un motivo.</li>
                                    </ol>
                                  </div>

                                  <div className="mt-4">
                                    <h4 className="font-medium">Cómo cancelar una reserva</h4>
                                    <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                                      <li>Ve a "Reservas" y selecciona la reserva que deseas cancelar.</li>
                                      <li>Haz clic en "Cancelar reserva".</li>
                                      <li>Proporciona un motivo para la cancelación.</li>
                                      <li>Confirma la cancelación.</li>
                                    </ol>
                                    <p className="text-gray-700 mt-2">
                                      <strong>Importante:</strong> Las cancelaciones frecuentes pueden afectar
                                      negativamente tu calificación como anfitrión.
                                    </p>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>

                              <AccordionItem value="item-4">
                                <AccordionTrigger className="text-lg font-medium">Pagos y comisiones</AccordionTrigger>
                                <AccordionContent className="space-y-4">
                                  <h4 className="font-medium">Cómo funcionan los pagos</h4>
                                  <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                                    <li>
                                      Cuando un huésped realiza una reserva, el pago se procesa a través de Mi Kaza.
                                    </li>
                                    <li>El pago se retiene hasta 24 horas después del check-in del huésped.</li>
                                    <li>
                                      Una vez transcurrido este período, el pago se transfiere a tu cuenta bancaria
                                      registrada.
                                    </li>
                                    <li>
                                      El tiempo de acreditación depende de tu banco, pero generalmente toma entre 1 y 3
                                      días hábiles.
                                    </li>
                                  </ol>

                                  <div className="mt-4">
                                    <h4 className="font-medium">Comisiones</h4>
                                    <p className="text-gray-700 mb-2">
                                      Mi Kaza cobra una comisión del 3% a los anfitriones por cada reserva completada.
                                      Esta comisión se descuenta automáticamente del pago que recibes.
                                    </p>
                                    <p className="text-gray-700">Ejemplo:</p>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                      <li>Precio por noche: $200,000 COP</li>
                                      <li>Duración de la estancia: 3 noches</li>
                                      <li>Total de la reserva: $600,000 COP</li>
                                      <li>Comisión de Mi Kaza (3%): $18,000 COP</li>
                                      <li>Monto a recibir: $582,000 COP</li>
                                    </ul>
                                  </div>

                                  <div className="mt-4">
                                    <h4 className="font-medium">Facturación</h4>
                                    <p className="text-gray-700 mb-2">
                                      Recibirás un resumen mensual de tus ingresos y comisiones. Para solicitar una
                                      factura:
                                    </p>
                                    <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                                      <li>Ve a "Finanzas" en tu panel de anfitrión.</li>
                                      <li>Selecciona el período para el que necesitas la factura.</li>
                                      <li>Haz clic en "Solicitar factura".</li>
                                      <li>Recibirás la factura en tu correo electrónico.</li>
                                    </ol>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>

                              <AccordionItem value="item-5">
                                <AccordionTrigger className="text-lg font-medium">
                                  Comunicación con huéspedes
                                </AccordionTrigger>
                                <AccordionContent className="space-y-4">
                                  <h4 className="font-medium">Cómo comunicarte con los huéspedes</h4>
                                  <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                                    <li>Ve a "Mensajes" en tu panel de anfitrión.</li>
                                    <li>Selecciona la conversación con el huésped.</li>
                                    <li>Escribe tu mensaje y haz clic en "Enviar".</li>
                                    <li>Recibirás notificaciones cuando el huésped responda.</li>
                                  </ol>

                                  <div className="mt-4">
                                    <h4 className="font-medium">Consejos para una comunicación efectiva</h4>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                      <li>
                                        Responde a los mensajes lo antes posible (idealmente en menos de 24 horas).
                                      </li>
                                      <li>Sé claro y conciso en tus respuestas.</li>
                                      <li>Proporciona instrucciones detalladas para el check-in y check-out.</li>
                                      <li>Comparte recomendaciones locales (restaurantes, atracciones, transporte).</li>
                                      <li>Mantén un tono amable y profesional en todas tus comunicaciones.</li>
                                    </ul>
                                  </div>

                                  <div className="mt-4">
                                    <h4 className="font-medium">Mensajes automáticos</h4>
                                    <p className="text-gray-700 mb-2">
                                      Puedes configurar mensajes automáticos para diferentes momentos:
                                    </p>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                      <li>Confirmación de reserva</li>
                                      <li>Recordatorio de check-in (1-2 días antes)</li>
                                      <li>Instrucciones de check-in (el día de llegada)</li>
                                      <li>Recordatorio de check-out</li>
                                      <li>Agradecimiento después de la estancia</li>
                                    </ul>
                                    <p className="text-gray-700 mt-2">
                                      Para configurar estos mensajes, ve a "Configuración" {">"} "Mensajes automáticos"
                                      en tu panel de anfitrión.
                                    </p>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </div>
                        </TabsContent>

                        <TabsContent value="administradores">
                          <div className="space-y-6">
                            <div className="bg-[#e6f4f9] p-4 rounded-lg mb-6">
                              <p className="text-sm">
                                Esta sección del manual está dirigida a los administradores de la plataforma Mi Kaza.
                                Aquí encontrarás toda la información necesaria para gestionar usuarios, propiedades,
                                verificaciones y el funcionamiento general de la plataforma.
                              </p>
                            </div>

                            <Accordion type="single" collapsible className="w-full">
                              <AccordionItem value="item-1">
                                <AccordionTrigger className="text-lg font-medium">
                                  Acceso al panel de administración
                                </AccordionTrigger>
                                <AccordionContent className="space-y-4">
                                  <h4 className="font-medium">Cómo acceder al panel de administración</h4>
                                  <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                                    <li>Inicia sesión con tus credenciales de administrador.</li>
                                    <li>Selecciona la pestaña "Administrador" en la pantalla de inicio de sesión.</li>
                                    <li>Ingresa tu correo electrónico, contraseña y código de administrador.</li>
                                    <li>Haz clic en "Iniciar sesión".</li>
                                    <li>Serás redirigido automáticamente al panel de administración.</li>
                                  </ol>

                                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-4">
                                    <p className="text-sm text-yellow-800">
                                      <strong>Nota:</strong> El código de administrador es proporcionado por el
                                      administrador principal y debe mantenerse en estricta confidencialidad.
                                    </p>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>

                              <AccordionItem value="item-2">
                                <AccordionTrigger className="text-lg font-medium">Gestión de usuarios</AccordionTrigger>
                                <AccordionContent className="space-y-4">
                                  <h4 className="font-medium">Verificación de usuarios</h4>
                                  <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                                    <li>Ve a "Verificaciones" en el panel de administración.</li>
                                    <li>Verás una lista de usuarios pendientes de verificación.</li>
                                    <li>Haz clic en un usuario para ver sus detalles y documentos.</li>
                                    <li>
                                      Revisa cuidadosamente los antecedentes judiciales y la documentación
                                      proporcionada.
                                    </li>
                                    <li>Haz clic en "Aprobar" o "Rechazar" según corresponda.</li>
                                    <li>
                                      Si rechazas a un usuario, debes proporcionar un motivo que se enviará por correo
                                      electrónico.
                                    </li>
                                  </ol>

                                  <div className="mt-4">
                                    <h4 className="font-medium">Gestión de usuarios existentes</h4>
                                    <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                                      <li>Ve a "Usuarios" en el panel de administración.</li>
                                      <li>
                                        Utiliza los filtros para buscar usuarios específicos (por tipo, estado, fecha de
                                        registro, etc.).
                                      </li>
                                      <li>Haz clic en un usuario para ver su perfil completo.</li>
                                      <li>
                                        Puedes editar la información del usuario, suspender o reactivar su cuenta, o
                                        eliminarla en casos extremos.
                                      </li>
                                    </ol>
                                  </div>

                                  <div className="mt-4">
                                    <h4 className="font-medium">Gestión de reportes y quejas</h4>
                                    <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                                      <li>Ve a "Reportes" en el panel de administración.</li>
                                      <li>Revisa los reportes enviados por usuarios (huéspedes o anfitriones).</li>
                                      <li>
                                        Investiga cada caso revisando la comunicación entre las partes y la
                                        documentación relevante.
                                      </li>
                                      <li>
                                        Toma las medidas necesarias según la gravedad del caso (advertencia, suspensión
                                        temporal, suspensión permanente).
                                      </li>
                                      <li>Comunica la resolución a las partes involucradas.</li>
                                    </ol>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>

                              <AccordionItem value="item-3">
                                <AccordionTrigger className="text-lg font-medium">
                                  Gestión de propiedades
                                </AccordionTrigger>
                                <AccordionContent className="space-y-4">
                                  <h4 className="font-medium">Verificación de propiedades</h4>
                                  <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                                    <li>Ve a "Propiedades" {">"} "Pendientes" en el panel de administración.</li>
                                    <li>Revisa las propiedades pendientes de aprobación.</li>
                                    <li>Verifica que la información proporcionada sea completa y precisa.</li>
                                    <li>
                                      Comprueba que las fotos sean de calidad y representen fielmente la propiedad.
                                    </li>
                                    <li>Verifica que la propiedad cumpla con las políticas de la plataforma.</li>
                                    <li>Haz clic en "Aprobar" o "Rechazar" según corresponda.</li>
                                    <li>
                                      Si rechazas una propiedad, proporciona un motivo claro para que el anfitrión pueda
                                      corregir los problemas.
                                    </li>
                                  </ol>

                                  <div className="mt-4">
                                    <h4 className="font-medium">Gestión de propiedades existentes</h4>
                                    <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                                      <li>Ve a "Propiedades" {">"} "Activas" en el panel de administración.</li>
                                      <li>
                                        Utiliza los filtros para buscar propiedades específicas (por ubicación, tipo,
                                        estado, etc.).
                                      </li>
                                      <li>Haz clic en una propiedad para ver sus detalles completos.</li>
                                      <li>
                                        Puedes editar la información de la propiedad, suspenderla temporalmente o
                                        eliminarla si no cumple con las políticas.
                                      </li>
                                    </ol>
                                  </div>

                                  <div className="mt-4">
                                    <h4 className="font-medium">Monitoreo de calidad</h4>
                                    <p className="text-gray-700 mb-2">
                                      Es importante monitorear regularmente la calidad de las propiedades:
                                    </p>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                      <li>Revisa las propiedades con calificaciones bajas.</li>
                                      <li>Analiza los comentarios negativos de los huéspedes.</li>
                                      <li>Contacta a los anfitriones para resolver problemas recurrentes.</li>
                                      <li>
                                        Suspende temporalmente las propiedades que no cumplan con los estándares de
                                        calidad hasta que se resuelvan los problemas.
                                      </li>
                                    </ul>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>

                              <AccordionItem value="item-4">
                                <AccordionTrigger className="text-lg font-medium">
                                  Gestión de reservas y pagos
                                </AccordionTrigger>
                                <AccordionContent className="space-y-4">
                                  <h4 className="font-medium">Monitoreo de reservas</h4>
                                  <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                                    <li>Ve a "Reservas" en el panel de administración.</li>
                                    <li>
                                      Utiliza los filtros para ver reservas por estado (pendientes, confirmadas,
                                      canceladas, completadas).
                                    </li>
                                    <li>Haz clic en una reserva para ver sus detalles completos.</li>
                                    <li>
                                      Puedes ver la comunicación entre huésped y anfitrión relacionada con la reserva.
                                    </li>
                                  </ol>

                                  <div className="mt-4">
                                    <h4 className="font-medium">Resolución de disputas</h4>
                                    <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                                      <li>Ve a "Disputas" en el panel de administración.</li>
                                      <li>Revisa las disputas abiertas entre huéspedes y anfitriones.</li>
                                      <li>Analiza la documentación y evidencia proporcionada por ambas partes.</li>
                                      <li>
                                        Comunícate con las partes para obtener información adicional si es necesario.
                                      </li>
                                      <li>
                                        Toma una decisión basada en las políticas de la plataforma y la evidencia
                                        disponible.
                                      </li>
                                      <li>Comunica la resolución a ambas partes.</li>
                                      <li>Procesa los reembolsos o pagos según corresponda.</li>
                                    </ol>
                                  </div>

                                  <div className="mt-4">
                                    <h4 className="font-medium">Gestión de pagos</h4>
                                    <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                                      <li>Ve a "Finanzas" en el panel de administración.</li>
                                      <li>Monitorea los pagos procesados y pendientes.</li>
                                      <li>Verifica que las comisiones se estén calculando correctamente.</li>
                                      <li>Resuelve problemas de pagos rechazados o fallidos.</li>
                                      <li>Procesa reembolsos manuales cuando sea necesario.</li>
                                    </ol>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>

                              <AccordionItem value="item-5">
                                <AccordionTrigger className="text-lg font-medium">
                                  Reportes y estadísticas
                                </AccordionTrigger>
                                <AccordionContent className="space-y-4">
                                  <h4 className="font-medium">Reportes disponibles</h4>
                                  <p className="text-gray-700 mb-2">
                                    El panel de administración ofrece varios reportes para monitorear el rendimiento de
                                    la plataforma:
                                  </p>
                                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                    <li>
                                      <strong>Usuarios:</strong> Nuevos registros, usuarios activos, distribución por
                                      tipo (huésped/anfitrión).
                                    </li>
                                    <li>
                                      <strong>Propiedades:</strong> Nuevas publicaciones, propiedades activas,
                                      distribución por ubicación y tipo.
                                    </li>
                                    <li>
                                      <strong>Reservas:</strong> Número de reservas, valor total, tasa de cancelación.
                                    </li>
                                    <li>
                                      <strong>Financieros:</strong> Ingresos por comisiones, pagos procesados,
                                      reembolsos.
                                    </li>
                                    <li>
                                      <strong>Rendimiento:</strong> Tiempo de respuesta, tasa de aprobación,
                                      calificaciones promedio.
                                    </li>
                                  </ul>

                                  <div className="mt-4">
                                    <h4 className="font-medium">Cómo generar reportes</h4>
                                    <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                                      <li>Ve a "Reportes" en el panel de administración.</li>
                                      <li>Selecciona el tipo de reporte que deseas generar.</li>
                                      <li>Configura los filtros (período de tiempo, ubicación, etc.).</li>
                                      <li>Haz clic en "Generar reporte".</li>
                                      <li>Puedes visualizar el reporte en línea o descargarlo en formato CSV o PDF.</li>
                                    </ol>
                                  </div>

                                  <div className="mt-4">
                                    <h4 className="font-medium">Análisis de datos</h4>
                                    <p className="text-gray-700 mb-2">Utiliza los reportes y estadísticas para:</p>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                      <li>Identificar tendencias y patrones.</li>
                                      <li>Detectar áreas de mejora.</li>
                                      <li>Tomar decisiones basadas en datos.</li>
                                      <li>Medir el impacto de cambios o nuevas funcionalidades.</li>
                                      <li>Planificar estrategias futuras.</li>
                                    </ul>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </motion.div>

                    <motion.div variants={item} className="mt-8 bg-[#e6f4f9] p-6 rounded-lg text-center">
                      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <div className="flex items-center">
                          <FileDown className="h-6 w-6 text-[#5f9bbd] mr-2" />
                          <span className="text-gray-700">¿Prefieres leer el manual completo?</span>
                        </div>
                        <Button
                          onClick={() => {
                            const link = document.createElement("a")
                            link.href = "/manual-usuario.pdf"
                            link.download = "Manual_Usuario_MiKaza.pdf"
                            document.body.appendChild(link)
                            link.click()
                            document.body.removeChild(link)
                          }}
                          className="bg-[#87CEEB] hover:bg-[#5f9bbd]"
                        >
                          Descargar Manual PDF
                        </Button>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
