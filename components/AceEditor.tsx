'use client'

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { codeAtom, fileAtom, loadingAtom } from "@/store/atoms";
import { useEffect, useRef } from "react";
import axios from "axios";

function Ace({setSaving}: {setSaving: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [code, setCode] = useRecoilState(codeAtom)
    const currentFile = useRecoilValue(fileAtom)
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
            setSaving(true)
            await axios.put("http://172.28.118.153:8000/code", {
                code: code.contents,
                filePath: code.filePath
            })
            setSaving(false)
        }
        updateRemoteCode()
    }, [code])


    function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
        let timeout: ReturnType<typeof setTimeout> | undefined;
        return function executedFunction(this: any, ...args: Parameters<T>) {
          const later = () => {
            timeout = undefined;
            func.apply(this, args);
          };
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
        } as T;
      }

      function debounceState<T>(func: (state: T) => void, newState: T, delay: number) {
        let timeoutId: NodeJS.Timeout | null = null;
    
        // Define the debounced function
        function debouncedFunction() {
            // Clear the existing timeout, if any
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
    
            // Set a new timeout to apply the state after the delay
            timeoutId = setTimeout(() => {
                // Apply the new state
                func(newState);
                timeoutId = null;
            }, delay);
        }
    
        // Return the debounced function
        return debouncedFunction;
    }
    

      const handleCodeChange = debounce((newCode: string) => {
        setCode({
            contents: newCode,
            filePath: code.filePath
        });
      }, 2000);

      console.log(code)

    return (
        <AceEditor
            onChange={handleCodeChange}
            height={`${window.innerHeight-100}px`}
            width={`${window.innerWidth-800}px`}
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