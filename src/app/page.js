"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link"; 
import Image from "next/image"; 
import { Search, User, ShoppingBag, Menu, X, ChevronDown, Star, ChevronRight, ChevronLeft } from "lucide-react";
import { supabase } from "../supabase";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [isTight, setIsTight] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const [goToCorner, setGoToCorner] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 
  const [windowWidth, setWindowWidth] = useState(0);
  const [shopOpen, setShopOpen] = useState(false);
  const [hasSeenAnimation, setHasSeenAnimation] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [iconicIndex, setIconicIndex] = useState(0);
  const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
const [loading, setLoading] = useState(false);
const [searchTerm, setSearchTerm] = useState("");
const [isSearchOpen, setIsSearchOpen] = useState(false);
const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('mission');
  const missionContent = {
    mission: "To enhance, protect, and care for your skin today, so it naturally glows stronger and healthier over time",
    philanthropy: "Charmeluna Futures supports initiatives that remove the obstacles limiting women’s growth and independence.",
    sustainability: "Carefully chosen ingredients and sustainable packaging—because mindful skincare matters."
  };
  const iconicProducts = [
  {
    name: "CHERRY RED",
    tagline: "limited edition style",
    leftImg: "https://hvxgbzvogvhrcjzqmydg.supabase.co/storage/v1/object/public/product-images/Cherry%20Red.webp?width=800&quality=70",
    rightImg: "https://hvxgbzvogvhrcjzqmydg.supabase.co/storage/v1/object/public/product-images/Cherry%20Red%20Shade.webp?width=800&quality=70",
    count: "1/5"
  },
  {
    name: "BEIGE NUDE",
    tagline: "natural glow style",
    leftImg: "https://hvxgbzvogvhrcjzqmydg.supabase.co/storage/v1/object/public/product-images/Beige%20Nude.webp?width=800&quality=70",
    rightImg: "https://hvxgbzvogvhrcjzqmydg.supabase.co/storage/v1/object/public/product-images/Beige%20Nude%20shade.webp?width=800&quality=70",
    count: "2/5"
  },
  {
    name: "CLASSIC RED",
    tagline: "the original style",
    leftImg: "https://hvxgbzvogvhrcjzqmydg.supabase.co/storage/v1/object/public/product-images/Classic%20Red.webp?width=800&quality=70",
    rightImg: "https://hvxgbzvogvhrcjzqmydg.supabase.co/storage/v1/object/public/product-images/classic%20red%20shade.webp?width=800&quality=70",
    count: "3/5"
  },
  {
    name: "CRIMSON",
    tagline: "the original style",
    leftImg: "https://hvxgbzvogvhrcjzqmydg.supabase.co/storage/v1/object/public/product-images/Crimson.webp?width=800&quality=70",
    rightImg: "https://hvxgbzvogvhrcjzqmydg.supabase.co/storage/v1/object/public/product-images/crimson%20shade.webp?width=800&quality=70",
    count: "4/5"
  },
  {
    name: "NUDE BROWN",
    tagline: "the original style",
    leftImg: "https://hvxgbzvogvhrcjzqmydg.supabase.co/storage/v1/object/public/product-images/nude%20brown%20shade.webp?width=800&quality=70",
    rightImg: "https://hvxgbzvogvhrcjzqmydg.supabase.co/storage/v1/object/public/product-images/nude%20brown.webp?width=800&quality=70",
    count: "5/5"
  }
];

useEffect(() => {
  if (typeof window !== 'undefined') {
    iconicProducts.forEach((product) => {
      const img1 = new window.Image();
      img1.src = product.leftImg;
      img1.decode(); 

      const img2 = new window.Image();
      img2.src = product.rightImg;
      img2.decode();
    });
  }
}, []);

