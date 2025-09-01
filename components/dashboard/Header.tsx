import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { Skeleton } from '../ui/skeleton'


const Header = () => {
  // For now, mock static values
  const loading = false
  const user = { name: "John Doe", email: "john@example.com" }

  const showFormTitle = true
  const showBackButton = true
  

  return (
    <div className="sticky top-0 left-0 right-0 z-50 text-[#F8F8F8] border-b border-[#4B4B4B] bg-[#171717] px-4 py-2 flex items-center h-14 justify-between">
      <div>
        {showFormTitle && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer text-sm">
                <ArrowLeft size={16} /> Back
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="rounded-md px-2 py-1"
                value="Static Form Title"
                readOnly
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4 items-center ">
        {showBackButton && (
          <div className="flex gap-2">
            <Button className="bg-[#7D5FF3] text-white hover:bg-[#7D5FF3]/80">
              Premium+
            </Button>
          </div>
        )}

        <div className="relative flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer flex items-center gap-2 outline-none">
              <Avatar>
                <AvatarImage src={'https://avatars.githubusercontent.com/u/91189139?v=4'} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {loading ? (
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-24 rounded-md" />
                  <Skeleton className="h-3 w-32 rounded-md" />
                </div>
              ) : (
                <div className="items-start flex-col md:flex hidden">
                  <div className="text-sm text-white">{user.name}</div>
                  <div className="text-xs text-gray-400">{user.email}</div>
                </div>
              )}
            </DropdownMenuTrigger>

            <DropdownMenuContent className="top-2 absolute right-0 w-52 bg-[#1a1a1a] border border-[#2f2f2f] text-white shadow-lg">
              <DropdownMenuLabel className="text-gray-300">Hi, {user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#2f2f2f]" />
              <DropdownMenuItem className="hover:bg-[#2a2a2a] cursor-pointer">Profile</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#2a2a2a] cursor-pointer">Settings</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#2a2a2a] cursor-pointer">Help</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-[#2a2a2a] cursor-pointer">Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default Header
