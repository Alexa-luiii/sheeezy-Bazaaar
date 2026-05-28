"use client"

import React, { useState } from "react"
import {
  ShoppingBag,
  Search,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Package,
  Truck,
  CheckCircle,
  Clock,
  User,
  MapPin,
  CreditCard,
  Mail,
  Phone
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { Card, CardContent } from "@/components/ui/Card"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function AdminOrdersPage() {
  const [activeTab, setActiveTab] = useState("All")
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const tabs = ["All", "Pending", "Shipped", "Delivered", "Cancelled"]

  // Mock orders data
  const orders = [
    {
        id: "ORD-7234",
        customer: "Jane Cooper",
        email: "jane@example.com",
        phone: "+1 234 567 890",
        total: 1250.00,
        status: "Delivered",
        date: "24 May 2026",
        items: [
            { id: "wc-1", title: "Midnight Silk Evening Gown", price: 850, quantity: 1, image: "https://images.unsplash.com/photo-1539008835270-303595508391?q=80&w=200" },
            { id: "wc-2", title: "Golden Embrace Heels", price: 400, quantity: 1, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=200" }
        ],
        address: "123 Luxury Lane, Beverly Hills, CA 90210",
        payment: "Visa ending in 4242"
    },
    {
        id: "ORD-8912",
        customer: "Robert Fox",
        email: "robert@example.com",
        phone: "+1 987 654 321",
        total: 450.00,
        status: "Pending",
        date: "25 May 2026",
        items: [
            { id: "sb-1", title: "Azure Velvet Blazer", price: 450, quantity: 1, image: "https://images.unsplash.com/photo-1594932224010-74f43a183546?q=80&w=200" }
        ],
        address: "456 Fashion Ave, New York, NY 10001",
        payment: "Mastercard ending in 8888"
    },
    {
        id: "ORD-9210",
        customer: "Cody Fisher",
        email: "cody@example.com",
        phone: "+1 555 123 456",
        total: 2100.00,
        status: "Shipped",
        date: "25 May 2026",
        items: [
            { id: "bg-1", title: "Noir Leather Clutch", price: 2100, quantity: 1, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=200" }
        ],
        address: "789 Elite Blvd, Miami, FL 33101",
        payment: "Apple Pay"
    }
  ]

  const filteredOrders = orders.filter(order => {
    const matchesTab = activeTab === "All" || order.status === activeTab
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTab && matchesSearch
  })

  const toggleOrder = (id: string) => {
    setExpandedOrder(expandedOrder === id ? null : id)
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      <div>
        <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Orders</h1>
        <p className="text-zinc-500 mt-1 uppercase tracking-[0.2em] text-xs font-medium">Fulfill and track customer purchases</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex bg-zinc-950 border border-white/5 p-1 rounded-sm overflow-x-auto no-scrollbar">
            {tabs.map(tab => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                        "px-6 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap",
                        activeTab === tab ? "bg-brand-accent text-brand-primary" : "text-zinc-500 hover:text-white"
                    )}
                >
                    {tab}
                </button>
            ))}
        </div>
        <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 text-zinc-500" size={18} />
            <Input
                placeholder="Search orders..."
                className="pl-10 bg-zinc-950 border-white/10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      <Card className="border-white/5 bg-zinc-950/50 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                    <tr>
                        <th className="px-6 py-4 font-bold w-12"></th>
                        <th className="px-6 py-4 font-bold">Order ID</th>
                        <th className="px-6 py-4 font-bold">Customer</th>
                        <th className="px-6 py-4 font-bold">Total</th>
                        <th className="px-6 py-4 font-bold">Status</th>
                        <th className="px-6 py-4 font-bold">Date</th>
                        <th className="px-6 py-4 font-bold text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {filteredOrders.map((order) => (
                        <React.Fragment key={order.id}>
                            <tr
                                className={cn(
                                    "hover:bg-white/[0.02] transition-colors group cursor-pointer",
                                    expandedOrder === order.id && "bg-white/[0.03]"
                                )}
                                onClick={() => toggleOrder(order.id)}
                            >
                                <td className="px-6 py-4">
                                    {expandedOrder === order.id ? <ChevronUp size={16} className="text-brand-accent" /> : <ChevronDown size={16} className="text-zinc-500" />}
                                </td>
                                <td className="px-6 py-4 font-mono font-bold text-zinc-300">{order.id}</td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-white font-medium">{order.customer}</span>
                                        <span className="text-[10px] text-zinc-500">{order.email}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-bold text-white">${order.total.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <Badge variant={
                                        order.status === 'Delivered' ? 'success' :
                                        order.status === 'Shipped' ? 'outline' :
                                        order.status === 'Pending' ? 'warning' : 'danger'
                                    }>
                                        {order.status}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 text-zinc-400">{order.date}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-zinc-500 hover:text-brand-accent">
                                        <ExternalLink size={16} />
                                    </button>
                                </td>
                            </tr>
                            {expandedOrder === order.id && (
                                <tr className="bg-white/[0.03]">
                                    <td colSpan={7} className="px-12 py-8 border-t border-white/5">
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                            {/* Order Items */}
                                            <div className="lg:col-span-2 space-y-4">
                                                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-4">Order Items</h4>
                                                {order.items.map((item) => (
                                                    <div key={item.id} className="flex gap-4 items-center bg-black/20 p-3 rounded-sm border border-white/5">
                                                        <div className="w-16 h-20 relative rounded-sm overflow-hidden bg-zinc-900 shrink-0">
                                                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-white font-medium">{item.title}</p>
                                                            <p className="text-xs text-zinc-500 mt-1">Qty: {item.quantity} × ${item.price}</p>
                                                        </div>
                                                        <p className="font-bold text-white">${item.price * item.quantity}</p>
                                                    </div>
                                                ))}
                                                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                                                    <p className="text-zinc-500 text-sm">Status Update:</p>
                                                    <div className="flex gap-2">
                                                        <Button variant="outline" size="sm" className="h-8 text-[10px] uppercase tracking-widest">Mark as Shipped</Button>
                                                        <Button variant="primary" size="sm" className="h-8 text-[10px] uppercase tracking-widest">Mark as Delivered</Button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Customer & Delivery */}
                                            <div className="space-y-6">
                                                <div className="space-y-3">
                                                    <h4 className="text-xs font-bold uppercase tracking-widest text-brand-accent">Customer Details</h4>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-3 text-sm text-zinc-300">
                                                            <Mail size={14} className="text-zinc-500" />
                                                            {order.email}
                                                        </div>
                                                        <div className="flex items-center gap-3 text-sm text-zinc-300">
                                                            <Phone size={14} className="text-zinc-500" />
                                                            {order.phone}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <h4 className="text-xs font-bold uppercase tracking-widest text-brand-accent">Shipping Address</h4>
                                                    <div className="flex items-start gap-3 text-sm text-zinc-300 leading-relaxed">
                                                        <MapPin size={14} className="text-zinc-500 shrink-0 mt-1" />
                                                        {order.address}
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <h4 className="text-xs font-bold uppercase tracking-widest text-brand-accent">Payment Information</h4>
                                                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                                                        <CreditCard size={14} className="text-zinc-500" />
                                                        {order.payment}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
      </Card>
    </div>
  )
}
