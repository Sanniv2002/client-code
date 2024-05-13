'use client'

import Workspace from "@/components/Workspace";
import { RecoilRoot } from "recoil";

export default function Home() {
  return (
    <RecoilRoot>
      <Workspace />
    </RecoilRoot>
  );
}
