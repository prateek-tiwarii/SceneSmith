'use client'
import React, { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import ScenePreview from '@/components/createScene/ElementPreview'
import SceneSelector from '@/components/createScene/ElememtSelector'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import axios from 'axios'
import toast from 'react-hot-toast'



interface SceneFormData {
  title: string;
  description: string;
  resolution: string;
  modelUsed: string;
  order: number;
  negativePrompt: string;
  generatedPrompt: string;
  status: 'idle' | 'pending' | 'completed' | 'failed';
  imageURL?: string; 
}

const CreateNewScene = () => {
  const [scene, setScene] = useState<SceneFormData>({
    title: "",
    description: "",
    resolution: "1024x1024",
    modelUsed: "runware:101@1",
    order: 1,
    negativePrompt: "",
    generatedPrompt: "",
    status: "idle"
  });

  const params = useParams();
  const scriptId = params.id as string;
  const router = useRouter();

  const handleGenerate = async () => {
  setScene(prev => ({ ...prev, status: "pending" }));

  try {
    const [width, height] = scene.resolution.split("x").map(Number);

    const res = await fetch("/api/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: scene.generatedPrompt,
        width,
        height,
        model: scene.modelUsed,
        negativePrompt: scene.negativePrompt,
      }),
    });

    const data = await res.json();

   
    const imageUrl = data?.[0]?.results?.[0]?.output;

    if (res.ok && imageUrl) {
      setScene(prev => ({
        ...prev,
        status: "completed",
        imageURL: imageUrl,
      }));
    } else {
      console.error("API Error:", data);
      setScene(prev => ({ ...prev, status: "failed" }));
    }
  } catch (err) {
    console.error("Image generation error:", err);
    toast.error("Image generation failed");
    setScene(prev => ({ ...prev, status: "failed" }));
  }
};



  const handleAccept = async() => {
    try{
      const request = await axios.post(`/api/project/${scriptId}/scene/create-new`, {
      title : scene.title,
      description : scene.description,
      negativePrompt : scene.negativePrompt,
      prompt : scene.generatedPrompt,
      order : scene.order,
      imageUrl : scene.imageURL
    });

if (request.status === 200) {
 toast.success('Scene saved successfully!')
 router.push('/dashboard')
}

    } catch (error) {
      toast.error('Failed to save scene')
      console.error("Error accepting scene:", error);
    }
    
  };

  const handleReject = () => {
    console.log("Scene rejected:", scene);
    setScene(prev => ({ 
      ...prev, 
      status: "idle",
      imageURL: undefined 
    }));
  };

  const handleRetry = () => {
    handleGenerate();
  };

  return (
    <div className="flex">
      
      <div className="w-1/3 h-[calc(100vh-56px)] sticky overflow-hidden">
        <SceneSelector 
          scene={scene} 
          setScene={setScene}  
          projectId={scriptId} 
        />
      </div>

      
      <div className="w-6/12">
        <ScenePreview 
          scene={scene} 
          onGenerate={handleGenerate}
          onAccept={handleAccept}
          onReject={handleReject}
          onRetry={handleRetry}
        />
      </div>

   
      <div className="w-1/5 h-[calc(100vh-56px)] sticky top-[56px] bg-[#1D1E21] border-l border-[#2E2E2E]">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            <h2 className="text-white font-medium">Scene Management</h2>

            
            <Card className="bg-[#2A2D34] border-[#3A3A3A]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-[#C0C0C0]">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button size="sm" className="w-full bg-[#7D5FF3] hover:bg-[#6B47E0] text-white">
                  Save Scene
                </Button>
                <Button size="sm" variant="outline" className="w-full border-[#3A3A3A] text-[#C0C0C0] hover:bg-[#2A2D34]">
                  Duplicate Scene
                </Button>
                <Button size="sm" variant="outline" className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10">
                  Delete Scene
                </Button>
              </CardContent>
            </Card>

           
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
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default CreateNewScene
