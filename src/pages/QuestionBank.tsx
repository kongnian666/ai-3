import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Layout } from '@/components/Layout';
import { BottomNav } from '@/components/BottomNav';
import { fetchQuestions, type Question } from '@/services/gemini';
import { cn } from '@/lib/utils';

export default function QuestionBank() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  
  // Filters
  const [grade, setGrade] = useState('高中');
  const [topic, setTopic] = useState('函数');
  const [difficulty, setDifficulty] = useState('全部');
  const [type, setType] = useState('全部');

  const loadQuestions = async (isLoadMore = false) => {
    if (isLoadMore) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    
    const queryContext = `${grade} ${topic} ${difficulty === '全部' ? '' : difficulty} ${type === '全部' ? '' : type}`;
    const data = await fetchQuestions('数学', queryContext);
    
    if (isLoadMore) {
      setQuestions(prev => [...prev, ...data]);
      setLoadingMore(false);
    } else {
      setQuestions(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, [grade, topic, difficulty, type]);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const handleAdd = (id: string) => {
    setAddedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const FilterSection = ({ title, options, value, onChange }: { title: string, options: string[], value: string, onChange: (v: string) => void }) => (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 px-1">{title}</span>
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={cn(
              "flex h-7 shrink-0 items-center justify-center rounded-full px-3 text-xs font-medium transition-colors border",
              value === opt
                ? "bg-primary text-white border-primary"
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <Layout className="bg-white dark:bg-slate-950">
      {/* Header */}
      <header className="flex items-center bg-white dark:bg-slate-900 px-4 py-3 justify-between border-b border-slate-100 dark:border-slate-800 shrink-0 sticky top-0 z-50">
        <div 
          onClick={() => navigate(-1)}
          className="text-slate-900 dark:text-slate-100 flex size-10 shrink-0 items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </div>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center">
          高中数学精品题库
        </h2>
        <div className="flex size-10 items-center justify-end">
          <button className="flex items-center justify-center rounded-lg h-10 w-10 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 p-4 flex flex-col gap-4 sticky top-[60px] z-40 shadow-sm">
        <FilterSection 
          title="年级" 
          options={['高中', '高一', '高二', '高三']} 
          value={grade} 
          onChange={setGrade} 
        />
        <FilterSection 
          title="知识点" 
          options={['函数', '立体几何', '概率统计', '导数微积分', '平面向量', '数列']} 
          value={topic} 
          onChange={setTopic} 
        />
        <FilterSection 
          title="难度" 
          options={['全部', '简单', '中等', '困难', '极难']} 
          value={difficulty} 
          onChange={setDifficulty} 
        />
        <FilterSection 
          title="题型" 
          options={['全部', '选择题', '填空题', '解答题']} 
          value={type} 
          onChange={setType} 
        />
      </div>

      {/* Main Content Scroll Area */}
      <main className="flex-1 overflow-y-auto hide-scrollbar pb-24">
        {/* Question Feed */}
        <section className="px-4 py-6 bg-slate-50 dark:bg-slate-900/50 min-h-[400px]">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-slate-900 dark:text-slate-100 text-xl font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
              精选题目
            </h3>
            <span className="text-xs text-slate-500">
              已加载 {questions.length} 道题目
            </span>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-4 h-48 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <>
              {questions.map((q, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl p-4 mb-4 shadow-sm border border-slate-100 dark:border-slate-700 transition-all hover:shadow-md">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        {q.title || '2024模拟题'}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        q.difficulty === 'Hard' || q.difficulty === 'Extreme' 
                          ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {q.difficulty}
                      </span>
                      <span className="bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded">
                        {q.type}
                      </span>
                    </div>
                    <button className="text-slate-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-xl">bookmark_add</span>
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed prose dark:prose-invert max-w-none">
                      <ReactMarkdown 
                        remarkPlugins={[remarkMath]} 
                        rehypePlugins={[rehypeKatex]}
                      >
                        {q.content}
                      </ReactMarkdown>
                    </div>
                  </div>

                  {/* Analysis Section (Expandable) */}
                  {expandedId === q.id && (
                    <div className="mt-4 pt-4 border-t border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2 text-primary font-bold text-xs">
                        <span className="material-symbols-outlined text-sm">lightbulb</span>
                        解析
                      </div>
                      <div className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed prose dark:prose-invert max-w-none">
                        <ReactMarkdown 
                          remarkPlugins={[remarkMath]} 
                          rehypePlugins={[rehypeKatex]}
                        >
                          {q.analysis || '暂无解析'}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex items-center justify-between border-t border-slate-50 dark:border-slate-700 pt-3">
                    <button 
                      onClick={() => toggleExpand(q.id)}
                      className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 text-xs font-medium flex items-center gap-1 transition-colors"
                    >
                      {expandedId === q.id ? '收起解析' : '查看解析'}
                      <span className={`material-symbols-outlined text-sm transition-transform ${expandedId === q.id ? 'rotate-180' : ''}`}>expand_more</span>
                    </button>
                    
                    <button 
                      onClick={() => handleAdd(q.id)}
                      className={cn(
                        "px-4 py-1.5 rounded-lg text-xs font-bold shadow-md transition-all active:scale-95 flex items-center gap-1",
                        addedIds.has(q.id)
                          ? "bg-green-500 hover:bg-green-600 text-white shadow-green-500/20"
                          : "bg-primary hover:bg-primary/90 text-white shadow-primary/20"
                      )}
                    >
                      {addedIds.has(q.id) ? (
                        <>
                          <span className="material-symbols-outlined text-sm">check</span>
                          已加入
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-sm">add</span>
                          加入试卷
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
              
              <button 
                onClick={() => loadQuestions(true)}
                disabled={loadingMore}
                className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
              >
                {loadingMore ? (
                  <>
                    <span className="size-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></span>
                    加载中...
                  </>
                ) : (
                  '加载更多题目'
                )}
              </button>
            </>
          )}
        </section>
      </main>

      <BottomNav />
    </Layout>
  );
}
