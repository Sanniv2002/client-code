"use client";

import { ChevronRight, ChevronDown, File, Folder } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import axios from "axios";

interface FileItem {
  name: string;
  type: "file" | "directory";
  content?: string;
  children?: FileItem[];
}

interface FileTreeNode {
  name: string;
  type: "directory" | "file";
  filePath: string; // Add filePath property
  children?: FileTreeNode[];
}

// const demoFiles: FileItem[] = [
//   {
//     name: "src",
//     type: "folder",
//     children: [
//       { 
//         name: "index.js",
//         type: "file",
//         content: "console.log('Hello from index.js!');"
//       },
//       { 
//         name: "styles.css",
//         type: "file",
//         content: "body { margin: 0; padding: 0; }"
//       },
//       {
//         name: "components",
//         type: "folder",
//         children: [
//           { 
//             name: "Button.jsx",
//             type: "file",
//             content: "export default function Button() {\n  return <button>Click me</button>;\n}"
//           },
//           { 
//             name: "Card.jsx",
//             type: "file",
//             content: "export default function Card() {\n  return <div className='card'>Card Content</div>;\n}"
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "public",
//     type: "folder",
//     children: [
//       { name: "favicon.ico", type: "file" },
//       { name: "robots.txt", type: "file" },
//     ],
//   },
//   { 
//     name: "package.json",
//     type: "file",
//     content: '{\n  "name": "my-app",\n  "version": "1.0.0"\n}'
//   },
//   { 
//     name: "README.md",
//     type: "file",
//     content: "# My Project\n\nWelcome to my project!"
//   },
// ];

interface FileTreeItemProps {
  item: FileItem;
  depth: number;
  onSelect: (file: FileItem) => void;
  selectedFile: FileItem | null;
}

function FileTreeItem({ item, depth, onSelect, selectedFile }: FileTreeItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isSelected = selectedFile?.name === item.name;

  return (
    <div>
      <div
        className={cn(
          "h-6 flex items-center px-2 cursor-pointer hover:bg-[#2A2D2E] rounded-sm my-[1px]",
          isSelected && "bg-[#37373D] hover:bg-[#37373D]"
        )}
        onClick={() => {
          if (item.type === "directory") {
            setIsOpen(!isOpen);
          } else {
            onSelect(item);
          }
        }}
        style={{ paddingLeft: `${(depth * 8) + 8}px` }}
      >
        <span className="flex items-center text-[#CCCCCC] text-sm">
          {item.type === "directory" && (
            <span className="mr-1">
              {isOpen ? (
                <ChevronDown className="h-4 w-4 text-[#CCCCCC]" />
              ) : (
                <ChevronRight className="h-4 w-4 text-[#CCCCCC]" />
              )}
            </span>
          )}
          {item.type === "directory" ? (
            <Folder className="h-4 w-4 mr-2 text-[#E8AB53]" />
          ) : (
            <File className="h-4 w-4 mr-2 text-[#519ABA]" />
          )}
          {item.name}
        </span>
      </div>
      {item.type === "directory" && isOpen && item.children?.map((child, index) => (
        <FileTreeItem
          key={index}
          item={child}
          depth={depth + 1}
          onSelect={onSelect}
          selectedFile={selectedFile}
        />
      ))}
    </div>
  );
}

export default function FileExplorer({ onFileSelect }: { onFileSelect: (file: FileItem) => void }) {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [tree, setTree] = useState<FileTreeNode[]>();

  useEffect(() => {
    async function getFiles() {
      try {
        const response = await axios.get(`http://localhost:50465/files`);
        const fetchedTree = response.data.tree;

        // Flatten the tree if there is only one root directory
        const processedTree =
          fetchedTree.length === 1 && fetchedTree[0].type === "directory"
            ? fetchedTree[0].children || []
            : fetchedTree;

        // Sort directories first, then files
        setTree(sortTreeItems(processedTree));
      } catch (e) {
        setTimeout(getFiles, 3000);
      }
    }
    getFiles();
  }, []);

  // Recursive function to sort directories before files
  const sortTreeItems = (items: FileTreeNode[]): FileTreeNode[] => {
    return items
      .map(item => ({
        ...item,
        children: item.children ? sortTreeItems(item.children) : undefined, // Recursively sort children
      }))
      .sort((a, b) => {
        if (a.type === "directory" && b.type !== "directory") return -1;
        if (a.type !== "directory" && b.type === "directory") return 1;
        return a.name.localeCompare(b.name); // Sort alphabetically within types
      });
  };


  const handleSelect = (file: FileItem) => {
    setSelectedFile(file);
    onFileSelect(file);
  };

  return (
    <div className="h-full bg-[#252526] text-[#CCCCCC] ps-4">
      <div className="p-2 text-xs font-medium uppercase tracking-wider text-[#CCCCCC]/60">
        Explorer
      </div>
      <div>
        {tree?.map((item, index) => (
          <FileTreeItem
            key={index}
            item={item}
            depth={0}
            onSelect={handleSelect}
            selectedFile={selectedFile}
          />
        ))}
      </div>
    </div>
  );
}