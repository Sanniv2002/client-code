"use client";

import { useEffect, useRef } from "react";
import { Terminal as XTerm } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { WebLinksAddon } from "xterm-addon-web-links";
import "xterm/css/xterm.css";

export default function Terminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new XTerm({
      theme: {
        background: 'rgba(30, 30, 30, 0.95)',
        foreground: '#A9B7C6',
        cursor: '#A9B7C6',
        selection: '#214283',
        black: '#000000',
        brightBlack: '#555555',
        red: '#FF5370',
        brightRed: '#FF5370',
        green: '#C3E88D',
        brightGreen: '#C3E88D',
        yellow: '#FFCB6B',
        brightYellow: '#FFCB6B',
        blue: '#82AAFF',
        brightBlue: '#82AAFF',
        magenta: '#C792EA',
        brightMagenta: '#C792EA',
        cyan: '#89DDFF',
        brightCyan: '#89DDFF',
        white: '#FFFFFF',
        brightWhite: '#FFFFFF',
      },
      fontSize: 14,
      fontFamily: "'JetBrains Mono', Menlo, Monaco, 'Courier New', monospace",
      cursorBlink: true,
      cursorStyle: 'block',
      scrollback: 1000,
      lineHeight: 1.2,
    });

    const fitAddon = new FitAddon();
    fitAddonRef.current = fitAddon;
    const webLinksAddon = new WebLinksAddon();

    term.loadAddon(fitAddon);
    term.loadAddon(webLinksAddon);

    term.open(terminalRef.current);
    
    setTimeout(() => {
      fitAddon.fit();
    }, 100);

    term.writeln('\x1b[1;36m$ Welcome to the terminal!\x1b[0m');
    term.writeln('\x1b[90m$ Type "help" for available commands\x1b[0m');
    
    term.onData((data) => {
      term.write(data);
    });

    xtermRef.current = term;

    const resizeObserver = new ResizeObserver(() => {
      if (fitAddonRef.current) {
        setTimeout(() => {
          fitAddonRef.current.fit();
        }, 0);
      }
    });

    resizeObserver.observe(terminalRef.current);

    return () => {
      resizeObserver.disconnect();
      term.dispose();
    };
  }, []);

  return (
    <div className="terminal-container h-full w-full bg-[#1E1E1E] rounded-md overflow-hidden">
      <div className="terminal-header bg-[#252526] px-4 py-2 text-[#A9B7C6] text-sm border-b border-[#323232]">
        Terminal
      </div>
      <div ref={terminalRef} className="h-[calc(100%-36px)] w-full" />
    </div>
  );
}