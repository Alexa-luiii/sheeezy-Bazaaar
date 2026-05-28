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

  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"]
  const strengthColors = [
    "bg-red-500",
    "bg-red-400",
    "bg-amber-500",
    "bg-amber-400",
    "bg-emerald-500",
    "bg-emerald-400",
  ]

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-white/5 bg-zinc-950/50 backdrop-blur-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl tracking-tight">Join the Bazaar</CardTitle>
            <CardDescription>
              Create your account to start shopping our curated collection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  <Input
                    id="name"
                    placeholder="Jane Doe"
                    className="pl-10 bg-white/5 border-white/10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10 bg-white/5 border-white/10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  <Input
                    id="password"
                    type="password"
                    className="pl-10 bg-white/5 border-white/10"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {password && (
                  <div className="space-y-1.5 pt-1">
                    <div className="flex h-1 gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            "h-full w-full rounded-full transition-colors",
                            i < strength ? strengthColors[strength] : "bg-zinc-800"
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500">
                      Strength: <span className="text-zinc-300">{strengthLabels[strength]}</span>
                    </p>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    className="pl-10 bg-white/5 border-white/10"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-start space-x-2 pt-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-xs font-normal leading-tight">
                  I agree to the{" "}
                  <Link href="/terms" className="text-brand-accent hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-brand-accent hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
                Create Account
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-center gap-1 text-sm text-zinc-500">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-brand-accent hover:underline font-medium">
              Sign in
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
