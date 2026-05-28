"use client"

import React, { useState } from "react"
import {
  ArrowLeft,
  Upload,
  Plus,
  X,
  Image as ImageIcon,
  Save,
  Eye,
  Info,
  TrendingUp
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { cn } from "@/lib/utils"
import Link from "next/link"
import ProductCard from "@/components/product/ProductCard"
import { Product } from "@/types"

export default function NewProductPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    stock: "",
    images: ["", ""],
    sizes: "XS, S, M, L, XL",
    colors: "Black, Gold, Silver",
    tags: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images]
    newImages[index] = value
    setFormData(prev => ({ ...prev, images: newImages }))
  }

  // Preview product object
  const previewProduct: Product = {
    id: "preview",
    title: formData.title || "Product Title Preview",
    brand: formData.brand || "Brand Name",
    description: formData.description || "Product description will appear here...",
    price: Number(formData.price) || 0,
    originalPrice: Number(formData.originalPrice) || 0,
    discount: formData.price && formData.originalPrice
      ? Math.round((1 - Number(formData.price) / Number(formData.originalPrice)) * 100)
      : 0,
    images: formData.images.filter(img => img !== "") || ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"],
    category: formData.category || "Uncategorized",
    rating: 4.5,
    reviewCount: 0,
    soldCount: 0,
    stock: Number(formData.stock) || 0,
    tags: formData.tags.split(",").map(t => t.trim()),
    sizes: formData.sizes.split(",").map(s => s.trim()),
    colors: formData.colors.split(",").map(c => c.trim()),
    shipping: { type: "Express", cost: 0 },
    estimatedDelivery: "3-5 Days",
    isTrending: false,
    isDeal: false,
    isLimited: false
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="text-muted">
            <Link href="/admin/products"><ArrowLeft size={20} /></Link>
        </Button>
        <div>
          <h1 className="text-3xl font-serif font-bold text-text tracking-tight">Add New Product</h1>
          <p className="text-muted mt-1 uppercase tracking-[0.2em] text-xs font-medium">Introduce a new masterpiece to the collection</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <Card className="border-border bg-surface/50">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Info className="text-sageDark" size={18} />
                    <CardTitle className="text-lg">Product Details</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Product Title</Label>
                        <Input id="title" placeholder="e.g. Silk Evening Gown" className="bg-primary border-border" value={formData.title} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="brand">Brand Name</Label>
                        <Input id="brand" placeholder="e.g. Maison Luxury" className="bg-primary border-border" value={formData.brand} onChange={handleChange} />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Full Description</Label>
                    <textarea
                        id="description"
                        rows={5}
                        className="w-full bg-primary border border-border rounded-sm p-3 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-sageDark"
                        placeholder="Describe the material, fit, and essence of the product..."
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input id="category" placeholder="Dresses" className="bg-primary border-border" value={formData.category} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="stock">Available Stock</Label>
                        <Input id="stock" type="number" placeholder="50" className="bg-primary border-border" value={formData.stock} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="tags">Tags (comma separated)</Label>
                        <Input id="tags" placeholder="Silk, Evening, Elegant" className="bg-primary border-border" value={formData.tags} onChange={handleChange} />
                    </div>
                </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-surface/50">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <ImageIcon className="text-sageDark" size={18} />
                    <CardTitle className="text-lg">Product Media</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Image URLs</Label>
                    <div className="grid grid-cols-1 gap-3">
                        {formData.images.map((img, i) => (
                            <div key={i} className="flex gap-2">
                                <Input
                                    placeholder={`Image URL ${i + 1}`}
                                    className="bg-primary border-border"
                                    value={img}
                                    onChange={(e) => handleImageChange(i, e.target.value)}
                                />
                                {i > 1 && (
                                    <Button variant="ghost" size="icon" className="shrink-0 text-muted hover:text-red-500">
                                        <X size={18} />
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <Button variant="outline" size="sm" className="w-full border-dashed" onClick={() => setFormData(prev => ({ ...prev, images: [...prev.images, ""] }))}>
                    <Plus className="mr-2" size={16} />
                    Add More Images
                </Button>
            </CardContent>
          </Card>

          <Card className="border-border bg-surface/50">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <TrendingUp className="text-sageDark" size={18} />
                    <CardTitle className="text-lg">Pricing & Variants</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="price">Sale Price ($)</Label>
                        <Input id="price" type="number" placeholder="950" className="bg-primary border-border font-bold text-sageDark" value={formData.price} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="originalPrice">Original Price ($)</Label>
                        <Input id="originalPrice" type="number" placeholder="1250" className="bg-primary border-border text-muted" value={formData.originalPrice} onChange={handleChange} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
                    <div className="space-y-2">
                        <Label htmlFor="sizes">Available Sizes (comma separated)</Label>
                        <Input id="sizes" placeholder="XS, S, M, L" className="bg-primary border-border" value={formData.sizes} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="colors">Available Colors (comma separated)</Label>
                        <Input id="colors" placeholder="Black, Gold, Rose" className="bg-primary border-border" value={formData.colors} onChange={handleChange} />
                    </div>
                </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button className="flex-1" size="lg" onClick={() => router.push("/admin/products")}>
                <Save className="mr-2" size={20} />
                Publish Product
            </Button>
            <Button variant="outline" size="lg" className="flex-1" onClick={() => router.back()}>
                Cancel
            </Button>
          </div>
        </div>

        <div className="space-y-6">
            <div className="sticky top-24">
                <div className="flex items-center gap-2 mb-4 px-2">
                    <Eye className="text-muted" size={16} />
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Live Preview</h3>
                </div>
                <div className="w-full max-w-[320px] mx-auto">
                    <ProductCard product={previewProduct} />
                </div>
                <Card className="mt-8 border-sageDark/20 bg-sageDark/5">
                    <CardContent className="p-4 flex gap-3">
                        <div className="p-2 rounded-full bg-sageDark/20 h-fit">
                            <Info size={16} className="text-sageDark" />
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-text uppercase tracking-widest mb-1">Curation Tip</h4>
                            <p className="text-xs text-muted leading-relaxed">
                                High-quality images (min 1200px) and evocative descriptions increase conversion by up to 40% for luxury items.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  )
}
