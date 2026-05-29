import { createClient } from '@/lib/supabase/server'
import type { Inquiry } from '@/types'

export default async function AdminInquiriesPage() {
  const supabase = await createClient()
  const { data: inquiries } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false })

  const statusMap = { pending:{label:'대기',bg:'rgba(239,68,68,0.12)',color:'#fca5a5',border:'rgba(239,68,68,0.2)'}, in_progress:{label:'처리중',bg:'rgba(251,191,36,0.12)',color:'#fde68a',border:'rgba(251,191,36,0.2)'}, resolved:{label:'완료',bg:'rgba(34,197,94,0.12)',color:'#86efac',border:'rgba(34,197,94,0.2)'} }

  return (
    <div style={{ padding:'32px 40px' }}>
      <h1 style={{ fontFamily:"'Noto Serif KR',serif", fontSize:24, fontWeight:900, color:'#fff', marginBottom:8 }}>상담 문의</h1>
      <p className="text-sm mb-8" style={{ color:'rgba(255,255,255,0.4)' }}>수강 상담 문의 내역을 관리합니다.</p>
      <div className="flex flex-col gap-3">
        {(inquiries ?? []).map((q: Inquiry) => {
          const s = statusMap[q.status] ?? statusMap.pending
          return (
            <div key={q.id} style={{ background:'var(--card)', border:'1px solid rgba(199,166,106,0.12)', borderRadius:6, padding:'20px 24px' }}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-medium text-sm" style={{ color:'rgba(255,255,255,0.9)' }}>{q.name}</span>
                    <span className="text-sm" style={{ color:'rgba(255,255,255,0.4)' }}>{q.phone}</span>
                    {q.course_interest && <span className="text-xs px-2 py-0.5" style={{ background:'rgba(199,166,106,0.1)', border:'1px solid rgba(199,166,106,0.2)', color:'#C7A66A', borderRadius:2 }}>{q.course_interest}</span>}
                  </div>
                  <p className="text-sm leading-6 mt-2" style={{ color:'rgba(255,255,255,0.6)', maxWidth:600 }}>{q.message}</p>
                  <div className="text-xs mt-2" style={{ color:'rgba(255,255,255,0.3)' }}>{new Date(q.created_at).toLocaleString('ko-KR')}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span style={{ fontSize:11, padding:'4px 12px', background:s.bg, color:s.color, border:`1px solid ${s.border}`, borderRadius:2, letterSpacing:'0.5px' }}>{s.label}</span>
                  {q.status !== 'resolved' && (
                    <button style={{ fontSize:12, padding:'6px 14px', background:'rgba(199,166,106,0.1)', border:'1px solid rgba(199,166,106,0.2)', color:'#C7A66A', borderRadius:2, cursor:'pointer' }}>
                      처리 완료
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
        {!inquiries?.length && (
          <div className="text-center py-16 text-sm" style={{ color:'rgba(255,255,255,0.3)', background:'rgba(255,255,255,0.02)', borderRadius:6, border:'1px solid rgba(255,255,255,0.05)' }}>
            문의 내역이 없습니다.
          </div>
        )}
      </div>
    </div>
  )
}
