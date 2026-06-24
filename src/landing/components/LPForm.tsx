import React, { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface LPFormProps {
  source: string;
  offerText: string;
  themeColor?: "orange" | "mint" | "red" | "yellow";
}

export function LPForm({ source, offerText, themeColor = "orange" }: LPFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    branch: "Active Fox Sala (Quận 2)"
  });

  const colorStyles = {
    orange: {
      badgeBg: "bg-brand-orange text-white",
      focusBorder: "focus:border-brand-orange",
      btnBg: "bg-brand-orange hover:bg-[#ff7643] text-white shadow-brand-orange/20",
    },
    mint: {
      badgeBg: "bg-emerald-600 text-white",
      focusBorder: "focus:border-emerald-500",
      btnBg: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20",
    },
    red: {
      badgeBg: "bg-[#FF3333] text-white",
      focusBorder: "focus:border-[#FF3333]",
      btnBg: "bg-[#FF3333] hover:bg-red-600 text-white shadow-red-600/20",
    },
    yellow: {
      badgeBg: "bg-yellow-500 text-black",
      focusBorder: "focus:border-yellow-500",
      btnBg: "bg-yellow-500 hover:bg-yellow-400 text-black shadow-yellow-500/20",
    }
  }[themeColor];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setStatus("submitting");

    const data = {
      ...formData,
      source,
      timestamp: new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })
    };

    const webhookUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK;

    if (!webhookUrl) {
      console.warn("Không tìm thấy VITE_GOOGLE_SHEETS_WEBHOOK, giả lập gửi thành công.");
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

  if (status === "success") {
    return (
      <div className="bg-white border border-green-500/30 p-8 rounded-2xl text-center flex flex-col items-center justify-center min-h-[350px] animate-in fade-in duration-500 shadow-lg">
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <h4 className="text-2xl font-seasons italic text-neutral-900 mb-3">Đăng ký thành công!</h4>
        <p className="text-neutral-500 text-sm leading-relaxed mb-6 max-w-sm">
          Cảm ơn bạn đã lựa chọn Active Fox. Đội ngũ cố vấn viên sẽ liên hệ với bạn trong vòng 30 phút để xác nhận lịch hẹn và giữ ưu đãi **{offerText}** cho bạn nhé!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-neutral-200 p-8 rounded-2xl shadow-lg relative w-full text-neutral-900">
      <div className={`absolute -top-3.5 left-8 px-4 py-1 ${colorStyles.badgeBg} text-[10px] font-monument tracking-wider uppercase rounded-full shadow-md animate-pulse`}>
        {offerText}
      </div>

      <h3 className="text-xl md:text-2xl font-monument uppercase tracking-tight text-neutral-900 mb-6 mt-2 leading-none">
        ĐĂNG KÝ TRẢI NGHIỆM
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-[10px] font-monument uppercase tracking-widest text-neutral-500 mb-2">Họ và Tên *</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Nhập họ và tên..."
            value={formData.name}
            onChange={handleChange}
            className={`w-full bg-neutral-50 border border-neutral-200 ${colorStyles.focusBorder} rounded-xl px-4 py-3.5 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:bg-white`}
          />
        </div>

        <div>
          <label className="block text-[10px] font-monument uppercase tracking-widest text-neutral-500 mb-2">Số Điện Thoại *</label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="Nhập số điện thoại..."
            value={formData.phone}
            onChange={handleChange}
            className={`w-full bg-neutral-50 border border-neutral-200 ${colorStyles.focusBorder} rounded-xl px-4 py-3.5 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:bg-white`}
          />
        </div>

        <div>
          <label className="block text-[10px] font-monument uppercase tracking-widest text-neutral-500 mb-2">Thời gian mong muốn (Không bắt buộc)</label>
          <input
            type="text"
            name="date"
            placeholder="Ví dụ: Thứ 7 lúc 9h sáng..."
            value={formData.date}
            onChange={handleChange}
            className={`w-full bg-neutral-50 border border-neutral-200 ${colorStyles.focusBorder} rounded-xl px-4 py-3.5 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-colors focus:bg-white`}
          />
        </div>

        <div>
          <label className="block text-[10px] font-monument uppercase tracking-widest text-neutral-500 mb-2">Cơ sở tập luyện *</label>
          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className={`w-full bg-neutral-50 border border-neutral-200 ${colorStyles.focusBorder} rounded-xl px-4 py-3.5 text-sm text-neutral-900 outline-none transition-colors focus:bg-white`}
          >
            <option value="Active Fox Sala (Quận 2)">Active Fox Sala (Q.2) - 62 Hoàng Thế Thiện</option>
            <option value="Active Fox Cao Thắng (Quận 10)">Active Fox Cao Thắng (Q.10) - 175B Cao Thắng</option>
          </select>
        </div>

        {status === "error" && (
          <div className="flex gap-2.5 items-center p-3.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Đã có lỗi xảy ra. Vui lòng thử lại hoặc gọi hotline trực tiếp.</span>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className={`w-full ${colorStyles.btnBg} transition-colors py-4.5 rounded-full font-monument text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg cursor-pointer`}
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              ĐANG ĐĂNG KÝ...
            </>
          ) : (
            "GỬI ĐĂNG KÝ NGAY"
          )}
        </button>
      </form>

      <p className="text-[10px] text-neutral-400 text-center mt-4 leading-relaxed">
        *Thông tin của bạn được bảo mật tuyệt đối. <br/>
        Nhân viên CSKH của Active Fox sẽ liên hệ qua điện thoại/Zalo để xác nhận lịch hẹn.
      </p>
    </div>
  );
}
