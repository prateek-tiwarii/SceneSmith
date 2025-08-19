import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a Skeleton component
import { NumberTicker } from "../magicui/number-ticker";

const StatCard = ({
  title,
  value,
  icon,
  description,
  loading,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
  loading?: boolean;
}) => {
  return (
    <Card className="w-full dark">
      <CardContent className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <div className="bg-accent w-fit p-4 rounded-full">
            {loading ? <Skeleton className="h-6 w-6 rounded-full" /> : icon}
          </div>
          <div className="text-3xl font-bold">
            {loading ? (
              <Skeleton className="h-8 w-20 rounded-md" />
            ) : (
              <NumberTicker
                value={value}
                startValue={0}
                className="whitespace-pre-wrap text-4xl font-medium tracking-tighter text-black dark:text-white"
              />
            )}
          </div>
        </div>

        <div>
          <div className="text-xl font-semibold">
            {loading ? (
              <Skeleton className="h-6 w-28 rounded-md" />
            ) : (
              title
            )}
          </div>
          <div className="text-[#E8E8E8] opacity-50 text-sm">
            {loading ? (
              <Skeleton className="h-4 w-40 mt-1 rounded-md" />
            ) : (
              description
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
