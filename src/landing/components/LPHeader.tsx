import { Phone, MessageCircle } from "lucide-react";

export function LPHeader() {
  const LOGO_URL = "https://i.postimg.cc/Hx3dJ54h/Noi-dung-doan-van-ban-cua-ban-(9).png";

  const handleScrollToForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formElement = document.getElementById("booking-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-4 md:px-8 py-3.5 bg-black/85 backdrop-blur-md border-b border-white/5 flex justify-between items-center transition-all">
      <div className="flex items-center">
        <img 
          src={LOGO_URL} 
          alt="Active Fox Logo" 
          className="h-[2.2rem] md:h-[3.2rem] lg:h-[3.5rem] object-contain block py-1" 
        />
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <a 
          href="tel:0377823856" 
          className="hidden sm:flex items-center gap-2 text-[10px] md:text-xs tracking-wider uppercase font-bold text-neutral-300 hover:text-brand-orange transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-brand-orange" />
          <span>Hotline: 037 782 3856</span>
        </a>

        <a 
          href="https://zalo.me/0377823856"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-full hover:bg-blue-600/20 hover:text-white transition-all text-[10px] md:text-xs tracking-wider uppercase font-bold"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Chat Zalo</span>
        </a>

        <button 
          onClick={handleScrollToForm}
          className="text-[10px] md:text-[11px] tracking-widest font-bold border border-brand-orange bg-brand-orange text-white px-5 py-2.5 rounded-full hover:bg-brand-orange/90 transition-all uppercase cursor-pointer"
        >
          Đăng Ký Ngay
        </button>
      </div>
    </nav>
  );
}
