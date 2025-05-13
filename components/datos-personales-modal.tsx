"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { Shield } from "lucide-react"

interface DatosPersonalesModalProps {
  isOpen: boolean
  onClose: () => void
  onAccept: () => void
}

export function DatosPersonalesModal({ isOpen, onClose, onAccept }: DatosPersonalesModalProps) {
  const [accepted, setAccepted] = useState(false)

  const handleAccept = () => {
    if (accepted) {
      onAccept()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-center mb-2">
            <Shield className="h-6 w-6 text-[#5f9bbd] mr-2" />
            <DialogTitle>Tratamiento de Datos Personales</DialogTitle>
          </div>
          <DialogDescription>
            Antes de continuar, por favor lee y acepta nuestra política de tratamiento de datos personales
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-grow pr-4 my-4">
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <strong>Mi Kaza S.A.S.</strong> como responsable del tratamiento de datos personales, te informa que los
              datos que proporciones serán tratados de acuerdo con la Ley 1581 de 2012 de Protección de Datos Personales
              de Colombia y sus decretos reglamentarios.
            </p>

            <div className="text-sm space-y-2 text-gray-700">
              <p>
                <strong>Finalidades principales:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Gestionar tu cuenta y perfil en Mi Kaza</li>
                <li>Verificar tu identidad y prevenir fraudes</li>
                <li>Procesar reservas, pagos y reembolsos</li>
                <li>Facilitar la comunicación entre Huéspedes y Anfitriones</li>
                <li>Enviar notificaciones relacionadas con el servicio</li>
              </ul>
            </div>

            <div className="text-sm space-y-2 text-gray-700">
              <p>
                <strong>Datos que recopilamos:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Datos de identificación (nombre, documento, etc.)</li>
                <li>Datos de contacto (correo, teléfono, dirección)</li>
                <li>Datos de pago (según el tipo de usuario)</li>
                <li>Datos de navegación y uso de la plataforma</li>
              </ul>
            </div>

            <div className="text-sm space-y-2 text-gray-700">
              <p>
                <strong>Tus derechos:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Conocer, actualizar y rectificar tus datos personales</li>
                <li>Solicitar prueba de la autorización otorgada</li>
                <li>Ser informado sobre el uso de tus datos</li>
                <li>Revocar la autorización y solicitar la supresión de datos</li>
                <li>Presentar reclamaciones ante la Superintendencia de Industria y Comercio</li>
              </ul>
            </div>

            <p className="text-sm text-gray-700">
              Para más información sobre cómo tratamos tus datos personales, puedes consultar nuestra{" "}
              <Link href="/tratamiento-datos" className="text-[#5f9bbd] hover:underline" target="_blank">
                Política de Tratamiento de Datos Personales completa
              </Link>
              .
            </p>
          </div>
        </ScrollArea>

        <DialogFooter className="flex-col sm:flex-col gap-2">
          <div className="flex items-center space-x-2 self-start">
            <Checkbox id="accept" checked={accepted} onCheckedChange={(checked) => setAccepted(checked === true)} />
            <Label htmlFor="accept" className="text-sm">
              He leído y acepto la política de tratamiento de datos personales
            </Label>
          </div>

          <div className="flex gap-2 w-full justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button className="bg-[#87CEEB] hover:bg-[#5f9bbd]" onClick={handleAccept} disabled={!accepted}>
              Aceptar y continuar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
