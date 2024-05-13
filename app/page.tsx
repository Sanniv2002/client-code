'use client'

import MyEditor from "@/components/MyEditor";
import MyFolderTree from "@/components/MyFolderTree";
import MyTerminal from "@/components/MyTerminal";
import Workspace from "@/components/Workspace";
import { RecoilRoot, useRecoilValue } from "recoil";

export default function Home() {
  return (
    <RecoilRoot>
      <Workspace />
    </RecoilRoot>
  );
}
