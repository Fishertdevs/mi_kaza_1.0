import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="bg-[#e6f4f9] py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Contacto</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Estamos aquí para ayudarte. Contáctanos con cualquier pregunta o inquietud.
            </p>
          </div>
        </div>

        <div className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="nombre" className="text-sm font-medium">
                      Nombre completo
                    </label>
                    <Input id="nombre" placeholder="Tu nombre" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Correo electrónico
                    </label>
                    <Input id="email" type="email" placeholder="correo@ejemplo.com" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="asunto" className="text-sm font-medium">
                    Asunto
                  </label>
                  <Input id="asunto" placeholder="Asunto de tu mensaje" required />
                </div>

                <div className="space-y-2">
                  <label htmlFor="mensaje" className="text-sm font-medium">
                    Mensaje
                  </label>
                  <Textarea id="mensaje" placeholder="Escribe tu mensaje aquí..." rows={6} required />
                </div>

                <Button type="submit" className="w-full bg-[#87CEEB] hover:bg-[#5f9bbd]">
                  Enviar mensaje
                </Button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Información de contacto</h2>
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="bg-[#e6f4f9] p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-[#5f9bbd]" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Dirección</h3>
                      <p className="text-gray-600">
                        Universidad Central
                        <br />
                        Calle 21 #4-40
                        <br />
                        Bogotá, Colombia
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="bg-[#e6f4f9] p-3 rounded-full">
                      <Phone className="h-6 w-6 text-[#5f9bbd]" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Teléfono</h3>
                      <p className="text-gray-600">+57 (601) 323-9868</p>
                      <p className="text-gray-600">Lunes a Viernes, 8:00 AM - 6:00 PM</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="bg-[#e6f4f9] p-3 rounded-full">
                      <Mail className="h-6 w-6 text-[#5f9bbd]" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Correo electrónico</h3>
                      <p className="text-gray-600">contacto@mikaza.com</p>
                      <p className="text-gray-600">soporte@mikaza.com</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="bg-[#e6f4f9] p-3 rounded-full">
                      <Clock className="h-6 w-6 text-[#5f9bbd]" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Horario de atención</h3>
                      <p className="text-gray-600">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Sábados: 9:00 AM - 1:00 PM</p>
                      <p className="text-gray-600">Domingos y festivos: Cerrado</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
