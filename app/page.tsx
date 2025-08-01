'use client'

import { useEffect } from "react";
import Carrousel from "./components/Carrousel";
import Header from "./components/Header";
import Lenis from "lenis";

export default function Home() {
  
useEffect(() => {
  // Initialize Lenis
  const lenis = new Lenis();

  // Use requestAnimationFrame to continuously update the scroll
  function raf(time : any) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}) 

  return (
    <>
      <main id="main-container" className="h-[150dvh] relative">
        <Header></Header>
        <div className="h-screen flex items-center sticky top-0">
          <Carrousel></Carrousel>
        </div>
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 py-5">
          Scroll Down
        </div>
      </main>
    </>
  );
}
