"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Clock, AlertCircle } from "lucide-react"

interface Version2ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  feature: string
}

export function Version2Modal({ open, onOpenChange, feature }: Version2ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#5f9bbd]" />
            Próximamente en Mi Kaza 2.0
          </DialogTitle>
          <DialogDescription>Estamos trabajando para ofrecerte la mejor experiencia</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center text-center p-4">
          <div className="bg-[#e6f4f9] p-4 rounded-full mb-4">
            <AlertCircle className="h-8 w-8 text-[#5f9bbd]" />
          </div>
          <h3 className="text-lg font-medium mb-2">Funcionalidad en desarrollo</h3>
          <p className="text-gray-600 mb-4">
            La funcionalidad de <strong>{feature}</strong> estará disponible en la próxima versión de Mi Kaza. Estamos
            trabajando para implementarla lo antes posible.
          </p>
          <p className="text-sm text-gray-500">
            Gracias por tu paciencia y comprensión mientras seguimos mejorando nuestra plataforma.
          </p>
        </div>
        <div className="flex justify-center">
          <Button onClick={() => onOpenChange(false)} className="bg-[#87CEEB] hover:bg-[#5f9bbd]">
            Entendido
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
