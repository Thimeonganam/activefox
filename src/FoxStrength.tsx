import { useRef, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { CheckCircle2, Users, Flame, Activity, Footprints, Wind, Heart, Zap, Shield, Target, HeartPulse, Dumbbell, Timer, Infinity as InfinityIcon, Medal, MoveRight, ArrowRight, Gauge, Anchor, ChevronRight, Play } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SEO } from "./components/SEO";

export default function FoxStrength() {
  return (
    <main className="pt-20 bg-black min-h-screen text-white">
      <SEO 
        title="Fox Strength | Active Fox"
        description="Huấn luyện cá nhân sức mạnh chuyên sâu. Phát triển cơ bắp, cải thiện kỹ thuật cử tạ, squat và các bài tập tổng hợp."
        path="/bo-mon/fox-strength"
      />
      <Hero />
      <ClassOverview />
      <TrainingProgram />
    </main>
  );
}

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState({
    title: "LỚP\nSTRENGTH",
    description: "Sức mạnh toàn thân • Đốt mỡ • Tính cộng đồng",
    mediaUrl: "https://i.postimg.cc/pLfsftyf/z7748487612864-64dedee8d320d0094b9d6f6e631050af.jpg"
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docSnap = await getDoc(doc(db, "pages", "fox_strength", "blocks", "hero"));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setContent({
            title: data.title || "LỚP\nSTRENGTH",
            description: data.description || "Sức mạnh toàn thân • Đốt mỡ • Tính cộng đồng",
            mediaUrl: data.mediaUrl || "https://i.postimg.cc/pLfsftyf/z7748487612864-64dedee8d320d0094b9d6f6e631050af.jpg"
          });
        }
      } catch (err) {
        console.error("Failed to load fox strength hero content:", err);
      }
    };
    fetchContent();
  }, []);

  useGSAP(() => {
    let mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline();
      
      tl.fromTo(".hero-tag", 
        { opacity: 0 },
        { opacity: 1, duration: 0.7, ease: "power2.out" }
      );
      
      tl.fromTo(".hero-title", 
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );
      
      tl.fromTo(".hero-sub", 
        { opacity: 0 },
        { opacity: 1, duration: 0.7, ease: "power2.out" },
        "-=0.4"
      );
      
      tl.fromTo(".hero-scroll", 
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );
    });
  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="h-screen relative flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={content.mediaUrl} 
          alt="Strength Class" 
          className="hero-bg w-full h-full object-cover opacity-40 grayscale"
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
      </div>

      <div className="z-10 text-center space-y-6 px-4 mt-20">
        <div className="hero-tag inline-flex items-center gap-2 px-3 py-1 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Flame className="w-3 h-3" /> Group Training
        </div>
        
        <h1 className="hero-title uppercase font-black text-6xl md:text-8xl lg:text-[10rem] tracking-tighter leading-none whitespace-pre-wrap">
          {content.title}
        </h1>
        
        <p className="hero-sub text-sm md:text-lg tracking-[0.3em] md:tracking-[0.5em] text-neutral-300 uppercase max-w-2xl mx-auto whitespace-pre-wrap">
          {content.description}
        </p>
      </div>

      <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 pointer-events-none z-10">
        <span className="text-[9px] tracking-widest uppercase">Khám Phá Sức Mạnh</span>
        <div className="scroll-line w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>
  );
}

