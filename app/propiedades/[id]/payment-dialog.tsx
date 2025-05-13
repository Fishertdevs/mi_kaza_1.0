"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CreditCard, Smartphone, Building } from "lucide-react"

interface PaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onComplete: () => void
  total: number
}

export function PaymentDialog({ open, onOpenChange, onComplete, total }: PaymentDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>("tarjeta")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvc, setCardCvc] = useState("")
  const [cardName, setCardName] = useState("")
  const [nequiPhone, setNequiPhone] = useState("")
  const [daviplataPhone, setDaviplataPhone] = useState("")
  const [pseBank, setPseBank] = useState("")
  const [pseDocType, setPseDocType] = useState("cc")
  const [pseDocNumber, setPseDocNumber] = useState("")
  const [pseEmail, setPseEmail] = useState("")

  // Formatear precio
  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(precio)
  }

  // Manejar envío del formulario
  const handleSubmit = () => {
    setIsSubmitting(true)

    // Validar según método de pago
    let isValid = false

    if (paymentMethod === "tarjeta") {
      isValid =
        cardNumber.replace(/\s/g, "").length === 16 &&
        cardExpiry.length === 5 &&
        cardCvc.length === 3 &&
        cardName.trim() !== ""
    } else if (paymentMethod === "nequi") {
      isValid = nequiPhone.length === 10
    } else if (paymentMethod === "daviplata") {
      isValid = daviplataPhone.length === 10
    } else if (paymentMethod === "pse") {
      isValid = pseBank !== "" && pseDocNumber.trim() !== "" && pseEmail.includes("@")
    }

    if (!isValid) {
      setIsSubmitting(false)
      return
    }

    // Simulación de procesamiento de pago
    setTimeout(() => {
      setIsSubmitting(false)
      onComplete()
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Completar pago</DialogTitle>
          <DialogDescription>Selecciona tu método de pago preferido</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="tarjeta" className="w-full" onValueChange={setPaymentMethod}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="tarjeta" className="flex flex-col items-center py-2">
              <CreditCard className="h-5 w-5 mb-1" />
              <span className="text-xs">Tarjeta</span>
            </TabsTrigger>
            <TabsTrigger value="nequi" className="flex flex-col items-center py-2">
              <Smartphone className="h-5 w-5 mb-1" />
              <span className="text-xs">Nequi</span>
            </TabsTrigger>
            <TabsTrigger value="daviplata" className="flex flex-col items-center py-2">
              <Smartphone className="h-5 w-5 mb-1" />
              <span className="text-xs">Daviplata</span>
            </TabsTrigger>
            <TabsTrigger value="pse" className="flex flex-col items-center py-2">
              <Building className="h-5 w-5 mb-1" />
              <span className="text-xs">PSE</span>
            </TabsTrigger>
          </TabsList>

          {/* Tarjeta de crédito */}
          <TabsContent value="tarjeta" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Número de tarjeta</Label>
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                className="font-mono"
                maxLength={19}
                value={cardNumber}
                onChange={(e) => {
                  // Formatear número de tarjeta con espacios cada 4 dígitos
                  const value = e.target.value.replace(/\s/g, "")
                  const formattedValue = value.replace(/(\d{4})/g, "$1 ").trim()
                  setCardNumber(formattedValue)
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Fecha de expiración</Label>
                <Input
                  id="expiry"
                  placeholder="MM/AA"
                  maxLength={5}
                  value={cardExpiry}
                  onChange={(e) => {
                    // Formatear fecha de expiración
                    const value = e.target.value.replace(/\//g, "")
                    if (value.length > 2) {
                      setCardExpiry(value.substring(0, 2) + "/" + value.substring(2))
                    } else {
                      setCardExpiry(value)
                    }
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  placeholder="123"
                  maxLength={3}
                  value={cardCvc}
                  onChange={(e) => setCardCvc(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Nombre en la tarjeta</Label>
              <Input
                id="name"
                placeholder="NOMBRE APELLIDO"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>
          </TabsContent>

          {/* Nequi */}
          <TabsContent value="nequi" className="space-y-4">
            <div className="flex justify-center mb-4">
              <div className="bg-[#EB2D7C] p-4 rounded-lg w-24 h-24 flex items-center justify-center">
                <Image src="/nequi-logo.png" alt="Nequi" width={80} height={80} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nequi-phone">Número de celular</Label>
              <Input
                id="nequi-phone"
                placeholder="3001234567"
                type="tel"
                maxLength={10}
                value={nequiPhone}
                onChange={(e) => setNequiPhone(e.target.value.replace(/\D/g, ""))}
              />
            </div>
            <div className="bg-gray-50 p-3 rounded-md text-sm">
              <p className="text-gray-600">
                Al hacer clic en "Pagar", recibirás una notificación en tu app de Nequi para confirmar el pago.
              </p>
            </div>
          </TabsContent>

          {/* Daviplata */}
          <TabsContent value="daviplata" className="space-y-4">
            <div className="flex justify-center mb-4">
              <div className="bg-[#ED1C24] p-4 rounded-lg w-24 h-24 flex items-center justify-center">
                <Image src="/daviplata-logo.png" alt="Daviplata" width={80} height={80} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="daviplata-phone">Número de celular</Label>
              <Input
                id="daviplata-phone"
                placeholder="3001234567"
                type="tel"
                maxLength={10}
                value={daviplataPhone}
                onChange={(e) => setDaviplataPhone(e.target.value.replace(/\D/g, ""))}
              />
            </div>
            <div className="bg-gray-50 p-3 rounded-md text-sm">
              <p className="text-gray-600">
                Al hacer clic en "Pagar", recibirás una notificación en tu app de Daviplata para confirmar el pago.
              </p>
            </div>
          </TabsContent>

          {/* PSE */}
          <TabsContent value="pse" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pse-bank">Banco</Label>
              <select
                id="pse-bank"
                className="w-full border rounded-md p-2"
                value={pseBank}
                onChange={(e) => setPseBank(e.target.value)}
              >
                <option value="">Selecciona tu banco</option>
                <option value="bancolombia">Bancolombia</option>
                <option value="davivienda">Davivienda</option>
                <option value="bbva">BBVA</option>
                <option value="bogota">Banco de Bogotá</option>
                <option value="popular">Banco Popular</option>
                <option value="occidente">Banco de Occidente</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Tipo de documento</Label>
              <RadioGroup defaultValue="cc" className="flex space-x-4" value={pseDocType} onValueChange={setPseDocType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cc" id="cc" />
                  <Label htmlFor="cc">C.C.</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ce" id="ce" />
                  <Label htmlFor="ce">C.E.</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nit" id="nit" />
                  <Label htmlFor="nit">NIT</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pse-doc-number">Número de documento</Label>
              <Input
                id="pse-doc-number"
                placeholder="1234567890"
                value={pseDocNumber}
                onChange={(e) => setPseDocNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pse-email">Correo electrónico</Label>
              <Input
                id="pse-email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={pseEmail}
                onChange={(e) => setPseEmail(e.target.value)}
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="pt-2">
          <div className="bg-gray-50 p-3 rounded-md text-sm">
            <div className="flex justify-between font-medium mb-1">
              <span>Total a pagar:</span>
              <span>{formatearPrecio(total)}</span>
            </div>
            <p className="text-gray-500 text-xs">
              Al hacer clic en "Pagar y reservar", aceptas los términos y condiciones de Mi Kaza.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button className="bg-[#87CEEB] hover:bg-[#5f9bbd]" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent"></div>
                Procesando...
              </>
            ) : (
              "Pagar y reservar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
