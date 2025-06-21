import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-white text-black p-6">{children}</div>;
}
