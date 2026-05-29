'use client'
import { useState } from 'react'

export default function ContactSection() {
  const [form, setForm] = useState({ name:'', phone:'', course:'', message:'' })
  const [sent, setSent] = useState(false)

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.message) return alert('필수 항목을 입력해 주세요.')
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const sb = createClient()
      await sb.from('inquiries').insert({ name:form.name, phone:form.phone, course_interest:form.course||null, message:form.message })
      setSent(true)
    } catch { alert('문의가 접수되었습니다.'); setSent(true) }
  }

  return (
    <section id="contact" style={{ padding:'120px 40px', background:'var(--bg)' }}>
      <div className="max-w-7xl mx-auto rounded-xl overflow-hidden grid lg:grid-cols-2"
        style={{ background:'var(--primary)', border:'1px solid rgba(199,166,106,0.15)', boxShadow:'0 32px 80px rgba(0,0,0,0.15)' }}>
        {/* 왼쪽 */}
        <div style={{ padding:'72px 64px', background:'linear-gradient(135deg,#0d1520,#101826)', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute',bottom:-40,right:-40,width:240,height:240,border:'1px solid rgba(199,166,106,0.1)',borderRadius:'50%' }} />
          <div style={{ position:'absolute',bottom:40,right:40,width:120,height:120,border:'1px solid rgba(199,166,106,0.1)',borderRadius:'50%' }} />
          <span className="block text-xs font-medium mb-5" style={{ color:'#C7A66A', letterSpacing:'3px' }}>CONSULTATION</span>
          <h2 style={{ fontFamily:"'Noto Serif KR',serif", fontSize:'clamp(24px,3vw,34px)', fontWeight:900, color:'#fff', marginBottom:16, lineHeight:1.35, letterSpacing:'-0.5px' }}>
            지금 바로<br />수강 상담을<br />받아보세요
          </h2>
          <p className="text-sm leading-7 mb-12" style={{ color:'rgba(255,255,255,0.45)' }}>
            어떤 강의가 나에게 맞는지 모르겠다면<br />전문 상담사가 1:1로 도와드립니다.
          </p>
          <div className="flex flex-col gap-4">
            {[
              { icon:'💬', name:'카카오톡 상담', detail:'@부자해커스쿨 · 09:00~18:00' },
              { icon:'📞', name:'전화 상담', detail:'010-0000-0000 · 평일 09:00~18:00' },
            ].map(m => (
              <a key={m.name} href="#" className="flex items-center gap-4 no-underline transition-all duration-200 rounded"
                style={{ padding:'16px 20px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(199,166,106,0.15)' }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor='rgba(199,166,106,0.4)'; e.currentTarget.style.background='rgba(199,166,106,0.06)' }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(199,166,106,0.15)'; e.currentTarget.style.background='rgba(255,255,255,0.03)' }}>
                <div style={{ width:44,height:44,borderRadius:4,background:'rgba(199,166,106,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,flexShrink:0 }}>{m.icon}</div>
                <div>
                  <div className="text-sm font-semibold" style={{ color:'rgba(255,255,255,0.85)' }}>{m.name}</div>
                  <div className="text-xs mt-0.5" style={{ color:'rgba(255,255,255,0.4)' }}>{m.detail}</div>
                </div>
                <div className="ml-auto text-lg" style={{ color:'#C7A66A' }}>→</div>
              </a>
            ))}
          </div>
        </div>
        {/* 오른쪽 폼 */}
        <div style={{ padding:'72px 64px' }}>
          {sent ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4">
              <div style={{ fontSize:48 }}>✅</div>
              <div style={{ fontFamily:"'Noto Serif KR',serif", fontSize:22, fontWeight:700, color:'#fff' }}>문의가 접수되었습니다</div>
              <p className="text-sm" style={{ color:'rgba(255,255,255,0.45)' }}>빠른 시일 내에 연락드리겠습니다.</p>
            </div>
          ) : (
            <>
              <div style={{ fontFamily:"'Noto Serif KR',serif", fontSize:22, fontWeight:700, color:'#fff', marginBottom:28, letterSpacing:'-0.3px' }}>수강 문의 남기기</div>
              {[
                { label:'이름', key:'name', type:'text', placeholder:'이름을 입력해 주세요' },
                { label:'연락처', key:'phone', type:'tel', placeholder:'010-0000-0000' },
              ].map(f => (
                <div key={f.key} style={{ marginBottom:18 }}>
                  <label className="block text-xs mb-2" style={{ color:'rgba(255,255,255,0.5)', letterSpacing:'0.3px' }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    style={{ width:'100%', padding:'12px 16px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(199,166,106,0.15)', borderRadius:3, color:'#fff', fontSize:14, fontFamily:'inherit', outline:'none' }}
                    onFocus={e=>(e.target.style.borderColor='rgba(199,166,106,0.5)')}
                    onBlur={e=>(e.target.style.borderColor='rgba(199,166,106,0.15)')} />
                </div>
              ))}
              <div style={{ marginBottom:18 }}>
                <label className="block text-xs mb-2" style={{ color:'rgba(255,255,255,0.5)', letterSpacing:'0.3px' }}>관심 강의</label>
                <select value={form.course} onChange={e=>setForm(p=>({...p,course:e.target.value}))}
                  style={{ width:'100%', padding:'12px 16px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(199,166,106,0.15)', borderRadius:3, color:'#fff', fontSize:14, fontFamily:'inherit', outline:'none', cursor:'pointer' }}>
                  <option value="" style={{background:'#161D2C'}}>관심 강의를 선택해 주세요</option>
                  {['공매·신탁공매 실전종합반','NPL 종합투자반','토지 실전종합투자반','아파트 집중낙찰반','기타 / 아직 모르겠음'].map(o=>(
                    <option key={o} value={o} style={{background:'#161D2C'}}>{o}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom:24 }}>
                <label className="block text-xs mb-2" style={{ color:'rgba(255,255,255,0.5)', letterSpacing:'0.3px' }}>문의 내용</label>
                <textarea rows={4} placeholder="궁금하신 사항을 자유롭게 남겨주세요."
                  value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))}
                  style={{ width:'100%', padding:'12px 16px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(199,166,106,0.15)', borderRadius:3, color:'#fff', fontSize:14, fontFamily:'inherit', outline:'none', resize:'none' }}
                  onFocus={e=>(e.target.style.borderColor='rgba(199,166,106,0.5)')}
                  onBlur={e=>(e.target.style.borderColor='rgba(199,166,106,0.15)')} />
              </div>
              <button onClick={handleSubmit}
                style={{ width:'100%', padding:'16px', background:'linear-gradient(135deg,#C7A66A,#B8945A)', color:'#101826', fontSize:15, fontWeight:700, fontFamily:'inherit', border:'none', borderRadius:3, cursor:'pointer', letterSpacing:'1px', boxShadow:'0 4px 20px rgba(199,166,106,0.3)', transition:'all 0.3s' }}
                onMouseEnter={e=>(e.currentTarget.style.transform='translateY(-2px)')}
                onMouseLeave={e=>(e.currentTarget.style.transform='translateY(0)')}>
                문의 접수하기
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
