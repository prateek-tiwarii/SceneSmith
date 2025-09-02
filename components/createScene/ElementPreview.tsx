"use client";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Camera,
  Image as ImageIcon,
  Monitor,
  Wand2,
  Play,
  Download,
  RotateCcw,
  Check,
  X,
} from "lucide-react";
import Image from "next/image";

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

interface ScenePreviewProps {
  scene: SceneFormData;
  onGenerate?: () => void;
  onAccept?: () => void;
  onReject?: () => void;
  onRetry?: () => void;
}

const ScenePreview: React.FC<ScenePreviewProps> = ({
  scene,
  onGenerate,
  onAccept,
  onReject,
  onRetry,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/20";
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/20";
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/20";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <div className="h-[calc(100vh-56px)] bg-[#1A1C22] p-6">
      <ScrollArea className="h-full">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">
              {scene.title || "Untitled Scene"}
            </h1>
            <div className="flex items-center justify-center gap-2">
              <Badge className={getStatusColor(scene.status)}>
                Scene #{scene.order} •{" "}
                {scene.status.charAt(0).toUpperCase() + scene.status.slice(1)}
              </Badge>
            </div>
          </div>

          {/* Generation Controls */}
          <Card className="bg-[#2A2D34] border-[#3A3A3A]">
            <CardContent className="pt-6">
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={onGenerate}
                  disabled={scene.status === "pending" || !scene.title}
                  className="bg-[#7D5FF3] hover:bg-[#6B47E0] text-white disabled:opacity-50"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {scene.status === "pending"
                    ? "Generating..."
                    : "Generate Scene"}
                </Button>

                {scene.status === "failed" && (
                  <Button
                    onClick={onRetry}
                    variant="outline"
                    className="border-[#3A3A3A] text-[#C0C0C0] hover:bg-[#2A2D34]"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Retry
                  </Button>
                )}

                {scene.status === "completed" && (
                  <>
                    <Button
                      onClick={onAccept}
                      className="bg-green-600 hover:bg-green-500 text-white"
                    >
                      <Check className="w-4 h-4 mr-2" /> Accept
                    </Button>
                    <Button
                      onClick={onReject}
                      className="bg-red-600 hover:bg-red-500 text-white"
                    >
                      <X className="w-4 h-4 mr-2" /> Reject
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#3A3A3A] text-[#C0C0C0] hover:bg-[#2A2D34]"
                      onClick={() => {
                        if (scene.imageURL) {
                          const link = document.createElement("a");
                          link.href = scene.imageURL;
                          link.download = `${scene.title || "scene"}.png`;
                          link.click();
                        }
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Image Preview */}
          <Card className="bg-[#2A2D34] border-[#3A3A3A]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <ImageIcon className="w-5 h-5" />
                Generated Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-[#1A1C22] border-2 border-dashed border-[#3A3A3A] rounded-lg flex items-center justify-center overflow-hidden">
                {scene.status === "pending" ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7D5FF3] mx-auto mb-2"></div>
                    <p className="text-[#8E8E90] text-sm">Generating image...</p>
                  </div>
                ) : scene.status === "completed" && scene.imageURL ? (
                  <Image
                    src={scene.imageURL}
                    alt="Generated Scene"
                    width={512}
                    height={512}
                    className="object-cover rounded-lg"
                  />
                ) : scene.status === "failed" ? (
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-red-400 mx-auto mb-2" />
                    <p className="text-red-400 text-sm">Generation failed</p>
                    <p className="text-[#8E8E90] text-xs">
                      Try adjusting the prompt
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-[#8E8E90] mx-auto mb-2" />
                    <p className="text-[#8E8E90] text-sm">
                      No image generated yet
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Scene Details */}
          <Card className="bg-[#2A2D34] border-[#3A3A3A]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <Camera className="w-5 h-5" />
                Scene Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-[#C0C0C0] mb-1">Title</h3>
                <p className="text-white">{scene.title || "Not specified"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#C0C0C0] mb-1">Description</h3>
                <p className="text-white text-sm leading-relaxed">
                  {scene.description || "No description provided"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-[#C0C0C0] mb-1">Order</h3>
                  <Badge className="bg-blue-500/20 text-blue-400">
                    #{scene.order}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#C0C0C0] mb-1">
                    Resolution
                  </h3>
                  <Badge className="bg-purple-500/20 text-purple-400">
                    <Monitor className="w-3 h-3 mr-1" />
                    {scene.resolution}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Settings */}
          <Card className="bg-[#2A2D34] border-[#3A3A3A]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-white">
                <Wand2 className="w-5 h-5" />
                Generation Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-[#C0C0C0] mb-1">AI Model</h3>
                <Badge className="bg-[#7D5FF3]/20 text-[#7D5FF3]">
                  {scene.modelUsed}
                </Badge>
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#C0C0C0] mb-1">
                  Generated Prompt
                </h3>
                <div className="bg-[#1A1C22] border border-[#3A3A3A] rounded-md p-3">
                  <p className="text-white text-sm leading-relaxed">
                    {scene.generatedPrompt || (
                      <span className="text-[#8E8E90] italic">
                        Prompt will be generated automatically...
                      </span>
                    )}
                  </p>
                </div>
              </div>
              {scene.negativePrompt && (
                <div>
                  <h3 className="text-sm font-medium text-[#C0C0C0] mb-1">
                    Negative Prompt
                  </h3>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-md p-3">
                    <p className="text-white text-sm leading-relaxed">
                      {scene.negativePrompt}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ScenePreview;
