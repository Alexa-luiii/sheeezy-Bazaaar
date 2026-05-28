"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  ShoppingBag,
  Truck,
  CreditCard,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Trash2,
  Tag,
  AlertCircle,
  Package,
  MapPin,
  Phone,
  Mail,
  User,
  ArrowRight
} from "lucide-react"
import { useCartStore } from "@/lib/store/cartStore"
import { generateOrderId, calculateTotal, validateCoupon } from "@/lib/utils/orderUtils"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Checkbox } from "@/components/ui/Checkbox"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { Coupon } from "@/types"

type CheckoutStep = "cart" | "shipping" | "payment" | "confirmation"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, removeItem, updateQuantity, clearCart } = useCartStore()
  const [step, setStep] = useState<CheckoutStep>("cart")
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null)
  const [couponError, setCouponError] = useState("")
  const [orderId, setOrderId] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Redirect if cart is empty and not in confirmation step
  useEffect(() => {
    if (items.length === 0 && step !== "confirmation") {
      // Small delay to allow state to settle
      const timer = setTimeout(() => {
        if (items.length === 0) router.push("/")
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [items.length, step, router])

  const totals = calculateTotal(items, appliedCoupon)

  const handleApplyCoupon = () => {
    setCouponError("")
    const coupon = validateCoupon(couponCode)
    if (coupon) {
      if (totals.subtotal < coupon.minOrder) {
        setCouponError(`Minimum order of $${coupon.minOrder} required`)
      } else {
        setAppliedCoupon(coupon)
      }
    } else {
      setCouponError("Invalid coupon code")
    }
  }

  const handlePlaceOrder = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const newOrderId = generateOrderId()
      setOrderId(newOrderId)
      setStep("confirmation")
      clearCart()
      setIsLoading(false)
      window.scrollTo(0, 0)
    }, 2000)
  }

  const nextStep = () => {
    if (step === "cart") setStep("shipping")
    else if (step === "shipping") setStep("payment")
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    if (step === "shipping") setStep("cart")
    else if (step === "payment") setStep("shipping")
    window.scrollTo(0, 0)
  }

  const stepItems = [
    { id: "cart", label: "Review", icon: ShoppingBag },
    { id: "shipping", label: "Shipping", icon: Truck },
    { id: "payment", label: "Payment", icon: CreditCard },
  ]

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl min-h-[70vh]">
      {step !== "confirmation" && (
        <div className="mb-12">
          <div className="flex items-center justify-center max-w-2xl mx-auto">
            {stepItems.map((s, i) => (
              <React.Fragment key={s.id}>
                <div className="flex flex-col items-center relative z-10">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                      step === s.id
                        ? "bg-brand-accent border-brand-accent text-brand-primary shadow-[0_0_15px_rgba(201,168,76,0.5)]"
                        : stepItems.findIndex(x => x.id === step) > i
                        ? "bg-brand-accent border-brand-accent text-brand-primary"
                        : "bg-zinc-900 border-white/10 text-zinc-500"
                    )}
                  >
                    <s.icon size={18} />
                  </div>
                  <span
                    className={cn(
                      "absolute top-12 text-xs font-medium uppercase tracking-widest whitespace-nowrap",
                      step === s.id ? "text-brand-accent" : "text-zinc-500"
                    )}
                  >
                    {s.label}
                  </span>
                </div>
                {i < stepItems.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-0.5 mx-4 transition-all duration-500",
                      stepItems.findIndex(x => x.id === step) > i ? "bg-brand-accent" : "bg-white/10"
                    )}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      <div className="mt-20">
        <AnimatePresence mode="wait">
          {/* STEP 1: CART REVIEW */}
          {step === "cart" && (
            <motion.div
              key="cart"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-white/5 bg-zinc-950/50 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingBag className="text-brand-accent" size={20} />
                      Your Selection ({items.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {items.map((item, idx) => (
                      <div key={`${item.product.id}-${idx}`} className="flex gap-4 items-start py-4 border-b border-white/5 last:border-0">
                        <div className="relative w-24 h-32 rounded-sm overflow-hidden flex-shrink-0 bg-zinc-900">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h3 className="text-white font-medium truncate pr-4">{item.product.title}</h3>
                            <p className="text-white font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <p className="text-zinc-500 text-sm mt-1">{item.product.brand}</p>
                          {(item.selectedSize || item.selectedColor) && (
                            <div className="flex gap-4 mt-2">
                              {item.selectedSize && <p className="text-xs text-zinc-400 uppercase tracking-widest">Size: {item.selectedSize}</p>}
                              {item.selectedColor && <p className="text-xs text-zinc-400 uppercase tracking-widest">Color: {item.selectedColor}</p>}
                            </div>
                          )}
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border border-white/10 rounded-sm overflow-hidden">
                              <button
                                className="px-3 py-1 hover:bg-white/5 text-zinc-400 transition-colors"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                              >
                                -
                              </button>
                              <span className="px-3 py-1 text-sm text-white border-x border-white/10 min-w-[40px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                className="px-3 py-1 hover:bg-white/5 text-zinc-400 transition-colors"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                              >
                                +
                              </button>
                            </div>
                            <button
                              className="text-zinc-500 hover:text-red-500 transition-colors flex items-center gap-1 text-xs uppercase tracking-widest"
                              onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor)}
                            >
                              <Trash2 size={14} />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <div className="flex justify-between items-center px-2">
                    <Button variant="ghost" asChild className="text-zinc-400">
                        <Link href="/">
                            <div className="flex items-center">
                                <ChevronLeft className="mr-2" size={16} />
                                Back to Boutique
                            </div>
                        </Link>
                    </Button>
                </div>
              </div>

              <div className="space-y-6">
                <Card className="border-white/5 bg-zinc-950/50 backdrop-blur-xl sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-lg">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="coupon" className="text-xs uppercase tracking-widest text-zinc-500">Coupon Code</Label>
                      <div className="flex gap-2">
                        <Input
                          id="coupon"
                          placeholder="e.g. SAVE10"
                          className="bg-white/5 border-white/10 uppercase"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <Button variant="outline" size="sm" onClick={handleApplyCoupon}>Apply</Button>
                      </div>
                      {couponError && <p className="text-xs text-red-500 mt-1">{couponError}</p>}
                      {appliedCoupon && (
                        <div className="flex items-center justify-between bg-brand-accent/10 border border-brand-accent/20 rounded-sm p-2 mt-2">
                          <span className="text-xs text-brand-accent font-medium uppercase">{appliedCoupon.code} Applied</span>
                          <button onClick={() => setAppliedCoupon(null)} className="text-brand-accent hover:text-white transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-400">Subtotal</span>
                        <span className="text-white">${totals.subtotal.toFixed(2)}</span>
                      </div>
                      {totals.discount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-emerald-500">Discount</span>
                          <span className="text-emerald-500">-${totals.discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-400">Shipping</span>
                        <span className="text-white">{totals.shipping === 0 ? "Free" : `$${totals.shipping.toFixed(2)}`}</span>
                      </div>
                      <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                        <span className="text-lg font-serif font-bold text-white uppercase tracking-tighter">Total</span>
                        <span className="text-2xl font-bold text-brand-accent">${totals.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" size="lg" onClick={nextStep}>
                      Proceed to Shipping
                      <ArrowRight className="ml-2" size={18} />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </motion.div>
          )}

          {/* STEP 2: SHIPPING INFO */}
          {step === "shipping" && (
            <motion.div
              key="shipping"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-white/5 bg-zinc-950/50 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="text-brand-accent" size={20} />
                      Shipping Details
                    </CardTitle>
                    <CardDescription>Enter the address where you would like to receive your items.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullname">Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                            <Input id="fullname" placeholder="John Doe" className="pl-10 bg-white/5 border-white/10" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                            <Input id="email" type="email" placeholder="john@example.com" className="pl-10 bg-white/5 border-white/10" required />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                          <Input id="phone" placeholder="+1 (555) 000-0000" className="pl-10 bg-white/5 border-white/10" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                          <Input id="address" placeholder="123 Luxury Ave" className="pl-10 bg-white/5 border-white/10" required />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" placeholder="New York" className="bg-white/5 border-white/10" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zip">ZIP / Postal</Label>
                          <Input id="zip" placeholder="10001" className="bg-white/5 border-white/10" required />
                        </div>
                        <div className="col-span-2 md:col-span-1 space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Input id="country" placeholder="United States" className="bg-white/5 border-white/10" required />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 pt-2">
                        <Checkbox id="saveAddress" />
                        <Label htmlFor="saveAddress" className="text-xs font-normal">Save this address for future orders</Label>
                      </div>
                    </form>
                  </CardContent>
                </Card>
                <div className="flex justify-between">
                  <Button variant="ghost" onClick={prevStep} className="text-zinc-400">
                    <ChevronLeft className="mr-2" size={16} />
                    Back to Selection
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <Card className="border-white/5 bg-zinc-950/50 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-lg">Delivery Method</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border-2 border-brand-accent bg-brand-accent/5 rounded-sm flex justify-between items-center cursor-pointer">
                      <div>
                        <p className="font-bold text-white uppercase tracking-widest text-xs">Express Delivery</p>
                        <p className="text-zinc-500 text-sm mt-1">2-4 Business Days</p>
                      </div>
                      <span className="text-brand-accent font-bold">${totals.shipping.toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-white/5 bg-zinc-950/50 backdrop-blur-xl">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-white font-medium">Order Total</span>
                            <span className="text-2xl font-bold text-brand-accent">${totals.total.toFixed(2)}</span>
                        </div>
                        <Button className="w-full" size="lg" onClick={nextStep}>
                            Proceed to Payment
                            <ArrowRight className="ml-2" size={18} />
                        </Button>
                    </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* STEP 3: PAYMENT */}
          {step === "payment" && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-white/5 bg-zinc-950/50 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="text-brand-accent" size={20} />
                      Payment Method
                    </CardTitle>
                    <CardDescription>All transactions are secure and encrypted.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="space-y-4">
                        <div className="p-4 border-2 border-brand-accent bg-brand-accent/5 rounded-sm flex items-center gap-4 cursor-pointer">
                            <div className="w-4 h-4 rounded-full border-4 border-brand-accent" />
                            <div className="flex-1">
                                <p className="font-bold text-white uppercase tracking-widest text-xs">Credit / Debit Card</p>
                                <div className="flex gap-2 mt-2">
                                    <div className="h-6 w-10 bg-zinc-800 rounded flex items-center justify-center text-[10px] font-bold text-zinc-500">VISA</div>
                                    <div className="h-6 w-10 bg-zinc-800 rounded flex items-center justify-center text-[10px] font-bold text-zinc-500">MC</div>
                                    <div className="h-6 w-10 bg-zinc-800 rounded flex items-center justify-center text-[10px] font-bold text-zinc-500">AMEX</div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 space-y-6 bg-white/[0.02] border border-white/5 rounded-sm">
                            <div className="space-y-2">
                                <Label htmlFor="cardnumber">Card Number</Label>
                                <div className="relative">
                                    <CreditCard className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                                    <Input id="cardnumber" placeholder="0000 0000 0000 0000" className="pl-10 bg-zinc-950/50 border-white/10" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="expiry">Expiry Date</Label>
                                    <Input id="expiry" placeholder="MM / YY" className="bg-zinc-950/50 border-white/10" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cvv">CVV</Label>
                                    <Input id="cvv" placeholder="123" className="bg-zinc-950/50 border-white/10" />
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border border-white/10 hover:border-white/20 rounded-sm flex items-center gap-4 cursor-pointer transition-colors">
                            <div className="w-4 h-4 rounded-full border border-white/20" />
                            <div className="flex-1">
                                <p className="font-bold text-zinc-300 uppercase tracking-widest text-xs">Cash on Delivery</p>
                                <p className="text-zinc-500 text-xs mt-1">Pay with cash upon arrival</p>
                            </div>
                        </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="flex justify-between">
                  <Button variant="ghost" onClick={prevStep} className="text-zinc-400">
                    <ChevronLeft className="mr-2" size={16} />
                    Back to Shipping
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <Card className="border-white/5 bg-zinc-950/50 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-lg">Final Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-400">Subtotal</span>
                            <span className="text-white">${totals.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-400">Shipping</span>
                            <span className="text-white">${totals.shipping.toFixed(2)}</span>
                        </div>
                        {totals.discount > 0 && (
                            <div className="flex justify-between text-sm">
                                <span className="text-emerald-500">Discount</span>
                                <span className="text-emerald-500">-${totals.discount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                            <span className="text-white font-bold">Payable Amount</span>
                            <span className="text-2xl font-bold text-brand-accent">${totals.total.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="pt-6 space-y-4">
                        <div className="flex gap-2 text-[10px] text-zinc-500 uppercase tracking-widest text-center justify-center">
                            <ShieldCheck size={12} className="text-brand-accent" />
                            100% Secure Transaction
                        </div>
                        <Button className="w-full" size="lg" onClick={handlePlaceOrder} isLoading={isLoading}>
                            Complete Purchase
                        </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* STEP 4: CONFIRMATION */}
          {step === "confirmation" && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center py-12"
            >
              <div className="mb-8 flex justify-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-24 h-24 rounded-full bg-brand-accent/20 flex items-center justify-center border-2 border-brand-accent"
                >
                    <CheckCircle2 className="text-brand-accent" size={48} />
                </motion.div>
              </div>

              <h1 className="text-4xl font-serif font-bold text-white mb-2">Order Confirmed</h1>
              <p className="text-zinc-500 mb-8 uppercase tracking-[0.2em] text-sm">Thank you for your purchase</p>

              <Card className="border-white/5 bg-zinc-950/50 mb-8 overflow-hidden">
                <div className="bg-brand-accent/10 border-b border-brand-accent/10 py-3 px-6 flex justify-between items-center">
                    <span className="text-xs uppercase tracking-widest text-brand-accent font-bold">Order ID</span>
                    <span className="text-white font-mono">{orderId}</span>
                </div>
                <CardContent className="p-8">
                    <p className="text-zinc-400 text-sm mb-6">
                        An email confirmation has been sent to your inbox. We'll notify you once your package is on its way.
                    </p>
                    <div className="space-y-4 text-left border-t border-white/5 pt-6">
                        <div className="flex justify-between">
                            <span className="text-zinc-500 text-sm">Status</span>
                            <Badge variant="warning">Processing</Badge>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-zinc-500 text-sm">Estimated Delivery</span>
                            <span className="text-white text-sm font-medium">May 28 - May 30, 2026</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-zinc-500 text-sm">Total Amount</span>
                            <span className="text-brand-accent text-lg font-bold">${totals.total.toFixed(2)}</span>
                        </div>
                    </div>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                    <Link href="/">
                      <span>Continue Shopping</span>
                    </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                    <Link href="/profile">
                      <span>Track Order</span>
                    </Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function ShieldCheck({ size, className }: { size?: number, className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || 24}
            height={size || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    )
}
