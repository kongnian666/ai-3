import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { BottomNav } from '@/components/BottomNav';

export default function TeacherDashboard() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden pb-24">
        {/* Header */}
        <div className="flex items-center bg-white dark:bg-slate-900 px-4 pb-4 pt-6 justify-between sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <div 
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBHq_lqUTX44mldPrQgsxiC4V_CJEo7ewjee5qM-gEnHJwAoYA2nOgC_fSsMGe08dTpiL6s4SpeetnvQf72-IiXm1rE5x-zZMqNFLZQcPqfuNwH2B5W3dF1oU_hVAyd6m_3ahCsThJBUPEj94UNsanzmCXiWriLH2eQKi7mHsw4ZnTFyehZeae3UHDsbI6VwMMyPnqrs6hiZyLpvhdwTndkz9iTJjLj2vl-jFIT5VDIAUoU9PNY23BYpLZP2EoNpMc8iXM8hpIgu5c")' }}
            ></div>
          </div>
          <div className="flex-1 px-3">
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">欢迎回来，</p>
            <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight">阿里斯老师</h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex size-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <label className="flex flex-col w-full h-11">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-slate-100 dark:bg-slate-800 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <div className="text-slate-400 dark:text-slate-500 flex items-center justify-center pl-4">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input 
                className="flex w-full min-w-0 flex-1 border-none bg-transparent focus:ring-0 h-full placeholder:text-slate-400 dark:placeholder:text-slate-500 px-3 text-sm font-normal outline-none" 
                placeholder="搜索试卷或题目..." 
              />
            </div>
          </label>
        </div>

        {/* Actions */}
        <div className="flex px-4 py-6 gap-3">
          <button 
            onClick={() => navigate('/exam-config')}
            className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-xl h-14 px-5 flex-1 bg-primary text-white gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95 hover:bg-primary/90"
          >
            <span className="material-symbols-outlined">add_circle</span>
            <span className="text-base font-semibold">创建新试卷</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 px-4 mb-6">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
            <span className="material-symbols-outlined text-primary mb-2">menu_book</span>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">试卷总数</p>
            <p className="text-xl font-bold text-slate-900 dark:text-slate-100">42</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
            <span className="material-symbols-outlined text-green-500 mb-2">check_circle</span>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">已完成</p>
            <p className="text-xl font-bold text-slate-900 dark:text-slate-100">28</p>
          </div>
        </div>

        {/* Recent Exams */}
        <div className="px-4 flex items-center justify-between mb-3">
          <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold tracking-tight">最近试卷</h2>
          <button className="text-primary text-sm font-semibold hover:text-primary/80">查看全部</button>
        </div>

        <div className="flex flex-col gap-3 px-4">
          {/* Exam Card 1 */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-3 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-slate-900 dark:text-slate-100 font-bold text-base">2024 九年级数学期中考</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">创建于 2023年10月12日</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700 text-[10px] font-bold dark:bg-yellow-900/30 dark:text-yellow-400">草稿</span>
            </div>
            <div className="flex items-center gap-4 border-t border-slate-50 dark:border-slate-800 pt-3">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-slate-400 text-lg">format_list_numbered</span>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">25 道题</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-slate-400 text-lg">timer</span>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">90 分钟</span>
              </div>
            </div>
          </div>

          {/* Exam Card 2 */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-3 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-slate-900 dark:text-slate-100 font-bold text-base">微积分测试 1</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">创建于 2023年10月08日</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold dark:bg-primary/20 dark:text-primary-400">定稿</span>
            </div>
            <div className="flex items-center gap-4 border-t border-slate-50 dark:border-slate-800 pt-3">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-slate-400 text-lg">format_list_numbered</span>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">10 道题</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-slate-400 text-lg">timer</span>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">45 分钟</span>
              </div>
            </div>
          </div>

          {/* Exam Card 3 */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-3 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-slate-900 dark:text-slate-100 font-bold text-base">代数基础 - 期末考试</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">创建于 2023年10月02日</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold dark:bg-primary/20 dark:text-primary-400">定稿</span>
            </div>
            <div className="flex items-center gap-4 border-t border-slate-50 dark:border-slate-800 pt-3">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-slate-400 text-lg">format_list_numbered</span>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">40 道题</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-slate-400 text-lg">timer</span>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">120 分钟</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </Layout>
  );
}
