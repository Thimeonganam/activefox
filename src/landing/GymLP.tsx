import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LPHeader } from "./components/LPHeader";
import { LPFooter } from "./components/LPFooter";
import { LPForm } from "./components/LPForm";
import { ShieldCheck, Flame, HeartPulse, HelpCircle, Dumbbell, Timer, Users, Target, Activity, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function GymLP() {
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
    { 
      q: "Gói tập GYM THẢ GA 299k/tháng có bị giới hạn khung giờ tập không?", 
      a: "Hoàn toàn không. Bạn được tập luyện không giới hạn thời gian trong khung giờ hoạt động từ 6h00 sáng đến 22h00 tối hàng ngày tại chi nhánh Active Fox Cao Thắng." 
    },
    { 
      q: "Gói tập này đã bao gồm trọn bộ các tiện ích chưa?", 
      a: "Đã bao gồm toàn bộ. Khi đăng ký gói Gym Thả Ga, bạn được sử dụng miễn phí hệ thống tủ locker bảo mật, khăn tắm sạch cao cấp và phòng tắm nóng lạnh tiện nghi mà không cần đóng thêm bất kỳ chi phí phụ nào." 
    },
    { 
      q: "Người mới bắt đầu tập Gym có được hướng dẫn sử dụng máy móc không?", 
      a: "Có. Đội ngũ huấn luyện viên tại Active Fox luôn có mặt tại phòng tập để hỗ trợ và hướng dẫn bạn cách sử dụng các trang thiết bị, máy móc Cable và Isolate một cách an toàn và hiệu quả nhất, giúp bạn làm quen nhanh chóng từ cấp độ cơ bản." 
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

  const galleryImages = [
    "/gym/z7907829030442_9abc7bb6945927a1a55cc0a180126a8e.jpg",
    "/gym/z7907829043980_3b2ff26640e62ce9eaeeb507bf1776c0.jpg",
    "/gym/z7907829044875_cb784c418557bae9e9e7f5c48dc44c88.jpg",
    "/gym/z7907829060399_d35c66afe28544db2f4de30b1d2e5657.jpg",
    "/gym/z7907829066144_36abaf14df8499aaa28c18b2e8e22793.jpg",
    "/gym/z7907829075392_9136ed0dc41042131861a653a757871d.jpg",
    "/gym/z7907829075626_889224b87600d4d148c40284713ae622.jpg",
    "/gym/z7907829080753_6ff048b3778e6b6aec5937cd69e87db3.jpg",
    "/gym/z7907829089753_cd58453b6c1285181da6812cbd6bf70f.jpg",
    "/gym/z7907829104665_b869d4f0860a0eda98bbc6b4482a8806.jpg",
    "/gym/z7907829121190_fcdb4b4f10522760f858ec7b0cdf8fb0.jpg",
    "/gym/z7907829140725_a91b425550323d30c44287321bbba9c8.jpg",
    "/gym/z7907829160521_efa71a539dbc11e18801a0b6a203e632.jpg",
    "/gym/z7907829174190_7e5b877bdbafd3bbb8c81dcac4e2e3f8.jpg",
  ];

  const zones = [
    { icon: HeartPulse, title: "KHU VỰC CARDIO", desc: "Cải thiện sức bền tim mạch cùng dàn máy chạy bộ và đi bộ trên cao hiện đại.", img: "/gym/z7907829053223_d40f994c89f3713fec4f3d684ac6b918.jpg" },
    { icon: Flame, title: "KICK BOXING ZONE", desc: "Đốt cháy calo, giải phóng áp lực với hệ thống bao cát chuyên dụng.", img: "/gym/z7907829046092_b3a4d5f765ff1f4ab79eaae406fa6ce6.jpg" },
    { icon: Dumbbell, title: "FREEWEIGHT & TẠ TAY", desc: "Tối ưu hóa sức mạnh với tạ tay, tạ đòn nhập khẩu đa dạng trọng lượng.", img: "/gym/z7907829131576_5986017498c9ec2585ef6f20ec2c1d2e.jpg" },
    { icon: Target, title: "MÁY CABLE & ISOLATE", desc: "Hệ thống máy kéo cáp và máy cô lập cơ cho ngực, vai, lưng, tay, chân, mông.", img: "/gym/z7907829111701_73cc41b379790029eb5cff989256a68b.jpg" },
    { icon: Activity, title: "ĐƯỜNG CHẠY BỔ TRỢ", desc: "Đường chạy trong nhà thiết kế riêng cho các bài tập bổ trợ thể lực.", img: "/gym/z7907829151231_9e6ad6a3eeff2d19b64f4a5fead8701f.jpg" },
  ];

  return (
    <div ref={containerRef} className="w-full bg-white text-neutral-900 font-sans selection:bg-brand-orange selection:text-white pt-20 overflow-hidden">
      <LPHeader />

      {/* ─── 1. HERO — Video background + form ─── */}
      <section className="relative w-full min-h-[100dvh] flex items-center justify-center py-16 md:py-20 overflow-hidden pt-24">
        {/* Background image */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/gym/DSC06298_compressed.jpg')` }}></div>
        <div className="absolute inset-0 bg-black/55"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-neutral-800 text-white text-[10px] md:text-[11px] font-monument tracking-[0.2em] uppercase rounded-full mb-8 self-start">
              <span className="w-2 h-2 bg-brand-orange rounded-full"></span>
              ACTIVE FOX ATHLETIC CLUB
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-monument uppercase tracking-tight leading-[1.0] mb-8 text-white">
              TẬP GYM THẢ GA <br/>
              <span className="text-brand-orange italic font-seasons lowercase font-normal">không lo về giá</span> <br/>
              CHỈ 299K/THÁNG
            </h1>
            
            <p className="text-white/80 text-sm md:text-base leading-relaxed mb-10 max-w-xl font-light">
              Tập luyện không giới hạn với hệ thống thiết bị hiện đại cùng cộng đồng năng lượng tại Active Fox.
            </p>

            <div className="grid grid-cols-2 gap-4 max-w-lg">
              <div className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-xl">
                <span className="text-[9px] font-monument tracking-widest text-white/50 uppercase block mb-1">MỨC GIÁ</span>
                <span className="text-sm font-monument uppercase text-white font-bold">299.000đ / THÁNG</span>
              </div>
              <div className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-xl">
                <span className="text-[9px] font-monument tracking-widest text-white/50 uppercase block mb-1">ĐỊA ĐIỂM</span>
                <span className="text-sm font-monument uppercase text-brand-orange font-bold">FOX CAO THẮNG (Q.10)</span>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-5 w-full" id="booking-form">
            <LPForm source="Gói Gym Thả Ga LP" offerText="ƯU ĐÃI CHỈ 299K/THÁNG" themeColor="orange" />
          </div>
        </div>
      </section>

      {/* ─── 2. PRICING CTA — Brand orange background ─── */}
      <section className="py-20 bg-brand-orange text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/20 text-white text-[10px] font-monument uppercase tracking-wider rounded-full mb-6">
            ⚡ SUẤT ĐĂNG KÝ CÓ HẠN
          </div>
          <h2 className="text-3xl md:text-6xl font-monument uppercase tracking-tighter leading-none text-white mb-6">
            CHI PHÍ TRỌN GÓI <span className="text-4xl md:text-7xl block md:inline-block font-extrabold my-2 md:my-0">299.000đ</span> / THÁNG
          </h2>
          <p className="text-white/85 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-8 font-light">
            Áp dụng cho 100 suất đăng ký đầu tiên tại Active Fox Cao Thắng. Đăng ký sớm để giữ mức giá ưu đãi trọn đời, cam kết không tăng giá, không phát sinh chi phí ẩn.
          </p>
          <button 
            onClick={scrollToForm}
            className="px-8 py-4 bg-white text-brand-orange rounded-full font-monument text-xs uppercase tracking-widest font-bold shadow-lg cursor-pointer transition-all duration-300 hover:bg-neutral-100 active:scale-95"
          >
            ĐĂNG KÝ GIỮ SUẤT ƯU ĐÃI NGAY
          </button>
        </div>
      </section>

      {/* ─── 3. ZONES GRID — White background ─── */}
      <section className="py-24 bg-white lp-fade">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-brand-orange text-[10px] font-monument tracking-[0.2em] uppercase mb-3 block">KHÔNG GIAN HIỆN ĐẠI</span>
            <h2 className="text-3xl md:text-5xl font-monument uppercase tracking-tight text-neutral-900 mb-4">
              ĐA DẠNG KHU VỰC TẬP LUYỆN
            </h2>
            <p className="text-neutral-500 text-sm font-light max-w-xl mx-auto leading-relaxed">
              Active Fox được bố trí khoa học thành các khu vực chuyên biệt với 100% trang thiết bị nhập khẩu cao cấp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {zones.map((zone, idx) => {
              const Icon = zone.icon;
              return (
                <div 
                  key={idx} 
                  className={`bg-neutral-50 rounded-2xl overflow-hidden group hover:shadow-lg transition-shadow duration-300 ${idx === 3 ? 'lg:col-span-2' : ''}`}
                >
                  <div className={`${idx === 3 ? 'aspect-[21/9]' : 'aspect-[16/10]'} overflow-hidden relative`}>
                    <img src={zone.img} alt={zone.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-brand-orange" />
                    </div>
                    <h3 className="font-monument text-xs uppercase text-neutral-900 mb-2 tracking-wide">{String(idx + 1).padStart(2, '0')} / {zone.title}</h3>
                    <p className="text-neutral-500 text-xs leading-relaxed font-light">{zone.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 4. PHOTO GALLERY — Light gray background ─── */}
      <section className="py-24 bg-neutral-100 lp-fade">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-brand-orange text-[10px] font-monument tracking-[0.2em] uppercase mb-3 block">HÌNH ẢNH THỰC TẾ</span>
            <h2 className="text-2xl md:text-4xl font-monument uppercase tracking-tight text-neutral-900 mb-3">
              KHÁM PHÁ ACTIVE FOX CAO THẮNG
            </h2>
            <p className="text-neutral-500 text-xs font-light max-w-md mx-auto leading-relaxed">
              Toàn cảnh phòng tập hiện đại và tràn đầy năng lượng từ hội viên của chúng tôi.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[130px] md:auto-rows-[180px]">
            {galleryImages.map((src, idx) => {
              // 3-Column Bento collage layout: a mix of 2x2, 2x1, 1x2 and 1x1 for dynamic layout
              const bentoSpans = [
                "col-span-2 row-span-2", // Item 0 (2x2 Feature)
                "col-span-1 row-span-1", // Item 1
                "col-span-1 row-span-1", // Item 2
                "col-span-1 row-span-2", // Item 3 (1x2 Tall Vertical)
                "col-span-2 row-span-1", // Item 4 (2x1 Wide Horizontal)
                "col-span-1 row-span-1", // Item 5
                "col-span-1 row-span-1", // Item 6
                "col-span-1 row-span-1", // Item 7
                "col-span-1 row-span-1", // Item 8
                "col-span-1 row-span-1", // Item 9
                "col-span-2 row-span-1", // Item 10 (2x1 Wide Horizontal)
                "col-span-1 row-span-2", // Item 11 (1x2 Tall Vertical)
                "col-span-1 row-span-1", // Item 12
                "col-span-1 row-span-1", // Item 13
              ];

              const galleryCaptions = [
                "FOX INTERIOR",
                "CARDIO ZONE",
                "FREEWEIGHT",
                "RUNNING TRACK",
                "BOXING ZONE",
                "CABLE AREA",
                "ACTIVE FOX",
                "COMMUNITY",
                "FITNESS FLOOR",
                "FACILITIES",
                "PREMIUM LOCKERS",
                "SHOWER ROOM",
                "COACHING",
                "ACTIVE FOX"
              ];
              
              const spanClass = bentoSpans[idx] || "col-span-1 row-span-1";

              return (
                <div key={idx} className={`${spanClass} overflow-hidden rounded-xl group relative shadow-sm`}>
                  <img 
                    src={src} 
                    alt={`Không gian tập luyện Active Fox ${idx + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle dark overlay and sporty label on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-[9px] font-monument tracking-widest text-brand-orange uppercase bg-black/75 px-2.5 py-1.5 rounded-md border border-brand-orange/20 shadow-md">
                      {galleryCaptions[idx] || "ACTIVE FOX"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 5. EXPERIENCE & PERKS — White background ─── */}
      <section className="py-24 bg-white lp-fade">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-monument uppercase tracking-tight text-neutral-900 mb-4">
              ĐIỂM KHÁC BIỆT TẠI ACTIVE FOX
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Timer, title: "THIẾT BỊ HIỆN ĐẠI TOÀN THỜI GIAN", desc: "Không giới hạn số buổi hay khung giờ tập. Bạn hoàn toàn có thể sử dụng hệ thống máy móc, thiết bị hiện đại full-time bất cứ lúc nào." },
              { icon: Target, title: "THỬ THÁCH MỌI CẤP ĐỘ", desc: "Từ người mới làm quen với tạ cho đến các vận động viên nâng cao. Các bài tập và phân khu máy móc được thiết kế thông minh hỗ trợ mọi mục tiêu." },
              { icon: Users, title: "CỘNG ĐỒNG VĂN MINH & NĂNG LƯỢNG", desc: "Gặp gỡ, tập luyện cùng những hội viên văn minh, chia sẻ đam mê thể thao. Không gian đầy năng lượng truyền cảm hứng bứt phá mỗi ngày." },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-neutral-50 border border-neutral-200 p-8 rounded-2xl hover:border-brand-orange/30 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-brand-orange" />
                  </div>
                  <h4 className="font-monument text-xs uppercase text-neutral-900 mb-3 tracking-wider">{item.title}</h4>
                  <p className="text-neutral-500 text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 6. PREMIUM UTILITIES — Light gray background ─── */}
      <section className="py-24 bg-neutral-100 lp-fade">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="rounded-2xl overflow-hidden shadow-md bg-white p-4">
              <img 
                src="/gym/z7907829115963_288823986924f8a00463bec8b68f04a1.jpg" 
                className="w-full rounded-xl object-cover aspect-[4/3] mb-4" 
                alt="Cơ sở vật chất Active Fox" 
              />
              <div className="bg-brand-orange p-4 rounded-xl text-center">
                <span className="text-white/75 text-[9px] font-monument tracking-wider uppercase block mb-1">ĐỊA CHỈ TẬP LUYỆN</span>
                <p className="text-white text-xs font-monument uppercase tracking-wider font-bold">
                  Active Fox Cao Thắng: 175B Cao Thắng, P.12, Q.10, TP. HCM
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-monument uppercase tracking-tight text-neutral-900 mb-8">
                TẬN HƯỞNG TIỆN ÍCH PREMIUM MIỄN PHÍ
              </h2>
              
              <div className="space-y-6">
                {[
                  { icon: ShieldCheck, title: "Khăn tắm, Phòng tắm & Locker bảo mật", desc: "Bạn được phát khăn tắm sạch cao cấp cho mỗi buổi tập, tự do sử dụng phòng tắm nóng lạnh tiện nghi và hệ thống tủ đồ cá nhân khóa locker an toàn tuyệt đối." },
                  { icon: Timer, title: "Tập luyện linh hoạt từ 6h00 - 22h00", desc: "Phòng tập hoạt động xuyên suốt từ 6h sáng đến 10h tối hàng ngày, giúp bạn dễ dàng sắp xếp lịch tập phù hợp." },
                  { icon: CheckCircle2, title: "Phù hợp cho cả nam & nữ ở mọi cấp độ", desc: "Không gian tập luyện cởi mở, thân thiện. Máy móc được phân chia khoa học cùng sự hỗ trợ nhiệt tình từ các HLV." },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-orange flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-neutral-900 uppercase mb-1 tracking-wider">{item.title}</h4>
                        <p className="text-neutral-500 text-xs leading-relaxed font-light">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. FAQs — White background ─── */}
      <section className="py-24 bg-white lp-fade">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <HelpCircle className="w-8 h-8 text-brand-orange mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-monument uppercase tracking-tight text-neutral-900">HỎI ĐÁP VỀ GÓI TẬP</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-neutral-200 rounded-xl bg-neutral-50 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center p-5 text-left hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-xs md:text-sm text-neutral-800 uppercase tracking-wide">
                    {idx + 1}. {faq.q}
                  </span>
                  {activeFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-brand-orange shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                  )}
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    activeFaq === idx ? "max-h-[300px] border-t border-neutral-200 opacity-100 p-5" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-neutral-600 text-xs md:text-sm leading-relaxed font-light">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. BOTTOM CTA — Brand orange background ─── */}
      <section className="py-28 bg-brand-orange text-center">
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-monument uppercase tracking-tighter leading-tight mb-8 text-white">
            TẬP GYM THẢ GA KHÔNG LO VỀ GIÁ <br/>
            ĐĂNG KÝ NGAY CHỈ 299K/THÁNG!
          </h2>
          <p className="text-white/85 text-sm font-light max-w-xl mb-10">
            Đừng chần chừ, cơ hội vàng để kiến tạo vóc dáng chuẩn và nâng cấp thể lực toàn diện tại Active Fox Cao Thắng chỉ với mức giá cực kỳ tiết kiệm.
          </p>
          
          <button 
            onClick={scrollToForm}
            className="px-10 py-5 bg-white text-brand-orange transition-all rounded-full font-monument text-xs uppercase tracking-widest font-bold shadow-lg cursor-pointer hover:bg-neutral-100 active:scale-95"
          >
            ĐĂNG KÝ NHẬN ƯU ĐÃI NGAY
          </button>
        </div>
      </section>

      <LPFooter />
    </div>
  );
}
