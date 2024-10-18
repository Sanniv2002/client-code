'use client'

import Workspace from "@/components/Workspace";
import { RecoilRoot } from "recoil";
import Landing from "@/components/Landing";

export default function Home() {
  return (
    <RecoilRoot>
      <Workspace />
    </RecoilRoot>
  );
}