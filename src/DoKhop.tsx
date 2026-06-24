import { useRef, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SEO } from "./components/SEO";

export default function DoKhop() {
  return (
    <main className="pt-20 bg-black min-h-screen text-white">
      <SEO 
        title="Độ Khớp | Active Fox"
        description="Chương trình phục hồi cơ xương khớp, gia tăng biên độ vận động và phòng tránh chấn thương."
        path="/bo-mon/do-khop"
      />
      <MobilityHero />
      <MobilityInfo />
      <MobilityScrollExpand />
    </main>
  );
}

function MobilityHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  const [content, setContent] = useState({
    title: "ĐỘ KHỚP",
    description: "Tối ưu hóa biên độ vận động, phòng ngừa chấn thương và nâng cao hiệu suất với giáo trình đặc chế chuyên biệt.",
    subtitle: "Bảo trợ chuyên môn bởi Độ Khớp Club",
    mediaUrl: "https://i.postimg.cc/66Mv26Km/Screenshot-2025-12-19-at-14-06-42.png"
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docSnap = await getDoc(doc(db, "pages", "do_khop", "blocks", "hero"));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setContent({
            title: data.title || content.title,
            description: data.description || content.description,
            subtitle: data.subtitle || content.subtitle,
            mediaUrl: data.mediaUrl || content.mediaUrl
          });
        }
      } catch (err) {
        console.error("Failed to load do_khop hero:", err);
      }
    };
    fetchContent();
  }, []);

  useGSAP(() => {
    let mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      gsap.fromTo(".eq-hero-text", 
        { opacity: 0 },
        { opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
      );
    });
  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="h-[70vh] relative bg-black flex flex-col justify-center items-center overflow-hidden border-t border-white/20">
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-10"></div>
        <img 
          src={content.mediaUrl} 
          className="eq-hero-bg absolute inset-0 w-full h-full object-cover grayscale"
          alt="Mobility"
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="relative z-20 flex flex-col items-center px-4 w-full text-center mt-20">
        <span className="eq-hero-text text-[10px] md:text-sm font-bold uppercase tracking-[0.4em] text-brand-orange mb-6 md:mb-8 whitespace-pre-wrap">
          {content.subtitle}
        </span>
        <h2 className="eq-hero-text text-5xl md:text-7xl lg:text-9xl font-light uppercase tracking-tighter text-white leading-none mb-8 whitespace-pre-wrap">
          {content.title}
        </h2>
        <p className="eq-hero-text text-neutral-400 max-w-xl text-sm md:text-base font-light leading-relaxed whitespace-pre-wrap">
          {content.description}
        </p>
      </div>
    </section>
  );
}

