'use client'

import MyEditor from "./MyEditor"
import MyFolderTree from "./MyFolderTree"
import MyTerminal from "./MyTerminal"

const Workspace = () => {
    return <main className="bg-[#151514] min-h-screen flex justify-center items-center gap-3">
        <MyFolderTree />
        <div className="flex flex-col gap-3">
            <MyEditor />
            <MyTerminal />
        </div>
    </main>
}

export default Workspace