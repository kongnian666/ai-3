import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';

export default function ExamConfig() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('math');
  const [grade, setGrade] = useState('9-1');
  const [examType, setExamType] = useState('midterm');
  
  const [counts, setCounts] = useState({
    choice: 10,
    fill: 8,
    solution: 6
  });

  const handleCountChange = (type: keyof typeof counts, delta: number) => {
    setCounts(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta)
    }));
  };

  return (
    <Layout>
      {/* TopAppBar */}
      <header className="sticky top-0 z-50 flex items-center bg-white/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-slate-200 dark:border-slate-800">
        <div 
          onClick={() => navigate(-1)}
          className="text-slate-900 dark:text-slate-100 flex size-10 shrink-0 items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </div>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">
          智能组卷
        </h2>
      </header>

      <main className="flex-1 pb-32">
        {/* 基础配置 Section */}
        <section className="px-4 py-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1 h-5 bg-primary rounded-full"></span>
            <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight">基础配置</h3>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-slate-600 dark:text-slate-400 text-sm font-medium">学科</label>
              <div className="relative">
                <select 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="custom-select w-full rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 h-12 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                >
                  <option value="math">初中数学</option>
                  <option value="physics">初中物理</option>
                  <option value="chem">初中化学</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-slate-600 dark:text-slate-400 text-sm font-medium">年级/学期</label>
              <div className="relative">
                <select 
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="custom-select w-full rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 h-12 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                >
                  <option value="9-1">九年级 上学期</option>
                  <option value="9-2">九年级 下学期</option>
                  <option value="8-1">八年级 上学期</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-slate-600 dark:text-slate-400 text-sm font-medium">考试类型</label>
              <div className="grid grid-cols-3 gap-2">
                {['midterm', 'final', 'unit'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setExamType(type)}
                    className={`py-2 rounded-lg border text-sm font-medium transition-colors ${
                      examType === type
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {type === 'midterm' ? '期中考试' : type === 'final' ? '期末考试' : '单元测试'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 难度分布 Section */}
        <section className="px-4 py-6 bg-white dark:bg-slate-900/50">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1 h-5 bg-primary rounded-full"></span>
            <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight">难度分布</h3>
          </div>
          <div className="space-y-8 px-2">
            <div className="relative h-2 bg-slate-200 dark:bg-slate-800 rounded-full flex">
              <div className="h-full bg-green-500 rounded-l-full" style={{ width: '50%' }}></div>
              <div className="h-full bg-yellow-500" style={{ width: '30%' }}></div>
              <div className="h-full bg-red-500 rounded-r-full" style={{ width: '20%' }}></div>
              {/* Drag handles visual representation */}
              <div className="absolute top-1/2 -translate-y-1/2 left-[50%] size-5 bg-white border-2 border-primary rounded-full shadow-md z-10 cursor-grab active:cursor-grabbing"></div>
              <div className="absolute top-1/2 -translate-y-1/2 left-[80%] size-5 bg-white border-2 border-primary rounded-full shadow-md z-10 cursor-grab active:cursor-grabbing"></div>
            </div>
            <div className="flex justify-between items-center text-xs font-medium">
              <div className="flex flex-col items-center gap-1">
                <span className="text-green-600">简单</span>
                <span className="text-slate-900 dark:text-slate-100 text-base">50%</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-yellow-600">中等</span>
                <span className="text-slate-900 dark:text-slate-100 text-base">30%</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-red-600">困难</span>
                <span className="text-slate-900 dark:text-slate-100 text-base">20%</span>
              </div>
            </div>
          </div>
        </section>

        {/* 题型设置 Section */}
        <section className="px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full"></span>
              <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight">题型设置</h3>
            </div>
            <span className="text-slate-500 text-sm">总分：120分</span>
          </div>
          <div className="space-y-3">
            {/* 题型行 */}
            {[
              { id: 'choice', label: '选择题', sub: '每题 3 分' },
              { id: 'fill', label: '填空题', sub: '每题 3 分' },
              { id: 'solution', label: '解答题', sub: '分值不等' }
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                <div>
                  <p className="text-slate-900 dark:text-slate-100 font-medium">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.sub}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => handleCountChange(item.id as keyof typeof counts, -1)}
                    className="size-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-lg">remove</span>
                  </button>
                  <span className="w-8 text-center text-slate-900 dark:text-slate-100 font-bold">
                    {counts[item.id as keyof typeof counts]}
                  </span>
                  <button 
                    onClick={() => handleCountChange(item.id as keyof typeof counts, 1)}
                    className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-lg">add</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Fixed Bottom Button */}
      <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-6 bg-white/90 dark:bg-background-dark/90 backdrop-blur-lg border-t border-slate-100 dark:border-slate-800 z-50">
        <button 
          onClick={() => navigate('/bank')}
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined">auto_awesome</span>
          <span>一键生成试卷</span>
        </button>
        <div className="mt-4 flex justify-center">
          <div className="w-32 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
        </div>
      </footer>
    </Layout>
  );
}
