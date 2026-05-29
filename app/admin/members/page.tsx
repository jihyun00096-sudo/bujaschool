import { createClient } from '@/lib/supabase/server'
import type { Profile } from '@/types'

export default async function AdminMembersPage() {
  const supabase = await createClient()
  const { data: members } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })

  return (
    <div style={{ padding:'32px 40px' }}>
      <div className="flex items-center justify-between mb-8">
        <h1 style={{ fontFamily:"'Noto Serif KR',serif", fontSize:24, fontWeight:900, color:'#fff' }}>회원 관리</h1>
        <div className="text-sm" style={{ color:'rgba(255,255,255,0.4)' }}>총 {members?.length ?? 0}명</div>
      </div>
      <div style={{ background:'var(--card)', border:'1px solid rgba(199,166,106,0.12)', borderRadius:6, overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ borderBottom:'1px solid rgba(199,166,106,0.15)' }}>
              {['이름','이메일','연락처','역할','가입일','관리'].map(h => (
                <th key={h} style={{ padding:'14px 18px', textAlign:'left', fontSize:12, color:'rgba(255,255,255,0.4)', fontWeight:500, letterSpacing:'0.5px', background:'rgba(0,0,0,0.2)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(members ?? []).map((m: Profile) => (
              <tr key={m.id} style={{ borderBottom:'1px solid rgba(255,255,255,0.04)' }}
                onMouseEnter={e=>(e.currentTarget.style.background='rgba(255,255,255,0.02)')}
                onMouseLeave={e=>(e.currentTarget.style.background='transparent')}>
                <td style={{ padding:'14px 18px', fontSize:14, color:'rgba(255,255,255,0.85)', fontWeight:500 }}>{m.full_name || '-'}</td>
                <td style={{ padding:'14px 18px', fontSize:13, color:'rgba(255,255,255,0.5)' }}>{m.email}</td>
                <td style={{ padding:'14px 18px', fontSize:13, color:'rgba(255,255,255,0.5)' }}>{m.phone ?? '-'}</td>
                <td style={{ padding:'14px 18px' }}>
                  <span style={{ fontSize:11, padding:'3px 10px', background: m.role==='admin'?'rgba(199,166,106,0.15)':'rgba(255,255,255,0.06)', color: m.role==='admin'?'#C7A66A':'rgba(255,255,255,0.5)', border:`1px solid ${m.role==='admin'?'rgba(199,166,106,0.3)':'rgba(255,255,255,0.1)'}`, borderRadius:2, letterSpacing:'0.5px' }}>
                    {m.role === 'admin' ? '관리자' : '수강생'}
                  </span>
                </td>
                <td style={{ padding:'14px 18px', fontSize:12, color:'rgba(255,255,255,0.35)' }}>{new Date(m.created_at).toLocaleDateString('ko-KR')}</td>
                <td style={{ padding:'14px 18px' }}>
                  <button style={{ fontSize:12, padding:'5px 14px', background:'rgba(199,166,106,0.1)', border:'1px solid rgba(199,166,106,0.2)', color:'#C7A66A', borderRadius:2, cursor:'pointer' }}>
                    상세
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
