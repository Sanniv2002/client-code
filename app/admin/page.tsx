'use client'

import { RecoilRoot, useRecoilValue } from "recoil";
import { Admin } from "@/components/Admin";

export default function Home() {

  return (
    <RecoilRoot>
      <Admin />
    </RecoilRoot>
  );
}