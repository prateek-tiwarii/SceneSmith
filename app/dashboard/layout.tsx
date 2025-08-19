'use client'

import { use, useEffect } from "react"
import { useRouter, usePathname } from 'next/navigation'
import Sidebar from "@/components/dashboard/Sidebar"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import Header from "@/components/dashboard/Header"
// import { useAuth } from "@/hooks/useAuth"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const isCreateFormPage = pathname === '/dashboard/form/create'
//   const { user, loading } = useAuth()

  const shouldShowHeader = !pathname.includes('/dashboard/*')

  // useEffect(() => {
  //   if (!loading && !user) {
  //     router.push('/auth')
  //   }
  // }, [loading, user, router])

  // if (loading || !user) {
  //   return (
  //     <div className="w-full h-screen bg-[#0F0F0F] flex items-center justify-center flex-col gap-4 text-white">
  //       <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
  //       <p className="text-lg font-semibold">Loading dashboard...</p>
  //     </div>
  //   )
  // }

  return (
    <div className="flex h-screen overflow-hidden">
      {!isCreateFormPage && <Sidebar />}
      <div className="flex-1 flex flex-col overflow-hidden">
        {shouldShowHeader && <Header />}
        <DndProvider backend={HTML5Backend}>
          {/* Scrollable children only */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </DndProvider>
      </div>
    </div>
  )
}
