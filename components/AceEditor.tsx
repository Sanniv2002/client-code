'use client'

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { codeAtom, fileAtom, loadingAtom } from "@/store/atoms";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function Ace() {
    const [code, setCode] = useRecoilState(codeAtom)
    const currentFile = useRecoilValue(fileAtom)
    const setSaving = useSetRecoilState(loadingAtom); // Update loading state
    const isInitialMount = useRef(true);

    useEffect(() => {
        const getCode = async () => {
            const axiosData = await axios.get(`http://172.28.118.153:8000/file?filePath=${currentFile.filePath}`)
            setCode(axiosData.data)
        }
        getCode()
    }, [currentFile])

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
    
        const updateRemoteCode = async () => {
            setSaving(true); // Set saving state to true
            try {
                await axios.put("http://172.28.118.153:8000/code", {
                    code: code.contents,
                    filePath: code.filePath
                })
            } catch(e) {
                console.error(e)
            }
            setSaving(false); // Set saving state back to false after code update
        }
        updateRemoteCode()
    }, [code])


    function debounce<T extends (...args: any[]) => void>(
        func: T,
        wait: number,
        setLoading: React.Dispatch<React.SetStateAction<boolean>> // Add setLoading callback
      ) {
        let timeout: ReturnType<typeof setTimeout> | undefined;
        return function executedFunction(this: any, ...args: Parameters<T>) {
          const later = () => {
            timeout = undefined;
            setLoading(false); // Set saving state back to false when debounce ends
            func.apply(this, args);
          };
          clearTimeout(timeout);
          setLoading(true); // Set saving state to true when debounce starts
          timeout = setTimeout(later, wait);
        } as T;
      }
      

      const handleCodeChange = debounce(
        (newCode: string) => {
          setCode({
            contents: newCode,
            filePath: code.filePath
          });
        },
        500,
        setSaving // Pass setSaving function to debounce
      );
      

    return (
        <AceEditor
            onChange={handleCodeChange}
            height={`${window.innerHeight - 360}px`}
            width={`${window.innerWidth - 800}px`}
            value={code.contents}
            mode="javascript"
            theme="monokai"
            fontSize="16px"
            highlightActiveLine={true}
            setOptions={{
                enableLiveAutocompletion: true,
                showLineNumbers: true,
                tabSize: 2
            }}
        />
    );
}

export default Ace;
