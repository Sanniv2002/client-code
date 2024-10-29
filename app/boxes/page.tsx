'use client'

import { RecoilRoot } from "recoil";
import { Boxes } from "@/components/Boxes";

export default function Home() {
  return (
    <RecoilRoot>
      <Boxes />
    </RecoilRoot>
  );
}