const items = [
  {num:'01',icon:'📡',title:'LIVE 강의 중심 교육',desc:'녹화 강의가 아닌 실시간 LIVE 강의로 진행합니다. 최신 시장 흐름과 실제 사례를 바로바로 반영합니다.'},
  {num:'02',icon:'🎯',title:'실전 중심 커리큘럼',desc:'이론보다 실전. 실제 낙찰 사례, 수익 사례를 직접 분석하며 투자 감각을 키웁니다.'},
  {num:'03',icon:'📚',title:'전문 교재 무료 제공',desc:'강의 전용으로 제작된 교재를 제공합니다. 복습과 현장 활용에 최적화된 내용으로 구성되어 있습니다.'},
  {num:'04',icon:'💬',title:'실시간 질의응답',desc:'강의 중 궁금한 점은 즉시 질문하세요. 강사가 직접 답변하는 양방향 소통 수업입니다.'},
]
export default function WhySection() {
  return (
    <section id="why" style={{padding:'120px 40px',background:'var(--primary)',position:'relative',overflow:'hidden'}}>
      <style>{`
        .why-card{padding:48px 36px;background:rgba(255,255,255,0.02);border-right:1px solid rgba(199,166,106,0.1);position:relative;transition:background 0.3s;overflow:hidden}
        .why-card:last-child{border-right:none}
        .why-card::after{content:'';position:absolute;bottom:0;left:0;width:0;height:2px;background:linear-gradient(90deg,#C7A66A,transparent);transition:width 0.35s ease}
        .why-card:hover{background:rgba(199,166,106,0.04)}
        .why-card:hover::after{width:100%}
      `}</style>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(199,166,106,0.05) 0%, transparent 60%)'}}/>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="block text-xs font-medium mb-3" style={{color:'#C7A66A',letterSpacing:'3px'}}>WHY BUJAHACKER</span>
          <h2 style={{fontFamily:"'Noto Serif KR',serif",fontSize:'clamp(28px,3.5vw,42px)',fontWeight:900,letterSpacing:'-1px',color:'#fff',lineHeight:1.25}}>
            왜 <span style={{color:'#C7A66A'}}>부자해커스쿨</span>인가
          </h2>
          <p className="mt-4 text-base" style={{color:'rgba(255,255,255,0.45)',lineHeight:1.7}}>단순한 강의가 아닙니다. 실전 투자자를 만드는 시스템입니다.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 relative z-10" style={{border:'1px solid rgba(199,166,106,0.12)',borderRadius:6,overflow:'hidden'}}>
          {items.map((item,i)=>(
            <div key={i} className="why-card">
              <div className="w-14 h-14 flex items-center justify-center text-2xl mb-7" style={{background:'rgba(199,166,106,0.1)',border:'1px solid rgba(199,166,106,0.2)',borderRadius:4}}>{item.icon}</div>
              <span className="block mb-4" style={{color:'#C7A66A',letterSpacing:'2px',fontFamily:"'Cormorant Garamond',serif",fontSize:14}}>{item.num}</span>
              <h3 style={{fontFamily:"'Noto Serif KR',serif",fontSize:19,fontWeight:700,color:'#fff',marginBottom:12,letterSpacing:'-0.3px',lineHeight:1.4}}>{item.title}</h3>
              <p className="text-sm leading-7" style={{color:'rgba(255,255,255,0.45)'}}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
