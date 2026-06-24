import { Flame } from "lucide-react";

export function LPFooter() {
  return (
    <footer className="w-full bg-black py-16 border-t border-white/10 text-neutral-500 font-sans text-center relative z-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
        <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,97,41,0.1)]">
          <Flame className="w-6 h-6 text-brand-orange animate-pulse" />
        </div>
        
        <h3 className="text-white font-monument uppercase tracking-widest text-sm mb-4">ACTIVE FOX SYSTEM</h3>
        <p className="text-neutral-400 text-xs md:text-sm font-light max-w-lg mb-8 leading-relaxed">
          Hệ thống huấn luyện & phục hồi thể chất toàn diện hàng đầu. Tối ưu hiệu quả vận động, kiến tạo hình thể bền bỉ cùng các chuyên gia quốc tế.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl w-full border-y border-white/5 py-8 mb-8 text-xs font-light leading-relaxed">
          <div>
            <h4 className="font-monument text-white text-[10px] uppercase tracking-wider mb-2">ACTIVE FOX SALA (PACE COFFEE)</h4>
            <p className="text-neutral-400">Địa chỉ: 62 Hoàng Thế Thiện, An Khánh, TP. Thủ Đức, TP. HCM</p>
            <p className="text-neutral-400">Hotline: 037 782 3856</p>
          </div>
          <div>
            <h4 className="font-monument text-white text-[10px] uppercase tracking-wider mb-2">ACTIVE FOX CAO THẮNG</h4>
            <p className="text-neutral-400">Địa chỉ: 175B Cao Thắng, Phường 12, Quận 10, TP. HCM</p>
            <p className="text-neutral-400">Hotline: 037 782 3856</p>
          </div>
        </div>

        <div className="text-[10px] tracking-widest uppercase font-bold text-neutral-600 flex flex-col sm:flex-row items-center gap-4">
          <span>© {new Date().getFullYear()} Active Fox Vietnam</span>
          <span className="hidden sm:inline w-1 h-1 rounded-full bg-neutral-800"></span>
          <span>System Verified for High Performance</span>
        </div>
      </div>
    </footer>
  );
}