function MobilityInfo() {
  const ref = useRef<HTMLDivElement>(null);
  
  const [content, setContent] = useState({
    title: "Tiêu chuẩn\nQuốc tế",
    subtitle: "Cấu trúc lớp học",
    description: "10-15",
    content: "Người / Lớp học",
    mediaUrl: "1-2",
    mediaUrl2: "Huấn Luyện Viên"
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docSnap = await getDoc(doc(db, "pages", "do_khop", "blocks", "overview"));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setContent({
            title: data.title || content.title,
            subtitle: data.subtitle || content.subtitle,
            description: data.description || content.description,
            content: data.content || content.content,
            mediaUrl: data.mediaUrl || content.mediaUrl,
            mediaUrl2: data.mediaUrl2 || content.mediaUrl2
          });
        }
      } catch (err) {
        console.error("Failed to load do_khop info:", err);
      }
    };
    fetchContent();
  }, []);

  useGSAP(() => {
    let mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      gsap.fromTo(".info-item",
        { opacity: 0 },
        { 
          opacity: 1, 
          stagger: 0.1, 
          duration: 0.7, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%"
          }
        }
      );
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="py-12 md:py-24 border-t border-b border-white/10 bg-black relative z-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
           <div className="info-item">
             <h3 className="text-xs font-bold tracking-[0.4em] uppercase text-neutral-500 mb-4 whitespace-pre-wrap">{content.subtitle}</h3>
             <h2 className="text-3xl md:text-5xl font-light uppercase tracking-tight leading-[1.1] whitespace-pre-wrap">
               {content.title}
             </h2>
           </div>
           
           <div className="flex flex-wrap gap-12 md:gap-24">
              <div className="info-item">
                <div className="text-4xl md:text-6xl font-light tracking-tighter text-white whitespace-pre-wrap">{content.description}</div>
                <div className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-brand-orange mt-2 whitespace-pre-wrap">{content.content}</div>
              </div>
              <div className="info-item hidden md:block w-[1px] h-16 bg-white/20"></div>
              <div className="info-item">
                <div className="text-4xl md:text-6xl font-light tracking-tighter text-white whitespace-pre-wrap">{content.mediaUrl}</div>
                <div className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-brand-orange mt-2 whitespace-pre-wrap">{content.mediaUrl2}</div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}

function MobilityScrollExpand() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [programs, setPrograms] = useState([
    { 
      id: "01",
      title: "Mobility", 
      desc: "Các bài tập cải thiện sự linh hoạt và mở biên độ cơ khớp, giải phóng áp lực tích tụ dài hạn lên cơ thể. Trả lại trạng thái tự nhiên cho cơ bắp.", 
      img: "https://i.postimg.cc/nrXcQJYQ/546847894-122117759042970036-3751438495229499393-n.jpg" 
    },
    { 
      id: "02",
      title: "Prehab - Rehab", 
      desc: "Cải thiện nhóm cơ chức năng, phòng ngừa hoặc hỗ trợ tái tạo, điều trị chấn thương khi vận động cường độ cao. Thiết lập lại cấu trúc chịu lực an toàn.", 
      img: "https://i.postimg.cc/zBVVTK86/DSC00751-(1).jpg" 
    },
    { 
      id: "03",
      title: "Movement", 
      desc: "Tinh chỉnh kỹ thuật chuyển động, tư thế trụ, dáng chạy, nhịp bước và tối ưu hóa cơ chế tiếp đất để tăng cường hiệu suất thể thao tối đa.", 
      img: "https://i.postimg.cc/J7HsnNTH/548468892-122117758760970036-5567678534561908468-n.jpg" 
    }
  ]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const p1Snap = await getDoc(doc(db, "pages", "do_khop", "blocks", "program_1"));
        const p2Snap = await getDoc(doc(db, "pages", "do_khop", "blocks", "program_2"));
        const p3Snap = await getDoc(doc(db, "pages", "do_khop", "blocks", "program_3"));
        
        let newPrograms = [...programs];
        if (p1Snap.exists()) {
          const d = p1Snap.data();
          newPrograms[0] = { ...newPrograms[0], title: d.title || newPrograms[0].title, desc: d.description || newPrograms[0].desc, img: d.mediaUrl || newPrograms[0].img };
        }
        if (p2Snap.exists()) {
          const d = p2Snap.data();
          newPrograms[1] = { ...newPrograms[1], title: d.title || newPrograms[1].title, desc: d.description || newPrograms[1].desc, img: d.mediaUrl || newPrograms[1].img };
        }
        if (p3Snap.exists()) {
          const d = p3Snap.data();
          newPrograms[2] = { ...newPrograms[2], title: d.title || newPrograms[2].title, desc: d.description || newPrograms[2].desc, img: d.mediaUrl || newPrograms[2].img };
        }
        
        setPrograms(newPrograms);
      } catch (err) {
        console.error("Failed to load do_khop programs:", err);
      }
    };
    fetchContent();
  }, []);

  useGSAP(() => {
    let mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const items = gsap.utils.toArray('.expand-section');
      
      items.forEach((item: any) => {
        gsap.fromTo(item,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%"
            }
          }
        );
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 bg-black overflow-hidden relative">
      <div className="text-center mb-24 relative z-10">
        <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-brand-orange mb-4">Hệ thống bài tập</h2>
        <div className="text-4xl md:text-6xl font-light uppercase tracking-tighter text-white">Chương Trình<br/>Trọng Tâm</div>
      </div>

      <div className="w-full flex flex-col gap-32">
        {programs.map((p, index) => (
          <div key={p.id} className="expand-section flex flex-col items-center w-full relative z-10 px-4 md:px-8">
             
             {/* Header Title with animated brackets */}
             <div className="flex items-center justify-center mb-8 md:mb-12 w-full max-w-5xl overflow-hidden">
                <span className="bracket-left text-3xl md:text-5xl lg:text-7xl font-monument font-light text-neutral-600 block origin-right">
                  [
                </span>
                <h3 className="mx-4 md:mx-12 text-3xl md:text-5xl lg:text-7xl font-monument uppercase tracking-tight text-white whitespace-nowrap z-10">
                  {p.title}
                </h3>
                <span className="bracket-right text-3xl md:text-5xl lg:text-7xl font-monument font-light text-neutral-600 block origin-left">
                  ]
                </span>
             </div>

             {/* Expanding Image Mask */}
             <div className="img-wrapper relative h-[400px] md:h-[60vh] overflow-hidden max-w-[1400px] mx-auto z-0 w-full rounded-lg">
                <img 
                  src={p.img} 
                  alt={p.title} 
                  className="img-inner absolute inset-0 w-full h-full object-cover grayscale-[30%]"
                  crossOrigin="anonymous" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20"></div>
             </div>

             {/* Description text under expanding image */}
             <div className="mt-8 max-w-xl text-center px-4 w-full">
                <div className="text-sm font-bold tracking-[0.2em] text-brand-orange mb-4">{p.id}</div>
                <p className="text-neutral-400 font-light leading-relaxed md:text-lg">
                  {p.desc}
                </p>
             </div>
             
          </div>
        ))}
      </div>
    </section>
  );
}

/* ==============================================================
   HYBRID TRAINING SECTION - NEON/CYBERPUNK ACCORDION
   ============================================================== */
