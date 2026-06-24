import { useRef, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { CheckCircle2, Users, Flame, Activity, Footprints, Wind, Heart, Zap, Shield, Target, HeartPulse, Dumbbell, Timer, Infinity as InfinityIcon, Medal, MoveRight, ArrowRight, Gauge, Anchor, ChevronRight, Play } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SEO } from "./components/SEO";

export default function HybridTraining() {
  return (
    <main className="pt-20">
      <SEO 
        title="Hybrid Training | Active Fox"
        description="Đón đầu xu hướng tập luyện hiện đại. Phối hợp giữa rèn luyện sức mạnh và phát triển hệ tim mạch một cách toàn diện."
        path="/bo-mon/hybrid-training"
      />
      <HybridHero />
      <HybridOverview />
      <HybridProgram />
    </main>
  );
}

function HybridHero() {
  const ref = useRef<HTMLDivElement>(null);
  
  const [content, setContent] = useState({
    title: "LỚP HYBRID",
    description: "Sức mạnh. Thể lực. Linh hoạt. Tất cả trong một."
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docSnap = await getDoc(doc(db, "pages", "hybrid_training", "blocks", "hero"));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setContent({
            title: data.title || "LỚP HYBRID",
            description: data.description || "Sức mạnh. Thể lực. Linh hoạt. Tất cả trong một."
          });
        }
      } catch (err) {
        console.error("Failed to load hybrid hero content:", err);
      }
    };
    fetchContent();
  }, []);

  useGSAP(() => {
    gsap.fromTo(".hyb-hero-elem", 
      { opacity: 0 },
      { opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: ref.current, start: "top 85%" } }
    );
  }, { scope: ref });

  return (
    <section ref={ref} className="relative bg-neutral-950 border-t border-white/10 py-32 md:py-48 min-h-[60vh] flex items-center justify-center">
      
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF6129]/5 blur-[150px] rounded-full pointer-events-none z-0"></div>
      
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <div className="hyb-hero-elem inline-flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[#FF6129] font-bold uppercase tracking-widest text-xs mb-8">
          <InfinityIcon className="w-4 h-4" /> Đột phá đa nền tảng
        </div>
        
        <h2 className="hyb-hero-elem text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase mb-6">
          <span className="text-white">{content.title}</span>
        </h2>
        
        <p className="hyb-hero-elem text-neutral-400 max-w-lg font-medium text-lg md:text-xl whitespace-pre-wrap">
          {content.description}
        </p>
      </div>
    </section>
  );
}

function HybridOverview() {
  const ref = useRef<HTMLDivElement>(null);
  
  const [content, setContent] = useState({
    benefits: {
      title: "Đốt Mỡ & Siết Cơ",
      description: "Tăng cơ bắp toàn thân, đốt mỡ cực kì hiệu quả, giúp cơ thể thon gọn và săn chắc toàn diện.",
      subtitle: "Không Khí Bùng Nổ",
      content: "Tạo động lực mạnh mẽ nhờ không khí sôi động, nhịp độ cực cao và tính cộng đồng vững kết.",
      mediaUrl: "Sức Mạnh Khai Phóng",
      mediaUrl2: "Giúp cải thiện và phát triển sức mạnh bộc phát cùng sức bền cốt lõi vươn tầm giới hạn."
    }
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docSnap = await getDoc(doc(db, "pages", "hybrid_training", "blocks", "overview"));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setContent({
            benefits: {
              title: data.title || content.benefits.title,
              description: data.description || content.benefits.description,
              subtitle: data.subtitle || content.benefits.subtitle,
              content: data.content || content.benefits.content,
              mediaUrl: data.mediaUrl || content.benefits.mediaUrl,
              mediaUrl2: data.mediaUrl2 || content.benefits.mediaUrl2
            }
          });
        }
      } catch (err) {
        console.error("Failed to load hybrid overview content:", err);
      }
    };
    fetchContent();
  }, []);

  useGSAP(() => {
    gsap.fromTo(".hyb-card", 
      { opacity: 0 },
      { opacity: 1, duration: 0.7, stagger: 0.12, ease: "power2.out", scrollTrigger: { trigger: ref.current, start: "top 85%" } }
    );
  }, { scope: ref });

  return (
    <section ref={ref} className="py-24 bg-black px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Left Format panel */}
        <div className="hyb-card lg:w-1/3 bg-neutral-950 border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <h3 className="text-[#FF6129] uppercase tracking-widest font-bold text-sm mb-12 flex items-center gap-3">
             <Users className="w-5 h-5"/> Hình thức tập luyện
          </h3>
          
          <div className="space-y-8">
            <div>
              <div className="text-6xl font-black text-white mb-2">10-15</div>
              <div className="text-neutral-400 font-medium">Người/Lớp</div>
            </div>
            <div className="h-px w-full bg-white/10"></div>
            <div>
              <div className="text-6xl font-black text-white mb-2">1-2</div>
              <div className="text-neutral-400 font-medium">Huấn luyện viên tạo động lực theo sát hướng dẫn</div>
            </div>
          </div>
        </div>

        {/* Right Benefits Grid */}
        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
           <div className="hyb-card bg-neutral-950 border border-white/10 rounded-2xl p-8 hover:border-[#FF6129]/30 transition-colors duration-300">
             <Flame className="w-10 h-10 text-[#FF6129] mb-6" />
             <h4 className="text-xl font-bold uppercase text-white mb-4 whitespace-pre-wrap">{content.benefits.title}</h4>
             <p className="text-neutral-400 whitespace-pre-wrap">{content.benefits.description}</p>
           </div>
           
           <div className="hyb-card bg-neutral-950 border border-white/10 rounded-2xl p-8 hover:border-[#FF6129]/30 transition-colors duration-300">
             <Zap className="w-10 h-10 text-[#FF6129] mb-6" />
             <h4 className="text-xl font-bold uppercase text-white mb-4 whitespace-pre-wrap">{content.benefits.subtitle}</h4>
             <p className="text-neutral-400 whitespace-pre-wrap">{content.benefits.content}</p>
           </div>
           
           <div className="hyb-card md:col-span-2 bg-neutral-950 border border-white/10 rounded-2xl p-8 hover:border-[#FF6129]/30 transition-colors duration-300 flex flex-col md:flex-row items-start md:items-center gap-6">
             <HeartPulse className="w-12 h-12 text-[#FF6129] flex-shrink-0" />
             <div>
               <h4 className="text-xl font-bold uppercase text-white mb-2 whitespace-pre-wrap">{content.benefits.mediaUrl}</h4>
               <p className="text-neutral-400 whitespace-pre-wrap">{content.benefits.mediaUrl2}</p>
             </div>
           </div>
        </div>

      </div>
    </section>
  );
}

