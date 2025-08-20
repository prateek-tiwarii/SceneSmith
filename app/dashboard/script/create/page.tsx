'use client'
import React, { useState } from 'react'
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

const CreateNewScript = () => {
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
  )
}

export default CreateNewScript