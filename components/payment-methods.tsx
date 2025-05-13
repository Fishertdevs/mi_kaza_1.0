import { CreditCard, Smartphone, Building, DollarSign } from "lucide-react"

export const paymentMethods = [
  {
    id: "credit_card",
    name: "Tarjeta de crédito/débito",
    icon: <CreditCard className="h-5 w-5" />,
    description: "Visa, Mastercard, American Express",
    popular: true,
  },
  {
    id: "nequi",
    name: "Nequi",
    icon: <Smartphone className="h-5 w-5 text-[#FF2F73]" />,
    description: "Paga directamente desde tu cuenta Nequi",
    popular: true,
  },
  {
    id: "daviplata",
    name: "Daviplata",
    icon: <Smartphone className="h-5 w-5 text-[#ED0722]" />,
    description: "Transfiere desde tu cuenta Daviplata",
    popular: false,
  },
  {
    id: "pse",
    name: "PSE",
    icon: <Building className="h-5 w-5" />,
    description: "Transferencia bancaria directa",
    popular: false,
  },
  {
    id: "cash",
    name: "Efectivo",
    icon: <DollarSign className="h-5 w-5" />,
    description: "Pago en efectivo al llegar (sujeto a aprobación)",
    popular: false,
  },
]

export const getPaymentMethodById = (id: string) => {
  return paymentMethods.find((method) => method.id === id)
}
