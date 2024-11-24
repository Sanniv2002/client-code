"use client";

interface ConsoleProps {
  output: string;
}

export default function Console({ output }: ConsoleProps) {
  return (
    <div className="h-full w-full bg-[#1E1E1E] flex flex-col rounded-md overflow-hidden">
      <div className="bg-[#252526] px-4 py-2 text-[#A9B7C6] text-sm border-b border-[#323232]">
        Console Output
      </div>
      <div className="flex-1 p-4 font-mono text-sm overflow-auto">
        {output ? (
          <pre className="text-[#A9B7C6]">{output}</pre>
        ) : (
          <div className="text-[#6A737D] italic">No output to display</div>
        )}
      </div>
    </div>
  );
}