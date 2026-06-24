import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LPHeader } from "./components/LPHeader";
import { LPFooter } from "./components/LPFooter";
import { LPForm } from "./components/LPForm";
import { ShieldCheck, Target, HeartPulse, HelpCircle, Activity, Sparkles, ChevronDown, Lock, ChevronUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function DoKhopLP() {
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
    { q: "Lớp Độ Khớp có phù hợp với người chưa bao giờ tập luyện không?", a: "Cực kỳ phù hợp! Độ Khớp được thiết kế dựa trên các bài tập phục hồi khớp sinh học từ cơ bản đến nâng cao. Giáo án luôn được HLV điều chỉnh trực tiếp để thích ứng hoàn hảo với biên độ khớp của từng cá nhân." },
    { q: "Tôi nên tập Độ Khớp bao nhiêu buổi một tuần?", a: "Tần suất lý tưởng là 2-3 buổi/tuần. Nó hoạt động như một bộ môn bổ trợ đắc lực giúp bạn gia tăng hiệu suất cho các môn thể thao chính (chạy bộ, gym, pickleball) và bôi trơn khớp xương toàn thân." },
    { q: "Lớp Độ Khớp khác gì với các lớp Yoga thông thường?", a: "Yoga tập trung nhiều vào các tư thế tĩnh mang tính chất dẻo dai chung. Độ Khớp tập trung chính xác vào sự linh hoạt của khớp (Joint Mobility), tăng biên độ chuyển động (ROM) và gia cố sức mạnh cho các nhóm cơ bổ trợ xung quanh khớp để phòng ngừa chấn thương thể thao." }
  ];

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div ref={containerRef} className="w-full bg-[#050505] text-white font-sans selection:bg-emerald-500 selection:text-white pt-20">
      <LPHeader />

      {/* 1. HERO SECTION: EDITORIAL ORTHOPEDIC SPLIT */}
      <section className="relative w-full min-h-[95vh] flex items-center justify-center py-16 md:py-24 overflow-hidden border-b border-white/5 bg-gradient-to-b from-[#0b0c10]/20 to-[#050505]">
        {/* Glow ambient background */}
        <div className="absolute top-1/4 left-1/3 w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-[130px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-emerald-700/5 rounded-full blur-[160px] pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Side: Premium Orthopedic Message */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#081a14] border border-emerald-500/20 text-[#34d399] text-[9px] md:text-[10px] font-monument tracking-[0.25em] uppercase rounded-full mb-8 self-start shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
              ACTIVE FOX JOINT REHABILITATION
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-monument uppercase tracking-tight leading-[1.0] mb-8 text-white">
              BÔI TRƠN KHỚP, <br/>
              <span className="text-emerald-400 italic font-seasons lowercase font-normal">mở rộng biên độ</span> <br/>
              VẬN ĐỘNG TỰ NHIÊN
            </h1>
            
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-10 max-w-xl font-light">
              Lớp tập **Độ Khớp** chuyên sâu tại Active Fox bóc tách các điểm kẹt dính sinh học của hệ cơ xương khớp (Hông, Vai, Cổ chân, Cột sống). Đem lại sự nhẹ nhõm tức thì, gia tăng biên độ vận động và phòng ngừa chấn thương thể thao chủ động.
            </p>

            {/* Spec grid cards */}
            <div className="grid grid-cols-2 gap-4 max-w-lg border-t border-white/10 pt-8">
              <div className="bg-neutral-900/30 border border-white/5 p-4 rounded-xl">
                <span className="text-[9px] font-monument tracking-widest text-neutral-500 uppercase block mb-1">MỤC TIÊU PHỤC HỒI</span>
                <span className="text-sm font-monument uppercase text-white font-bold">JOINT MOBILITY & ROM</span>
              </div>
              <div className="bg-neutral-900/30 border border-white/5 p-4 rounded-xl">
                <span className="text-[9px] font-monument tracking-widest text-neutral-500 uppercase block mb-1">Ưu đãi trải nghiệm</span>
                <span className="text-sm font-monument uppercase text-emerald-400 font-bold">GIẢM 50% HÔM NAY</span>
              </div>
            </div>
          </div>

          {/* Right Side: Form Card with Mint theme */}
          <div className="lg:col-span-5 w-full" id="booking-form">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-emerald-800 rounded-[32px] blur-xl opacity-20 pointer-events-none"></div>
              <LPForm source="Lớp Độ Khớp LP" offerText="ƯU ĐÃI TRẢI NGHIỆM GIẢM 50%" themeColor="mint" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. ANATOMICAL STICKY PANEL: SYSTEM BLOCKAGE */}
      <section className="py-32 max-w-7xl mx-auto px-6 lp-fade border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Sticky Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="text-emerald-500 text-[9px] font-monument tracking-[0.3em] uppercase mb-4 block">[ KHÓA KHỚP SINH HỌC ]</span>
            <h2 className="text-3xl md:text-5xl font-monument uppercase tracking-tighter leading-tight text-white mb-6">
              HỆ CHUYỂN ĐỘNG BỊ CỨNG KHÓA VÌ THÓI QUEN SAI TƯ THẾ
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed font-light mb-8 max-w-md">
              Khi cơ thể thiếu vận động đa hướng hoặc ngồi sai tư thế nhiều giờ liền, bao hoạt dịch khớp sẽ giảm bôi trơn, tạo lực nén lớn lên đĩa sụn và giới hạn chuyển động tự nhiên.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-[2px] bg-emerald-500"></div>
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">Orthopedic Scan</span>
            </div>
          </div>

          {/* Right Scrollable Panel with detailed cards */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-[#0b0c10]/40 border border-white/5 p-8 rounded-2xl hover:border-emerald-500/20 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-emerald-400 text-xs font-monument block">[ 01. KHÓA KHỚP HÔNG & CỔ CHÂN ]</span>
                <Lock className="w-4 h-4 text-emerald-500/40 group-hover:text-emerald-400 transition-colors" />
              </div>
              <p className="text-neutral-300 text-xs md:text-sm leading-relaxed font-light">
                Khớp hông bó chặt khiến bạn không thể squat sâu, mông đùi bị ức chế phát lực. Khớp cổ chân cứng đờ làm dội toàn bộ phản lực từ đất lên ổ khớp gối khi đi bộ hay chạy bộ, gây viêm đau đầu gối kinh niên.
              </p>
            </div>

            <div className="bg-[#0b0c10]/40 border border-white/5 p-8 rounded-2xl hover:border-emerald-500/20 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-emerald-400 text-xs font-monument block">[ 02. KẸT VAI & GÙ LƯNG VĂN PHÒNG ]</span>
                <Lock className="w-4 h-4 text-emerald-500/40 group-hover:text-emerald-400 transition-colors" />
              </div>
              <p className="text-neutral-300 text-xs md:text-sm leading-relaxed font-light">
                Ngồi cúi người trước máy tính làm co rút dải xô và ngực trước, đẩy bả vai xoay trong gây gù lưng mất thẩm mỹ. Cột sống ngực kẹt cứng khiến máu khó lưu thông, dẫn đến mỏi cổ vai gáy ê ẩm mỗi ngày.
              </p>
            </div>

            <div className="bg-[#0b0c10]/40 border border-white/5 p-8 rounded-2xl hover:border-emerald-500/20 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-emerald-400 text-xs font-monument block">[ 03. VIÊM YẾU DÂY CHẰNG THỂ THAO ]</span>
                <Lock className="w-4 h-4 text-emerald-500/40 group-hover:text-emerald-400 transition-colors" />
              </div>
              <p className="text-neutral-300 text-xs md:text-sm leading-relaxed font-light">
                Khi chơi các bộ môn xoay vặn nhanh như Pickleball hay Tennis, khớp thiếu tính linh hoạt tự nhiên buộc dây chằng phải căng kéo quá tầm, rất dễ gây rách, đứt dây chằng và sụn chêm ổ khớp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ACTIVE RANGE OF MOTION (ROM) CHECK GRID */}
      <section className="py-28 bg-[#0b0c10]/50 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 lp-fade">
            <span className="text-emerald-500 text-[9px] font-monument tracking-[0.3em] uppercase mb-4 block">BIOMECHANICS TEST</span>
            <h2 className="text-3xl md:text-4xl font-monument uppercase tracking-tight text-white mb-6">
              BẢNG TỰ KIỂM TRA BIÊN ĐỘ GÓC KHỚP (ROM)
            </h2>
            <p className="text-neutral-400 text-xs md:text-sm font-light max-w-xl mx-auto leading-relaxed">
              Bạn có bị kẹt khớp không? Hãy tự đánh giá cơ thể thông qua các góc đo giới hạn sinh học dưới đây.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card Hip ROM */}
            <div className="bg-black/60 border border-white/5 p-8 rounded-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <h4 className="font-monument text-xs uppercase tracking-wider text-white">Khớp Hông (Hip Flexion)</h4>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-end border-b border-white/5 pb-2">
                  <span className="text-[10px] text-neutral-500 uppercase">Góc Nghiêng Chuẩn</span>
                  <span className="text-sm font-monument text-white font-bold">120° - 130°</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/5 pb-2">
                  <span className="text-[10px] text-neutral-500 uppercase">Bạn bị kẹt cứng</span>
                  <span className="text-sm font-monument text-emerald-400 font-bold">&lt; 90° (Squat bó cơ)</span>
                </div>
              </div>
              <p className="text-neutral-400 text-[11px] leading-relaxed font-light">
                *Kiểm tra: Nằm ngửa, co gối ép sát vào bụng. Nếu đùi bị kẹt cứng không thể chạm sát liên sườn mà mông bị nhấc lên, khớp hông của bạn đang bị khóa nghiêm trọng.
              </p>
            </div>

            {/* Card Shoulder ROM */}
            <div className="bg-black/60 border border-white/5 p-8 rounded-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <h4 className="font-monument text-xs uppercase tracking-wider text-white">Khớp Vai (Shoulder Flexion)</h4>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-end border-b border-white/5 pb-2">
                  <span className="text-[10px] text-neutral-500 uppercase">Góc Nghiêng Chuẩn</span>
                  <span className="text-sm font-monument text-white font-bold">170° - 180°</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/5 pb-2">
                  <span className="text-[10px] text-neutral-500 uppercase">Bạn bị kẹt cứng</span>
                  <span className="text-sm font-monument text-emerald-400 font-bold">&lt; 140° (Kẹt bả vai)</span>
                </div>
              </div>
              <p className="text-neutral-400 text-[11px] leading-relaxed font-light">
                *Kiểm tra: Đứng tựa sát lưng vào tường, giơ thẳng hai tay lên cao chạm tường. Nếu cánh tay không thể chạm phẳng vào tường hoặc thắt lưng bị võng ra xa, khớp vai đã bị xoay trong quá đà.
              </p>
            </div>

            {/* Card Spine ROM */}
            <div className="bg-black/60 border border-white/5 p-8 rounded-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <h4 className="font-monument text-xs uppercase tracking-wider text-white">Cột Sống Ngực (Thoracic Extension)</h4>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-end border-b border-white/5 pb-2">
                  <span className="text-[10px] text-neutral-500 uppercase">Góc Xoay Chuẩn</span>
                  <span className="text-sm font-monument text-white font-bold">40° - 45°</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/5 pb-2">
                  <span className="text-[10px] text-neutral-500 uppercase">Bạn bị kẹt cứng</span>
                  <span className="text-sm font-monument text-emerald-400 font-bold">&lt; 25° (Gù lưng máy tính)</span>
                </div>
              </div>
              <p className="text-neutral-400 text-[11px] leading-relaxed font-light">
                *Kiểm tra: Ngồi cố định hai chân trên ghế, chéo tay trước ngực và xoay thân trên hết cỡ sang trái/phải. Nếu biên độ quay quá hẹp, cột sống ngực đã bị kẹt và mất khả năng phân phối lực xoay vai gáy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE 4-STEP JOINT PATH (ZIGZAC LAYOUT) */}
      <section className="py-28 max-w-5xl mx-auto px-6">
        <div className="text-center mb-20 lp-fade">
          <span className="text-emerald-500 text-[9px] font-monument tracking-[0.3em] uppercase mb-4 block">REHAB METHODOLOGY</span>
          <h2 className="text-3xl md:text-4xl font-monument uppercase tracking-tight text-white">
            TIẾN TRÌNH 4 BƯỚC KHÔI PHỤC HỆ CHUYỂN ĐỘNG
          </h2>
        </div>

        <div className="space-y-12">
          {/* Step 1 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#0b0c10]/30 border border-white/5 p-8 rounded-3xl lp-fade">
            <div className="md:col-span-2 flex justify-start md:justify-center">
              <span className="text-4xl font-monument font-bold text-emerald-500/20 group-hover:text-emerald-500 transition-colors">01</span>
            </div>
            <div className="md:col-span-10">
              <span className="text-[10px] font-monument tracking-wider text-emerald-400 uppercase block mb-1">RELEASE / GIẢI PHÓNG DIỂM NGHẼN</span>
              <h3 className="font-monument text-xs md:text-sm uppercase tracking-wide text-white mb-2">Miết cơ sâu & Nhả cơ mạc sinh học</h3>
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light">
                Ứng dụng kỹ thuật trị liệu cơ bằng tay kết hợp công cụ IASTM để nhả mạc cơ kết dính (fascia), giải tỏa căng cứng tại vùng cơ co rút đang kéo lệch ổ khớp xương.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#0b0c10]/30 border border-white/5 p-8 rounded-3xl lp-fade">
            <div className="md:col-span-2 flex justify-start md:justify-center">
              <span className="text-4xl font-monument font-bold text-emerald-500/20">02</span>
            </div>
            <div className="md:col-span-10">
              <span className="text-[10px] font-monument tracking-wider text-emerald-400 uppercase block mb-1">MOBILIZE / TĂNG KHẢ NĂNG TRƠN TRƯỢT</span>
              <h3 className="font-monument text-xs md:text-sm uppercase tracking-wide text-white mb-2">Vận động ổ khớp đa hướng chuyên sâu</h3>
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light">
                HLV dẫn dắt trực tiếp các kỹ thuật ép mở xoay khớp đa diện tích cực giúp tăng sinh hoạt dịch sinh học, kích hoạt dịch bôi trơn khớp xương toàn thân.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#0b0c10]/30 border border-white/5 p-8 rounded-3xl lp-fade">
            <div className="md:col-span-2 flex justify-start md:justify-center">
              <span className="text-4xl font-monument font-bold text-emerald-500/20">03</span>
            </div>
            <div className="md:col-span-10">
              <span className="text-[10px] font-monument tracking-wider text-emerald-400 uppercase block mb-1">ACTIVATE / KÍCH HOẠT CƠ BẢO VỆ KHỚP</span>
              <h3 className="font-monument text-xs md:text-sm uppercase tracking-wide text-white mb-2">Độ khớp sinh học bằng các bài tập củng cố</h3>
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light">
                Kích hoạt các sợi cơ nhỏ chìm xung quanh khớp vai, ổ chảo, khớp hông giúp hệ vận động có điểm tựa vững chãi, chống xô lệch dưới áp lực tải nặng thể thao.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#0b0c10]/30 border border-white/5 p-8 rounded-3xl lp-fade">
            <div className="md:col-span-2 flex justify-start md:justify-center">
              <span className="text-4xl font-monument font-bold text-emerald-500/20">04</span>
            </div>
            <div className="md:col-span-10">
              <span className="text-[10px] font-monument tracking-wider text-emerald-400 uppercase block mb-1">STABILIZE / ĐỊNH HÌNH TƯ THẾ TRỤC</span>
              <h3 className="font-monument text-xs md:text-sm uppercase tracking-wide text-white mb-2">Cân chỉnh tư thế toàn hình thể</h3>
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light">
                Kiến tạo lại tư thế xương thẳng trục tự nhiên (Neutral Spine Alignment), mở ngực rộng, sửa vai so lưng gù, gia tăng hiệu suất chuyển động 100%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EXPERT EDUCATION SECTION */}
      <section className="py-28 max-w-6xl mx-auto px-6 lp-fade border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-emerald-500 text-[9px] font-monument tracking-[0.3em] uppercase mb-4 block">ACTIVE FOX PROFESSIONALISM</span>
            <h2 className="text-3xl md:text-4xl font-monument uppercase tracking-tight mb-8">
              BẢO TRỢ CHUYÊN MÔN BỞI HLV CÓ CHỨNG CHỈ Y HỌC THỂ THAO
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white uppercase mb-1 tracking-wider">HLV Có Chứng Chỉ Giải Phẫu</h4>
                  <p className="text-neutral-400 text-xs leading-relaxed font-light">
                    Các Coach trực tiếp hướng dẫn đều trải qua đào tạo bài bản về cơ sinh học chuyển động thể thao, tuyệt đối an toàn và không gây rách khớp gân.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Activity className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white uppercase mb-1 tracking-wider">Hỗ Trợ Chạm Sửa Chi Tiết (Hands-on Fix)</h4>
                  <p className="text-neutral-400 text-xs leading-relaxed font-light">
                    Lớp tập nhóm giới hạn sỉ số bảo đảm HLV có thể tiếp cận chỉnh sửa góc nghiêng, điểm xoay khớp gối, vai chuẩn xác cho từng học viên.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white uppercase mb-1 tracking-wider">Giáo Án Tự Tùy Biến Thể Trạng</h4>
                  <p className="text-neutral-400 text-xs leading-relaxed font-light">
                    Bất kể bạn là người cực kỳ cứng khớp chưa từng tập thể thao, hay VĐV chuyên nghiệp mong muốn tối ưu hóa ROM để tập nặng hơn, giáo án đều thích nghi hoàn hảo.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-white/10 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              className="w-full h-full object-cover grayscale brightness-90" 
              alt="Active Fox Lớp Độ Khớp" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE STATEFUL FAQs */}
      <section className="py-28 bg-[#0b0c10]/40 border-t border-white/5 lp-fade">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <HelpCircle className="w-8 h-8 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-monument uppercase tracking-tight text-white">HỎI ĐÁP LỚP ĐỘ KHỚP</h2>
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
                    <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" />
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

      {/* 7. BOTTOM CONVERSION ACTION */}
      <section className="py-32 bg-black border-t border-white/10 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center">
          <span className="text-emerald-500 text-[10px] font-monument tracking-[0.3em] uppercase mb-4 block">[ HÀNH ĐỘNG VÌ BẢN THÂN ]</span>
          <h2 className="text-3xl md:text-5xl font-monument uppercase tracking-tighter leading-tight mb-8">
            BẮT ĐẦU MỞ KHÓA VÀ <br/>
            BẢO VỆ KHỚP XƯƠNG CỦA BẠN!
          </h2>
          <p className="text-neutral-400 text-sm font-light max-w-xl mb-12">
            Đăng ký trải nghiệm buổi Độ Khớp đầu tiên ngay hôm nay nhận ưu đãi **GIẢM 50%**. Cảm nhận ngay sự nhẹ nhõm linh hoạt từ sâu bên trong cơ thể!
          </p>
          
          <button 
            onClick={() => {
              const formElement = document.getElementById("booking-form");
              if (formElement) formElement.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white transition-all rounded-full font-monument text-xs uppercase tracking-widest font-bold shadow-lg shadow-emerald-600/10 cursor-pointer"
          >
            ĐĂNG KÝ TRẢI NGHIỆM ĐỘ KHỚP NGAY
          </button>
        </div>
      </section>

      <LPFooter />
    </div>
  );
}