const handleSubscribe = async () => {
  if (!email || !email.includes("@")) {
    setMessage("Please enter a valid email.");
    return;
  }
  setLoading(true);
  try {
    const { error } = await supabase.from('subscribers').insert([{ email: email }]);
    if (error) {
      if (error.code === '23505') setMessage("You're already part of the community! ✨");
      else setMessage("Something went wrong. Try again.");
    } else {
      setMessage("Welcome to the community! ✨");
      setEmail("");
    }
  } catch (err) {
    setMessage("Network error.");
  } finally {
    setLoading(false);
    setTimeout(() => setMessage(""), 4000);
  }
};

  useEffect(() => {
  setIsMounted(true);
  document.body.style.overflow = 'hidden';
  setWindowWidth(window.innerWidth);
  
  document.body.style.overflow = 'hidden';

  const fetchProducts = async () => {
    const productNames = ['Lip Glow', 'Foundation', 'mascara', 'Lipstick', 'eyeliner', 'Skintoner', 'Skintoner2'];
    const { data, error } = await supabase.from('products').select('*').in('name', productNames);
    
    if (data) {
      const orderedData = productNames.map(name => data.find(p => p.name === name)).filter(Boolean); 
      setProducts(orderedData);
    }
  };
  fetchProducts();

  const handleResize = () => setWindowWidth(window.innerWidth);
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  window.addEventListener('resize', handleResize);
  window.addEventListener('scroll', handleScroll);

  const tightTimer = setTimeout(() => setIsTight(true), 1200);
  const finalTimer = setTimeout(() => setIsFinal(true), 3500);
  const cornerTimer = setTimeout(() => {
    setGoToCorner(true);
    setHasSeenAnimation(true);
    document.body.style.overflow = 'auto'; 
}, 6000);

  return () => {
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('scroll', handleScroll);
    clearTimeout(tightTimer);
    clearTimeout(finalTimer);
    clearTimeout(cornerTimer);
    document.body.style.overflow = 'auto';
  };
}, []);

  if (!isMounted) return null;
  const isMobile = windowWidth < 768;
  const categories = [
    { title: "Eyes", image: "/images/eyes-category.png", link: "/shop/eye" },
    { title: "Lip Glow", image: "/images/lipglow-category.png", link: "/shop/lip-glow" },
    { title: "Lipstick", image: "/images/lipstick-category.png", link: "/shop/lipstick" },
  ];

  const renderLetters = (text, startIndex) => {
    return text.split("").map((char, index) => {
      const actualIndex = startIndex + index;
      const isL = actualIndex === 6; 
      const isOther = actualIndex !== 0 && !isL;
      return (
        <motion.span 
          key={actualIndex} 
          initial={{ opacity: 0, scale: 0.4, y: 10 }} 
          animate={{ 
            opacity: isOther && isFinal ? 0 : 1, 
            scale: isOther && isFinal ? 0.8 : 1, 
            width: isOther && isFinal ? 0 : "auto", 
            x: isL && isFinal ? (isMobile ? -15 : -55) : 0, 
            y: isL && isFinal ? (isMobile ? 10 : 35) : 0 
          }} 
          transition={isFinal ? { duration: 1.4, ease: [0.43, 0.13, 0.23, 0.96] } : { duration: 0.8, delay: actualIndex * 0.06, ease: "easeOut" }} 
          className="uppercase font-[700] relative inline-block" 
          style={{ fontSize: "clamp(25px, 10vw, 110px)", color: "inherit", fontFamily: '"Gowun Batang", serif', letterSpacing: isTight ? "0.02em" : "0.35em", zIndex: isL ? 70 : 60, lineHeight: "1", transition: "letter-spacing 1.2s cubic-bezier(0.43, 0.13, 0.23, 0.96)" }}
        >
          {char}
        </motion.span>
      );
    });
  };

  const visibleCount = isMobile ? 1 : 3;
  const cardWidth = isMobile ? windowWidth : 422;

  const nextSlide = () => {
    if (currentIndex < products.length - visibleCount) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); 
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(products.length - visibleCount);
    }
  };

  const productMeta = [
    { title: "Lips", badge: "new shades", reviews: "6,941" },     
    { title: "Face", badge: "limited edition", reviews: "16,038" }, 
    { title: "Eyes", badge: "new", reviews: "346" },               
    { title: "Lips", badge: "classic", reviews: "5,674" },         
    { title: "Eyes", badge: "waterproof", reviews: "94" },         
    { title: "Skin", badge: "organic", reviews: "215" },           
    { title: "Skin", badge: "hydrating", reviews: "882" },        
  ];

  const ProductCard = ({ product, meta }) => (
    <div 
      style={{ 
        backgroundColor: '#f5f5f5', borderRadius: '20px', display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden', 
        width: isMobile ? '85%' : '392px',
        height: isMobile ? '420px' : '400px', 
        fontFamily: 'Swiss, sans-serif', flexShrink: 0,
        margin: isMobile ? '0 auto' : '0'
      }}
    >
      <span style={{ position: 'absolute', textTransform: 'uppercase', color: '#68655f', top: '25px', left: '25px', fontSize: isMobile ? '20px' : '27px', fontWeight: 800, zIndex: 10 }}>{meta?.title}</span>
      <div style={{ position: 'absolute', backgroundColor: '#68655f', color: '#f5f5f5', borderRadius: '50px', textTransform: 'lowercase', fontWeight: 600, top: '28px', right: '20px', fontSize: '10px', padding: '5px 12px', zIndex: 10 }}>{meta?.badge}</div>
      
      <div className="flex flex-col items-center justify-center w-full h-full pt-10">
        {product?.image_url && (
          <img src={product.image_url} alt={product.name} style={{ objectFit: 'contain', width: isMobile ? '220px' : '280px', height: isMobile ? '220px' : '280px' }} />
        )}
        
        <div style={{ 
            position: 'absolute', 
            bottom: '25px', 
            left: 0, 
            right: 0,
            paddingLeft: '25px', 
            paddingRight: '20px' 
          }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
            <div style={{ display: 'flex', color: '#68655f' }}>{[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#68655f" stroke="none" />)}</div>
            <span style={{ color: '#68655f', fontSize: '12px', fontWeight: 500 }}>({meta?.reviews})</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <h3 style={{ color: '#68655f', textTransform: 'uppercase', margin: 0, fontSize: '18px', fontWeight: 700 }}>{product?.name}</h3>
              <p style={{ color: '#68655f', margin: 0, fontSize: '13px', opacity: 0.8 }}>The natural flush</p>
            </div>
            <span style={{ color: '#68655f', fontSize: '16px', fontWeight: 700 }}>RS {product?.price}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ backgroundColor: "#ffffff" }}>
      
      <AnimatePresence>
        {isOpen && isMobile && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/10 z-[300]" />
            <motion.div initial={{ x: "-110%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "-110%", opacity: 0 }} transition={{ type: "spring", damping: 25, stiffness: 180 }} style={{ position: "fixed", top: "55px", left: "7px", height: "400px", width: "200px", backgroundColor: "#fef8fc", zIndex: 310, padding: "25px", borderRadius: "15px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "30px" }}><X size={22} style={{ color: "#67645e", cursor: "pointer", opacity: 0.7 }} onClick={() => setIsOpen(false)} /></div>
              <nav style={{ display: "flex", flexDirection: "column", gap: "30px", paddingLeft: "10px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div onClick={() => setShopOpen(!shopOpen)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", borderBottom: "1px solid #f1f0ed", paddingBottom: "12px" }}>
                    <span style={{ color: "#67645e", fontSize: "14px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.2em" }}>Shop</span>
                    <motion.div animate={{ rotate: shopOpen ? 180 : 0 }} transition={{ duration: 0.3 }}><ChevronDown size={14} style={{ color: "#67645e" }} /></motion.div>
                  </div>
                  <AnimatePresence>{shopOpen && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden", display: "flex", flexDirection: "column", gap: "12px", paddingLeft: "10px", paddingTop: "15px" }}>{[
  { name: "Eye", path: "/shop/eye" },
  { name: "Skin Foundation", path: "/shop/skin-foundation" },
  { name: "Lip Glow", path: "/shop/lip-glow" },
  { name: "Lipstick", path: "/shop/lipstick" },
  { name: "Skin Toner", path: "/shop/skin-toner" }
].map((cat, i) => (
  <Link 
    key={i} 
    href={cat.path} 
    onClick={() => setIsOpen(false)} 
    style={{ color: "rgba(103, 100, 94, 0.7)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", textDecoration: "none" }}
  >
    {cat.name}
  </Link>
))}</motion.div>)}</AnimatePresence>
                </div>
                <Link href="/about" onClick={() => setIsOpen(false)} style={{ color: "#67645e", fontSize: "14px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.2em", textDecoration: "none", borderBottom: "1px solid #f1f0ed", paddingBottom: "12px" }}>About</Link>
                <Link href="/contact" onClick={() => setIsOpen(false)} style={{ color: "#67645e", fontSize: "14px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.2em", textDecoration: "none", borderBottom: "1px solid #f1f0ed", paddingBottom: "12px" }}>Contact</Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0, y: -40 }} animate={goToCorner ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }} transition={{ duration: 1, delay: 1.2 }} className="absolute left-0 w-full flex justify-center z-[100] pointer-events-none px-4 md:px-12" style={{ top: "10px" }}>
        <div className="w-[95%] max-w-[1280px] flex justify-center items-center rounded-[5px] shadow-sm bg-[#f1f0ed]" style={{ height: isMobile ? "33px" : "35px" }}>
          <p style={{ fontFamily: 'Swiss, sans-serif', fontSize: isMobile ? "9px" : "13px", fontWeight: "600", color: "#67645e", textTransform: "uppercase", letterSpacing: "0.1em" }}>Free Shipping on orders over 5000</p>
        </div>
      </motion.div>

      {/* HEADER  */}
      <motion.div 
        initial={{ opacity: 1, y: 0 }} 
        animate={{ y: 0 }} 
        className={`${isScrolled ? "fixed bg-[#f1f0ed] shadow-md" : "absolute bg-transparent"} left-0 w-full flex justify-center z-[120] transition-colors duration-300`} 
        style={{ 
          top: isScrolled ? "0" : (isMobile ? "50px" : "60px"),
          overflow: "visible", 
          height: "62px"
        }}
      >
        <div className="w-full max-w-[1260px] h-full flex justify-between items-center relative" style={{ paddingLeft: isMobile ? "15px" : "80px", paddingRight: isMobile ? "15px" : "80px" }}>
          
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={goToCorner ? { opacity: 1 } : { opacity: 0 }} 
            transition={{ duration: 1, delay: 1.4 }}
            className="flex items-center z-[130]"
          >
            {isMobile ? (
              <button onClick={() => setIsOpen(!isOpen)} className="bg-transparent p-0 border-none outline-none relative w-8 h-8 flex items-center justify-center pointer-events-auto">
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}><X size={26} color={isScrolled ? "#67645e" : "#ffffff"} /></motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}><Menu size={26} color={isScrolled ? "#67645e" : "#ffffff"} /></motion.div>
                  )}
                </AnimatePresence>
              </button>
            ) : (
              <div className="flex items-center pointer-events-auto" style={{ fontFamily: 'Swiss, sans-serif', fontSize: "13px", fontWeight: "700", color: isScrolled ? "#67645e" : "#ffffff" }}>
                
                <div className="relative group mr-[45px]">
                  <Link href="/shop" className="uppercase tracking-[0.15em] no-underline text-inherit">Shop</Link>
                  <div className="absolute hidden group-hover:block top-full left-[-20px] pt-4 pointer-events-auto">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="bg-[#fef8fc] shadow-2xl rounded-[8px] border border-[#f1f0ed] flex flex-col items-center justify-center min-w-[190px] h-[260px] overflow-hidden p-2"
                    >
                      {[
  { name: "Eye", path: "/shop/eye" },
  { name: "Skin Foundation", path: "/shop/skin-foundation" },
  { name: "Lip Glow", path: "/shop/lip-glow" },
  { name: "Lipstick", path: "/shop/lipstick" },
  { name: "Skin Toner", path: "/shop/skin-toner" }
].map((item, idx) => (
  <Link 
    key={idx} 
    href={item.path} 
    className="w-full flex-1 flex items-center justify-center text-[#67645e] no-underline uppercase text-[11px] font-[600] tracking-[0.2em] transition-all duration-500 ease-out hover:tracking-[0.05em] hover:text-black hover:bg-[#ffffff]/50"
  >
    {item.name}
  </Link>
))}
                    </motion.div>
                  </div>
                </div>

                <Link href="/about" className="uppercase tracking-[0.15em] no-underline text-inherit mr-[45px]">About</Link>
                <Link href="/contact" className="uppercase tracking-[0.15em] no-underline text-inherit">Contact</Link>
              </div>
            )}
          </motion.div>

          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-[125] pointer-events-none">
            <motion.div 
              initial={{ y: isMobile ? "35vh" : "40vh", scale: 1 }}
              animate={goToCorner ? { 
                y: "-5px", 
                scale: isMobile ? 0.6 : 0.4, 
                color: isScrolled ? "#67645e" : "#ffffff" 
              } : { 
                y: isMobile ? "35vh" : "40vh", 
                scale: 1, 
                color: "#67645e" 
              }} 
              transition={{ duration: 1.8, ease: [0.43, 0.13, 0.23, 0.96] }} 
              className="flex items-center justify-center"
            >
              <div className="flex items-center">{renderLetters("CHARME", 0)}</div>
              <motion.div animate={{ width: isFinal ? 0 : (isMobile ? 10 : 45) }} transition={{ duration: 1.4, ease: [0.43, 0.13, 0.23, 0.96] }} style={{ display: "inline-block" }} />
              <div className="flex items-center">{renderLetters("LUNA", 6)}</div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }} 
            animate={goToCorner ? { opacity: 1 } : { opacity: 0 }} 
            transition={{ duration: 1, delay: 1.4 }}
            className="flex items-center z-[130] pointer-events-auto" 
            style={{ color: isScrolled ? "#67645e" : "#ffffff" }}
          >
           
