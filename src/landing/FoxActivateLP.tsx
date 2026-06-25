import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LPHeader } from "./components/LPHeader";
import { LPFooter } from "./components/LPFooter";
import { LPForm } from "./components/LPForm";
import { ShieldCheck, Dumbbell, Award, HelpCircle, ArrowRight, Zap, Target, Flame, HeartPulse, CheckCircle2, UserCheck, CalendarDays } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function FoxActivateLP() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useGSAP(() => {
    // Premium reveal animations
    gsap.utils.toArray('.lp-fade').forEach((el: any) => {
      gsap.fromTo(el,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
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
    {
      q: "Gói tập Fox Activate có giới hạn thời gian hay khung giờ tập không?",
      a: "Hoàn toàn không. Bạn được tập luyện tự do, không giới hạn số lần và khung giờ tại phòng tập Active Fox trong suốt 1 tháng, từ 6h00 đến 22h00 hàng ngày."
    },
    {
      q: "Buổi Coaching 1:1 và Sports Massage 60 phút sẽ được sắp xếp thế nào?",
      a: "Sau khi bạn hoàn tất đăng ký gói Fox Activate, đội ngũ CSKH của Active Fox sẽ liên hệ ngay để sắp xếp lịch hẹn cụ thể cho buổi tập cùng Coach và buổi trị liệu Massage theo thời gian rảnh linh hoạt của bạn."
    },
    {
      q: "Người mới bắt đầu chưa từng tập gym có phù hợp với gói này không?",
      a: "Cực kỳ phù hợp! Điểm đặc biệt của Fox Activate là có sẵn 1 buổi Coaching 1:1 giúp bạn được đo chỉ số cơ thể, hướng dẫn tư thế tập chuẩn xác và xây dựng lộ trình riêng biệt ngay từ ngày đầu, kết hợp cùng 1 buổi Massage giúp cơ thể làm quen và tránh đau mỏi cơ sau tập."
    },
    {
      q: "Gói tập này áp dụng tại các chi nhánh nào của Active Fox?",
      a: "Gói tập Fox Activate áp dụng trên toàn bộ hệ thống Active Fox Athletic Club tại TP.HCM (Sala Quận 2 và Cao Thắng Quận 10)."
    }
  ];

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const scrollToForm = () => {
    const formElement = document.getElementById("booking-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="w-full bg-black text-white font-sans selection:bg-brand-orange selection:text-white pt-20 overflow-hidden">
      <LPHeader />

      {/* ─── 1. HERO SECTION ─── */}
      <section className="relative w-full min-h-[95vh] flex items-center justify-center py-16 md:py-24 overflow-hidden border-b border-white/5 bg-gradient-to-b from-neutral-950 to-black">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#bd7a58]/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1a0f08] border border-brand-orange/20 text-brand-orange text-[9px] md:text-[10px] font-monument tracking-[0.25em] uppercase rounded-full mb-8 self-start shadow-[0_0_20px_rgba(255,97,41,0.1)]">
              <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-ping"></span>
              FOX ACTIVATE - GIẢI PHÁP TẬP LUYỆN TOÀN DIỆN
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7.5xl font-monument uppercase tracking-tight leading-[1.0] mb-8 text-white">
              TẬP LUYỆN BÀI BẢN, <br/>
              <span className="text-brand-orange italic font-seasons lowercase font-normal">phục hồi chuyên sâu</span> <br/>
              CHỈ 599K/THÁNG
            </h1>

            <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-10 max-w-xl font-light">
              Trải nghiệm gói tập luyện tối ưu 3-trong-1 dành riêng cho người muốn bắt đầu một phong cách sống năng động: Tập gym không giới hạn, tập cá nhân 1:1 cùng Coach chuyên nghiệp và trị liệu phục hồi cơ bắp chuyên sâu.
            </p>

            {/* Spec list cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 pt-8 max-w-2xl">
              <div className="bg-neutral-900/30 border border-white/5 p-4 rounded-xl">
                <span className="text-[9px] font-monument tracking-widest text-neutral-500 uppercase block mb-1">01 THÁNG</span>
                <span className="text-xs font-monument uppercase text-white font-bold">Tập Gym Tự Do</span>
              </div>
              <div className="bg-neutral-900/30 border border-white/5 p-4 rounded-xl">
                <span className="text-[9px] font-monument tracking-widest text-neutral-500 uppercase block mb-1">01 BUỔI</span>
                <span className="text-xs font-monument uppercase text-white font-bold">Sports Massage 60p</span>
              </div>
              <div className="bg-neutral-900/30 border border-white/5 p-4 rounded-xl">
                <span className="text-[9px] font-monument tracking-widest text-neutral-500 uppercase block mb-1">01 BUỔI</span>
                <span className="text-xs font-monument uppercase text-white font-bold">Coaching 1:1</span>
              </div>
            </div>
          </div>

          {/* Right Column (Form) */}
          <div className="lg:col-span-5 w-full animate-fade-in" id="booking-form">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-orange to-[#bd7a58] rounded-[32px] blur-xl opacity-20 pointer-events-none"></div>
              <LPForm source="Fox Activate LP" offerText="ĐĂNG KÝ SỚM CHỈ VỚI 599.000Đ" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. THE THREE PILLARS (FEATURES) ─── */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 lp-fade">
          <span className="text-brand-orange text-[9px] font-monument tracking-[0.3em] uppercase mb-4 block">[ GÓI TRẢI NGHIỆM TỐI ƯU ]</span>
          <h2 className="text-3xl md:text-5xl font-monument uppercase tracking-tighter leading-tight text-white mb-6">
            BỘ BA NỀN TẢNG THỂ CHẤT TOÀN DIỆN
          </h2>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-light">
            Không chỉ là thẻ tập gym thông thường. Fox Activate được thiết kế khoa học khép kín giúp bạn tập chuẩn tư thế, duy trì động lực tập luyện tự do và phục hồi cơ bắp đúng cách ngay từ đầu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="bg-neutral-900/30 border border-white/5 p-8 rounded-3xl flex flex-col justify-between hover:border-brand-orange/30 transition-all duration-300 lp-fade">
            <div>
              <div className="w-12 h-12 bg-brand-orange/10 border border-brand-orange/20 rounded-2xl flex items-center justify-center mb-6 text-brand-orange">
                <Dumbbell className="w-6 h-6" />
              </div>
              <span className="text-xs font-monument tracking-wider text-neutral-500 uppercase block mb-2">PILLAR 01 / TẬP LUYỆN</span>
              <h3 className="text-xl font-monument uppercase text-white mb-4">1 THÁNG TẬP GYM KHÔNG GIỚI HẠN</h3>
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light mb-6">
                Tự do rèn luyện sức bền tim mạch, sức mạnh cơ bắp tại khu vực tạ tay, máy kéo cáp, máy isolate hiện đại. Đầy đủ tiện ích tủ khóa từ locker bảo mật, khăn tắm cao cấp và phòng tắm nóng lạnh hoàn toàn miễn phí.
              </p>
            </div>
            <ul className="space-y-2 border-t border-white/5 pt-6 text-xs text-neutral-300 font-light">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                Thời gian tập không giới hạn
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                Tự do tập luyện tại Cao Thắng/Sala
              </li>
            </ul>
          </div>

          {/* Pillar 2 */}
          <div className="bg-neutral-900/30 border border-white/5 p-8 rounded-3xl flex flex-col justify-between hover:border-brand-orange/30 transition-all duration-300 lp-fade">
            <div>
              <div className="w-12 h-12 bg-[#bd7a58]/10 border border-[#bd7a58]/20 rounded-2xl flex items-center justify-center mb-6 text-[#bd7a58]">
                <UserCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-monument tracking-wider text-neutral-500 uppercase block mb-2">PILLAR 02 / HƯỚNG DẪN</span>
              <h3 className="text-xl font-monument uppercase text-white mb-4">1 BUỔI COACHING 1:1 CÙNG HLV</h3>
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light mb-6">
                HLV cá nhân sẽ thực hiện đo chỉ số cơ thể InBody, phân tích độ lệch cơ khớp và trực tiếp đồng hành hướng dẫn kỹ thuật chuẩn y sinh. Thiết kế giáo án tập luyện phù hợp với thể trạng của bạn để đạt kết quả tốt nhất.
              </p>
            </div>
            <ul className="space-y-2 border-t border-white/5 pt-6 text-xs text-neutral-300 font-light">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                Đo & phân tích chỉ số InBody
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                Sửa tư thế tập an toàn
              </li>
            </ul>
          </div>

          {/* Pillar 3 */}
          <div className="bg-neutral-900/30 border border-white/5 p-8 rounded-3xl flex flex-col justify-between hover:border-brand-orange/30 transition-all duration-300 lp-fade">
            <div>
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 text-white">
                <HeartPulse className="w-6 h-6" />
              </div>
              <span className="text-xs font-monument tracking-wider text-neutral-500 uppercase block mb-2">PILLAR 03 / PHỤC HỒI</span>
              <h3 className="text-xl font-monument uppercase text-white mb-4">1 BUỔI SPORTS MASSAGE 60 PHÚT</h3>
              <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light mb-6">
                Liệu trình trị liệu giải mỏi và giãn cơ mạc sâu (myofascial release) được thực hiện trực tiếp bởi các Coach có chuyên môn vật lý trị liệu thể thao. Giúp thải axit lactic tích tụ, tăng tuần hoàn máu và phục hồi cơ bắp tối đa.
              </p>
            </div>
            <ul className="space-y-2 border-t border-white/5 pt-6 text-xs text-neutral-300 font-light">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                60 phút massage sâu giải mỏi
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                Phục hồi thớ cơ chìm co cứng
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── 3. VALUE COMPARISON (PRICE VALUE) ─── */}
      <section className="py-24 bg-neutral-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 lp-fade">
            <span className="text-brand-orange text-[9px] font-monument tracking-[0.3em] uppercase mb-4 block">[ BÀI TOÁN TÀI CHÍNH ]</span>
            <h2 className="text-3xl md:text-5xl font-monument uppercase tracking-tighter leading-tight text-white mb-8">
              GIÁ TRỊ THỰC <br/> VƯỢT XA CHI PHÍ
            </h2>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-light mb-8">
              Thông thường, để trải nghiệm đầy đủ các dịch vụ chăm sóc thể chất cao cấp bao gồm tập gym, huấn luyện viên cá nhân hướng dẫn và giãn cơ trị liệu, bạn sẽ phải trả các mức phí riêng lẻ rất cao. Với gói **Fox Activate**, Active Fox trợ giá tới **gần 60%** nhằm mang lại trải nghiệm trọn vẹn nhất cho người mới bắt đầu.
            </p>
            <button 
              onClick={scrollToForm}
              className="px-8 py-4 bg-brand-orange hover:bg-[#e04f1a] text-black font-monument text-xs uppercase tracking-wider rounded-full transition-colors flex items-center gap-2"
            >
              Đăng ký gói 599k <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-6 space-y-4 lp-fade">
            <div className="bg-neutral-900/20 border border-white/5 p-6 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-monument tracking-wider text-neutral-500 uppercase block mb-1">MUA RIÊNG LẺ THÔNG THƯỜNG</span>
                <span className="text-neutral-400 text-xs font-light">1 tháng tập + 1 buổi Coach + 1 buổi Massage</span>
              </div>
              <span className="text-lg font-monument text-neutral-500 line-through">1.300.000đ</span>
            </div>

            <div className="bg-[#1c0f07] border-2 border-brand-orange/40 p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-brand-orange text-black font-monument text-[9px] tracking-widest uppercase px-4 py-1.5 rounded-bl-2xl">
                TIẾT KIỆM 54%
              </div>
              <span className="text-[10px] font-monument tracking-wider text-brand-orange uppercase block mb-2">GÓI TRẢI NGHIỆM FOX ACTIVATE</span>
              <h3 className="text-2xl font-monument uppercase text-white mb-4">CHỈ 599.000Đ / THÁNG</h3>
              <p className="text-neutral-300 text-xs leading-relaxed font-light mb-6">
                Combo 3 dịch vụ cao cấp nhất của Active Fox được tích hợp đồng bộ vào một gói duy nhất, đem lại trải nghiệm hoàn hảo cho sức khỏe của bạn.
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-brand-orange font-medium">
                <span>✓ Không phí phụ thu</span>
                <span>✓ Đầy đủ tiện ích locker, tắm nóng lạnh</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. BRAND GALLERY ─── */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 lp-fade">
          <span className="text-brand-orange text-[9px] font-monument tracking-[0.3em] uppercase mb-4 block">[ PHÒNG TẬP CHUYÊN NGHIỆP ]</span>
          <h2 className="text-3xl md:text-4xl font-monument uppercase tracking-tighter leading-tight text-white mb-6">
            KHÔNG GIAN LÀM NÊN KẾT QUẢ
          </h2>
          <p className="text-neutral-400 text-xs md:text-sm font-light">
            Không gian tập luyện chuẩn Functional Training, trang thiết bị nhập khẩu hiện đại cùng phòng trị liệu mạc cơ chuyên sâu, mang lại nguồn năng lượng tối đa cho mỗi buổi tập của bạn.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lp-fade">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-900">
            <img src="/gym/DSC06298_compressed.jpg" alt="Active Fox Gym" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-900">
            <img src="/gym/DSC06278.jpg" alt="Active Fox Coaching" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-900">
            <img src="/gym/DSC06292.jpg" alt="Active Fox Equipment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-900">
            <img src="/gym/DSC06305.jpg" alt="Active Fox Recovery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        </div>
      </section>

      {/* ─── 5. FAQ SECTION ─── */}
      <section className="py-24 max-w-4xl mx-auto px-6 lp-fade">
        <div className="text-center mb-16">
          <span className="text-brand-orange text-[9px] font-monument tracking-[0.3em] uppercase mb-4 block">[ GIẢI ĐÁP THẮC MẮC ]</span>
          <h2 className="text-3xl md:text-4xl font-monument uppercase tracking-tighter leading-tight text-white">
            CÁC CÂU HỎI THƯỜNG GẶP
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx} 
                className="bg-neutral-950 border border-white/5 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between font-monument text-xs md:text-sm uppercase tracking-wide text-white hover:text-brand-orange transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="text-brand-orange font-light ml-4">
                    {isOpen ? "—" : "+"}
                  </span>
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[250px] pb-6" : "max-h-0"
                  }`}
                >
                  <p className="text-neutral-400 text-xs md:text-sm leading-relaxed font-light border-t border-white/5 pt-4">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <LPFooter />
    </div>
  );
}
