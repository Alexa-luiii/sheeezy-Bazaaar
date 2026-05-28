"use client"

import React, { useState } from "react"
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Package,
  TrendingUp,
  Tag
} from "lucide-react"
import { products } from "@/data/products"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { Card, CardContent } from "@/components/ui/Card"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))]

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">Products</h1>
          <p className="text-zinc-500 mt-1 uppercase tracking-[0.2em] text-xs font-medium">Manage your boutique inventory</p>
        </div>
        <Button asChild>
            <Link href="/admin/products/new">
                <Plus className="mr-2" size={18} />
                Add New Product
            </Link>
        </Button>
      </div>

      {/* Filters Bar */}
      <Card className="border-white/5 bg-zinc-950/50">
        <CardContent className="p-4 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-3 text-zinc-500" size={18} />
                <Input
                    placeholder="Search by name, brand..."
                    className="pl-10 bg-white/5 border-white/10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                            "px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap border",
                            selectedCategory === cat
                                ? "bg-brand-accent border-brand-accent text-brand-primary"
                                : "bg-white/5 border-white/5 text-zinc-400 hover:text-white hover:border-white/20"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="border-white/5 bg-zinc-950/50 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                    <tr>
                        <th className="px-6 py-4 font-bold">Product</th>
                        <th className="px-6 py-4 font-bold">Category</th>
                        <th className="px-6 py-4 font-bold">Price</th>
                        <th className="px-6 py-4 font-bold">Stock</th>
                        <th className="px-6 py-4 font-bold">Status</th>
                        <th className="px-6 py-4 font-bold text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-14 relative rounded-sm overflow-hidden bg-zinc-900 flex-shrink-0 border border-white/5">
                                        <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-white font-medium truncate">{product.title}</p>
                                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-0.5">{product.brand}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-zinc-400 font-medium">{product.category}</span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col">
                                    <span className="text-white font-bold">${product.price}</span>
                                    {product.discount > 0 && (
                                        <span className="text-[10px] text-emerald-500 font-bold">{product.discount}% OFF</span>
                                    )}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <div className={cn(
                                        "w-1.5 h-1.5 rounded-full",
                                        product.stock > 15 ? "bg-emerald-500" :
                                        product.stock > 5 ? "bg-amber-500" : "bg-red-500"
                                    )} />
                                    <span className="text-zinc-300">{product.stock} Units</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <Badge variant={product.stock > 0 ? "success" : "danger"}>
                                    {product.stock > 0 ? "Active" : "Out of Stock"}
                                </Badge>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white">
                                        <Edit size={16} />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-red-500">
                                        <Trash2 size={16} />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-brand-accent" asChild>
                                        <Link href={`/product/${product.id}`} target="_blank">
                                            <Eye size={16} />
                                        </Link>
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium">
                Showing <span className="text-white">{filteredProducts.length}</span> of <span className="text-white">{products.length}</span> products
            </p>
            <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled className="h-8 px-2">
                    <ChevronLeft size={16} />
                </Button>
                <Button variant="outline" size="sm" disabled className="h-8 px-2">
                    <ChevronRight size={16} />
                </Button>
            </div>
        </div>
      </Card>
    </div>
  )
}
