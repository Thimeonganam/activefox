import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SEO } from "./components/SEO";

gsap.registerPlugin(ScrollTrigger);

export default function Coaching() {
  const containerRef = useRef<HTMLDivElement>(null);

  const coaches = [
    {
      name: "BRIAN",
      title: "Coach",
      image: "https://i.postimg.cc/wM8HRkw6/DSC06021.jpg",
      expertise: ["Chuyên gia phục hồi trị liệu", "Huấn luyện viên cá nhân", "Huấn luyện viên nhóm"],
      certificates: [],
      achievements: []
    },
    {
      name: "ROGER",
      title: "Coach",
      image: "https://i.postimg.cc/zXpZq5Ym/DSC06097.jpg",
      expertise: ["Chuyên gia phục hồi trị liệu", "Huấn luyện viên cá nhân", "Huấn luyện viên nhóm"],
      certificates: ["Cử nhân Quản lý Thể dục Thể thao", "Chứng chỉ Kỹ thuật viên xoa bóp bấm huyệt - Vật lý trị liệu"],
      achievements: []
    },
    {
      name: "MẠNH KIÊN",
      title: "Coach",
      image: "https://i.postimg.cc/2jbVqc8Q/DSC09427.jpg",
      expertise: ["Chuyên gia phục hồi trị liệu", "Huấn luyện viên cá nhân", "Huấn luyện viên nhóm"],
      certificates: [],
      achievements: ["HCV giải thể hình Muscle Contest (2019)", "2 HCB giải NPC, Muscle Contest (2024)"]
    },
    {
      name: "NÔM",
      title: "Coach",
      image: "https://i.postimg.cc/fbmwvF1n/DSC05571.jpg",
      expertise: ["Chuyên gia phục hồi trị liệu", "Huấn luyện viên cá nhân", "Huấn luyện viên nhóm"],
      certificates: [],
      achievements: ["HLV 3 Sao - Liên đoàn Cử tạ & Thể hình TP. HCM", "Bảng vàng Half Marathon VnExpress Marathon HCM Midnight 2026"]
    },
    {
      name: "DONNIE",
      title: "Coach",
      image: "https://i.postimg.cc/L56Yw2Fr/DSC05793.jpg",
      expertise: ["Huấn luyện viên cá nhân", "Huấn luyện viên nhóm", "Chuyên gia phục hồi trị liệu"],
      certificates: [],
      achievements: ["PR Half Marathon 1:36", "PR Marathon Sub 4"]
    }
  ];

  useGSAP(() => {
    // Elegant, gentle fade-in animations on scroll
    gsap.utils.toArray('.coach-card').forEach((card: any) => {
      gsap.fromTo(card,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="w-full bg-black min-h-screen text-white overflow-x-hidden pt-24 pb-32">
      <SEO 
        title="Huấn Luyện Viên | Active Fox"
        description="Đội ngũ Huấn Luyện Viên tại Active Fox. Chuyên gia đào tạo Functional Training, Hybrid Training hàng đầu hiện nay."
        path="/huan-luyen-vien"
      />
      
      {/* 1. Hero Title */}
      <section className="px-6 lg:px-12 py-16 md:py-24 max-w-[1400px] mx-auto z-10 relative">
         <div>
            <h3 className="text-brand-orange font-bold uppercase tracking-[0.3em] text-sm md:text-base mb-2">
              Active_Gen
            </h3>
            <h1 className="text-5xl md:text-7xl lg:text-[8vw] font-monument uppercase tracking-tighter leading-none mt-2">
              OUR <span className="text-neutral-500 italic font-seasons lowercase font-normal">coaches</span>
            </h1>
         </div>
      </section>

      {/* 2. Structured Vertical Coaches Grid (Steel Saigon Style) */}
      <section className="max-w-[1200px] mx-auto px-6 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {coaches.map((coach, index) => (
            <div key={index} className="coach-card bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden hover:border-brand-orange/40 transition-colors flex flex-col group h-full">
              {/* Profile Image container */}
              <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-950 relative">
                 <img src={coach.image} alt={coach.name} className="w-full h-full object-cover grayscale-[40%] contrast-125 group-hover:grayscale-0 group-hover:scale-102 transition-all duration-700 pointer-events-none" crossOrigin="anonymous" referrerPolicy="no-referrer" />
                 <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80"></div>
              </div>

              {/* Coach details content */}
              <div className="p-8 md:p-10 flex flex-col flex-grow">
                 <div className="mb-6">
                   <span className="text-brand-orange font-bold uppercase tracking-[0.2em] text-[10px] block mb-1">{coach.title}</span>
                   <h3 className="text-3xl font-monument uppercase text-white tracking-widest leading-none">{coach.name}</h3>
                 </div>

                 <div className="h-px bg-white/10 mb-6" />

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-grow">
                    {/* Expertise list */}
                    <div>
                      <h4 className="inline-block bg-brand-orange text-white px-2.5 py-1 font-bold uppercase text-[9px] tracking-widest mb-3 rounded">
                        Chuyên môn
                      </h4>
                      <ul className="space-y-2">
                         {coach.expertise.map((item, i) => (
                           <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-300 font-sans font-light leading-relaxed">
                             <div className="w-1.5 h-1.5 bg-[#bd7a58] mt-1.5 shrink-0 rounded-full"></div>
                             {item}
                           </li>
                         ))}
                      </ul>
                    </div>

                    {/* Achievements / Certificates list */}
                    <div className="space-y-6">
                      {coach.certificates.length > 0 && (
                        <div>
                          <h4 className="inline-block bg-white text-black px-2.5 py-1 font-bold uppercase text-[9px] tracking-widest mb-3 rounded">
                            Chứng chỉ
                          </h4>
                          <ul className="space-y-2">
                             {coach.certificates.map((item, i) => (
                               <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-300 font-sans font-light leading-relaxed">
                                 <div className="w-1.5 h-1.5 bg-neutral-300 mt-1.5 shrink-0 rounded-full"></div>
                                 {item}
                               </li>
                             ))}
                          </ul>
                        </div>
                      )}

                      {coach.achievements.length > 0 && (
                        <div>
                          <h4 className="inline-block bg-[#bd7a58] text-white px-2.5 py-1 font-bold uppercase text-[9px] tracking-widest mb-3 rounded">
                            Thành tích
                          </h4>
                          <ul className="space-y-2">
                             {coach.achievements.map((item, i) => (
                               <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-300 font-sans font-light leading-relaxed">
                                 <div className="w-1.5 h-1.5 bg-white mt-1.5 shrink-0 rounded-full"></div>
                                 {item}
                               </li>
                             ))}
                          </ul>
                        </div>
                      )}
                    </div>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
