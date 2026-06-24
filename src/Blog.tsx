import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { SEO } from "./components/SEO";
import { Calendar, Clock, ArrowRight, User, Loader2 } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export interface BlogPostType {
  slug: string;
  title: string;
  category: "TẬP LUYỆN" | "MASSAGE" | "PHỤC HỒI";
  date: string;
  readTime: string;
  excerpt: string;
  coverImg: string;
  author: string;
  authorRole: string;
  featured?: boolean;
}

export const mockPosts: BlogPostType[] = [
  {
    slug: "chan-thuong-pickleball-va-bai-tap-bo-tro",
    title: "Chấn thương thường gặp khi chơi Pickleball và cách phòng tránh bằng bài tập bổ trợ",
    category: "TẬP LUYỆN",
    date: "22/05/2026",
    readTime: "5 phút đọc",
    excerpt: "Cơn sốt Pickleball đang bùng nổ, kéo theo tỷ lệ chấn thương dây chằng gối và cổ tay gia tăng. Hãy cùng các chuyên gia thể chất tại Active Fox khám phá nguyên nhân và các bài tập bổ trợ kích hoạt biên độ vận động khớp giúp bạn thi đấu bền bỉ.",
    coverImg: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    author: "Đội ngũ chuyên gia Active Fox",
    authorRole: "Tham vấn y sinh thể thao",
    featured: true
  },
  {
    slug: "dau-co-vai-gay-dan-van-phong-massage-tri-lieu",
    title: "Đau cổ vai gáy kéo dài ở dân văn phòng: Khi nào massage thư giãn thông thường là chưa đủ?",
    category: "MASSAGE",
    date: "21/05/2026",
    readTime: "6 phút đọc",
    excerpt: "Nhiều người đi spa xoa bóp chỉ đỡ mỏi vài hôm rồi đâu lại vào đấy. Khám phá bản chất sinh học của các điểm nút thắt cơ học (Trigger Points) và tại sao liệu pháp giải phóng mạc cơ (Myofascial Release) y khoa mới là lời giải tận gốc.",
    coverImg: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Trị liệu viên Trưởng Nguyễn Minh Đức",
    authorRole: "Hệ thống Phục hồi Active Fox"
  },
  {
    slug: "indiba-448khz-va-emsculpt-bi-quyet-messi-ronaldo",
    title: "Indiba RF 448kHz và EMSculpt: Bí quyết duy trì phong độ đỉnh cao của Messi và Cristiano Ronaldo",
    category: "PHỤC HỒI",
    date: "20/05/2026",
    readTime: "7 phút đọc",
    excerpt: "Khám phá sức mạnh của phục hồi thể chất công nghệ cao. Cơ chế sóng vô tuyến tần số nội sinh 448 kHz từ thiết bị FoxFlex 448 (Indiba) và kích co cơ siêu tối đa HIFEM từ Magair Elite Sculpt+ đang tái định nghĩa y học phục hồi thể thao.",
    coverImg: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Ban Cố vấn Y khoa Active Fox",
    authorRole: "Y học Thể thao Công nghệ cao"
  },
  {
    slug: "tai-sao-tu-tap-gym-khong-hieu-qua-hlv-ca-nhan",
    title: "Tại sao tự tập gym mãi không hiệu quả? 5 lợi ích vượt trội khi tập cùng HLV chuyên nghiệp",
    category: "TẬP LUYỆN",
    date: "18/05/2026",
    readTime: "6 phút đọc",
    excerpt: "Tự tập theo mạng thường dẫn tới sai lệch tư thế cột sống, giáo án rập khuôn và chấn thương khớp tích tụ. Tìm hiểu cách giáo án cá nhân hóa và đo lường chỉ số vận động chuẩn giúp cơ thể bứt phá hiệu quả.",
    coverImg: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "HLV Trưởng Lê Hoàng Long",
    authorRole: "Huấn luyện Thể chất & Phục hồi"
  },
  {
    slug: "giao-an-chay-bo-cho-nguoi-moi-bat-dau-chay-5km-khong-met",
    title: "Giáo án chạy bộ cho người mới bắt đầu: Làm sao để chạy liên tục 5km không mệt?",
    category: "TẬP LUYỆN",
    date: "12/06/2026",
    readTime: "5 phút đọc",
    excerpt: "Chạy bộ tưởng chừng đơn giản nhưng 90% người mới bắt đầu đều gặp tình trạng hụt hơi, đau ống đồng hoặc nhanh nản. Khám phá giáo án xen kẽ đi bộ - chạy bộ (Run-Walk) khoa học giúp bạn chinh phục 5km đầu tiên.",
    coverImg: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Đội ngũ HLV Fox Run",
    authorRole: "Huấn luyện viên Chạy bộ Nền tảng"
  },
  {
    slug: "sports-massage-vs-spa-massage-khac-biet-cot-loi",
    title: "Sports Massage vs. Spa Massage: Điểm khác biệt cốt lõi người chơi thể thao phải biết",
    category: "MASSAGE",
    date: "10/06/2026",
    readTime: "6 phút đọc",
    excerpt: "Liệu massage thư giãn thông thường có giúp cơ bắp phục hồi sau các buổi chạy trail hay nâng tạ nặng? Cùng phân tích sự khác biệt về lực tác động, kỹ thuật giải cơ sâu và mục tiêu trị liệu của Sports Massage.",
    coverImg: "https://images.unsplash.com/photo-1519823551278-64ac92834904?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Trị liệu viên Trưởng Nguyễn Minh Đức",
    authorRole: "Hệ thống Phục hồi Active Fox"
  },
  {
    slug: "giai-phap-boc-tach-mac-co-dao-chai-iastm",
    title: "Giải pháp bóc tách mạc cơ (Myofascial Release) bằng dao chải IASTM: Liệu pháp \"vàng\" khôi phục vận động",
    category: "MASSAGE",
    date: "08/06/2026",
    readTime: "5 phút đọc",
    excerpt: "Dao chải mạc cơ IASTM (Instrument Assisted Soft Tissue Mobilization) là vũ khí bí mật giúp giải phóng các xơ sẹo cơ bắp, khôi phục lại biên độ vận động khớp cho vận động viên chuyên nghiệp lẫn dân phong trào.",
    coverImg: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Đội ngũ chuyên gia Active Fox",
    authorRole: "Tham vấn y sinh thể thao"
  },
  {
    slug: "contrast-water-therapy-ngam-nong-lanh-luon-phien",
    title: "Ngâm nóng lạnh luân phiên (Contrast Water Therapy): Khoa học đằng sau liệu pháp hồi phục thần tốc",
    category: "PHỤC HỒI",
    date: "15/05/2026",
    readTime: "5 phút đọc",
    excerpt: "Ngâm nóng - lạnh luân phiên không chỉ là trào lưu. Cơ chế luân phiên co thắt và giãn nở mạch máu tạo ra hiệu ứng 'bơm bạch huyết', đẩy nhanh đào thải axit lactic và triệt tiêu các ổ viêm cơ xương khớp sau vận động nặng.",
    coverImg: "https://i.postimg.cc/9Xk1ZQ5D/DSC06431.jpg",
    author: "Đội ngũ chuyên gia Active Fox",
    authorRole: "Tham vấn y sinh thể thao"
  },
  {
    slug: "dau-moi-co-sau-tap-doms-giam-dau-co-khoa-hoc",
    title: "Đau mỏi cơ sau tập (DOMS): 4 cách giảm đau cơ chuẩn khoa học giúp cơ thể phục hồi nhanh gấp đôi",
    category: "PHỤC HỒI",
    date: "05/06/2026",
    readTime: "5 phút đọc",
    excerpt: "Cơn đau nhức cơ âm ỉ kéo dài 24-48 tiếng sau khi đổi giáo án hoặc tập nặng được gọi là DOMS. Đừng chịu đựng nó một cách thụ động; hãy áp dụng ngay 4 liệu pháp giảm đau cơ dựa trên y sinh học thể thao.",
    coverImg: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Ban Cố vấn Y khoa Active Fox",
    authorRole: "Y học Thể thao Công nghệ cao"
  }
];

