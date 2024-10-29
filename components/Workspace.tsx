"use client";

import { useSetRecoilState } from "recoil";
import MyEditor from "./MyEditor";
import MyFolderTree from "./MyFolderTree";
import MyTerminal from "./MyTerminal";
import { dimensionsAtom } from "@/store/atoms/dimensions";
import { useEffect } from "react";

const Workspace = ({alias, env} : {alias: string, env:string}) => {
  const setDimensions = useSetRecoilState(dimensionsAtom);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setDimensions({
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
      });
    }
  }, []);

  return (
    <main className="bg-[#151514] min-h-screen flex justify-center items-center gap-3">
      <MyFolderTree alias={alias}/>
      <div className="flex flex-col gap-3">
        <MyEditor alias={alias} />
        <MyTerminal alias={alias}/>
      </div>
    </main>
  );
};

export default Workspace;