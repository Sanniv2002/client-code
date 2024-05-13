import { outputAtom, pageAtom } from "@/store/atoms"
import React from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import dynamic from 'next/dynamic'

const XTerm = dynamic(() => import('./XTerm'), {
    ssr: false
})

export default function MyTerminal() {

    const [page, setPage] = useRecoilState(pageAtom)
    const stdout = useRecoilValue(outputAtom)
    const Output = () => {
        return <div className="bg-white h-48 rounded-sm overflow-y-scroll ">
            {stdout.split('\n').map((line, index) => (
                <span key={index} className="text-black text-sm p-2" style={{ display: 'block' }}>{line}</span>
            ))}
        </div>


    }

    return (
        <div className="bg-[#1e1f22] rounded-lg p-2">
            <div className="pb-2 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px">
                    <li onClick={() => setPage(false)} className="me-2">
                        <a className={`cursor-pointer inline-block p-2  ${!page ? "border-b-2 text-blue-600" : "text-gray-300 hover:text-gray-400 transition-colors duration-200"} rounded-t-lg active`}>Console</a>
                    </li>
                    <li onClick={() => setPage(true)} className="me-2">
                        <a className={`cursor-pointer inline-block p-2 ${page ? "border-b-2 text-blue-600" : "text-gray-300 hover:text-gray-400 transition-colors duration-200"} rounded-t-lg active`}>Output</a>
                    </li>
                </ul>
            </div>
            {page ? <Output /> : <XTerm />}
        </div>
    )
}