import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LPHeader } from "./components/LPHeader";
import { LPFooter } from "./components/LPFooter";
import { LPForm } from "./components/LPForm";
import { ShieldCheck, Dumbbell, Award, HelpCircle, ArrowRight, Zap, Target } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function SportsMassageLP() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Gentle opacity fade-in for premium look
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
    { q: "Liệu trình này có đau đớn không?", a: "Hoàn toàn không đau đớn khó chịu. Trước khi trị liệu, KTV chuyên sâu của Active Fox sẽ kiểm tra độ căng của cơ và trao đổi trực tiếp để điều chỉnh mức lực nhấn phù hợp nhất với ngưỡng chịu đựng của cơ thể bạn." },
    { q: "Tôi nên thực hiện Sports Massage khi nào?", a: "Thời điểm lý tưởng nhất là sau các buổi tập nặng (chạy dài, leg day, đánh giải pickleball) khoảng 2-24 tiếng để nhả cơ và đào thải axit lactic. Hoặc thực hiện định kỳ 1 tuần/lần để phòng ngừa chấn thương chủ động." },
    { q: "Sự khác biệt so với massage thư giãn thông thường là gì?", a: "Massage thư giãn chỉ tác động nhẹ trên bề mặt da. Sports Massage tại Active Fox tác động sâu vào các thớ cơ chìm, bóc tách các điểm kết dính mạc cơ (adhesions) và giải tỏa trực tiếp các nốt thắt cơ đau nhức (trigger points) bởi các Coach có kiến thức vật lý trị liệu." }
  ];

  return (
    <div ref={containerRef} className="w-full bg-black text-white font-sans selection:bg-brand-orange selection:text-white pt-20">
      <LPHeader />

      {/* 1. HERO: TECH-CLINICAL SPLIT */}
      <section className="relative w-full min-h-[95vh] flex items-center justify-center py-16 md:py-24 overflow-hidden border-b border-white/5 bg-gradient-to-b from-neutral-950 to-black">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-[#bd7a58]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-brand-orange/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left: Premium Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#120a06] border border-[#bd7a58]/20 text-[#bd7a58] text-[9px] md:text-[10px] font-monument tracking-[0.25em] uppercase rounded-full mb-8 self-start shadow-[0_0_20px_rgba(189,122,88,0.1)]">
              <span className="w-1.5 h-1.5 bg-[#bd7a58] rounded-full animate-ping"></span>
              ACTIVE FOX CLINICAL WELL-BEING
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-monument uppercase tracking-tight leading-[1.0] mb-8 text-white">
              GIẢM CĂNG CƠ, <br/>
              <span className="text-[#bd7a58] italic font-seasons lowercase font-normal">phục hồi nhanh</span> <br/>
              THÂN DƯỚI SAU TẬP
            </h1>
            
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-10 max-w-xl font-light">
              Liệu trình **Sport Massage 60 phút** chuyên biệt cho bộ môn Pickleball, Chạy bộ, Đạp xe. Giải tỏa axit lactic, bóc tách điểm nghẽn cơ khớp, giúp đôi chân nhẹ nhõm linh hoạt tức thì bởi đội ngũ KTV là các Coach vật lý trị liệu thể thao.
            </p>

            {/* Spec grid cards */}
            <div className="grid grid-cols-2 gap-4 max-w-lg border-t border-white/10 pt-8">
              <div className="bg-neutral-900/30 border border-white/5 p-4 rounded-xl">
                <span className="text-[9px] font-monument tracking-widest text-neutral-500 uppercase block mb-1">Thời lượng</span>
                <span className="text-sm font-monument uppercase text-white font-bold">60 PHÚT CHUYÊN SÂU</span>
              </div>
              <div className="bg-neutral-900/30 border border-white/5 p-4 rounded-xl">
                <span className="text-[9px] font-monument tracking-widest text-neutral-500 uppercase block mb-1">Ưu đãi trải nghiệm</span>
                <span className="text-sm font-monument uppercase text-brand-orange font-bold">ĐĂNG KÝ HẸN TRỰC TUYẾN</span>
              </div>
            </div>
          </div>

          {/* Right: Inline Form card */}
          <div className="lg:col-span-5 w-full" id="booking-form">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-orange to-[#bd7a58] rounded-[32px] blur-xl opacity-20 pointer-events-none"></div>
              <LPForm source="Sports Massage LP" offerText="ƯU ĐÃI TRẢI NGHIỆM ĐẶT LỊCH SỚM" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. CLINICAL DIALOGUE (STRIKING PAIN POINT LIST) */}
      <section className="py-28 max-w-7xl mx-auto px-6 lp-fade">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 flex flex-col justify-start">
            <span className="text-brand-orange text-[9px] font-monument tracking-[0.3em] uppercase mb-4 block">[ THỰC TRẠNG THỂ THAO ]</span>
            <h2 className="text-3xl md:text-5xl font-monument uppercase tracking-tighter leading-tight text-white mb-6">
              ĐỪNG ĐỂ CƠ THỂ BỊ QUÁ TẢI SAU MỖI BUỔI TẬP NẶNG
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed font-light mb-8">
              Chơi Pickleball, chạy bộ hay tập gym liên tục mà không giãn cơ đúng cách sẽ tích tụ vi chấn thương, dẫn đến các điểm co cứng cơ học (trigger points) chèn ép dây thần kinh và mạch máu.
            </p>
            <div className="w-16 h-[2px] bg-brand-orange"></div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="bg-neutral-900/30 border-l-2 border-brand-orange p-6 rounded-r-2xl hover:bg-neutral-900/50 transition-colors">
              <span className="text-[#bd7a58] text-xs font-monument block mb-2">[ ĐAU CĂNG BÓ CỨNG CHI DƯỚI ]</span>
              <p className="text-neutral-300 text-xs md:text-sm leading-relaxed font-light">
                Cơ đùi trước căng cứng, bắp chân co rút ê ẩm sau những buổi tập chạy bền hay tập chân (Leg day) khiến bước chân di chuyển hôm sau cực kỳ nặng nề, giảm hiệu suất.
              </p>
            </div>

            <div className="bg-neutral-900/30 border-l-2 border-[#bd7a58] p-6 rounded-r-2xl hover:bg-neutral-900/50 transition-colors">
              <span className="text-[#bd7a58] text-xs font-monument block mb-2">[ VIÊM KHUỶU TAY TENNIS ELBOW & ĐAU VAI ]</span>
              <p className="text-neutral-300 text-xs md:text-sm leading-relaxed font-light">
                Vung vợt liên tục khi chơi Pickleball, Tennis hay Badminton gây căng cơ vai gáy, mỏi cổ tay và nguy cơ chấn thương dây chằng khuỷu tay nếu không được nhả cơ mạc chuyên dụng.
              </p>
            </div>

            <div className="bg-neutral-900/30 border-l-2 border-white/20 p-6 rounded-r-2xl hover:bg-neutral-900/50 transition-colors">
              <span className="text-[#bd7a58] text-xs font-monument block mb-2">[ ĐAU CỔ VAI GÁY KINH NIÊN DO VĂN PHÒNG ]</span>
              <p className="text-neutral-300 text-xs md:text-sm leading-relaxed font-light">
                Ngồi lâu, gù lưng trước máy tính làm co rút nhóm cơ thang, kẹt khớp cổ vai gáy, giảm thiểu lượng máu lên não gây nhức đầu và uể oải triền miên.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VERTICAL TIMELINE LAYOUT FOR PROCESS */}
      <section className="py-28 bg-neutral-950 border-y border-white/5 relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20 lp-fade">
            <span className="text-brand-orange text-[9px] font-monument tracking-[0.3em] uppercase mb-4 block">CLINICAL TIMELINE</span>
            <h2 className="text-3xl md:text-4xl font-monument uppercase tracking-tight text-white">
              TIẾN TRÌNH LIỆU TRÌNH 60 PHÚT
            </h2>
          </div>

          <div className="relative pl-8 md:pl-16 border-l border-[#bd7a58]/20 space-y-16">
            {/* Step 1 */}
            <div className="relative lp-fade">
              <div className="absolute -left-[41px] md:-left-[73px] top-1.5 w-6 h-6 rounded-full bg-black border border-[#bd7a58] flex items-center justify-center z-10">
                <span className="w-2 h-2 bg-[#bd7a58] rounded-full"></span>
              </div>
              <span className="text-brand-orange font-monument text-[10px] tracking-wider uppercase block mb-1">01 / DÒ TÌM & KIỂM TRA CƠ</span>
              <h3 className="font-monument text-sm uppercase tracking-wide text-white mb-3">Kiểm tra cơ & Xác định điểm căng đau</h3>
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light">
                KTV/Coach thực hiện sờ nắn các dải cơ dọc bắp chân, đùi, vai gáy để dò tìm các nốt thắt cơ đau nhức (trigger points) và điểm bám dính mạc cơ gây cản trở chuyển động.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative lp-fade">
              <div className="absolute -left-[41px] md:-left-[73px] top-1.5 w-6 h-6 rounded-full bg-black border border-brand-orange flex items-center justify-center z-10">
                <span className="w-2 h-2 bg-brand-orange rounded-full"></span>
              </div>
              <span className="text-brand-orange font-monument text-[10px] tracking-wider uppercase block mb-1">02 / KÉO GIÃN THỤ ĐỘNG</span>
              <h3 className="font-monument text-sm uppercase tracking-wide text-white mb-3">Nhấn & Giãn cơ tĩnh (Static Stretch)</h3>
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light">
                Ứng dụng kỹ thuật giãn cơ tĩnh và kéo giãn thụ động từ chuyên gia giúp mở rộng biên độ cơ bắp bị co rút cơ học, giảm tải lực đè nén lên ổ khớp.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative lp-fade">
              <div className="absolute -left-[41px] md:-left-[73px] top-1.5 w-6 h-6 rounded-full bg-black border border-[#bd7a58] flex items-center justify-center z-10">
                <span className="w-2 h-2 bg-[#bd7a58] rounded-full"></span>
              </div>
              <span className="text-brand-orange font-monument text-[10px] tracking-wider uppercase block mb-1">03 / TRỊ LIỆU THỦ CÔNG CHUYÊN SÂU</span>
              <h3 className="font-monument text-sm uppercase tracking-wide text-white mb-3">Sports Massage chuyên biệt</h3>
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light">
                Sử dụng các động tác miết dải cơ dọc, ép nén mô sâu (deep tissue) giải phóng các co thắt cơ học, đào thải axit lactic tích tụ và tăng lượng máu nuôi dưỡng vùng cơ mệt mỏi.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative lp-fade">
              <div className="absolute -left-[41px] md:-left-[73px] top-1.5 w-6 h-6 rounded-full bg-black border border-brand-orange flex items-center justify-center z-10">
                <span className="w-2 h-2 bg-brand-orange rounded-full"></span>
              </div>
              <span className="text-brand-orange font-monument text-[10px] tracking-wider uppercase block mb-1">04 / BÓC TÁCH MẠC CƠ LÂM SÀNG</span>
              <h3 className="font-monument text-sm uppercase tracking-wide text-white mb-3">Giải phóng mạc cơ chuyên dụng IASTM</h3>
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light">
                Sử dụng bộ công cụ dao chải thép không gỉ chuyên dụng giúp bóc tách màng bao bọc cơ bị kết dính (fascia adhesions), kích hoạt sự đàn hồi tự nhiên và gia tăng biên độ vận động (ROM).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CLINICAL PROOFS & BADGES */}
      <section className="py-28 max-w-6xl mx-auto px-6 lp-fade">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-white/10 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              className="w-full h-full object-cover grayscale brightness-90" 
              alt="Coach Clinical Massage" 
            />
            <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-md p-6 rounded-2xl border border-white/5">
              <span className="text-brand-orange text-[8px] font-monument tracking-wider uppercase block mb-1">CAM KẾT CHẤT LƯỢNG</span>
              <p className="text-neutral-300 text-xs font-light leading-relaxed">
                "Đội ngũ HLV/KTV của Active Fox là các chuyên gia có chứng chỉ hình thể, vật lý trị liệu và am hiểu giải phẫu chuyển động, đem lại buổi trị liệu tuyệt đối an toàn."
              </p>
            </div>
          </div>

          <div>
            <span className="text-brand-orange text-[9px] font-monument tracking-[0.3em] uppercase mb-4 block">[ GIÁ TRỊ VƯỢT TRỘI ]</span>
            <h2 className="text-3xl md:text-4xl font-monument uppercase tracking-tight mb-8">
              BẢO TRỢ CHUYÊN MÔN Y KHOA THỂ THAO
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-brand-orange" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white uppercase mb-1 tracking-wider">Cá nhân hóa theo môn chơi</h4>
                  <p className="text-neutral-400 text-xs leading-relaxed font-light">
                    Mỗi vận động viên có hệ cơ mỏi khác nhau (Pickleball căng vai khuỷu tay, Chạy bộ căng hông đùi bắp chân). HLV sẽ tùy biến kỹ thuật nhấn miết chính xác theo bộ môn bạn chơi.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#bd7a58]/10 flex items-center justify-center shrink-0">
                  <Dumbbell className="w-4 h-4 text-[#bd7a58]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white uppercase mb-1 tracking-wider">Tác động sâu mô cơ chìm</h4>
                  <p className="text-neutral-400 text-xs leading-relaxed font-light">
                    Vượt trội hoàn toàn so với massage thư giãn thông thường, kỹ thuật của Active Fox giải quyết trực tiếp lớp màng cơ chìm bên dưới để mở kẹt khớp xương và cơ co rút.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-brand-orange" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white uppercase mb-1 tracking-wider">Ngăn ngừa chấn thương chủ động</h4>
                  <p className="text-neutral-400 text-xs leading-relaxed font-light">
                    Giúp cơ bắp dẻo dai đàn hồi, bôi trơn ổ khớp để tăng hiệu suất cho các buổi tập luyện và thi đấu tiếp theo, tránh tuyệt đối các vết rách rạn cơ tiềm ẩn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQs SECTION */}
      <section className="py-28 bg-neutral-950 border-t border-white/5 lp-fade">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <HelpCircle className="w-8 h-8 text-brand-orange mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-monument uppercase tracking-tight text-white">HỎI ĐÁP LIỆU TRÌNH</h2>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-white/5 pb-6">
                <h4 className="font-bold text-sm text-white mb-2 uppercase tracking-wide">
                  {idx + 1}. {faq.q}
                </h4>
                <p className="text-neutral-400 text-xs leading-relaxed font-light">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CONVERSION ACTION */}
      <section className="py-28 bg-black border-t border-white/10 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-brand-orange/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center">
          <span className="text-brand-orange text-[10px] font-monument tracking-[0.3em] uppercase mb-4 block">[ SỨC KHỎE LÀ VÀNG ]</span>
          <h2 className="text-3xl md:text-5xl font-monument uppercase tracking-tighter leading-tight mb-8">
            ĐỪNG ĐỂ CƠ THỂ MỆT MỎI CẢN BƯỚC <br/>
            PHỤC HỒI ĐỂ BỨT PHÁ GIỚI HẠN!
          </h2>
          <p className="text-neutral-400 text-sm font-light max-w-xl mb-12">
            Đăng ký trải nghiệm buổi Sports Massage chuyên sâu ngay hôm nay để nhận tư vấn phác đồ và đặt lịch ưu tiên từ các HLV chuyên môn Active Fox.
          </p>
          
          <button 
            onClick={() => {
              const formElement = document.getElementById("booking-form");
              if (formElement) formElement.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-10 py-5 bg-brand-orange text-white hover:bg-[#ff7643] transition-colors rounded-full font-monument text-xs uppercase tracking-widest font-bold shadow-lg shadow-brand-orange/20 cursor-pointer"
          >
            ĐĂNG KÝ TRẢI NGHIỆM NGAY
          </button>
        </div>
      </section>

      <LPFooter />
    </div>
  );
}
