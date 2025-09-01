'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NumberTicker } from "@/components/magicui/number-ticker"  

interface StatCardProps {
  loading: boolean;
  title: string;
  description: string;
  icon: React.ReactNode;
  value: number;
  change?: string; 
}

export default function StatCard({ loading, title, description, icon, value, change }: StatCardProps) {
  if (loading) {
    return (
      <Card className="rounded-2xl bg-neutral-900 border border-neutral-800 shadow-lg p-6 animate-pulse w-full sm:w-72 md:w-80 lg:w-96">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="h-5 bg-neutral-700 rounded w-36"></div>
          <div className="h-6 w-6 bg-neutral-700 rounded"></div>
        </CardHeader>
        <CardContent>
          <div className="h-10 bg-neutral-700 rounded w-24 mb-3"></div>
          <div className="h-4 bg-neutral-700 rounded w-28"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl bg-neutral-900 border border-neutral-800 shadow-lg p-6 w-full sm:w-72 md:w-80 lg:w-96 hover:shadow-xl transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-semibold text-gray-300">{title}</CardTitle>
        <div className="text-gray-400">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-5xl font-extrabold text-white tracking-tight">
          <NumberTicker value={value}  className="text-white"/> {/* animated counter */}
        </div>
        {change && (
          <p className="text-sm text-green-400 mt-1">{change}</p>
        )}
        {!change && description && (
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