<div className="flex items-center relative mr-[10px] md:mr-[35px]">
  <AnimatePresence>
    {isSearchOpen && (
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: isMobile ? 180 : 320, opacity: 1 }}
        exit={{ width: 0, opacity: 0 }}
        className="absolute right-[35px] md:right-[50px] z-[150]"
      >
        <div className="relative flex items-center">
          <input 
            autoFocus 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                window.location.href = `/shop?search=${searchTerm}`;
              }
            }}
            style={{ 
              fontFamily: 'Swiss, sans-serif' 
            }}
            className="w-full h-[40px] bg-white border border-[#d3beab] rounded-full px-5 text-[13px] text-[#67645e] outline-none shadow-lg placeholder:text-[#67645e]/40" 
          />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
  <Search 
    size={isMobile ? 18 : 20} 
    className="cursor-pointer hover:scale-110 transition-transform duration-300" 
    color={isScrolled ? "#67645e" : "#ffffff"} 
    onClick={() => setIsSearchOpen(!isSearchOpen)} 
  />
</div>
            <Link href="/account" className="mr-[10px] md:mr-[35px] flex items-center justify-center transition-transform duration-300 hover:scale-110">
  <User 
    size={isMobile ? 18 : 20} 
    color={isScrolled ? "#67645e" : "#ffffff"} 
  />
