'use client'

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className="p-10 max-w-5xl mx-auto bg-glass shadow-xl rounded-2xl">
      <h1 className="text-3xl font-bold text-white mb-8">⚙️ Einstellungen</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-[#1a1a1d] border border-[#2b2b2b] rounded-xl p-1 flex gap-2 mb-8">
          <TabsTrigger value="profile" className="text-sm px-4 py-2">Profil</TabsTrigger>
          <TabsTrigger value="system" className="text-sm px-4 py-2">System</TabsTrigger>
          <TabsTrigger value="security" className="text-sm px-4 py-2">Sicherheit</TabsTrigger>
        </TabsList>

        {activeTab === 'profile' && (
          <div className="bg-[#141417] border border-[#2b2b2b] rounded-2xl p-6 shadow-lg">
            <h2 className="text-lg font-medium text-white mb-4">Profilinformationen</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Name</label>
                <Input placeholder="Dein Name" className="bg-[#111] border border-[#333] text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">E-Mail</label>
                <Input placeholder="deine@email.com" className="bg-[#111] border border-[#333] text-white" />
              </div>
              <Button className="mt-4 bg-white text-black hover:bg-gray-200">Speichern</Button>
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="bg-[#141417] border border-[#2b2b2b] rounded-2xl p-6 shadow-lg">
            <h2 className="text-lg font-medium text-white mb-4">Systemeinstellungen</h2>
            <p className="text-sm text-gray-400">Hier kannst du systembezogene Konfigurationen vornehmen.</p>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="bg-[#141417] border border-[#2b2b2b] rounded-2xl p-6 shadow-lg">
            <h2 className="text-lg font-medium text-white mb-4">Sicherheit</h2>
            <p className="text-sm text-gray-400">Hier kannst du deine Passwörter oder 2FA konfigurieren.</p>
          </div>
        )}
      </Tabs>
    </div>
  )
}