import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pointer } from "@/components/magicui/pointer";
import { motion } from "motion/react";
import Router from 'next/router';
import { 
  Edit, 
  Plus, 
  Trash2, 
  Film, 
  Calendar, 
  MoreVertical,
  Eye
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface Script {
  id: string;
  title: string;
  description: string;
  genre: string;
  tags: string[];
  createdAt: string;
  author: string;
  scenesCount: number;
  status: 'draft' | 'completed' | 'in-progress';
}



const RecentScripts = () => {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  
  const fetchScriptData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/project/get-all');
      return response.data.scripts;

    } catch (error) {
      console.error("Error fetching script data:", error);
      setError("Failed to fetch scripts");
      return [];
    } finally {
      setLoading(false);
    }
  };



  // Transform API data to match our interface
  const transformApiData = (apiScripts: any[]): Script[] => {
    return apiScripts.map((script: any) => ({
      id: script._id,
      title: script.title,
      description: script.description,
      genre: script.genre,
      tags: script.tags || [],
      createdAt: script.createdAt,
      author: script.author?.name || 'Unknown Author',
      scenesCount: script.scenes?.length || 0,
      status: script.scenes?.length > 0 ? 'in-progress' : 'draft' // Determine status based on scenes
    }));
  };

  useEffect(() => {
    const loadScripts = async () => {
      try {
        const apiScripts = await fetchScriptData();
        if (apiScripts && apiScripts.length > 0) {
          const transformedScripts = transformApiData(apiScripts);
          setScripts(transformedScripts);
        } else {
          setScripts([]);
        }
      } catch (err) {
        console.error("Error loading scripts:", err);
        setScripts([]);
      }
    };

    loadScripts();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'in-progress': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'draft': return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const handleEditScript = (scriptId: string) => {
    router.push(`/dashboard/script/${scriptId}`);
  };

  const handleAddScene = (scriptId: string) => {
    router.push(`/dashboard/script/${scriptId}/scene/create`);
  };

  const handleDeleteScript = async (scriptId: string) => {
  try {
    const response = await axios.delete(`/api/project/${scriptId}`);

    if (response.status === 200) {
      toast.success('Script deleted successfully!');

      setTimeout(() => {
        window.location.reload();
      }, 1000); 
    }
  } catch (error) {
    console.error(error);
    toast.error('Failed to delete script!');
  }
};


  const handleViewScript = (scriptId: string) => {
    router.push(`/dashboard/script/${scriptId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Recent Scripts</h2>
            <p className="text-gray-400 text-sm">Loading your scripts...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-black/40 backdrop-blur-sm border-gray-800 animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-700 rounded"></div>
                  <div className="h-3 bg-gray-700 rounded w-5/6"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Recent Scripts</h2>
            <p className="text-red-400 text-sm">{error}</p>
          </div>
          <Button 
            onClick={() => window.location.reload()}
            className="bg-white text-black hover:bg-gray-100 font-medium"
            size="sm"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Recent Scripts</h2>
          <p className="text-gray-400 text-sm">Your latest AI image generation scripts</p>
        </div>
        <Button 
          className="bg-white text-black hover:bg-gray-100 font-medium"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Script
        </Button>
      </div>

      {/* Scripts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {scripts.map((script) => (
          <Card 
            key={script.id}
            className="group relative bg-black/40 backdrop-blur-sm border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden"
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
            
            <CardHeader className="pb-3 relative">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <CardTitle className="text-lg text-white group-hover:text-gray-100 transition-colors line-clamp-1">
                    {script.title}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-white/10 text-white text-xs px-2 py-0.5 border-0">
                      {script.genre}
                    </Badge>
                    <Badge className={`text-xs px-2 py-0.5 border ${getStatusColor(script.status)}`}>
                      {script.status.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
                
                {/* Action Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white hover:bg-white/10"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-black/90 backdrop-blur-sm border-gray-800">
                    <DropdownMenuItem 
                      onClick={() => handleViewScript(script.id)}
                      className="text-white hover:bg-white/10 cursor-pointer"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Script
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleEditScript(script.id)}
                      className="text-white hover:bg-white/10 cursor-pointer"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Script
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleAddScene(script.id)}
                      className="text-white hover:bg-white/10 cursor-pointer"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Scene
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDeleteScript(script.id)}
                      className="text-red-400 hover:bg-red-500/10 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Script
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 relative">
              {/* Description */}
              <CardDescription className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                {script.description}
              </CardDescription>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {script.tags.slice(0, 3).map((tag, index) => (
                  <Badge 
                    key={index}
                    variant="outline"
                    className="border-gray-700 text-gray-400 text-xs px-2 py-0.5 hover:border-gray-600 hover:text-gray-300 transition-colors bg-white/5"
                  >
                    {tag}
                  </Badge>
                ))}
                {script.tags.length > 3 && (
                  <Badge 
                    variant="outline"
                    className="border-gray-700 text-gray-400 text-xs px-2 py-0.5 bg-white/5"
                  >
                    +{script.tags.length - 3}
                  </Badge>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Film className="w-3 h-3" />
                  <span>{script.scenesCount} scenes</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(script.createdAt)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  onClick={() => handleEditScript(script.id)}
                  className="flex-1 bg-white text-black hover:bg-gray-100 text-xs font-medium"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button 
                  size="sm"
                  variant="outline"
                  onClick={() => handleAddScene(script.id)}
                  className="flex-1 border-gray-700 text-gray-300 hover:bg-white/10 hover:text-white text-xs bg-white/5"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Scene
                </Button>
              </div>
            </CardContent>

            {/* Magic UI Pointer */}
            <Pointer>
              <motion.div
                animate={{
                  scale: [0.8, 1, 0.8],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <motion.path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    fill="currentColor"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    animate={{ 
                      strokeDasharray: ["0 100", "100 100"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </svg>
              </motion.div>
            </Pointer>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {scripts.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
            <Film className="relative w-16 h-16 text-gray-500 mx-auto mb-4" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">No Scripts Yet</h3>
          <p className="text-gray-400 mb-6">Create your first AI image generation script to get started</p>
          <Button className="bg-white text-black hover:bg-gray-100 font-medium">
            <Plus className="w-4 h-4 mr-2" />
            Create New Script
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentScripts;