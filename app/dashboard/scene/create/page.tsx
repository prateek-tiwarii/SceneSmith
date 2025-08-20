'use client'
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ScenePreview from '@/components/createScene/ElementPreview'
import SceneSelector from '@/components/createScene/ElememtSelector'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
// import SceneEditor from './SceneEditor' // For batch operations, scene management

interface SceneFormData {
  title: string;
  description: string;
  resolution: string;
  modelUsed: string;
  order: number;
  negativePrompt: string;
  generatedPrompt: string;
  status: 'pending' | 'completed' | 'failed';
}

// Mock script data - this would come from your script context/API
const mockScriptData = {
  title: "Cyberpunk Adventure",
  description: "A futuristic story set in a neon-lit city",
  genre: "cyberpunk",
  negativePrompt: "blurry, low quality, distorted",
  tags: ["neon", "futuristic", "urban", "night", "cyberpunk"]
};

const CreateNewScene = () => {
  const [scene, setScene] = useState<SceneFormData>({
    title: "",
    description: "",
    resolution: "1024x1024",
    modelUsed: "lama2.0",
    order: 1,
    negativePrompt: mockScriptData.negativePrompt,
    generatedPrompt: "",
    status: "pending"
  });

  const searchParams = useSearchParams()
  const scriptId = searchParams.get('scriptId') // Get script context

  const handleSceneChange = (updatedScene: SceneFormData) => {
    setScene(updatedScene);
    console.log('Scene updated:', updatedScene);
  };

  const handleGenerate = () => {
    // Set status to pending and simulate generation
    setScene(prev => ({ ...prev, status: 'pending' }));
    
    // Simulate API call
    setTimeout(() => {
      setScene(prev => ({ 
        ...prev, 
        status: Math.random() > 0.8 ? 'failed' : 'completed' 
      }));
    }, 3000);
  };

  return (
    <div className="flex">
      {/* Left Sidebar (Scene Selector) */}
      <div className="w-3/12 h-[calc(100vh-56px)] sticky overflow-hidden">
        <SceneSelector 
          scriptData={mockScriptData} 
          onSceneChange={handleSceneChange} 
        />
      </div>

      {/* Main Content (Scene Preview) */}
      <div className="w-6/12">
        <ScenePreview 
          scene={scene} 
          onGenerate={handleGenerate}
        />
      </div>

      {/* Right Sidebar (Scene Management/Batch Operations) */}
      <div className="w-3/12 h-[calc(100vh-56px)] sticky overflow-hidden bg-[#1D1E21] border-l-[1px] border-[#2E2E2E]">
        <div className="p-4 space-y-4">
          <h2 className="text-white font-medium">Scene Management</h2>
          
          {/* Quick Actions */}
          <Card className="bg-[#2A2D34] border-[#3A3A3A]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-[#C0C0C0]">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                size="sm" 
                className="w-full bg-[#7D5FF3] hover:bg-[#6B47E0] text-white"
              >
                Save Scene
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full border-[#3A3A3A] text-[#C0C0C0] hover:bg-[#2A2D34]"
              >
                Duplicate Scene
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10"
              >
                Delete Scene
              </Button>
            </CardContent>
          </Card>

          {/* Generation History */}
          <Card className="bg-[#2A2D34] border-[#3A3A3A]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-[#C0C0C0] flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Generation History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center p-2 bg-[#1A1C22] rounded">
                  <span className="text-[#8E8E90]">Attempt #1</span>
                  <Badge className="bg-green-500/20 text-green-400 text-xs">Success</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#1A1C22] rounded">
                  <span className="text-[#8E8E90]">Attempt #2</span>
                  <Badge className="bg-red-500/20 text-red-400 text-xs">Failed</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scene Statistics */}
          <Card className="bg-[#2A2D34] border-[#3A3A3A]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-[#C0C0C0]">Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-center p-2 bg-[#1A1C22] rounded">
                  <div className="text-white font-medium">2.3s</div>
                  <div className="text-[#8E8E90]">Avg Time</div>
                </div>
                <div className="text-center p-2 bg-[#1A1C22] rounded">
                  <div className="text-white font-medium">85%</div>
                  <div className="text-[#8E8E90]">Success</div>
                </div>
                <div className="text-center p-2 bg-[#1A1C22] rounded">
                  <div className="text-white font-medium">5</div>
                  <div className="text-[#8E8E90]">Attempts</div>
                </div>
                <div className="text-center p-2 bg-[#1A1C22] rounded">
                  <div className="text-white font-medium">1.2MB</div>
                  <div className="text-[#8E8E90]">Size</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Script Scenes Overview */}
          <Card className="bg-[#2A2D34] border-[#3A3A3A]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-[#C0C0C0]">All Scenes</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-32">
                <div className="space-y-1">
                  <div className="flex items-center justify-between p-2 bg-[#7D5FF3]/10 border border-[#7D5FF3]/20 rounded text-xs">
                    <span className="text-[#7D5FF3]">Scene #1 (Current)</span>
                    <Badge className="bg-[#7D5FF3]/20 text-[#7D5FF3] text-xs">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[#1A1C22] rounded text-xs">
                    <span className="text-[#8E8E90]">Scene #2</span>
                    <Badge className="bg-green-500/20 text-green-400 text-xs">Done</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[#1A1C22] rounded text-xs">
                    <span className="text-[#8E8E90]">Scene #3</span>
                    <Badge className="bg-gray-500/20 text-gray-400 text-xs">Draft</Badge>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CreateNewScene