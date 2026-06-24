import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LPHeader } from "./components/LPHeader";
import { LPFooter } from "./components/LPFooter";
import { LPForm } from "./components/LPForm";
import { Flame, ShieldCheck, Target, Heart, Zap, Award, HelpCircle, ChevronDown, ChevronUp, Layers, Dumbbell, Compass, Crosshair } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HyroxLP() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useGSAP(() => {
    gsap.utils.toArray('.lp-fade').forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          }
        }
      );
    });
  }, { scope: containerRef });

  const faqs = [
    { q: "Tôi chưa từng thi đấu HYROX có tham gia tập luyện được không?", a: "Hoàn toàn được! Lớp tập HYROX tại Active Fox phân tách độ nặng của tạ và tốc độ chạy phù hợp với mọi cấp độ thể lực (từ Fitness Enthusiasts đến Pro Racers). Giáo án giúp bạn xây dựng thể lực lai (Hybrid Fitness) từ những bước cơ bản nhất." },
    { q: "Thiết bị tập luyện lớp HYROX gồm những gì?", a: "Lớp học được trang bị đầy đủ các máy móc tiêu chuẩn thi đấu HYROX thế giới như: Sled (xe trượt đẩy/kéo), Máy chèo thuyền Concept2 Rowers, Máy trượt tuyết SkiErgs, Dumble/Kettlebell, bóng tạ Wall Ball và thảm chạy chuyên dụng." },
    { q: "Tập luyện HYROX giúp ích gì cho các môn thể thao khác?", a: "HYROX xây dựng sức bền tim mạch cực đại (Aerobic Engine) kết hợp sức bền cơ bắp dưới áp lực mệt mỏi cực lớn (Leg day under fatigue). Điều này giúp bạn có nền tảng thể lực vượt trội, dai sức hơn rất nhiều khi chơi các bộ môn như Pickleball, Chạy bộ hay Đá bóng." }
  ];

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div ref={containerRef} className="w-full bg-[#080808] text-white font-sans selection:bg-yellow-500 selection:text-black pt-20 overflow-hidden">
      <LPHeader />

      {/* 1. HERO SECTION: INDUSTRIAL STENCIL */}
      <section className="relative w-full min-h-[95vh] flex items-center justify-center py-16 md:py-24 overflow-hidden border-b border-white/5 bg-gradient-to-b from-[#111111]/30 to-[#080808]">
        {/* Glow warning ambient lights */}
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-yellow-500/5 rounded-full blur-[130px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-yellow-600/5 rounded-full blur-[160px] pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Side: Stencil Power Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1b1a03] border border-yellow-500/20 text-yellow-500 text-[9px] md:text-[10px] font-monument tracking-[0.25em] uppercase rounded-full mb-8 self-start shadow-[0_0_20px_rgba(255,222,0,0.1)]">
              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></span>
              ACTIVE FOX HYBRID ATHLETE CLASS
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-monument uppercase tracking-tight leading-[1.0] mb-8 text-white">
              SỨC BỀN CỰC ĐẠI, <br/>
              <span className="text-yellow-500 italic font-seasons lowercase font-normal">thể lực lai hybrid</span> <br/>
              CHINH PHỤC ĐẤU TRƯỜNG
            </h1>
            
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-10 max-w-xl font-light">
              Lớp tập **HYROX Training** kết hợp hoàn hảo giữa kỹ thuật chạy bền 1km và các bài tập chức năng nặng (Sled, Row, SkiErg, Wallball). Xây dựng một cỗ máy năng lượng bền bỉ, giúp bạn chinh phục mọi đấu trường thể lực toàn cầu.
            </p>

            {/* Spec grid cards */}
            <div className="grid grid-cols-2 gap-4 max-w-lg border-t border-white/10 pt-8">
              <div className="bg-neutral-900/30 border border-white/5 p-4 rounded-xl">
                <span className="text-[9px] font-monument tracking-widest text-neutral-500 uppercase block mb-1">MÔ PHỎNG THI ĐẤU</span>
                <span className="text-sm font-monument uppercase text-white font-bold">8 STATIONS STANDARD</span>
              </div>
              <div className="bg-neutral-900/30 border border-white/5 p-4 rounded-xl">
                <span className="text-[9px] font-monument tracking-widest text-neutral-500 uppercase block mb-1">Ưu đãi trải nghiệm</span>
                <span className="text-sm font-monument uppercase text-yellow-500 font-bold">GIẢM 50% HÔM NAY</span>
              </div>
            </div>
          </div>

          {/* Right Side: Form Card with Yellow theme */}
          <div className="lg:col-span-5 w-full" id="booking-form">
            <div className="relative">
              {/* Caution stripe-like border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-yellow-700 rounded-[32px] blur-xl opacity-20 pointer-events-none"></div>
              <LPForm source="Lớp HYROX LP" offerText="ƯU ĐÃI TRẢI NGHIỆM GIẢM 50%" themeColor="yellow" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. PREMIUM INDUSTRIAL BENTO GRID: THE 8 STATIONS */}
      <section className="py-28 max-w-6xl mx-auto px-6 lp-fade border-b border-white/5">
        <div className="text-center mb-16">
          <span className="text-yellow-500 text-[9px] font-monument tracking-[0.3em] uppercase mb-4 block">[ MA TRẬN 8 TRẠM HYROX ]</span>
          <h2 className="text-3xl md:text-5xl font-monument uppercase tracking-tight text-white mb-6">
            BẢN ĐỒ HUẤN LUYỆN 8 TRẠM TIÊU CHUẨN
          </h2>
          <p className="text-neutral-400 text-xs md:text-sm font-light max-w-xl mx-auto leading-relaxed">
            Học viên sẽ được rèn luyện sức bền tim mạch đan xen lực đẩy cơ bắp mô phỏng 100% sơ đồ thi đấu thế giới.
          </p>
        </div>

        {/* Bento Grid Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {/* Card 1: SkiErg (Span 4) */}
          <div className="md:col-span-4 bg-neutral-900/20 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-yellow-500/20 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="text-yellow-500 text-[10px] font-monument tracking-wider uppercase">[ TRẠM 01 ]</span>
                <Layers className="w-4 h-4 text-neutral-600" />
              </div>
              <h3 className="font-monument text-sm uppercase text-white mb-3">1000m SkiErg (Trượt tuyết)</h3>
              <p className="text-neutral-400 text-xs leading-relaxed font-light">
                Kỹ thuật gập tay kéo dứt khoát bổ trợ toàn bộ vùng cơ vai xô, cơ mông đùi sau. Tối ưu hóa nhịp thở và kích hoạt hệ hô hấp tim mạch ngay giây phút mở màn.
              </p>
            </div>
            <div className="mt-8 border-t border-white/5 pt-4 flex items-center justify-between">
              <span className="text-[9px] font-mono text-neutral-500 uppercase">Target Spec: Drag Factor 110-120</span>
              <span className="text-xs font-monument text-yellow-500 font-bold">1000 METERS</span>
            </div>
          </div>

          {/* Card 2: Sled Push (Span 2) */}
          <div className="md:col-span-2 bg-[#121212] border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-yellow-500/20 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="text-yellow-500 text-[10px] font-monument tracking-wider uppercase">[ TRẠM 02 ]</span>
                <Dumbbell className="w-4 h-4 text-neutral-600" />
              </div>
              <h3 className="font-monument text-sm uppercase text-white mb-3">50m Sled Push</h3>
              <p className="text-neutral-400 text-xs leading-relaxed font-light">
                Đẩy xe trượt tạ nặng tiêu chuẩn. Thử thách cực hạn lực đạp góc chân và sức bền đùi trước cơ đùi sau.
              </p>
            </div>
            <div className="mt-8 border-t border-white/5 pt-4 flex items-center justify-between">
              <span className="text-[9px] font-mono text-neutral-500 uppercase">Tạ nặng thi đấu</span>
              <span className="text-xs font-monument text-white font-bold">102kg - 152kg</span>
            </div>
          </div>

          {/* Card 3: Sled Pull (Span 2) */}
          <div className="md:col-span-2 bg-neutral-900/20 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-yellow-500/20 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="text-yellow-500 text-[10px] font-monument tracking-wider uppercase">[ TRẠM 03 ]</span>
                <Compass className="w-4 h-4 text-neutral-600" />
              </div>
              <h3 className="font-monument text-sm uppercase text-white mb-3">50m Sled Pull</h3>
              <p className="text-neutral-400 text-xs leading-relaxed font-light">
                Kéo xe trượt tạ nặng bằng dây thừng lớn. Gia cố vùng cơ bụng trung tâm (Core) và lực kéo lưng xô bám chặt sàn.
              </p>
            </div>
            <div className="mt-8 border-t border-white/5 pt-4 flex items-center justify-between">
              <span className="text-[9px] font-mono text-neutral-500 uppercase">Tạ nặng thi đấu</span>
              <span className="text-xs font-monument text-white font-bold">78kg - 103kg</span>
            </div>
          </div>

          {/* Card 4: Burpee Broad Jumps (Span 4) */}
          <div className="md:col-span-4 bg-[#121212] border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-yellow-500/20 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="text-yellow-500 text-[10px] font-monument tracking-wider uppercase">[ TRẠM 04 ]</span>
                <Crosshair className="w-4 h-4 text-neutral-600" />
              </div>
              <h3 className="font-monument text-sm uppercase text-white mb-3">80m Burpee Broad Jumps</h3>
              <p className="text-neutral-400 text-xs leading-relaxed font-light">
                Bài tập hít đất bật nhảy xa đầy thử thách. Kích hoạt toàn bộ hệ thống cơ dốc đứng plyometrics bùng nổ, rèn luyện sự bền bỉ tinh thần vượt trội khi phổi cạn oxy.
              </p>
            </div>
            <div className="mt-8 border-t border-white/5 pt-4 flex items-center justify-between">
              <span className="text-[9px] font-mono text-neutral-500 uppercase">Nhảy xa tiêu chuẩn</span>
              <span className="text-xs font-monument text-yellow-500 font-bold">80 METERS</span>
            </div>
          </div>

          {/* Card 5: Concept2 Row (Span 3) */}
          <div className="md:col-span-3 bg-[#121212] border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-yellow-500/20 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="text-yellow-500 text-[10px] font-monument tracking-wider uppercase">[ TRẠM 05 ]</span>
                <Layers className="w-4 h-4 text-neutral-600" />
              </div>
              <h3 className="font-monument text-sm uppercase text-white mb-3">1000m Rowing (Chèo xuồng)</h3>
              <p className="text-neutral-400 text-xs leading-relaxed font-light">
                Kỹ thuật chèo thuyền hơi Concept2 chuẩn xác giúp gia tăng nhịp tim tối đa bền bỉ mà không gây chấn thương các ổ khớp xương nhờ lực đạp phối hợp.
              </p>
            </div>
            <div className="mt-8 border-t border-white/5 pt-4 flex items-center justify-between">
              <span className="text-[9px] font-mono text-neutral-500 uppercase">Thiết bị thi đấu Concept 2</span>
              <span className="text-xs font-monument text-yellow-500 font-bold">1000 METERS</span>
            </div>
          </div>

          {/* Card 6: Farmers Carry (Span 3) */}
          <div className="md:col-span-3 bg-neutral-900/20 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-yellow-500/20 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="text-yellow-500 text-[10px] font-monument tracking-wider uppercase">[ TRẠM 06 ]</span>
                <Dumbbell className="w-4 h-4 text-neutral-600" />
              </div>
              <h3 className="font-monument text-sm uppercase text-white mb-3">200m Farmers Carry</h3>
              <p className="text-neutral-400 text-xs leading-relaxed font-light">
                Xách hai quả Kettlebell tạ nặng đi bộ. Rèn luyện sức nắm bàn tay (grip strength), độ thăng bằng trục hông và sức chịu đựng cơ vai gáy dưới fatigue lớn.
              </p>
            </div>
            <div className="mt-8 border-t border-white/5 pt-4 flex items-center justify-between">
              <span className="text-[9px] font-mono text-neutral-500 uppercase">Tạ ấm ấm thi đấu</span>
              <span className="text-xs font-monument text-white font-bold">2 x 16kg - 24kg</span>
            </div>
          </div>

          {/* Card 7: Sandbag Lunges (Span 3) */}
          <div className="md:col-span-3 bg-neutral-900/20 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-yellow-500/20 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="text-yellow-500 text-[10px] font-monument tracking-wider uppercase">[ TRẠM 07 ]</span>
                <Compass className="w-4 h-4 text-neutral-600" />
              </div>
              <h3 className="font-monument text-sm uppercase text-white mb-3">100m Sandbag Lunges</h3>
              <p className="text-neutral-400 text-xs leading-relaxed font-light">
                Vác bao cát tạ nặng trên vai chùng chân bước tiến. Thử thách bóp nghẹt toàn bộ thớ cơ đùi trước đùi sau khi đùi đã hoàn toàn kiệt quệ sau 7 trạm.
              </p>
            </div>
            <div className="mt-8 border-t border-white/5 pt-4 flex items-center justify-between">
              <span className="text-[9px] font-mono text-neutral-500 uppercase">Bao cát nặng thi đấu</span>
              <span className="text-xs font-monument text-white font-bold">10kg - 30kg</span>
            </div>
          </div>

          {/* Card 8: Wall Balls (Span 3) */}
          <div className="md:col-span-3 bg-[#121212] border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-yellow-500/20 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="text-yellow-500 text-[10px] font-monument tracking-wider uppercase">[ TRẠM 08 ]</span>
                <Crosshair className="w-4 h-4 text-neutral-600" />
              </div>
              <h3 className="font-monument text-sm uppercase text-white mb-3">75 - 100 Wall Balls</h3>
              <p className="text-neutral-400 text-xs leading-relaxed font-light">
                Squat sâu gánh bóng tạ ném thẳng vào bia đích cao 3m. Trạm thi đấu cuối cùng đốt cháy toàn bộ năng lượng dư thừa, đòi hỏi sự bền bỉ cơ bắp tuyệt đối để kết thúc chặng đua.
              </p>
            </div>
            <div className="mt-8 border-t border-white/5 pt-4 flex items-center justify-between">
              <span className="text-[9px] font-mono text-neutral-500 uppercase">Bóng tạ đích chuẩn</span>
              <span className="text-xs font-monument text-yellow-500 font-bold">75 - 100 REPS</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE HYBRID ENGINE COMPARATIVE MEASURE */}
      <section className="py-28 bg-[#0b0b0b] border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16 lp-fade">
            <span className="text-yellow-500 text-[9px] font-monument tracking-[0.3em] uppercase mb-4 block">ENERGY SCALING</span>
            <h2 className="text-2xl md:text-3xl font-monument uppercase tracking-tight text-white mb-4">
              CƠ THỂ CỦA MỘT HYBRID ATHLETE
            </h2>
            <p className="text-neutral-400 text-xs font-light max-w-md mx-auto leading-relaxed">
              Bạn có sức mạnh tạ của dân Gym lẫn sức bền buồng phổi của dân chạy bộ? Đó chính là thể lực lai Hybrid!
            </p>
          </div>

          <div className="space-y-6 max-w-2xl mx-auto">
            {/* Bar 1 */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-monument uppercase tracking-wider text-white">1. SỨC BỀN TIM MẠCH (Aerobic Engine)</span>
                <span className="text-xs font-monument text-yellow-500 font-bold">95%</span>
              </div>
              <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: "95%" }}></div>
              </div>
            </div>

            {/* Bar 2 */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-monument uppercase tracking-wider text-white">2. SỨC MẠNH CƠ BẮP (Lifting Power)</span>
                <span className="text-xs font-monument text-yellow-500 font-bold">85%</span>
              </div>
              <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>

            {/* Bar 3 */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-monument uppercase tracking-wider text-white">3. KHÁNG MỎI ĐÙI SAU (Fatigue Resistance)</span>
                <span className="text-xs font-monument text-yellow-500 font-bold">90%</span>
              </div>
              <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: "90%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CLINICAL PROOFS & BADGES */}
      <section className="py-28 max-w-6xl mx-auto px-6 lp-fade">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-white/10 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              className="w-full h-full object-cover grayscale brightness-90" 
              alt="Active Fox HYROX Athletes" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
          </div>

          <div>
            <span className="text-yellow-500 text-[9px] font-monument tracking-[0.3em] uppercase mb-4 block">[ TẬP LUYỆN CHUYÊN NGHIỆP ]</span>
            <h2 className="text-3xl md:text-4xl font-monument uppercase tracking-tight mb-8">
              BẢN ĐỒ TẬP COMPLEX ĐẠT CHUẨN ĐẤU TRƯỜNG THẾ GIỚI
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-yellow-500" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white uppercase mb-1 tracking-wider">Đội Ngũ Coach Đạt Chuẩn Đấu Trường</h4>
                  <p className="text-neutral-400 text-xs leading-relaxed font-light">
                    Các HLV đạt chứng chỉ chuyên môn cao về phức hợp thể lực lai (Hybrid Fitness), có chứng chỉ chính hãng từ các chuyên gia phong trào hàng đầu.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-yellow-500" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white uppercase mb-1 tracking-wider">Dàn Máy Móc Nhập Khẩu Đồng Bộ</h4>
                  <p className="text-neutral-400 text-xs leading-relaxed font-light">
                    Hệ thống máy SkiErgs, chèo thuyền Concept2 và xe trượt đẩy Sled chuẩn kích thước giúp bạn mô phỏng chính xác nhất áp lực thi đấu thực tế tại nhà.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 text-yellow-500" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white uppercase mb-1 tracking-wider">Chiến Thuật Pacing Phù Hợp Cho Từng Cá Nhân</h4>
                  <p className="text-neutral-400 text-xs leading-relaxed font-light">
                    Các HLV thiết kế chiến lược quản lý nhịp tim và phân phối thể lực tối ưu nhất phù hợp cho từng cá nhân, đẩy nhanh VO2 Max cực hạn mà không bị ngộp thở.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE FAQs */}
      <section className="py-28 bg-[#0a0a0a] border-t border-white/5 lp-fade">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <HelpCircle className="w-8 h-8 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-monument uppercase tracking-tight text-white">HỎI ĐÁP LỚP HYROX</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-white/5 rounded-2xl bg-black/40 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-neutral-900/20 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wide">
                    {idx + 1}. {faq.q}
                  </span>
                  {activeFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-yellow-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-500 shrink-0" />
                  )}
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    activeFaq === idx ? "max-h-[300px] border-t border-white/5 opacity-100 p-6" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CONVERSION ACTION */}
      <section className="py-32 bg-black border-t border-white/10 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-yellow-500/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center">
          <span className="text-yellow-500 text-[10px] font-monument tracking-[0.3em] uppercase mb-4 block">[ CHINH PHỤC ĐẤU SĨ HYBRID ]</span>
          <h2 className="text-3xl md:text-5xl font-monument uppercase tracking-tighter leading-tight mb-8">
            BẮT ĐẦU RÈN LUYỆN THỂ LỰC LAI <br/>
            VÀ CHINH PHỤC ĐỈNH CAO MỚI!
          </h2>
          <p className="text-neutral-400 text-sm font-light max-w-xl mb-12">
            Đăng ký trải nghiệm buổi HYROX đầu tiên ngay hôm nay nhận ngay ưu đãi **GIẢM 50%**. Đội ngũ cố vấn viên sẽ xếp lớp phù hợp với thể trạng riêng của bạn!
          </p>
          
          <button 
            onClick={() => {
              const formElement = document.getElementById("booking-form");
              if (formElement) formElement.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-10 py-5 bg-yellow-500 hover:bg-yellow-400 text-black transition-all rounded-full font-monument text-xs uppercase tracking-widest font-bold shadow-lg shadow-yellow-500/10 cursor-pointer"
          >
            ĐĂNG KÝ TRẢI NGHIỆM LỚP HYROX
          </button>
        </div>
      </section>

      <LPFooter />
    </div>
  );
}