</Link>
            <div className="relative">
  <ShoppingBag 
    size={isMobile ? 18 : 20} 
    className="cursor-pointer transition-colors duration-300 hover:opacity-70" 
    color={isScrolled ? "#67645e" : "#ffffff"} 
    onClick={() => setIsCartOpen(true)} 
  />
</div>
          </motion.div>
        </div>
      </motion.div>

      {goToCorner && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1.5 }}
        >

         
<AnimatePresence>
  {isCartOpen && (
    <>
      
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        onClick={() => setIsCartOpen(false)} 
        className="fixed inset-0 bg-black/20 z-[999] backdrop-blur-[2px]"
      />

    
      <motion.div 
  initial={{ x: "100%" }} 
  animate={{ x: 0 }} 
  exit={{ x: "100%" }} 
  transition={{ type: "tween", duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }} 
  style={{ right: 0, left: 'auto' }} 
  className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-[#fef8fc] z-[1000] flex flex-col shadow-2xl"
>
        <div className="flex-1 flex flex-col p-6 md:p-10">
          
          {/* Header Section */}
          <div className="flex justify-between items-start mb-12">
            <div>
              <h3 style={{ fontFamily: 'Swiss, sans-serif' }} className="text-[#8f645e] uppercase tracking-[0.3em] font-bold text-[14px]">
                Your Bag
              </h3>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)} 
              className="p-1 hover:rotate-90 transition-transform duration-300"
            >
              <X size={24} className="text-[#8f645e] opacity-40 hover:opacity-100" />
            </button>
          </div>

          
          <div className="flex-1 flex flex-col items-center justify-center border border-[#f1f0ed] rounded-[20px] bg-white/50 px-6 py-10 shadow-sm">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6 shadow-inner border border-[#f1f0ed]">
              <ShoppingBag size={20} className="text-[#d3beab]" />
            </div>
            
            <p style={{ fontFamily: 'Gowun Batang, serif' }} className="text-[#8f645e] text-xl mb-4 italic text-center">
              Your bag is currently empty
            </p>
            
            <button 
              onClick={() => setIsCartOpen(false)} 
              className="w-full max-w-[240px] py-4 border border-[#67645e] text-[#8f645e] text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#67645e] hover:text-white transition-colors duration-300 rounded-full"
            >
              Shop Now
            </button>
          </div>

        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>
          {/* 1. Banner Section */}
          <motion.div initial={{ opacity: 0 }} animate={goToCorner ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 1.2, delay: 1.5 }} className="w-full flex justify-center mt-[55px] relative z-10 px-4 md:px-12">
             <div className="relative overflow-hidden rounded-[10px] bg-transparent mx-auto" style={{ width: isMobile ? "95%" : "1280px", height: isMobile ? "200px" : "570px" }}>
               <img src="/images/fst-banner.webp" alt="First Banner" className="w-full h-full object-cover block" />
             </div>
          </motion.div>

          {/* 2. Marquee Text  */}
<motion.div 
  initial={hasSeenAnimation ? { opacity: 1 } : { opacity: 0 }} 
  animate={goToCorner ? { opacity: 1 } : { opacity: 0 }} 
  transition={hasSeenAnimation ? { duration: 0 } : { duration: 1, delay: 0.3 }} 
  className="w-full flex justify-center mt-[15px] mb-[30px] px-4 md:px-12"
>
  <div className="w-[95%] md:w-[1290px] max-w-[1280px] flex items-center rounded-[5px] bg-[#f1f0ed] shadow-sm overflow-hidden relative" style={{ height: isMobile ? "33px" : "35px" }}>
    <motion.p 
      animate={{ x: isMobile ? ["0px", "150px", "0px"] : ["0px", "1000px", "0px"] }} 
      transition={{ repeat: Infinity, duration: isMobile ? 10 : 25, ease: "linear" }} 
      style={{ 
        fontFamily: 'Swiss, sans-serif', 
        fontSize: isMobile ? "10px" : "13px", 
        fontWeight: "600", 
        color: "#67645e", 
        textTransform: "uppercase", 
        letterSpacing: "0.15em", 
        marginLeft: isMobile ? "6px" : "10px", 
        whiteSpace: "nowrap", 
        display: "flex", 
        alignItems: "center", 
        height: "100%", 
        position: "relative" 
      }}
    >
      Glow starts here ✨
    </motion.p>
  </div>
</motion.div>


      {/* --- PRODUCTS SLIDER SECTION --- */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={goToCorner ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 1, delay: 2 }} className="relative w-full flex justify-center py-20 pb-40">
        <div className="relative" style={{ width: isMobile ? '100%' : '1240px', overflow: 'visible' }}>
          <button onClick={prevSlide} className="absolute z-50 bg-white shadow-md rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95" style={{ left: isMobile ? '10px' : '-20px', top: '50%', transform: 'translateY(-50%)', width: isMobile ? '35px' : '48px', height: isMobile ? '35px' : '48px', border: 'none', cursor: 'pointer', outline: 'none' }}>
            <ChevronLeft size={isMobile ? 20 : 28} color="#67645e" strokeWidth={2.5} />
          </button>
          
          <button onClick={nextSlide} className="absolute z-50 bg-white shadow-md rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95" style={{ right: isMobile ? '10px' : '-20px', top: '50%', transform: 'translateY(-50%)', width: isMobile ? '35px' : '48px', height: isMobile ? '35px' : '48px', border: 'none', cursor: 'pointer', outline: 'none' }}>
            <ChevronRight size={isMobile ? 20 : 28} color="#67645e" strokeWidth={2.5} />
          </button>

          <div className="overflow-hidden w-full">
            <div className="flex transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1)" style={{ transform: `translateX(-${currentIndex * cardWidth}px)` }}>
              {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product, idx) => (
                <div key={product.id || idx} style={{ width: cardWidth, flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
                    <ProductCard product={product} meta={productMeta[idx]} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

{/* --- SHOP BY CATEGORIES --- */}
<motion.section 
  initial={{ opacity: 0 }} 
  animate={goToCorner ? { opacity: 1 } : { opacity: 0 }} 
  transition={{ duration: 1, delay: 2.2 }}
  className="w-full py-16"
  style={{ backgroundColor: "#ffffff" }} 
>
  <style>{`
    .category-container {
      display: flex;
      flex-direction: row;

      justify-content: space-between;
      gap: 0px;
    }
    .category-card {
      width: 19%; 
      aspect-ratio: 1 / 1.2; 
    }

    @media (max-width: 767px) {
      .category-container {
        flex-direction: column; 
        align-items: center;
        gap: 10px; 
      }
      .category-card {
        width: 90% !important; 
        aspect-ratio: 1 / 1 !important; 
      }
    }
  `}</style>

  <div className="w-full mb-10">
    <h2 className="text-center text-[#b3848f] uppercase tracking-[0.2em] font-bold" 
        style={{ fontFamily: "'UniversLTSd-Bold', sans-serif", fontSize: "20px" }}>
      Shop by Categories
    </h2>
  </div>

  <div className="max-w-[1300px] mx-auto px-4">
    <div className="category-container border-b-[30px] border-transparent"> 
      
<div className="category-card group relative rounded-[15px] overflow-hidden shadow-sm bg-black flex items-center justify-center cursor-pointer">

  <Image 
    src="/images/eyescategory.webp" 
    fill 
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
    style={{ objectFit: 'cover' }} 
    className="object-cover brightness-[0.6] transition-opacity duration-300 group-hover:opacity-0" 
    alt="Eyes" 
  />
  
  <Image 
    src="/images/eyeshover.webp" 
    fill 
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
    style={{ objectFit: 'cover' }} 
    className="absolute inset-0 object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
    alt="Eyes Hover" 
  />

  <span className="relative z-20 uppercase tracking-[0.2em] text-center text-[22px]" 
    style={{ fontFamily: "'UniversLTSd-Bold', sans-serif", fontWeight: "900", color: "#ffffff" }}>
    Eyes
  </span>
</div>

      <div className="category-card group relative rounded-[15px] overflow-hidden shadow-sm bg-black flex items-center justify-center cursor-pointer">
        <Image 
          src="/images/lipglowcategory.webp" 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
  style={{ objectFit: 'cover' }} 
          className="object-cover brightness-[0.6] transition-opacity duration-300 group-hover:opacity-0" 
          alt="Lip Glow" 
        />
        <Image 
    src="/images/lipglowhover.webp" 
    fill 
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
    style={{ objectFit: 'cover' }} 
    className="absolute inset-0 object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
    alt="Lip Glow" 
  />
        <span className="relative z-20 uppercase tracking-[0.2em] text-center text-[22px]" 
          style={{ fontFamily: "'UniversLTSd-Bold', sans-serif", fontWeight: "900", color: "#ffffff" }}>
          Lip Glow
        </span>
      </div>

      <div className="category-card group relative rounded-[15px] overflow-hidden shadow-sm bg-black flex items-center justify-center cursor-pointer">
        <Image
  src="/images/lipstick-category.webp"
  alt="Lipstick Category"
  fill
  priority={true}  
  loading="eager"       
  sizes="(max-width: 768px) 100vw, 50vw"
  style={{ objectFit: 'cover' }}
  className="object-cover brightness-[0.6] transition-opacity duration-300 group-hover:opacity-0" />
        <Image 
    src="/images/lipstickhover.webp" 
    fill 
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
    style={{ objectFit: 'cover' }} 
    className="absolute inset-0 object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
    alt="Lipstick Hover" 
  />
        <span className="relative z-20 uppercase tracking-[0.2em] text-center text-[22px]" 
          style={{ fontFamily: "'UniversLTSd-Bold', sans-serif", fontWeight: "900", color: "#ffffff" }}>
          Lipstick
        </span>
      </div>

      <div className="category-card group relative rounded-[15px] overflow-hidden shadow-sm bg-black flex items-center justify-center cursor-pointer">
        <Image 
          src="/images/skintonercategory.webp" 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
  style={{ objectFit: 'cover' }} 
          className="object-cover brightness-[0.6] transition-opacity duration-300 group-hover:opacity-0" 
          alt="Skin Toner" 
        />
        <Image 
    src="/images/skintonerhover.webp" 
    fill 
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
    style={{ objectFit: 'cover' }} 
    className="absolute inset-0 object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
    alt="Skin Toner Hover" 
  />
        <span className="relative z-20 uppercase tracking-[0.2em] text-center text-[22px]" 
              style={{ fontFamily: "'UniversLTSd-Bold', sans-serif", fontWeight: "800", color: "#ffffff" }}>
          Skin Toner
        </span>
      </div>

      <div className="category-card group relative rounded-[15px] overflow-hidden shadow-sm bg-black flex items-center justify-center cursor-pointer">
        <Image 
          src="/images/foundationcategory.webp" 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
  style={{ objectFit: 'cover' }} 
          className="object-cover brightness-[0.6] transition-opacity duration-300 group-hover:opacity-0" 
          alt="Foundation" 
        />
        <Image 
    src="/images/foundationhover.webp" 
    fill 
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
    style={{ objectFit: 'cover' }} 
    className="absolute inset-0 object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
    alt="Foundation Hover" 
  />
        <span className="relative z-20 uppercase tracking-[0.2em] text-center text-[22px]" 
              style={{ fontFamily: "'UniversLTSd-Bold', sans-serif", fontWeight: "900", color: "#ffffff" }}>
          Foundation
        </span>
      </div>
    </div>
  </div>
</motion.section>

{/* --- Mission Section  --- */}
<section 
  style={{ 
    display: 'flex', 
    flexWrap: 'wrap', 
    width: isMobile ? '100%' : '95%', 
    margin: isMobile ? '0' : '40px auto', 
    padding: isMobile ? '0' : '20px 0' 
  }}
>
  <div 
    style={{ 
      backgroundColor: "#f1f0ed", 
      flex: isMobile ? '1 1 100%' : '1 1 500px', 
      minHeight: isMobile ? '380px' : '420px', 
      display: 'flex',
      flexDirection: 'column', 
      alignItems: 'flex-start', 
      justifyContent: 'space-between', 
      padding: '40px',
      position: 'relative'
    }}
  >
    <style>{`
      .responsive-text { font-size: 20px; transition: opacity 0.4s ease; }
      @media (min-width: 1044px) { .responsive-text { font-size: 33px !important; } }
      .list-item-text { font-family: 'Swiss', sans-serif; text-transform: lowercase; letter-spacing: 0.05em; font-weight: 600; padding: 10px 3px; cursor: pointer; transition: color 0.3s ease; }
      .custom-hr { border: none; border-top: 1px solid #d1d1d1; width: 100%; margin: 0; }
    `}</style>

    <div 
      className="responsive-text" 
      style={{ 
        marginTop: '3px', 
        marginLeft: '3px', 
        fontFamily: "'Swiss', sans-serif", 
        color: '#6e6b65', 
        fontWeight: '500', 
        lineHeight: '1.2', 
        textAlign: 'left' 
      }}
    >
      {missionContent[activeSection]}
    </div>

    <div style={{ width: '100%', marginBottom: '3px' }}>
      
      <hr className="custom-hr" />
      <div 
        onMouseEnter={() => setActiveSection('mission')}
        onClick={() => setActiveSection('mission')}
        className="list-item-text text-[24px] md:text-[28px]" 
        style={{ color: activeSection === 'mission' ? '#6e6b65' : '#c2c0bc' }}
      >
        mission
      </div>
      
      <hr className="custom-hr" />
      <div 
        onMouseEnter={() => setActiveSection('philanthropy')}
        onClick={() => setActiveSection('philanthropy')}
        className="list-item-text text-[24px] md:text-[28px]" 
        style={{ color: activeSection === 'philanthropy' ? '#6e6b65' : '#c2c0bc' }}
      >
        philanthropy
      </div>
      
      <hr className="custom-hr" />
      <div 
        onMouseEnter={() => setActiveSection('sustainability')}
        onClick={() => setActiveSection('sustainability')}
        className="list-item-text text-[24px] md:text-[28px]" 
        style={{ color: activeSection === 'sustainability' ? '#6e6b65' : '#c2c0bc' }}
      >
        sustainability
      </div>
      
      <hr className="custom-hr" />
    </div>
  </div>


  <div 
  style={{ 
    backgroundColor: "#f8f7f5", 
    flex: isMobile ? '1 1 100%' : '1 1 500px', 
    minHeight: isMobile ? '350px' : '600px', 
    position: 'relative', 
    overflow: 'hidden' 
  }}
>
    <Image 
      src="/images/bgmission.webp" 
      alt="Our Mission" 
      fill 
      style={{ objectFit: 'cover' }} 
    />
  </div>
</section>

{/* --- ICONIC PICKS SECTION --- */}
<div style={{ width: isMobile ? '100%' : '95%', margin: '60px auto 20px auto' }}>
  
  <h2 
    style={{ 
      color: '#8f645e', 
      fontFamily: "'Swiss', sans-serif", 
      fontSize: isMobile ? '24px' : '36px', 
      fontWeight: '700', 
      textAlign: 'center', 
      textTransform: 'uppercase', 
      letterSpacing: '0.2em',
      marginBottom: '40px'
    }}
  >
    ICONIC PICKS
  </h2>

  <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', gap: '0' }}>
    <div 
      style={{ 
        flex: isMobile ? '1 1 100%' : '1 1 500px', 
        minHeight: isMobile ? '150px' : '200px', 
        backgroundColor: '#f1f0ed', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <img 
        src={iconicProducts[iconicIndex].leftImg} 
        alt="Product Main" 
        loading="eager"
        fetchPriority="high"
        style={{ 
          width: isMobile ? '70%' : '80%', 
          height: 'auto', 
          objectFit: 'contain',
        }}
      />
    </div>

    <div 
      style={{ 
        backgroundColor: "#f1f0ed", 
        flex: isMobile ? '1 1 100%' : '1 1 500px', 
        minHeight: isMobile ? '150px' : '200px', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '20px' : '40px',
        position: 'relative', 
      }}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '100%', 
        position: 'relative',
        marginBottom: '150px' 
      }}>
        <button 
          onClick={() => setIconicIndex(iconicIndex === 0 ? iconicProducts.length - 1 : iconicIndex - 1)}
          style={{ background: 'none', border: '1px solid #b0a79e', borderRadius: '50%', width: '45px', height: '45px', color: '#555', position: 'absolute', left: '0', zIndex: 10, cursor: 'pointer' }}
        >←</button>
        
        <img 
          src={iconicProducts[iconicIndex].rightImg} 
          alt="Product Shade" 
          style={{ 
            width: isMobile ? '85%' : '350px', 
            height: 'auto', 
            objectFit: 'contain'
          }}
        />

        <button 
          onClick={() => setIconicIndex((iconicIndex + 1) % iconicProducts.length)}
          style={{ background: 'none', border: '1px solid #b0a79e', borderRadius: '50%', width: '45px', height: '45px', color: '#555', position: 'absolute', right: '0', zIndex: 10, cursor: 'pointer' }}
        >→</button>
      </div>

      <div style={{ position: 'absolute', bottom: '40px', left: '20px', textAlign: 'left', zIndex: 5 }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
            <span style={{ fontSize: '14px' }}>★★★★★</span>
            <span style={{ fontSize: '12px', color: '#555' }}>(282)</span>
         </div>
         <h3 style={{ fontFamily: "'Swiss', sans-serif", fontSize: '20px', fontWeight: '700', color: '#444', margin: '0', textTransform: 'uppercase' }}>
            {iconicProducts[iconicIndex].name}
         </h3>
         <p style={{ color: '#777', fontSize: '14px', margin: '2px 0 15px 0', fontFamily: "'Swiss', sans-serif" }}>
            {iconicProducts[iconicIndex].tagline}
         </p>
         <button style={{ backgroundColor: 'transparent', border: '1px solid #444', borderRadius: '25px', padding: '10px 40px', fontFamily: "'Swiss', sans-serif", fontSize: '13px', fontWeight: '600', cursor: 'pointer', textTransform: 'uppercase' }}>BUY NOW</button>
      </div>

      <div style={{ position: 'absolute', bottom: '40px', right: '20px', fontSize: '32px', fontWeight: '800', color: '#555', opacity: '0.8' }}>
        {iconicProducts[iconicIndex].count}
      </div>
    </div>
  </div>
</div>

   {/* --- MODERN LUXURY FOOTER --- */}
      <footer style={{ 
        backgroundColor: '#f1f0ed', 
        color: '#644747', 

        padding: isMobile ? '30px 20px 20px 20px' : '50px 80px 40px 80px', 
        fontFamily: "'Swiss', sans-serif",
        marginTop: '02px', 
        position: 'relative',
        overflow: 'hidden'
      }}>
        {!isMobile && (
          <div style={{
            position: 'absolute',
            bottom: '-10px',
            right: '10px',
            fontSize: '170px',
            fontWeight: '900',
            color: '#644747',
            opacity: '0.06',
            pointerEvents: 'none',
            letterSpacing: '-0.02em'
          }}>
            CHARMELUNA
          </div>
        )}

        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          maxWidth: '1300px', 
          margin: '0 auto', 
          gap: isMobile ? '40px 0px' : '40px',
          position: 'relative',
          zIndex: 1
        }}>
          
          <div style={{ flex: isMobile ? '1 1 100%' : '1 1 350px', marginBottom: isMobile ? '20px' : '0' }}>
            <div style={{ 
    fontSize: '42px', 
    fontWeight: '900', 
    fontFamily: '"Gowun Batang", serif', 
    color: '#644747', 
    marginBottom: '15px',
    lineHeight: '1'
  }}>
    CL<span style={{ color: '#b3848f', fontSize: '50px' }}>.</span>
  </div>
  <p style={{ fontSize: '14px', opacity: '0.7', color: '#644747' }}>
    Elevating the standard of beauty through mindful ingredients and iconic design.
  </p>
</div>

          <div style={{ 
            display: 'flex', 
            flex: isMobile ? '1 1 100%' : '1 1 400px', 
            gap: isMobile ? '0' : '80px',
            justifyContent: 'space-between'
          }}>
            {/* SHOP SECTION */}
  <div style={{ flex: '1' }}>
    <h3 style={{ fontSize: '13px', fontWeight: '800', marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Shop</h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      
      <Link href="/shop/lipstick" style={{ color: '#644747', textDecoration: 'none', fontSize: '13px', opacity: '0.6' }} className="hover:opacity-100">Lipstick</Link>
      
      <Link href="/shop/skin-foundation" style={{ color: '#644747', textDecoration: 'none', fontSize: '13px', opacity: '0.6' }} className="hover:opacity-100">Foundation</Link>
      
      <Link href="/shop/eye" style={{ color: '#644747', textDecoration: 'none', fontSize: '13px', opacity: '0.6' }} className="hover:opacity-100">Eyes</Link>
      
      <Link href="/shop/lip-glow" style={{ color: '#644747', textDecoration: 'none', fontSize: '13px', opacity: '0.6' }} className="hover:opacity-100">Lip Glow</Link>
      
      <Link href="/shop/skin-toner" style={{ color: '#644747', textDecoration: 'none', fontSize: '13px', opacity: '0.6' }} className="hover:opacity-100">Skin Toner</Link>
      
    </div>
  </div>

            {/* SUPPORT SECTION */}
<div style={{ flex: '1' }}>
  <h3 style={{ 
    fontSize: '13px', 
    fontWeight: '800', 
    marginBottom: '25px', 
    textTransform: 'uppercase', 
    letterSpacing: '0.2em' 
  }}>
    Support
  </h3>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
    
    <Link href="/" style={{ color: '#644747', textDecoration: 'none', fontSize: '13px', opacity: '0.6' }} className="hover:opacity-100">
      Home
    </Link>
    
    <Link href="/about" style={{ color: '#644747', textDecoration: 'none', fontSize: '13px', opacity: '0.6' }} className="hover:opacity-100">
      About Us
    </Link>
    
    <Link href="/contact" style={{ color: '#644747', textDecoration: 'none', fontSize: '13px', opacity: '0.6' }} className="hover:opacity-100">
      Contact Us
    </Link>
    
    <Link href="/faqs" style={{ color: '#644747', textDecoration: 'none', fontSize: '13px', opacity: '0.6' }} className="hover:opacity-100">
      FAQs
    </Link>
    
  </div>
</div>
</div>

          {/* 4. NEWSLETTER  */}
          <div style={{ flex: isMobile ? '1 1 100%' : '1 1 320px' }}>
            <h3 style={{ fontSize: '11px', fontWeight: '800', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#644747' }}>
              Join our community
            </h3>
            
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1.5px solid #644747', paddingBottom: '8px', marginTop: '10px' }}>
              <input 
  type="email" 
  value={email} 
  onChange={(e) => setEmail(e.target.value)}
  placeholder="ENTER EMAIL ADDRESS" 
  style={{ 
    background: 'transparent', 
    border: 'none', 
    color: '#644747', 
    outline: 'none', 
    flex: 1,
    fontSize: '11px', 
    letterSpacing: '0.15em',
    padding: '5px 0'
  }} 
/>
              <button 
  onClick={handleSubscribe}
  disabled={loading}
  style={{ 
    background: 'none', 
    border: 'none', 
    color: '#644747', 
    fontWeight: '900', 
    cursor: loading ? 'not-allowed' : 'pointer', 
    fontSize: '12px', 
    padding: '0 0 0 15px',
    opacity: loading ? 0.5 : 1
  }} 
>
  {loading ? "..." : "→"}
</button>
            </div>

            {message && (
              <p style={{ fontSize: '12px', color: '#8f645e', marginTop: '10px', fontWeight: '600', transition: '0.3s' }}>
                {message}
              </p>
            )}
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div style={{ 
          maxWidth: '1300px',
          margin: '80px auto 0 auto',
          display: 'flex',
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',     
          gap: '10px',
          paddingTop: '30px', 
          borderTop: '1px solid rgba(100, 71, 71, 0.1)', 
          fontSize: '10px', 
          opacity: '0.6',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          textAlign: 'center' 
        }}>
          <div>© 2026 CHARMELUNA STORE. All rights reserved.</div>
        </div>
      </footer>
      </motion.div>
      )}
 </main>
  );
  
}