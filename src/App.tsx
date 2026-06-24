import { useRef, useEffect, useState } from "react";
import { CheckCircle2, Users, Flame, Activity, Footprints, Wind, Heart, Zap, Shield, Target, HeartPulse, Dumbbell, Timer, Infinity as InfinityIcon, Medal, MoveRight, ArrowRight, Gauge, Anchor, ChevronRight, Play, Menu, X, Phone, MessageCircle } from "lucide-react";
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Home from "./Home";
import Coaching from "./Coaching";
import Recovery from "./Recovery";
import Schedule from "./Schedule";

import FoxStrength from "./FoxStrength";
import FoxRun from "./FoxRun";
import DoKhop from "./DoKhop";
import HybridTraining from "./HybridTraining";
import HyroxClass from "./HyroxClass";
import MassageTherapy from "./MassageTherapy";
import IceBath from "./IceBath";
import { RegistrationProvider, useRegistration } from "./RegistrationContext";
import CMS from "./cms/CMS";
import Blog from "./Blog";
import BlogPost from "./BlogPost";

import SportsMassageLP from "./landing/SportsMassageLP";
import DoKhopLP from "./landing/DoKhopLP";
import FoxRunLP from "./landing/FoxRunLP";
import HyroxLP from "./landing/HyroxLP";
import GymLP from "./landing/GymLP";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <RegistrationProvider>
          <AppContent />
        </RegistrationProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const overlayRef = useRef<HTMLDivElement>(null);
  const foxRef = useRef<HTMLImageElement>(null);
  const isAnimating = useRef(false);

  const LOGO_URL = "https://i.postimg.cc/Hx3dJ54h/Noi-dung-doan-van-ban-cua-ban-(9).png";

  // Handle manual back/forward navigation or initial load scroll
  useEffect(() => {
    if (!isAnimating.current) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  // Trigger GA4 pageview on path change for Single Page Application routing
  useEffect(() => {
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('config', 'G-5RENEC0CSB', {
        page_path: pathname + window.location.search
      });
    }
  }, [pathname]);

  // Intercept all internal clicks for page transition
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

      const target = (e.target as Element).closest('a');
      if (target && target.href && target.target !== '_blank') {
        const url = new URL(target.href);
        if (url.origin === window.location.origin) {
          if (url.pathname === pathname) return;

          e.preventDefault();
          e.stopPropagation();

          // Disable custom transition on mobile/tablet to improve performance
          if (window.innerWidth < 1024) {
             navigate(url.pathname + url.search + url.hash);
             return;
          }

          // Skip global fox transition when navigating to /tri-lieu or /dich-vu/*
          if (url.pathname === '/tri-lieu' || url.pathname.includes('/dich-vu/')) {
             navigate(url.pathname + url.search + url.hash);
             return;
          }

          if (isAnimating.current) return;
          isAnimating.current = true;

          const tl = gsap.timeline({
            onComplete: () => {
              navigate(url.pathname + url.search + url.hash);
              
              // Wait a tiny bit for render, then scroll and animate out
              setTimeout(() => {
                window.scrollTo(0, 0);
                gsap.to(overlayRef.current, {
                  xPercent: 100,
                  duration: 0.8,
                  ease: "power3.inOut",
                  onComplete: () => {
                    gsap.set(overlayRef.current, { xPercent: -100 });
                    isAnimating.current = false;
                  }
                });
              }, 50);
            }
          });

          // Reset Start Positions
          gsap.set(overlayRef.current, { xPercent: -100 });
          gsap.set(foxRef.current, { x: "-20vw", opacity: 1 });

          // 1. Fox swishes across
          tl.to(foxRef.current, {
            x: "120vw",
            duration: 0.7,
            ease: "power2.inOut"
          });

          // 2. Orange bar sweeps in
          tl.to(overlayRef.current, {
            xPercent: 0,
            duration: 0.6,
            ease: "power3.inOut"
          }, "-=0.3"); // Overlaps with the fox leaving
        }
      }
    };

    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, [navigate, pathname]);

  return (
    <div className="selection:bg-[#FF6129] selection:text-white bg-black min-h-screen text-white overflow-hidden font-sans">
      
      {/* PAGE TRANSITION OVERLAY */}
      <div 
        ref={overlayRef} 
        className="fixed inset-0 z-[9999] bg-brand-orange pointer-events-none flex items-center justify-center hidden lg:flex"
        style={{ transform: 'translateX(-100%)' }}
      >
        <span className="text-4xl md:text-6xl font-black uppercase text-black italic tracking-tighter">
          Active Fox
        </span>
      </div>

      <img 
        ref={foxRef}
        src={LOGO_URL}
        className="fixed top-1/2 -translate-y-1/2 left-0 z-[10000] h-24 md:h-32 object-contain pointer-events-none drop-shadow-2xl opacity-0 hidden lg:block"
        style={{ transform: 'translateX(-20vw)' }}
        alt="Fox Transition"
      />

      {!pathname.startsWith('/landing/') && <Nav LOGO_URL={LOGO_URL} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bo-mon/fox-strength" element={<FoxStrength />} />
        <Route path="/bo-mon/fox-run" element={<FoxRun />} />
        <Route path="/bo-mon/do-khop" element={<DoKhop />} />
        <Route path="/bo-mon/hybrid-training" element={<HybridTraining />} />
        <Route path="/bo-mon/hyrox" element={<HyroxClass />} />
        <Route path="/huan-luyen-vien" element={<Coaching />} />
        <Route path="/tri-lieu" element={<Recovery />} />
        <Route path="/dich-vu/massage-tri-lieu" element={<MassageTherapy />} />
        <Route path="/dich-vu/ice-bath" element={<IceBath />} />
        <Route path="/lich-tap" element={<Schedule />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/cms/*" element={<CMS />} />
        
        {/* LANDING PAGES FOR ADVERTISING */}
        <Route path="/landing/sports-massage" element={<SportsMassageLP />} />
        <Route path="/landing/do-khop" element={<DoKhopLP />} />
        <Route path="/landing/fox-run" element={<FoxRunLP />} />
        <Route path="/landing/hyrox" element={<HyroxLP />} />
        <Route path="/landing/gym" element={<GymLP />} />
      </Routes>
      {!pathname.startsWith('/landing/') && <Footer />}
      {!pathname.startsWith('/landing/') && !pathname.startsWith('/cms') && <FloatingContact />}

    </div>
  );
}

