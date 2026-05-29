const reviews = [
  { stars:5, text:'공매가 이렇게 체계적으로 정리될 수 있다니 놀랐습니다. 강의 수료 후 첫 낙찰에 성공했습니다. 강사님의 실전 경험이 그대로 전달되는 강의입니다.', name:'김○○', course:'공매·신탁공매 실전종합반 1기', type:'낙찰 후기', emoji:'😊' },
  { stars:5, text:'NPL 투자를 막연하게 생각했는데, 실제 채권 분석부터 수익 실현까지 너무 명확하게 알려주셔서 감사합니다. 첫 투자로 수익을 냈습니다!', name:'이○○', course:'NPL 종합투자반 2기', type:'투자 후기', emoji:'😄' },
  { stars:5, text:'LIVE 강의라 현장감이 살아있습니다. 강의 중 질문하면 바로 답변해 주시고, 최신 사례들을 바로 반영해 주시는 점이 정말 좋았습니다.', name:'박○○', course:'토지 실전종합투자반 1기', type:'실전 후기', emoji:'🙂' },
  { stars:5, text:'교재가 정말 잘 정리되어 있어서 강의 후에도 계속 참고하고 있습니다. 현장에서 바로 써먹을 수 있는 실용적인 내용들로 꽉 차 있어요.', name:'최○○', course:'공매·신탁공매 실전종합반 2기', type:'수강 후기', emoji:'😎' },
  { stars:5, text:'토지 투자가 막막했는데 현장 답사까지 동행해 주셔서 실제로 어떻게 물건을 보는지 눈으로 익혔습니다. 강의료가 아깝지 않은 교육입니다.', name:'정○○', course:'토지 실전종합투자반 2기', type:'현장 후기', emoji:'🤩' },
]
const doubled = [...reviews, ...reviews]

export default function ReviewsSection() {
  return (
    <section id="reviews" style={{ padding:'120px 40px', background:'var(--primary)', overflow:'hidden' }}>
      <div className="max-w-7xl mx-auto mb-16">
        <span className="block text-xs font-medium mb-3" style={{ color:'#C7A66A', letterSpacing:'3px' }}>REVIEWS</span>
        <h2 style={{ fontFamily:"'Noto Serif KR',serif", fontSize:'clamp(28px,3.5vw,42px)', fontWeight:900, letterSpacing:'-1px', color:'#fff', lineHeight:1.25 }}>
          수강생 <span style={{color:'#C7A66A'}}>실전 후기</span>
        </h2>
      </div>
      <div style={{ position:'relative', overflow:'hidden' }}>
        {/* 페이드 오버레이 */}
        <div style={{ position:'absolute', top:0, bottom:0, left:0, width:120, background:'linear-gradient(90deg,var(--primary),transparent)', zIndex:10 }} />
        <div style={{ position:'absolute', top:0, bottom:0, right:0, width:120, background:'linear-gradient(-90deg,var(--primary),transparent)', zIndex:10 }} />
        <style>{`
          @keyframes scrollLeft { from{transform:translateX(0)} to{transform:translateX(-50%)} }
          .reviews-track { display:flex; gap:20px; animation:scrollLeft 45s linear infinite; width:max-content; padding:8px 0; }
          .reviews-track:hover { animation-play-state:paused; }
        `}</style>
        <div className="reviews-track">
          {doubled.map((r, i) => (
            <div key={i} style={{ width:320, flexShrink:0, background:'var(--card)', border:'1px solid rgba(199,166,106,0.12)', borderRadius:6, padding:'24px' }}>
              <div className="mb-3 text-sm" style={{ color:'#C7A66A', letterSpacing:'3px' }}>{'★'.repeat(r.stars)}</div>
              <p className="text-sm leading-7 mb-5" style={{ color:'rgba(255,255,255,0.65)' }}>{r.text}</p>
              <div className="flex items-center gap-3">
                <div style={{ width:38,height:38,borderRadius:'50%',background:'rgba(199,166,106,0.12)',border:'1px solid rgba(199,166,106,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18 }}>{r.emoji}</div>
                <div>
                  <div className="text-sm font-medium" style={{ color:'rgba(255,255,255,0.8)' }}>{r.name} 수강생</div>
                  <div className="text-xs mt-0.5" style={{ color:'rgba(199,166,106,0.6)' }}>{r.course}</div>
                </div>
                <div className="ml-auto text-xs px-2 py-1" style={{ background:'rgba(199,166,106,0.08)', border:'1px solid rgba(199,166,106,0.2)', borderRadius:2, color:'#E5D2A4', letterSpacing:'0.5px' }}>{r.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
