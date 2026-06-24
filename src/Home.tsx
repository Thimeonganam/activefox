import { useRef, useEffect, useState } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { MoveRight, Play, Loader2, CheckCircle2, AlertCircle, Calendar, User, Clock, ArrowRight, ArrowUpRight, MapPin, Navigation, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SEO } from "./components/SEO";
import { mockPosts } from "./Blog";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  return (
    <main className="w-full bg-black text-white">
      <SEO 
        title="Trang Chủ | Active Fox"
        description="Khám phá Active Fox - Nền tảng huấn luyện thể chất bài bản: Fox Strength, Fox Run, Fox Hybrid, Trị Liệu."
        path="/"
      />
      <HomeHero />
      <HomeMarquee />
      <HomeStats />
      <HomeServices />
      <HomeInlineRegistration />
      <HomeLocations />
      <HomeRecentBlog />
    </main>
  );
}

// 1. HomeHero (Minimal high-contrast layout, clean entrance)
function HomeHero() {
  const ref = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState({
    title: "ACTIVE FOX",
    subtitle: "In Motion",
    description: "Đón đầu xu hướng vận động hiện đại Hybrid Training kết hợp cùng các giải pháp công nghệ biểu tượng.",
    mediaUrl: "https://i.postimg.cc/WbCfBDg0/DSC05971.jpg"
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docSnap = await getDoc(doc(db, "pages", "home", "blocks", "hero"));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setContent({
            title: data.title || "ACTIVE FOX",
            subtitle: data.subtitle || "In Motion",
            description: data.description || "Đón đầu xu hướng vận động hiện đại Hybrid Training kết hợp cùng các giải pháp công nghệ biểu tượng.",
            mediaUrl: data.mediaUrl || "https://i.postimg.cc/WbCfBDg0/DSC05971.jpg"
          });
        }
      } catch (err) {
        console.error("Failed to load hero content:", err);
      }
    };
    fetchContent();
  }, []);
  
  useGSAP(() => {
    // Gentle in-place fade animations
    const tl = gsap.timeline();
    tl.fromTo(".hero-bg", 
      { scale: 1.05 }, 
      { scale: 1, duration: 2, ease: "power2.out" }
    );
    tl.fromTo(".hero-fade",
      { opacity: 0 },
      { opacity: 1, duration: 1.2, stagger: 0.15, ease: "power2.out" },
      "-=1.5"
    );
  }, { scope: ref, dependencies: [content] });

  return (
    <section ref={ref} className="relative min-h-[100dvh] w-full flex flex-col justify-end pb-24 overflow-hidden bg-black">
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
         {content.mediaUrl.endsWith('.mp4') || content.mediaUrl.includes('youtube') || content.mediaUrl.includes('vimeo') ? (
           <video 
             src={content.mediaUrl}
             autoPlay 
             muted 
             loop 
             playsInline
             className="hero-bg w-full h-full object-cover grayscale-[20%] contrast-125 origin-center"
           />
         ) : (
           <img 
             src={content.mediaUrl} 
             alt="Active Fox Hero" 
             loading="eager"
             fetchPriority="high"
             className="hero-bg w-full h-full object-cover grayscale-[20%] contrast-125 origin-center"
           />
         )}
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
         <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 w-full">
         <div className="flex flex-col max-w-4xl">
            <span className="hero-fade flex items-center gap-3 text-brand-orange font-bold uppercase tracking-[0.3em] text-sm md:text-base mb-3">
              <span className="h-px w-10 bg-brand-orange/70" />
              {content.title}
            </span>

            <h1 className="hero-fade block text-[15vw] md:text-[9vw] font-monument uppercase text-white leading-[0.82] tracking-tighter mb-8">
              {content.subtitle}
            </h1>

            <p className="hero-fade max-w-lg text-base md:text-lg text-neutral-300 font-medium leading-relaxed mb-10 font-sans font-light">
              {content.description}
            </p>

            <div className="hero-fade flex flex-wrap gap-4 items-center">
               <Link to="/bo-mon/hybrid-training" className="group inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 uppercase font-monument tracking-wider hover:bg-brand-orange hover:text-white transition-colors text-xs">
                 Bắt nhịp thế giới <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </Link>
               <Link to="/lich-tap" className="inline-flex items-center justify-center gap-2 px-7 py-4 uppercase font-monument tracking-wider text-xs text-white border border-white/25 hover:border-white hover:bg-white/5 transition-colors">
                 Xem lịch tập
               </Link>
            </div>
         </div>
      </div>
    </section>
  );
}

