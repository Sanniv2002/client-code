'use client'

import { useEffect, useRef } from 'react'
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'
import { socket } from '@/socket'

export default function XTerm() {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const terminal = new Terminal({
            rows: 30,
            cols: 20
        });

        terminal.open(terminalRef.current as HTMLDivElement);

        let commandBuffer = '';

        terminal.onData((data: string) => {
            if (data === '\r') {
                socket.send(commandBuffer);
                commandBuffer = '';
                terminal.write('\r');
            } else if (data === '\x7F') {
                // Handle backspace (ASCII code 127)
                if (commandBuffer.length > 0) {
                    commandBuffer = commandBuffer.slice(0, -1);
                    terminal.write('\b \b');
                }
            } else {
                commandBuffer += data;
                terminal.write(data);
            }
        });

        socket.onopen = () => {
          terminal.write("\r")
            socket.send('\b')
        }
        socket.onmessage = (event) => {
            const message = event.data;
            terminal.write(message);
        };

        return () => {
            terminal.dispose();
        };
    }
}, []);


  return <div className='w-96' ref={terminalRef} />
}