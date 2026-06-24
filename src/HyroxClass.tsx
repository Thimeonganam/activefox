import { useRef, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { CheckCircle2, Users, Flame, Activity, Footprints, Wind, Heart, Zap, Shield, Target, HeartPulse, Dumbbell, Timer, Infinity as InfinityIcon, Medal, MoveRight, ArrowRight, Gauge, Anchor, ChevronRight, Play } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SEO } from "./components/SEO";

export default function HyroxClass() {
  return (
    <main className="pt-20">
      <SEO 
        title="HYROX Training | Active Fox"
        description="Chương trình HYROX Training chuẩn quốc tế. Cải thiện 100% năng lực thể chất và tinh thần để chinh phục mọi thử thách."
        path="/bo-mon/hyrox"
      />
      <HyroxHero />
      <HyroxOverview />
      <HyroxProgram />
    </main>
  );
}

function HyroxHero() {
  const ref = useRef<HTMLDivElement>(null);
  
  const [content, setContent] = useState({
    title: "HYROX",
    description: "Chinh Phục Thử Thách.\nVượt Qua Giới Hạn Bản Thân."
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docSnap = await getDoc(doc(db, "pages", "hyrox", "blocks", "hero"));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setContent({
            title: data.title || "HYROX",
            description: data.description || "Chinh Phục Thử Thách.\nVượt Qua Giới Hạn Bản Thân."
          });
        }
      } catch (err) {
        console.error("Failed to load hyrox hero content:", err);
      }
    };
    fetchContent();
  }, []);

  useGSAP(() => {
    gsap.fromTo(".hrx-text", 
      { opacity: 0 },
      { opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 85%" } }
    );
    gsap.fromTo(".hrx-line", 
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: ref.current, start: "top 85%" } }
    );
  }, { scope: ref });

  return (
    <section ref={ref} className="relative bg-black py-32 md:py-48 overflow-hidden min-h-[70vh] flex flex-col justify-center border-t border-white/10">
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 relative z-10">
        <div className="flex flex-col gap-8 w-full">
          {/* Top Line */}
          <div className="w-full flex items-center gap-4">
             <div className="hrx-text text-yellow-500 font-bold uppercase tracking-[0.4em] text-xs md:text-sm shrink-0 flex items-center gap-2">
                <Medal className="w-4 h-4" /> Global Fitness Race
             </div>
             <div className="hrx-line h-[1px] bg-white/10 w-full rounded-r-full flex-grow"></div>
          </div>
          
          <h2 className="hrx-text text-[15vw] md:text-[12vw] font-black uppercase text-white leading-[0.8] tracking-tighter m-0">
            LỚP <span className="text-yellow-500">{content.title}</span>
          </h2>
          
          <div className="w-full flex justify-end">
             <div className="hrx-text max-w-xl text-neutral-400 text-lg md:text-2xl font-bold uppercase tracking-wide border-l-2 border-yellow-500 pl-6 whitespace-pre-wrap">
                {content.description}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HyroxOverview() {
  const ref = useRef<HTMLDivElement>(null);
  
  const [content, setContent] = useState({
    title: "Mô hình tập luyện mà toàn bộ giới Fitness quốc tế đang cực kỳ theo đuổi",
    description: "Kết hợp sức mạnh, sức bền và tốc độ, mang đến cường độ thử thách toàn diện, giúp nâng cao tối đa thể lực và độ bền cho mọi cấp độ."
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docSnap = await getDoc(doc(db, "pages", "hyrox", "blocks", "overview"));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setContent({
            title: data.title || content.title,
            description: data.description || content.description
          });
        }
      } catch (err) {
        console.error("Failed to load hyrox overview content:", err);
      }
    };
    fetchContent();
  }, []);

  useGSAP(() => {
    gsap.fromTo(".hrx-stat", 
      { opacity: 0 },
      { opacity: 1, duration: 0.7, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: ref.current, start: "top 85%" } }
    );
    gsap.fromTo(".hrx-desc", 
      { opacity: 0 },
      { opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 85%" } }
    );
  }, { scope: ref });

  return (
    <section ref={ref} className="py-24 bg-neutral-950 px-6 md:px-12 lg:px-24 relative border-t border-white/10">

       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Format (Hình thức) */}
          <div className="lg:w-1/3 flex flex-col gap-6 relative">
            <h3 className="hrx-stat text-yellow-500 font-bold uppercase tracking-widest text-sm mb-4">Hình Thức Thi Đấu</h3>
            
            <div className="hrx-stat relative p-8 bg-neutral-950 border border-white/10 rounded-lg overflow-hidden group hover:border-yellow-500/30 transition-colors">
               <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500"></div>
               <div className="text-6xl md:text-7xl font-black text-white italic tracking-tighter mb-2 group-hover:text-yellow-400 transition-colors">10<span className="text-neutral-600">-</span>15</div>
               <div className="text-neutral-400 font-bold uppercase tracking-widest text-xs">Người / Nhóm</div>
            </div>
            
            <div className="hrx-stat relative p-8 bg-neutral-950 border border-white/10 rounded-lg overflow-hidden group hover:border-yellow-500/30 transition-colors">
               <div className="absolute top-0 left-0 w-1 h-full bg-neutral-700 group-hover:bg-yellow-500 transition-colors"></div>
               <div className="text-6xl md:text-7xl font-black text-white italic tracking-tighter mb-2 group-hover:text-yellow-400 transition-colors">1<span className="text-neutral-600">-</span>2</div>
               <div className="text-neutral-400 font-bold uppercase tracking-widest text-xs">Huấn Luyện Viên</div>
            </div>
          </div>

          {/* Benefits (Lợi Ích) */}
          <div className="lg:w-2/3 flex flex-col justify-center">
             <HeartPulse className="hrx-desc w-12 h-12 text-yellow-500 mb-8" />
             <h3 className="hrx-desc text-3xl md:text-4xl lg:text-5xl font-black uppercase text-white leading-tight tracking-tight mb-8">
               Mô hình tập luyện mà toàn bộ giới Fitness quốc tế đang <span className="text-yellow-500">cực kỳ theo đuổi</span>.
             </h3>
             <p className="hrx-desc text-neutral-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl border-t border-white/10 pt-8">
               Kết hợp sức mạnh, sức bền và tốc độ, mang đến cường độ thử thách toàn diện, giúp nâng cao tối đa thể lực và độ bền cho mọi cấp độ.
             </p>
          </div>

       </div>
    </section>
  );
}

