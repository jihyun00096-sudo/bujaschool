import { createClient } from '@/lib/supabase/server'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const [members, courses, enrollments, inquiries] = await Promise.all([
    supabase.from('profiles').select('id', { count:'exact' }).eq('role','student'),
    supabase.from('courses').select('id', { count:'exact' }),
    supabase.from('enrollments').select('id', { count:'exact' }).eq('status','active'),
    supabase.from('inquiries').select('id', { count:'exact' }).eq('status','pending'),
  ])
  const stats = [
    { label:'전체 회원', value: members.count ?? 0, icon:'👥', color:'#3b82f6' },
    { label:'운영 강의', value: courses.count ?? 0, icon:'📚', color:'#C7A66A' },
    { label:'활성 수강', value: enrollments.count ?? 0, icon:'🎓', color:'#22c55e' },
    { label:'미처리 문의', value: inquiries.count ?? 0, icon:'💬', color:'#ef4444' },
  ]
  const { data: recentMembers } = await supabase.from('profiles').select('*').order('created_at',{ascending:false}).limit(5)
  const { data: recentInquiries } = await supabase.from('inquiries').select('*').order('created_at',{ascending:false}).limit(5)

  return (
    <div style={{ padding:'32px 40px' }}>
      <h1 style={{ fontFamily:"'Noto Serif KR',serif", fontSize:24, fontWeight:900, color:'#fff', marginBottom:28, letterSpacing:'-0.5px' }}>대시보드</h1>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(s => (
          <div key={s.label} style={{ background:'var(--card)', border:'1px solid rgba(199,166,106,0.12)', borderRadius:6, padding:'20px 24px' }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xl">{s.icon}</span>
              <div style={{ width:8,height:8,borderRadius:'50%',background:s.color }} />
            </div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:40, fontWeight:600, color:'#fff', lineHeight:1, marginBottom:4 }}>
              {s.value.toLocaleString()}
            </div>
            <div className="text-xs" style={{ color:'rgba(255,255,255,0.4)', letterSpacing:'0.5px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* 최근 가입 회원 */}
        <div style={{ background:'var(--card)', border:'1px solid rgba(199,166,106,0.12)', borderRadius:6, padding:'24px' }}>
          <h2 className="text-base font-bold mb-5" style={{ color:'#fff' }}>최근 가입 회원</h2>
          {(recentMembers ?? []).map((m: {id:string;full_name:string;email:string;phone?:string;created_at:string}) => (
            <div key={m.id} className="flex items-center justify-between py-3" style={{ borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
              <div>
                <div className="text-sm font-medium" style={{ color:'rgba(255,255,255,0.85)' }}>{m.full_name || '(이름 미입력)'}</div>
                <div className="text-xs mt-0.5" style={{ color:'rgba(255,255,255,0.35)' }}>{m.email}</div>
              </div>
              <div className="text-xs" style={{ color:'rgba(255,255,255,0.3)' }}>{new Date(m.created_at).toLocaleDateString('ko-KR')}</div>
            </div>
          ))}
        </div>

        {/* 미처리 문의 */}
        <div style={{ background:'var(--card)', border:'1px solid rgba(199,166,106,0.12)', borderRadius:6, padding:'24px' }}>
          <h2 className="text-base font-bold mb-5" style={{ color:'#fff' }}>최근 수강 문의</h2>
          {(recentInquiries ?? []).map((q: {id:string;name:string;phone:string;course_interest?:string;status:string;created_at:string}) => (
            <div key={q.id} className="flex items-center justify-between py-3" style={{ borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
              <div>
                <div className="text-sm font-medium" style={{ color:'rgba(255,255,255,0.85)' }}>{q.name}</div>
                <div className="text-xs mt-0.5" style={{ color:'rgba(255,255,255,0.35)' }}>{q.course_interest ?? '미선택'} · {q.phone}</div>
              </div>
              <span className="text-xs px-2 py-0.5" style={{ background: q.status==='pending'?'rgba(239,68,68,0.12)':'rgba(34,197,94,0.12)', color: q.status==='pending'?'#fca5a5':'#86efac', border:`1px solid ${q.status==='pending'?'rgba(239,68,68,0.2)':'rgba(34,197,94,0.2)'}`, borderRadius:2 }}>
                {q.status === 'pending' ? '대기' : q.status === 'in_progress' ? '처리중' : '완료'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
