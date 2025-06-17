'use client'

import Link from 'next/link'
import {
  LayoutDashboard,
  Building2,
  Wrench,
  MessageSquare,
  FileText,
  Brain,
  LogOut,
  Settings,
  Moon,
  SunMedium,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { logout } from '@/app/actions/logout'
import { OrganizationSwitcher } from '@/components/organization/organization-switch'
import { useTheme } from '@/context/ThemeContext'
import { useState } from 'react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/organizations', label: 'Organisationen', icon: Building2 },
  { href: '/dashboard/tools', label: 'Tools', icon: Wrench },
  { href: '/dashboard/prompts', label: 'Prompts', icon: MessageSquare },
  { href: '/dashboard/logs', label: 'Logs', icon: FileText },
  { href: '/dashboard/llm', label: 'LLM-Zuweisung', icon: Brain },
]

export default function Sidebar({ organizations }: { organizations: { id: string; name: string }[] }) {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 flex flex-col bg-background border-r border-border shadow-lg transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-4 ${collapsed ? 'justify-center' : ''}`}>
        {!collapsed && (
          <span className="text-xl font-bold tracking-wide text-foreground select-none">
            NEXTPROZESS
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-muted transition"
          aria-label="Toggle Sidebar"
        >
          {collapsed ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
        </button>
      </div>

      {/* Organisation Switcher */}
      {!collapsed && (
        <div className="px-3">
          <OrganizationSwitcher organizations={organizations} />
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 mt-6 space-y-1 px-2 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-gradient-to-r from-purple-700 via-pink-600 to-red-600 text-white shadow'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={collapsed ? label : undefined}
            >
              <Icon size={20} />
              {!collapsed && <span>{label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="flex flex-col gap-3 px-3 py-4 border-t border-border">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition"
        >
          {theme === 'dark' ? <SunMedium size={20} /> : <Moon size={20} />}
          {!collapsed && (theme === 'dark' ? 'Light Mode' : 'Dark Mode')}
        </button>

        {/* Einstellungen */}
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition"
        >
          <Settings size={20} />
          {!collapsed && 'Einstellungen'}
        </Link>

        {/* Logout */}
        <button
          onClick={() => logout()}
          className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition text-left w-full"
        >
          <LogOut size={20} />
          {!collapsed && 'Logout'}
        </button>
      </div>
    </aside>
  )
}