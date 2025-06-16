'use client'

import { Listbox, Transition } from '@headlessui/react'
import { ChevronsUpDown, Check } from 'lucide-react'
import { useSelectedOrganization } from '@/lib/hooks/use-selected-organization'
import { Fragment, useState } from 'react'
import { useRouter } from 'next/navigation'

export function OrganizationSwitcher({
  organizations,
}: {
  organizations: { id: string; name: string }[]
}) {
  const selectedOrgId = useSelectedOrganization()
  const router = useRouter()

  const current = organizations.find((o) => o.id === selectedOrgId) ?? organizations[0]
  const [selected, setSelected] = useState(current)

  const handleChange = async (org: any) => {
    if (org === '__new__') {
        router.push('/dashboard/organizations/new')
        return
      }

    setSelected(org)
    await fetch('/app/actions/set-organization', {
      method: 'POST',
      body: new URLSearchParams({ organization: org.id }),
    })
    router.refresh()
  }

  return (
    <div className="mb-6">
      <label className="text-xs text-gray-400 mb-2 block uppercase tracking-wide font-medium">
        Organisation
      </label>
      <Listbox value={selected} onChange={handleChange}>
        {({ open }) => (
          <div className="relative">
            <Listbox.Button className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-xl flex justify-between items-center text-white text-sm hover:border-gray-500 transition focus:outline-none focus:ring-2 focus:ring-gray-600">
              <span className="truncate text-white font-medium">
                {selected?.name ?? 'Organisation wählen'}
              </span>
              <ChevronsUpDown size={16} className="ml-2 text-gray-400" />
            </Listbox.Button>
            

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-2 w-full max-h-60 overflow-auto bg-[#1a1a1a] border border-[#333] rounded-xl shadow-2xl ring-1 ring-black/5 focus:outline-none z-50">
              <Listbox.Option
  value="__new__"
  className="cursor-pointer px-3 py-2 text-sm text-green-500 hover:bg-gray-700"
>
  + Neue Organisation anlegen
</Listbox.Option>
                {organizations.map((org) => (
                  <Listbox.Option
                    key={org.id}
                    value={org}
                    className={({ active }) =>
                      `cursor-pointer select-none px-4 py-2 text-sm transition rounded-md mx-1 my-1 ${
                        active ? 'bg-[#222] text-white' : 'text-gray-300'
                      }`
                    }
                  >
                    {({ selected }) => (
                      <div className="flex justify-between items-center">
                        <span className="truncate">{org.name}</span>
                        {selected && <Check size={16} className="text-white" />}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
                
              </Listbox.Options>
            </Transition>
            
          </div>
        )}
      </Listbox>
      
    </div>
  )
}