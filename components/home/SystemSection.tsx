const features = [
  { num:'01', title:'Zoom 바로 입장', desc:'강의 시작 2시간 전 자동으로 Zoom 링크가 공개됩니다. 버튼 하나로 실시간 강의에 바로 참여하세요.' },
  { num:'02', title:'주차별 강의 안내', desc:'전체 커리큘럼과 주차별 강의 내용을 한눈에 확인할 수 있습니다. 수업 준비를 미리 할 수 있어요.' },
  { num:'03', title:'전용 자료실', desc:'강의별 교재, 참고자료, 실습 파일을 자료실에서 언제든지 다운로드하세요. 수강 기간 내 무제한 이용.' },
  { num:'04', title:'공지사항 알림', desc:'일정 변경, 보강, 특별 공지 등 강의실별 공지사항을 실시간으로 확인할 수 있습니다.' },
]
const weeks = [
  { n:6, title:'공매 물건 분석 실습', status:'complete', label:'완료' },
  { n:7, title:'신탁공매 절차와 리스크', status:'complete', label:'완료' },
  { n:8, title:'입찰가 산정 전략', status:'today', label:'오늘' },
  { n:9, title:'낙찰 후 처리 완전정복', status:'upcoming', label:'예정' },
  { n:10, title:'실전 케이스 스터디', status:'upcoming', label:'예정' },
]
const weekStyle: Record<string, { bg: string; color: string; border: string }> = {
  complete:  { bg:'rgba(34,197,94,0.12)',  color:'#86efac', border:'rgba(34,197,94,0.2)' },
  today:     { bg:'rgba(199,166,106,0.15)',color:'#E5D2A4', border:'rgba(199,166,106,0.3)' },
  upcoming:  { bg:'rgba(255,255,255,0.05)',color:'rgba(255,255,255,0.3)', border:'rgba(255,255,255,0.08)' },
}

export default function SystemSection() {
  return (
    <section id="system" style={{ padding:'120px 40px', background:'var(--bg)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="block text-xs font-medium mb-3" style={{ color:'#C7A66A', letterSpacing:'3px' }}>MEMBER SYSTEM</span>
          <h2 style={{ fontFamily:"'Noto Serif KR',serif", fontSize:'clamp(28px,3.5vw,42px)', fontWeight:900, letterSpacing:'-1px', color:'var(--primary)', lineHeight:1.25 }}>
            회원 전용<br /><span style={{color:'#C7A66A'}}>스마트 강의실</span>
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* 피처 목록 */}
          <div className="flex flex-col gap-8">
            {features.map((f, i) => (
              <div key={i} className="flex gap-5 items-start">
                <div style={{ width:40,height:40,background:'linear-gradient(135deg,#C7A66A,#B8945A)',color:'#101826',fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:2,boxShadow:'0 4px 12px rgba(199,166,106,0.3)',flexShrink:0 }}>
                  {f.num}
                </div>
                <div>
                  <div style={{ fontFamily:"'Noto Serif KR',serif",fontSize:18,fontWeight:700,color:'var(--primary)',marginBottom:6,letterSpacing:'-0.3px' }}>{f.title}</div>
                  <p className="text-sm leading-7" style={{ color:'#6B6458' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          {/* 강의실 목업 */}
          <div style={{ background:'var(--card)',borderRadius:10,overflow:'hidden',boxShadow:'0 32px 80px rgba(0,0,0,0.15)',border:'1px solid rgba(199,166,106,0.12)' }}>
            <div className="flex items-center gap-2.5 px-5 py-3.5" style={{ background:'#0D1520',borderBottom:'1px solid rgba(199,166,106,0.1)' }}>
              {['#ef4444','#f59e0b','#22c55e'].map(c=><div key={c} style={{width:11,height:11,borderRadius:'50%',background:c}} />)}
              <span className="text-xs ml-2" style={{ color:'rgba(255,255,255,0.4)' }}>내 강의실 · 공매·신탁공매 실전종합반</span>
            </div>
            <div style={{ padding:20 }}>
              <div className="mb-5">
                <div style={{ fontFamily:"'Noto Serif KR',serif",fontSize:16,fontWeight:700,color:'#fff',marginBottom:3 }}>공매·신탁공매 실전종합반 3기</div>
                <div className="text-xs" style={{ color:'#C7A66A' }}>2025.03.04 ~ 2025.05.27 · 매주 화요일 19:00</div>
              </div>
              <div className="flex items-center justify-between p-4 mb-5 rounded"
                style={{ background:'rgba(199,166,106,0.08)',border:'1px solid rgba(199,166,106,0.2)' }}>
                <div>
                  <div className="text-xs mb-1" style={{ color:'#E5D2A4',letterSpacing:'1px' }}>다음 LIVE 강의</div>
                  <div className="text-sm font-medium" style={{ color:'#fff' }}>05월 27일 (화) 오후 7:00</div>
                </div>
                <button style={{ display:'flex',alignItems:'center',gap:8,padding:'10px 18px',background:'linear-gradient(135deg,#C7A66A,#B8945A)',color:'#101826',fontSize:13,fontWeight:700,border:'none',borderRadius:3,cursor:'pointer',letterSpacing:'0.5px' }}>
                  📹 Zoom 입장
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {weeks.map(w => {
                  const s = weekStyle[w.status]
                  return (
                    <div key={w.n} className="flex items-center gap-3.5 px-3.5 py-3 rounded cursor-pointer transition-all"
                      style={{ background: w.status==='today' ? 'rgba(199,166,106,0.04)' : 'rgba(255,255,255,0.02)', border:`1px solid ${w.status==='today'?'rgba(199,166,106,0.3)':'rgba(255,255,255,0.05)'}` }}>
                      <div style={{ width:28,height:28,background:w.status==='today'?'rgba(199,166,106,0.2)':'rgba(199,166,106,0.1)',borderRadius:2,fontSize:12,fontWeight:600,color:'#C7A66A',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>{w.n}</div>
                      <div className="flex-1 text-sm" style={{ color:'rgba(255,255,255,0.7)' }}>{w.title}</div>
                      <div className="text-xs px-2 py-0.5" style={{ background:s.bg,color:s.color,border:`1px solid ${s.border}`,borderRadius:2 }}>{w.label}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
