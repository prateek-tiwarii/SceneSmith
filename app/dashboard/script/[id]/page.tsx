'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useParams } from "next/navigation"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { X, Plus, Sparkles, Film, Palette, Tag, Trash2, MoreVertical, Eye } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Scene {
  _id: string;
  title: string;
  content: string;
}

interface Script {
  _id: string;
  title: string;
  description: string;
  genre: string;
  negativePrompt: string;
  tags: string[];
  scenes: Scene[];
}

interface ScriptUpdateProps {
  onScriptChange?: (script: Script) => void;
}

const ScriptUpdate: React.FC<ScriptUpdateProps> = ({ onScriptChange }) => {
  const { id } = useParams()
  const [script, setScript] = useState<Script | null>(null);
  const [originalScript, setOriginalScript] = useState<Script | null>(null); 
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null);
  const [showSceneModal, setShowSceneModal] = useState(false);
  const router = useRouter();

  const genrePresets = [
    "Sci-Fi", "Fantasy", "Anime", "Noir", "Horror", "Romance", 
    "Action", "Drama", "Comedy", "Thriller", "Western", "Cyberpunk"
  ];

  const commonTags = [
    "cinematic", "detailed", "high-quality", "4k", "masterpiece",
    "vibrant", "atmospheric", "dramatic", "photorealistic", "artistic"
  ];

  useEffect(() => {
    const fetchScript = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`/api/project/${id}`)
        setScript(response.data)
        setOriginalScript(response.data) 
        setError(null)
      } catch (err) {
        setError('Failed to load script')
        console.error('Error fetching script:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchScript()
    }
  }, [id])

  const updateLocalScript = (updates: Partial<Script>) => {
    if (script) {
      setScript({ ...script, ...updates });
      
    }
  };

  const addTag = (tag: string) => {
    if (!script || !tag) return;
    
    const newTag = tag.trim();
    if (!script.tags.includes(newTag)) {
      updateLocalScript({ tags: [...script.tags, newTag] });
    }
    setTagInput("");
  };

  const removeTag = (tagToRemove: string) => {
    if (!script) return;
    updateLocalScript({ tags: script.tags.filter(tag => tag !== tagToRemove) });
  };

  const viewScene = (scene: Scene) => {
    setSelectedScene(scene);
    setShowSceneModal(true);
  };

  const deleteScene = async (sceneId: string) => {
    if (!script) return;
    
    try {
      await axios.delete(`/api/project/${id}/scene/${sceneId}`);
      const updatedScenes = script.scenes.filter(scene => scene._id !== sceneId);
      updateLocalScript({ scenes: updatedScenes });
      // Update original script as well since this is a direct server action
      if (originalScript) {
        setOriginalScript({ 
          ...originalScript, 
          scenes: originalScript.scenes.filter(scene => scene._id !== sceneId) 
        });
      }
      toast.success('Scene deleted successfully!');
      
    } catch (err) {
      toast.error('Failed to delete scene');
      console.error('Error deleting scene:', err);
    }
  };

  const handleSave = async () => {
    if (!script) return;

    try {
      const response = await axios.patch(`/api/project/${id}`, script);
      console.log('Script updated:', response.data);
      if (response.status === 200) {
        setOriginalScript(script); 
        toast.success('Script updated successfully!');
        router.push('/dashboard')
        if (onScriptChange) {
          onScriptChange(script);
        }
      }
    } catch (err) {
      toast.error('Failed to update script');
      console.error('Error updating script:', err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTag(tagInput);
    }
  };

  // Check if there are unsaved changes
  const hasUnsavedChanges = originalScript && script && JSON.stringify(originalScript) !== JSON.stringify(script);

  if (loading) {
    return (
      <div className="flex h-screen bg-black text-gray-100">
        <div className="flex items-center justify-center w-full">
          <div className="text-center text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-black text-gray-100">
        <div className="flex items-center justify-center w-full">
          <div className="text-center text-red-400">Error: {error}</div>
        </div>
      </div>
    );
  }

  if (!script) {
    return (
      <div className="flex h-screen bg-black text-gray-100">
        <div className="flex items-center justify-center w-full">
          <div className="text-center text-gray-400">Script not found</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-screen bg-black text-gray-100">
        {/* Left Sidebar - Script Editor */}
        <div className="w-96 border-r border-gray-800 p-6 bg-black flex flex-col">
          <h2 className="text-xl font-semibold mb-6 text-white">Script Editor</h2>

          <Tabs defaultValue="basic" className="flex-1 flex flex-col ">
            <TabsList className="grid grid-cols-3 gap-3 bg-transparent mb-2 ">
              <TabsTrigger
                value="basic"
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium bg-[#7D5FF3]
                hover:bg-gray-900 data-[state=active]:bg-gray-800 data-[state=active]:text-white
                transition-colors"
              >
                <Film className="w-4 h-4" /> Basic
              </TabsTrigger>
              <TabsTrigger
                value="meta"
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium bg-[#7D5FF3]
                hover:bg-gray-900 data-[state=active]:bg-gray-800 data-[state=active]:text-white
                transition-colors"
              >
                <Palette className="w-4 h-4" /> Meta
              </TabsTrigger>
              <TabsTrigger
                value="tags"
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium bg-[#7D5FF3]
                hover:bg-gray-900 data-[state=active]:bg-gray-800 data-[state=active]:text-white
                transition-colors"
              >
                <Tag className="w-4 h-4" /> Tags
              </TabsTrigger>
            </TabsList>

            {/* Panels */}
            <ScrollArea className="flex-1 mt-6 pr-3">
              <TabsContent value="basic" className="space-y-6">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium text-white mb-2 block">
                    Script Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter script title..."
                    value={script.title}
                    onChange={(e) => updateLocalScript({ title: e.target.value })}
                    className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500 h-11"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-sm font-medium text-white mb-2 block">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your script concept..."
                    value={script.description}
                    onChange={(e) => updateLocalScript({ description: e.target.value })}
                    className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500 min-h-[120px] resize-none"
                  />
                </div>

                <div>
                  <Label htmlFor="genre" className="text-sm font-medium text-white mb-2 block">
                    Genre
                  </Label>
                  <Input
                    id="genre"
                    placeholder="e.g., sci-fi, anime, noir"
                    value={script.genre}
                    onChange={(e) => updateLocalScript({ genre: e.target.value })}
                    className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500 h-11"
                  />
                  <div className="flex flex-wrap gap-2 mt-3">
                    {genrePresets.map((genre) => (
                      <Button
                        key={genre}
                        variant="outline"
                        size="sm"
                        onClick={() => updateLocalScript({ genre })}
                        className="h-8 px-3 text-xs bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white hover:border-gray-500"
                      >
                        {genre}
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="meta" className="space-y-6">
                <div>
                  <Label htmlFor="negativePrompt" className="text-sm font-medium text-white mb-2 block">
                    Negative Prompt
                  </Label>
                  <Textarea
                    id="negativePrompt"
                    placeholder="What to avoid globally (e.g., blurry, low quality, distorted)..."
                    value={script.negativePrompt}
                    onChange={(e) => updateLocalScript({ negativePrompt: e.target.value })}
                    className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500 min-h-[120px] resize-none"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-white">Common Negative Terms</Label>
                  <div className="flex flex-wrap gap-2">
                    {["blurry", "low quality", "distorted", "watermark", "text", "signature", "amateur"].map((term) => (
                      <Button
                        key={term}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const current = script.negativePrompt;
                          const newNegative = current ? `${current}, ${term}` : term;
                          updateLocalScript({ negativePrompt: newNegative });
                        }}
                        className="h-8 px-3 text-xs bg-gray-800 border-gray-600 text-gray-300 hover:bg-red-700 hover:text-white hover:border-red-600"
                      >
                        {term}
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tags" className="space-y-6">
                <div className="flex gap-3">
                  <Input
                    placeholder="Add tag..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500 h-11"
                  />
                  <Button
                    onClick={() => addTag(tagInput)}
                    size="icon"
                    variant="secondary"
                    disabled={!tagInput.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-800 h-11 w-11"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {script.tags.map((tag, idx) => (
                    <Badge
                      key={idx}
                      className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer flex items-center gap-2 px-3 py-1"
                    >
                      {tag}
                      <X 
                        className="w-3 h-3 cursor-pointer hover:text-red-300" 
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-white">Common Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {commonTags.map((tag) => (
                      <Button
                        key={tag}
                        variant="outline"
                        size="sm"
                        onClick={() => addTag(tag)}
                        disabled={script.tags.includes(tag)}
                        className="h-8 px-3 text-xs bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>

          {/* Save Button */}
          <div className="mt-4 pt-4 border-t border-gray-800">
            <Button
              onClick={handleSave}
              className={`w-full ${hasUnsavedChanges 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
            >
              {hasUnsavedChanges ? 'Save Script *' : 'Save Script'}
            </Button>
            {hasUnsavedChanges && (
              <p className="text-xs text-yellow-400 mt-1 text-center">
                You have unsaved changes
              </p>
            )}
          </div>
        </div>

        {/* Right Side - Scenes Display */}
        <div className="flex-1 p-6 overflow-hidden">
          <h2 className="text-lg font-semibold mb-4 text-gray-200 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" /> 
            Scenes ({script.scenes.length})
          </h2>

          <ScrollArea className="h-full pr-4">
            <Accordion type="single" collapsible className="w-full">
              {script.scenes.map((scene) => (
                <AccordionItem
                  key={scene._id}
                  value={scene._id}
                  className="border border-gray-800 rounded-lg mb-2 bg-gray-900"
                >
                  <AccordionTrigger className="px-4 hover:bg-gray-800 transition-colors">
                    <div className="flex items-center justify-between w-full pr-4">
                      <span>{scene.title}</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => e.stopPropagation()}
                            className="text-gray-400 hover:text-white hover:bg-gray-700"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              viewScene(scene);
                            }}
                            className="text-gray-300 hover:text-white hover:bg-gray-700 cursor-pointer"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Scene
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteScene(scene._id);
                            }}
                            className="text-red-400 hover:text-red-300 hover:bg-red-900/20 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Scene
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-gray-300 whitespace-pre-wrap">
                    {scene.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
              {script.scenes.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No scenes created yet</p>
                  <p className="text-sm">Scenes will appear here when you generate them</p>
                </div>
              )}
            </Accordion>
          </ScrollArea>
        </div>
      </div>

      {/* Scene Modal */}
      {showSceneModal && selectedScene && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-lg max-w-4xl w-full max-h-[80vh] flex flex-col">
            <div className="p-6 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">{selectedScene.title}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSceneModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <ScrollArea className="flex-1 p-6">
              <div className="text-gray-300 whitespace-pre-wrap">
                {selectedScene.content}
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </>
  );
};

export default ScriptUpdate;