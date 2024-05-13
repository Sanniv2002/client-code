'use client'

import { fileAtom, outputAtom, pageAtom } from "@/store/atoms"
import { useRecoilValue, useSetRecoilState } from "recoil"
import Ace from "./AceEditor"
import { useState } from "react"
import axios from "axios"

export default function MyEditor() {
    const file = useRecoilValue(fileAtom)
    const setOutput = useSetRecoilState(outputAtom)
    const [running, setRunning] = useState(false)
    const setPage = useSetRecoilState(pageAtom)

    function fileIcon(name: string) {
        return <div>
            {name.endsWith('.js') ?
                <svg className="size-5" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                    <path fill="#f7df1e" d="M6,42V6h36v36H6z"></path><path fill="#000001" d="M29.538,32.947c0.692,1.124,1.444,2.201,3.037,2.201c1.338,0,2.04-0.665,2.04-1.585 c0-1.101-0.726-1.492-2.198-2.133l-0.807-0.344c-2.329-0.988-3.878-2.226-3.878-4.841c0-2.41,1.845-4.244,4.728-4.244 c2.053,0,3.528,0.711,4.592,2.573l-2.514,1.607c-0.553-0.988-1.151-1.377-2.078-1.377c-0.946,0-1.545,0.597-1.545,1.377 c0,0.964,0.6,1.354,1.985,1.951l0.807,0.344C36.452,29.645,38,30.839,38,33.523C38,36.415,35.716,38,32.65,38 c-2.999,0-4.702-1.505-5.65-3.368L29.538,32.947z M17.952,33.029c0.506,0.906,1.275,1.603,2.381,1.603 c1.058,0,1.667-0.418,1.667-2.043V22h3.333v11.101c0,3.367-1.953,4.899-4.805,4.899c-2.577,0-4.437-1.746-5.195-3.368 L17.952,33.029z"></path>
                </svg> :
                name.endsWith('.txt') ?
                    <img className="size-5 mt-0.5" src="https://img.icons8.com/ios/50/FFFFFF/edit-text-file.png" alt="edit-text-file" /> :
                    name.endsWith(".json") ? <img className="size-5" src="https://img.icons8.com/glyph-neue/64/FFFFFF/json.png" alt="json" /> :
                        name.endsWith(".ts") ? <svg className="size-5" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                            <linearGradient id="O2zipXlwzZyOse8_3L2yya_wpZmKzk11AzJ_gr1" x1="15.189" x2="32.276" y1="-.208" y2="46.737" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2aa4f4"></stop><stop offset="1" stop-color="#007ad9"></stop></linearGradient><rect width="36" height="36" x="6" y="6" fill="url(#O2zipXlwzZyOse8_3L2yya_wpZmKzk11AzJ_gr1)"></rect><polygon fill="#fff" points="27.49,22 14.227,22 14.227,25.264 18.984,25.264 18.984,40 22.753,40 22.753,25.264 27.49,25.264"></polygon><path fill="#fff" d="M39.194,26.084c0,0-1.787-1.192-3.807-1.192s-2.747,0.96-2.747,1.986	c0,2.648,7.381,2.383,7.381,7.712c0,8.209-11.254,4.568-11.254,4.568V35.22c0,0,2.152,1.622,4.733,1.622s2.483-1.688,2.483-1.92	c0-2.449-7.315-2.449-7.315-7.878c0-7.381,10.658-4.469,10.658-4.469L39.194,26.084z"></path>
                        </svg> : <svg className="size-6" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 300 200"
                        >
                            <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(5.12,5.12)"><path d="M7,2v46h36v-33.40625l-0.28125,-0.3125l-12,-12l-0.3125,-0.28125zM9,4h20v12h12v30h-32zM31,5.4375l8.5625,8.5625h-8.5625zM15,22v2h20v-2zM15,28v2h16v-2zM15,34v2h20v-2z"></path></g></g>
                        </svg>}
        </div>
    }

    return <div className="bg-[#1e1f22] rounded-lg p-2">
        <div className="flex justify-between pb-2">
            <span className="bg-gray-900 rounded-lg text-white text-sm px-5 py-2 flex gap-2 w-36 max-w-36 overflow-x-hidden">{fileIcon(file.name)}{file.name}</span>
            <div className="relative group size-8" onClick={async () => {
                setRunning(true)
                const stdout = await axios.get("http://172.28.118.153:8000/run")
                setOutput(stdout.data)
                setRunning(false)
                setPage(true)
            }}>
                {running ? <div className="bg-gray-800 p-1 rounded-md cursor-not-allowed">
                    <svg aria-hidden="true" className="inline text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div> : <img className="size-9 cursor-pointer bg-gray-800 p-2 rounded-md hover:bg-gray-600 transition-colors duration-200" src="https://img.icons8.com/fluency/48/play--v1.png" alt="play--v1" />}
                <div className="absolute inset-x-0 bottom-9 bg-gray-600 rounded-lg bg-opacity-50 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {running ? null : <span className="text-white text-xs">Run</span>}
                </div>
            </div>
        </div>
        <Ace />
    </div>
}