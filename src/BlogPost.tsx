import { useParams, Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { SEO } from "./components/SEO";
import { mockPosts } from "./Blog";
import { useRegistration } from "./RegistrationContext";
import { ArrowLeft, Clock, Calendar, User, ChevronRight, Award, ShieldCheck, HeartPulse, Sparkles, MessageCircle, Loader2 } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { parseMarkdownToHTML } from "./lib/markdownParser";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const containerRef = useRef<HTMLDivElement>(null);
  const { openModal } = useRegistration();

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const docRef = doc(db, 'pages', 'blog', 'blocks', slug);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
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

          setPost({
            slug,
            title: data.title || '',
            category,
            date,
            readTime,
            excerpt: data.description || '',
            coverImg: data.mediaUrl || '',
            author,
            authorRole,
            content: data.content || '',
            isDynamic: true
          });
        } else {
          // Fallback to static mock post
          const mock = mockPosts.find((p) => p.slug === slug);
          if (mock) {
            setPost({ ...mock, isDynamic: false });
          } else {
            setPost(null);
          }
        }
      } catch (e) {
        console.error("Failed to fetch dynamic blog post:", e);
        const mock = mockPosts.find((p) => p.slug === slug);
        if (mock) {
          setPost({ ...mock, isDynamic: false });
        } else {
          setPost(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  useGSAP(() => {
    if (!loading) {
      window.scrollTo(0, 0);
      // Smooth page entrance
      gsap.fromTo(".post-fade-up",
        { opacity: 0 },
        { opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
    }
  }, { scope: containerRef, dependencies: [slug, loading] });

  if (loading) {
    return (
      <main className="w-full bg-[#fdfbf9] min-h-screen text-[#1a100c] pt-[20vh] pb-32 flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-orange" />
      </main>
    );
  }

  if (!post) {
    return (
      <main className="w-full bg-[#fdfbf9] min-h-screen text-[#1a100c] pt-[20vh] pb-32 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-monument uppercase tracking-tight text-[#2c1d11] mb-6">Không tìm thấy bài viết</h1>
        <p className="text-neutral-500 mb-8 font-sans font-light">Đường dẫn bài viết không tồn tại hoặc đã được thay đổi.</p>
        <Link to="/blog" className="px-8 py-3 rounded-full bg-[#1a100c] text-white text-xs font-monument tracking-widest uppercase hover:bg-[#bd7a58] transition-colors">
          Quay lại Blog
        </Link>
      </main>
    );
  }

  // Get related posts (exclude current)
  const relatedPosts = mockPosts.filter((p) => p.slug !== slug).slice(0, 3);

  // Render custom article body contents based on slug
  const renderArticleBody = () => {
    if (post.isDynamic) {
      try {
        const parsedBlocks = JSON.parse(post.content);
        if (Array.isArray(parsedBlocks) && parsedBlocks.length > 0 && parsedBlocks[0].type) {
          return (
            <div className="space-y-6 font-sans font-light leading-relaxed text-neutral-500">
              {parsedBlocks.map((block: any) => {
                switch (block.type) {
                  case 'heading':
                    if (block.headingType === 'h3') {
                      return (
                        <h3 key={block.id} className="text-xl md:text-2xl font-monument text-[#2c1d11] mt-8 mb-4 uppercase tracking-tight">
                          {block.value}
                        </h3>
                      );
                    }
                    return (
                      <h2 key={block.id} className="text-2xl md:text-3xl font-monument text-[#2c1d11] mt-12 mb-6 uppercase tracking-tight">
                        {block.value}
                      </h2>
                    );
                  case 'quote':
                    return (
                      <blockquote key={block.id} className="my-8 pl-6 border-l-4 border-brand-orange italic text-[#bd7a58] font-sans font-light text-base md:text-lg bg-neutral-50 py-4 pr-4 rounded-r-xl">
                        {block.value}
                      </blockquote>
                    );
                  case 'image':
                    const alignment = block.alignment || 'center';
                    const width = block.width || 'full';
                    
                    let alignClass = 'mx-auto clear-both block';
                    if (alignment === 'left') alignClass = 'md:float-left md:mr-8 md:mb-6 clear-none';
                    if (alignment === 'right') alignClass = 'md:float-right md:ml-8 md:mb-6 clear-none';
                    
                    let widthClass = 'w-full';
                    if (width === 'small') widthClass = 'w-full md:w-1/3';
                    if (width === 'medium') widthClass = 'w-full md:w-1/2';

                    return (
                      <div key={block.id} className={`my-8 bg-[#fffdfb] p-3 border border-neutral-200/50 rounded-3xl shadow-[0_15px_30px_rgba(0,0,0,0.02)] ${alignClass} ${widthClass}`}>
                        <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-100 flex items-center justify-center">
                          <img src={block.value} alt="" className="w-full h-full object-cover" />
                        </div>
                        {block.caption && (
                          <p className="text-center text-xs text-[#bd7a58] italic font-sans font-light mt-3 px-4">
                            {block.caption}
                          </p>
                        )}
                      </div>
                    );
                  default: // text
                    return (
                      <div 
                        key={block.id} 
                        className="prose prose-neutral max-w-none text-neutral-500 font-sans font-light text-sm md:text-base leading-relaxed" 
                        dangerouslySetInnerHTML={{ __html: parseMarkdownToHTML(block.value) }}
                      />
                    );
                }
              })}
              <div className="clear-both"></div>
            </div>
          );
        }
      } catch (_) {
        // Fallback for legacy text-based posts
      }

      const parsedHTML = parseMarkdownToHTML(post.content);
      return <div className="font-sans font-light leading-relaxed text-neutral-500 space-y-6" dangerouslySetInnerHTML={{ __html: parsedHTML }} />;
    }
    switch (slug) {
      case "chan-thuong-pickleball-va-bai-tap-bo-tro":
        return (
          <>
            <p className="lead text-lg md:text-xl text-neutral-600 font-sans font-light leading-relaxed mb-8">
              Cơn sốt Pickleball đang bùng nổ mạnh mẽ tại Việt Nam, đặc biệt là tại TP.HCM với hàng loạt tổ hợp sân hiện đại. Tuy nhiên, tính chất di chuyển cự ly ngắn, phanh gấp và xoay chuyển khớp liên tục khiến tỷ lệ chấn thương gối, cổ chân và khuỷu tay tăng vọt. Hãy cùng đội ngũ y sinh thể thao tại Active Fox phân tích nguyên nhân và thiết lập lá chắn bảo vệ cơ thể thông qua các bài tập bổ trợ khoa học.
            </p>

            <h2 className="text-2xl md:text-3xl font-monument text-[#2c1d11] mt-12 mb-6 uppercase tracking-tight">
              1. 3 Chấn thương thường gặp nhất trên sân Pickleball
            </h2>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              Dù được đánh giá là môn thể thao có cường độ va chạm thấp hơn tennis hay cầu lông, Pickleball vẫn đòi hỏi phản xạ cực nhanh trên bề mặt sân cứng có độ ma sát cao. Dưới đây là 3 chấn thương phổ biến nhất được ghi nhận tại hệ thống phục hồi Active Fox:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="p-6 bg-white border border-neutral-200/60 rounded-2xl shadow-sm">
                <span className="w-10 h-10 rounded-full bg-orange-50 text-brand-orange flex items-center justify-center font-bold text-lg mb-4">01</span>
                <h4 className="font-bold text-[#2c1d11] mb-2 font-sans">Viêm gân bánh chè & Dây chằng chéo</h4>
                <p className="text-xs text-neutral-500 font-sans leading-relaxed">Xảy ra do các pha phanh gấp đột ngột (deceleration) hoặc đổi hướng đột ngột để cứu các đường bóng sát lưới (dink shot).</p>
              </div>
              <div className="p-6 bg-white border border-neutral-200/60 rounded-2xl shadow-sm">
                <span className="w-10 h-10 rounded-full bg-orange-50 text-brand-orange flex items-center justify-center font-bold text-lg mb-4">02</span>
                <h4 className="font-bold text-[#2c1d11] mb-2 font-sans">Pickleball Elbow (Viêm gân duỗi cổ tay)</h4>
                <p className="text-xs text-neutral-500 font-sans leading-relaxed">Cơn đau nhói ở vùng ngoài khuỷu tay do kỹ thuật vung vợt sai tư thế, giật cổ tay quá mức hoặc sử dụng cốt vợt quá nặng/nhẹ.</p>
              </div>
              <div className="p-6 bg-white border border-neutral-200/60 rounded-2xl shadow-sm">
                <span className="w-10 h-10 rounded-full bg-orange-50 text-brand-orange flex items-center justify-center font-bold text-lg mb-4">03</span>
                <h4 className="font-bold text-[#2c1d11] mb-2 font-sans">Lật cổ chân (Bong gân cổ chân)</h4>
                <p className="text-xs text-neutral-500 font-sans leading-relaxed">Khi người chơi di chuyển ngang với tốc độ cao nhưng khớp cổ chân thiếu sự ổn định (stability) hoặc đi giày sai chủng loại.</p>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-monument text-[#2c1d11] mt-12 mb-6 uppercase tracking-tight">
              2. Nguyên nhân sâu xa dưới góc nhìn Sinh cơ học (Biomechanics)
            </h2>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              Theo tham vấn từ các chuyên gia phục hồi, chấn thương thực chất là kết quả của việc <strong className="text-[#2c1d11]">quá tải lực tích tụ</strong>. Khi bạn thực hiện động tác xoay người đánh bóng cứu thua, nếu khớp hông (Hip Joint) bị cứng và hạn chế biên độ vận động (Mobility), cơ thể sẽ tự động lấy bù biên độ từ khớp gối. Khớp gối vốn dĩ chỉ có biên độ gập/duỗi cơ bản sẽ bị vặn xoắn quá giới hạn chịu đựng, dẫn đến tổn thương dây chằng.
            </p>
            <blockquote className="my-8 pl-6 border-l-4 border-brand-orange italic text-[#bd7a58] font-sans font-light text-base md:text-lg bg-neutral-50 py-4 pr-4 rounded-r-xl">
              "Khớp gối là nạn nhân của sự lười biếng từ khớp hông và sự lỏng lẻo của khớp cổ chân."
            </blockquote>

            <h2 className="text-2xl md:text-3xl font-monument text-[#2c1d11] mt-12 mb-6 uppercase tracking-tight">
              3. Phác đồ 3 bài tập bổ trợ phòng ngừa chấn thương hiệu quả
            </h2>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              Để chơi Pickleball bền bỉ và không bị gián đoạn, hãy bổ sung ngay 3 bài tập sau vào lịch tập luyện hàng tuần của bạn:
            </p>

            <div className="space-y-8 my-8">
              <div className="flex flex-col md:flex-row gap-6 items-start pb-6 border-b border-neutral-200/60">
                <div className="bg-[#1a100c] text-white font-monument px-4 py-2 rounded-xl text-sm">STEP 1</div>
                <div>
                  <h4 className="font-bold text-lg text-[#2c1d11] mb-2 font-sans">Single-Leg Romanian Deadlift (RDL một chân)</h4>
                  <p className="text-sm text-neutral-500 font-sans leading-relaxed mb-2">
                    <strong>Tác dụng:</strong> Kích hoạt và tăng cường sức mạnh chuỗi cơ phía sau bao gồm mông, đùi sau (hamstring) và củng cố thăng bằng cổ chân. Đây là bài tập tối quan trọng giúp khớp gối trụ vững khi thắng phanh đột ngột.
                  </p>
                  <p className="text-xs text-[#bd7a58] italic font-sans font-medium">Thực hiện: 3 sets x 10 reps mỗi chân.</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start pb-6 border-b border-neutral-200/60">
                <div className="bg-[#1a100c] text-white font-monument px-4 py-2 rounded-xl text-sm">STEP 2</div>
                <div>
                  <h4 className="font-bold text-lg text-[#2c1d11] mb-2 font-sans">Lateral Lunge with Rotational T-Spine Reach</h4>
                  <p className="text-sm text-neutral-500 font-sans leading-relaxed mb-2">
                    <strong>Tác dụng:</strong> Tập trung kéo giãn biên độ khớp háng theo phương ngang, đồng thời xoay cột sống ngực. Giúp cơ thể thích ứng xuất sắc với các pha chuyển động đa hướng khó trên sân đấu.
                  </p>
                  <p className="text-xs text-[#bd7a58] italic font-sans font-medium">Thực hiện: 3 sets x 12 reps luân phiên hai bên.</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-[#1a100c] text-white font-monument px-4 py-2 rounded-xl text-sm">STEP 3</div>
                <div>
                  <h4 className="font-bold text-lg text-[#2c1d11] mb-2 font-sans">Cơ cẳng tay Eccentric Wrist Extension</h4>
                  <p className="text-sm text-neutral-500 font-sans leading-relaxed mb-2">
                    <strong>Tác dụng:</strong> Dùng một tạ đơn nhẹ (1-2kg), đặt cẳng tay lên đùi, từ từ hạ tạ xuống và nâng lên chậm rãi. Giúp củng cố gân cơ cùi chỏ, triệt tiêu hội chứng viêm khuỷu tay do vung vợt lệch tâm.
                  </p>
                  <p className="text-xs text-[#bd7a58] italic font-sans font-medium">Thực hiện: 3 sets x 15 reps mỗi tay.</p>
                </div>
              </div>
            </div>
          </>
        );

      case "dau-co-vai-gay-dan-van-phong-massage-tri-lieu":
        return (
          <>
            <p className="lead text-lg md:text-xl text-neutral-600 font-sans font-light leading-relaxed mb-8">
              Mỗi ngày ngồi làm việc 8-10 tiếng trước màn hình máy tính với tư thế "cổ rùa" vô tình tạo áp lực khổng lồ lên các đốt sống cổ. Rất nhiều dân văn phòng chia sẻ rằng họ đã thử qua hàng chục tiệm spa xoa bóp tinh dầu thường nhưng chỉ đỡ mỏi vài hôm rồi đâu lại vào đấy. Hãy cùng đi sâu phân tích cơ sở khoa học để hiểu tại sao massage thư giãn đơn thuần là chưa đủ để giải quyết dứt điểm vấn đề này.
            </p>

            <h2 className="text-2xl md:text-3xl font-monument text-[#2c1d11] mt-12 mb-6 uppercase tracking-tight">
              1. Hiểu đúng về các điểm nút thắt cơ học (Trigger Points)
            </h2>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              Khi một nhóm cơ (như cơ thang - Trapezius hay cơ nâng vai - Levator Scapulae) bị căng gồng liên tục để đỡ chiếc đầu nặng trung bình 5kg lệch khỏi trục sinh lý chuẩn, các sợi cơ sẽ bị bó nghẹt. Sự bó nghẹt này cản trở dòng chảy tuần hoàn máu, gây ra hiện tượng thiếu oxy cục bộ (hypoxia).
            </p>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              Hậu quả là các sợi cơ kết dính lại tạo thành các điểm nhạy cảm đau nhói gọi là <strong className="text-[#2c1d11]">Trigger Points (Điểm nút thắt cơ học)</strong>. Khi ấn vào các nút thắt này, cơn đau không chỉ nằm tại chỗ mà sẽ lan truyền (referred pain) lên đỉnh đầu, thái dương gây nhức đầu mãn tính, hoặc lan dọc xuống bả vai và cánh tay làm tê bì ngón tay.
            </p>

            <h2 className="text-2xl md:text-3xl font-monument text-[#2c1d11] mt-12 mb-6 uppercase tracking-tight">
              2. Vì sao Massage thư giãn thông thường thất bại?
            </h2>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              Các kỹ thuật massage thư giãn (như Swedish Massage) chủ yếu sử dụng lực xoa vuốt nhẹ nhàng ở lớp biểu bì ngoài da và các mô cơ nông. Điều này giúp kích thích hệ thần kinh phó giao cảm tạm thời, tạo cảm giác dễ chịu tức thì nhưng hoàn toàn không chạm tới và giải phóng được các điểm Trigger Points xơ hóa sâu bên dưới màng cơ (Fascia).
            </p>
            <div className="p-8 bg-neutral-50 border border-neutral-200/60 rounded-3xl my-8">
              <h4 className="font-bold text-[#2c1d11] mb-4 font-sans flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-orange" />
                Sự khác biệt cốt lõi của Massage Trị Liệu Y Khoa (Medical Therapy)
              </h4>
              <ul className="space-y-3 text-sm text-neutral-500 font-sans font-light">
                <li className="flex items-start gap-2">
                  <span className="text-[#bd7a58] font-bold mt-0.5">•</span>
                  <span><strong>Định vị chính xác Trigger Points:</strong> Trị liệu viên được đào tạo chuyên sâu về giải phẫu học để dò tìm chính xác ổ thắt cơ thay vì xoa bóp dàn trải.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#bd7a58] font-bold mt-0.5">•</span>
                  <span><strong>Kỹ thuật ấn giữ giải áp (Ischemic Compression):</strong> Tạo lực ấn định hướng vào điểm nút để chặn dòng máu tạm thời, sau đó thả ra đột ngột để dòng máu giàu oxy ùa vào làm tan rã nút thắt.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#bd7a58] font-bold mt-0.5">•</span>
                  <span><strong>Giải phóng mạc cơ (Myofascial Release):</strong> Bóc tách các mô liên kết màng cơ bị bó dính, khôi phục lại sự trượt trơn tru giữa các lớp cơ.</span>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl md:text-3xl font-monument text-[#2c1d11] mt-12 mb-6 uppercase tracking-tight">
              3. Giải pháp toàn diện từ Hệ thống phục hồi Active Fox
            </h2>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              Tại Active Fox, liệu trình trị liệu cổ vai gáy được thiết kế cá nhân hóa tuyệt đối. Chúng tôi không chỉ dùng đôi bàn tay có kỹ thuật lực sâu của trị liệu viên, mà còn kết hợp công cụ <strong className="text-[#2c1d11]">IASTM (dao chải cơ chuyên dụng bằng thép y tế)</strong> để quét và cạo sạch các dải xơ hóa lâu năm. 
            </p>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              Song song với giải phóng cơ học, khách hàng còn được hướng dẫn bài tập chỉnh sửa tư thế (posture correction) để khôi phục lại đường cong sinh lý cột sống cổ, đảm bảo hiệu quả trị liệu lâu dài và không tái phát cơn đau.
            </p>
          </>
        );

      case "indiba-448khz-va-emsculpt-bi-quyet-messi-ronaldo":
        return (
          <>
            <p className="lead text-lg md:text-xl text-neutral-600 font-sans font-light leading-relaxed mb-8">
              Bóng đá đỉnh cao ngày nay là cuộc chiến của thể lực và tốc độ hồi phục. Với lịch thi đấu dày đặc lên tới 60-70 trận mỗi mùa giải, những siêu sao như Lionel Messi hay Cristiano Ronaldo làm cách nào để luôn duy trì thể trạng ở tuổi U40? Câu trả lời nằm ở các thiết bị y tế phục hồi chuyên dụng ứng dụng tần số sinh học, nổi bật là Indiba RF 448kHz và EMSculpt.
            </p>

            <h2 className="text-2xl md:text-3xl font-monument text-[#2c1d11] mt-12 mb-6 uppercase tracking-tight">
              1. Tần số nội sinh Indiba 448kHz - Tái sinh mô ở cấp độ tế bào
            </h2>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              Công nghệ Indiba sử dụng sóng vô tuyến đặc hiệu tần số nội sinh 448kHz. Đây là tần số lý tưởng nhất để tối ưu hóa sự di chuyển của các ion qua màng tế bào, khôi phục lại điện thế màng vốn bị suy giảm khi mô bị chấn thương hoặc viêm nhiễm.
            </p>
            <blockquote className="my-8 pl-6 border-l-4 border-brand-orange italic text-[#bd7a58] font-sans font-light text-base md:text-lg bg-neutral-50 py-4 pr-4 rounded-r-xl">
              "Indiba 448kHz không truyền nhiệt từ bên ngoài vào cơ thể. Ngược lại, nó kích hoạt các phân tử bên trong tế bào tự chuyển động và sinh nhiệt tự nhiên từ trong ra ngoài (Nhiệt nội sinh), đẩy nhanh tốc độ phục hồi mô tổn thương gấp 3 lần."
            </blockquote>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              Nhờ cơ chế kích thích sinh học phi nhiệt (sub-thermal) độc đáo này, Indiba có thể áp dụng ngay trong giai đoạn cấp tính của chấn thương (vừa lật cổ chân hoặc rách cơ nhẹ) để triệt tiêu sưng viêm, phù nề lập tức mà các liệu pháp nhiệt thông thường chống chỉ định.
            </p>

            <h2 className="text-2xl md:text-3xl font-monument text-[#2c1d11] mt-12 mb-6 uppercase tracking-tight">
              2. EMSculpt - Kiến tạo sức mạnh vùng lõi (Core Stability) thụ động
            </h2>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              Bên cạnh phục hồi mô, việc củng cố nhóm cơ trung tâm (Core) vô cùng quan trọng để giảm tải áp lực cho cột sống và khớp gối khi vận động. EMSculpt sử dụng công nghệ điện từ trường hội tụ cường độ cao (HIFEM) đi xuyên qua các lớp da để kích hoạt cơ bắp.
            </p>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              Một buổi điều trị EMSculpt 30 phút tương đương với việc thực hiện <strong className="text-[#2c1d11]">20,000 lần gập bụng hoặc squat liên tục</strong> ở cường độ tối đa – điều mà không một vận động viên nào có thể thực hiện được bằng ý chí tự nhiên. Phương pháp co thắt cơ siêu tối đa này giúp gia tăng nhanh mật độ sợi cơ, tái cấu trúc hệ thống cơ bắp sâu quanh trục xương, tạo nền tảng vững chắc để chuyển lực mượt mà nhất.
            </p>

            <div className="my-8 rounded-[2rem] bg-gradient-to-br from-[#1a100c] to-[#2c1d11] text-white p-8 md:p-12 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#bd7a58]/10 rounded-full blur-2xl"></div>
              <span className="text-brand-orange text-xs font-bold uppercase tracking-widest block mb-2">Độc quyền tại Active Fox</span>
              <h3 className="text-xl md:text-2xl font-monument uppercase tracking-tight mb-4 text-[#fdfbf9]">Bộ đôi FoxFlex 448 & Magair Elite Sculpt+</h3>
              <p className="text-xs md:text-sm text-neutral-300 font-sans font-light leading-relaxed mb-6">
                Active Fox tự hào mang trọn vẹn mô hình phòng thí nghiệm y học thể thao chuẩn châu Âu về Việt Nam. Hệ thống máy cao cấp FoxFlex 448 (ứng dụng sóng RF nội sinh 448kHz) và Magair Elite Sculpt+ (công nghệ HIFEM siêu co cơ) đã sẵn sàng phục vụ bạn tại chi nhánh Sala và Cao Thắng.
              </p>
              <button onClick={() => openModal()} className="px-6 py-3 bg-[#FF6129] hover:bg-white hover:text-black text-white text-xs font-monument tracking-widest uppercase rounded-full transition-all duration-300">
                ĐĂNG KÝ TRẢI NGHIỆM LIỆU PHÁP CÔNG NGHỆ CAO
              </button>
            </div>
          </>
        );

      case "tai-sao-tu-tap-gym-khong-hieu-qua-hlv-ca-nhan":
        return (
          <>
            <p className="lead text-lg md:text-xl text-neutral-600 font-sans font-light leading-relaxed mb-8">
              Rất nhiều người tìm đến gym với tinh thần hăng hái, tự mày mò giáo án trên mạng, tự tập 3 đến 6 tháng nhưng cơ thể vẫn không có bất kỳ sự thay đổi rõ rệt nào. Thậm chí tệ hơn, nhiều người còn tích tụ chấn thương âm ỉ ở cột sống và khớp vai. Hãy cùng tìm hiểu tại sao giáo án đại trà không thể giúp bạn đột phá chỉ số thể chất.
            </p>
            <h2 className="text-2xl md:text-3xl font-monument text-[#2c1d11] mt-12 mb-6 uppercase tracking-tight">
              1. Thiếu kiểm tra tầm soát cơ bản (Bio-Assessment)
            </h2>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              Mỗi cơ thể là độc nhất với các biên độ vận động, cấu trúc xương và sự mất cân bằng cơ học khác nhau. Một bài tập Squat chuẩn mực trên mạng có thể cực tốt cho người này nhưng lại là thảm họa tàn phá đĩa đệm của người có cấu trúc xương hông hẹp hoặc khớp cổ chân bị bó cứng. Huấn luyện viên chuyên nghiệp luôn bắt đầu bằng buổi đo đạc phân tích cơ khớp kỹ lưỡng trước khi lên giáo án.
            </p>
            <h2 className="text-2xl md:text-3xl font-monument text-[#2c1d11] mt-12 mb-6 uppercase tracking-tight">
              2. Giáo án cá nhân hóa & Nguyên tắc quá tải lũy tiến (Progressive Overload)
            </h2>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              Để cơ bắp phát triển và cơ thể đốt mỡ hiệu quả, bạn cần áp dụng khoa học về lực đẩy và khối lượng tạ tăng dần theo chu kỳ một cách có kiểm soát. Việc tự tập theo cảm tính sẽ khiến bạn dễ bị chững lại ở vùng an toàn (Comfort Zone), hoặc nhảy vọt khối lượng tạ quá nhanh dẫn đến rách cơ, chấn thương dây chằng nghiêm trọng.
            </p>
          </>
        );

      case "contrast-water-therapy-ngam-nong-lanh-luon-phien":
        return (
          <>
            <p className="lead text-lg md:text-xl text-neutral-600 font-sans font-light leading-relaxed mb-8">
              Chắc hẳn bạn đã quen thuộc với hình ảnh các vận động viên điền kinh hay bóng đá chuyên nghiệp ngâm mình trong những bồn đá lạnh buốt sau trận đấu căng thẳng. Nhưng phương pháp tối ưu hơn cả được y học thể thao tin dùng chính là Ngâm nóng lạnh luân phiên (Contrast Water Therapy). Hãy cùng khám phá cơ chế vật lý kỳ diệu đằng sau liệu pháp phục hồi này.
            </p>
            <h2 className="text-2xl md:text-3xl font-monument text-[#2c1d11] mt-12 mb-6 uppercase tracking-tight">
              1. Cơ chế co giãn mạch máu - Hiệu ứng "Bơm huyết học"
            </h2>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              Khi bạn bước vào bồn nước lạnh (10-15°C), các mạch máu ở ngoại vi co thắt mạnh mẽ để giữ ấm cho cơ thể (Vaso-constriction). Ngay sau đó, khi bước sang bồn nước nóng (38-40°C), các mạch máu lập tức giãn nở tối đa (Vaso-dilation).
            </p>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              Sự luân phiên co thắt và giãn nở liên tục này tạo ra một lực đẩy tự nhiên được gọi là hiệu ứng <strong>"Bơm mạch máu" (Vascular Pumping Effect)</strong>. Cơ chế này kích hoạt hệ bạch huyết vận động mạnh mẽ, cuốn trôi dòng axit lactic tồn đọng và đào thải các mảnh vỡ tế bào viêm ra khỏi vùng cơ bắp bị tổn thương sau vận động nặng.
            </p>
            <h2 className="text-2xl md:text-3xl font-monument text-[#2c1d11] mt-12 mb-6 uppercase tracking-tight">
              2. Lợi ích vượt trội so với ngâm đá đơn thuần
            </h2>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              Ngâm đá lạnh đơn thuần rất tốt để giảm sưng cấp tính nhưng nếu ngâm quá lâu sẽ làm chậm quá trình tổng hợp protein và phục hồi cơ tự nhiên. CWT mang lại sự cân bằng hoàn hảo: vừa khống chế viêm nhiễm vừa thúc đẩy lưu thông máu giàu dinh dưỡng đến nuôi cơ bắp phục hồi thần tốc.
            </p>
          </>
        );

      case "giao-an-chay-bo-cho-nguoi-moi-bat-dau-chay-5km-khong-met":
        return (
          <>
            <p className="lead text-lg md:text-xl text-neutral-600 font-sans font-light leading-relaxed mb-8">
              Chạy bộ là bộ môn thể thao có rào cản tham gia thấp nhất, nhưng cũng là bộ môn có tỷ lệ bỏ cuộc cao nhất trong 2 tuần đầu tiên. Nguyên nhân phổ biến nhất là tình trạng thở dốc, kiệt sức sau vài trăm mét hoặc đau nhức ống đồng dữ dội do chạy quá nhanh và sai kỹ thuật. Hãy cùng đội ngũ huấn luyện viên Fox Run thiết lập lộ trình tập luyện khoa học giúp bạn chinh phục 5km đầu tiên một cách nhẹ nhàng và tràn đầy cảm hứng.
            </p>

            <h2 className="text-2xl md:text-3xl font-monument text-[#2c1d11] mt-12 mb-6 uppercase tracking-tight">
              1. Phương pháp đi bộ - chạy bộ xen kẽ (Run-Walk Method)
            </h2>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              Sai lầm lớn nhất của người mới là cố gắng chạy liên tục từ đầu đến cuối. Khi cơ tim và hệ mao mạch chưa kịp thích nghi, việc chạy liên tục sẽ đẩy nhịp tim lên vùng nguy hiểm (Zone 4/5), gây thiếu oxy và tích tụ axit lactic cực nhanh.
            </p>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              Phương pháp <strong>Run-Walk (do cựu VĐV Olympic Jeff Galloway sáng lập)</strong> khuyên bạn nên chia nhỏ quãng đường thành các chu kỳ chạy ngắn xen kẽ đi bộ chủ động. Điều này giúp kiểm soát nhịp tim ở vùng hiếu khí (Aerobic Zone 2), tạo thời gian cho cơ xương khớp thích nghi với phản lực từ mặt đường mà vẫn tích lũy được quãng đường cần thiết.
            </p>

            <h2 className="text-2xl md:text-3xl font-monument text-[#2c1d11] mt-12 mb-6 uppercase tracking-tight">
              2. Giáo án 4 tuần chinh phục 5km nền tảng
            </h2>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              Lịch tập tối ưu là 3 buổi/tuần, xen kẽ các ngày nghỉ ngơi hoàn toàn hoặc tập bổ trợ nhóm cơ lõi (Core) để tránh quá tải lực:
            </p>

            <div className="overflow-x-auto my-8 border border-neutral-200/60 rounded-2xl shadow-sm">
              <table className="w-full border-collapse bg-white text-left text-sm text-neutral-500 font-sans">
                <thead className="bg-neutral-50 text-xs font-monument uppercase tracking-wider text-[#2c1d11] border-b border-neutral-200/60">
                  <tr>
                    <th className="px-6 py-4">Tuần</th>
                    <th className="px-6 py-4">Cấu trúc buổi tập (Lặp lại 6-8 chu kỳ)</th>
                    <th className="px-6 py-4">Tổng thời gian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200/50">
                  <tr>
                    <td className="px-6 py-4 font-bold text-[#2c1d11]">Tuần 1</td>
                    <td className="px-6 py-4">Chạy chậm 1 phút - Đi bộ 2 phút</td>
                    <td className="px-6 py-4">21 - 24 phút</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-bold text-[#2c1d11]">Tuần 2</td>
                    <td className="px-6 py-4">Chạy chậm 1.5 phút - Đi bộ 1.5 phút</td>
                    <td className="px-6 py-4">24 - 30 phút</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-bold text-[#2c1d11]">Tuần 3</td>
                    <td className="px-6 py-4">Chạy chậm 2 phút - Đi bộ 1 phút</td>
                    <td className="px-6 py-4">24 - 30 phút</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-bold text-[#2c1d11]">Tuần 4</td>
                    <td className="px-6 py-4">Chạy liên tục 3-4km không nghỉ (tốc độ thoải mái)</td>
                    <td className="px-6 py-4">20 - 25 phút</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl md:text-3xl font-monument text-[#2c1d11] mt-12 mb-6 uppercase tracking-tight">
              3. Những nguyên tắc "vàng" ngăn chấn thương ống đồng
            </h2>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              Hầu hết chấn thương đau cẳng chân (Shin Splints) xảy ra do người mới chạy sải bước quá dài về phía trước (Overstriding), khiến gót chân tiếp đất mạnh và truyền phản lực thẳng lên xương chày. Hãy tập trung tiếp đất bằng nửa bàn chân trên (Midfoot) ngay dưới trọng tâm cơ thể và tăng tần số bước chạy (Cadence) lên mức khoảng 160-170 bước/phút.
            </p>

            <div className="my-8 rounded-[2rem] bg-gradient-to-br from-[#1a100c] to-[#2c1d11] text-white p-8 md:p-12 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#bd7a58]/10 rounded-full blur-2xl"></div>
              <span className="text-brand-orange text-xs font-bold uppercase tracking-widest block mb-2">LỚP HỌC NỀN TẢNG</span>
              <h3 className="text-xl md:text-2xl font-monument uppercase tracking-tight mb-4 text-[#fdfbf9]">Khóa Học Fox Run - Chạy Bộ Chuẩn Y Sinh</h3>
              <p className="text-xs md:text-sm text-neutral-300 font-sans font-light leading-relaxed mb-6">
                Bạn muốn cải thiện kỹ thuật chạy bộ, đo đạc dáng chạy (gait analysis) và có giáo án tập luyện 1:1 chuyên nghiệp? Hãy tham gia ngay lớp Fox Run tại Active Fox Sala & Cao Thắng để được các HLV căn chỉnh tư thế chạy khoa học nhất.
              </p>
              <button onClick={() => openModal()} className="px-6 py-3 bg-[#FF6129] hover:bg-white hover:text-black text-white text-xs font-monument tracking-widest uppercase rounded-full transition-all duration-300">
                Đăng ký phân tích dáng chạy & tập thử miễn phí
              </button>
            </div>
          </>
        );

      case "sports-massage-vs-spa-massage-khac-biet-cot-loi":
        return (
          <>
            <p className="lead text-lg md:text-xl text-neutral-600 font-sans font-light leading-relaxed mb-8">
              Sau những buổi chạy dài hoặc những buổi tập tạ cường độ cao, cơ bắp của bạn thường bị căng cứng và đau nhức dữ dội. Nhiều người lựa chọn đến các spa thư giãn thông thường để xoa bóp tinh dầu nhẹ nhàng, nhưng hiệu quả phục hồi gần như bằng không. Hãy cùng phân tích sự khác biệt cốt lõi giữa Massage Thể Thao (Sports Massage) chuyên nghiệp và Massage Thư Giãn thông thường.
            </p>

            <h2 className="text-2xl md:text-3xl font-monument text-[#2c1d11] mt-12 mb-6 uppercase tracking-tight">
              1. Lực tác động và Mô đích (Target Tissue)
            </h2>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              Massage thư giãn thông thường (Swedish, Aroma) chủ yếu sử dụng lực xoa vuốt nhẹ nhàng (effleurage) trên bề mặt da và lớp cơ nông nhằm xoa dịu hệ thần kinh cảm giác. 
            </p>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              Ngược lại, <strong>Sports Massage</strong> sử dụng lực sâu, cục bộ và có định hướng (deep tissue friction, compression) tác động trực tiếp vào các mô liên kết màng cơ sâu (deep fascia) và các sợi cơ bị kết dính. Kỹ thuật này giúp phá vỡ các liên kết xơ sẹo cơ học hình thành do quá trình tập luyện quá tải liên tục.
            </p>

            <h2 className="text-2xl md:text-3xl font-monument text-[#2c1d11] mt-12 mb-6 uppercase tracking-tight">
              2. Kỹ thuật chuyên biệt dành riêng cho vận động
            </h2>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              Không chỉ đơn thuần là xoa bóp, Sports Massage tại Active Fox kết hợp nhiều kỹ thuật y học thể thao tiên tiến:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="p-6 bg-white border border-neutral-200/60 rounded-2xl shadow-sm">
                <h4 className="font-bold text-[#2c1d11] mb-2 font-sans">Kéo giãn chủ động (Assisted Stretching)</h4>
                <p className="text-xs text-neutral-500 font-sans leading-relaxed">Trị liệu viên hỗ trợ đưa khớp của bạn về biên độ tối đa, giúp kéo dài các nhóm cơ bị rút ngắn do vận động lặp đi lặp lại.</p>
              </div>
              <div className="p-6 bg-white border border-neutral-200/60 rounded-2xl shadow-sm">
                <h4 className="font-bold text-[#2c1d11] mb-2 font-sans">Giải phóng điểm nút cơ (Trigger Point Release)</h4>
                <p className="text-xs text-neutral-500 font-sans leading-relaxed">Tìm kiếm và nhấn giữ các điểm đau kích hoạt để giải tỏa co thắt cơ cục bộ, giúp máu tuần hoàn mang oxy nuôi mô cơ.</p>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-monument text-[#2c1d11] mt-12 mb-6 uppercase tracking-tight">
              3. Mục tiêu phục hồi cơ sinh học
            </h2>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              Mục tiêu tối thượng của Spa thường là xoa dịu tinh thần, giảm stress tâm lý. Trong khi đó, Sports Massage tập trung khôi phục lại chức năng vận động cơ học ban đầu: tăng biên độ khớp (Range of Motion), đẩy nhanh quá trình đào thải lactate, ngăn ngừa xơ hóa mô mềm và tối ưu hóa hiệu suất vận động cho buổi tập tiếp theo.
            </p>

            <div className="p-8 bg-neutral-50 border border-neutral-200/60 rounded-3xl my-8">
              <h4 className="font-bold text-[#2c1d11] mb-4 font-sans flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-orange" />
                Dịch vụ Sports Massage chuyên sâu tại Active Fox
              </h4>
              <p className="text-sm text-neutral-500 font-sans font-light leading-relaxed mb-4">
                Liệu trình Sports Massage của chúng tôi được thực hiện bởi đội ngũ trị liệu viên y sinh thể thao giàu kinh nghiệm. Kết hợp sử dụng súng giải cơ lực sâu Theragun, dao chải mạc cơ IASTM và giác hơi mạc cơ y học giúp cơ bắp hồi sinh thần tốc.
              </p>
              <button onClick={() => openModal()} className="px-6 py-3 bg-[#1a100c] text-white hover:bg-brand-orange hover:text-black text-xs font-monument tracking-widest uppercase rounded-full transition-all duration-300">
                Đặt lịch Sports Massage ngay
              </button>
            </div>
          </>
        );

      case "giai-phap-boc-tach-mac-co-dao-chai-iastm":
        return (
          <>
            <p className="lead text-lg md:text-xl text-neutral-600 font-sans font-light leading-relaxed mb-8">
              Nếu bạn đang gặp phải các cơn đau mỏi cơ âm ỉ dai dẳng, khớp vai bị bó cứng không thể giơ tay hết cỡ, hoặc khớp cổ chân bị giới hạn khi squat sâu – rất có thể hệ thống mạc cơ (Fascia) của bạn đang bị dính kết và xơ hóa. Liệu pháp dao chải cơ IASTM chính là chìa khóa vàng mở ra biên độ vận động tự do cho cơ thể.
            </p>

            <h2 className="text-2xl md:text-3xl font-monument text-[#2c1d11] mt-12 mb-6 uppercase tracking-tight">
              1. Hệ thống mạc cơ (Fascia) và nguyên nhân gây bó dính cơ khớp
            </h2>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              Mạc cơ (Fascia) là một mạng lưới mô liên kết 3D bao bọc quanh mọi sợi cơ, bó cơ, xương và cơ quan nội tạng. Ở trạng thái khỏe mạnh, mạc cơ mềm dẻo, ẩm ướt và trượt lên nhau trơn tru để hỗ trợ các chuyển động đa hướng.
            </p>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              Tuy nhiên, do tập luyện quá tải lặp đi lặp lại, chấn thương chưa phục hồi hoàn toàn hoặc tư thế xấu kéo dài (ngồi gù lưng), mạc cơ sẽ bị mất nước, kết dính lại với nhau thành các dải xơ cứng (adhesions). Điều này hạn chế dòng chảy máu nuôi dưỡng, gây viêm cục bộ và giới hạn nghiêm trọng góc vận động của khớp.
            </p>

            <h2 className="text-2xl md:text-3xl font-monument text-[#2c1d11] mt-12 mb-6 uppercase tracking-tight">
              2. Liệu pháp IASTM hoạt động như thế nào?
            </h2>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              <strong>IASTM (Instrument Assisted Soft Tissue Mobilization)</strong> sử dụng các công cụ chuyên dụng bằng thép không gỉ y tế cao cấp, có các góc cạnh được mài vát chính xác để quét trên bề mặt da.
            </p>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              Khi chải trên vùng cơ bị tổn thương, dao chải IASTM sẽ tạo ra một áp lực cơ học vừa đủ để phá vỡ cấu trúc collagen chéo bị kết dính sai lệch. Quá trình này tạo ra các vi tổn thương có kiểm soát (controlled micro-trauma), kích hoạt phản ứng viêm tự nhiên lành tính của cơ thể để thu hút dòng máu giàu dinh dưỡng đến tái cấu trúc sợi collagen mới song song thẳng hàng, mềm dẻo như ban đầu.
            </p>

            <h2 className="text-2xl md:text-3xl font-monument text-[#2c1d11] mt-12 mb-6 uppercase tracking-tight">
              3. Những lợi ích thực tế được chứng minh lâm sàng
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="p-6 bg-white border border-neutral-200/60 rounded-2xl shadow-sm">
                <span className="text-brand-orange font-bold text-lg mb-2 block">01</span>
                <h4 className="font-bold text-[#2c1d11] mb-2 font-sans">Tăng biên độ khớp lập tức</h4>
                <p className="text-xs text-neutral-500 font-sans leading-relaxed">Giải phóng bó dính màng cơ giúp khôi phục góc xoay tự nhiên của các khớp vai, háng, cổ chân ngay sau buổi đầu tiên.</p>
              </div>
              <div className="p-6 bg-white border border-neutral-200/60 rounded-2xl shadow-sm">
                <span className="text-brand-orange font-bold text-lg mb-2 block">02</span>
                <h4 className="font-bold text-[#2c1d11] mb-2 font-sans">Kích thích tái tạo mô nhanh</h4>
                <p className="text-xs text-neutral-500 font-sans leading-relaxed">Tăng tưới máu vi tuần hoàn cục bộ, đẩy nhanh quá trình làm lành các chứng viêm gân mãn tính (viêm gân gót gối, viêm cân gan chân).</p>
              </div>
              <div className="p-6 bg-white border border-neutral-200/60 rounded-2xl shadow-sm">
                <span className="text-brand-orange font-bold text-lg mb-2 block">03</span>
                <h4 className="font-bold text-[#2c1d11] mb-2 font-sans">Triệt tiêu thụ thể gây đau</h4>
                <p className="text-xs text-neutral-500 font-sans leading-relaxed">Làm giảm sự nhạy cảm quá mức của các sợi thần kinh truyền tín hiệu đau tại các điểm nút thắt cơ cứng.</p>
              </div>
            </div>

            <div className="my-8 rounded-[2rem] bg-gradient-to-br from-[#1a100c] to-[#2c1d11] text-white p-8 md:p-12 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#bd7a58]/10 rounded-full blur-2xl"></div>
              <span className="text-brand-orange text-xs font-bold uppercase tracking-widest block mb-2">ĐẶT LỊCH TRỊ LIỆU</span>
              <h3 className="text-xl md:text-2xl font-monument uppercase tracking-tight mb-4 text-[#fdfbf9]">Trải Nghiệm Liệu Pháp Dao Chải Cơ IASTM Tại Active Fox</h3>
              <p className="text-xs md:text-sm text-neutral-300 font-sans font-light leading-relaxed mb-6">
                Giải phóng sự bó cứng và lấy lại sự linh hoạt tối đa cho cơ thể cùng các chuyên gia trị liệu của chúng tôi. Hệ thống Active Fox tự hào áp dụng phác đồ kết hợp chải mạc cơ IASTM y học thể thao thế giới.
              </p>
              <button onClick={() => openModal()} className="px-6 py-3 bg-[#FF6129] hover:bg-white hover:text-black text-white text-xs font-monument tracking-widest uppercase rounded-full transition-all duration-300">
                Đăng ký khám tư vấn & trải nghiệm IASTM
              </button>
            </div>
          </>
        );

      case "dau-moi-co-sau-tap-doms-giam-dau-co-khoa-hoc":
        return (
          <>
            <p className="lead text-lg md:text-xl text-neutral-600 font-sans font-light leading-relaxed mb-8">
              Khi bạn thử một bài tập mới, tăng khối lượng tạ tập hoặc nâng cự ly chạy dài, cơ bắp thường có hiện tượng đau nhức ê ẩm, căng cứng kéo dài suốt 24 đến 72 giờ tiếp theo. Hiện tượng này được y học gọi là DOMS (Delayed Onset Muscle Soreness) - Đau mỏi cơ trì hoãn. Hãy cùng tìm hiểu bản chất sinh học của DOMS và các cách phục hồi nhanh chóng dựa trên y học thể thao chuẩn xác.
            </p>

            <h2 className="text-2xl md:text-3xl font-monument text-[#2c1d11] mt-12 mb-6 uppercase tracking-tight">
              1. DOMS thực chất là gì? Giải oan cho Axit Lactic
            </h2>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              Nhiều người lầm tưởng axit lactic tích tụ là thủ phạm gây đau mỏi cơ trong nhiều ngày sau tập. Tuy nhiên, các nghiên cứu sinh lý học thể thao đã chỉ ra rằng axit lactic chỉ tồn đọng trong mô cơ khoảng 1-2 tiếng sau tập và sẽ được gan đào thải hoàn toàn.
            </p>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              DOMS thực chất là kết quả của các <strong>vi tổn thương siêu nhỏ (micro-tears)</strong> xảy ra ở các sợi tơ cơ (myofibrils), đặc biệt là trong pha co cơ kéo dài (eccentric phase - ví dụ lúc hạ tạ xuống chậm hoặc chạy xuống dốc). Sự tổn thương này châm ngòi cho phản ứng viêm tự nhiên, tế bào sưng nhẹ và đè vào các dây thần kinh cảm giác, tạo ra cảm giác đau nhức âm ỉ.
            </p>

            <h2 className="text-2xl md:text-3xl font-monument text-[#2c1d11] mt-12 mb-6 uppercase tracking-tight">
              2. 4 Liệu pháp giảm đau mỏi cơ DOMS nhanh gấp đôi
            </h2>
            <p className="mb-6 font-sans font-light text-neutral-500 leading-relaxed">
              Thay vì chịu đựng cơn đau một cách thụ động, bạn có thể chủ động đẩy nhanh tốc độ phục hồi cơ bắp bằng 4 liệu pháp khoa học dưới đây:
            </p>

            <div className="space-y-6 my-8">
              <div className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-orange-50 text-brand-orange flex items-center justify-center font-bold text-xs flex-shrink-0">01</span>
                <div>
                  <h4 className="font-bold text-[#2c1d11] mb-1 font-sans">Liệu pháp ngâm bồn nóng lạnh luân phiên (CWT)</h4>
                  <p className="text-xs text-neutral-500 font-sans leading-relaxed">Kích hoạt cơ chế co giãn tuần hoàn mạch máu luân phiên giúp bơm oxy tươi mang chất dinh dưỡng đi phục hồi vùng cơ tổn thương nhanh nhất.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-orange-50 text-brand-orange flex items-center justify-center font-bold text-xs flex-shrink-0">02</span>
                <div>
                  <h4 className="font-bold text-[#2c1d11] mb-1 font-sans">Thiết bị nén khí phục hồi (Pneumatic Compression)</h4>
                  <p className="text-xs text-neutral-500 font-sans leading-relaxed">Sử dụng quần nén khí Normatec để tạo áp lực cơ học dồn đẩy tuần hoàn máu tĩnh mạch và dịch bạch huyết nghẽn từ chân về tim, xua tan cơn căng mỏi chân tức thì.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-orange-50 text-brand-orange flex items-center justify-center font-bold text-xs flex-shrink-0">03</span>
                <div>
                  <h4 className="font-bold text-[#2c1d11] mb-1 font-sans">Kéo giãn cơ thụ động (Assisted Stretching) kết hợp Percussive Therapy</h4>
                  <p className="text-xs text-neutral-500 font-sans leading-relaxed">Dùng súng gõ Theragun tác động lực rung tần số cao giải phóng màng cơ kết hợp kéo dãn hỗ trợ của trị liệu viên giúp sắp xếp lại các dải cơ rối thẳng hàng.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-orange-50 text-brand-orange flex items-center justify-center font-bold text-xs flex-shrink-0">04</span>
                <div>
                  <h4 className="font-bold text-[#2c1d11] mb-1 font-sans">Dinh dưỡng tái tạo (Protein & Hydration)</h4>
                  <p className="text-xs text-neutral-500 font-sans leading-relaxed">Bổ sung đủ lượng nước điện giải và protein hấp thụ nhanh ngay sau tập để cung cấp nguyên liệu axit amin vá lành các tổn thương sợi cơ siêu nhỏ.</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-neutral-50 border border-neutral-200/60 rounded-3xl my-8">
              <h4 className="font-bold text-[#2c1d11] mb-4 font-sans flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-brand-orange" />
                Trải nghiệm Trung tâm Phục hồi thể chất Active Fox
              </h4>
              <p className="text-sm text-neutral-500 font-sans font-light leading-relaxed mb-4">
                Active Fox sở hữu đầy đủ hệ thống bồn ngâm nóng lạnh, thiết bị nén khí Normatec và phòng kéo dãn giải cơ sâu giúp bạn hồi phục 100% thể trạng chỉ sau một buổi trị liệu. Hãy đăng ký đặt lịch trải nghiệm ngay hôm nay.
              </p>
              <button onClick={() => openModal()} className="px-6 py-3 bg-[#1a100c] text-white hover:bg-brand-orange hover:text-black text-xs font-monument tracking-widest uppercase rounded-full transition-all duration-300">
                Đặt lịch phục hồi cơ thể chuyên sâu
              </button>
            </div>
          </>
        );

      default:
        return <p className="font-sans font-light text-neutral-500 leading-relaxed">Nội dung đang được cập nhật...</p>;
    }
  };

  return (
    <main ref={containerRef} className="w-full bg-[#fdfbf9] min-h-screen text-[#1a100c] pt-[12vh] md:pt-[15vh] pb-32">
      <SEO 
        title={`${post.title} | Active Fox Blog`}
        description={post.excerpt}
        image={post.coverImg}
        path={`/blog/${post.slug}`}
      />

      {/* Article Header */}
      <section className="max-w-4xl mx-auto px-6 mb-8 post-fade-up">
        {/* Back Button */}
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-[#bd7a58] transition-colors text-xs font-monument uppercase tracking-widest mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Quay lại Blog
        </Link>

        {/* Category & Metadata */}
        <div className="flex items-center gap-3 mb-6">
          <span className="bg-[#bd7a58] text-white text-[10px] font-monument tracking-wider uppercase px-3.5 py-1.5 rounded-full shadow-sm">
            {post.category}
          </span>
          <span className="text-neutral-300">•</span>
          <span className="flex items-center gap-1 text-xs text-neutral-400 font-sans">
            <Calendar className="w-3.5 h-3.5" /> {post.date}
          </span>
          <span className="text-neutral-300">•</span>
          <span className="flex items-center gap-1 text-xs text-neutral-400 font-sans">
            <Clock className="w-3.5 h-3.5" /> {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-monument uppercase tracking-tight text-[#2c1d11] leading-[1.2] mb-8">
          {post.title}
        </h1>

        {/* Author box */}
        <div className="flex items-center gap-4 py-6 border-y border-neutral-200/60">
          <div className="w-12 h-12 rounded-full bg-[#ece8e1] flex items-center justify-center text-[#bd7a58]">
            <User className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-bold text-[#2c1d11]">{post.author}</p>
              <Award className="w-4 h-4 text-brand-orange" />
            </div>
            <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">{post.authorRole}</p>
          </div>
        </div>
      </section>

      {/* Featured Cover Image */}
      <section className="max-w-6xl mx-auto px-6 mb-16 post-fade-up">
        <div className="aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative">
          <img 
            src={post.coverImg} 
            alt={post.title} 
            className="w-full h-full object-cover grayscale-[10%]"
          />
          <div className="absolute inset-0 bg-[#bd7a58]/5 mix-blend-multiply"></div>
        </div>
      </section>

      {/* Main content body */}
      <section className="max-w-3xl mx-auto px-6 mb-20 post-fade-up">
        <article className="prose prose-neutral max-w-none prose-headings:font-monument prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-[#2c1d11] prose-p:font-sans prose-p:font-light prose-p:leading-relaxed prose-p:text-neutral-500 prose-strong:text-[#2c1d11] prose-a:text-[#bd7a58]">
          {renderArticleBody()}
        </article>
      </section>

      {/* E-E-A-T & Consult Card */}
      <section className="max-w-4xl mx-auto px-6 mb-24 post-fade-up">
        <div className="bg-[#fffdfb] border border-neutral-200/80 rounded-[2.5rem] p-8 md:p-12 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF6129]/5 rounded-bl-full pointer-events-none"></div>
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#ece8e1] flex-shrink-0 flex items-center justify-center text-[#bd7a58]">
            <HeartPulse className="w-10 h-10 md:w-12 md:h-12" />
          </div>
          <div className="flex-grow text-center md:text-left">
            <span className="text-[10px] bg-neutral-100 text-[#bd7a58] px-3 py-1 rounded-full uppercase tracking-widest font-monument inline-block mb-3">
              Tham vấn chuyên môn y khoa
            </span>
            <h3 className="text-xl md:text-2xl font-monument uppercase tracking-tight text-[#2c1d11] mb-3">
              Tiêu chuẩn E-E-A-T từ Active Fox
            </h3>
            <p className="text-neutral-500 font-sans font-light text-sm leading-relaxed mb-6">
              Mọi nội dung chia sẻ trên Active Fox Blog đều được kiểm chứng nghiêm ngặt bởi Hội đồng Chuyên môn Y học Thể thao, Trị liệu viên Trưởng và HLV Trưởng của hệ thống nhằm đảm bảo tính chính xác khoa học và an toàn tuyệt đối cho người tập.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={() => openModal()}
                className="px-6 py-3.5 bg-[#1a100c] hover:bg-[#bd7a58] text-white text-xs font-monument tracking-widest uppercase rounded-full transition-colors duration-300"
              >
                Đăng Ký Tư Vấn 1-1 Miễn Phí
              </button>
              <a 
                href="https://zalo.me" 
                target="_blank" 
                rel="noreferrer" 
                className="px-6 py-3.5 border border-neutral-200 hover:border-[#1a100c] hover:bg-neutral-50 text-neutral-600 hover:text-black text-xs font-monument tracking-widest uppercase rounded-full transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Chat qua Zalo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="max-w-7xl mx-auto px-6 border-t border-neutral-200/60 pt-16 post-fade-up">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-brand-orange text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] block mb-2">Đọc tiếp</span>
            <h2 className="text-2xl md:text-3xl font-monument uppercase tracking-tight text-[#2c1d11]">Bài viết liên quan</h2>
          </div>
          <Link to="/blog" className="text-xs font-monument uppercase tracking-widest text-neutral-400 hover:text-[#bd7a58] transition-colors flex items-center gap-1">
            Tất cả bài viết <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedPosts.map((rPost) => (
            <Link 
              key={rPost.slug} 
              to={`/blog/${rPost.slug}`}
              className="group flex flex-col bg-white border border-neutral-200/60 rounded-3xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all duration-500"
            >
              <div className="aspect-[16/10] relative overflow-hidden">
                <img 
                  src={rPost.coverImg} 
                  alt={rPost.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-[#bd7a58]/5 mix-blend-multiply"></div>
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-[#bd7a58] text-[9px] font-monument tracking-wider uppercase mb-3.5 block">{rPost.category}</span>
                  <h3 className="text-base font-monument uppercase tracking-tight text-[#2c1d11] group-hover:text-[#bd7a58] transition-colors leading-[1.3] mb-3 line-clamp-2">
                    {rPost.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-sans font-light leading-relaxed line-clamp-2 mb-4">
                    {rPost.excerpt}
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-4 border-t border-neutral-100 mt-auto text-[10px] text-neutral-400 font-sans">
                  <span>{rPost.date}</span>
                  <span>•</span>
                  <span>{rPost.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
