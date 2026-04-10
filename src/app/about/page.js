"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link"; 
import { Search, User, ShoppingBag, Menu, X, ChevronDown } from "lucide-react"; 

// Function ka naam 'About' rakhein
export default function About() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 
  const [windowWidth, setWindowWidth] = useState(0);
  const [shopOpen, setShopOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMounted) return null;
  const isMobile = windowWidth < 768;

  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ backgroundColor: "#fef8fc" }}>
      
      {/* --- 1. TOP BAR --- */}
      <div className="fixed left-0 w-full flex justify-center z-[100] px-4 md:px-12 top-[10px]">
        <div className="w-[95%] max-w-[1280px] flex justify-center items-center rounded-[5px] shadow-sm bg-[#f1f0ed]" style={{ height: isMobile ? "33px" : "35px" }}>
          <p style={{ fontFamily: 'Swiss, sans-serif', fontSize: isMobile ? "9px" : "13px", fontWeight: "600", color: "#67645e", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Free Shipping on orders over 5000
          </p>
        </div>
      </div>

      {/* --- 2. HEADER SECTION (About page par animation ki zaroorat nahi, direct show karein) --- */}
      <header className="fixed left-0 w-full flex justify-center z-[120]" style={{ top: isMobile ? "50px" : "60px" }}>
        <div className="w-full max-w-[1260px] h-[62px] flex justify-between items-center px-[15px] md:px-[80px]">
          <div className="flex items-center">
            {/* Desktop Navigation */}
            {!isMobile ? (
              <div className="flex items-center" style={{ fontFamily: 'Swiss, sans-serif', fontSize: "13px", fontWeight: "700", color: "#f4ebe1" }}>
                <Link href="/shop" className="mr-[45px] uppercase tracking-[0.15em] no-underline text-inherit hover:opacity-50 transition-opacity">Shop</Link>
                <Link href="/about" className="mr-[45px] uppercase tracking-[0.15em] no-underline text-inherit hover:opacity-50 transition-opacity">About</Link>
                <Link href="/contact" className="uppercase tracking-[0.15em] no-underline text-inherit hover:opacity-50 transition-opacity">Contact</Link>
              </div>
            ) : (
              <button onClick={() => setIsOpen(!isOpen)} className="text-[#f4ebe1] bg-transparent p-0 border-none outline-none">
                {isOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            )}
          </div>

          {/* Logo (About page par logo hamesha upar center/side mein rahega) */}
          <div style={{ fontFamily: '"Gowun Batang", serif', fontSize: "24px", fontWeight: "700", color: "#f4ebe1", letterSpacing: "0.2em" }}>
            CL
          </div>

          <div className="flex items-center text-[#f4ebe1]">
            <Search size={isMobile ? 18 : 20} className="mr-[10px] md:mr-[35px] cursor-pointer" />
            <User size={isMobile ? 18 : 20} className="mr-[10px] md:mr-[35px] cursor-pointer" />
            <ShoppingBag size={isMobile ? 18 : 20} className="cursor-pointer" />
          </div>
        </div>
      </header>

      {/* --- BANNER SECTION (About Page ki Image) --- */}
      <div className="w-full flex justify-center mt-[120px] relative z-10 px-4 md:px-12">
        <div className="relative overflow-hidden rounded-[10px] w-[1380px] max-w-[1280px]" style={{ height: isMobile ? "300px" : "450px" }}>
          {/* Yahan apni About page ki image lagayein */}
          <img src="/images/about-banner.jpg" alt="About Us" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
             <h1 className="text-white text-4xl md:text-6xl font-bold uppercase tracking-widest">About Us</h1>
          </div>
        </div>
      </div>

      {/* MOBILE SIDEBAR (Same as Home) */}
      <AnimatePresence>
        {/* ... Sidebar code wahi rakhein jo aapne diya tha ... */}
      </AnimatePresence>

    </main>
  );
}