export default function Blog() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("TẤT CẢ");
  const [posts, setPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDynamicPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'pages', 'blog', 'blocks'));
        const fetched: BlogPostType[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          let category: "TẬP LUYỆN" | "MASSAGE" | "PHỤC HỒI" = "TẬP LUYỆN";
          let author = "Đội ngũ chuyên gia Active Fox";
          let authorRole = "Tham vấn y sinh thể thao";
          let date = new Date().toLocaleDateString('vi-VN');
          let readTime = "5 phút đọc";

          try {
            if (data.subtitle) {
              const meta = JSON.parse(data.subtitle);
              if (meta.category) category = meta.category;
              if (meta.author) author = meta.author;
              if (meta.authorRole) authorRole = meta.authorRole;
            }
          } catch (e) {}

          try {
            if (data.mediaUrl2) {
              const timeline = JSON.parse(data.mediaUrl2);
              if (timeline.date) date = timeline.date;
              if (timeline.readTime) readTime = timeline.readTime;
            }
          } catch (e) {}

          fetched.push({
            slug: doc.id,
            title: data.title || '',
            category,
            date,
            readTime,
            excerpt: data.description || '',
            coverImg: data.mediaUrl || '',
            author,
            authorRole,
            featured: false
          });
        });
        
        const merged: BlogPostType[] = [...fetched];
        mockPosts.forEach((mock) => {
          if (!merged.some(p => p.slug === mock.slug)) {
            merged.push(mock);
          }
        });
        setPosts(merged);
      } catch (e) {
        console.error("Failed to fetch dynamic blog posts:", e);
        setPosts(mockPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchDynamicPosts();
  }, []);

  const categories = ["TẤT CẢ", "TẬP LUYỆN", "MASSAGE", "PHỤC HỒI"];

  const filteredPosts = activeCategory === "TẤT CẢ"
    ? posts
    : posts.filter(p => p.category === activeCategory);

  const featuredPost = posts.find(p => p.slug === "chan-thuong-pickleball-va-bai-tap-bo-tro") || posts[0];
  const standardPosts = filteredPosts.filter(p => p.slug !== featuredPost?.slug || activeCategory !== "TẤT CẢ");

  useGSAP(() => {
    // Fade in elements nicely
    gsap.fromTo(".blog-fade-up",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
    );
  }, { scope: containerRef, dependencies: [activeCategory, posts] });

  return (
    <main ref={containerRef} className="w-full bg-[#fdfbf9] min-h-screen text-[#1a100c] pt-[12vh] md:pt-[15vh] pb-32">
      <SEO 
        title="Active Fox Blog | Kiến thức Huấn Luyện & Phục Hồi Thể Chất"
        description="Nơi chia sẻ kiến thức khoa học thể thao, cẩm nang giảm đau cổ vai gáy, cách phòng tránh chấn thương chạy bộ, pickleball và giải pháp phục hồi thể chất đỉnh cao."
        path="/blog"
      />

      {/* Hero section */}
      <section className="max-w-7xl mx-auto px-6 mb-12 blog-fade-up">
        <div className="border-b border-neutral-200 pb-8 text-center md:text-left">
          <span className="text-brand-orange text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-3 block">Kiến thức chuyên sâu</span>
          <h1 className="text-5xl md:text-7xl font-monument uppercase tracking-tight text-[#2c1d11] mb-4">ACTIVE FOX BLOG</h1>
          <p className="text-neutral-500 font-sans font-light text-base md:text-lg max-w-2xl leading-relaxed">
            Cẩm nang khoa học thể chất, phục hồi cơ xương khớp và ứng dụng công nghệ y sinh chuẩn quốc tế từ đội ngũ chuyên gia Active Fox.
          </p>
        </div>
      </section>

      {/* Category filter bar */}
      <section className="max-w-7xl mx-auto px-6 mb-16 blog-fade-up">
        <div className="flex flex-wrap gap-3 border-b border-neutral-200/60 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-monument uppercase tracking-widest transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#1a100c] text-white shadow-md"
                  : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Post (Only displayed when "ALL" or "TẬP LUYỆN" is selected and featured post matches) */}
      {activeCategory === "TẤT CẢ" && featuredPost && (
        <section className="max-w-7xl mx-auto px-6 mb-20 blog-fade-up">
          <Link to={`/blog/${featuredPost.slug}`} className="group block bg-white border border-neutral-200/80 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-500">
            <div className="flex flex-col lg:flex-row min-h-[500px]">
              {/* Media wrapper */}
              <div className="w-full lg:w-3/5 relative overflow-hidden h-[300px] lg:h-auto">
                <img 
                  src={featuredPost.coverImg} 
                  alt={featuredPost.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out grayscale-[10%]"
                />
                <div className="absolute inset-0 bg-[#bd7a58]/5 mix-blend-multiply"></div>
                <div className="absolute top-6 left-6">
                  <span className="bg-brand-orange text-white text-[10px] font-monument tracking-widest uppercase px-4 py-2 rounded-full shadow-lg">
                    TIÊU ĐIỂM
                  </span>
                </div>
              </div>

              {/* Text content */}
              <div className="w-full lg:w-2/5 p-8 md:p-12 flex flex-col justify-between bg-[#fdfbf9]">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[#bd7a58] text-xs font-monument tracking-wider uppercase font-bold">{featuredPost.category}</span>
                    <span className="text-neutral-300">•</span>
                    <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                      <Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-monument uppercase tracking-tight text-[#2c1d11] group-hover:text-[#bd7a58] transition-colors leading-[1.2] mb-6">
                    {featuredPost.title}
                  </h2>
                  
                  <p className="text-neutral-500 font-sans font-light leading-relaxed text-sm md:text-base mb-8">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-neutral-200/60 mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#ece8e1] flex items-center justify-center text-[#bd7a58]">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#2c1d11]">{featuredPost.author}</p>
                      <p className="text-[10px] text-neutral-400 uppercase tracking-widest">{featuredPost.authorRole}</p>
                    </div>
                  </div>
                  
                  <div className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center group-hover:bg-[#bd7a58] group-hover:border-[#bd7a58] transition-colors">
                    <ArrowRight className="w-5 h-5 text-neutral-600 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Grid of standard articles */}
      <section className="max-w-7xl mx-auto px-6">
        {standardPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 blog-fade-up">
            {standardPosts.map((post) => (
              <Link 
                key={post.slug} 
                to={`/blog/${post.slug}`} 
                className="group flex flex-col bg-white border border-neutral-200/60 rounded-3xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_25px_45px_rgba(0,0,0,0.06)] hover:translate-y-[-4px] transition-all duration-500"
              >
                {/* Image wrapper */}
                <div className="w-full aspect-[16/10] relative overflow-hidden">
                  <img 
                    src={post.coverImg} 
                    alt={post.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out grayscale-[10%]"
                  />
                  <div className="absolute inset-0 bg-[#bd7a58]/5 mix-blend-multiply"></div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md text-[#2c1d11] text-[9px] font-monument tracking-wider uppercase px-3 py-1.5 rounded-full shadow-sm border border-neutral-200/50">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center gap-3 mb-4 text-[10px] text-neutral-400">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    </div>

                    <h3 className="text-lg md:text-xl font-monument uppercase tracking-tight text-[#2c1d11] group-hover:text-[#bd7a58] transition-colors leading-[1.3] mb-4 line-clamp-3">
                      {post.title}
                    </h3>

                    <p className="text-neutral-500 font-sans font-light text-xs md:text-sm leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Card footer */}
                  <div className="flex justify-between items-center pt-4 border-t border-neutral-100 mt-auto">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#ece8e1] flex items-center justify-center text-[#bd7a58] text-xs">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-[#2c1d11]">{post.author}</p>
                        <p className="text-[9px] text-neutral-400 uppercase tracking-widest line-clamp-1">{post.authorRole}</p>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center group-hover:bg-[#bd7a58] group-hover:border-[#bd7a58] transition-colors">
                      <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-neutral-200/60 rounded-3xl shadow-sm blog-fade-up">
            <p className="text-neutral-400 font-seasons italic text-xl">Không tìm thấy bài viết thuộc nhóm này.</p>
          </div>
        )}
      </section>
    </main>
  );
}
