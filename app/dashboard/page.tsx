'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import StatCard from '@/components/dashboard/StatCard'

import { CheckCheck, File, Sparkles, Film } from 'lucide-react'
import { redirect, useRouter } from 'next/navigation'

import axios from 'axios'
import RecentScripts from '@/components/dashboard/RecentScript'
import { useSession } from 'next-auth/react'

const DashboardPage = () => {
  const router = useRouter()
  const { data: session } = useSession();
  const user = session?.user?.id

  if (!user) {
    redirect('/signIn')
    
  }

  const [loading, setLoading] = useState<boolean>(true);
  const [sceneCount, setSceneCount] = useState<number>(0);
  const [scriptCount, setScriptCount] = useState<number>(0);
  const [avgScenesPerScript, setAvgScenesPerScript] = useState<number>(0);

  useEffect(() => {
    if (!user) return;
    
    const fetchStats = async () => {
      try {
        const response = await axios.get(`/api/project/stats/${user}`);
        setSceneCount(response.data.totalScenes);
        setScriptCount(response.data.totalScripts);
        setAvgScenesPerScript(Math.round(response.data.avgScenesPerScript * 10) / 10); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  return (
    <div className='p-5 flex flex-col gap-5 bg-[#1D1E21] h-full overflow-scroll'>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col gap-1'>
          <div className='text-2xl font-bold text-[#F8F8F8]'>
            Hey, {session?.user?.name} 👋
          </div>
          <div className='text-sm text-gray-500'>
            Here's an overview of your scripts and scenes.
          </div>
        </div>
      </div>

      <div>
        {scriptCount > 0 || loading ? (
          <div className='flex justify-between gap-5 md:flex-row flex-col'>
            <StatCard 
              loading={loading} 
              title={'Total Scripts'} 
              description={'Scripts in your collection'} 
              icon={<File className="h-5 w-5 text-green-500" strokeWidth={1.4} />} 
              value={scriptCount} 
            />
            <StatCard 
              loading={loading} 
              title={'Total Scenes'} 
              description={'Scenes across all scripts'} 
              icon={<Film className="h-5 w-5 text-blue-500" strokeWidth={1.4} />} 
              value={sceneCount} 
            />
            <StatCard 
              loading={loading} 
              title={'Avg Scenes Per Script'} 
              description={'Average scenes per script'} 
              icon={<Sparkles className="h-5 w-5 text-purple-500" strokeWidth={1.4} />} 
              value={avgScenesPerScript} 
            />
          </div>
        ) : (
          <div>
            <Card className='dark'>
              <CardContent className='flex justify-center text-sm p-6'>
                Not enough data to show stats
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <div className='flex flex-col gap-2 h-full'>
        <div className='text-sm font-bold text-[#F8F8F8]'>
          Recent Work
        </div>
        <RecentScripts />
      </div>
    </div>
  )
}

export default DashboardPage