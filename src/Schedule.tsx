import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Clock, User, ArrowRight } from "lucide-react";
import { SEO } from "./components/SEO";

gsap.registerPlugin(ScrollTrigger);

// Mock data structured from the user's image
const scheduleData = {
  sala: [
    {
      day: "MONDAY",
      date: "20/04",
      classes: [
        { time: "19:15 - 20:00", name: "ĐỘ KHỚP FOR RUN/TRAIL", type: "Mobility", coach: "DONNIE" }
      ]
    },
    {
      day: "TUESDAY",
      date: "21/04",
      classes: [
        { time: "18:00 - 19:00", name: "ĐỘ KHỚP x SNR", type: "Mobility", coach: "ROGER" },
        { time: "18:00 - 19:00", name: "FOX STRENGTH", type: "Strength", coach: "DONNIE" },
        { time: "19:00 - 20:00", name: "FOX RUN", type: "Cardio", coach: "DONNIE" }
      ]
    },
    {
      day: "WEDNESDAY",
      date: "22/04",
      classes: [
        { time: "18:00 - 19:00", name: "FOX HYBRID TRAINING", type: "Hybrid", coach: "NôM" },
        { time: "19:15 - 20:00", name: "ĐỘ KHỚP FOR RUN/TRAIL", type: "Mobility", coach: "MASTER ALEX & NôM" }
      ]
    },
    {
      day: "THURSDAY",
      date: "23/04",
      classes: [
        { time: "18:00 - 19:00", name: "FOX RUN", type: "Cardio", coach: "DONNIE" },
        { time: "19:15 - 20:00", name: "FOX HYBRID TRAINING", type: "Hybrid", coach: "DONNIE" }
      ]
    },
    {
      day: "FRIDAY",
      date: "24/04",
      classes: [
        { time: "18:00 - 19:00", name: "FOX RUN", type: "Cardio", coach: "NôM" },
        { time: "19:15 - 20:00", name: "ĐỘ KHỚP FOR RUN/TRAIL", type: "Mobility", coach: "NôM" }
      ]
    },
    {
      day: "SUNDAY",
      date: "26/04",
      classes: [
        { time: "06:00 - 07:00", name: "FOX RUN", type: "Cardio", coach: "NôM" }
      ]
    }
  ],
  caothang: [
    {
      day: "MONDAY",
      date: "20/04",
      classes: [
        { time: "12:00 - 13:00", name: "FOX STRENGTH - THÂN DƯỚI", type: "Strength", coach: "CAT" },
        { time: "18:00 - 19:00", name: "HYROX", type: "Hyrox", coach: "BRIAN" },
        { time: "19:15 - 20:00", name: "ĐỘ KHỚP FOR RUN/TRAIL", type: "Mobility", coach: "ROGER" }
      ]
    },
    {
      day: "TUESDAY",
      date: "21/04",
      classes: [
        { time: "12:00 - 13:00", name: "FOX HYBRID TRAINING", type: "Hybrid", coach: "KIÊN" },
        { time: "18:00 - 19:00", name: "FOX STRENGTH - THÂN DƯỚI", type: "Strength", coach: "BRIAN" },
        { time: "19:15 - 20:00", name: "H Y R O X", type: "Hyrox", coach: "KIÊN" }
      ]
    },
    {
      day: "WEDNESDAY",
      date: "22/04",
      classes: [
        { time: "12:00 - 13:00", name: "FOX STRENGTH - THÂN TRÊN", type: "Strength", coach: "ROGER" },
        { time: "18:00 - 19:00", name: "H Y R O X", type: "Hyrox", coach: "BRIAN" },
        { time: "19:15 - 20:00", name: "ĐỘ KHỚP FOR RUN/TRAIL", type: "Mobility", coach: "ROGER" }
      ]
    },
    {
      day: "THURSDAY",
      date: "23/04",
      classes: [
        { time: "12:00 - 13:00", name: "H Y R O X", type: "Hyrox", coach: "LONG" },
        { time: "18:00 - 19:00", name: "ĐỘ KHỚP FOR PICKLE BALL", type: "Mobility", coach: "ROGER" },
        { time: "19:15 - 20:00", name: "FOX HYBRID TRAINING", type: "Hybrid", coach: "KIÊN" }
      ]
    }
  ]
};

const getTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'strength': return 'text-red-500 border-red-500/30';
    case 'cardio': return 'text-cyan-400 border-cyan-400/30';
    case 'mobility': return 'text-emerald-400 border-emerald-400/30';
    case 'hybrid': return 'text-amber-400 border-amber-400/30';
    case 'hyrox': return 'text-white border-white/30';
    default: return 'text-brand-orange border-brand-orange/30';
  }
};

export default function Schedule() {
  const [activeLocation, setActiveLocation] = useState<'sala' | 'caothang'>('sala');
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const mapsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      // Hero entry
      gsap.fromTo(".sch-hero-title", 
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power4.out" }
      );

      // Maps Zoom-In from Afar Animation
      if (mapsRef.current) {
        const mapCards = gsap.utils.toArray('.map-card', mapsRef.current);
        mapCards.forEach((map: any) => {
           
           // Smooth zoom-in entrance for the entire map container
           gsap.fromTo(map,
             { scale: 0.8, opacity: 0, y: 50 },
             { 
                scale: 1, opacity: 1, y: 0,
                duration: 1.2,
                ease: "expo.out",
                scrollTrigger: {
                   trigger: map,
                   start: "top 90%",
                   toggleActions: "play none none reverse"
                }
             }
           );
        });
      }
    });
  }, { scope: containerRef });

  useGSAP(() => {
    // Animate list items when location changes
    if (!listRef.current) return;
    
    let mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const dayGroups = gsap.utils.toArray('.day-group', listRef.current);
      
      gsap.fromTo(dayGroups,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
    });

  }, { scope: listRef, dependencies: [activeLocation] });

  return (
    <main ref={containerRef} className="w-full bg-[#050505] min-h-screen text-white font-sans pt-24 pb-32">
      <SEO 
        title="Lịch Tập | Active Fox"
        description="Xem ngay lịch cập nhật các lớp tập Fox Strength, Hybrid, Fox Run. Đặt chỗ tham gia ngay hôm nay."
        path="/lich-tap"
      />
      {/* Cinematic Hero */}
      <section className="relative w-full px-6 lg:px-12 py-16 md:py-24 flex flex-col items-center justify-center text-center overflow-hidden">
         {/* Subtle background texture */}
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,97,41,0.1)_0%,rgba(0,0,0,1)_70%)] pointer-events-none"></div>
         
         <p className="sch-hero-title text-brand-orange font-bold tracking-[0.3em] uppercase text-xs mb-4">Master Your Time</p>
         <h1 className="sch-hero-title text-5xl md:text-7xl lg:text-8xl font-monument uppercase tracking-tight leading-none">
            The <span className="font-seasons italic text-neutral-500">Schedule</span>
         </h1>
         <p className="sch-hero-title text-neutral-400 mt-6 max-w-xl font-medium tracking-wide">
            Lịch tập luyện linh hoạt với nhiều khung giờ . Chọn cơ sở để xem các lớp trong tuần.
         </p>
      </section>

      {/* Location Selector (Massive Editorial Tabs) */}
      <section className="w-full max-w-[1200px] mx-auto px-6 mb-16 relative z-20">
         <div className="flex flex-col md:flex-row border-b border-white/10">
            <button 
              onClick={() => setActiveLocation('sala')}
              className={`flex-1 py-6 text-center transition-all duration-500 relative group overflow-hidden ${activeLocation === 'sala' ? 'text-white' : 'text-neutral-600 hover:text-neutral-300'}`}
            >
              <div className={`absolute inset-0 bg-brand-orange/10 transform origin-bottom transition-transform duration-500 ${activeLocation === 'sala' ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'}`}></div>
              <h2 className="relative z-10 text-3xl md:text-5xl font-monument uppercase tracking-widest pointer-events-none">Sala</h2>
              <p className="relative z-10 text-[10px] tracking-[0.2em] font-bold mt-2 uppercase pointer-events-none">62 Hoàng Thế Thiện, Q2</p>
              {activeLocation === 'sala' && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-orange"></div>
              )}
            </button>
            <button 
              onClick={() => setActiveLocation('caothang')}
              className={`flex-1 py-6 text-center transition-all duration-500 relative group overflow-hidden ${activeLocation === 'caothang' ? 'text-white' : 'text-neutral-600 hover:text-neutral-300'}`}
            >
              <div className={`absolute inset-0 bg-brand-orange/10 transform origin-bottom transition-transform duration-500 ${activeLocation === 'caothang' ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'}`}></div>
              <h2 className="relative z-10 text-3xl md:text-5xl font-monument uppercase tracking-widest pointer-events-none">Cao Thắng</h2>
              <p className="relative z-10 text-[10px] tracking-[0.2em] font-bold mt-2 uppercase pointer-events-none">175B Cao Thắng, Q10</p>
              {activeLocation === 'caothang' && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-orange"></div>
              )}
            </button>
         </div>
      </section>

      {/* The Agenda / Schedule List */}
      <section className="w-full max-w-[1200px] mx-auto px-6 relative z-10" ref={listRef}>
         
         {scheduleData[activeLocation].map((dayData, dIdx) => (
            <div key={dIdx} className="day-group mb-20 relative">
               
               {/* Day Header */}
               <div className="sticky top-20 z-30 bg-[#050505]/90 backdrop-blur-md py-4 mb-6 border-b border-white/5 flex items-end gap-4">
                  <h3 className="text-4xl md:text-6xl font-monument text-white tracking-widest">{dayData.day}</h3>
                  <span className="text-xl md:text-2xl font-seasons italic text-brand-orange pb-1">{dayData.date}</span>
               </div>

               {/* Classes List */}
               <div className="flex flex-col gap-4">
                  {dayData.classes.map((cls, cIdx) => (
                    <div 
                      key={cIdx} 
                      className="group relative w-full bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-brand-orange/50 transition-all duration-300 hover:bg-[#111]"
                    >
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 bg-brand-orange/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>

                        {/* Left: Time & Type */}
                        <div className="flex flex-col gap-2 md:w-1/4">
                           <div className="flex items-center gap-2 text-neutral-400 font-mono text-sm md:text-base">
                              <Clock className="w-4 h-4 text-brand-orange" />
                              <span>{cls.time}</span>
                           </div>
                           <div className={`inline-flex items-center border px-3 py-1 rounded-full text-[10px] w-fit font-bold tracking-widest uppercase ${getTypeColor(cls.type)}`}>
                              {cls.type}
                           </div>
                        </div>

                        {/* Middle: Class Name */}
                        <div className="md:w-2/4">
                           <h4 className="text-2xl md:text-3xl font-monument uppercase tracking-tight text-white group-hover:text-brand-orange transition-colors">
                              {cls.name}
                           </h4>
                        </div>

                        {/* Right: Coach & Action */}
                        <div className="flex items-center justify-between md:w-1/4">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center overflow-hidden">
                                 <User className="w-5 h-5 text-neutral-500" />
                              </div>
                              <div className="flex flex-col">
                                 <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">Coach</span>
                                 <span className="font-seasons italic text-lg text-white">{cls.coach}</span>
                              </div>
                           </div>
                           
                           {/* Register Arrow */}
                           <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-brand-orange group-hover:border-brand-orange transition-all duration-300">
                             <ArrowRight className="w-5 h-5 text-white group-hover:-rotate-45 transition-transform duration-300" />
                           </button>
                        </div>
                    </div>
                  ))}
               </div>
            </div>
         ))}
         
         <div className="w-full py-12 flex justify-center">
             <button className="text-xs tracking-[0.2em] font-bold border border-white/20 bg-transparent text-white px-10 py-5 rounded-full hover:bg-white hover:text-black transition-all uppercase">
                Tải Xuống Lịch tập (PDF)
             </button>
         </div>

      </section>

      {/* Location Maps Section */}
      <section className="w-full max-w-[1200px] mx-auto px-6 mb-16 relative z-10" ref={mapsRef}>
         {/* Section Divider / Header */}
         <div className="w-full mb-12 flex flex-col items-center justify-center text-center">
            <span className="text-brand-orange tracking-[0.2em] uppercase text-[10px] font-bold mb-3">Find Us</span>
            <h2 className="text-2xl md:text-3xl font-monument uppercase tracking-widest text-white">Locations</h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {/* Sala Map */}
            <div className="map-card group relative block w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 hover:border-brand-orange/50 transition-colors duration-500 bg-[#0a0a0a]">
                <iframe 
                  className="absolute inset-0 w-full h-full mix-blend-luminosity opacity-40 group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-700" 
                  src="https://maps.google.com/maps?q=62+Hoàng+Thế+Thiện,+Quận+2,+TPHCM&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight={0} 
                  marginWidth={0}
                ></iframe>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent pointer-events-none group-hover:opacity-30 transition-opacity duration-700"></div>
                
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end pointer-events-none">
                    <div className="w-12 h-12 bg-[#1a1a1a] border border-white/10 group-hover:bg-brand-orange group-hover:border-brand-orange text-white group-hover:text-black rounded-full flex items-center justify-center mb-6 transform group-hover:-translate-y-2 transition-all duration-500 shadow-[0_0_30px_rgba(255,97,41,0)] group-hover:shadow-[0_0_30px_rgba(255,97,41,0.4)] pointer-events-auto">
                        <MapPin className="w-5 h-5 pointer-events-none" />
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-monument uppercase tracking-wider text-white mb-3 drop-shadow-md">Sala</h3>
                    <p className="text-neutral-300 font-mono text-xs md:text-sm leading-relaxed max-w-[80%] pointer-events-auto w-fit drop-shadow-md">62 Hoàng Thế Thiện,<br/>Phường An Lợi Đông, Quận 2, TPHCM</p>
                    
                    <a href="https://maps.app.goo.gl/QAwA3yve6vAwXmwv5" target="_blank" rel="noopener noreferrer" className="mt-6 flex items-center gap-3 text-brand-orange text-[10px] uppercase font-bold tracking-widest pointer-events-auto w-fit bg-[#0a0a0a]/80 backdrop-blur-md px-4 py-3 rounded-full border border-brand-orange/30 hover:bg-brand-orange hover:text-black transition-all duration-300 transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 shadow-lg">
                       <span>Get Directions</span>
                       <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>

            {/* Cao Thang Map */}
            <div className="map-card group relative block w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 hover:border-brand-orange/50 transition-colors duration-500 bg-[#0a0a0a]">
                <iframe 
                  className="absolute inset-0 w-full h-full mix-blend-luminosity opacity-40 group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-700" 
                  src="https://maps.google.com/maps?q=175B+Cao+Thắng,+Quận+10,+TPHCM&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight={0} 
                  marginWidth={0}
                ></iframe>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent pointer-events-none group-hover:opacity-30 transition-opacity duration-700"></div>
                
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end pointer-events-none">
                    <div className="w-12 h-12 bg-[#1a1a1a] border border-white/10 group-hover:bg-brand-orange group-hover:border-brand-orange text-white group-hover:text-black rounded-full flex items-center justify-center mb-6 transform group-hover:-translate-y-2 transition-all duration-500 shadow-[0_0_30px_rgba(255,97,41,0)] group-hover:shadow-[0_0_30px_rgba(255,97,41,0.4)] pointer-events-auto">
                        <MapPin className="w-5 h-5 pointer-events-none" />
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-monument uppercase tracking-wider text-white mb-3 drop-shadow-md">Cao Thắng</h3>
                    <p className="text-neutral-300 font-mono text-xs md:text-sm leading-relaxed max-w-[80%] pointer-events-auto w-fit drop-shadow-md">175B Cao Thắng,<br/>Phường 12, Quận 10, TPHCM</p>
                    
                    <a href="https://maps.app.goo.gl/CgX9oroM8gHArn7L6" target="_blank" rel="noopener noreferrer" className="mt-6 flex items-center gap-3 text-brand-orange text-[10px] uppercase font-bold tracking-widest pointer-events-auto w-fit bg-[#0a0a0a]/80 backdrop-blur-md px-4 py-3 rounded-full border border-brand-orange/30 hover:bg-brand-orange hover:text-black transition-all duration-300 transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 shadow-lg">
                       <span>Get Directions</span>
                       <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
         </div>
      </section>

    </main>
  );
}
