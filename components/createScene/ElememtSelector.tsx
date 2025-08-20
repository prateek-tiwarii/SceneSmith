// SceneSelector.tsx
'use client'
import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Settings, Wand2, Image, Clock, Monitor } from 'lucide-react';

interface SceneFormData {
  title: string;
  description: string;
  resolution: string;
  modelUsed: string;
  order: number;
  negativePrompt: string;
  // Auto-generated fields (read-only)
  generatedPrompt: string;
  status: 'pending' | 'completed' | 'failed';
}

interface SceneSelectorProps {
  scriptData?: {
    title: string;
    description: string;
    genre: string;
    negativePrompt: string;
    tags: string[];
  };
  onSceneChange?: (scene: SceneFormData) => void;
}

const SceneSelector: React.FC<SceneSelectorProps> = ({ scriptData, onSceneChange }) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [scene, setScene] = useState<SceneFormData>({
    title: "",
    description: "",
    resolution: "1024x1024",
    modelUsed: "lama2.0",
    order: 1,
    negativePrompt: scriptData?.negativePrompt || "",
    generatedPrompt: "",
    status: "pending"
  });

  const resolutionOptions = [
    { value: "512x512", label: "512×512 (Square)" },
    { value: "768x768", label: "768×768 (Square)" },
    { value: "1024x1024", label: "1024×1024 (Square)" },
    { value: "1024x768", label: "1024×768 (Landscape)" },
    { value: "768x1024", label: "768×1024 (Portrait)" },
    { value: "1920x1080", label: "1920×1080 (HD)" },
    { value: "1080x1920", label: "1080×1920 (Vertical)" }
  ];

  const modelOptions = [
    { value: "lama2.0", label: "Lama 2.0 (Default)" },
    { value: "stable-diffusion-xl", label: "Stable Diffusion XL" },
    { value: "midjourney-v6", label: "Midjourney V6" },
    { value: "dalle-3", label: "DALL-E 3" },
    { value: "flux-pro", label: "Flux Pro" }
  ];

  const updateScene = (updates: Partial<SceneFormData>) => {
    const updatedScene = { ...scene, ...updates };
    
    // Auto-generate prompt when title or description changes
    if (updates.title || updates.description) {
      updatedScene.generatedPrompt = generatePrompt(updatedScene, scriptData);
    }
    
    setScene(updatedScene);
    onSceneChange?.(updatedScene);
  };

  const generatePrompt = (sceneData: SceneFormData, script?: any) => {
    if (!sceneData.title && !sceneData.description) return "";
    
    const parts = [];
    
    // Add script genre if available
    if (script?.genre) {
      parts.push(`${script.genre} style`);
    }
    
    // Add scene title and description
    if (sceneData.title) {
      parts.push(sceneData.title);
    }
    
    if (sceneData.description) {
      parts.push(sceneData.description);
    }
    
    // Add script tags if available
    if (script?.tags && script.tags.length > 0) {
      parts.push(script.tags.join(', '));
    }
    
    return parts.join(', ');
  };

  return (
    <div className="border-r-[1px] border-[#2E2E2E] h-full flex flex-col text-[#8E8E90] pt-2 px-2 bg-[#1D1E21]">
      <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab} className="w-full bg-[#1A1C22] rounded-lg p-1 flex flex-col gap-1">
        <TabsList className="w-full bg-[#1A1C22] border border-[#3A3A3A] rounded-lg p-1 flex gap-1">
          <TabsTrigger
            value="basic"
            className="w-full px-4 py-2 text-sm cursor-pointer text-[#C0C0C0] rounded-md transition-colors duration-200 data-[state=active]:bg-[#7D5FF3] data-[state=active]:text-white hover:bg-[#2A2D34]"
          >
            <Camera className="w-4 h-4 mr-1" />
            Scene Info
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="w-full px-4 py-2 text-sm text-[#C0C0C0] cursor-pointer rounded-md transition-colors duration-200 data-[state=active]:bg-[#7D5FF3] data-[state=active]:text-white hover:bg-[#2A2D34]"
          >
            <Settings className="w-4 h-4 mr-1" />
            Settings
          </TabsTrigger>
          <TabsTrigger
            value="prompt"
            className="w-full px-4 py-2 text-sm text-[#C0C0C0] cursor-pointer rounded-md transition-colors duration-200 data-[state=active]:bg-[#7D5FF3] data-[state=active]:text-white hover:bg-[#2A2D34]"
          >
            <Wand2 className="w-4 h-4 mr-1" />
            Prompt
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="flex-1 overflow-hidden">
          <ScrollArea className="h-full px-3">
            <div className="space-y-6">
              {/* Script Context Card */}
              {scriptData && (
                <Card className="bg-[#2A2D34]/50 border-[#3A3A3A]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-[#C0C0C0]">Script Context</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-xs">
                    <div>
                      <span className="text-[#8E8E90]">Title:</span>
                      <span className="text-white ml-2">{scriptData.title}</span>
                    </div>
                    <div>
                      <span className="text-[#8E8E90]">Genre:</span>
                      <span className="text-white ml-2">{scriptData.genre}</span>
                    </div>
                    {scriptData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {scriptData.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} className="bg-[#7D5FF3]/20 text-[#7D5FF3] text-xs px-1 py-0">
                            {tag}
                          </Badge>
                        ))}
                        {scriptData.tags.length > 3 && (
                          <Badge className="bg-[#7D5FF3]/20 text-[#7D5FF3] text-xs px-1 py-0">
                            +{scriptData.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-[#C0C0C0]">
                  Scene Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter scene title..."
                  value={scene.title}
                  onChange={(e) => updateScene({ title: e.target.value })}
                  className="bg-[#2A2D34] border-[#3A3A3A] text-white placeholder:text-[#8E8E90] focus:border-[#7D5FF3]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-[#C0C0C0]">
                  Scene Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe this scene in detail..."
                  value={scene.description}
                  onChange={(e) => updateScene({ description: e.target.value })}
                  className="bg-[#2A2D34] border-[#3A3A3A] text-white placeholder:text-[#8E8E90] focus:border-[#7D5FF3] min-h-[100px] resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order" className="text-sm font-medium text-[#C0C0C0]">
                  Scene Order
                </Label>
                <Input
                  id="order"
                  type="number"
                  placeholder="1"
                  value={scene.order}
                  onChange={(e) => updateScene({ order: parseInt(e.target.value) || 1 })}
                  className="bg-[#2A2D34] border-[#3A3A3A] text-white placeholder:text-[#8E8E90] focus:border-[#7D5FF3]"
                />
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="settings" className="flex-1 overflow-hidden">
          <ScrollArea className="h-full px-3">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#C0C0C0] flex items-center gap-2">
                  <Monitor className="w-4 h-4" />
                  Resolution
                </Label>
                <Select 
                  value={scene.resolution} 
                  onValueChange={(value) => updateScene({ resolution: value })}
                >
                  <SelectTrigger className="bg-[#2A2D34] border-[#3A3A3A] text-white focus:border-[#7D5FF3]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2D34] border-[#3A3A3A]">
                    {resolutionOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-white hover:bg-[#7D5FF3]">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#C0C0C0] flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  AI Model
                </Label>
                <Select 
                  value={scene.modelUsed} 
                  onValueChange={(value) => updateScene({ modelUsed: value })}
                >
                  <SelectTrigger className="bg-[#2A2D34] border-[#3A3A3A] text-white focus:border-[#7D5FF3]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#2A2D34] border-[#3A3A3A]">
                    {modelOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-white hover:bg-[#7D5FF3]">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#C0C0C0]">
                  Scene-Specific Negative Prompt
                </Label>
                <Textarea
                  placeholder="Additional things to avoid for this scene..."
                  value={scene.negativePrompt}
                  onChange={(e) => updateScene({ negativePrompt: e.target.value })}
                  className="bg-[#2A2D34] border-[#3A3A3A] text-white placeholder:text-[#8E8E90] focus:border-[#7D5FF3] min-h-[80px] resize-none"
                />
                <p className="text-xs text-[#8E8E90]">
                  This will be combined with the script's global negative prompt
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-[#C0C0C0]">Status</Label>
                  <Badge 
                    className={`w-full justify-center ${
                      scene.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      scene.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {scene.status.charAt(0).toUpperCase() + scene.status.slice(1)}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-[#C0C0C0] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Est. Time
                  </Label>
                  <Badge className="w-full justify-center bg-blue-500/20 text-blue-400">
                    ~30s
                  </Badge>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="prompt" className="flex-1 overflow-hidden">
          <ScrollArea className="h-full px-3">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#C0C0C0] flex items-center gap-2">
                  <Wand2 className="w-4 h-4" />
                  Generated Prompt (Auto-created)
                </Label>
                <div className="bg-[#2A2D34] border-[#3A3A3A] rounded-md p-3 min-h-[100px]">
                  <p className="text-white text-sm leading-relaxed">
                    {scene.generatedPrompt || (
                      <span className="text-[#8E8E90] italic">
                        Prompt will be generated automatically based on your scene title, description, and script context...
                      </span>
                    )}
                  </p>
                </div>
                <p className="text-xs text-[#8E8E90]">
                  This prompt is automatically generated using your scene details, script genre, and global settings. It cannot be manually edited.
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#C0C0C0]">
                  Prompt Components
                </Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-[#2A2D34]/50 rounded">
                    <span className="text-xs text-[#C0C0C0]">Script Genre</span>
                    <Badge className="bg-[#7D5FF3]/20 text-[#7D5FF3] text-xs">
                      {scriptData?.genre || 'Not set'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[#2A2D34]/50 rounded">
                    <span className="text-xs text-[#C0C0C0]">Scene Title</span>
                    <Badge className="bg-blue-500/20 text-blue-400 text-xs">
                      {scene.title || 'Not set'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-[#2A2D34]/50 rounded">
                    <span className="text-xs text-[#C0C0C0]">Script Tags</span>
                    <Badge className="bg-green-500/20 text-green-400 text-xs">
                      {scriptData?.tags?.length || 0} tags
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SceneSelector;