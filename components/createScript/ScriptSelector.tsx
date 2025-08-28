// ScriptSelector.tsx
'use client'
import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Sparkles, Film, Palette } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface ScriptFormData {
  title: string;
  description: string;
  genre: string;
  negativePrompt: string;
  tags: string[];
}

interface ScriptSelectorProps {
  onScriptChange?: (script: ScriptFormData) => void;
}

const ScriptSelector: React.FC<ScriptSelectorProps> = ({ onScriptChange }) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [script, setScript] = useState<ScriptFormData>({
    title: "",
    description: "",
    genre: "",
    negativePrompt: "",
    tags: []
  });
  const [tagInput, setTagInput] = useState("");

  const genrePresets = [
    "Sci-Fi", "Fantasy", "Anime", "Noir", "Horror", "Romance", 
    "Action", "Drama", "Comedy", "Thriller", "Western", "Cyberpunk"
  ];

  const commonTags = [
    "cinematic", "detailed", "high-quality", "4k", "masterpiece",
    "vibrant", "atmospheric", "dramatic", "photorealistic", "artistic"
  ];

  const updateScript = (updates: Partial<ScriptFormData>) => {
    const updatedScript = { ...script, ...updates };
    setScript(updatedScript);
    onScriptChange?.(updatedScript);
  };

  

  const addTag = (tag: string) => {
    if (tag && !script.tags.includes(tag)) {
      updateScript({ tags: [...script.tags, tag] });
    }
    setTagInput("");
  };

  const removeTag = (tagToRemove: string) => {
    updateScript({ tags: script.tags.filter(tag => tag !== tagToRemove) });
  };

  const handleSubmit = async()=>{
    const response = await axios.post('/api/project/create-new',script)
    console.log('Script created:', response.data);
    if(response.status === 201){
      toast.success('Script created successfully!')
    }
    setScript({
      title: "",
      description: "",
      genre: "",
      negativePrompt: "",
      tags: []
    });
    
  }

  return (
    <div className="border-r-[1px] border-[#2E2E2E] h-full flex flex-col text-[#8E8E90] pt-2 px-2 bg-[#1D1E21]">
      <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab} className="w-full bg-[#1A1C22] rounded-lg p-1 flex flex-col gap-1">
        <TabsList className="w-full bg-[#1A1C22] border border-[#3A3A3A] rounded-lg p-1 flex gap-1">
          <TabsTrigger
            value="basic"
            className="w-full px-4 py-2 text-sm cursor-pointer text-[#C0C0C0] rounded-md transition-colors duration-200 data-[state=active]:bg-[#7D5FF3] data-[state=active]:text-white hover:bg-[#2A2D34]"
          >
            <Film className="w-4 h-4 mr-1" />
            Basic Info
          </TabsTrigger>
          <TabsTrigger
            value="style"
            className="w-full px-4 py-2 text-sm text-[#C0C0C0] cursor-pointer rounded-md transition-colors duration-200 data-[state=active]:bg-[#7D5FF3] data-[state=active]:text-white hover:bg-[#2A2D34]"
          >
            <Palette className="w-4 h-4 mr-1" />
            Style
          </TabsTrigger>
          <TabsTrigger
            value="advanced"
            className="w-full px-4 py-2 text-sm text-[#C0C0C0] cursor-pointer rounded-md transition-colors duration-200 data-[state=active]:bg-[#7D5FF3] data-[state=active]:text-white hover:bg-[#2A2D34]"
          >
            <Sparkles className="w-4 h-4 mr-1" />
            Advanced
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="flex-1 overflow-hidden">
          <ScrollArea className="h-full px-3">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium text-[#C0C0C0]">
                  Script Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter script title..."
                  value={script.title}
                  onChange={(e) => updateScript({ title: e.target.value })}
                  className="bg-[#2A2D34] border-[#3A3A3A] text-white placeholder:text-[#8E8E90] focus:border-[#7D5FF3]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-[#C0C0C0]">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your script concept..."
                  value={script.description}
                  onChange={(e) => updateScript({ description: e.target.value })}
                  className="bg-[#2A2D34] border-[#3A3A3A] text-white placeholder:text-[#8E8E90] focus:border-[#7D5FF3] min-h-[100px] resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="genre" className="text-sm font-medium text-[#C0C0C0]">
                  Genre
                </Label>
                <Input
                  id="genre"
                  placeholder="e.g., sci-fi, anime, noir"
                  value={script.genre}
                  onChange={(e) => updateScript({ genre: e.target.value })}
                  className="bg-[#2A2D34] border-[#3A3A3A] text-white placeholder:text-[#8E8E90] focus:border-[#7D5FF3]"
                />
                <div className="flex flex-wrap gap-1 mt-2">
                  {genrePresets.map((genre) => (
                    <Button
                      key={genre}
                      variant="outline"
                      size="sm"
                      onClick={() => updateScript({ genre })}
                      className="h-6 px-2 text-xs bg-[#2A2D34] border-[#3A3A3A] text-[#C0C0C0] hover:bg-[#7D5FF3] hover:text-white hover:border-[#7D5FF3]"
                    >
                      {genre}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="style" className="flex-1 overflow-hidden">
          <ScrollArea className="h-full px-3">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#C0C0C0]">
                  Tags
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add tag..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag(tagInput);
                      }
                    }}
                    className="bg-[#2A2D34] border-[#3A3A3A] text-white placeholder:text-[#8E8E90] focus:border-[#7D5FF3]"
                  />
                  <Button
                    onClick={() => addTag(tagInput)}
                    size="sm"
                    className="bg-[#7D5FF3] hover:bg-[#6B47E0] text-white px-3"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {script.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-[#7D5FF3] text-white hover:bg-[#6B47E0] pr-1"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-red-300"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="space-y-2 mt-4">
                  <Label className="text-xs text-[#8E8E90]">Common Tags</Label>
                  <div className="flex flex-wrap gap-1">
                    {commonTags.map((tag) => (
                      <Button
                        key={tag}
                        variant="outline"
                        size="sm"
                        onClick={() => addTag(tag)}
                        disabled={script.tags.includes(tag)}
                        className="h-6 px-2 text-xs bg-[#2A2D34] border-[#3A3A3A] text-[#C0C0C0] hover:bg-[#7D5FF3] hover:text-white hover:border-[#7D5FF3] disabled:opacity-50"
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="advanced" className="flex-1 overflow-hidden">
          <ScrollArea className="h-full px-3">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="negativePrompt" className="text-sm font-medium text-[#C0C0C0]">
                  Negative Prompt
                </Label>
                <Textarea
                  id="negativePrompt"
                  placeholder="What to avoid globally (e.g., blurry, low quality, distorted)..."
                  value={script.negativePrompt}
                  onChange={(e) => updateScript({ negativePrompt: e.target.value })}
                  className="bg-[#2A2D34] border-[#3A3A3A] text-white placeholder:text-[#8E8E90] focus:border-[#7D5FF3] min-h-[100px] resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-[#8E8E90]">Common Negative Terms</Label>
                <div className="flex flex-wrap gap-1">
                  {["blurry", "low quality", "distorted", "watermark", "text", "signature", "amateur"].map((term) => (
                    <Button
                      key={term}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const current = script.negativePrompt;
                        const newNegative = current ? `${current}, ${term}` : term;
                        updateScript({ negativePrompt: newNegative });
                      }}
                      className="h-6 px-2 text-xs bg-[#2A2D34] border-[#3A3A3A] text-[#C0C0C0] hover:bg-red-500 hover:text-white hover:border-red-500"
                    >
                      {term}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
      <div className="flex-1 flex items-center justify-center p-4">
        <Button
          onClick={handleSubmit}
          className="bg-[#7D5FF3] hover:bg-[#6B47E0] text-white px-6 py-2 rounded-md"
        >
          Save Script
        </Button>
      </div>
    </div>
  );
};

export default ScriptSelector;