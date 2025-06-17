'use client'

import React from 'react'
import Sidebar from '@/components/sidebar/Sidebar'

export default function ClientLayout({
  children,
  organizations = [],
}: {
  children: React.ReactNode
  organizations?: { id: string; name: string }[]
}) {
  return (
    <div className="h-screen w-screen flex">
      {/* Sidebar */}
      <aside className="w-64 fixed inset-y-0 left-0 z-20">
        <Sidebar organizations={organizations} />
      </aside>

      {/* Main */}
      <div className="ml-64 flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-10">
          <div className="max-w-6xl mx-auto space-y-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}