"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, Lock, Globe, Apple } from "lucide-react"
import { motion } from "framer-motion"
import { useUserStore } from "@/lib/store/userStore"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Checkbox } from "@/components/ui/Checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"

export default function LoginPage() {
  const router = useRouter()
  const login = useUserStore((state) => state.login)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      login({
        id: "1",
        name: "Jane Doe",
        email: email || "jane@example.com",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
        wishlist: [],
        orders: [],
        addresses: ["123 Luxury Ave, Beverly Hills, CA"],
      })
      setIsLoading(false)
      router.push("/profile")
    }, 1500)
  }

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
            <CardTitle className="text-4xl italic">Welcome Back</CardTitle>
            <CardDescription className="text-muted font-medium uppercase tracking-widest text-[10px]">
              Access your private collection account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-8">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full border-border bg-primary/30 hover:bg-primary text-muted font-bold text-[10px]">
                <Globe className="mr-2 h-3.5 w-3.5" />
                GOOGLE
              </Button>
              <Button variant="outline" className="w-full border-border bg-primary/30 hover:bg-primary text-muted font-bold text-[10px]">
                <Apple className="mr-2 h-3.5 w-3.5" />
                APPLE
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-[0.3em]">
                <span className="bg-surface px-4 text-muted">Or</span>
              </div>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="NAME@DOMAIN.COM"
                    className="pl-10 bg-primary/20 border-border uppercase font-bold text-[11px] tracking-widest"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-[10px] text-sageDark font-bold uppercase tracking-widest hover:underline"
                  >
                    Forgot?
                  </Link>
                </div>
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
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-[10px] font-bold text-muted uppercase tracking-widest leading-none">
                  Stay signed in
                </Label>
              </div>
              <Button type="submit" className="w-full mt-4 h-12 shadow-lg shadow-sageDark/20" isLoading={isLoading}>
                SIGN IN
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-center gap-1 text-[10px] font-bold text-muted uppercase tracking-widest pt-4">
            New here?{" "}
            <Link href="/auth/signup" className="text-sageDark hover:underline">
              Join the Bazaar
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
