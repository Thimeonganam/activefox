import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LPHeader } from "./components/LPHeader";
import { LPFooter } from "./components/LPFooter";
import { LPForm } from "./components/LPForm";
import { ShieldCheck, Flame, Heart, Zap, Footprints, Target, HelpCircle, ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function FoxRunLP() {
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
    { q: "Tôi chưa bao giờ chạy bộ, có theo được lớp không?", a: "Hoàn toàn theo được! Lớp tập được thiết kế phân cấp quãng đường và tốc độ (pace) theo nhóm nhỏ. Giáo án hướng dẫn trực tiếp từ các kỹ thuật tiếp đất, nhấc chân cơ bản nhất nên rất an toàn và thân thiện cho người mới bắt đầu." },
    { q: "Lớp chạy bộ này tập luyện ở trong nhà hay ngoài trời?", a: "Chúng tôi kết hợp linh hoạt cả hai! Các buổi tập kỹ thuật bổ trợ sức mạnh cơ chân và chạy cự ly ngắn (sprint) sẽ diễn ra trong phòng tập chuyên nghiệp với thảm chạy cao cấp. Các buổi chạy bền nâng cao sẽ được HLV dẫn dắt ngoài trời tại khu vực Sala thoáng mát, an toàn." },
    { q: "Lớp chạy bộ của Active Fox giúp cải thiện thành tích như thế nào?", a: "Nhờ sự kết hợp giữa kỹ thuật tiếp đất tối ưu (tránh dội lực chấn thương), các bài tập nhịp thở (aerobic base) để tăng sức bền phổi và bài tập bổ trợ sức mạnh cơ (như cơ mông đùi trước bắp chân), bạn sẽ chạy nhanh hơn, tốn ít sức hơn và hạn chế tối đa đau mỏi chân." }
  ];

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div ref={containerRef} className="w-full bg-[#070707] text-white font-sans selection:bg-[#FF3333] selection:text-white pt-20 overflow-hidden">
      <LPHeader />

      {/* 1. HERO SECTION: DYNAMIC ANGULAR SPEED-TECH */}
      <section className="relative w-full min-h-[95vh] flex items-center justify-center py-16 md:py-24 overflow-hidden border-b border-white/5 bg-gradient-to-br from-neutral-950 via-[#070707] to-neutral-900">
        {/* Angular Kinetic Diagonal Accent */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#FF3333]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-red-800/5 rounded-full blur-[150px] pointer-events-none"></div>
        
        {/* Visual angled stripe background mockup */}
        <div className="absolute top-0 right-0 w-[45%] h-full bg-neutral-900/40 -skew-x-12 transform origin-top-right border-l border-white/5 pointer-events-none hidden lg:block"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Side: Dynamic Speed Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1f0505] border border-[#FF3333]/20 text-[#FF3333] text-[9px] md:text-[10px] font-monument tracking-[0.25em] uppercase rounded-full mb-8 self-start shadow-[0_0_20px_rgba(255,51,51,0.15)]">
              <span className="w-1.5 h-1.5 bg-[#FF3333] rounded-full animate-pulse"></span>
              ACTIVE FOX ATHLETIC CLINIC
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-monument uppercase tracking-tight leading-[1.0] mb-8 text-white">
              SỬA DÁNG CHẠY, <br/>
              <span className="text-[#FF3333] font-seasons italic lowercase font-normal">phát triển sức bền</span> <br/>
              TIM MẠCH VƯỢT TRỘI
            </h1>
            
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-10 max-w-xl font-light">
              Lớp **Fox Run** chuyên biệt giúp bạn kiến tạo dáng chạy cơ động, bóc tách các điểm thở loạn nhịp, sửa đổi lỗi gót dội gối gây đau mỏi cơ xương khớp. Hãy bứt phá kỷ lục Pace cá nhân cùng các Coach chuyên nghiệp.
            </p>

            {/* Spec grid cards */}
            <div className="grid grid-cols-2 gap-4 max-w-lg border-t border-white/10 pt-8">
              <div className="bg-neutral-900/30 border border-white/5 p-4 rounded-xl">
                <span className="text-[9px] font-monument tracking-widest text-neutral-500 uppercase block mb-1">PHƯƠNG PHÁP CHUYÊN SÂU</span>
                <span className="text-sm font-monument uppercase text-white font-bold">INTERVALS & BREATHING</span>
              </div>
              <div className="bg-neutral-900/30 border border-white/5 p-4 rounded-xl">
                <span className="text-[9px] font-monument tracking-widest text-neutral-500 uppercase block mb-1">Ưu đãi trải nghiệm</span>
                <span className="text-sm font-monument uppercase text-[#FF3333] font-bold">GIẢM 50% HÔM NAY</span>
              </div>
            </div>
          </div>

          {/* Right Side: Form Card with Red theme */}
          <div className="lg:col-span-5 w-full" id="booking-form">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FF3333] to-[#e60000] rounded-[32px] blur-xl opacity-20 pointer-events-none"></div>
              <LPForm source="Lớp Fox Run LP" offerText="ƯU ĐÃI TRẢI NGHIỆM GIẢM 50%" themeColor="red" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. RUNNING FORM ASSESSMENT COMPARISON */}
      <section className="py-28 max-w-6xl mx-auto px-6 lp-fade border-b border-white/5">
        <div className="text-center mb-16">
          <span className="text-[#FF3333] text-[9px] font-monument tracking-[0.3em] uppercase mb-4 block">[ PHÂN TÍCH CHUYỂN ĐỘNG ]</span>
          <h2 className="text-3xl md:text-5xl font-monument uppercase tracking-tight text-white mb-6">
            BẢNG ĐÁNH GIÁ DÁNG CHẠY HỌC
          </h2>
          <p className="text-neutral-400 text-xs md:text-sm font-light max-w-xl mx-auto leading-relaxed">
            Chạy bộ sai cách là nguyên nhân lớn nhất tích tụ các vi chấn thương cổ chân, khớp gối và cột sống thắt lưng.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Box Left: Common Mistakes (Warning Red) */}
          <div className="bg-[#1a0505]/40 border border-red-500/10 p-8 rounded-3xl relative">
            <div className="absolute top-6 right-6">
              <AlertTriangle className="w-5 h-5 text-red-500/60" />
            </div>
            <h3 className="font-monument text-xs md:text-sm tracking-wide text-red-500 uppercase mb-8">
              ⚠️ LỖI SAI CHÍ MẠNG (Tự Tập Chạy)
            </h3>
            
            <div className="space-y-6">
              <div className="border-b border-red-500/10 pb-4">
                <span className="text-[10px] text-red-400 font-bold block mb-1">01 / ĐÁP GÓT CHÂN CHẤN THƯƠNG</span>
                <p className="text-neutral-300 text-xs leading-relaxed font-light">
                  Đưa bàn chân sải quá xa về trước, tiếp đất bằng gót chân gây dội toàn bộ lực va đập lớn gấp 3 lần trọng lượng cơ thể trực tiếp lên khớp gối, gây đau ống đồng (shin splints).
                </p>
              </div>

              <div className="border-b border-red-500/10 pb-4">
                <span className="text-[10px] text-red-400 font-bold block mb-1">02 / GÙ VAI - GẬP HÔNG TỐN SỨC</span>
                <p className="text-neutral-300 text-xs leading-relaxed font-light">
                  Chạy gập lưng cúi mặt, tay đánh chéo ngang lồng ngực làm hẹp thể tích lồng ngực, phổi không thể giãn nở tối đa gây hụt hơi sớm và giảm tốc độ.
                </p>
              </div>

              <div className="pb-2">
                <span className="text-[10px] text-red-400 font-bold block mb-1">03 / LOẠN NHỊP THỞ - QUÁ TẢI TIM</span>
                <p className="text-neutral-300 text-xs leading-relaxed font-light">
                  Chạy theo cảm hứng, nhịp thở đứt quãng làm tim đập quá nhanh chạm ngưỡng Zone 5 (Kiệt sức) chỉ sau 1-2km đầu tiên buộc phải dừng lại đi bộ.
                </p>
              </div>
            </div>
          </div>

          {/* Box Right: Active Fox Solution (Energetic Tech Accent) */}
          <div className="bg-neutral-900/30 border border-white/5 p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF3333]/5 rounded-full blur-3xl pointer-events-none"></div>
            <h3 className="font-monument text-xs md:text-sm tracking-wide text-[#FF3333] uppercase mb-8">
              🏃 DÁNG CHẠY CHUẨN (HLV ACTIVE FOX)
            </h3>
            
            <div className="space-y-6">
              <div className="border-b border-white/5 pb-4">
                <span className="text-[10px] text-white font-bold block mb-1">01 / TIẾP ĐẤT NỬA BÀN CHÂN TRÊN</span>
                <p className="text-neutral-400 text-xs leading-relaxed font-light">
                  Đáp đất thẳng dưới trọng tâm cơ thể bằng vùng giữa/trên bàn chân (Midfoot strike), tận dụng tối đa cơ bắp chân làm phuộc nhún lò xo giảm chấn thương.
                </p>
              </div>

              <div className="border-b border-white/5 pb-4">
                <span className="text-[10px] text-white font-bold block mb-1">02 / TRỤC NGƯỜI THẲNG NGHIÊNG NHẸ</span>
                <p className="text-neutral-400 text-xs leading-relaxed font-light">
                  Giữ thẳng trục cổ-lưng-hông, đổ nhẹ người về trước từ mắt cá chân giúp tận dụng trọng lực đẩy tự nhiên, tay đánh vuông góc bổ trợ động cơ chuyển động.
                </p>
              </div>

              <div className="pb-2">
                <span className="text-[10px] text-white font-bold block mb-1">03 / CHẠY THEO PHÂN VÙNG NHỊP TIM</span>
                <p className="text-neutral-400 text-xs leading-relaxed font-light">
                  Huấn luyện kỹ thuật thở đều 2:2 hoặc 3:3 kết hợp kiểm soát tim trong vùng Zone 2 (Aerobic Base), xây dựng buồng phổi thép để chạy bền bỉ hàng chục km không kiệt sức.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABC DRILLS: KINETIC BLOCKS (2x2 Grid with heavy borders) */}
      <section className="py-28 bg-[#0d0d0d] border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 lp-fade">
            <span className="text-[#FF3333] text-[9px] font-monument tracking-[0.3em] uppercase mb-4 block">FOX RUN CURRICULUM</span>
            <h2 className="text-3xl md:text-4xl font-monument uppercase tracking-tight text-white mb-6">
              KHUNG HUẤN LUYỆN CHẠY BỘ KHỎE - ĐẸP - BỀN
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Block 1 */}
            <div className="bg-black border-2 border-neutral-900 p-8 rounded-2xl relative hover:border-[#FF3333]/20 transition-colors group">
              <span className="text-5xl font-monument font-bold text-neutral-800 italic block mb-6 group-hover:text-[#FF3333]/30 transition-colors">/01</span>
              <span className="text-[#FF3333] font-mono text-[10px] tracking-wider uppercase block mb-1">[ KỸ THUẬT ABC DRILLS ]</span>
              <h3 className="font-monument text-xs md:text-sm uppercase text-white mb-3">Hiệu chỉnh dáng chạy cơ bản</h3>
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light">
                Bài tập nâng cao đùi (A-skip), gót chạm mông (B-skip), chạy bước nhỏ (C-skip) củng cố lại sự liên kết của hệ thần kinh vận động và nhịp tiếp đất chuẩn xác.
              </p>
            </div>

            {/* Block 2 */}
            <div className="bg-black border-2 border-neutral-900 p-8 rounded-2xl relative hover:border-[#FF3333]/20 transition-colors group">
              <span className="text-5xl font-monument font-bold text-neutral-800 italic block mb-6 group-hover:text-[#FF3333]/30 transition-colors">/02</span>
              <span className="text-[#FF3333] font-mono text-[10px] tracking-wider uppercase block mb-1">[ PACING & ZONE 2 ]</span>
              <h3 className="font-monument text-xs md:text-sm uppercase text-white mb-3">Kiến tạo buồng phổi thép bền bỉ</h3>
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light">
                Xây dựng nhịp Pace ổn định theo giáo trình nhịp tim Zone 2 chuyên nghiệp. Tối ưu khả năng hấp thụ oxy (VO2 Max), rèn tim đập chậm bền bỉ dưới áp lực mệt mỏi đường dài.
              </p>
            </div>

            {/* Block 3 */}
            <div className="bg-black border-2 border-neutral-900 p-8 rounded-2xl relative hover:border-[#FF3333]/20 transition-colors group">
              <span className="text-5xl font-monument font-bold text-neutral-800 italic block mb-6 group-hover:text-[#FF3333]/30 transition-colors">/03</span>
              <span className="text-[#FF3333] font-mono text-[10px] tracking-wider uppercase block mb-1">[ STRENGTH & CORE ]</span>
              <h3 className="font-monument text-xs md:text-sm uppercase text-white mb-3">Bổ trợ sức mạnh nhóm cơ chạy bộ</h3>
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light">
                Tập trung gia cố các nhóm cơ mông nhỡ (gluteus medius), cơ đùi trước, bắp chân và cơ trung tâm (Core) để bảo vệ tối đa đĩa đệm gối và định hình lưng thẳng khi chạy mệt.
              </p>
            </div>

            {/* Block 4 */}
            <div className="bg-black border-2 border-neutral-900 p-8 rounded-2xl relative hover:border-[#FF3333]/20 transition-colors group">
              <span className="text-5xl font-monument font-bold text-neutral-800 italic block mb-6 group-hover:text-[#FF3333]/30 transition-colors">/04</span>
              <span className="text-[#FF3333] font-mono text-[10px] tracking-wider uppercase block mb-1">[ SPEED INTERVALS ]</span>
              <h3 className="font-monument text-xs md:text-sm uppercase text-white mb-3">Biến tốc bứt phá Pace chạy</h3>
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light">
                Các tổ hợp chạy biến tốc cự ly ngắn từ 400m - 800m đầy phấn khích, kích thích sự thích nghi của các sợi cơ rút nhanh, nâng cao ngưỡng hiếu khí tối đa của hệ vận động.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STRAPA / GARMIN PERFORMANCE DASHBOARD (Visual Mockups) */}
      <section className="py-28 max-w-5xl mx-auto px-6 lp-fade border-b border-white/5">
        <div className="text-center mb-16">
          <span className="text-[#FF3333] text-[9px] font-monument tracking-[0.3em] uppercase mb-4 block">ATHLETIC DASHBOARD</span>
          <h2 className="text-2xl md:text-3xl font-monument uppercase tracking-tight text-white mb-4">
            CHỈ SỐ THỂ THAO ĐẤP NỔI BẬT
          </h2>
          <p className="text-neutral-400 text-xs font-light max-w-md mx-auto leading-relaxed">
            Học viên sẽ được HLV theo dõi và cân chỉnh các chỉ số chuyển động thực tế trên thiết bị đeo thông minh.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Metric 1 */}
          <div className="bg-[#121212] border border-white/5 p-6 rounded-2xl text-center">
            <span className="text-[10px] text-neutral-500 font-monument block mb-2 uppercase tracking-widest">TẦN SỐ SẢI CHÂN</span>
            <span className="text-4xl font-monument text-white font-extrabold block mb-1">180</span>
            <span className="text-[#FF3333] text-[9px] font-monument tracking-wider uppercase block">Cadence chuẩn phục hồi</span>
          </div>

          {/* Metric 2 */}
          <div className="bg-[#121212] border border-white/5 p-6 rounded-2xl text-center">
            <span className="text-[10px] text-neutral-500 font-monument block mb-2 uppercase tracking-widest">PHÂN PHỐI LỰC NHỊP</span>
            <span className="text-4xl font-monument text-white font-extrabold block mb-1">50/50</span>
            <span className="text-[#FF3333] text-[9px] font-monument tracking-wider uppercase block">Cân bằng trái/phải tối ưu</span>
          </div>

          {/* Metric 3 */}
          <div className="bg-[#121212] border border-white/5 p-6 rounded-2xl text-center">
            <span className="text-[10px] text-neutral-500 font-monument block mb-2 uppercase tracking-widest">NHỊP TIM AN TOÀN</span>
            <span className="text-4xl font-monument text-white font-extrabold block mb-1">ZONE 2</span>
            <span className="text-[#FF3333] text-[9px] font-monument tracking-wider uppercase block">Ngưỡng hiếu khí bền bỉ nhất</span>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE FAQs */}
      <section className="py-28 bg-[#0a0a0a] border-t border-white/5 lp-fade">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <HelpCircle className="w-8 h-8 text-[#FF3333] mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-monument uppercase tracking-tight text-white">HỎI ĐÁP LỚP FOX RUN</h2>
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
                    <ChevronUp className="w-4 h-4 text-[#FF3333] shrink-0" />
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#FF3333]/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center">
          <span className="text-[#FF3333] text-[10px] font-monument tracking-[0.3em] uppercase mb-4 block">[ CHINH PHỤC PACE CHẠY MỚI ]</span>
          <h2 className="text-3xl md:text-5xl font-monument uppercase tracking-tighter leading-tight mb-8">
            BẮT ĐẦU CHẠY ĐÚNG KỸ THUẬT VÀ <br/>
            KIẾN TẠO BUỒNG PHỔI KHỎE MẠNH!
          </h2>
          <p className="text-neutral-400 text-sm font-light max-w-xl mb-12">
            Đăng ký trải nghiệm buổi Fox Run đầu tiên ngay hôm nay nhận ưu đãi **GIẢM 50%**. Huấn luyện viên chuyên môn sẽ chỉnh dáng chạy trực tiếp cho bạn!
          </p>
          
          <button 
            onClick={() => {
              const formElement = document.getElementById("booking-form");
              if (formElement) formElement.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-10 py-5 bg-[#FF3333] hover:bg-red-600 text-white transition-all rounded-full font-monument text-xs uppercase tracking-widest font-bold shadow-lg shadow-red-600/10 cursor-pointer"
          >
            ĐĂNG KÝ TRẢI NGHIỆM FOX RUN NGAY
          </button>
        </div>
      </section>

      <LPFooter />
    </div>
  );
}