function ClassOverview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState({
    benefits: {
      title: "Đốt Mỡ & Săn Chắc",
      description: "Tăng cơ bắp toàn thân, đốt mỡ hiệu quả, giúp cơ thể thon gọn và săn chắc một cách bền vững.",
      subtitle: "Động Lực Cộng Đồng",
      content: "Tạo động lực tập luyện nhờ không khí sôi động, nhịp độ cao và sự kết nối mạnh mẽ giữa các thành viên."
    }
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docSnap = await getDoc(doc(db, "pages", "fox_strength", "blocks", "benefits"));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setContent({
            benefits: {
              title: data.title || content.benefits.title,
              description: data.description || content.benefits.description,
              subtitle: data.subtitle || content.benefits.subtitle,
              content: data.content || content.benefits.content
            }
          });
        }
      } catch (err) {
        console.error("Failed to load class overview content:", err);
      }
    };
    fetchContent();
  }, []);

  useGSAP(() => {
    let mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      gsap.fromTo(".overview-item",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.7,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto z-10 relative bg-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Hình thức */}
        <div className="space-y-12">
          <div className="overview-item space-y-4">
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-3">
              <Users className="w-6 h-6" /> Hình Thức
            </h2>
            <div className="h-px bg-white/20 w-1/3"></div>
          </div>
          
          <div className="space-y-8">
            <div className="overview-item group">
              <div className="flex items-baseline gap-4">
                <span className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600 transition-colors duration-500 group-hover:to-white">
                  10-15
                </span>
                <span className="text-lg md:text-xl font-bold uppercase tracking-widest text-neutral-400">Người / Lớp</span>
              </div>
            </div>
            <div className="overview-item group">
              <div className="flex items-baseline gap-4">
                <span className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600 transition-colors duration-500 group-hover:to-white">
                  1-2
                </span>
                <span className="text-lg md:text-xl font-bold uppercase tracking-widest text-neutral-400">Huấn Luyện Viên</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lợi ích */}
        <div className="space-y-12">
          <div className="overview-item space-y-4">
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-3">
              <Activity className="w-6 h-6" /> Lợi Ích
            </h2>
            <div className="h-px bg-white/20 w-1/3"></div>
          </div>
          
          <ul className="space-y-8">
            <li className="overview-item flex gap-6 items-start">
              <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-white shrink-0 -mt-1" />
              <div>
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-2 whitespace-pre-wrap">{content.benefits.title}</h3>
                <p className="text-neutral-400 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                  {content.benefits.description}
                </p>
              </div>
            </li>
            <li className="overview-item flex gap-6 items-start">
              <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-white shrink-0 -mt-1" />
              <div>
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-2 whitespace-pre-wrap">{content.benefits.subtitle}</h3>
                <p className="text-neutral-400 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                  {content.benefits.content}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function TrainingProgram() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const [programs, setPrograms] = useState([
    {
      id: "01",
      title: "Full-Body Strength",
      desc: "Các bài tập sức mạnh toàn thân sử dụng tạ tự do, dây kháng lực và trọng lượng cơ thể.",
      img: "https://i.postimg.cc/02svP9gQ/DSC02364.jpg"
    },
    {
      id: "02",
      title: "Circuit / Interval",
      desc: "Bài tập theo trạm hoặc theo hiệp, giúp vừa tăng sức mạnh vừa cải thiện thể lực toàn diện.",
      img: "https://i.postimg.cc/3Rfh3GTR/DSC00393.jpg"
    },
    {
      id: "03",
      title: "Athletic Conditioning",
      desc: "Các bài tập mô phỏng chuyển động thể thao, giúp cơ thể khỏe – nhanh – bền hơn trong sinh hoạt và tập luyện.",
      img: "https://i.postimg.cc/jSYbqKGP/DSC08575.jpg"
    }
  ]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const p1Snap = await getDoc(doc(db, "pages", "fox_strength", "blocks", "program_1"));
        const p2Snap = await getDoc(doc(db, "pages", "fox_strength", "blocks", "program_2"));
        const p3Snap = await getDoc(doc(db, "pages", "fox_strength", "blocks", "program_3"));
        
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
        console.error("Failed to load training programs:", err);
      }
    };
    fetchContent();
  }, []);

  useGSAP(() => {
    let mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const cards = gsap.utils.toArray('.program-card');
      
      cards.forEach((card: any) => {
        gsap.fromTo(card,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            }
          }
        );
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 bg-neutral-950 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-16">
        <h2 className="text-sm md:text-lg font-bold uppercase tracking-[0.3em] text-white/50 mb-2"> Giáo Án Tập Luyện</h2>
        <div className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Chuẩn Khoa Học</div>
      </div>

      {/* Thay đổi cuộn ngang bằng bố cục xếp dọc Native scroll tuyệt đẹp */}
      <div className="flex flex-col gap-12 md:gap-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        {programs.map((prog, index) => (
          <div key={prog.id} className="program-card flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            
            {/* Nội dung luân phiên */}
            <div className={`order-2 flex flex-col justify-center space-y-4 md:space-y-6 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'} w-full lg:w-1/2`}>
              <div className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent select-none leading-none">
                {prog.id}
              </div>
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[1.1]">
                {prog.title}
              </h3>
              <p className="text-base md:text-lg text-neutral-400 font-medium leading-relaxed">
                {prog.desc}
              </p>
            </div>

            {/* Hình ảnh */}
            <div className={`order-1 w-full lg:w-1/2 h-[40vh] md:h-[60vh] relative overflow-hidden group border border-white/10 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
              <div className="absolute inset-0 w-full h-full transform scale-110">
                <img 
                  src={prog.img} 
                  alt={prog.title} 
                  className="program-img w-full h-full object-cover grayscale-[80%] contrast-125 transition-all duration-700 group-hover:grayscale-0"
                  crossOrigin="anonymous" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Trang trí góc */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/50"></div>
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/50"></div>
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/50"></div>
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/50"></div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}

/* ==============================================================
   RUNNING CLASS SECTION
   ============================================================== */
