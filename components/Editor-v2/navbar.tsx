"use client";

import { Menu, Play, Settings, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  onRunCode: () => void;
  fileName?: string;
  onSettingsClick: () => void;
}

export default function Navbar({ onRunCode, fileName, onSettingsClick }: NavbarProps) {
  return (
    <nav className="border-b border-[#323232] bg-[#1E1E1E]">
      <div className="flex h-12 items-center px-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-[#323232]">
              <Menu className="h-5 w-5 text-[#CCCCCC]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-[#252526] border-[#323232]">
            <DropdownMenuItem className="text-[#CCCCCC] focus:bg-[#37373D] focus:text-[#CCCCCC]">
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem className="text-[#CCCCCC] focus:bg-[#37373D] focus:text-[#CCCCCC]">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center ml-4">
          <Code2 className="h-5 w-5 text-[#007ACC] mr-2" />
          <span className="text-lg font-semibold text-[#007ACC]">Scriptbox</span>
        </div>

        {/* {fileName && (
          <div className="ml-4 text-sm text-[#CCCCCC]">
            {fileName}
          </div>
        )} */}

        <div className="flex-1" />

        <Button
          onClick={onRunCode}
          className="bg-[#37373D] hover:bg-[#2D2D2D] text-[#CCCCCC] border-none"
          size="sm"
        >
          <Play className="h-4 w-4 mr-2" />
          Run
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="ml-2 hover:bg-[#323232]"
          onClick={onSettingsClick}
        >
          <Settings className="h-5 w-5 text-[#CCCCCC]" />
        </Button>
      </div>
    </nav>
  );
}