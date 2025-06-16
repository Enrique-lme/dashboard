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
import { useContext, useState } from 'react'
import { ThemeContext } from '@/context/ThemeContext'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={22} /> },
  { href: '/dashboard/organizations', label: 'Organisationen', icon: <Building2 size={22} /> },
  { href: '/dashboard/tools', label: 'Tools', icon: <Wrench size={22} /> },
  { href: '/dashboard/prompts', label: 'Prompts', icon: <MessageSquare size={22} /> },
  { href: '/dashboard/logs', label: 'Logs', icon: <FileText size={22} /> },
  { href: '/dashboard/llm', label: 'LLM-Zuweisung', icon: <Brain size={22} /> },
]

export default function Sidebar({ organizations }: { organizations: { id: string; name: string }[] }) {
  const pathname = usePathname()
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 flex flex-col bg-background border-r border-border shadow-lg transition-all duration-300
        ${collapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* Header mit Logo & Collapse */}
      <div className={`flex items-center justify-between px-4 py-4 ${collapsed ? 'justify-center' : ''}`}>
        {!collapsed && <div className="font-extrabold text-xl tracking-wide select-none">NEXTPROZESS</div>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Sidebar erweitern' : 'Sidebar einklappen'}
          className="p-1 rounded hover:bg-muted transition"
        >
          {collapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
      </div>

      {/* Organization Switcher */}
      {!collapsed && <OrganizationSwitcher organizations={organizations} />}

      {/* Navigation */}
      <nav className="mt-4 flex flex-col gap-2 flex-1 overflow-y-auto px-2">
        {navItems.map(({ href, label, icon }) => {
          const isActive = pathname === href
          return (
            <Link
              href={href}
              key={href}
              className={`flex items-center gap-4 rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive
                  ? 'bg-gradient-to-r from-purple-700 via-pink-600 to-red-600 shadow text-white'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={collapsed ? label : undefined}
            >
              <span className="text-lg">{icon}</span>
              {!collapsed && <span>{label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="flex flex-col gap-3 p-3 border-t border-border">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition"
        >
          {theme === 'dark' ? <SunMedium size={20} /> : <Moon size={20} />}
          {!collapsed && (theme === 'dark' ? 'Light Mode' : 'Dark Mode')}
        </button>

        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition"
        >
          <Settings size={20} />
          {!collapsed && 'Einstellungen'}
        </Link>

        <button
          onClick={() => logout()}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition text-left w-full"
        >
          <LogOut size={20} />
          {!collapsed && 'Logout'}
        </button>
      </div>
    </aside>
  )
}