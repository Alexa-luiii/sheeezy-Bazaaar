"use client"

import React, { useState, useEffect } from "react"
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  AlertTriangle,
  ChevronRight
} from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { products } from "@/data/products"
import Link from "next/link"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function AdminDashboard() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const stats = [
    { name: "Total Revenue", value: "$452,102", change: "+12.5%", trend: "up", icon: TrendingUp },
    { name: "Total Orders", value: "3,242", change: "+8.2%", trend: "up", icon: ShoppingBag },
    { name: "New Customers", value: "1,142", change: "-2.4%", trend: "down", icon: Users },
    { name: "Active Products", value: products.length.toString(), change: "+3.1%", trend: "up", icon: Package },
  ]

  const recentOrders = [
    { id: "ORD-1234", customer: "Sophia Lauren", total: "$1,250", status: "Delivered", date: "2 mins ago" },
    { id: "ORD-1235", customer: "James Miller", total: "$450", status: "Pending", date: "15 mins ago" },
    { id: "ORD-1236", customer: "Elena Wright", total: "$2,100", status: "Shipped", date: "1 hour ago" },
    { id: "ORD-1237", customer: "Michael Chen", total: "$890", status: "Delivered", date: "3 hours ago" },
    { id: "ORD-1238", customer: "Sarah Connor", total: "$1,150", status: "Pending", date: "5 hours ago" },
  ]

  const lowStockProducts = products.filter(p => p.stock < 10).slice(0, 4)

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-zinc-500 mt-1 uppercase tracking-[0.2em] text-xs font-medium">Platform Performance at a glance</p>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">Export Report</Button>
            <Button size="sm">Add Product</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-white/5 bg-zinc-950/50 hover:border-brand-accent/30 transition-all group">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="p-2 rounded-sm bg-white/5 group-hover:bg-brand-accent/10 transition-colors">
                    <stat.icon className="text-zinc-400 group-hover:text-brand-accent transition-colors" size={20} />
                  </div>
                  <div className={cn(
                    "flex items-center gap-1 text-xs font-bold",
                    stat.trend === "up" ? "text-emerald-500" : "text-red-500"
                  )}>
                    {stat.change}
                    {stat.trend === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest">{stat.name}</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart Mockup */}
        <Card className="lg:col-span-2 border-white/5 bg-zinc-950/50">
          <CardHeader className="flex flex-row items-center justify-between pb-8">
            <div>
              <CardTitle className="text-lg">Sales Revenue</CardTitle>
              <CardDescription>Visual summary of recent daily earnings.</CardDescription>
            </div>
            <select className="bg-white/5 border border-white/10 rounded-sm text-xs px-2 py-1 outline-none">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
            </select>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-end justify-between gap-4 px-4 pt-10">
              {[65, 45, 85, 30, 95, 55, 75].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                  <div className="relative w-full">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: isLoaded ? `${val}%` : 0 }}
                      transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                      className="w-full bg-brand-accent/20 border-t-2 border-brand-accent group-hover:bg-brand-accent/40 transition-all rounded-t-sm"
                    />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800 text-[10px] px-1.5 py-0.5 rounded text-white font-bold">
                        ${(val * 120).toLocaleString()}
                    </div>
                  </div>
                  <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card className="border-white/5 bg-zinc-950/50">
          <CardHeader>
            <div className="flex items-center gap-2">
                <AlertTriangle className="text-amber-500" size={18} />
                <CardTitle className="text-lg">Low Stock Alerts</CardTitle>
            </div>
            <CardDescription>Items needing immediate restock.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/5">
                {lowStockProducts.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 p-4 hover:bg-white/[0.02] transition-colors group">
                        <div className="w-12 h-12 relative rounded-sm overflow-hidden bg-zinc-900 border border-white/5 flex-shrink-0">
                            <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-white truncate">{product.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge variant="danger" className="text-[9px] py-0 px-1.5">{product.stock} left</Badge>
                                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{product.category}</span>
                            </div>
                        </div>
                        <button className="p-2 text-zinc-500 hover:text-brand-accent opacity-0 group-hover:opacity-100 transition-all">
                            <MoreVertical size={16} />
                        </button>
                    </div>
                ))}
            </div>
            <div className="p-4 border-t border-white/5">
                <Button variant="ghost" className="w-full text-xs uppercase tracking-widest text-zinc-400 hover:text-white" asChild>
                    <Link href="/admin/products">
                        View All Inventory
                        <ChevronRight size={14} className="ml-1" />
                    </Link>
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card className="border-white/5 bg-zinc-950/50 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="text-lg">Recent Orders</CardTitle>
                <CardDescription>Most recent transactions on the platform.</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
                <Link href="/admin/orders">View All</Link>
            </Button>
        </CardHeader>
        <CardContent className="p-0">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                        <tr>
                            <th className="px-6 py-4 font-bold">Order ID</th>
                            <th className="px-6 py-4 font-bold">Customer</th>
                            <th className="px-6 py-4 font-bold">Total</th>
                            <th className="px-6 py-4 font-bold">Status</th>
                            <th className="px-6 py-4 font-bold text-right">Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {recentOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                                <td className="px-6 py-4 font-mono text-zinc-300">{order.id}</td>
                                <td className="px-6 py-4 font-medium text-white">{order.customer}</td>
                                <td className="px-6 py-4 text-brand-accent font-bold">{order.total}</td>
                                <td className="px-6 py-4">
                                    <Badge variant={
                                        order.status === 'Delivered' ? 'success' :
                                        order.status === 'Shipped' ? 'outline' : 'warning'
                                    }>
                                        {order.status}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 text-zinc-500 text-right text-xs">{order.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
