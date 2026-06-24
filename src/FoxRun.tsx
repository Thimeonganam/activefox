import { useRef, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { ArrowRight, Gauge, Timer, Flame } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SEO } from "./components/SEO";

gsap.registerPlugin(ScrollTrigger);

/* ================================================================
   FOX RUN — STEEL SAIGON STYLE
   Clean dark layout · Orange accent (#FF6129)
   Gentle opacity fade animations only
   ================================================================ */

export default function FoxRun() {
  return (
    <main className="bg-neutral-950 text-white font-sans overflow-x-hidden">
      <SEO
        title="Fox Run | Active Fox"
        description="Tham gia cộng đồng chạy bộ chuyên nghiệp. Chương trình thiết kế riêng giúp phát triển sức bền, tốc độ theo từng cự ly."
        path="/bo-mon/fox-run"
      />
      <Section1Hero />
      <Section3Pillars />
      <Section4Programs />
      <Section5CTA />
    </main>
  );
}

/* ─────────────────────────────────────────────
   SECTION 1 · HERO
   Full-bleed image, title bottom-aligned,
   gentle opacity fade entrance
───────────────────────────────────────────── */
function Section1Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".h1-word", {
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.3,
    });
    gsap.from(".hero-meta", {
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      delay: 0.8,
      ease: "power2.out",
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="relative w-full h-screen overflow-hidden flex flex-col">
      {/* Image fills full screen */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          className="hero-img w-full h-full object-cover object-center"
          src="https://i.postimg.cc/LsRg1cZz/DSC09449.jpg"
          alt="Fox Run"
        />
        {/* Bottom gradient blending into dark bg */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent" />
      </div>

      {/* Giant title — bottom aligned */}
      <div className="relative z-10 mt-auto px-5 md:px-10 pb-0">
        <h1
          className="leading-[0.82] tracking-tighter font-black uppercase italic"
          style={{ fontSize: "clamp(5rem, 18vw, 22rem)" }}
        >
          <div className="overflow-hidden">
            <span className="h1-word inline-block text-[#FF6129]">FOX</span>
          </div>
          <div className="overflow-hidden">
            <span className="h1-word inline-block text-[#FF6129]">RUN.</span>
          </div>
        </h1>
      </div>

      {/* Meta row — bottom bar */}
      <div className="relative z-10 flex items-end justify-between gap-6 px-5 md:px-10 pb-10 pt-6 border-t border-white/10 mt-2">
        <div className="flex items-center gap-6">
          <p className="hero-meta text-xs font-bold uppercase tracking-[0.3em] text-white/50">
            Chạy Bộ Chuyên Nghiệp
          </p>
          <div className="hero-meta w-12 h-px bg-[#FF6129]" />
          <p className="hero-meta text-xs font-bold uppercase tracking-[0.3em] text-white/50">
            Active Fox
          </p>
        </div>
        <div className="hero-meta flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40">
          <span>Cuộn</span>
          <div className="w-8 h-px bg-white/30" />
          <ArrowRight size={12} className="rotate-90" />
        </div>
      </div>
    </section>
  );
}



/* ─────────────────────────────────────────────
   SECTION 3 · PILLARS
   3 tall panels with images, gentle fade-in
───────────────────────────────────────────── */
function Section3Pillars() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".pillar-card", {
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power2.out",
      scrollTrigger: { trigger: ref.current, start: "top 85%" },
    });
  }, { scope: ref });

  const pillars = [
    {
      label: "01 / TECHNIQUE",
      title: "KỸ\nTHUẬT",
      sub: "Tối ưu biomechanics, mỗi bước đều có chủ đích.",
      img: "https://i.postimg.cc/hPWmnQPY/574044175-122129162336970036-6445286320170226532-n.jpg",
      textPos: "top",
    },
    {
      label: "02 / ENDURANCE",
      title: "SỨC\nBỀN",
      sub: "Base run, Interval — xây nền tảng tim mạch đỉnh cao.",
      img: "https://i.postimg.cc/W4hzgs1V/DAL-6242.jpg",
      textPos: "bottom",
    },
    {
      label: "03 / SPEED",
      title: "TỐC\nĐỘ",
      sub: "Bứt phá PB cá nhân. Mỗi giây đều tính.",
      img: "https://i.postimg.cc/ZK4qj8qb/555670111-122121722570970036-4976528594734745603-n.jpg",
      textPos: "top",
    },
  ];

  return (
    <section ref={ref} className="bg-neutral-950 py-8 px-4 md:px-8">
      {/* Section label */}
      <div className="flex items-center gap-6 mb-8">
        <div className="w-6 h-0.5 bg-[#FF6129]" />
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
          Phương Pháp Huấn Luyện
        </span>
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-[10px] font-mono text-white/20">003 MODULES</span>
      </div>

      {/* 3-panel grid */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1.4fr_2fr] gap-3 h-[80vh]">
        {pillars.map((p, i) => (
          <div
            key={i}
            className="pillar-card relative overflow-hidden rounded-2xl group"
          >
            {/* Clean image */}
            <img
              src={p.img}
              alt={p.title}
              className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-all duration-700"
            />

            {/* Gradient for text readability — dark variant */}
            <div
              className={`absolute inset-0 ${
                p.textPos === "top"
                  ? "bg-gradient-to-b from-black/60 via-transparent to-transparent"
                  : "bg-gradient-to-t from-black/60 via-transparent to-transparent"
              } transition-opacity duration-500`}
            />

            {/* Content */}
            <div
              className={`absolute inset-0 p-8 flex flex-col ${
                p.textPos === "top" ? "justify-start" : "justify-end"
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/60 mb-4">
                {p.label}
              </span>
              <h3
                className="font-black italic leading-[0.85] tracking-tighter text-[#FF6129] whitespace-pre-line mb-4"
                style={{ fontSize: "clamp(3rem, 6vw, 7rem)" }}
              >
                {p.title}
              </h3>
              <p className="text-sm text-white/70 max-w-[200px] leading-relaxed font-medium">
                {p.sub}
              </p>
            </div>

            {/* Orange accent on hover */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#FF6129] group-hover:w-full transition-all duration-500 ease-out" />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 4 · PROGRAMS
   Alternating rows, gentle opacity fade
───────────────────────────────────────────── */
function Section4Programs() {
  const ref = useRef<HTMLDivElement>(null);
  const [programs, setPrograms] = useState([
    {
      id: "01",
      title: "Running Technique",
      desc: "Tối ưu hóa kỹ thuật: cách tiếp đất, tư thế, nhịp bước cadence và phân phối sức lực trên từng km.",
      img: "https://i.postimg.cc/hPWmnQPY/574044175-122129162336970036-6445286320170226532-n.jpg",
      tag: "Kỹ thuật",
    },
    {
      id: "02",
      title: "Endurance Training",
      desc: "Base run, Interval, Tempo — hệ thống huấn luyện khoa học giúp bạn chạy xa hơn mà không mệt.",
      img: "https://i.postimg.cc/W4hzgs1V/DAL-6242.jpg",
      tag: "Sức bền",
    },
    {
      id: "03",
      title: "Running Drills",
      desc: "Bài tập bổ trợ giúp cơ thể kết nối chặt chẽ — kiểm soát tốt hơn, chạy hiệu quả hơn, ít chấn thương hơn.",
      img: "https://i.postimg.cc/ZK4qj8qb/555670111-122121722570970036-4976528594734745603-n.jpg",
      tag: "Drills",
    },
  ]);

  useEffect(() => {
    (async () => {
      try {
        const [p1, p2, p3] = await Promise.all([
          getDoc(doc(db, "pages", "fox_run", "blocks", "program_1")),
          getDoc(doc(db, "pages", "fox_run", "blocks", "program_2")),
          getDoc(doc(db, "pages", "fox_run", "blocks", "program_3")),
        ]);
        const snaps = [p1, p2, p3];
        setPrograms((prev) =>
          prev.map((p, i) => {
            const d = snaps[i].exists() ? snaps[i].data()! : {};
            return {
              ...p,
              title: d.title || p.title,
              desc: d.description || p.desc,
              img: d.mediaUrl || p.img,
            };
          })
        );
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  useGSAP(() => {
    programs.forEach((_, i) => {
      const row = `.prog-row-${i}`;
      gsap.from(`${row} .prog-img`, {
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: row, start: "top 85%" },
      });
      gsap.from(`${row} .prog-text`, {
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: row, start: "top 85%" },
      });
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="bg-neutral-950 pt-24 pb-8">
      {/* Large dim heading */}
      <div className="px-6 md:px-12 mb-16 overflow-hidden">
        <p className="font-black italic tracking-tighter text-white/5 uppercase"
          style={{ fontSize: "clamp(4rem, 14vw, 16rem)" }}>
          PROGRAM
        </p>
      </div>

      {programs.map((prog, i) => (
        <div
          key={prog.id}
          className={`prog-row-${i} flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-stretch mb-4`}
        >
          {/* Image — clean */}
          <div className="prog-img md:w-1/2 h-[50vw] md:h-[38vw] relative overflow-hidden">
            <img
              src={prog.img}
              alt={prog.title}
              className="w-full h-full object-cover transition-all duration-700 scale-110 hover:scale-100"
            />
            {/* Big number overlay */}
            <span
              className="absolute bottom-4 right-6 font-black italic text-white/20 select-none"
              style={{ fontSize: "clamp(5rem, 15vw, 16rem)" }}
            >
              {prog.id}
            </span>
          </div>

          {/* Text */}
          <div className="prog-text md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12 bg-black">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FF6129] mb-4">
              {prog.tag}
            </span>
            <h3
              className="font-black uppercase italic tracking-tighter leading-none text-[#FF6129] mb-6"
              style={{ fontSize: "clamp(2rem, 4.5vw, 5rem)" }}
            >
              {prog.title}
            </h3>
            <div className="w-12 h-0.5 bg-[#FF6129] mb-6" />
            <p className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-sm">
              {prog.desc}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 5 · CTA
   Off-center composition, gentle fade-in
───────────────────────────────────────────── */
function Section5CTA() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".cta-content > *", {
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: { trigger: ref.current, start: "top 85%" },
    });
  }, { scope: ref });

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-[#FF6129] flex items-center overflow-hidden"
    >
      {/* Giant background text */}
      <div
        className="absolute -left-8 md:left-0 top-1/2 -translate-y-1/2 font-black italic text-white/10 uppercase select-none whitespace-nowrap leading-none"
        style={{ fontSize: "clamp(8rem, 25vw, 30rem)" }}
      >
        JOIN RUN
      </div>

      <div className="cta-content relative z-10 px-6 md:px-16 lg:px-24 max-w-5xl">
        {/* Overline */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-8 h-0.5 bg-white" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/60">
            Bắt đầu hành trình
          </span>
        </div>

        <h2
          className="font-black uppercase italic tracking-tighter leading-[0.85] mb-10 text-white"
          style={{ fontSize: "clamp(3.5rem, 10vw, 12rem)" }}
        >
          SẴN SÀNG<br />
          <span className="text-[#0D0D0D]">CHẠY</span><br />
          CÙNG CHÚNG TÔI?
        </h2>

        <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-md mb-14">
          Dù bạn là người mới bắt đầu hay vận động viên có kinh nghiệm — Fox Run có chỗ cho tất cả.
        </p>

        {/* CTA group */}
        <div className="flex flex-wrap items-center gap-6">
          <button className="group relative overflow-hidden px-10 py-5 bg-white text-[#0D0D0D] font-black uppercase tracking-widest text-sm rounded-full flex items-center gap-3 hover:gap-5 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.15)]">
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">Đăng Ký Ngay</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:text-white transition-all duration-300" />
            <div className="absolute inset-0 bg-[#0D0D0D] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] rounded-full" />
          </button>
          <button className="font-bold uppercase tracking-widest text-sm text-white/60 hover:text-white flex items-center gap-2 transition-colors">
            Tìm hiểu thêm <ArrowRight size={14} />
          </button>
        </div>

        {/* Specs row */}
        <div className="mt-20 pt-8 border-t border-white/20 flex flex-wrap gap-10">
          {[
            { icon: Gauge, label: "10–15 người / lớp" },
            { icon: Timer, label: "1–2 HLV / buổi" },
            { icon: Flame, label: "Mọi trình độ" },
          ].map(({ icon: Icon, label }, i) => (
            <div key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white/60">
              <Icon size={16} className="text-white" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
