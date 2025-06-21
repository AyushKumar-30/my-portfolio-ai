import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import ChatWidget from "@/components/ChatWidget";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <nav className="p-4 bg-gray-900 text-white flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/experience">Experience</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/education">Education</Link>
      </nav>
      <Component {...pageProps} />
      <ChatWidget />
    </>
  );
}
