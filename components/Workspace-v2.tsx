"use client";

import { useState } from "react";
import Editor from "@/components/Editor-v2/editor";
import Terminal from "@/components/Editor-v2/terminal";
import Console from "@/components/Editor-v2/console";
import Navbar from "@/components/Editor-v2/navbar";
import FileExplorer from "@/components/Editor-v2/file-explorer";
import EditorTabs from "@/components/Editor-v2/editor-tabs";
import SettingsDialog from "@/components/Editor-v2/settings-dialog";
import { usePersistedState } from "@/hooks/use-persisted-state";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import axios from "axios";

interface FileItem {
  name: string;
  type: "file" | "directory";
  filePath?: string;
  children?: FileItem[];
}

interface EditorTab {
  id: string;
  name: string;
  content: string;
}

interface EditorSettings {
  fontSize: number;
  wordWrap: "on" | "off" | "wordWrapColumn";
  minimap: boolean;
}

const defaultSettings: EditorSettings = {
  fontSize: 14,
  wordWrap: "on",
  minimap: true,
};

export default function Workspace({alias, env} : {alias: string, env:string}) {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editorSettings, setEditorSettings] = usePersistedState<EditorSettings>("editor-settings", defaultSettings);
  const [tabs, setTabs] = useState<EditorTab[]>([
  ]);
  const [activeTab, setActiveTab] = useState("welcome");

  const handleRunCode = () => {
    try {
      const result = eval(code);
      setOutput(String(result));
    } catch (error) {
      setOutput(String(error));
    }
  };

  const handleFileSelect = async (file: FileItem) => {
    if (file.type === "file" && file.filePath) {
      // Check if the file is already open in a tab
      const existingTab = tabs.find((tab) => tab.name === file.name);
  
      if (existingTab) {
        // If the file is already open, switch to that tab
        setActiveTab(existingTab.id);
      } else {
        try {
          // Fetch file content from the server
          const response = await axios.get("http://localhost:50465/file", {
            params: { filePath: file.filePath },
          });
  
          const { contents } = response.data;
  
          // Create a new tab for the file
          const newTab = {
            id: `tab-${Date.now()}`, // Generate a unique ID for the tab
            name: file.name,
            content: contents,
          };
  
          // Add the new tab and activate it
          setTabs((prevTabs) => [...prevTabs, newTab]);
          setActiveTab(newTab.id);
  
          // Set code editor content and selected file state
          setCode(contents);
          setSelectedFile(file);
        } catch (error) {
          console.error("Error fetching file content:", error);
        }
      }
    }
  }; 

  const handleTabClose = (tabId: string) => {
    if (tabs.length > 1) {
      const newTabs = tabs.filter(tab => tab.id !== tabId);
      setTabs(newTabs);
      if (activeTab === tabId) {
        setActiveTab(newTabs[newTabs.length - 1].id);
        setCode(newTabs[newTabs.length - 1].content);
      }
    }
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      setCode(tab.content);
    }
  };

  const handleSettingsChange = (newSettings: Partial<EditorSettings>) => {
    setEditorSettings({ ...editorSettings, ...newSettings });
  };

  const handleTabsReorder = (newTabs: EditorTab[]) => {
    setTabs(newTabs);
  };

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="h-screen flex flex-col bg-[#1E1E1E]">
      <Navbar 
        onRunCode={handleRunCode} 
        fileName={selectedFile?.name}
        onSettingsClick={() => setSettingsOpen(true)}
      />
      
      <ResizablePanelGroup direction="horizontal" className="flex-grow">
        <ResizablePanel defaultSize={15} minSize={10} maxSize={30}>
          <FileExplorer onFileSelect={handleFileSelect} />
        </ResizablePanel>
        
        <ResizableHandle className="group hover:bg-[#007ACC]/20 transition-colors duration-200">
          <div className="w-1 h-8 mx-auto flex flex-col justify-center gap-1">
            <div className="w-0.5 h-1 bg-[#6B6B6B] group-hover:bg-[#007ACC] transition-colors duration-200" />
            <div className="w-0.5 h-1 bg-[#6B6B6B] group-hover:bg-[#007ACC] transition-colors duration-200" />
            <div className="w-0.5 h-1 bg-[#6B6B6B] group-hover:bg-[#007ACC] transition-colors duration-200" />
          </div>
        </ResizableHandle>
        
        <ResizablePanel defaultSize={85}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={70}>
              <EditorTabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={handleTabChange}
                onTabClose={handleTabClose}
                onTabsReorder={handleTabsReorder}
              />
              <Editor
                value={code}
                onChange={(value) => {
                  setCode(value);
                  const newTabs = tabs.map(tab =>
                    tab.id === activeTab ? { ...tab, content: value } : tab
                  );
                  setTabs(newTabs);
                }}
                settings={editorSettings}
                fileName={activeTabData?.name}
              />
            </ResizablePanel>
            
            <ResizableHandle className="group hover:bg-[#007ACC]/20 transition-colors duration-200">
              <div className="h-1 w-8 mx-auto flex justify-center gap-1">
                <div className="h-0.5 w-1 bg-[#6B6B6B] group-hover:bg-[#007ACC] transition-colors duration-200" />
                <div className="h-0.5 w-1 bg-[#6B6B6B] group-hover:bg-[#007ACC] transition-colors duration-200" />
                <div className="h-0.5 w-1 bg-[#6B6B6B] group-hover:bg-[#007ACC] transition-colors duration-200" />
              </div>
            </ResizableHandle>
            
            <ResizablePanel defaultSize={30}>
              <Tabs defaultValue="terminal" className="h-full">
                <TabsList className="bg-[#252526] border-b border-[#323232] p-0 h-9 rounded-none">
                  <TabsTrigger
                    value="terminal"
                    className="rounded-none px-4 h-9 data-[state=active]:bg-[#1E1E1E] data-[state=active]:border-t-2 data-[state=active]:border-t-[#007ACC]"
                  >
                    Terminal
                  </TabsTrigger>
                  <TabsTrigger
                    value="console"
                    className="rounded-none px-4 h-9 data-[state=active]:bg-[#1E1E1E] data-[state=active]:border-t-2 data-[state=active]:border-t-[#007ACC]"
                  >
                    Console
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="terminal" className="h-[calc(100%-36px)] m-0 p-0">
                  <Terminal />
                </TabsContent>
                
                <TabsContent value="console" className="h-[calc(100%-36px)] m-0 p-0">
                  <Console output={output} />
                </TabsContent>
              </Tabs>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>

      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        settings={editorSettings}
        onSettingsChange={handleSettingsChange}
      />
    </div>
  );
}