function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-5 z-[120] flex flex-col gap-3">
      <a
        href="https://zalo.me/0377823856"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Zalo với Active Fox"
        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 hover:scale-105 transition-transform"
      >
        <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
      </a>
      <a
        href="tel:0377823856"
        aria-label="Gọi hotline Active Fox"
        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-lg shadow-brand-orange/40 hover:scale-105 transition-transform"
      >
        <Phone className="w-5 h-5 md:w-6 md:h-6" />
      </a>
    </div>
  );
}

function Nav({ LOGO_URL }: { LOGO_URL: string }) {
  const navRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openModal } = useRegistration();
  const { pathname } = useLocation();
  
  useGSAP(() => {
    let mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      gsap.from(navRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    });
  });

  const isActive = (path: string) => pathname === path ? "text-brand-orange" : "hover:text-white transition-colors";
  const isBoMonActive = pathname.startsWith('/bo-mon/');

  return (
    <>
      <nav 
        ref={navRef}
        className="fixed top-0 left-0 w-full z-[100] px-4 md:px-8 py-4 bg-black/80 backdrop-blur-md border-b border-white/5 flex justify-between items-center transition-all"
      >
        <Link to="/" className="flex items-center gap-2 relative z-[101]" onClick={() => setIsMobileMenuOpen(false)}>
          {LOGO_URL ? (
            <img src={LOGO_URL} alt="Active Fox Logo" className="h-[2.5rem] md:h-[3.5rem] lg:h-[4rem] object-contain block py-1" />
          ) : (
            <span className="text-xl font-monument uppercase tracking-tight text-white">ACTIVE <span className="text-brand-orange">FOX</span></span>
          )}
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10 text-xs tracking-[0.2em] font-bold uppercase text-neutral-300">
          <Link to="/" className={isActive('/')}>Trang Chủ</Link>
          <div className="relative group cursor-pointer h-16 flex items-center">
            <span className={isBoMonActive ? "text-brand-orange" : "hover:text-white transition-colors"}>Bộ Môn</span>
            <div className="absolute top-16 left-1/2 -translate-x-1/2 min-w-[220px] bg-neutral-950 border border-white/10 rounded-xl p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col gap-1 shadow-[0_10px_40px_rgba(0,0,0,0.8)] pointer-events-none group-hover:pointer-events-auto">
              <Link to="/bo-mon/fox-strength" className={`px-4 py-3 hover:bg-white/5 hover:text-brand-orange rounded-lg transition-colors whitespace-nowrap ${pathname === '/bo-mon/fox-strength' ? 'text-brand-orange bg-white/5' : ''}`}>Fox Strength</Link>
              <Link to="/bo-mon/fox-run" className={`px-4 py-3 hover:bg-white/5 hover:text-brand-orange rounded-lg transition-colors whitespace-nowrap ${pathname === '/bo-mon/fox-run' ? 'text-brand-orange bg-white/5' : ''}`}>Fox Run</Link>
              <Link to="/bo-mon/do-khop" className={`px-4 py-3 hover:bg-white/5 hover:text-brand-orange rounded-lg transition-colors whitespace-nowrap ${pathname === '/bo-mon/do-khop' ? 'text-brand-orange bg-white/5' : ''}`}>Độ Khớp</Link>
              <Link to="/bo-mon/hybrid-training" className={`px-4 py-3 hover:bg-white/5 hover:text-brand-orange rounded-lg transition-colors whitespace-nowrap ${pathname === '/bo-mon/hybrid-training' ? 'text-brand-orange bg-white/5' : ''}`}>Fox Hybrid Training</Link>
              <Link to="/bo-mon/hyrox" className={`px-4 py-3 hover:bg-white/5 hover:text-yellow-500 rounded-lg transition-colors whitespace-nowrap ${pathname === '/bo-mon/hyrox' ? 'text-yellow-500 bg-white/5' : ''}`}>HYROX Training</Link>
            </div>
          </div>
          <Link to="/tri-lieu" className={isActive('/tri-lieu')}>Phục Hồi & Trị Liệu</Link>

          <Link to="/lich-tap" className={isActive('/lich-tap')}>Lịch Tập</Link>
          <Link to="/huan-luyen-vien" className={isActive('/huan-luyen-vien')}>Huấn Luyện Viên</Link>
          <Link to="/blog" className={pathname.startsWith('/blog') ? "text-brand-orange" : "hover:text-white transition-colors"}>Blog</Link>
        </div>
        
        <div className="hidden lg:block">
          <button onClick={() => openModal()} className="text-xs tracking-[0.1em] font-bold border border-brand-orange bg-brand-orange text-white px-6 py-3 rounded-full hover:bg-brand-red transition-all uppercase">
            Tham Gia
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center gap-4 relative z-[101]">
          <button onClick={() => { setIsMobileMenuOpen(false); openModal(); }} className="text-[10px] tracking-[0.1em] font-bold border border-brand-orange bg-brand-orange text-white px-4 py-2 rounded-full hover:bg-brand-red transition-all uppercase">
            Tham Gia
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="text-white hover:text-brand-orange transition-colors duration-300"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <div 
        className={`fixed inset-0 z-[90] bg-black/95 backdrop-blur-xl transition-all duration-500 flex flex-col pt-32 px-8 lg:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
      >
        <div className="flex flex-col gap-6 text-xl font-monument uppercase tracking-tight overflow-y-auto pb-20">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={isActive('/')}>Trang Chủ</Link>
          
          <div className="flex flex-col gap-4 mt-2">
            <span className={isBoMonActive ? "text-brand-orange text-base" : "text-white/50 text-base"}>Bộ Môn</span>
            <div className="flex flex-col gap-5 pl-4 border-l-2 border-white/10 text-lg text-neutral-300">
              <Link to="/bo-mon/fox-strength" onClick={() => setIsMobileMenuOpen(false)} className={pathname === '/bo-mon/fox-strength' ? 'text-brand-orange' : 'hover:text-brand-orange transition-colors'}>Fox Strength</Link>
              <Link to="/bo-mon/fox-run" onClick={() => setIsMobileMenuOpen(false)} className={pathname === '/bo-mon/fox-run' ? 'text-brand-orange' : 'hover:text-brand-orange transition-colors'}>Fox Run</Link>
              <Link to="/bo-mon/do-khop" onClick={() => setIsMobileMenuOpen(false)} className={pathname === '/bo-mon/do-khop' ? 'text-brand-orange' : 'hover:text-brand-orange transition-colors'}>Độ Khớp</Link>
              <Link to="/bo-mon/hybrid-training" onClick={() => setIsMobileMenuOpen(false)} className={pathname === '/bo-mon/hybrid-training' ? 'text-brand-orange' : 'hover:text-brand-orange transition-colors'}>Fox Hybrid Training</Link>
              <Link to="/bo-mon/hyrox" onClick={() => setIsMobileMenuOpen(false)} className={pathname === '/bo-mon/hyrox' ? 'text-yellow-500' : 'hover:text-yellow-500 transition-colors'}>HYROX Training</Link>
            </div>
          </div>
          
          <div className="w-full h-px bg-white/10 my-2"></div>
          
          <Link to="/tri-lieu" onClick={() => setIsMobileMenuOpen(false)} className={isActive('/tri-lieu')}>Phục Hồi & Trị Liệu</Link>


          <Link to="/lich-tap" onClick={() => setIsMobileMenuOpen(false)} className={isActive('/lich-tap')}>Lịch Tập</Link>
          <Link to="/huan-luyen-vien" onClick={() => setIsMobileMenuOpen(false)} className={isActive('/huan-luyen-vien')}>Huấn Luyện Viên</Link>
          <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className={pathname.startsWith('/blog') ? "text-brand-orange" : "text-white/80 hover:text-brand-orange transition-colors"}>Blog</Link>
        </div>
      </div>
    </>
  );
}

function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const { openModal } = useRegistration();

  useGSAP(() => {
    let mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      gsap.from(".footer-content", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        }
      });
    });
  }, { scope: footerRef });

  return (
    <section ref={footerRef} className="min-h-[70vh] flex flex-col items-center justify-center bg-black relative z-20 py-20 mt-12 lg:mt-0 border-t border-white/10">
      <div className="footer-content flex flex-col items-center px-4 text-center max-w-4xl">
        <div className="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center mb-8 mx-auto shadow-[0_0_40px_rgba(255,97,41,0.4)]">
          <Flame className="w-8 h-8 text-white" />
        </div>
        <h2 className="uppercase font-black text-4xl md:text-7xl lg:text-8xl mb-6 tracking-tighter">
          ĐÃ SẴN SÀNG<br/><span className="text-neutral-600">ĐỘT PHÁ?</span>
        </h2>
        <p className="text-neutral-400 mb-12 max-w-xl text-sm md:text-base px-4">
          Gia nhập cộng đồng Active Fox ngay hôm nay. Vượt qua giới hạn, xây dựng sức mạnh thực sự cùng đội ngũ chuyên gia.
        </p>

        <button onClick={() => openModal()} className="group relative px-10 py-5 cursor-pointer overflow-hidden border border-white bg-black w-full sm:w-auto rounded-full">
          <span className="relative z-10 text-xs md:text-sm tracking-[0.2em] font-bold uppercase transition-colors duration-500 group-hover:text-black">
            Đăng Ký TẬP THỬ
          </span>
          <div className="absolute inset-0 bg-white translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0 rounded-full"></div>
        </button>
      </div>
      
      {/* Footer minimal info */}
      <div className="absolute bottom-8 w-full flex flex-col items-center text-center px-8 text-[10px] tracking-widest text-neutral-500 font-bold uppercase gap-5">
        <a href="tel:0377823856" className="flex items-center gap-2 text-neutral-300 hover:text-brand-orange transition-colors normal-case text-xs tracking-wide">
          <Phone className="w-3.5 h-3.5 text-brand-orange" /> Hotline: 037 782 3856
        </a>
        <div className="flex gap-6">
          <a href="https://www.facebook.com/activefox" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a>
          <a href="https://www.instagram.com/activefox" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
          <a href="https://zalo.me/0377823856" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Zalo</a>
        </div>
        <div className="flex gap-4 items-center">
          <span>© {new Date().getFullYear()} Active Fox</span>
          <span className="w-1 h-1 rounded-full bg-neutral-700"></span>
          <span>62 Hoàng Thế Thiện, P. An Khánh · 175B Cao Thắng, P. Hòa Hưng · TP.HCM</span>
        </div>
      </div>
    </section>
  );
}
