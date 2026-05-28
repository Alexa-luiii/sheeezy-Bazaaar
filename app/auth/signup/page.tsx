"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, Lock, User, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Checkbox } from "@/components/ui/Checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { cn } from "@/lib/utils"

export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [strength, setStrength] = useState(0)

  useEffect(() => {
    // Basic password strength logic
    let s = 0
    if (password.length > 6) s++
    if (password.length > 10) s++
    if (/[A-Z]/.test(password)) s++
    if (/[0-9]/.test(password)) s++
    if (/[^A-Za-z0-9]/.test(password)) s++
    setStrength(s)
  }, [password])

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/auth/login")
    }, 1500)
  }

  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Immortal"]
  const strengthColors = [
    "bg-red-400",
    "bg-red-300",
    "bg-accent",
    "bg-accent/80",
    "bg-sage",
    "bg-sageDark",
  ]

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-primary">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="border-border bg-surface shadow-2xl">
          <CardHeader className="space-y-2 text-center pb-8">
            <CardTitle className="text-4xl italic">Join the Bazaar</CardTitle>
            <CardDescription className="text-muted font-medium uppercase tracking-widest text-[10px]">
              Discover curated luxury and bespoke elegance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted" />
                  <Input
                    id="name"
                    placeholder="YOUR NAME"
                    className="pl-10 bg-primary/20 border-border font-bold text-[11px] tracking-widest uppercase"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="NAME@DOMAIN.COM"
                    className="pl-10 bg-primary/20 border-border font-bold text-[11px] tracking-widest uppercase"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted" />
                  <Input
                    id="password"
                    type="password"
                    className="pl-10 bg-primary/20 border-border"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {password && (
                  <div className="space-y-2 pt-1">
                    <div className="flex h-1 gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            "h-full w-full rounded-full transition-colors",
                            i < strength ? strengthColors[strength] : "bg-primary"
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-[9px] uppercase tracking-widest font-bold text-muted">
                      Security: <span className="text-sageDark">{strengthLabels[strength]}</span>
                    </p>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm</Label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3 top-3 h-4 w-4 text-muted" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    className="pl-10 bg-primary/20 border-border"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-start space-x-3 pt-2">
                <Checkbox id="terms" required className="mt-1" />
                <Label htmlFor="terms" className="text-[10px] font-bold text-muted uppercase tracking-widest leading-normal">
                  I accept the <span className="text-sageDark underline cursor-pointer">Membership Terms</span> and <span className="text-sageDark underline cursor-pointer">Privacy Charter</span>
                </Label>
              </div>
              <Button type="submit" className="w-full mt-6 h-12 shadow-lg shadow-sageDark/20" isLoading={isLoading}>
                CREATE ACCOUNT
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-center gap-1 text-[10px] font-bold text-muted uppercase tracking-widest pt-4">
            Already a member?{" "}
            <Link href="/auth/login" className="text-sageDark hover:underline">
              Sign in
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
