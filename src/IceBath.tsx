import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Helmet } from 'react-helmet-async';
import { Snowflake, Thermometer, HeartPulse, Brain, ArrowRight } from 'lucide-react';
import { useRegistration } from './RegistrationContext';

gsap.registerPlugin(ScrollTrigger);

const BENEFITS = [
  {
    id: '01',
    icon: Thermometer,
    title: '3°C',
    subtitle: 'Nhiệt Độ Tối Ưu',
    description: 'Kích hoạt phản ứng sinh tồn mạnh mẽ nhất của cơ thể. Tăng cường hệ miễn dịch và đánh thức mọi giác quan.',
    accent: '#bd7a58',
  },
  {
    id: '02',
    icon: HeartPulse,
    title: 'PHỤC HỒI',
    subtitle: 'Siêu Tốc',
    description: 'Đánh bay axit lactic, giảm sưng viêm tức thì. Chìa khóa vàng để các vận động viên đỉnh cao luôn giữ phong độ.',
    accent: '#bd7a58',
  },
  {
    id: '03',
    icon: Brain,
    title: 'KỶ LUẬT',
    subtitle: 'Tinh Thần Thép',
    description: 'Khi bạn làm chủ được hơi thở trong nước đá, bạn sẽ làm chủ được mọi khó khăn ngoài đời thực.',
    accent: '#bd7a58',
  },
];

const STATS = [
  { value: '400%', label: 'Tăng Norepinephrine' },
  { value: '3°C', label: 'Nhiệt Độ Nước' },
  { value: '15 phút', label: 'Mỗi Liệu Trình' },
  { value: '100%', label: 'Tự Nhiên & An Toàn' },
];

export default function IceBath() {
  const container = useRef<HTMLDivElement>(null);
  const { openModal } = useRegistration();

  useGSAP(() => {
    // Simple, gentle fade-in animations on scroll
    gsap.utils.toArray('.fade-in-el').forEach((el: any) => {
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
  }, { scope: container });

  return (
    <div ref={container} className="bg-[#fdfbf9] text-[#1a100c] font-sans selection:bg-[#bd7a58] selection:text-white min-h-screen pb-20">
      <Helmet>
        <title>Ice Bath Therapy | Active Fox</title>
        <meta name="description" content="Liệu pháp ngâm đá lạnh giúp phục hồi cơ bắp, tăng cường hệ miễn dịch và rèn luyện tinh thần thép." />
      </Helmet>

      {/* 1. Hero Section */}
      <section className="relative w-full h-[55vh] md:h-[65vh] flex items-center justify-center overflow-hidden bg-black text-white">
        <div className="absolute inset-0 w-full h-full z-0">
          <img 
            src="https://i.postimg.cc/9Xk1ZQ5D/DSC06431.jpg" 
            alt="Ice Bath Therapy" 
            className="w-full h-full object-cover grayscale-[20%] brightness-50" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fdfbf9] via-transparent to-transparent opacity-95"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange/20 border border-brand-orange/30 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-[#bd7a58] mb-6">
            <Snowflake className="w-3.5 h-3.5" /> Ice Bath Experience
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-monument uppercase tracking-tighter leading-[1.1] mb-4">
            ICE BATH THERAPY
          </h1>
          <p className="text-[#bd7a58] text-xs md:text-sm font-monument tracking-[0.3em] uppercase">
            Hồi Sinh · Phục Hồi · Vượt Giới Hạn
          </p>
        </div>
      </section>

      {/* 2. Intro Section */}
      <section className="py-20 max-w-5xl mx-auto px-6 text-center fade-in-el">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-monument uppercase leading-tight tracking-tight text-[#2c1d11] max-w-4xl mx-auto">
          Không chỉ là liệu pháp. <br />
          <span className="text-[#bd7a58] italic font-seasons lowercase font-normal">Đây là cuộc cách mạng</span> cho cơ thể và tinh thần của bạn.
        </h2>
        <p className="mt-8 text-neutral-500 font-sans font-light text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Liệu pháp ngâm nước đá lạnh tại Active Fox được khoa học thể thao chứng minh giúp tối ưu hóa phục hồi cơ bắp, giải tỏa căng thẳng thần kinh và rèn luyện tính kỷ luật tự thân vượt trội.
        </p>
      </section>

      {/* 3. Science Stats Row */}
      <section className="py-12 border-y border-neutral-200 bg-[#ece8e1]/40 fade-in-el">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <span className="text-4xl md:text-5xl font-monument tracking-tighter text-[#2c1d11] font-bold">
                {stat.value}
              </span>
              <span className="mt-2.5 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] text-neutral-500">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Benefits Section (Steel Saigon 3-Column Grid) */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 fade-in-el">
          <span className="text-[#bd7a58] text-xs font-monument tracking-[0.3em] uppercase mb-4 block">Lợi Ích Sinh Học</span>
          <h2 className="text-3xl md:text-4xl font-monument uppercase tracking-tight text-[#2c1d11]">TẠI SAO BẠN NÊN NGÂM ĐÁ?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 fade-in-el">
          {BENEFITS.map((b) => (
            <div 
              key={b.id} 
              className="bg-white border border-neutral-200 rounded-3xl p-8 shadow-sm flex flex-col hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#ece8e1] flex items-center justify-center mb-6">
                <b.icon className="w-6 h-6 text-[#bd7a58]" />
              </div>
              <span className="text-[#bd7a58] text-xs font-bold uppercase tracking-[0.2em] mb-2">{b.subtitle}</span>
              <h3 className="text-3xl font-monument uppercase text-[#2c1d11] tracking-tight mb-4">{b.title}</h3>
              <p className="text-neutral-500 font-sans font-light text-sm md:text-base leading-relaxed">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="max-w-6xl mx-auto px-6 py-8 fade-in-el">
        <div className="bg-[#ece8e1] rounded-[2.5rem] p-10 md:p-16 flex flex-col items-center justify-center text-center relative overflow-hidden border border-neutral-200">
          <h2 className="text-4xl md:text-6xl font-monument uppercase text-[#2c1d11] tracking-tighter leading-none mb-6">
            BẮT ĐẦU PHỤC HỒI
          </h2>
          <p className="text-neutral-600 font-sans font-light text-base max-w-lg mb-10 leading-relaxed">
            Đặt lịch trải nghiệm bồn ngâm đá lạnh chuẩn y khoa tại Active Fox ngay hôm nay. Vượt qua giới hạn bản thân và hồi sinh thể lực thần tốc.
          </p>
          <button 
            onClick={() => openModal()}
            className="group relative overflow-hidden inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#1a100c] text-white font-bold text-xs uppercase tracking-[0.2em] shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-3">
              Đặt Lịch Trải Nghiệm
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
