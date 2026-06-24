import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { onAuthStateChanged, User, signInWithPopup, signInWithRedirect, GoogleAuthProvider, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import CMSLayout from './CMSLayout';
import CMSPageEditor from './CMSPageEditor';
import CMSBlogManager from './CMSBlogManager';
import { LogIn, Loader2, AlertCircle } from 'lucide-react';
import { handleFirestoreError, OperationType } from '../lib/firebaseUtils';

export default function CMS() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        try {
          const docRef = doc(db, 'admins', u.uid);
          const docSnap = await getDoc(docRef);
          setIsAdmin(docSnap.exists());
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, 'admins/' + u.uid);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center pt-24 pb-12 z-[200]">
        <Loader2 className="w-8 h-8 animate-spin text-brand-orange" />
      </div>
    );
  }

  if (!user || isAdmin === false) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center pt-24 pb-12 z-[200] relative px-4">
        <div className="absolute inset-0 bg-[url('https://i.postimg.cc/1tf4Qsq6/2782c96ff98d88f1ed04fd2417825665.jpg')] bg-cover bg-center opacity-20 grayscale pointer-events-none"></div>
        <div className="relative z-10 w-full max-w-md bg-neutral-900 border border-white/10 rounded-2xl p-8 shadow-2xl flex flex-col items-center">
          <div className="w-16 h-16 bg-brand-orange/20 flex items-center justify-center rounded-full mb-6">
            <LogIn className="w-8 h-8 text-brand-orange" />
          </div>
          <h2 className="text-3xl font-monument uppercase tracking-widest text-center mb-2">CMS Login</h2>
          <p className="text-neutral-400 text-center text-sm mb-8">
            Hệ thống quản trị nội dung Active Fox.
            {!user && " Vui lòng đăng nhập bằng tài khoản admin."}
            {user && isAdmin === false && (
              <span className="text-brand-orange block mt-4">
                Tài khoản của bạn không có quyền truy cập. <br/><br/>
                Vui lòng vào Firebase Console &gt; Firestore, tạo một document trong collection <b>admins</b> với document ID là UID của bạn:<br/>
                <code className="bg-black text-white px-2 py-1 mt-2 block w-full truncate border border-white/20 select-all">{user.uid}</code>
              </span>
            )}
          </p>
          
          {!user ? (
            <div className="w-full space-y-4">
              <button 
                onClick={async () => {
                  setAuthError(null);
                  const provider = new GoogleAuthProvider();
                  try {
                    await signInWithPopup(auth, provider);
                  } catch (e: any) {
                    console.error(e);
                    setAuthError(`Lỗi Popup: ${e.message || String(e)}`);
                  }
                }}
                className="w-full py-4 px-6 bg-white text-black font-bold uppercase tracking-widest text-sm flex justify-center items-center gap-3 hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                Đăng nhập với Google
              </button>

              <button 
                onClick={async () => {
                  setAuthError(null);
                  const provider = new GoogleAuthProvider();
                  try {
                    await signInWithRedirect(auth, provider);
                  } catch (e: any) {
                    console.error(e);
                    setAuthError(`Lỗi Redirect: ${e.message || String(e)}`);
                  }
                }}
                className="w-full py-3 px-6 bg-neutral-800 text-white font-medium uppercase tracking-widest text-[10px] flex justify-center items-center gap-2 hover:bg-neutral-700 transition-colors cursor-pointer border border-white/5"
              >
                Đăng nhập bằng Redirect (Bản thay thế nếu bị chặn Popup)
              </button>
            </div>
          ) : (
            <button 
              onClick={() => {
                setAuthError(null);
                signOut(auth);
              }}
              className="w-full py-4 px-6 bg-red-600/20 text-red-500 font-bold uppercase tracking-widest text-sm flex justify-center items-center hover:bg-red-600/30 transition-colors cursor-pointer"
            >
              Đăng xuất
            </button>
          )}

          {authError && (
            <div className="mt-6 flex gap-2.5 items-start p-4 bg-red-950/40 border border-red-500/20 text-red-400 text-xs rounded-xl w-full">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-left">Lỗi Đăng Nhập:</p>
                <p className="opacity-80 break-words text-left">{authError}</p>
                <p className="opacity-60 text-[10px] mt-2 text-left leading-relaxed">
                  *Lưu ý: Nếu lỗi "auth/unauthorized-domain", bạn cần thêm tên miền "activefox.vn" vào danh sách "Authorized Domains" trong trang quản trị Firebase Authentication.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-neutral-950 text-white z-[200] relative">
      <div className="border-b border-white/10 bg-black sticky top-0 z-[60] flex justify-between items-center px-4 md:px-6 py-4 h-20">
        <h1 className="text-xl font-monument uppercase tracking-widest ml-12 md:ml-0">Active Fox CMS</h1>
        <div className="flex items-center gap-4">
          <span className="text-xs text-neutral-400 hidden sm:block">{user.email}</span>
          <button 
            onClick={() => signOut(auth)}
            className="text-xs tracking-[0.1em] font-bold border border-white/20 px-4 py-2 hover:bg-white/10 transition-colors"
          >
            THOÁT
          </button>
        </div>
      </div>
      <Routes>
        <Route element={<CMSLayout />}>
          <Route path="/" element={<Navigate to="/cms/pages/home" replace />} />
          <Route path="/pages/:pageId" element={<CMSPageEditor />} />
          <Route path="/blog-manager" element={<CMSBlogManager />} />
        </Route>
      </Routes>
    </div>
  );
}
