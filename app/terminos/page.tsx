import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TerminosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <div className="bg-[#e6f4f9] py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Términos y Condiciones</h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Información legal sobre el uso de la plataforma Mi Kaza
            </p>
          </div>
        </div>

        <div className="container mx-auto py-12 px-4">
          <Tabs defaultValue="terminos" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="terminos">Términos y Condiciones</TabsTrigger>
              <TabsTrigger value="privacidad">Política de Privacidad</TabsTrigger>
            </TabsList>

            <TabsContent value="terminos">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Términos y Condiciones de Uso</h2>
                    <p className="text-gray-600 mb-4">Última actualización: 1 de mayo de 2025</p>
                    <p className="mb-4">
                      Bienvenido a Mi Kaza. Estos Términos y Condiciones rigen el uso de nuestra plataforma y los
                      servicios ofrecidos a través de ella. Al acceder o utilizar Mi Kaza, usted acepta estar sujeto a
                      estos términos. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder al
                      servicio.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">1. Definiciones</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>
                        <strong>"Mi Kaza"</strong>: Se refiere a la plataforma de alquiler de inmuebles, incluyendo el
                        sitio web y las aplicaciones móviles.
                      </li>
                      <li>
                        <strong>"Usuario"</strong>: Cualquier persona que acceda o utilice la plataforma Mi Kaza.
                      </li>
                      <li>
                        <strong>"Huésped"</strong>: Usuario que busca y reserva alojamientos a través de la plataforma.
                      </li>
                      <li>
                        <strong>"Anfitrión"</strong>: Usuario que ofrece y publica propiedades para alquiler en la
                        plataforma.
                      </li>
                      <li>
                        <strong>"Propiedad"</strong>: Inmueble o espacio ofrecido para alquiler temporal en la
                        plataforma.
                      </li>
                      <li>
                        <strong>"Reserva"</strong>: Acuerdo entre un Huésped y un Anfitrión para el alquiler temporal de
                        una Propiedad.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">2. Registro y Cuentas</h3>
                    <p className="mb-3">
                      Para utilizar ciertos servicios de Mi Kaza, es necesario registrarse y crear una cuenta. Al
                      registrarse, usted acepta proporcionar información precisa, actualizada y completa.
                    </p>
                    <p className="mb-3">
                      Usted es responsable de mantener la confidencialidad de su contraseña y de todas las actividades
                      que ocurran bajo su cuenta. Mi Kaza se reserva el derecho de rechazar el registro o cancelar una
                      cuenta a su discreción.
                    </p>
                    <p>
                      Para registrarse como Huésped, deberá proporcionar sus antecedentes judiciales, los cuales serán
                      verificados por nuestro equipo antes de aprobar su cuenta.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">3. Publicación de Propiedades</h3>
                    <p className="mb-3">
                      Los Anfitriones son responsables de proporcionar información precisa y completa sobre sus
                      Propiedades, incluyendo descripción, ubicación, servicios, capacidad y precio.
                    </p>
                    <p className="mb-3">
                      Mi Kaza se reserva el derecho de revisar, rechazar o eliminar cualquier Propiedad que no cumpla
                      con nuestras políticas o estándares de calidad.
                    </p>
                    <p>
                      Los Anfitriones deben asegurarse de que sus Propiedades cumplen con todas las leyes y regulaciones
                      aplicables, incluyendo normas de seguridad, permisos y licencias.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">4. Reservas y Pagos</h3>
                    <p className="mb-3">
                      Las reservas se consideran confirmadas una vez que el Huésped ha realizado el pago correspondiente
                      y el Anfitrión ha aceptado la solicitud.
                    </p>
                    <p className="mb-3">
                      Mi Kaza cobra una comisión por cada reserva completada, la cual se descuenta automáticamente del
                      pago al Anfitrión.
                    </p>
                    <p>
                      Los pagos se procesan a través de nuestra pasarela de pagos segura. Mi Kaza no almacena
                      información de tarjetas de crédito ni datos bancarios sensibles.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">5. Cancelaciones y Reembolsos</h3>
                    <p className="mb-3">
                      Las políticas de cancelación varían según la Propiedad y son establecidas por los Anfitriones. Los
                      Huéspedes deben revisar estas políticas antes de realizar una reserva.
                    </p>
                    <p>
                      Mi Kaza se reserva el derecho de intervenir en disputas relacionadas con cancelaciones y
                      reembolsos, y su decisión será definitiva.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">6. Responsabilidades y Limitaciones</h3>
                    <p className="mb-3">
                      Mi Kaza actúa únicamente como intermediario entre Huéspedes y Anfitriones, y no es responsable de
                      los acuerdos o disputas entre ellos.
                    </p>
                    <p className="mb-3">
                      Mi Kaza no garantiza la calidad, seguridad o legalidad de las Propiedades publicadas, ni la
                      veracidad de la información proporcionada por los usuarios.
                    </p>
                    <p>
                      Los usuarios aceptan que el uso de la plataforma es bajo su propio riesgo y que Mi Kaza no será
                      responsable por daños directos, indirectos, incidentales o consecuentes.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">7. Modificaciones</h3>
                    <p>
                      Mi Kaza se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Las
                      modificaciones entrarán en vigor inmediatamente después de su publicación en la plataforma. El uso
                      continuado de Mi Kaza después de cualquier modificación constituye la aceptación de los nuevos
                      términos.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">8. Ley Aplicable</h3>
                    <p>
                      Estos Términos y Condiciones se rigen por las leyes de la República de Colombia. Cualquier disputa
                      relacionada con estos términos será sometida a la jurisdicción exclusiva de los tribunales de
                      Bogotá, Colombia.
                    </p>
                  </div>

                  <div className="bg-[#e6f4f9] p-4 rounded-lg text-center">
                    <p className="text-sm">
                      Al utilizar Mi Kaza, usted reconoce haber leído, entendido y aceptado estos Términos y
                      Condiciones.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacidad">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Política de Privacidad</h2>
                    <p className="text-gray-600 mb-4">Última actualización: 1 de mayo de 2025</p>
                    <p className="mb-4">
                      En Mi Kaza, respetamos su privacidad y nos comprometemos a proteger sus datos personales. Esta
                      Política de Privacidad explica cómo recopilamos, utilizamos, divulgamos y protegemos su
                      información cuando utiliza nuestra plataforma.
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
                        <strong>Documentos de verificación</strong>: Antecedentes judiciales y otros documentos
                        necesarios para verificar su identidad.
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
                        <strong>Entre usuarios</strong>: Los Huéspedes y Anfitriones pueden ver cierta información entre
                        sí para facilitar las reservas y la comunicación.
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
                      Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger su
                      información contra acceso no autorizado, pérdida o alteración. Sin embargo, ningún método de
                      transmisión por Internet o almacenamiento electrónico es 100% seguro, por lo que no podemos
                      garantizar su seguridad absoluta.
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
                      Podemos actualizar esta Política de Privacidad periódicamente. La versión más reciente estará
                      siempre disponible en nuestra plataforma. Le recomendamos revisar esta política regularmente para
                      estar informado sobre cómo protegemos su información.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">7. Contacto</h3>
                    <p>
                      Si tiene preguntas o inquietudes sobre esta Política de Privacidad o el tratamiento de sus datos
                      personales, puede contactarnos a través de nuestro Centro de Ayuda o enviando un correo
                      electrónico a privacidad@mikaza.com.
                    </p>
                  </div>

                  <div className="bg-[#e6f4f9] p-4 rounded-lg text-center">
                    <p className="text-sm">
                      Al utilizar Mi Kaza, usted reconoce haber leído, entendido y aceptado esta Política de Privacidad.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
