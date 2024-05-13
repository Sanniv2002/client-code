'use client'

import { useEffect, useRef } from 'react'
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'
import { socket } from '@/socket'
import { useRecoilState } from 'recoil'
import { renderAtom } from '@/store/atoms'

export default function XTerm() {
    const terminalRef = useRef<HTMLDivElement>(null);
    const [render, setRender] = useRecoilState(renderAtom)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const terminal = new Terminal({
                rows: 10,
                cols: 75
            });

            terminal.open(terminalRef.current as HTMLDivElement);
            if (socket) socket.send('clear \b')

            let commandBuffer = '';

            terminal.onData((data: string) => {
                if (data === '\r') {
                    socket.send(commandBuffer);
                    if (commandBuffer.includes('mkdir') || commandBuffer.includes('cp') || commandBuffer.includes('mv') || commandBuffer.includes('touch') || commandBuffer.includes('rm') || commandBuffer.includes('rm -r') || commandBuffer.includes('rmdir') || commandBuffer.includes('npm')) {
                        setRender(render => !render)
                        console.log(render)
                    }
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
    return <div className='' ref={terminalRef} />
}