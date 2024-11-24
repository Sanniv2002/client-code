"use client";

import { Editor as MonacoEditor } from "@monaco-editor/react";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  settings: {
    fontSize: number;
    wordWrap: "on" | "off" | "wordWrapColumn";
    minimap: boolean;
  };
  fileName?: string;
}

const getLanguageFromFileName = (fileName: string): string => {
  const extension = fileName?.split('.').pop()?.toLowerCase() || '';
  
  const languageMap: { [key: string]: string } = {
    'js': 'javascript',
    'jsx': 'javascript',
    'ts': 'typescript',
    'tsx': 'javascript',
    'json': 'json',
    'html': 'html',
    'css': 'css',
    'scss': 'scss',
    'less': 'less',
    'md': 'markdown',
    'py': 'python',
    'java': 'java',
    'cpp': 'cpp',
    'c': 'c',
    'go': 'go',
    'rs': 'rust',
    'php': 'php',
    'sql': 'sql',
    'yaml': 'yaml',
    'yml': 'yaml',
    'xml': 'xml',
    'sh': 'shell',
    'bash': 'shell',
    'vue': 'vue',
    'svelte': 'svelte'
  };

  return languageMap[extension] || 'plaintext';
};

export default function Editor({ value, onChange, settings, fileName }: EditorProps) {
  const language = fileName ? getLanguageFromFileName(fileName) : 'javascript';

  return (
    <div className="h-full w-full bg-[#1E1E1E]">
      <MonacoEditor
        height="100%"
        defaultLanguage={language}
        language={language}
        theme="vs-dark"
        value={value}
        onChange={(value) => onChange(value || "")}
        options={{
          minimap: { enabled: settings.minimap },
          fontSize: settings.fontSize,
          fontFamily: "'JetBrains Mono', Menlo, Monaco, 'Courier New', monospace",
          wordWrap: settings.wordWrap,
          automaticLayout: true,
          padding: { top: 16 },
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          renderWhitespace: "selection",
          lineNumbers: "on",
          lineDecorationsWidth: 10,
          renderLineHighlight: "all",
          scrollbar: {
            vertical: 'visible',
            horizontal: 'visible',
            useShadows: true,
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10
          }
        }}
      />
    </div>
  );
}