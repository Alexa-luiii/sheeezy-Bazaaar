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
    <div className="flex w-full bg-brand-primary text-white overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r border-white/5 bg-zinc-950 transition-all duration-300 z-50",
          isSidebarCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          {!isSidebarCollapsed && (
            <span className="font-serif font-bold text-xl tracking-tight text-brand-accent">SB ADMIN</span>
          )}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1.5 rounded-sm hover:bg-white/5 text-zinc-400"
          >
            {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href))
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-3 py-3 rounded-sm transition-all group",
                  isActive
                    ? "bg-brand-accent text-brand-primary font-bold shadow-[0_0_15px_rgba(201,168,76,0.2)]"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon size={22} className={cn("shrink-0", isActive ? "text-brand-primary" : "text-zinc-500 group-hover:text-brand-accent")} />
                {!isSidebarCollapsed && <span className="text-sm font-medium">{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <Link
            href="/"
            className="flex items-center gap-4 px-3 py-3 rounded-sm text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-all group"
          >
            <LogOut size={22} className="shrink-0" />
            {!isSidebarCollapsed && <span className="text-sm font-medium">Exit Admin</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-white/5 bg-zinc-950/50 backdrop-blur-md flex items-center justify-between px-6 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-zinc-400 hover:text-white"
            >
              <Menu size={24} />
            </button>
            <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded-sm px-3 py-1.5 w-64 lg:w-96">
              <Search size={16} className="text-zinc-500 mr-2" />
              <input
                type="text"
                placeholder="Search orders, products..."
                className="bg-transparent border-none text-sm text-white focus:outline-none w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand-accent rounded-full border border-zinc-950" />
            </button>
            <div className="h-8 w-px bg-white/10 mx-2" />
            <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-white uppercase tracking-wider">Super Admin</p>
                    <p className="text-[10px] text-zinc-500">jane.doe@sheeezy.com</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-brand-accent flex items-center justify-center text-brand-primary font-bold">
                    JD
                </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-brand-primary p-8">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] flex md:hidden">
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <aside className="relative w-72 bg-zinc-950 h-full flex flex-col shadow-2xl border-r border-white/5">
                <div className="p-6 flex items-center justify-between border-b border-white/5">
                    <span className="font-serif font-bold text-xl text-brand-accent">SB ADMIN</span>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-400">
                        <X size={24} />
                    </button>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                                "flex items-center gap-4 px-3 py-3 rounded-sm transition-all",
                                pathname === item.href ? "bg-brand-accent text-brand-primary font-bold" : "text-zinc-400"
                            )}
                        >
                            <item.icon size={22} />
                            <span className="text-sm font-medium">{item.name}</span>
                        </Link>
                    ))}
                </nav>
            </aside>
        </div>
      )}
    </div>
  )
}
