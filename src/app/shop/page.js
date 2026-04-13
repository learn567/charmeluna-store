"use client";
import { useState, useEffect } from "react";
import Link from "next/link"; 
import { Search, User, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Shop() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 
  const [windowWidth, setWindowWidth] = useState(0);
  const [shopOpen, setShopOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    const handleScroll = () => setIsScrolled(window.scrollY > 40);

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isMounted) return null;
  const isMobile = windowWidth < 768;

  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ backgroundColor: "#fef8fc" }}>
      
      {/* 1. MOBILE SIDEBAR */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/10 z-[300]" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} style={{ position: "fixed", top: "55px", left: "7px", height: "400px", width: "220px", backgroundColor: "#fef8fc", zIndex: 310, padding: "25px", borderRadius: "15px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "30px" }}><X size={22} style={{ color: "#67645e", cursor: "pointer", opacity: 0.7 }} onClick={() => setIsOpen(false)} /></div>
              <nav style={{ display: "flex", flexDirection: "column", gap: "25px", paddingLeft: "10px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div onClick={() => setShopOpen(!shopOpen)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", borderBottom: "1px solid #f1f0ed", paddingBottom: "12px" }}>
                    <span style={{ color: "#67645e", fontSize: "14px", fontWeight: "600", textTransform: "uppercase" }}>Shop</span>
                    <ChevronDown size={14} style={{ color: "#67645e", transform: shopOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s" }} />
                  </div>
                  {shopOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} style={{ display: "flex", flexDirection: "column", gap: "12px", paddingLeft: "10px", paddingTop: "15px", overflow: "hidden" }}>
                      {["Eye", "Skin Foundation", "Lip Glow", "Lipstick", "Skin Toner"].map((cat, i) => (
  <Link 
    key={i} 
    href={`/shop/${cat.toLowerCase().replace(/\s+/g, '-')}`} 
    onClick={() => setIsOpen(false)} 
    style={{ color: "rgba(103, 100, 94, 0.7)", fontSize: "11px", textTransform: "uppercase", textDecoration: "none" }}
  >
    {cat}
  </Link>
))}
                    </motion.div>
                  )}
                </div>
                <Link href="/about" onClick={() => setIsOpen(false)} style={{ color: "#67645e", fontSize: "14px", fontWeight: "600", textTransform: "uppercase", textDecoration: "none", borderBottom: "1px solid #f1f0ed", paddingBottom: "12px" }}>About</Link>
                <Link href="/contact" onClick={() => setIsOpen(false)} style={{ color: "#67645e", fontSize: "14px", fontWeight: "600", textTransform: "uppercase", textDecoration: "none", borderBottom: "1px solid #f1f0ed", paddingBottom: "12px" }}>Contact</Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 2. TOP ANNOUNCEMENT BAR */}
      <div className="relative w-full flex justify-center z-[100] py-[10px] px-4 md:px-12 bg-transparent">
        <div className="flex justify-center items-center rounded-[5px] shadow-sm bg-[#f1f0ed]" style={{ height: isMobile ? "30px" : "35px", width: isMobile ? "96%" : "100%", maxWidth: "1280px" }}>
          <p style={{ fontFamily: 'Swiss, sans-serif', fontSize: isMobile ? "9px" : "13px", fontWeight: "600", color: "#67645e", textTransform: "uppercase", letterSpacing: "0.1em" }}>Free Shipping on orders over 5000</p>
        </div>
      </div>

      {/* 3. MAIN HEADER */}
      <header className={`${isScrolled ? "fixed bg-[#f1f0ed] shadow-md" : "absolute bg-transparent"} left-0 w-full flex justify-center z-[120] transition-colors duration-300`} style={{ top: isScrolled ? "0" : (isMobile ? "45px" : "60px"), height: "62px" }}>
        <div className="w-full max-w-[1260px] h-full flex justify-between items-center relative" 
       style={{ 
         paddingLeft: isMobile ? "15px" : "80px",  // Mobile par side se gap barhane ke liye
         paddingRight: isMobile ? "15px" : "80px"  // Mobile par side se gap barhane ke liye
       }}> 
          {/* Hamburger / Left Nav */}
          <div className="flex items-center z-[130]">
            {isMobile ? (
              <button onClick={() => setIsOpen(!isOpen)} className="bg-transparent p-0 border-none outline-none relative w-8 h-8 flex items-center justify-center pointer-events-auto">
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                      <X size={26} color={isScrolled ? "#67645e" : "#ffffff"} />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                      <Menu size={26} color={isScrolled ? "#67645e" : "#ffffff"} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            ) : (
              <div className="flex items-center pointer-events-auto" style={{ fontFamily: 'Swiss, sans-serif', fontSize: "13px", fontWeight: "700", color: isScrolled ? "#67645e" : "#ffffff" }}>
                <div className="relative group mr-[45px]">
                  <Link href="/shop" className="uppercase tracking-[0.15em] no-underline text-inherit">Shop</Link>
                  <div className="absolute hidden group-hover:block top-full left-[-20px] pt-4 pointer-events-auto">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#fef8fc] shadow-2xl rounded-[8px] border border-[#f1f0ed] flex flex-col items-center justify-center min-w-[190px] h-[260px] overflow-hidden p-2">
                      {["Eye", "Skin Foundation", "Lip Glow", "Lipstick", "Skin Toner"].map((item, idx) => {
  // Yahan hum path bana rahe hain: "Skin Foundation" ban jayega "/shop/skin-foundation"
  const itemPath = `/shop/${item.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <Link 
      key={idx} 
      href={itemPath} 
      className="w-full flex-1 flex items-center justify-center text-[#67645e] no-underline uppercase text-[11px] font-[600] tracking-[0.2em] transition-all duration-500 ease-out hover:tracking-[0.05em] hover:text-black hover:bg-[#ffffff]/50"
    >
      {item}
    </Link>
  );
})}
                    </motion.div>
                  </div>
                </div>
                <Link href="/about" className="uppercase tracking-[0.15em] no-underline text-inherit mr-[45px]">About</Link>
                <Link href="/contact" className="uppercase tracking-[0.15em] no-underline text-inherit">Contact</Link>
              </div>
            )}
          </div>

          {/* Center: CL Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-[125]">
            <Link href="/" className="no-underline text-inherit flex items-center justify-center relative" 
              style={{ fontFamily: '"Gowun Batang", serif', fontSize: isMobile ? "26px" : "40px", fontWeight: "400", color: isScrolled ? "#67645e" : "#ffffff", letterSpacing: "0.1em" }}>
              <span style={{ position: 'relative', zIndex: 1 }}>C</span>
              <span style={{ position: 'absolute', zIndex: 2, fontSize: isMobile ? "26px" : "40px", left: '70%', top: '65%', transform: 'translate(-50%, -50%)' }}>L</span>
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center z-[130] pointer-events-auto" style={{ color: isScrolled ? "#67645e" : "#ffffff" }}>
            <Search size={isMobile ? 18 : 20} className="mr-[12px] md:mr-[35px] cursor-pointer" />
            <User size={isMobile ? 18 : 20} className="mr-[12px] md:mr-[35px] cursor-pointer" />
            <ShoppingBag size={isMobile ? 18 : 20} className="cursor-pointer" />
          </div>
        </div>
      </header>

      {/* 4. MAIN BANNER */}
      <div className="w-full flex justify-center px-4 md:px-12 mt-1 md:mt-2">
        <div className="relative overflow-hidden rounded-[8px] md:rounded-[10px] mx-auto" style={{ height: isMobile ? "300px" : "600px", width: isMobile ? "95%" : "100%", maxWidth: "1280px" }}>
          <img src="/images/shopbg.webp" alt="Main Banner" className="w-full h-full object-cover block shadow-sm" />
          {!isScrolled && <div className="absolute inset-0 bg-black/15 pointer-events-none" />}
        </div>
      </div>

    </main>
  );
}