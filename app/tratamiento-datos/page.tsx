import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, Shield } from "lucide-react"

export default function TratamientoDatosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="bg-[#e6f4f9] py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Tratamiento de Datos Personales</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Información sobre cómo recopilamos, utilizamos y protegemos tus datos personales en Mi Kaza
            </p>
          </div>
        </div>

        <div className="container mx-auto py-12 px-4">
          <Link href="/auth/login">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" /> Volver al inicio de sesión
            </Button>
          </Link>

          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-center mb-4">
                <Shield className="h-12 w-12 text-[#5f9bbd] mr-3" />
                <h2 className="text-2xl font-bold">Política de Tratamiento de Datos Personales</h2>
              </div>

              <p className="text-gray-600 mb-4">Última actualización: 1 de mayo de 2025</p>

              <div className="bg-[#e6f4f9] p-4 rounded-lg mb-6">
                <p className="font-medium">
                  Este documento explica cómo Mi Kaza recopila, utiliza, almacena y protege tus datos personales de
                  acuerdo con la Ley 1581 de 2012 de Protección de Datos Personales de Colombia y sus decretos
                  reglamentarios.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">1. Responsable del Tratamiento</h3>
                <p className="mb-4">
                  <strong>Mi Kaza S.A.S.</strong>
                  <br />
                  NIT: 901.XXX.XXX-X
                  <br />
                  Dirección: Calle 21 #4-53, Bogotá, Colombia
                  <br />
                  Correo electrónico: datos@mikaza.com
                  <br />
                  Teléfono: (+57) 601 XXX XXXX
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">2. Datos Personales que Recopilamos</h3>
                <p className="mb-3">
                  Dependiendo de tu tipo de usuario, podemos recopilar los siguientes datos personales:
                </p>

                <div className="space-y-4">
                  <div className="border-l-4 border-[#87CEEB] pl-4">
                    <h4 className="font-semibold mb-2">Para todos los usuarios:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Nombre completo</li>
                      <li>Correo electrónico</li>
                      <li>Número de teléfono</li>
                      <li>Tipo y número de documento de identidad</li>
                      <li>Dirección de residencia</li>
                      <li>Fecha de nacimiento</li>
                      <li>Contraseña (almacenada de forma encriptada)</li>
                      <li>Datos de navegación y uso de la plataforma</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-[#87CEEB] pl-4">
                    <h4 className="font-semibold mb-2">Adicionalmente para Anfitriones:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Información bancaria para pagos</li>
                      <li>Datos de las propiedades (dirección, características, fotos)</li>
                      <li>Documentos de verificación de identidad</li>
                      <li>Antecedentes judiciales</li>
                      <li>Historial de transacciones</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-[#87CEEB] pl-4">
                    <h4 className="font-semibold mb-2">Adicionalmente para Huéspedes:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Información de tarjetas de crédito y métodos de pago</li>
                      <li>Historial de reservas y transacciones</li>
                      <li>Preferencias de alojamiento</li>
                      <li>Reseñas y calificaciones realizadas</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">3. Finalidades del Tratamiento</h3>
                <p className="mb-3">Utilizamos tus datos personales para los siguientes fines:</p>

                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Gestionar tu cuenta y perfil en Mi Kaza</li>
                  <li>Verificar tu identidad y prevenir fraudes</li>
                  <li>Procesar reservas, pagos y reembolsos</li>
                  <li>Facilitar la comunicación entre Huéspedes y Anfitriones</li>
                  <li>Enviar notificaciones relacionadas con el servicio</li>
                  <li>Mejorar nuestros servicios y desarrollar nuevas funcionalidades</li>
                  <li>Cumplir con obligaciones legales y regulatorias</li>
                  <li>Resolver disputas y problemas técnicos</li>
                  <li>Enviar comunicaciones de marketing (con tu consentimiento previo)</li>
                  <li>Realizar análisis estadísticos y estudios de mercado</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">4. Base Legal para el Tratamiento</h3>
                <p className="mb-3">El tratamiento de tus datos personales se realiza con base en:</p>

                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>
                    <strong>Tu consentimiento explícito</strong>, que otorgas al registrarte en Mi Kaza y aceptar esta
                    política
                  </li>
                  <li>
                    <strong>La ejecución de un contrato</strong> del que eres parte (Términos y Condiciones de Mi Kaza)
                  </li>
                  <li>
                    <strong>El cumplimiento de obligaciones legales</strong> aplicables a Mi Kaza
                  </li>
                  <li>
                    <strong>El interés legítimo</strong> de Mi Kaza en mejorar y proteger nuestros servicios
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">5. Compartir Información con Terceros</h3>
                <p className="mb-3">Podemos compartir tus datos personales con:</p>

                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>
                    <strong>Otros usuarios de Mi Kaza</strong>: Los Huéspedes y Anfitriones pueden ver cierta
                    información entre sí para facilitar las reservas
                  </li>
                  <li>
                    <strong>Proveedores de servicios</strong>: Empresas que nos ayudan a proporcionar nuestros servicios
                    (procesadores de pago, servicios de verificación, alojamiento web)
                  </li>
                  <li>
                    <strong>Autoridades competentes</strong>: Cuando sea requerido por ley o para proteger nuestros
                    derechos legales
                  </li>
                </ul>

                <p className="mt-3">
                  No vendemos ni alquilamos tus datos personales a terceros para fines de marketing.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">6. Seguridad de los Datos</h3>
                <p className="mb-3">
                  Implementamos medidas técnicas, administrativas y físicas para proteger tus datos personales contra
                  acceso no autorizado, pérdida o alteración:
                </p>

                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Encriptación de datos sensibles</li>
                  <li>Acceso restringido a la información personal</li>
                  <li>Monitoreo de sistemas para detectar vulnerabilidades</li>
                  <li>Capacitación de personal en protección de datos</li>
                  <li>Evaluaciones periódicas de seguridad</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">7. Tus Derechos</h3>
                <p className="mb-3">
                  De acuerdo con la Ley 1581 de 2012, tienes los siguientes derechos respecto a tus datos personales:
                </p>

                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>
                    <strong>Derecho de acceso</strong>: Conocer qué datos personales tuyos están siendo tratados
                  </li>
                  <li>
                    <strong>Derecho de actualización</strong>: Actualizar tus datos personales
                  </li>
                  <li>
                    <strong>Derecho de rectificación</strong>: Corregir tus datos personales inexactos
                  </li>
                  <li>
                    <strong>Derecho de supresión</strong>: Solicitar la eliminación de tus datos cuando no sean
                    necesarios para las finalidades autorizadas
                  </li>
                  <li>
                    <strong>Derecho a solicitar prueba de la autorización</strong>: Obtener evidencia del consentimiento
                    otorgado
                  </li>
                  <li>
                    <strong>Derecho a ser informado</strong>: Conocer el uso que se ha dado a tus datos personales
                  </li>
                  <li>
                    <strong>Derecho a presentar reclamaciones</strong>: Ante la Superintendencia de Industria y Comercio
                  </li>
                  <li>
                    <strong>Derecho a revocar la autorización</strong>: Retirar tu consentimiento para el tratamiento de
                    datos
                  </li>
                </ul>

                <p className="mt-3">
                  Para ejercer estos derechos, puedes contactarnos a través de datos@mikaza.com o en nuestra sección de
                  "Contacto".
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">8. Tiempo de Conservación</h3>
                <p>
                  Conservaremos tus datos personales mientras mantengas una cuenta activa en Mi Kaza o según sea
                  necesario para proporcionarte nuestros servicios. Después de cerrar tu cuenta, mantendremos ciertos
                  datos por el tiempo requerido para:
                </p>

                <ul className="list-disc list-inside space-y-2 text-gray-700 mt-3">
                  <li>Cumplir con obligaciones legales y fiscales (generalmente 5-10 años)</li>
                  <li>Resolver disputas pendientes</li>
                  <li>Prevenir fraudes y abusos</li>
                  <li>Hacer cumplir nuestros acuerdos</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">9. Cambios a esta Política</h3>
                <p>
                  Podemos actualizar esta Política de Tratamiento de Datos Personales periódicamente. La versión más
                  reciente estará siempre disponible en nuestra plataforma con la fecha de última actualización. Te
                  notificaremos sobre cambios significativos a través del correo electrónico registrado o mediante un
                  aviso destacado en nuestra plataforma.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">10. Contacto</h3>
                <p>
                  Si tienes preguntas, comentarios o solicitudes relacionadas con esta política o el tratamiento de tus
                  datos personales, puedes contactarnos a través de:
                </p>

                <ul className="list-none space-y-2 text-gray-700 mt-3">
                  <li>
                    <strong>Correo electrónico</strong>: datos@mikaza.com
                  </li>
                  <li>
                    <strong>Teléfono</strong>: (+57) 601 XXX XXXX
                  </li>
                  <li>
                    <strong>Dirección</strong>: Calle 21 #4-53, Bogotá, Colombia
                  </li>
                  <li>
                    <strong>Formulario web</strong>: Sección de "Contacto" en nuestra plataforma
                  </li>
                </ul>
              </div>

              <div className="bg-[#e6f4f9] p-4 rounded-lg text-center mt-6">
                <p className="text-sm">
                  Al utilizar Mi Kaza, confirmas que has leído, entendido y aceptado esta Política de Tratamiento de
                  Datos Personales.
                </p>
              </div>

              <div className="flex justify-center mt-6">
                <Link href="/auth/login">
                  <Button className="bg-[#87CEEB] hover:bg-[#5f9bbd]">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Volver al inicio de sesión
                  </Button>
                </Link>
                <Link href="/privacidad" className="ml-4">
                  <Button variant="outline" className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" /> Ver política de privacidad completa
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
