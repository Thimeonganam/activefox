import { createContext, useContext, useState, ReactNode, useRef } from "react";
import { X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface RegContextData {
  openModal: (course?: string) => void;
}

const RegContext = createContext<RegContextData | undefined>(undefined);

export function useRegistration() {
  const ctx = useContext(RegContext);
  if (!ctx) throw new Error("useRegistration must be used within RegistrationProvider");
  return ctx;
}

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = (course = "") => {
    setIsOpen(true);
    setStatus("idle");
  };

  const closeModal = () => setIsOpen(false);

  const handleSubmit = async (e: import("react").FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      timestamp: new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })
    };

    const webhookUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK;

    if (!webhookUrl) {
      console.warn("Không tìm thấy VITE_GOOGLE_SHEETS_WEBHOOK trong file .env, mô phỏng gửi thành công.");
      setTimeout(() => setStatus("success"), 1500);
      return;
    }

    try {
      await fetch(webhookUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(data),
        headers: { "Content-Type": "text/plain;charset=utf-8" }
      });
      setStatus("success");
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    }
  };

  useGSAP(() => {
    if (isOpen && modalRef.current) {
      const overlay = modalRef.current;
      const leftPanel = overlay.querySelector('.left-panel');
      const rightPanel = overlay.querySelector('.right-panel');
      
      gsap.fromTo(overlay, { backgroundColor: "rgba(0,0,0,0)" }, { backgroundColor: "rgba(0,0,0,0.8)", duration: 0.3 });
      
      if (leftPanel) {
         gsap.fromTo(leftPanel, { x: "-100%", opacity: 0 }, { x: "0%", opacity: 1, duration: 0.6, ease: "power3.out" });
      }
      if (rightPanel) {
         gsap.fromTo(rightPanel, { x: "100%", opacity: 0 }, { x: "0%", opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.1 });
      }
    }
  }, { dependencies: [isOpen] });

  return (
    <RegContext.Provider value={{ openModal }}>
      {children}
      
      {isOpen && (
        <div ref={modalRef} className="fixed inset-0 z-[10000] flex justify-center items-center overflow-hidden">
          
          <div className="flex w-full h-[100dvh] bg-white relative shadow-2xl">
            {/* Left Panel - Image Area */}
            <div className="left-panel hidden lg:flex w-[45%] xl:w-1/2 relative bg-black flex-col justify-end">
               <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
               {/* Red overlay tint */}
               <div className="absolute inset-0 z-10 bg-[#FF6129]/30 mix-blend-multiply pointer-events-none"></div>
               
               <img 
                 src="https://i.postimg.cc/PqyPjQQP/z7751230846795-5521c20cd8e74de2a4c24313ea1a5fb5.jpg" 
                 alt="Active Fox Training"
                 loading="eager"
                 fetchPriority="high"
                 className="absolute inset-0 w-full h-full object-cover grayscale brightness-75"
               />

               <div className="relative z-20 p-12 xl:p-20 text-white mt-auto">
                 <h2 className="text-5xl xl:text-6xl font-monument uppercase tracking-tight leading-none mb-6 text-white drop-shadow-xl">
                   THE ACTIVE FOX <br/> TRIAL OFFER
                 </h2>
                 <p className="text-lg xl:text-xl font-medium mb-8 max-w-lg text-neutral-200">
                   Ưu đãi đặc biệt dành cho người mới chỉ 200k/tuần.
                 </p>
                 <ul className="text-base xl:text-lg space-y-3 font-light text-neutral-300">
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-brand-orange rounded-full"></span> Không giới hạn số buổi tập luyện</li>
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-brand-orange rounded-full"></span> Sử dụng máy tập, thiết bị toàn thời gian</li>
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-brand-orange rounded-full"></span> Tập luyện linh hoạt tại 2 chi nhánh</li>
                    <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-brand-orange rounded-full"></span> Sử dụng tiện ích: phòng tắm, tủ đồ,..</li>
                 </ul>
               </div>
            </div>

            {/* Right Panel - Form Area */}
            <div className="right-panel w-full lg:w-[55%] xl:w-1/2 bg-white text-black relative flex flex-col h-full overflow-y-auto overflow-x-hidden">
               <button 
                 onClick={closeModal} 
                 className="absolute top-6 right-6 lg:top-8 lg:right-8 p-2 text-black/50 hover:text-black transition-colors z-50 bg-neutral-100 rounded-full"
               >
                 <X size={24} strokeWidth={1.5} />
               </button>

               <div className="flex-1 flex flex-col p-8 md:p-16 lg:p-20 xl:p-24 max-w-3xl mx-auto w-full relative h-full justify-center">
                  
                  {status === "success" ? (
                    <div className="flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500 h-full">
                      <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                      </div>
                      <h4 className="text-3xl font-seasons italic text-black mb-4">Đăng ký thành công</h4>
                      <p className="text-neutral-500 text-lg mb-10 max-w-md mx-auto">
                        Cảm ơn bạn đã lựa chọn Active Fox. Chúng tôi sẽ liên hệ trong thời gian sớm nhất để xác nhận.
                      </p>
                      <button 
                        onClick={closeModal}
                        className="px-10 py-5 bg-black text-white font-bold uppercase tracking-widest text-xs rounded-none hover:bg-neutral-800 transition-colors w-full md:w-auto"
                      >
                        Về Trang Chủ
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 overflow-hidden relative">
                        <div className="absolute inset-0 transition-transform duration-500 flex flex-col translate-x-0">
                          <h2 className="text-4xl lg:text-5xl font-seasons italic mb-8">Bắt đầu hành trình.</h2>
                          
                          <form id="reg-form" onSubmit={handleSubmit} className="flex-1 flex flex-col pt-2">
                             <div className="space-y-5 mb-8">
                                <input 
                                  name="name" 
                                  type="text" 
                                  required 
                                  placeholder="Họ và tên" 
                                  className="w-full border border-black/20 px-5 py-4 focus:outline-none focus:border-black text-base placeholder:text-black/40 transition-colors bg-transparent"
                                />
                                <input 
                                  name="phone" 
                                  type="tel" 
                                  required 
                                  placeholder="Số điện thoại" 
                                  className="w-full border border-black/20 px-5 py-4 focus:outline-none focus:border-black text-base placeholder:text-black/40 transition-colors bg-transparent"
                                />
                             </div>

                             {status === "error" && (
                               <div className="flex items-center gap-2 text-red-500 text-sm mb-4">
                                 <AlertCircle size={16} /> Có lỗi xảy ra, vui lòng thử lại sau.
                               </div>
                             )}

                             <div className="mt-auto pt-6">
                               <p className="text-[11px] text-black/40 leading-relaxed mb-6 font-medium">
                                  Bằng việc đăng ký, bạn đồng ý với các Điều khoản & Điều kiện và Chính sách bảo mật của Active Fox. Chúng tôi sẽ sớm liên hệ để xác nhận thông tin.
                               </p>
                               <button 
                                  type="submit" 
                                  disabled={status === "submitting"} 
                                  className={`w-full py-5 text-sm uppercase tracking-widest font-bold transition-all flex justify-center items-center h-[60px] ${status === "submitting" ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed' : 'bg-black text-white hover:bg-brand-orange hover:text-black shadow-xl hover:shadow-brand-orange/20'}`}
                               >
                                  {status === "submitting" ? <Loader2 className="w-5 h-5 animate-spin" /> : "Xác nhận & Hoàn tất"}
                               </button>
                             </div>
                          </form>
                        </div>
                      </div>
                    </>
                  )}

               </div>
            </div>
            
          </div>
        </div>
      )}
    </RegContext.Provider>
  );
}
