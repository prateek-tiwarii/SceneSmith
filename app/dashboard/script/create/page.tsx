'use client'
import React, { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ScriptSelector from '@/components/createScript/ScriptSelector'
import ScriptPreview from '@/components/createScript/ScriptPreview'

interface ScriptFormData {
  title: string;
  description: string;
  genre: string;
  negativePrompt: string;
  tags: string[];
}

// Loading component
function CreateScriptLoading() {
  return (
    <div className="flex">
      {/* Left Sidebar Skeleton */}
      <div className="w-1/3 h-[calc(100vh-56px)] border-r bg-gray-50">
        <div className="p-6 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            <div className="h-32 bg-gray-200 rounded w-full mt-6"></div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="w-6/12 p-6">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            <div className="h-4 bg-gray-200 rounded w-3/5"></div>
            <div className="h-64 bg-gray-200 rounded w-full mt-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component content
function CreateScriptContent() {
  const [script, setScript] = useState<ScriptFormData>({
    title: "",
    description: "",
    genre: "",
    negativePrompt: "",
    tags: []
  });

  const searchParams = useSearchParams()
  const type = searchParams.get('type')

  const handleScriptChange = (updatedScript: ScriptFormData) => {
    setScript(updatedScript);
    console.log('Script updated:', updatedScript);
  };

  return (
    <div className="flex">
      {/* Left Sidebar (Script Selector) */}
      <div className="w-1/3 h-[calc(100vh-56px)] sticky overflow-hidden">
        <ScriptSelector onScriptChange={handleScriptChange} />
      </div>

      {/* Main Content (Script Preview) */}
      <div className="w-6/12">
        <ScriptPreview script={script} />
      </div>
    </div>
  );
}


const CreateNewScript = () => {
  return (
    <Suspense fallback={<CreateScriptLoading />}>
      <CreateScriptContent />
    </Suspense>
  );
}

export default CreateNewScript