"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loadingAtom, renderAtom } from "@/store/atoms";

export default function XTerm({ alias }: { alias: string }) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [render, setRender] = useRecoilState(renderAtom);
  const setLoading = useSetRecoilState(loadingAtom);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [attempt, setAttempt] = useState(0);

  const MAX_RETRIES = 5; // Maximum reconnection attempts
  const RECONNECT_INTERVAL = 2000; // Interval between reconnect attempts in ms

  const createWebSocket = () => {
    const wsUrl = `wss://${alias}.${process.env.NEXT_PUBLIC_RESOURCE_DOMAIN}`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("WebSocket connection opened");
      initSocket(ws);
      setAttempt(0); // Reset attempts on successful connection
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = (event) => {
      console.warn("WebSocket closed:", event);
      if (attempt < MAX_RETRIES) {
        setTimeout(() => {
          console.log(`Reconnecting... Attempt ${attempt + 1}`);
          setAttempt((prev) => prev + 1);
          createWebSocket();
        }, RECONNECT_INTERVAL);
      } else {
        console.error("Max reconnection attempts reached. Connection failed.");
      }
    };

    setSocket(ws);
  };

  useEffect(() => {
    createWebSocket();

    return () => {
      socket?.close();
      setSocket(null);
    };
  }, [alias]);

  const initSocket = (ws: WebSocket) => {
    setLoading(true);
    if (ws.readyState === WebSocket.OPEN) {
      ws.send("clear \b");
      setLoading(false);
    } else {
      setTimeout(() => initSocket(ws), 1000);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && socket) {
      const terminal = new Terminal({ rows: 10, cols: 75 });
      terminal.open(terminalRef.current as HTMLDivElement);

      let commandBuffer = "";

      terminal.onData((data: string) => {
        if (data === "\r") {
          socket.send(commandBuffer);
          if (
            ["mkdir", "cp", "mv", "touch", "rm", "rmdir", "npm"].some((cmd) =>
              commandBuffer.includes(cmd)
            )
          ) {
            setRender((prev) => !prev);
          }
          commandBuffer = "";
          terminal.write("\r");
        } else if (data === "\x7F") {
          // Handle backspace
          if (commandBuffer.length > 0) {
            commandBuffer = commandBuffer.slice(0, -1);
            terminal.write("\b \b");
          }
        } else {
          commandBuffer += data;
          terminal.write(data);
        }
      });

      socket.onmessage = (event) => {
        const message = event.data;
        terminal.write(message);
      };

      return () => {
        terminal.dispose();
      };
    }
  }, [socket]);

  return <div ref={terminalRef} />;
}
