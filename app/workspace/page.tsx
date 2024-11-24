'use client'

import Workspace from "@/components/Workspace-v2";
import { useSearchParams } from "next/navigation";
import { RecoilRoot } from "recoil";

export default function Home() {
  const searchParams = useSearchParams()
  const alias = searchParams.get('alias')
  const env = searchParams.get('env')
    return (
      <RecoilRoot>
        <Workspace alias={alias as string} env={env as string}/>
      </RecoilRoot>
    );
  }