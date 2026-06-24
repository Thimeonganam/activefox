import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { cmsPages } from './cmsConfig';
import { Menu, X, LayoutDashboard } from 'lucide-react';

export default function CMSLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-neutral-950 text-white relative">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-neutral-800 rounded-md"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-20 left-0 h-[calc(100vh-80px)] w-64 bg-black border-r border-white/10 z-40
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8 text-neutral-400">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-bold tracking-widest text-sm uppercase">Quản Trị</span>
          </div>
          <nav className="space-y-2">
            <NavLink
              to="/cms/blog-manager"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `
                block py-3 px-4 rounded-md transition-colors text-sm font-bold tracking-wide border border-brand-orange/30 mb-4 bg-brand-orange/10
                ${isActive 
                  ? 'bg-brand-orange text-white border-brand-orange' 
                  : 'text-brand-orange hover:bg-brand-orange/20'
                }
              `}
            >
              ✍️ Quản Lý Bài Viết (Blog)
            </NavLink>
            
            <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2 pl-4">Nội Dung Trang Tĩnh</div>
            {cmsPages.map((page) => (
              <NavLink
                key={page.id}
                to={`/cms/pages/${page.id}`}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `
                  block py-3 px-4 rounded-md transition-colors text-sm font-medium tracking-wide
                  ${isActive 
                    ? 'bg-brand-orange text-white' 
                    : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                  }
                `}
              >
                {page.title}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-x-hidden pt-16 md:pt-0">
        <Outlet />
      </main>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
