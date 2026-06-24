import { useEffect, useState } from 'react';
import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Plus, Edit, Trash2, Save, ArrowLeft, Loader2, CheckCircle2, AlertCircle, FileText, Calendar, User, Clock, ChevronUp, ChevronDown, Type, Image as ImageIcon, Quote, Heading, Bold, Italic, Link as LinkIcon, AlignLeft, AlignCenter, AlignRight, Maximize2, Minimize2, List, Upload } from 'lucide-react';
import { parseMarkdownToHTML } from '../lib/markdownParser';

export interface ArticleBlock {
  id: string;
  type: 'text' | 'image' | 'heading' | 'quote';
  value: string;
  headingType?: 'h2' | 'h3';
  alignment?: 'left' | 'center' | 'right';
  width?: 'small' | 'medium' | 'full';
  caption?: string;
}

interface BlogMetadata {
  category: 'TẬP LUYỆN' | 'MASSAGE' | 'PHỤC HỒI';
  author: string;
  authorRole: string;
}

interface BlogTimeline {
  date: string;
  readTime: string;
}

export interface DynamicPost {
  slug: string;
  title: string;
  category: 'TẬP LUYỆN' | 'MASSAGE' | 'PHỤC HỒI';
  date: string;
  readTime: string;
  excerpt: string;
  coverImg: string;
  author: string;
  authorRole: string;
  content: string;
}

