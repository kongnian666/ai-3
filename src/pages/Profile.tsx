import { Layout } from '@/components/Layout';
import { BottomNav } from '@/components/BottomNav';

export default function Profile() {
  return (
    <Layout>
      <div className="flex flex-col h-full bg-background-light dark:bg-background-dark pb-24 overflow-y-auto">
        {/* Profile Header */}
        <div className="bg-white dark:bg-slate-900 p-6 pb-8 rounded-b-[2rem] shadow-sm border-b border-slate-100 dark:border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="material-symbols-outlined text-[120px]">school</span>
          </div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="size-24 rounded-full p-1 bg-gradient-to-tr from-primary to-purple-500 mb-3">
              <div 
                className="w-full h-full rounded-full bg-cover bg-center border-4 border-white dark:border-slate-900"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBHq_lqUTX44mldPrQgsxiC4V_CJEo7ewjee5qM-gEnHJwAoYA2nOgC_fSsMGe08dTpiL6s4SpeetnvQf72-IiXm1rE5x-zZMqNFLZQcPqfuNwH2B5W3dF1oU_hVAyd6m_3ahCsThJBUPEj94UNsanzmCXiWriLH2eQKi7mHsw4ZnTFyehZeae3UHDsbI6VwMMyPnqrs6hiZyLpvhdwTndkz9iTJjLj2vl-jFIT5VDIAUoU9PNY23BYpLZP2EoNpMc8iXM8hpIgu5c")' }}
              ></div>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">阿里斯老师</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">北京市第一中学 • 数学教研组</p>
            
            <div className="flex gap-6 mt-6 w-full justify-center">
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold text-slate-900 dark:text-slate-100">42</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">试卷</span>
              </div>
              <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold text-slate-900 dark:text-slate-100">156</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">收藏题目</span>
              </div>
              <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold text-slate-900 dark:text-slate-100">8</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">班级</span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu List */}
        <div className="p-4 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
            <MenuItem icon="workspace_premium" label="我的会员" value="专业版" isLink />
            <MenuItem icon="settings" label="账号设置" isLink />
            <MenuItem icon="notifications" label="消息通知" badge="3" isLink />
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">
            <MenuItem icon="help" label="帮助与反馈" isLink />
            <MenuItem icon="info" label="关于我们" isLink />
          </div>

          <button className="w-full py-3 text-red-500 font-medium bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
            退出登录
          </button>
        </div>
      </div>
      <BottomNav />
    </Layout>
  );
}

function MenuItem({ icon, label, value, badge, isLink }: { icon: string, label: string, value?: string, badge?: string, isLink?: boolean }) {
  return (
    <div className="flex items-center p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer border-b border-slate-50 dark:border-slate-800 last:border-0">
      <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-3 text-slate-600 dark:text-slate-400">
        <span className="material-symbols-outlined text-lg">{icon}</span>
      </div>
      <span className="flex-1 text-sm font-medium text-slate-900 dark:text-slate-100">{label}</span>
      
      {value && <span className="text-xs text-slate-500 mr-2">{value}</span>}
      
      {badge && (
        <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full mr-2">
          {badge}
        </span>
      )}
      
      {isLink && <span className="material-symbols-outlined text-slate-400 text-lg">chevron_right</span>}
    </div>
  );
}
