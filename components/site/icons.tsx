import { ShoppingBag, Wrench, Shirt, Car, Package, Home, PawPrint, Briefcase } from "lucide-react"

export const CategoryIcon = ({ name, className = "w-5 h-5 text-dlq-gold" }: { name: string; className?: string }) => {
  const map: Record<string, any> = {
    Deliveries: Package,
    Removals: Home,
    "Trades & Repairs": Wrench,
    "Home & Garden": Home,
    "Auto & Transport": Car,
    "Personal & Events": Shirt,
    Pets: PawPrint,
    "Business & Logistics": Briefcase,
  }
  const Icon = map[name] ?? ShoppingBag
  return <Icon className={className} />
}
