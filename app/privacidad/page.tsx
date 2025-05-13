import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="bg-[#e6f4f9] py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Política de Privacidad</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Información sobre cómo recopilamos, utilizamos y protegemos tus datos personales
            </p>
          </div>
        </div>

        <div className="container mx-auto py-12 px-4">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Política de Privacidad</h2>
                <p className="text-gray-600 mb-4">Última actualización: 1 de mayo de 2025</p>
                <p className="mb-4">
                  En Mi Kaza, respetamos su privacidad y nos comprometemos a proteger sus datos personales. Esta
                  Política de Privacidad explica cómo recopilamos, utilizamos, divulgamos y protegemos su información
                  cuando utiliza nuestra plataforma.
                </p>
                <p>
                  Esta política cumple con la Ley 1581 de 2012 de Protección de Datos Personales de Colombia y sus
                  decretos reglamentarios.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">1. Información que Recopilamos</h3>
                <p className="mb-3">Podemos recopilar los siguientes tipos de información:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    <strong>Información de registro</strong>: Nombre completo, correo electrónico, tipo y número de
                    documento, dirección, contraseña.
                  </li>
                  <li>
                    <strong>Documentos de verificación</strong>: Antecedentes judiciales y otros documentos necesarios
                    para verificar su identidad.
                  </li>
                  <li>
                    <strong>Información de pago</strong>: Datos de tarjetas de crédito, cuentas bancarias y otros
                    métodos de pago.
                  </li>
                  <li>
                    <strong>Información de propiedades</strong>: Detalles sobre los inmuebles publicados por los
                    Anfitriones.
                  </li>
                  <li>
                    <strong>Comunicaciones</strong>: Mensajes intercambiados entre Huéspedes y Anfitriones.
                  </li>
                  <li>
                    <strong>Información de uso</strong>: Datos sobre cómo utiliza nuestra plataforma, incluyendo
                    direcciones IP, tipo de dispositivo, navegador y sistema operativo.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">2. Cómo Utilizamos su Información</h3>
                <p className="mb-3">Utilizamos su información para los siguientes fines:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>Proporcionar, mantener y mejorar nuestros servicios.</li>
                  <li>Procesar reservas, pagos y reembolsos.</li>
                  <li>Verificar la identidad de los usuarios y sus antecedentes judiciales.</li>
                  <li>Facilitar la comunicación entre Huéspedes y Anfitriones.</li>
                  <li>Enviar notificaciones, actualizaciones y comunicaciones relacionadas con el servicio.</li>
                  <li>Prevenir fraudes y actividades ilegales.</li>
                  <li>Cumplir con obligaciones legales y regulatorias.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">3. Compartir Información</h3>
                <p className="mb-3">Podemos compartir su información en las siguientes circunstancias:</p>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    <strong>Entre usuarios</strong>: Los Huéspedes y Anfitriones pueden ver cierta información entre sí
                    para facilitar las reservas y la comunicación.
                  </li>
                  <li>
                    <strong>Proveedores de servicios</strong>: Compartimos información con terceros que nos ayudan a
                    proporcionar nuestros servicios, como procesadores de pagos, servicios de verificación de
                    antecedentes y proveedores de alojamiento web.
                  </li>
                  <li>
                    <strong>Cumplimiento legal</strong>: Podemos divulgar información cuando sea requerido por ley o
                    para proteger nuestros derechos, propiedad o seguridad.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">4. Seguridad de la Información</h3>
                <p>
                  Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger su información
                  contra acceso no autorizado, pérdida o alteración. Sin embargo, ningún método de transmisión por
                  Internet o almacenamiento electrónico es 100% seguro, por lo que no podemos garantizar su seguridad
                  absoluta.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">5. Sus Derechos</h3>
                <p className="mb-3">
                  De acuerdo con la Ley 1581 de 2012, usted tiene los siguientes derechos respecto a sus datos
                  personales:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>Conocer, actualizar y rectificar sus datos personales.</li>
                  <li>Solicitar prueba de la autorización otorgada para el tratamiento de sus datos.</li>
                  <li>Ser informado sobre el uso que se ha dado a sus datos personales.</li>
                  <li>
                    Revocar la autorización y/o solicitar la supresión de sus datos cuando lo considere pertinente.
                  </li>
                  <li>Acceder de forma gratuita a sus datos personales que hayan sido objeto de tratamiento.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">6. Cambios a esta Política</h3>
                <p>
                  Podemos actualizar esta Política de Privacidad periódicamente. La versión más reciente estará siempre
                  disponible en nuestra plataforma. Le recomendamos revisar esta política regularmente para estar
                  informado sobre cómo protegemos su información.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">7. Contacto</h3>
                <p>
                  Si tiene preguntas o inquietudes sobre esta Política de Privacidad o el tratamiento de sus datos
                  personales, puede contactarnos a través de nuestro Centro de Ayuda o enviando un correo electrónico a
                  privacidad@mikaza.com.
                </p>
              </div>

              <div className="bg-[#e6f4f9] p-4 rounded-lg text-center">
                <p className="text-sm">
                  Al utilizar Mi Kaza, usted reconoce haber leído, entendido y aceptado esta Política de Privacidad.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
