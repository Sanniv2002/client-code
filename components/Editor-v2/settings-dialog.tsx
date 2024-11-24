"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/utils/cn";

interface EditorSettings {
  fontSize: number;
  wordWrap: "on" | "off" | "wordWrapColumn";
  minimap: boolean;
}

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: EditorSettings;
  onSettingsChange: (settings: Partial<EditorSettings>) => void;
}

export default function SettingsDialog({ 
  open, 
  onOpenChange, 
  settings, 
  onSettingsChange 
}: SettingsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#252526] text-[#CCCCCC] border-[#323232]">
        <DialogHeader>
          <DialogTitle className="text-[#CCCCCC]">Editor Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="minimap">Show Minimap</Label>
            <Switch
              id="minimap"
              checked={settings.minimap}
              className={cn(
                "relative inline-flex items-center h-6 w-6",
                settings.minimap ? "bg-[#2cff48]" : "bg-[#fc2d2d]"
              )}
              onCheckedChange={(checked) => onSettingsChange({ minimap: checked })}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full transition",
                  settings.minimap ? "translate-x-5 bg-[#CCCCCC]" : "translate-x-1 bg-white"
                )}
              />
            </Switch>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="word-wrap">Word Wrap</Label>
            <Select 
              value={settings.wordWrap} 
              onValueChange={(value: "on" | "off" | "wordWrapColumn") => 
                onSettingsChange({ wordWrap: value })
              }
            >
              <SelectTrigger id="word-wrap" className="bg-[#323232] border-[#424242]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#323232] border-[#424242]">
                <SelectItem value="off" className="hover:bg-[#519ABA] hover:text-white">
                  Off
                </SelectItem>
                <SelectItem value="on" className="hover:bg-[#519ABA] hover:text-white">
                  On
                </SelectItem>
                <SelectItem value="wordWrapColumn" className="hover:bg-[#519ABA] hover:text-white">
                  Wrap at Column
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="font-size">Font Size</Label>
            <Select 
              value={String(settings.fontSize)}
              onValueChange={(value) => onSettingsChange({ fontSize: parseInt(value, 10) })}
            >
              <SelectTrigger id="font-size" className="bg-[#323232] border-[#424242]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#323232] border-[#424242]">
                {[12, 14, 16, 18, 20].map((size) => (
                  <SelectItem key={size} value={String(size)} className="hover:bg-[#519ABA] hover:text-white">
                    {size}px
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
