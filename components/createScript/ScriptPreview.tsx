'use client'
import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Film, Tag, AlertTriangle, FileText } from 'lucide-react';

interface ScriptFormData {
  title: string;
  description: string;
  genre: string;
  negativePrompt: string;
  tags: string[];
}

interface ScriptPreviewProps {
  script: ScriptFormData;
}

const ScriptPreview: React.FC<ScriptPreviewProps> = ({ script }) => {
  return (
    <div className="h-[calc(100vh-56px)] bg-[#1A1C22] p-6">
      <ScrollArea className="h-full">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">
              {script.title || "Untitled Script"}
            </h1>
            <p className="text-[#8E8E90]">Script Preview</p>
          </div>

          <Card className="bg-[#2A2D34] border-[#3A3A3A]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <FileText className="w-5 h-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-[#C0C0C0] mb-1">Title</h3>
                <p className="text-white">{script.title || "Not specified"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#C0C0C0] mb-1">Description</h3>
                <p className="text-white text-sm leading-relaxed">
                  {script.description || "No description provided"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#C0C0C0] mb-1">Genre</h3>
                <p className="text-white">{script.genre || "Not specified"}</p>
              </div>
            </CardContent>
          </Card>

          {script.tags.length > 0 && (
            <Card className="bg-[#2A2D34] border-[#3A3A3A]">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Tag className="w-5 h-5" />
                  Tags ({script.tags.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {script.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      className="bg-[#7D5FF3] text-white hover:bg-[#6B47E0]"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {script.negativePrompt && (
            <Card className="bg-[#2A2D34] border-[#3A3A3A]">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-white">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  Negative Prompt
                </CardTitle>
                <CardDescription className="text-[#8E8E90]">
                  Elements to avoid in all scenes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white text-sm leading-relaxed bg-red-500/10 border border-red-500/20 rounded-md p-3">
                  {script.negativePrompt}
                </p>
              </CardContent>
            </Card>
          )}

          <Card className="bg-[#2A2D34] border-[#3A3A3A]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <Film className="w-5 h-5" />
                Scenes
              </CardTitle>
              <CardDescription className="text-[#8E8E90]">
                No scenes added yet. Use the Scene Editor to add scenes to your script.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-[#3A3A3A] rounded-lg p-8 text-center">
                <Film className="w-12 h-12 text-[#8E8E90] mx-auto mb-2" />
                <p className="text-[#8E8E90] text-sm">
                  Add your first scene to get started
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ScriptPreview;