export default function CMSBlogManager() {
  const [posts, setPosts] = useState<DynamicPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Editor states
  const [isEditing, setIsEditing] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'TẬP LUYỆN' | 'MASSAGE' | 'PHỤC HỒI'>('TẬP LUYỆN');
  const [date, setDate] = useState('');
  const [readTime, setReadTime] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImg, setCoverImg] = useState('');
  const [coverUploading, setCoverUploading] = useState(false);
  const [uploadingBlocks, setUploadingBlocks] = useState<Record<string, boolean>>({});
  const [author, setAuthor] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  
  // Custom blocks state
  const [blocks, setBlocks] = useState<ArticleBlock[]>([
    { id: 'init-0', type: 'text', value: '' }
  ]);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(db, 'pages', 'blog', 'blocks'));
      const fetched: DynamicPost[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        let category: 'TẬP LUYỆN' | 'MASSAGE' | 'PHỤC HỒI' = 'TẬP LUYỆN';
        let author = 'Đội ngũ chuyên gia Active Fox';
        let authorRole = 'Tham vấn y sinh thể thao';
        let date = new Date().toLocaleDateString('vi-VN');
        let readTime = '5 phút đọc';

        try {
          if (data.subtitle) {
            const meta: BlogMetadata = JSON.parse(data.subtitle);
            if (meta.category) category = meta.category;
            if (meta.author) author = meta.author;
            if (meta.authorRole) authorRole = meta.authorRole;
          }
        } catch (e) {
          console.error("Failed to parse subtitle JSON for blog slug:", doc.id, e);
        }

        try {
          if (data.mediaUrl2) {
            const timeline: BlogTimeline = JSON.parse(data.mediaUrl2);
            if (timeline.date) date = timeline.date;
            if (timeline.readTime) readTime = timeline.readTime;
          }
        } catch (e) {
          console.error("Failed to parse mediaUrl2 JSON for blog slug:", doc.id, e);
        }

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
          content: data.content || ''
        });
      });

      setPosts(fetched);
    } catch (e) {
      console.error("Error fetching posts:", e);
      setError('Không thể tải danh sách bài viết từ cơ sở dữ liệu. Chi tiết: ' + (e instanceof Error ? e.message : String(e)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreateNew = () => {
    setIsEditing(true);
    setIsNew(true);
    setSlug('');
    setTitle('');
    setCategory('TẬP LUYỆN');
    setDate(new Date().toLocaleDateString('vi-VN'));
    setReadTime('5 phút đọc');
    setExcerpt('');
    setCoverImg('https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80');
    setAuthor('Đội ngũ chuyên gia Active Fox');
    setAuthorRole('Tham vấn y sinh thể thao');
    
    // Default blocks for new post
    setBlocks([
      { id: 'block-0', type: 'text', value: '' }
    ]);
    
    setActiveTab('edit');
    setError(null);
  };

  const handleEdit = (post: DynamicPost) => {
    setIsEditing(true);
    setIsNew(false);
    setSlug(post.slug);
    setTitle(post.title);
    setCategory(post.category);
    setDate(post.date);
    setReadTime(post.readTime);
    setExcerpt(post.excerpt);
    setCoverImg(post.coverImg);
    setAuthor(post.author);
    setAuthorRole(post.authorRole);

    // Attempt block array deserialization from content
    try {
      const parsed = JSON.parse(post.content);
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].type) {
        setBlocks(parsed);
      } else {
        // Fallback for raw text legacy posts
        setBlocks([{ id: `block-${Date.now()}`, type: 'text', value: post.content }]);
      }
    } catch (_) {
      // Fallback if not valid JSON
      setBlocks([{ id: `block-${Date.now()}`, type: 'text', value: post.content }]);
    }
    
    setActiveTab('edit');
    setError(null);
  };

  const handleDelete = async (postSlug: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa bài viết "${postSlug}" không?`)) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'pages', 'blog', 'blocks', postSlug));
      setSuccess('Xóa bài viết thành công!');
      setTimeout(() => setSuccess(null), 3000);
      await fetchPosts();
    } catch (e) {
      console.error("Error deleting post:", e);
      setError('Có lỗi xảy ra khi xóa bài viết. Chi tiết: ' + (e instanceof Error ? e.message : String(e)));
      setLoading(false);
    }
  };

  // Block management helper functions
  const addBlock = (type: 'text' | 'image' | 'heading' | 'quote', index: number) => {
    const newBlock: ArticleBlock = {
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      value: '',
      headingType: type === 'heading' ? 'h2' : undefined,
      alignment: type === 'image' ? 'center' : undefined,
      width: type === 'image' ? 'full' : undefined,
      caption: type === 'image' ? '' : undefined
    };

    setBlocks(prev => {
      const next = [...prev];
      next.splice(index + 1, 0, newBlock);
      return next;
    });
  };

  const removeBlock = (id: string) => {
    setBlocks(prev => {
      const next = prev.filter(b => b.id !== id);
      if (next.length === 0) {
        return [{ id: `block-${Date.now()}`, type: 'text', value: '' }];
      }
      return next;
    });
  };

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    setBlocks(prev => {
      const idx = prev.findIndex(b => b.id === id);
      if (idx === -1) return prev;
      
      const newIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= prev.length) return prev;
      
      const next = [...prev];
      const temp = next[idx];
      next[idx] = next[newIdx];
      next[newIdx] = temp;
      return next;
    });
  };

  const updateBlockValue = (id: string, value: string, extra?: Partial<ArticleBlock>) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, value, ...extra } : b));
  };

  const handleShortcutInsert = (id: string, syntax: string) => {
    setBlocks(prev => prev.map(b => {
      if (b.id === id) {
        return { ...b, value: b.value + syntax };
      }
      return b;
    }));
  };

  // Core Image Upload Utility (Firebase Storage + Highly Compressed Base64 Fallback)
  const uploadImageFile = async (file: File): Promise<string> => {
    try {
      const fileRef = ref(storage, `blog-images/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`);
      const snapshot = await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (storageError) {
      console.warn("Firebase Storage upload failed or not configured. Falling back to compressed Base64:", storageError);
      
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target?.result as string;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 800;
            let width = img.width;
            let height = img.height;

            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            if (!ctx) {
              reject(new Error("Could not get canvas context"));
              return;
            }

            ctx.drawImage(img, 0, 0, width, height);
            // Compress as JPEG with 0.6 quality (creates a very small image ~20-40KB)
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.6);
            resolve(compressedDataUrl);
          };
          img.onerror = (err) => reject(err);
        };
        reader.onerror = (err) => reject(err);
      });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug.trim()) {
      setError('Đường dẫn (Slug) không được để trống.');
      return;
    }
    const cleanSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-');
    
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // Package metadata into JSON strings
      const subtitleJSON = JSON.stringify({
        category,
        author,
        authorRole
      });

      const mediaUrl2JSON = JSON.stringify({
        date,
        readTime
      });

      // Filter and clean block fields before saving
      const cleanedBlocks = blocks.map((b) => {
        const cleaned: ArticleBlock = { id: b.id, type: b.type, value: b.value.trim() };
        if (b.type === 'heading') cleaned.headingType = b.headingType;
        if (b.type === 'image') {
          cleaned.alignment = b.alignment;
          cleaned.width = b.width;
          cleaned.caption = b.caption?.trim();
        }
        return cleaned;
      });

      const blockData = {
        name: cleanSlug,
        title: title.trim(),
        description: excerpt.trim(),
        content: JSON.stringify(cleanedBlocks), // Store entire blocks stack as JSON string
        mediaUrl: coverImg.trim(),
        subtitle: subtitleJSON,
        mediaUrl2: mediaUrl2JSON,
        updatedAt: Date.now()
      };

      // Set page metadata as well to ensure page exists
      await setDoc(doc(db, 'pages', 'blog'), {
        title: 'Active Fox Blog',
        path: '/blog',
        updatedAt: Date.now()
      }, { merge: true });

      // Save block under 'blog' page
      await setDoc(doc(db, 'pages', 'blog', 'blocks', cleanSlug), blockData, { merge: true });

      setSuccess('Đã lưu bài viết thành công!');
      setTimeout(() => setSuccess(null), 3000);
      setIsEditing(false);
      await fetchPosts();
    } catch (e) {
      console.error("Error during save:", e);
      setError('Có lỗi xảy ra khi lưu bài viết. Chi tiết: ' + (e instanceof Error ? e.message : String(e)));
    } finally {
      setSaving(false);
    }
  };

  // Visual insertion dashed line between block cards
  const renderAddBlockLine = (index: number) => (
    <div className="group relative flex justify-center py-2 my-1">
      <div className="absolute inset-y-0 left-0 right-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-dashed border-white/10 group-hover:border-brand-orange/45 transition-colors" />
      </div>
      <div className="relative flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-350 transform scale-95 group-hover:scale-100 z-10">
        <div className="flex gap-2.5 bg-neutral-900 border border-brand-orange/40 px-4 py-2 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <button 
            type="button" 
            onClick={() => addBlock('text', index)} 
            className="flex items-center gap-1.5 text-[9px] font-monument uppercase tracking-widest text-neutral-300 hover:text-brand-orange transition-colors"
          >
            <Type className="w-3.5 h-3.5" /> + Chữ
          </button>
          <span className="text-white/10">|</span>
          <button 
            type="button" 
            onClick={() => addBlock('heading', index)} 
            className="flex items-center gap-1.5 text-[9px] font-monument uppercase tracking-widest text-neutral-300 hover:text-brand-orange transition-colors"
          >
            <Heading className="w-3.5 h-3.5" /> + Tiêu đề
          </button>
          <span className="text-white/10">|</span>
          <button 
            type="button" 
            onClick={() => addBlock('image', index)} 
            className="flex items-center gap-1.5 text-[9px] font-monument uppercase tracking-widest text-neutral-300 hover:text-brand-orange transition-colors"
          >
            <ImageIcon className="w-3.5 h-3.5" /> + Ảnh
          </button>
          <span className="text-white/10">|</span>
          <button 
            type="button" 
            onClick={() => addBlock('quote', index)} 
            className="flex items-center gap-1.5 text-[9px] font-monument uppercase tracking-widest text-neutral-300 hover:text-brand-orange transition-colors"
          >
            <Quote className="w-3.5 h-3.5" /> + Trích dẫn
          </button>
        </div>
      </div>
    </div>
  );

  // Live visual preview renderer mimicking the real blog page
  const renderLiveBlocksPreview = () => {
    return (
      <div className="font-sans font-light leading-relaxed text-neutral-500 space-y-6">
        {blocks.map((block) => {
          switch (block.type) {
            case 'heading':
              if (block.headingType === 'h3') {
                return (
                  <h3 key={block.id} className="text-xl md:text-2xl font-monument text-[#2c1d11] mt-8 mb-4 uppercase tracking-tight">
                    {block.value || 'Tiêu đề nhỏ H3'}
                  </h3>
                );
              }
              return (
                <h2 key={block.id} className="text-2xl md:text-3xl font-monument text-[#2c1d11] mt-12 mb-6 uppercase tracking-tight">
                  {block.value || 'Tiêu đề lớn H2'}
                </h2>
              );
            case 'quote':
              return (
                <blockquote key={block.id} className="my-8 pl-6 border-l-4 border-brand-orange italic text-[#bd7a58] font-sans font-light text-base md:text-lg bg-neutral-50 py-4 pr-4 rounded-r-xl">
                  {block.value || 'Lời trích dẫn truyền cảm hứng hoặc lời khuyên chuyên môn.'}
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
                <div key={block.id} className={`my-8 bg-neutral-50 p-2 border border-neutral-200/50 rounded-3xl ${alignClass} ${widthClass}`}>
                  <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-100 flex items-center justify-center">
                    {block.value ? (
                      <img src={block.value} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-neutral-400 text-xs font-sans p-6 text-center">Chưa chèn URL hình ảnh bìa</div>
                    )}
                  </div>
                  {block.caption && (
                    <p className="text-center text-xs text-[#bd7a58] italic font-sans font-light mt-3">
                      {block.caption}
                    </p>
                  )}
                </div>
              );
            default: // text block
              return (
                <div 
                  key={block.id} 
                  className="prose prose-neutral max-w-none text-neutral-500 font-sans font-light text-sm md:text-base leading-relaxed" 
                  dangerouslySetInnerHTML={{ __html: parseMarkdownToHTML(block.value) || '<p class="italic text-neutral-400">Khối văn bản trống...</p>' }}
                />
              );
          }
        })}
        <div className="clear-both"></div>
      </div>
    );
  };

  if (loading && posts.length === 0) {
    return (
      <div className="flex justify-center p-24">
        <Loader2 className="w-8 h-8 animate-spin text-brand-orange" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto pb-32">
      {success && (
        <div className="fixed top-24 right-6 bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 z-[999] font-sans">
          <CheckCircle2 className="w-5 h-5" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl flex items-center gap-3 font-sans text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {!isEditing ? (
        <>
          <div className="mb-12 border-b border-white/10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-3xl font-monument uppercase tracking-wider mb-2">Quản Lý Bài Viết</h2>
              <p className="text-neutral-400 text-sm font-sans">Đăng tải và chỉnh sửa các bài viết chuẩn SEO cho Active Fox Blog.</p>
            </div>
            <button
              onClick={handleCreateNew}
              className="flex items-center gap-2 bg-brand-orange hover:bg-white hover:text-black text-white px-6 py-3.5 text-xs font-monument tracking-widest uppercase transition-all rounded-full"
            >
              <Plus className="w-4 h-4" /> Viết Bài Mới
            </button>
          </div>

          <div className="bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden">
            {posts.length === 0 ? (
              <div className="p-12 text-center text-neutral-400 font-sans">
                Chưa có bài viết động nào được tạo. Nhấn "Viết Bài Mới" để bắt đầu!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-sans">
                  <thead>
                    <tr className="border-b border-white/10 bg-black/40 text-neutral-400 text-xs font-bold uppercase tracking-widest">
                      <th className="p-4 pl-6">Ảnh / Tiêu đề</th>
                      <th className="p-4">Chuyên mục</th>
                      <th className="p-4">Tác giả</th>
                      <th className="p-4">Ngày đăng</th>
                      <th className="p-4 pr-6 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post.slug} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4 pl-6 max-w-md">
                          <div className="flex items-center gap-4">
                            <img src={post.coverImg} alt="" className="w-16 h-10 object-cover rounded-md bg-neutral-800 flex-shrink-0" />
                            <div>
                              <p className="font-bold text-white line-clamp-1">{post.title}</p>
                              <p className="text-xs text-neutral-500 font-mono mt-1">slug: {post.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                            post.category === 'TẬP LUYỆN' ? 'bg-orange-500/20 text-orange-400' :
                            post.category === 'MASSAGE' ? 'bg-amber-500/20 text-amber-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {post.category}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-neutral-300">
                          <p className="font-bold">{post.author}</p>
                          <p className="text-xs text-neutral-500 line-clamp-1">{post.authorRole}</p>
                        </td>
                        <td className="p-4 text-xs text-neutral-400">{post.date}</td>
                        <td className="p-4 pr-6 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEdit(post)}
                              className="p-2.5 bg-neutral-800 hover:bg-brand-orange text-neutral-300 hover:text-white rounded-lg transition-colors"
                              title="Sửa bài viết"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(post.slug)}
                              className="p-2.5 bg-red-950/40 hover:bg-red-600 text-red-400 hover:text-white rounded-lg transition-colors"
                              title="Xóa bài viết"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      ) : (
        <form onSubmit={handleSave} className="space-y-8 font-sans">
          <div className="border-b border-white/10 pb-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-xs font-monument uppercase tracking-widest"
            >
              <ArrowLeft className="w-4 h-4" /> Quay Lại
            </button>
            <h2 className="text-xl font-monument uppercase tracking-wider text-center">
              {isNew ? 'Viết Bài Mới' : 'Chỉnh Sửa Bài Viết'}
            </h2>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-brand-orange hover:bg-white hover:text-black text-white px-6 py-3 text-xs font-monument tracking-widest uppercase transition-all rounded-full disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? 'Đang lưu...' : 'Lưu bài viết'}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form Fields */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest block">
                    Đường dẫn bài viết (Slug)
                  </label>
                  <input
                    type="text"
                    required
                    disabled={!isNew}
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '-'))}
                    placeholder="chan-thuong-pickleball-va-bai-tap-bo-tro"
                    className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors disabled:opacity-50 font-mono"
                  />
                  {isNew && (
                    <p className="text-[10px] text-neutral-500">
                      * Dùng làm ID tài liệu và URL bài viết. Chỉ cho phép chữ thường, số, dấu gạch ngang (ví dụ: `bai-viet-seo-moi`). Không thể chỉnh sửa sau khi tạo.
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest block">
                    Tiêu Đề Bài Viết
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Nhập tiêu đề chính bài viết..."
                    className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest block">
                    Tóm Tắt Bài Viết (Excerpt)
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Mô tả ngắn gọn, hấp dẫn về nội dung bài viết để kích thích người đọc và tối ưu hóa SEO Google..."
                    className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors resize-y min-h-[80px]"
                  />
                </div>

                <div className="space-y-4">
                  {/* Tab switches */}
                  <div className="flex border-b border-white/10 mb-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('edit')}
                      className={`px-5 py-2.5 text-xs font-monument uppercase tracking-widest border-b-2 transition-all ${
                        activeTab === 'edit'
                          ? 'border-brand-orange text-brand-orange font-bold font-monument'
                          : 'border-transparent text-neutral-400 hover:text-white'
                      }`}
                    >
                      ✍️ Soạn Thảo Khối (Notion)
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('preview')}
                      className={`px-5 py-2.5 text-xs font-monument uppercase tracking-widest border-b-2 transition-all ${
                        activeTab === 'preview'
                          ? 'border-brand-orange text-brand-orange font-bold font-monument'
                          : 'border-transparent text-neutral-400 hover:text-white'
                      }`}
                    >
                      👁️ Xem Trước Bài Viết
                    </button>
                  </div>

                  {activeTab === 'edit' ? (
                    <div className="space-y-1">
                      {/* Insertion dashed line at the top */}
                      {renderAddBlockLine(-1)}
                      
                      {/* Blocks list stack */}
                      {blocks.map((block, index) => (
                        <div key={block.id} className="space-y-1">
                          <div className="bg-black/60 border border-white/10 rounded-2xl overflow-hidden shadow-md">
                            {/* Block header */}
                            <div className="bg-neutral-900 px-4 py-2 flex justify-between items-center border-b border-white/5 text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
                              <div className="flex items-center gap-2">
                                <span className="text-neutral-600">#{index + 1}</span>
                                <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[8px] ${
                                  block.type === 'heading' ? 'bg-blue-500/20 text-blue-400' :
                                  block.type === 'image' ? 'bg-amber-500/20 text-amber-400' :
                                  block.type === 'quote' ? 'bg-purple-500/20 text-purple-400' :
                                  'bg-neutral-800 text-neutral-300'
                                }`}>
                                  {block.type === 'heading' && <Heading className="w-3 h-3" />}
                                  {block.type === 'image' && <ImageIcon className="w-3 h-3" />}
                                  {block.type === 'quote' && <Quote className="w-3 h-3" />}
                                  {block.type === 'text' && <Type className="w-3 h-3" />}
                                  {block.type === 'heading' ? `Tiêu đề ${block.headingType || 'h2'}` : block.type === 'image' ? 'Hình ảnh' : block.type === 'quote' ? 'Trích dẫn' : 'Văn bản'}
                                </span>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                {/* Up/Down block switches */}
                                <div className="flex items-center bg-black/40 border border-white/5 rounded-md overflow-hidden">
                                  <button
                                    type="button"
                                    disabled={index === 0}
                                    onClick={() => moveBlock(block.id, 'up')}
                                    className="p-1.5 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors disabled:opacity-20"
                                  >
                                    <ChevronUp className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    disabled={index === blocks.length - 1}
                                    onClick={() => moveBlock(block.id, 'down')}
                                    className="p-1.5 border-l border-white/5 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors disabled:opacity-20"
                                  >
                                    <ChevronDown className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeBlock(block.id)}
                                  className="p-1.5 hover:bg-red-500/20 text-red-500 hover:text-red-400 rounded transition-colors"
                                  title="Xóa khối này"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* Block Editors */}
                            <div className="p-4 bg-neutral-900/20">
                              {block.type === 'text' && (
                                <div className="space-y-2">
                                  {/* Text Editor Toolbar */}
                                  <div className="flex items-center gap-1.5 bg-neutral-950 px-3 py-1.5 border border-white/5 rounded-lg text-neutral-400">
                                    <button
                                      type="button"
                                      onClick={() => handleShortcutInsert(block.id, '**Chữ đậm**')}
                                      className="p-1 hover:bg-neutral-800 hover:text-white rounded transition-colors"
                                      title="Chữ in đậm"
                                    >
                                      <Bold className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleShortcutInsert(block.id, '*Chữ nghiêng*')}
                                      className="p-1 hover:bg-neutral-800 hover:text-white rounded transition-colors"
                                      title="Chữ in nghiêng"
                                    >
                                      <Italic className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleShortcutInsert(block.id, '[Mô tả link](https://...)')}
                                      className="p-1 hover:bg-neutral-800 hover:text-white rounded transition-colors"
                                      title="Chèn link liên kết"
                                    >
                                      <LinkIcon className="w-3.5 h-3.5" />
                                    </button>
                                    <span className="text-white/10 font-light">|</span>
                                    <button
                                      type="button"
                                      onClick={() => handleShortcutInsert(block.id, '* Dòng liệt kê mới')}
                                      className="p-1 hover:bg-neutral-800 hover:text-white rounded transition-colors"
                                      title="Dòng danh sách dấu chấm"
                                    >
                                      <List className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                  <textarea
                                    rows={5}
                                    required
                                    value={block.value}
                                    onChange={(e) => updateBlockValue(block.id, e.target.value)}
                                    placeholder="Gõ văn bản bài viết của bạn tại đây... Sử dụng toolbar bên trên hoặc gõ định dạng Notion/Markdown cơ bản."
                                    className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors font-sans resize-y text-sm leading-relaxed"
                                  />
                                </div>
                              )}

                              {block.type === 'heading' && (
                                <div className="space-y-4">
                                  <div className="flex items-center gap-3">
                                    <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider block">Cấp bậc tiêu đề:</span>
                                    <div className="flex bg-black border border-white/10 rounded-lg overflow-hidden">
                                      <button
                                        type="button"
                                        onClick={() => updateBlockValue(block.id, block.value, { headingType: 'h2' })}
                                        className={`px-3 py-1 text-[10px] font-bold ${
                                          block.headingType !== 'h3'
                                            ? 'bg-brand-orange text-white'
                                            : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                                        }`}
                                      >
                                        H2 (Mục lớn)
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => updateBlockValue(block.id, block.value, { headingType: 'h3' })}
                                        className={`px-3 py-1 text-[10px] font-bold border-l border-white/5 ${
                                          block.headingType === 'h3'
                                            ? 'bg-brand-orange text-white'
                                            : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                                        }`}
                                      >
                                        H3 (Mục phụ)
                                      </button>
                                    </div>
                                  </div>
                                  <input
                                    type="text"
                                    required
                                    value={block.value}
                                    onChange={(e) => updateBlockValue(block.id, e.target.value)}
                                    placeholder={block.headingType === 'h3' ? 'Nhập tiêu đề mục nhỏ...' : 'Nhập tiêu đề mục lớn...'}
                                    className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors font-sans text-sm font-bold"
                                  />
                                </div>
                              )}

                              {block.type === 'quote' && (
                                <textarea
                                  rows={3}
                                  required
                                  value={block.value}
                                  onChange={(e) => updateBlockValue(block.id, e.target.value)}
                                  placeholder="Nhập câu trích dẫn hoặc chia sẻ tâm đắc của chuyên gia..."
                                  className="w-full bg-black border border-l-4 border-l-brand-orange border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors font-sans italic text-sm"
                                />
                              )}

                              {block.type === 'image' && (
                                <div className="space-y-4">
                                  {/* Image File Uploader Dropzone */}
                                  <div className="space-y-1">
                                    <span className="text-[10px] text-neutral-400 uppercase tracking-widest block font-bold flex justify-between items-center">
                                      <span>Tải Ảnh Lên</span>
                                      {uploadingBlocks[block.id] && (
                                        <span className="text-[9px] text-brand-orange lowercase flex items-center gap-1 font-sans font-normal">
                                          <Loader2 className="w-2.5 h-2.5 animate-spin" /> đang tải...
                                        </span>
                                      )}
                                    </span>
                                    
                                    <div className="relative group border border-dashed border-white/10 hover:border-brand-orange/40 rounded-xl overflow-hidden bg-black/40 transition-colors p-4 flex flex-col items-center justify-center text-center cursor-pointer min-h-[100px]">
                                      <input
                                        type="file"
                                        accept="image/*"
                                        disabled={uploadingBlocks[block.id]}
                                        onChange={async (e) => {
                                          const file = e.target.files?.[0];
                                          if (!file) return;
                                          
                                          setUploadingBlocks(prev => ({ ...prev, [block.id]: true }));
                                          setError(null);
                                          try {
                                            const url = await uploadImageFile(file);
                                            updateBlockValue(block.id, url);
                                          } catch (err) {
                                            console.error("Block image upload failed:", err);
                                            setError("Không thể tải lên hình ảnh khối. Chi tiết: " + (err instanceof Error ? err.message : String(err)));
                                          } finally {
                                            setUploadingBlocks(prev => ({ ...prev, [block.id]: false }));
                                          }
                                        }}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                                      />
                                      
                                      {block.value ? (
                                        <div className="relative w-full aspect-[16/10] bg-neutral-950 overflow-hidden rounded-lg">
                                          <img src={block.value} alt="Block content" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 text-white">
                                            <Upload className="w-5 h-5 text-brand-orange animate-bounce" />
                                            <span className="text-[9px] uppercase tracking-wider font-bold">Đổi hình ảnh</span>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="flex flex-col items-center gap-2 py-1">
                                          <div className="p-2.5 rounded-full bg-white/5 group-hover:bg-brand-orange/10 group-hover:text-brand-orange transition-all">
                                            <Upload className="w-4 h-4 text-neutral-400 group-hover:text-brand-orange" />
                                          </div>
                                          <div>
                                            <p className="text-[10px] text-neutral-300 font-bold uppercase tracking-wider">Chọn ảnh từ máy tính</p>
                                            <p className="text-[8px] text-neutral-500 font-sans mt-0.5">Kéo thả hoặc click vào đây</p>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* URL input fallback */}
                                  <div className="space-y-1">
                                    <span className="text-[9px] text-neutral-500 uppercase tracking-widest block font-bold">Hoặc dùng Liên kết hình ảnh (URL)</span>
                                    <input
                                      type="text"
                                      required
                                      value={block.value}
                                      onChange={(e) => updateBlockValue(block.id, e.target.value)}
                                      placeholder="https://images.unsplash.com/photo-..."
                                      className="w-full bg-black border border-white/10 px-4 py-2 text-white focus:outline-none focus:border-brand-orange transition-colors text-xs font-mono rounded-lg"
                                    />
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Alignment controls */}
                                    <div className="space-y-2">
                                      <span className="text-[10px] text-neutral-400 uppercase tracking-widest block font-bold">Căn lề ảnh</span>
                                      <div className="flex bg-black border border-white/10 rounded-lg overflow-hidden w-fit">
                                        <button
                                          type="button"
                                          onClick={() => updateBlockValue(block.id, block.value, { alignment: 'left' })}
                                          className={`p-2 ${block.alignment === 'left' ? 'bg-brand-orange text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
                                          title="Căn trái (Chữ bao quanh)"
                                        >
                                          <AlignLeft className="w-4 h-4" />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => updateBlockValue(block.id, block.value, { alignment: 'center' })}
                                          className={`p-2 border-l border-white/5 ${block.alignment === 'center' || !block.alignment ? 'bg-brand-orange text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
                                          title="Căn giữa dòng"
                                        >
                                          <AlignCenter className="w-4 h-4" />
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => updateBlockValue(block.id, block.value, { alignment: 'right' })}
                                          className={`p-2 border-l border-white/5 ${block.alignment === 'right' ? 'bg-brand-orange text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
                                          title="Căn phải (Chữ bao quanh)"
                                        >
                                          <AlignRight className="w-4 h-4" />
                                        </button>
                                      </div>
                                    </div>

                                    {/* Width controls */}
                                    <div className="space-y-2">
                                      <span className="text-[10px] text-neutral-400 uppercase tracking-widest block font-bold">Kích thước</span>
                                      <div className="flex bg-black border border-white/10 rounded-lg overflow-hidden w-fit">
                                        <button
                                          type="button"
                                          onClick={() => updateBlockValue(block.id, block.value, { width: 'small' })}
                                          className={`px-3 py-1.5 text-[9px] font-bold ${block.width === 'small' ? 'bg-brand-orange text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
                                        >
                                          Nhỏ (33%)
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => updateBlockValue(block.id, block.value, { width: 'medium' })}
                                          className={`px-3 py-1.5 text-[9px] font-bold border-l border-white/5 ${block.width === 'medium' ? 'bg-brand-orange text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
                                        >
                                          Vừa (50%)
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => updateBlockValue(block.id, block.value, { width: 'full' })}
                                          className={`px-3 py-1.5 text-[9px] font-bold border-l border-white/5 ${block.width === 'full' || !block.width ? 'bg-brand-orange text-white' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'}`}
                                        >
                                          Lớn (100%)
                                        </button>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Caption */}
                                  <div className="space-y-1">
                                    <span className="text-[10px] text-neutral-400 uppercase tracking-widest block font-bold">Chú thích dưới ảnh</span>
                                    <input
                                      type="text"
                                      value={block.caption || ''}
                                      onChange={(e) => updateBlockValue(block.id, block.value, { caption: e.target.value })}
                                      placeholder="Hình 1: Chuyên gia bóc tách màng cơ IASTM tại Sala..."
                                      className="w-full bg-black border border-white/10 px-4 py-2 text-white focus:outline-none focus:border-brand-orange transition-colors text-xs font-sans"
                                    />
                                  </div>

                                  {/* Visual preview */}
                                  {block.value && (
                                    <div className="mt-2 relative w-32 aspect-[16/10] bg-black border border-white/10 rounded-lg overflow-hidden">
                                      <img src={block.value} alt="" className="w-full h-full object-cover" />
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Insertion dashed line between blocks */}
                          {renderAddBlockLine(index)}
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Visual editor mock preview */
                    <div className="p-6 md:p-12 bg-[#fdfbf9] text-[#1a100c] rounded-3xl min-h-[450px] border border-neutral-200 shadow-inner overflow-y-auto max-h-[70vh]">
                      <article className="prose prose-neutral max-w-none">
                        <span className="bg-[#bd7a58] text-white text-[9px] font-monument tracking-wider uppercase px-4 py-1.5 rounded-full shadow-sm mb-6 inline-block">
                          {category}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-monument uppercase tracking-tight text-[#2c1d11] mb-8 leading-tight">
                          {title || 'Tiêu Đề Trực Quan Bài Viết'}
                        </h1>
                        <div className="flex items-center gap-3 py-4 border-y border-neutral-200/50 mb-10 text-[10px] text-neutral-400 font-sans">
                          <span>{author}</span>
                          <span>•</span>
                          <span>{date}</span>
                          <span>•</span>
                          <span>{readTime}</span>
                        </div>
                        
                        {renderLiveBlocksPreview()}
                      </article>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar Form Fields */}
            <div className="space-y-6">
              <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 space-y-6">
                <h3 className="font-bold text-sm uppercase tracking-widest border-b border-white/5 pb-3">Phân loại & Cài đặt</h3>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest block">
                    Chuyên Mục
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as 'TẬP LUYỆN' | 'MASSAGE' | 'PHỤC HỒI')}
                    className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors"
                  >
                    <option value="TẬP LUYỆN">🏋️ TẬP LUYỆN</option>
                    <option value="MASSAGE">💆 MASSAGE</option>
                    <option value="PHỤC HỒI">❤️ PHỤC HỒI</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest block flex justify-between items-center">
                    <span>Ảnh Bìa Bài Viết</span>
                    {coverUploading && (
                      <span className="text-[10px] text-brand-orange lowercase flex items-center gap-1 font-sans">
                        <Loader2 className="w-3 h-3 animate-spin" /> đang tải...
                      </span>
                    )}
                  </label>
                  
                  {/* File Upload Dropzone / Trigger */}
                  <div className="relative group border border-dashed border-white/10 hover:border-brand-orange/40 rounded-xl overflow-hidden bg-black/40 transition-colors p-4 flex flex-col items-center justify-center text-center cursor-pointer min-h-[120px]">
                    <input
                      type="file"
                      accept="image/*"
                      disabled={coverUploading}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setCoverUploading(true);
                        setError(null);
                        try {
                          const url = await uploadImageFile(file);
                          setCoverImg(url);
                        } catch (err) {
                          console.error("Cover image upload failed:", err);
                          setError("Không thể tải lên ảnh bìa. Chi tiết: " + (err instanceof Error ? err.message : String(err)));
                        } finally {
                          setCoverUploading(false);
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                    />
                    
                    {coverImg ? (
                      <div className="relative w-full aspect-[16/10] bg-neutral-950 overflow-hidden rounded-lg">
                        <img src={coverImg} alt="Preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white">
                          <Upload className="w-6 h-6 text-brand-orange animate-bounce" />
                          <span className="text-[10px] uppercase tracking-wider font-bold">Thay đổi ảnh bìa</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3 py-2">
                        <div className="p-3 rounded-full bg-white/5 group-hover:bg-brand-orange/10 group-hover:text-brand-orange transition-all">
                          <Upload className="w-5 h-5 text-neutral-400 group-hover:text-brand-orange" />
                        </div>
                        <div>
                          <p className="text-[11px] text-neutral-300 font-bold uppercase tracking-wider">Tải lên ảnh bìa</p>
                          <p className="text-[9px] text-neutral-500 font-sans mt-1">Kéo thả hoặc click để chọn ảnh từ máy</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Manual URL entry input */}
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      required
                      value={coverImg}
                      onChange={(e) => setCoverImg(e.target.value)}
                      placeholder="Hoặc dán liên kết URL hình ảnh..."
                      className="w-full bg-black/40 border border-white/10 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-brand-orange transition-colors font-mono rounded-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest block">
                    Ngày Đăng
                  </label>
                  <input
                    type="text"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="26/05/2026"
                    className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest block">
                    Thời Gian Đọc (Ước tính)
                  </label>
                  <input
                    type="text"
                    required
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="5 phút đọc"
                    className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors"
                  />
                </div>
              </div>

              <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 space-y-6">
                <h3 className="font-bold text-sm uppercase tracking-widest border-b border-white/5 pb-3">Tác Giả (E-E-A-T)</h3>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest block">
                    Tên Tác Giả
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Đội ngũ chuyên gia Active Fox"
                    className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest block">
                    Vai Trò / Chức Danh
                  </label>
                  <input
                    type="text"
                    required
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    placeholder="Tham vấn y sinh thể thao"
                    className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
