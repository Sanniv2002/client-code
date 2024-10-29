"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loadingAtom, renderAtom } from "@/store/atoms";

export default function XTerm({alias} : {alias: string}) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [render, setRender] = useRecoilState(renderAtom);
  const setLoading = useSetRecoilState(loadingAtom);
  const [socket, setSocket] = useState<WebSocket>()

  useEffect(() => {
    const wsUrl = `wss://${alias}.${process.env.NEXT_PUBLIC_RESOURCE_DOMAIN}`;
    setSocket(new WebSocket(wsUrl))
  }, [])

  const initSocket = (ws: WebSocket) => {
    setLoading(true);
    if (ws.readyState === WebSocket.OPEN) {
      ws.send("clear \b");
      setLoading(false);
    } else {
      // Queue a retry
      setTimeout(() => {
        initSocket(ws);
      }, 1000);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const terminal = new Terminal({
        rows: 10,
        cols: 75,
      });

      terminal.open(terminalRef.current as HTMLDivElement);
      initSocket(socket!);

      let commandBuffer = "";

      terminal.onData((data: string) => {
        if (data === "\r") {
          socket!.send(commandBuffer);
          if (
            commandBuffer.includes("mkdir") ||
            commandBuffer.includes("cp") ||
            commandBuffer.includes("mv") ||
            commandBuffer.includes("touch") ||
            commandBuffer.includes("rm") ||
            commandBuffer.includes("rm -r") ||
            commandBuffer.includes("rmdir") ||
            commandBuffer.includes("npm")
          ) {
            setRender((render) => !render);
            console.log(render);
          }
          commandBuffer = "";
          terminal.write("\r");
        } else if (data === "\x7F") {
          // Handle backspace (ASCII code 127)
          if (commandBuffer.length > 0) {
            commandBuffer = commandBuffer.slice(0, -1);
            terminal.write("\b \b");
          }
        } else {
          commandBuffer += data;
          terminal.write(data);
        }
      });

      socket!.onmessage = (event) => {
        const message = event.data;
        terminal.write(message);
      };

      return () => {
        terminal.dispose();
      };
    }
  }, []);
  return <div className="" ref={terminalRef} />;
}