function HyroxProgram() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [programs, setPrograms] = useState([
    { title: "Sled Push & Pull", label: "Đẩy / Kéo xe trượt", icon: Gauge as any, desc: "Rèn luyện sức tải hạng nặng, kích hoạt tối đa toàn bộ chuỗi cơ bắp thân dưới và khả năng sinh lực bộc phát.", img: "https://i.postimg.cc/xTF49bdd/DSC07129.jpg" },
    { title: "Burpee Broad Jump", label: "Burpee Bật Xa", icon: ArrowRight as any, desc: "Bài test thể lực khắc nghiệt kết hợp giữa bật nhảy không gian rộng và hạ trọng tâm liên tục, kiểm tra sức bền tim mạch.", img: "https://i.postimg.cc/nc50ybd7/DSC01610.jpg" },
    { title: "Rowing", label: "Chèo thuyền máy", icon: Anchor as any, desc: "Máy chèo thuyền ép toàn thân hoạt động ở hiệu suất cao, siết chặt cơ xô, lưng và rèn luyện nhịp thở đường dài.", img: "https://i.postimg.cc/vmG9j0dk/DSC06715.jpg" },
    { title: "Weight Training", label: "Các bài tập với tạ", icon: Dumbbell as any, desc: "Wall Balls, Kettlebell Carries, vớ hệ thống các bài bổ trợ chức năng bằng tạ khối tự do làm nền tảng cốt lõi.", img: "https://i.postimg.cc/0NHYw7LD/DSC01206.jpg" }
  ]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const s1Snap = await getDoc(doc(db, "pages", "hyrox", "blocks", "station_1"));
        const s2Snap = await getDoc(doc(db, "pages", "hyrox", "blocks", "station_2"));
        const s3Snap = await getDoc(doc(db, "pages", "hyrox", "blocks", "station_3"));
        const s4Snap = await getDoc(doc(db, "pages", "hyrox", "blocks", "station_4"));
        
        let newPrograms = [...programs];
        if (s1Snap.exists()) {
          const d = s1Snap.data();
          newPrograms[0] = { ...newPrograms[0], title: d.title || newPrograms[0].title, label: d.subtitle || newPrograms[0].label, desc: d.description || newPrograms[0].desc, img: d.mediaUrl || newPrograms[0].img };
        }
        if (s2Snap.exists()) {
          const d = s2Snap.data();
          newPrograms[1] = { ...newPrograms[1], title: d.title || newPrograms[1].title, label: d.subtitle || newPrograms[1].label, desc: d.description || newPrograms[1].desc, img: d.mediaUrl || newPrograms[1].img };
        }
        if (s3Snap.exists()) {
          const d = s3Snap.data();
          newPrograms[2] = { ...newPrograms[2], title: d.title || newPrograms[2].title, label: d.subtitle || newPrograms[2].label, desc: d.description || newPrograms[2].desc, img: d.mediaUrl || newPrograms[2].img };
        }
        if (s4Snap.exists()) {
          const d = s4Snap.data();
          newPrograms[3] = { ...newPrograms[3], title: d.title || newPrograms[3].title, label: d.subtitle || newPrograms[3].label, desc: d.description || newPrograms[3].desc, img: d.mediaUrl || newPrograms[3].img };
        }
        
        setPrograms(newPrograms);
      } catch (err) {
        console.error("Failed to load hyrox programs:", err);
      }
    };
    fetchContent();
  }, []);

  useGSAP(() => {
    gsap.fromTo(".hrx-prog-title", 
      { opacity: 0 },
      { opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: containerRef.current, start: "top 85%" } }
    );
    gsap.fromTo(".hrx-prog-card", 
      { opacity: 0 },
      { opacity: 1, duration: 0.7, stagger: 0.15, ease: "power2.out", scrollTrigger: { trigger: containerRef.current, start: "top 85%" } }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 bg-black border-t border-white/10">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-16">
         <h2 className="hrx-prog-title text-yellow-500 font-bold tracking-[0.3em] uppercase mb-4 text-xs md:text-sm flex items-center gap-3">
           <Activity className="w-4 h-4" /> Các bài tập chức năng (Functional Training)
         </h2>
         <div className="hrx-prog-title text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white">
           Trạm Thử Thách
         </div>
         <p className="hrx-prog-title text-neutral-400 mt-6 max-w-xl text-sm md:text-base border-l-2 border-yellow-500 pl-4">
           Sự kết hợp hoàn hảo giữa chạy bộ và các chuỗi bài tập thể lực chức năng liên hoàn.
         </p>
      </div>

      {/* Vertical 2-column grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {programs.map((p, i) => {
          const Icon = p.icon;
          return (
             <div key={i} className="hrx-prog-card w-full h-[420px] md:h-[480px] relative flex flex-col justify-end p-8 md:p-10 group overflow-hidden border border-white/10 bg-neutral-950">
                {/* Image */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-700 z-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 opacity-50 transition-all duration-700" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                </div>
                
                {/* Content */}
                <div className="relative z-20">
                   <div className="flex items-center gap-4 mb-4">
                     <span className="text-yellow-500 font-black text-5xl">0{i+1}</span>
                     <div className="h-px bg-white/10 flex-grow"></div>
                     <Icon className="w-8 h-8 text-white opacity-50" />
                   </div>
                   <h3 className="text-3xl md:text-4xl font-black uppercase text-white mb-2">{p.title}</h3>
                   <div className="text-yellow-400 font-bold uppercase tracking-widest text-xs md:text-sm mb-4">{p.label}</div>
                   
                   <p className="text-neutral-400 leading-relaxed text-sm md:text-base h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:mt-4 transition-all duration-500 overflow-hidden">
                     {p.desc}
                   </p>
                </div>
             </div>
          )
        })}
      </div>
      
    </section>
  );
}
