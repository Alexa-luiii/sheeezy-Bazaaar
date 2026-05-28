"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Bell,
  Search
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  return (
    <div className="flex w-full bg-primary text-text overflow-hidden h-screen font-inter">
      {/* Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r border-border bg-surface transition-all duration-300 z-50",
          isSidebarCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="p-8 flex items-center justify-between border-b border-border">
          {!isSidebarCollapsed && (
            <span className="font-serif font-bold text-xl tracking-tight text-sageDark">SB ADMIN</span>
          )}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1.5 rounded-sm hover:bg-primary text-muted"
          >
            {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="flex-1 p-6 space-y-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href))
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-sm transition-all group",
                  isActive
                    ? "bg-sageDark text-surface font-bold shadow-md"
                    : "text-muted hover:text-sageDark hover:bg-primary"
                )}
              >
                <item.icon size={20} className={cn("shrink-0", isActive ? "text-surface" : "text-muted group-hover:text-sageDark")} />
                {!isSidebarCollapsed && <span className="text-[10px] font-bold uppercase tracking-widest">{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="p-6 border-t border-border">
          <Link
            href="/"
            className="flex items-center gap-4 px-4 py-3 rounded-sm text-muted hover:text-red-500 hover:bg-red-50 transition-all group"
          >
            <LogOut size={20} className="shrink-0" />
            {!isSidebarCollapsed && <span className="text-[10px] font-bold uppercase tracking-widest">Exit Admin</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 border-b border-border bg-surface/80 backdrop-blur-md flex items-center justify-between px-8 z-40">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-muted hover:text-text"
            >
              <Menu size={24} />
            </button>
            <div className="hidden sm:flex items-center bg-primary border border-border rounded-sm px-4 py-2 w-64 lg:w-96">
              <Search size={16} className="text-muted mr-3" />
              <input
                type="text"
                placeholder="SEARCH BOUTIQUE..."
                className="bg-transparent border-none text-[10px] font-bold uppercase tracking-widest text-text focus:outline-none w-full placeholder:text-muted"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-muted hover:text-sageDark transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border border-surface" />
            </button>
            <div className="h-8 w-px bg-border mx-2" />
            <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-bold text-text uppercase tracking-widest">Master Admin</p>
                    <p className="text-[9px] font-bold text-muted uppercase tracking-widest">Curation Suite</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-text font-bold text-xs border-2 border-primary">
                    JD
                </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-primary/30 p-10">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] flex md:hidden">
            <div className="fixed inset-0 bg-text/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <aside className="relative w-72 bg-surface h-full flex flex-col shadow-2xl border-r border-border">
                <div className="p-8 flex items-center justify-between border-b border-border">
                    <span className="font-serif font-bold text-xl text-sageDark">SB ADMIN</span>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="text-muted">
                        <X size={24} />
                    </button>
                </div>
                <nav className="flex-1 p-6 space-y-3">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                                "flex items-center gap-4 px-4 py-3 rounded-sm transition-all",
                                pathname === item.href ? "bg-sageDark text-surface font-bold shadow-md" : "text-muted"
                            )}
                        >
                            <item.icon size={20} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">{item.name}</span>
                        </Link>
                    ))}
                </nav>
            </aside>
        </div>
      )}
    </div>
  )
}