function HybridProgram() {
  const ref = useRef<HTMLDivElement>(null);

  const [programs, setPrograms] = useState([
    { title: "Cardio", icon: HeartPulse as any, desc: "Giúp cải thiện sức khỏe tim mạch, nâng cao sức bền cực hạn.", img: "https://i.postimg.cc/gkPttKQy/DSC06944.jpg", color: "from-[#FC3B00]/80" },
    { title: "Functional Strength", icon: Dumbbell as any, desc: "Các bài tập dùng chuyển động như đẩy, kéo... giúp tăng cường sức mạnh, cải thiện đỉnh cao thăng bằng.", img: "https://i.postimg.cc/t46TRp2C/DSC05022.jpg", color: "from-[#FF6129]/80" },
    { title: "HIIT", icon: Timer as any, desc: "Các bài tập cường độ cao ngắt quãng giúp ép nhịp tim, đốt cháy mỡ thừa cực nhanh.", img: "https://i.postimg.cc/Cx9qJc6f/DSC05056.jpg", color: "from-[#FF7145]/80" },
  ]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const p1Snap = await getDoc(doc(db, "pages", "hybrid_training", "blocks", "component_1"));
        const p2Snap = await getDoc(doc(db, "pages", "hybrid_training", "blocks", "component_2"));
        const p3Snap = await getDoc(doc(db, "pages", "hybrid_training", "blocks", "component_3"));
        
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
        console.error("Failed to load hybrid programs:", err);
      }
    };
    fetchContent();
  }, []);

  useGSAP(() => {
    gsap.fromTo(".hyb-acc-item", 
      { opacity: 0 },
      { opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 85%" } }
    );
  }, { scope: ref });

  return (
    <section ref={ref} className="py-24 bg-black border-b border-white/10">
      <div className="text-center mb-16 px-6">
        <div className="text-[#FF6129] font-bold uppercase tracking-[0.3em] mb-4">Lộ trình rèn luyện</div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white">Chương Trình Huấn Luyện</h2>
      </div>
      
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-[75vh] flex flex-col lg:flex-row gap-4 mb-10">
        {programs.map((p, i) => {
          const Icon = p.icon;
          return (
            <div key={i} className="hyb-acc-item group relative flex-1 lg:hover:flex-[2.5] transition-all duration-700 ease-in-out cursor-pointer overflow-hidden rounded-2xl border border-white/10 hover:border-[#FF6129]/40">
               {/* Background Image */}
               <img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 lg:group-hover:scale-105" crossOrigin="anonymous" referrerPolicy="no-referrer" />
               
               {/* Gradient Overlay */}
               <div className={`absolute inset-0 bg-gradient-to-t ${p.color} to-black/80 lg:to-transparent opacity-90 lg:opacity-80 lg:group-hover:opacity-90 transition-opacity`}></div>
               <div className="absolute inset-0 bg-black/40 lg:group-hover:bg-black/10 transition-colors duration-700"></div>

               {/* Content */}
               <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                 <div className="flex items-center gap-4 mb-4 lg:opacity-70 lg:group-hover:opacity-100 transition-opacity duration-500">
                   <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0">
                     <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                   </div>
                   <h3 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase text-white whitespace-nowrap">{p.title}</h3>
                 </div>
                 
                 {/* This wrapper ensures it's always open on mobile but collapses on desktop */}
                 <div className="overflow-hidden lg:max-h-0 lg:opacity-0 lg:group-hover:max-h-40 lg:group-hover:opacity-100 transition-all duration-700 ease-in-out">
                   <p className="text-white/90 text-sm md:text-base lg:text-lg max-w-xl font-medium leading-relaxed pb-2 border-l-2 border-white/30 pl-4 ml-5 lg:ml-6">
                     {p.desc}
                   </p>
                 </div>
               </div>
            </div>
          )
        })}
      </div>
    </section>
  );
}

/* ==============================================================
   HYROX SECTION - INDUSTRIAL / COMPETITION STYLE
   ============================================================== */
