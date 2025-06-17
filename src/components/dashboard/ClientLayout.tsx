// src/components/dashboard/ClientLayout.tsx
'use client'

import React from 'react'
import Sidebar from '@/components/sidebar/Sidebar'

export default function ClientLayout({
  children,
  organizations,
}: {
  children: React.ReactNode
  organizations: { id: string; name: string }[]
}) {
  return (
    <div className="h-screen flex">
      <aside className="w-64 fixed inset-y-0 left-0 z-20">
        <Sidebar organizations={organizations} />
      </aside>
      <main className="ml-64 flex-1 overflow-auto p-10">{children}</main>
    </div>
  )
}