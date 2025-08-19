'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { FileCheck2, House, Plus, Settings, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Sidebar = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('general')


  const sideBarItems = {
    "general": [
      {
        name: "Overview",
        icon: House,
        href: "/dashboard"
      },
      {
        name: "All Forms",
        icon: FileCheck2,
        href: "/dashboard/form"
      },
      {
        name: "Settings",
        icon: Settings,
        href: "/dashboard/settings"
      }
    ],
    // "premium": [
    //   {
    //     name: "Go Premium",
    //     icon: Sparkles,
    //     href: "/dashboard/premium"
    //   }
    // ]
  }

  const handleTabChange = (tab: string) => {
    router.push(tab)
    setActiveTab(tab)
  }

  return (
    <div className='w-12 md:w-52 text-[#8E8E90] bg-[#171717] h-screen border-r-[1px] border-[#2E2E2E] flex flex-col justify-between overflow-hidden transition-all duration-200'>
      <div className='flex flex-col gap-4'>
        <Link
          href={'/dashboard'}
          className='italic text-xl md:text-2xl font-bold text-[#c3c3c3] mt-4 justify-center flex'
        >
          <span className='hidden md:block'>Formix</span>
        </Link>

        <div className='px-2 md:px-4 flex justify-center'>
          <button
            onClick={() => router.push('/dashboard/form/create')}
            className="text-white bg-[#7D5FF3] hover:bg-[#7D5FF3]/60 flex items-center justify-center md:justify-start gap-0 md:gap-2 text-sm px-2 md:px-3 py-2 rounded-md cursor-pointer transition-colors duration-200 w-full"
          >
            <Plus size={16} />
            <span className='hidden md:inline'>Create New Form</span>
          </button>
        </div>

        <div className='flex justify-start p-2 md:p-4 flex-col gap-2'>

          <div className='flex flex-col gap-2'>
            <div className='text-xs'> General  </div>
            <div className='flex flex-col gap-1 md:gap-2 items-center md:items-start'>
              {
                sideBarItems.general.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleTabChange(item.href)}
                    className={`text-sm flex items-center gap-0 md:gap-2 cursor-pointer hover:bg-[#7D5FF3]/20 hover:text-[#ebebeb] py-2 px-1.5 w-full rounded-sm justify-center md:justify-start ${activeTab === item.href ? 'border-[1px] border-[#7D5FF3]/20 bg-[#18171D]' : 'border-[1px] border-[#171717]'}`}
                  >
                    <item.icon strokeWidth={2} size={18} />
                    <span className='hidden md:inline'>{item.name}</span>
                  </button>
                ))
              }
            </div>
          </div>
          {/* <div className='flex flex-col gap-2'>
            <div className='text-xs'> Premium  </div>
            <div className='flex flex-col gap-1 md:gap-2 items-center md:items-start'>
              {
                sideBarItems.premium.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleTabChange(item.href)}
                    className={`text-sm flex items-center gap-0 md:gap-2 cursor-pointer hover:bg-[#7D5FF3]/20 hover:text-[#ebebeb] py-2 px-1.5 w-full rounded-sm justify-center md:justify-start ${activeTab === item.href ? 'border-[1px] border-[#7D5FF3]/20 bg-[#18171D]' : 'border-[1px] border-[#171717]'}`}
                  >
                    <item.icon strokeWidth={2} size={18} />
                    <span className='hidden md:inline'>{item.name}</span>
                  </button>
                ))
              }
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
