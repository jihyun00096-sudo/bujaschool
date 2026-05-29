import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import { ENROLLMENT_STATUS_LABEL } from '@/lib/utils'
import type { Enrollment } from '@/types'

export default async function AdminEnrollmentsPage() {
  const supabase = await createClient()
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('*, profile:profiles(full_name,email,phone), course:courses(title)')
    .order('created_at', { ascending: false })

  const { data: members } = await supabase.from('profiles').select('id,full_name,email').eq('role','student').order('full_name')
  const { data: courses } = await supabase.from('courses').select('id,title').eq('is_published',true).order('order_index')

  return (
    <div style={{ padding:'32px 40px' }}>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 style={{ fontFamily:"'Noto Serif KR',serif", fontSize:24, fontWeight:900, color:'#fff' }}>수강 권한 관리</h1>
        <button style={{ padding:'10px 22px', background:'linear-gradient(135deg,#C7A66A,#B8945A)', color:'#101826', fontSize:13, fontWeight:700, border:'none', borderRadius:2, cursor:'pointer', letterSpacing:'0.5px' }}>
          + 권한 부여
        </button>
      </div>

      {/* 권한 부여 폼 */}
      <div className="mb-8 p-6 rounded-lg" style={{ background:'var(--card)', border:'1px solid rgba(199,166,106,0.15)' }}>
        <h2 className="text-sm font-bold mb-4" style={{ color:'rgba(255,255,255,0.7)', letterSpacing:'1px' }}>수강 권한 부여</h2>
        <div className="grid md:grid-cols-4 gap-3">
          <select style={{ padding:'11px 14px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(199,166,106,0.15)', borderRadius:3, color:'rgba(255,255,255,0.7)', fontSize:13, fontFamily:'inherit', outline:'none' }}>
            <option value="">회원 선택</option>
            {(members??[]).map((m:{id:string;full_name:string;email:string}) => <option key={m.id} value={m.id} style={{background:'#161D2C'}}>{m.full_name} ({m.email})</option>)}
          </select>
          <select style={{ padding:'11px 14px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(199,166,106,0.15)', borderRadius:3, color:'rgba(255,255,255,0.7)', fontSize:13, fontFamily:'inherit', outline:'none' }}>
            <option value="">강의 선택</option>
            {(courses??[]).map((c:{id:string;title:string}) => <option key={c.id} value={c.id} style={{background:'#161D2C'}}>{c.title}</option>)}
          </select>
          <input type="date" style={{ padding:'11px 14px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(199,166,106,0.15)', borderRadius:3, color:'rgba(255,255,255,0.7)', fontSize:13, fontFamily:'inherit', outline:'none' }} />
          <button style={{ padding:'11px 22px', background:'linear-gradient(135deg,#C7A66A,#B8945A)', color:'#101826', fontSize:13, fontWeight:700, border:'none', borderRadius:3, cursor:'pointer', letterSpacing:'0.5px' }}>
            권한 부여
          </button>
        </div>
      </div>

      {/* 수강 목록 */}
      <div style={{ background:'var(--card)', border:'1px solid rgba(199,166,106,0.12)', borderRadius:6, overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ borderBottom:'1px solid rgba(199,166,106,0.15)' }}>
              {['회원','강의','상태','수강 기간','권한 부여일','관리'].map(h => (
                <th key={h} style={{ padding:'14px 18px', textAlign:'left', fontSize:12, color:'rgba(255,255,255,0.4)', fontWeight:500, letterSpacing:'0.5px', background:'rgba(0,0,0,0.2)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(enrollments??[]).map((e: Enrollment & {profile?:{full_name:string;email:string};course?:{title:string}}) => (
              <tr key={e.id} style={{ borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding:'14px 18px' }}>
                  <div className="text-sm font-medium" style={{ color:'rgba(255,255,255,0.85)' }}>{e.profile?.full_name ?? '-'}</div>
                  <div className="text-xs mt-0.5" style={{ color:'rgba(255,255,255,0.35)' }}>{e.profile?.email}</div>
                </td>
                <td style={{ padding:'14px 18px', fontSize:13, color:'rgba(255,255,255,0.6)' }}>{e.course?.title ?? '-'}</td>
                <td style={{ padding:'14px 18px' }}>
                  <span style={{ fontSize:11, padding:'3px 10px', background: e.status==='active'?'rgba(34,197,94,0.12)':e.status==='pending'?'rgba(251,191,36,0.12)':'rgba(255,255,255,0.06)', color: e.status==='active'?'#86efac':e.status==='pending'?'#fde68a':'rgba(255,255,255,0.4)', border:`1px solid ${e.status==='active'?'rgba(34,197,94,0.2)':e.status==='pending'?'rgba(251,191,36,0.2)':'rgba(255,255,255,0.1)'}`, borderRadius:2 }}>
                    {ENROLLMENT_STATUS_LABEL[e.status]}
                  </span>
                </td>
                <td style={{ padding:'14px 18px', fontSize:12, color:'rgba(255,255,255,0.4)' }}>
                  {e.start_date ? `${formatDate(e.start_date)} ~ ${e.end_date ? formatDate(e.end_date) : '무제한'}` : '-'}
                </td>
                <td style={{ padding:'14px 18px', fontSize:12, color:'rgba(255,255,255,0.35)' }}>{e.granted_at ? formatDate(e.granted_at) : '-'}</td>
                <td style={{ padding:'14px 18px' }}>
                  <button style={{ fontSize:12, padding:'5px 12px', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)', color:'#fca5a5', borderRadius:2, cursor:'pointer' }}>
                    회수
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