// 1b. HomeMarquee (Kinetic discipline strip directly under hero)
function HomeMarquee() {
  const items = ["Fox Strength", "Fox Run", "Độ Khớp", "Hybrid Training", "HYROX", "Sports Massage", "Ice Bath"];
  const loop = [...items, ...items];
  return (
    <section className="relative bg-black border-y border-white/10 py-6 md:py-8 overflow-hidden" aria-label="Bộ môn tại Active Fox">
      <div className="marquee-track flex w-max items-center gap-10 md:gap-16 whitespace-nowrap will-change-transform">
        {loop.map((it, i) => (
          <span key={i} className="flex items-center gap-10 md:gap-16">
            <span className="font-monument uppercase tracking-tight text-3xl md:text-5xl text-neutral-700 hover:text-white transition-colors">{it}</span>
            <span className="w-2 h-2 rotate-45 bg-brand-orange shrink-0" />
          </span>
        ))}
      </div>
    </section>
  );
}

// 1c. HomeStats (Credibility band)
function HomeStats() {
  const ref = useRef<HTMLDivElement>(null);
  const stats = [
    { value: "2", label: "Cơ sở tại TP.HCM" },
    { value: "5", label: "Bộ môn huấn luyện" },
    { value: "1:1", label: "Coaching cá nhân hóa" },
    { value: "HYROX", label: "Giáo án chuẩn quốc tế" },
  ];

  useGSAP(() => {
    gsap.fromTo(".stat-item",
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: ref.current, start: "top 85%" } }
    );
  }, { scope: ref });

  return (
    <section ref={ref} className="bg-black py-20 md:py-28 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6">
        {stats.map((s, i) => (
          <div key={i} className="stat-item flex flex-col items-start border-l border-white/10 pl-6">
            <span className="font-monument text-5xl md:text-7xl text-white leading-none tracking-tight">{s.value}</span>
            <span className="mt-3 text-xs md:text-sm uppercase tracking-widest text-neutral-400 font-sans">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// 2. HomeServices (Asymmetric bento grid)
function HomeServices() {
  const ref = useRef<HTMLDivElement>(null);
  
  const services = [
    {
      title: "Hybrid",
      highlight: "TRAINING",
      tagline: "Sức mạnh, sức bền và nhịp tim hợp nhất trong một buổi tập.",
      features: ["Xu hướng tập luyện thế giới", "Kích hoạt tối đa cơ bắp & tim mạch", "Kết nối cộng đồng"],
      img: "https://i.postimg.cc/kGnv3CX8/DSC05053.jpg",
      link: "/bo-mon/hybrid-training",
      span: "md:col-span-2 md:row-span-2 min-h-[440px] md:min-h-0",
      featured: true
    },
    {
      title: "Personal",
      highlight: "COACHING",
      tagline: "Lộ trình 1:1 cùng chuyên gia, đo lường tiến bộ mỗi tuần.",
      features: ["Giới tinh hoa của Hybrid Training", "Tập luyện & Dinh dưỡng", "Truyền năng lượng"],
      img: "https://i.postimg.cc/wvS3Lcn4/DSC09368.jpg",
      link: "/bo-mon/fox-strength",
      span: "min-h-[300px] md:min-h-0"
    },
    {
      title: "Well-being",
      highlight: "SERVICES",
      tagline: "Phục hồi y khoa và tái tạo thể chất chuyên sâu.",
      features: ["Phục hồi thể chất y khoa", "Tái tạo sâu toàn diện", "Kết hợp công nghệ cao"],
      img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      link: "/tri-lieu",
      span: "min-h-[300px] md:min-h-0"
    },
    {
      title: "High-tech",
      highlight: "SOLUTIONS",
      tagline: "Công nghệ thể thao chuẩn quốc tế hỗ trợ từng buổi tập.",
      features: ["Giải pháp thể thao quốc tế", "Công nghệ biểu tượng", "Hỗ trợ không giới hạn"],
      img: "https://i.postimg.cc/nrJpnd6B/DSC00188.jpg",
      link: "/tri-lieu",
      span: "md:col-span-3 min-h-[300px] md:min-h-[280px]"
    }
  ];

  useGSAP(() => {
    // Gentle fades only
    gsap.utils.toArray('.srv-card').forEach((card: any) => {
       gsap.fromTo(card, 
         { opacity: 0 },
         { opacity: 1, duration: 1, ease: "power2.out", scrollTrigger: { trigger: card, start: "top 85%" } }
       );
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="py-24 bg-black border-t border-white/5">
       <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-white/10 pb-8">
             <div>
               <span className="text-brand-orange font-bold uppercase tracking-[0.2em] text-sm mb-4 block">Dịch Vụ Cốt Lõi</span>
               <h2 className="text-4xl md:text-5xl font-monument uppercase tracking-widest text-white leading-none">
                 THE <span className="text-neutral-500">SERVICES</span>
               </h2>
             </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[230px] gap-3">
             {services.map((s, i) => (
                <Link to={s.link} key={i} className={`srv-card bg-black group relative overflow-hidden block rounded-2xl border border-white/10 hover:border-brand-orange/40 transition-colors ${s.span}`}>
                  <div className="absolute inset-0 w-full h-full z-0">
                    <img src={s.img} alt={`Dịch vụ ${s.title} ${s.highlight} tại Active Fox`} loading="lazy" className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[1200ms] origin-center grayscale-[30%] contrast-125" />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent z-10"></div>
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10"></div>

                  <div className="absolute inset-0 p-7 md:p-9 flex flex-col justify-between z-20">
                     <div className="self-end">
                        <ArrowUpRight className="w-6 h-6 text-white/70 group-hover:text-brand-orange group-hover:rotate-45 transition-all duration-500" />
                     </div>

                     <div>
                        <h3 className={`font-seasons italic text-white mb-1 ${s.featured ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"}`}>{s.title}</h3>
                        <h4 className={`font-monument uppercase text-white group-hover:text-brand-orange transition-colors duration-300 tracking-widest leading-none ${s.featured ? "text-5xl md:text-6xl" : "text-3xl md:text-4xl"}`}>{s.highlight}</h4>

                        <p className="mt-4 max-w-sm text-sm text-neutral-300 font-sans font-light leading-relaxed">{s.tagline}</p>

                        {/* Featured card shows benefits always; others reveal on hover (pointer devices) */}
                        <div className={s.featured
                          ? "grid grid-rows-[1fr] mt-5"
                          : "hidden lg:grid grid-rows-[0fr] group-hover:grid-rows-[1fr] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out overflow-hidden"}>
                           <ul className="min-h-0 space-y-3 pt-5 border-t border-white/15">
                             {s.features.map((f, j) => (
                                <li key={j} className="flex items-center gap-3 text-xs tracking-wide text-neutral-300 uppercase font-sans font-light">
                                   <div className="w-1 h-1 bg-brand-orange shrink-0"></div>
                                   {f}
                                </li>
                             ))}
                           </ul>
                        </div>
                     </div>
                  </div>
                </Link>
             ))}
          </div>
       </div>
    </section>
  );
}

// 3. HomeInlineRegistration (Sleek embedded register form)
function HomeInlineRegistration() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(ref.current, 
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power2.out", scrollTrigger: { trigger: ref.current, start: "top 80%" } }
    );
  }, { scope: ref });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      course: "Trang Chủ - Inline Form",
      timestamp: new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })
    };

    const webhookUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK;

    if (!webhookUrl) {
      console.warn("Webhook URL missing, simulating success.");
      setTimeout(() => setStatus("success"), 1500);
      return;
    }

    try {
      await fetch(webhookUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(data),
        headers: { "Content-Type": "text/plain;charset=utf-8" }
      });
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const perks = [
    "Trải nghiệm không giới hạn tại 2 cơ sở",
    "Tập cùng HLV & giáo án bài bản",
    "Bao gồm khu phục hồi và trị liệu",
  ];

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-neutral-950 border-t border-white/10 overflow-hidden">
      {/* Ambient brand glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-orange/10 blur-[120px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column: Pitch */}
          <div>
            <span className="flex items-center gap-3 text-brand-orange text-xs font-monument tracking-[0.3em] uppercase mb-5">
              <span className="h-px w-10 bg-brand-orange/70" /> Gia Nhập Ngay
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-monument uppercase tracking-tight text-white mb-6 leading-[0.95]">
              ĐĂNG KÝ <br/>TẬP THỬ
            </h2>
            <p className="text-neutral-400 font-sans font-light text-base md:text-lg leading-relaxed max-w-md mb-8">
              Trải nghiệm tập luyện và phục hồi tại hệ thống Active Fox chỉ với <span className="text-white font-semibold">200k / tuần</span>. Điền thông tin để được kích hoạt.
            </p>
            <ul className="space-y-4">
              {perks.map((p, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-neutral-300 font-sans">
                  <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" /> {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Glass form */}
          <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
            {status === "success" ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-brand-orange/15 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-brand-orange" />
                </div>
                <h3 className="text-2xl font-seasons italic text-white mb-3">Đăng ký thành công</h3>
                <p className="text-neutral-400 font-sans font-light text-sm max-w-sm mx-auto leading-relaxed">
                  Cảm ơn bạn đã lựa chọn Active Fox. Đội ngũ chuyên gia sẽ liên hệ xác nhận lịch hẹn của bạn trong thời gian sớm nhất!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] text-neutral-400 uppercase tracking-widest block font-bold mb-2 pl-1">Họ và tên</label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Nhập họ tên của bạn..."
                      className="w-full bg-white/5 border border-white/15 px-5 py-4 text-white placeholder:text-neutral-500 focus:outline-none focus:border-brand-orange text-sm transition-colors rounded-xl font-sans"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 uppercase tracking-widest block font-bold mb-2 pl-1">Số điện thoại</label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      placeholder="Nhập số điện thoại..."
                      className="w-full bg-white/5 border border-white/15 px-5 py-4 text-white placeholder:text-neutral-500 focus:outline-none focus:border-brand-orange text-sm transition-colors rounded-xl font-sans"
                    />
                  </div>
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-400 text-xs font-sans">
                    <AlertCircle size={14} /> Có lỗi xảy ra, vui lòng thử lại sau.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-5 bg-brand-orange text-white hover:bg-brand-red transition-colors rounded-xl text-xs font-monument uppercase tracking-widest flex items-center justify-center min-h-[55px] disabled:opacity-50 active:scale-[0.99]"
                >
                  {status === "submitting" ? <Loader2 className="w-5 h-5 animate-spin" /> : "Gửi thông tin đăng ký"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// 4. HomeLocations (Sleek side-by-side facility cards)
function HomeLocations() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(ref.current, 
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power2.out", scrollTrigger: { trigger: ref.current, start: "top 80%" } }
    );
  }, { scope: ref });

  const locations = [
    {
      title: "ACTIVE FOX SALA",
      address: "62 Hoàng Thế Thiện, Phường An Khánh, TP. HCM",
      img: "https://i.postimg.cc/y8ht0130/DSC00783-(1).jpg",
      services: [
        "Lớp tập cùng HLV theo nhóm (Độ khớp, Fox...)",
        "Dịch vụ công nghệ cao",
        "coaching 1:1",
        "Sports Massage"
      ]
    },
    {
      title: "ACTIVE FOX CAO THẮNG",
      address: "175B Cao Thắng, Phường Hòa Hưng, TP. HCM",
      img: "https://i.postimg.cc/0yHmWmwT/DSC06367.jpg",
      services: [
        "Lớp tập cùng HLV theo nhóm (Độ khớp, Fox...)",
        "Dịch vụ công nghệ cao",
        "coaching 1:1",
        "Sports Massage"
      ]
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="text-brand-orange font-bold uppercase tracking-[0.2em] text-sm mb-4 block">Hệ Thống Cơ Sở</span>
            <h2 className="text-4xl md:text-5xl font-monument uppercase tracking-widest text-white leading-none">
              FACILITY <span className="text-neutral-500">LOCATIONS</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {locations.map((loc, idx) => (
            <div key={idx} className="bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden hover:border-brand-orange/40 transition-colors flex flex-col h-full group">
              <div className="p-8 md:p-12 flex flex-col flex-grow">
                <h3 className="text-2xl md:text-3xl font-monument uppercase text-white mb-4 leading-none tracking-tight">{loc.title}</h3>
                <p className="flex items-start gap-2 text-neutral-300 text-sm font-sans leading-relaxed mb-8">
                  <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  {loc.address}
                </p>

                <div className="h-px bg-white/10 mb-8" />

                <h4 className="text-[10px] text-neutral-400 font-monument uppercase tracking-widest mb-4">Dịch vụ tại cơ sở:</h4>
                <ul className="space-y-3 mb-10">
                  {loc.services.map((srv, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-3 text-xs uppercase tracking-wider text-neutral-300 font-sans font-light">
                      <div className="w-1.5 h-1.5 bg-brand-orange shrink-0" />
                      {srv}
                    </li>
                  ))}
                </ul>

                {/* Conversion actions: directions + call */}
                <div className="mt-auto grid grid-cols-2 gap-3">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Active Fox " + loc.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3.5 rounded-full bg-white text-black text-[11px] font-monument uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-colors active:scale-[0.98]"
                  >
                    <Navigation className="w-3.5 h-3.5" /> Chỉ đường
                  </a>
                  <a
                    href="tel:0377823856"
                    className="flex items-center justify-center gap-2 py-3.5 rounded-full border border-white/20 text-white text-[11px] font-monument uppercase tracking-widest hover:border-brand-orange hover:text-brand-orange transition-colors active:scale-[0.98]"
                  >
                    <Phone className="w-3.5 h-3.5" /> Gọi đặt lịch
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 5. HomeRecentBlog (Structured minimalist recent posts list)
function HomeRecentBlog() {
  const ref = useRef<HTMLDivElement>(null);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'pages', 'blog', 'blocks'));
        const fetched: any[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          let date = new Date().toLocaleDateString('vi-VN');
          let readTime = '5 phút đọc';

          try {
            if (data.mediaUrl2) {
              const timeline = JSON.parse(data.mediaUrl2);
              if (timeline.date) date = timeline.date;
              if (timeline.readTime) readTime = timeline.readTime;
            }
          } catch (e) {}

          fetched.push({
            slug: doc.id,
            title: data.title || '',
            excerpt: data.description || '',
            coverImg: data.mediaUrl || '',
            date,
            readTime
          });
        });
        
        // Show up to 3 posts, no fallback to mockPosts if Firestore is empty
        if (fetched.length > 0) {
          setRecentPosts(fetched.slice(0, 3));
        } else {
          setRecentPosts([]);
        }
      } catch (err) {
        console.error("Failed to load recent posts:", err);
        setRecentPosts([]);
      }
    };
    fetchRecent();
  }, []);

  if (recentPosts.length === 0) return null;

  useGSAP(() => {
    gsap.fromTo(ref.current, 
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power2.out", scrollTrigger: { trigger: ref.current, start: "top 80%" } }
    );
  }, { scope: ref, dependencies: [recentPosts] });

  return (
    <section ref={ref} className="py-24 bg-[#fdfbf9] text-[#1a100c] border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-neutral-200 pb-8">
          <div>
            <span className="text-[#bd7a58] text-xs font-monument tracking-[0.3em] uppercase mb-4 block">Kiến Thức & Chia Sẻ</span>
            <h2 className="text-4xl md:text-5xl font-monument uppercase tracking-tight text-[#2c1d11] leading-none">
              ACTIVE FOX <span className="text-neutral-400 font-seasons italic lowercase font-normal">journal</span>
            </h2>
          </div>
          <Link to="/blog" className="text-xs font-monument uppercase tracking-widest text-[#bd7a58] hover:text-[#1a100c] flex items-center gap-2 transition-colors">
            Xem Tất Cả Bài Viết <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <Link 
              to={`/blog/${post.slug}`} 
              key={post.slug} 
              className="bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full group"
            >
              <div className="aspect-[16/10] overflow-hidden bg-neutral-100 relative">
                <img src={post.coverImg} alt={post.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-[10px] text-neutral-400 font-sans mb-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                </div>
                <h3 className="font-monument text-lg text-[#2c1d11] uppercase tracking-tight line-clamp-2 leading-tight mb-4 group-hover:text-[#bd7a58] transition-colors">
                  {post.title}
                </h3>
                <p className="text-neutral-500 text-sm font-sans font-light line-clamp-3 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <span className="mt-auto text-[10px] font-monument uppercase tracking-widest text-[#bd7a58] group-hover:text-[#1a100c] flex items-center gap-1.5 transition-colors">
                  Đọc Bài Viết <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
