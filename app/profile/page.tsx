"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { User, ShoppingBag, Heart, MapPin, LogOut, Camera, Plus, ChevronRight, Package, CreditCard } from "lucide-react"
import { useUserStore } from "@/lib/store/userStore"
import { products } from "@/data/products"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Badge } from "@/components/ui/Badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export default function ProfilePage() {
  const router = useRouter()
  const { user, isLoggedIn, logout, updateUser } = useUserStore()
  const [activeTab, setActiveTab] = useState("profile")
  const [isUpdating, setIsUpdating] = useState(false)

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth/login")
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn || !user) return null

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdating(true)
    setTimeout(() => {
      setIsUpdating(false)
      // Actual update logic would go here
    }, 1000)
  }

  // Mock data for demonstration
  const mockOrders = [
    {
      id: "ORD-7234",
      date: "May 12, 2026",
      total: 1250.00,
      status: "delivered",
      items: 2
    },
    {
      id: "ORD-8912",
      date: "May 20, 2026",
      total: 450.00,
      status: "processing",
      items: 1
    }
  ]

  const wishlistedProducts = products.filter(p => user.wishlist.includes(p.id))

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Sidebar / User Info */}
        <Card className="w-full md:w-80 border-border bg-surface/50 backdrop-blur-xl shrink-0">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-sageDark/20">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 p-1.5 bg-sageDark text-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera size={14} />
                </button>
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold text-text">{user.name}</h2>
                <p className="text-sm text-muted">{user.email}</p>
              </div>
              <div className="w-full pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500 hover:text-red-400 hover:bg-red-500/10"
                  onClick={() => {
                    logout()
                    router.push("/")
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="flex-1 w-full">
          <Tabs activeValue={activeTab}>
            <TabsList className="justify-start overflow-x-auto no-scrollbar">
              <TabsTrigger
                active={activeTab === "profile"}
                onClick={() => setActiveTab("profile")}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger
                active={activeTab === "orders"}
                onClick={() => setActiveTab("orders")}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Orders
              </TabsTrigger>
              <TabsTrigger
                active={activeTab === "wishlist"}
                onClick={() => setActiveTab("wishlist")}
              >
                <Heart className="mr-2 h-4 w-4" />
                Wishlist
              </TabsTrigger>
              <TabsTrigger
                active={activeTab === "addresses"}
                onClick={() => setActiveTab("addresses")}
              >
                <MapPin className="mr-2 h-4 w-4" />
                Addresses
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="border-border bg-surface/50">
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Update your profile details and management preferences.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleUpdateProfile} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue={user.name} className="bg-primary border-border" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" defaultValue={user.email} className="bg-primary border-border" disabled />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bio">About (Optional)</Label>
                          <textarea
                            id="bio"
                            rows={4}
                            className="w-full rounded-sm border border-border bg-primary px-3 py-2 text-sm text-text placeholder:text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sageDark transition-all"
                            placeholder="Tell us a bit about your style..."
                          />
                        </div>
                        <Button type="submit" isLoading={isUpdating}>Save Changes</Button>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {mockOrders.length > 0 ? (
                    mockOrders.map((order) => (
                      <Card key={order.id} className="border-border bg-surface/50 hover:border-sageDark/20 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className="p-3 rounded-full bg-sageDark/10 text-sageDark">
                                <Package size={24} />
                              </div>
                              <div>
                                <h3 className="font-medium text-text">{order.id}</h3>
                                <p className="text-sm text-muted">{order.date} • {order.items} items</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-6">
                              <div className="text-right">
                                <p className="font-bold text-text">${order.total.toFixed(2)}</p>
                                <Badge variant={order.status === 'delivered' ? 'success' : 'warning'}>
                                  {order.status}
                                </Badge>
                              </div>
                              <Button variant="ghost" size="icon">
                                <ChevronRight size={20} />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-20 bg-surface/30 rounded-sm border border-dashed border-border">
                      <ShoppingBag className="mx-auto h-12 w-12 text-muted mb-4" />
                      <h3 className="text-lg font-medium text-text">No orders yet</h3>
                      <p className="text-muted mt-1">When you place an order, it will appear here.</p>
                      <Button variant="outline" className="mt-6" asChild>
                        <Link href="/">Start Shopping</Link>
                      </Button>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Wishlist Tab */}
              {activeTab === "wishlist" && (
                <motion.div
                  key="wishlist"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {wishlistedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlistedProducts.map((product) => (
                        <Card key={product.id} className="group overflow-hidden border-border bg-surface/50">
                          <div className="relative aspect-[3/4] overflow-hidden">
                            <Image
                              src={product.images[0]}
                              alt={product.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-surface/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <Button variant="primary" size="sm" asChild>
                                    <Link href={`/product/${product.id}`}>View Details</Link>
                                </Button>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h4 className="font-medium text-text truncate">{product.title}</h4>
                            <p className="text-sageDark font-bold mt-1">${product.price}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20 bg-surface/30 rounded-sm border border-dashed border-border">
                      <Heart className="mx-auto h-12 w-12 text-muted mb-4" />
                      <h3 className="text-lg font-medium text-text">Your wishlist is empty</h3>
                      <p className="text-muted mt-1">Save items you love to find them easily later.</p>
                      <Button variant="outline" className="mt-6" asChild>
                        <Link href="/">Explore Collection</Link>
                      </Button>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <motion.div
                  key="addresses"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {user.addresses.map((address, index) => (
                    <Card key={index} className="border-border bg-surface/50 border-sageDark/30">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="p-2 rounded-full bg-sageDark/10 text-sageDark">
                            <MapPin size={18} />
                          </div>
                          <Badge variant="outline">Default</Badge>
                        </div>
                        <p className="text-text leading-relaxed">{address}</p>
                        <div className="flex gap-4 mt-6 pt-6 border-t border-border">
                          <button className="text-sm text-muted hover:text-text transition-colors">Edit</button>
                          <button className="text-sm text-red-500/70 hover:text-red-500 transition-colors">Delete</button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <button className="flex flex-col items-center justify-center gap-3 p-8 rounded-sm border border-dashed border-border bg-surface/[0.02] hover:bg-surface/[0.05] hover:border-sageDark/40 transition-all text-muted hover:text-text group">
                    <div className="p-3 rounded-full bg-primary group-hover:bg-sageDark/10 group-hover:text-sageDark transition-colors">
                      <Plus size={24} />
                    </div>
                    <span className="font-medium tracking-wide uppercase text-xs">Add New Address</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
