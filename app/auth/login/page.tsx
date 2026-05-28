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
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-white/5 bg-zinc-950/50 backdrop-blur-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl tracking-tight">Welcome Back</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full bg-white/5 border-white/10 hover:bg-white/10">
                <Globe className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button variant="outline" className="w-full bg-white/5 border-white/10 hover:bg-white/10">
                <Apple className="mr-2 h-4 w-4" />
                Apple
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-950 px-2 text-zinc-500">Or continue with</span>
              </div>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
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
                    className="text-xs text-brand-accent hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
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
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-xs font-normal">
                  Remember me for 30 days
                </Label>
              </div>
              <Button type="submit" className="w-full mt-4" isLoading={isLoading}>
                Sign In
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-center gap-1 text-sm text-zinc-500">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-brand-accent hover:underline font-medium">
              Create an account
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
