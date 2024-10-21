'use client'

import { RecoilRoot } from "recoil";
import { Dashboard } from "@/components/Dashboard";

export default function Home() {
  return (
    <RecoilRoot>
      <Dashboard />
    </RecoilRoot>
  );
}