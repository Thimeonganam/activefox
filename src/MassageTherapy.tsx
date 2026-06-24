import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Link, useNavigate } from 'react-router-dom';
import { SEO } from './components/SEO';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { ChevronDown, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Expandable Accordion Item
const AccordionItem = ({ title, content, index }: { title: string, content: string, index: string | number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0,
        duration: 0.4,
        ease: 'power2.inOut'
      });
    }
  }, [isOpen]);

  return (
    <div className="border-b border-neutral-300">
      <button 
        className="w-full py-6 flex justify-between items-center text-left hover:text-[#bd7a58] transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-monument text-sm md:text-base uppercase tracking-widest flex items-center gap-4">
           <span className="text-neutral-400 text-xs">{index}.</span> {title}
        </span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#bd7a58]' : 'text-neutral-400'}`} />
      </button>
      <div ref={contentRef} className="h-0 opacity-0 overflow-hidden">
        <p className="pb-6 text-neutral-600 font-sans font-light leading-relaxed pr-12 text-sm md:text-base">
          {content}
        </p>
      </div>
    </div>
  );
};

export default function MassageTherapy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // CMS state
  const [cmsData, setCmsData] = useState({
      hero: { 
          title: "MASSAGE TRỊ LIỆU", 
          subtitle: "ACTIVE FOX WELL-BEING", 
          mediaUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
      },
      overview: { 
          title: "MASSAGE TRỊ LIỆU CỔ VAI GÁY CHUYÊN SÂU", 
          description: "Liệu trình trị liệu cơ học chuyên biệt tại Active Fox được thiết kế dành riêng cho dân văn phòng và người thường ngồi làm việc sai tư thế kéo dài. Tập trung giải tỏa triệt để các nốt co thắt cơ học (trigger points) tại vùng cổ, vai, gáy và cột sống thắt lưng. Liệu trình giúp kích thích hệ tuần hoàn máu lưu thông lên não, xua tan căng thẳng mệt mỏi tích tụ và nhanh chóng phục hồi năng lượng thể chất lẫn tinh thần làm việc.", 
          mediaUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
      },
      services: {
          title: "SPORTS MASSAGE",
          description: "Gói được thiết kế dành riêng cho đặc thù các môn thể thao: chạy bộ, pickleball, đạp xe, bơi lội. Giúp giải phóng căng cơ toàn diện, phục hồi thân dưới và ngừa chấn thương hiệu quả."
      }
  });

  useEffect(() => {
      const fetchCMS = async () => {
          try {
            const heroSnap = await getDoc(doc(db, "pages", "massage_therapy", "blocks", "hero"));
            const overviewSnap = await getDoc(doc(db, "pages", "massage_therapy", "blocks", "overview"));
            const servicesSnap = await getDoc(doc(db, "pages", "massage_therapy", "blocks", "services"));
            
            setCmsData(prev => ({
                hero: heroSnap.exists() ? { ...prev.hero, ...heroSnap.data() } : prev.hero,
                overview: overviewSnap.exists() ? { ...prev.overview, ...overviewSnap.data() } : prev.overview,
                services: servicesSnap.exists() ? { ...prev.services, ...servicesSnap.data() } : prev.services,
            }));
          } catch (error) {
            console.error("Error fetching CMS Data:", error);
          }
      }
      fetchCMS();
  }, []);

  useGSAP(() => {
    // Simple fade-in for hero
    gsap.fromTo('.hero-section',
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power2.out' }
    );

    // Fade up sections
    gsap.utils.toArray('.fade-up-section').forEach((section: any) => {
      gsap.fromTo(section, 
        { opacity: 0 },
        {
          opacity: 1, 
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          }
        }
      );
    });
  }, { scope: containerRef });

  const tools = [
    { title: "KIỂM TRA CƠ & XÁC ĐỊNH ĐIỂM CĂNG ĐAU", content: "Khai thác các điểm đau mỏi (pain points) tại vùng cổ, vai, gáy, hoặc thắt lưng do ngồi lâu sai tư thế để thiết kế phác đồ nhả cơ phù hợp nhất." },
    { title: "NHẤN - GIÃN CƠ TĨNH (STATIC STRETCHING)", content: "Sử dụng lực đè ấn tĩnh tại các đốt cơ co rút kết hợp kéo giãn thụ động từ HLV chuyên sâu để giảm tải đè nén lên ổ khớp cổ và cột sống." },
    { title: "GIÃN CƠ TRỊ LIỆU CHUYÊN SÂU", content: "Sử dụng các kỹ thuật miết dọc cơ sâu nhắm trúng các trigger points vùng cổ vai gáy để khai thông điểm nghẽn mạch máu, giảm đau nhức nhanh chóng." },
    { title: "GIẢI PHÓNG MẠC CƠ CHUYÊN DỤNG (IASTM)", content: "Sử dụng dao trị liệu chải cơ chuyên dụng giúp bóc tách màng mạc cơ bị đông cứng quanh khớp vai gáy, khôi phục lại sự dẻo dai linh hoạt." }
  ];

  const techniques = [
    { title: "GIẢM NHỨC MỎI & CĂNG CƠ CỔ VAI GÁY TỨC THÌ", content: "Giúp nhả hoàn toàn tình trạng bó cơ cứng ngắc vùng cổ vai gáy, giảm đau nhức nửa đầu do thiếu máu tuần hoàn và đem lại cảm giác nhẹ nhõm sảng khoái ngay tức thì." },
    { title: "CẢI THIỆN ĐỘ LINH HOẠT VẬN ĐỘNG CỔ VAI", content: "Bóc tách các dải cơ bị bó chặt, mở kẹt khớp bả vai giúp bạn xoay cổ vai gáy dễ dàng hơn, thẳng trục lưng và cải thiện tư thế." },
    { title: "TĂNG CƯỜNG TUẦN HOÀN MÁU LÊN NÃO", content: "Kích hoạt lưu thông hệ mạch máu, tăng cung cấp oxy nuôi dưỡng tế bào não và mô cơ mỏi, xóa tan trạng thái uể oải, mất ngủ kinh niên." },
    { title: "PHÒNG TRÁNH THOÁI HÓA ĐỐT SỐNG CỔ", content: "Bảo vệ đĩa sụn và khớp xương khỏi sự chèn ép đè nén liên tục của nhóm cơ căng cứng, giúp nâng đỡ và ổn định hệ cơ xương khớp văn phòng lâu dài." }
  ];

  return (
    <article ref={containerRef} className="w-full bg-[#fdfbf9] min-h-screen text-[#1a100c] font-sans selection:bg-[#bd7a58] selection:text-white pt-20 lg:pt-24 pb-20">
      <SEO 
        title={`${cmsData.hero.title} | Active Fox`}
        description={cmsData.overview.description}
        path="/dich-vu/massage-tri-lieu"
      />
      
      {/* 1. Hero Section */}
      <section className="hero-section relative w-full h-[60vh] md:h-[80vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 w-full h-full z-0">
            <img src={cmsData.hero.mediaUrl} alt="Phục Hồi Thể Thao" className="w-full h-full object-cover grayscale-[10%]" crossOrigin="anonymous" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
            <span className="text-[#e2dac6] text-xs md:text-sm font-monument tracking-[0.3em] uppercase mb-6 block drop-shadow-md">{cmsData.hero.subtitle}</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-monument text-white uppercase tracking-tighter leading-[1.1] drop-shadow-lg">{cmsData.hero.title}</h1>
        </div>
      </section>

      {/* Sticky Navigation (Desktop) */}
      <nav className="hidden lg:flex sticky top-[80px] z-[50] bg-[#fdfbf9]/90 backdrop-blur-md border-b border-neutral-200 w-full justify-center gap-12 py-4">
         <a href="#overview" className="text-xs font-monument uppercase tracking-widest text-neutral-500 hover:text-[#bd7a58] transition-colors">Massage Phục Hồi</a>
         <a href="#heat-therapy" className="text-xs font-monument uppercase tracking-widest text-neutral-500 hover:text-[#bd7a58] transition-colors">Liệu Pháp Nhiệt</a>
      </nav>

      {/* 2. Overview / Tools & Techniques */}
      <section id="overview" className="w-full max-w-7xl mx-auto px-6 py-24 md:py-32 fade-up-section">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
              {/* Left Column */}
              <div>
                 <h2 className="text-4xl md:text-5xl font-monument uppercase tracking-tight mb-8 text-[#2c1d11]">{cmsData.overview.title}</h2>
                 <p className="text-lg md:text-xl font-seasons italic text-neutral-600 mb-12 leading-relaxed">
                   {cmsData.overview.description}
                 </p>
                 <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative border border-neutral-200">
                    <img src={cmsData.overview.mediaUrl} alt="Massage Tools" className="w-full h-full object-cover" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-[#bd7a58]/10 mix-blend-multiply"></div>
                 </div>
              </div>

              {/* Right Column: Accordions */}
              <div className="flex flex-col gap-12">
                  <div>
                      <h3 className="text-2xl font-monument uppercase tracking-widest mb-6 text-[#2c1d11]">Tiến Trình Liệu Trình (60 Phút)</h3>
                      <div className="border-t border-neutral-300">
                         {tools.map((item, idx) => (
                             <AccordionItem key={idx} index={idx + 1} title={item.title} content={item.content} />
                         ))}
                      </div>
                  </div>

                  <div>
                      <h3 className="text-2xl font-monument uppercase tracking-widest mb-6 text-[#2c1d11]">Lợi Ích & Hiệu Quả</h3>
                      <div className="border-t border-neutral-300">
                         {techniques.map((item, idx) => (
                             <AccordionItem key={idx} index={String.fromCharCode(65 + idx)} title={item.title} content={item.content} />
                         ))}
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* 3. Services Menu - Temporarily disabled by user request */}
      {/* 
      <section id="services" className="w-full bg-[#ece8e1] py-24 md:py-32">
          ...
      </section>
      */}



    </article>
  );
}
