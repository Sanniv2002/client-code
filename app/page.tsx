'use client'

import MyEditor from "@/components/MyEditor";
import MyFolderTree from "@/components/MyFolderTree";
import { RecoilRoot, useRecoilValue } from "recoil";

export default function Home() {
  return (
    <RecoilRoot>
      <main className="bg-[#151514] min-h-screen flex justify-center items-center gap-3">
        <MyFolderTree />
        <MyEditor />
      </main>
    </RecoilRoot>
  );
}
