import { createClient } from '@/lib/supabase/server'
import { COURSE_STATUS_LABEL } from '@/lib/utils'
import type { Course } from '@/types'

export default async function AdminCoursesPage() {
  const supabase = await createClient()
  const { data: courses } = await supabase.from('courses').select('*').order('order_index')

  return (
    <div style={{ padding:'32px 40px' }}>
      <div className="flex items-center justify-between mb-8">
        <h1 style={{ fontFamily:"'Noto Serif KR',serif", fontSize:24, fontWeight:900, color:'#fff' }}>강의 관리</h1>
        <button style={{ padding:'10px 22px', background:'linear-gradient(135deg,#C7A66A,#B8945A)', color:'#101826', fontSize:13, fontWeight:700, border:'none', borderRadius:2, cursor:'pointer', letterSpacing:'0.5px' }}>
          + 강의 등록
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {(courses ?? []).map((c: Course) => (
          <div key={c.id} style={{ background:'var(--card)', border:'1px solid rgba(199,166,106,0.12)', borderRadius:6, padding:'20px 24px' }}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <div style={{ width:44,height:44,background:'rgba(199,166,106,0.1)',border:'1px solid rgba(199,166,106,0.2)',borderRadius:4,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0 }}>📚</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ fontFamily:"'Noto Serif KR',serif", fontSize:16, fontWeight:700, color:'#fff' }}>{c.title}</span>
                    <span style={{ fontSize:11, padding:'2px 8px', background: c.status==='active'?'rgba(199,166,106,0.15)':'rgba(255,255,255,0.05)', color: c.status==='active'?'#C7A66A':'rgba(255,255,255,0.4)', border:`1px solid ${c.status==='active'?'rgba(199,166,106,0.3)':'rgba(255,255,255,0.1)'}`, borderRadius:2 }}>
                      {COURSE_STATUS_LABEL[c.status]}
                    </span>
                    {!c.is_published && <span style={{ fontSize:11, padding:'2px 8px', background:'rgba(239,68,68,0.1)', color:'#fca5a5', border:'1px solid rgba(239,68,68,0.2)', borderRadius:2 }}>비공개</span>}
                  </div>
                  <div className="text-xs" style={{ color:'rgba(255,255,255,0.4)' }}>{c.schedule} · {c.duration_weeks}주 과정 · {c.category}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button style={{ fontSize:12, padding:'7px 16px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.7)', borderRadius:2, cursor:'pointer' }}>주차 관리</button>
                <button style={{ fontSize:12, padding:'7px 16px', background:'rgba(199,166,106,0.1)', border:'1px solid rgba(199,166,106,0.2)', color:'#C7A66A', borderRadius:2, cursor:'pointer' }}>수정</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
