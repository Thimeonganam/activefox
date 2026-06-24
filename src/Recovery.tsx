import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { SEO } from "./components/SEO";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { ArrowRight, Cpu, Sparkles } from "lucide-react";
import { useRegistration } from "./RegistrationContext";

gsap.registerPlugin(ScrollTrigger);

export default function Recovery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { openModal } = useRegistration();

  const [heroContent, setHeroContent] = useState({
    title: "RECOVERY",
    description: "The Anatomy of \n Perfect Healing",
    mediaUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
  });
  
  const [wellbeingContent, setWellbeingContent] = useState({
    title: "WELL-BEING SERVICES",
    description: "Phục hồi toàn diện từ thể chất đến tinh thần."
  });

  const [techContent, setTechContent] = useState({
    title: "HIGH-TECH SERVICES",
    description: "Ứng dụng công nghệ hàng đầu thế giới vào trị liệu thể thao."
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [heroSnap, wellbeingSnap, techSnap] = await Promise.all([
          getDoc(doc(db, "pages", "recovery", "blocks", "hero")),
          getDoc(doc(db, "pages", "recovery", "blocks", "wellbeing")),
          getDoc(doc(db, "pages", "recovery", "blocks", "tech"))
        ]);

        if (heroSnap.exists()) {
          const data = heroSnap.data();
          setHeroContent({
            title: data.title || heroContent.title,
            description: data.description || heroContent.description,
            mediaUrl: data.mediaUrl || heroContent.mediaUrl
          });
        }
        
        if (wellbeingSnap.exists()) {
          const data = wellbeingSnap.data();
          setWellbeingContent({
            title: data.title || wellbeingContent.title,
            description: data.description || wellbeingContent.description
          });
        }

        if (techSnap.exists()) {
          const data = techSnap.data();
          setTechContent({
            title: data.title || techContent.title,
            description: data.description || techContent.description
          });
        }
      } catch (err) {
        console.error("Failed to load recovery content:", err);
      }
    };
    fetchContent();
  }, []);

  const wellbeingServices = [
    {
      id: "01",
      category: "WELL-BEING",
      title: "COLD-WATER IMMERSION",
      subtitle: "Liệu pháp Ngâm đá Lạnh",
      desc: "Liệu pháp recovery bằng ngâm nóng – lạnh (Contrast Water Therapy) hoạt động dựa trên cơ chế luân phiên giãn và co mạch máu khi thay đổi nhiệt độ. Ngâm lạnh giúp giảm viêm, giảm sưng và đau cơ sau vận động, trong khi ngâm nóng giúp thư giãn cơ bắp, tăng lưu thông máu và đưa oxy, dưỡng chất đến mô cơ nhanh hơn. Sự luân phiên này hỗ trợ đào thải chất chuyển hoá, giảm cảm giác mỏi cơ và thúc đẩy quá trình phục hồi, giúp cơ thể sẵn sàng cho buổi tập tiếp theo.",
      mainImg: "https://i.postimg.cc/9Xk1ZQ5D/DSC06431.jpg",
      link: "/dich-vu/ice-bath"
    },
    {
      id: "02",
      category: "WELL-BEING",
      title: "MASSAGE TRỊ LIỆU",
      subtitle: "Trị Liệu Cổ Vai Gáy — Giải Tỏa Căng Thẳng Văn Phòng",
      desc: "Liệu trình trị liệu cơ học chuyên sâu tập trung giải tỏa các điểm kẹt cơ (trigger points), nhả căng mỏi vùng cổ, vai, gáy và cột sống thắt lưng cho dân văn phòng hoặc người làm việc ngồi lâu sai tư thế kéo dài. Giúp kích thích tuần hoàn máu lên não, giảm nhức đầu căng thẳng, xua tan cảm giác uể oải mệt mỏi tích tụ và hồi sinh năng lượng sảng khoái tức thì.",
      mainImg: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      link: "/dich-vu/massage-tri-lieu"
    },
    {
      id: "03",
      category: "WELL-BEING",
      title: "SPORTS MASSAGE",
      subtitle: "Giãn Cơ Chuyên Sâu — Phục Hồi Thể Thao Đỉnh Cao",
      desc: "Liệu trình Sport Massage 60 phút được thiết kế chuyên biệt cho người chơi các bộ môn thể thao phong trào và chuyên nghiệp như Pickleball, Chạy bộ, Đạp xe, Gym... Tập trung bóc tách các điểm kết dính mạc cơ (fascia), đào thải axit lactic tích tụ, giải phóng căng tức sâu dưới các thớ cơ chìm, giúp tăng biên độ khớp (ROM) và phòng tránh chấn thương thể thao chủ động cùng các Coach vật lý trị liệu.",
      mainImg: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      link: "/landing/sports-massage"
    }
  ];

  const indiba = {
      id: "03",
      category: "HIGH-TECH",
      title: "FOXFLEX 448",
      subtitle: "Công nghệ Sóng RF - Tái Tạo Tế Bào",
      desc: "Sử dụng sóng tần số vô tuyến (Radio Frequency) ở ngưỡng 448 kHz được FDA chứng nhận. Công nghệ kích hoạt tái tạo mô từ cấp độ tế bào, vượt qua ranh giới của các bài phục hồi truyền thống.",
      note: "Indiba là công nghệ phục hồi cốt lõi của CLB Barcelona, đồng thời là bí quyết duy trì đỉnh cao của các huyền thoại như Leo Messi, Neymar Jr.",
      mainImg: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      breakdowns: [
        {
          step: "Pha 1",
          name: "Cân bằng sinh học",
          detail: "Hoạt động ở mức năng lượng thấp, tần số 448 kHz sửa chữa màng tế bào, thúc đẩy trao đổi chất.",
          img: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
          step: "Pha 2",
          name: "Vi tuần hoàn",
          detail: "Mô bắt đầu tăng nhiệt nội sinh một cách dễ chịu, gia tăng lượng máu đến khu vực tổn thương.",
          img: "https://i.postimg.cc/rFZ5rhB0/image87-1024x576-1-285x150.png"
        },
        {
          step: "Pha 3",
          name: "Tăng sinh nhiệt",
          detail: "Phá vỡ các chèn ép sợi cơ lâu năm, làm mềm mô sẹo thể thao, giảm đau cực nhanh.",
          img: "https://i.postimg.cc/fWB9G2TF/a400d0c4563d20c9cf10cbeaa0bf238b.jpg"
        }
      ]
  };

  const emsculpt = {
      id: "04",
      category: "HIGH-TECH",
      title: "MAGAIR ELITE SCULPT+",
      subtitle: "Kích Hoạt & Căn Chỉnh Hình Thể",
      desc: "Hệ thống kép phối hợp công nghệ kiến tạo cơ bắp HIFEM và phục hồi nén khí tuần hoàn Normatec. Cỗ máy thay bạn luyện tập và chữa lành trong cùng một lúc.",
      note: "Công nghệ được siêu sao Cristiano Ronaldo và huyền thoại Novak Djokovic tin dùng thường xuyên.",
      mainImg: "https://i.postimg.cc/VvpM3vB5/2be669c25efc337c87404d2643dac88b.jpg",
      breakdowns: [
        {
          step: "Pha A",
          name: "Sóng điện từ HIFEM",
          detail: "Tạo ra các cơn co thắt 'siêu tối đa' vượt xa khả năng tập luyện chủ động, kéo theo sự thay đổi cấu trúc mô: tăng mật độ cơ và đốt mỡ.",
          img: "https://i.postimg.cc/rsrNJ3vt/ace5fa80ba6864a15902657abae5d253.jpg"
        },
        {
          step: "Pha B",
          name: "Normatec Compression",
          detail: "Hệ thống nén khí mô phỏng chính xác xoa bóp bạch huyết. Các ống nén siết nhả nhịp nhàng đẩy máu tĩnh mạch chứa độc tố ngược về tim.",
          img: "https://i.postimg.cc/7LJ1DpZR/04420afb40567d8c3d8c6ff50830aea7.jpg"
        },
        {
          step: "Pha C",
          name: "Tuần hoàn cơ bắp",
          detail: "Sau liệu trình trên, cơ thể được giải phóng hoàn toàn cảm giác căng cứng. Kết cấu thần kinh cơ được làm dịu cực độ.",
          img: "https://i.postimg.cc/mDq0hxYT/4b9be3fe7bb94f530a1885b15c771cd0.jpg"
        }
      ]
  };

  useGSAP(() => {
    // Elegant, gentle fade-in animations on scroll
    gsap.utils.toArray('.rc-fade-in').forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="w-full bg-[#fdfbf9] text-[#1a100c] font-sans selection:bg-[#bd7a58] selection:text-white pb-32">
      <SEO 
        title="Phục Hồi & Trị Liệu | Active Fox"
        description="Giải pháp phục hồi thể chất đỉnh cao với liệu pháp well-being y sinh thể thao và các thiết bị công nghệ hàng đầu thế giới."
        path="/tri-lieu"
      />

      {/* 1. Hero Section (High Contrast Minimalist) */}
      <section className="relative w-full h-[55vh] md:h-[65vh] flex items-center justify-center overflow-hidden bg-black text-white">
        <div className="absolute inset-0 w-full h-full z-0">
          <img src={heroContent.mediaUrl} className="w-full h-full object-cover grayscale-[20%] brightness-[0.45]" crossOrigin="anonymous" referrerPolicy="no-referrer" alt="Recovery" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fdfbf9] via-transparent to-transparent opacity-95"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <span className="text-[#bd7a58] text-xs md:text-sm font-monument tracking-[0.3em] uppercase mb-4 block">ACTIVE FOX RECOVERY</span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-monument uppercase tracking-tighter leading-none mb-6">
            {heroContent.title}
          </h1>
          <p className="text-white/70 text-sm md:text-base font-light tracking-widest max-w-xl mx-auto uppercase">
            {heroContent.description}
          </p>
        </div>
      </section>

      {/* 2. Brand Statement */}
      <section className="py-20 max-w-4xl mx-auto px-6 text-center rc-fade-in">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-monument uppercase leading-tight tracking-tight text-[#2c1d11]">
          THE SCIENCE OF <br />
          <span className="text-[#bd7a58] italic font-seasons lowercase font-normal">active recovery</span>
        </h2>
        <p className="mt-8 text-neutral-500 font-sans font-light text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Tại Active Fox, chúng tôi kết hợp y học thể thao chính xác và phục hồi chủ động. Bằng cách kết hợp liệu pháp phục hồi tự nhiên với các giải pháp công nghệ y sinh tiên tiến hàng đầu thế giới, chúng tôi giúp bạn hồi sinh cơ bắp nhanh chóng và bứt phá mọi giới hạn tập luyện.
        </p>
      </section>

      {/* 3. Wellbeing Services (Alternating Premium Layouts) */}
      <section className="py-12 border-t border-neutral-200 bg-[#ece8e1]/20">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center mb-20 rc-fade-in">
            <span className="text-[#bd7a58] text-xs font-monument tracking-[0.3em] uppercase mb-4 block">
              {wellbeingContent.title}
            </span>
            <h2 className="text-3xl md:text-4xl font-monument uppercase tracking-tight text-[#2c1d11]">
              LIỆU PHÁP PHỤC HỒI WELL-BEING
            </h2>
          </div>

          <div className="space-y-32">
            {wellbeingServices.map((service, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={service.id} 
                  className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 rc-fade-in ${
                    !isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Left Column: Description */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <span className="text-brand-orange text-[10px] font-bold tracking-[0.3em] uppercase mb-3">
                      [ {service.id} // {service.category} ]
                    </span>
                    <h3 className="text-3xl md:text-4xl font-monument uppercase tracking-tight text-[#2c1d11] mb-2 leading-none">
                      {service.title}
                    </h3>
                    <p className="text-lg md:text-xl font-seasons italic text-[#bd7a58] mb-6 leading-tight">
                      {service.subtitle}
                    </p>
                    <p className="text-neutral-500 font-sans font-light leading-relaxed text-sm md:text-base mb-8">
                      {service.desc}
                    </p>

                    {service.link !== '/dich-vu/ice-bath' && service.title !== 'SPORTS MASSAGE' && (
                      <Link 
                        to={service.link} 
                        className="inline-flex self-start items-center gap-2 text-xs font-monument font-bold uppercase tracking-widest text-[#bd7a58] hover:text-[#1a100c] pb-1.5 border-b-2 border-[#bd7a58]/50 hover:border-[#1a100c] transition-all duration-300 group"
                      >
                        Tìm hiểu thêm 
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </div>

                  {/* Right Column: Image wrapper */}
                  <div className="w-full lg:w-1/2 flex justify-center items-center">
                    <div className="relative w-full max-w-[550px] aspect-[4/3] rounded-3xl overflow-hidden border border-neutral-200 shadow-lg">
                      <img src={service.mainImg} className="absolute inset-0 w-full h-full object-cover grayscale-[10%]" crossOrigin="anonymous" referrerPolicy="no-referrer" alt={service.title} />
                      <div className="absolute inset-0 bg-[#bd7a58]/5 mix-blend-multiply"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. High-Tech Services Section (Structured Grid Layout) */}
      <section className="py-24 border-t border-neutral-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20 rc-fade-in">
            <span className="text-[#bd7a58] text-xs font-monument tracking-[0.3em] uppercase mb-4 block">
              {techContent.title}
            </span>
            <h2 className="text-3xl md:text-4xl font-monument uppercase tracking-tight text-[#2c1d11]">
              DỊCH VỤ CÔNG NGHỆ CAO ĐỈNH CAO
            </h2>
          </div>

          <div className="space-y-32">
            {/* Indiba Section */}
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 rc-fade-in items-start">
              <div className="w-full lg:w-[45%]">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#ece8e1] rounded-full text-[10px] font-bold uppercase tracking-wider text-brand-orange mb-4">
                  <Cpu className="w-3 h-3" /> [ {indiba.id} // {indiba.category} ]
                </span>
                <h3 className="text-3xl md:text-4xl font-monument uppercase text-[#2c1d11] leading-none mb-2">
                  {indiba.title}
                </h3>
                <h4 className="text-lg md:text-xl font-seasons italic text-[#bd7a58] mb-6">
                  {indiba.subtitle}
                </h4>
                <p className="text-neutral-500 font-sans font-light leading-relaxed text-sm md:text-base mb-6">
                  {indiba.desc}
                </p>
                <div className="p-4 bg-[#ece8e1]/30 border-l-2 border-[#bd7a58] text-xs italic text-neutral-500 rounded-r-xl leading-relaxed mb-6 font-sans">
                  "{indiba.note}"
                </div>

              </div>

              <div className="w-full lg:w-[55%] grid grid-cols-1 gap-4">
                {indiba.breakdowns.map((bk, idx) => (
                  <div key={idx} className="flex gap-4 p-5 bg-white border border-neutral-100 shadow-sm rounded-2xl">
                    <img src={bk.img} className="w-20 h-20 rounded-xl object-cover grayscale" crossOrigin="anonymous" referrerPolicy="no-referrer" alt={bk.name} />
                    <div>
                      <span className="text-brand-orange text-[9px] font-bold tracking-widest uppercase mb-1 block">
                        {bk.step}
                      </span>
                      <h4 className="font-monument text-xs text-[#2c1d11] uppercase mb-1">
                        {bk.name}
                      </h4>
                      <p className="text-xs text-neutral-500 font-sans font-light leading-relaxed">
                        {bk.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-neutral-200" />

            {/* EMSculpt Section */}
            <div className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-20 rc-fade-in items-start">
              <div className="w-full lg:w-[45%]">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#ece8e1] rounded-full text-[10px] font-bold uppercase tracking-wider text-brand-orange mb-4">
                  <Sparkles className="w-3 h-3" /> [ {emsculpt.id} // {emsculpt.category} ]
                </span>
                <h3 className="text-3xl md:text-4xl font-monument uppercase text-[#2c1d11] leading-none mb-2">
                  {emsculpt.title}
                </h3>
                <h4 className="text-lg md:text-xl font-seasons italic text-[#bd7a58] mb-6">
                  {emsculpt.subtitle}
                </h4>
                <p className="text-neutral-500 font-sans font-light leading-relaxed text-sm md:text-base mb-6">
                  {emsculpt.desc}
                </p>
                <div className="p-4 bg-[#ece8e1]/30 border-l-2 border-[#bd7a58] text-xs italic text-neutral-500 rounded-r-xl leading-relaxed mb-6 font-sans">
                  "{emsculpt.note}"
                </div>

              </div>

              <div className="w-full lg:w-[55%] grid grid-cols-1 gap-4">
                {emsculpt.breakdowns.map((bk, idx) => (
                  <div key={idx} className="flex gap-4 p-5 bg-white border border-neutral-100 shadow-sm rounded-2xl">
                    <img src={bk.img} className="w-20 h-20 rounded-xl object-cover grayscale" crossOrigin="anonymous" referrerPolicy="no-referrer" alt={bk.name} />
                    <div>
                      <span className="text-brand-orange text-[9px] font-bold tracking-widest uppercase mb-1 block">
                        {bk.step}
                      </span>
                      <h4 className="font-monument text-xs text-[#2c1d11] uppercase mb-1">
                        {bk.name}
                      </h4>
                      <p className="text-xs text-neutral-500 font-sans font-light leading-relaxed">
                        {bk.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
