import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { id: 'dashboard', label: '工作台', icon: 'dashboard', path: '/' },
    { id: 'bank', label: '题库', icon: 'database', path: '/bank' },
    { id: 'profile', label: '我的', icon: 'person', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 flex gap-2 border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 pb-6 pt-3 z-50 max-w-[430px] mx-auto">
      {navItems.map((item) => {
        const isActive = currentPath === item.path;
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={cn(
              "flex flex-1 flex-col items-center justify-end gap-1 transition-colors",
              isActive ? "text-primary" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
            )}
          >
            <span 
              className="material-symbols-outlined" 
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {item.icon}
            </span>
            <p className="text-[10px] font-medium leading-normal tracking-wide">
              {item.label}
            </p>
          </button>
        );
      })}
    </div>
  );
}
