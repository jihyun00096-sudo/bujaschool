const instructors = [
  {role:'대표 강사',name:'이 ○ ○',title:'부자해커스쿨 대표 · 공매 전문가',emoji:'👨‍💼',bg:'linear-gradient(160deg,#101826,#1a2540)',bio:'15년 이상의 공매·경매 실전 투자 경험. 누적 낙찰 200건 이상의 현장 전문가. 어렵고 복잡한 공매 절차를 누구나 이해할 수 있게 쉽게 가르칩니다.',tags:['공매 전문','신탁공매','낙찰 200건+','15년 경력']},
  {role:'수석 강사',name:'박 ○ ○',title:'수석 강사 · NPL 투자 전문가',emoji:'👩‍💼',bg:'linear-gradient(160deg,#1a1610,#2d2518)',bio:'NPL 투자로 10년간 안정적 수익을 실현. 금융권 출신으로 부실채권의 구조와 가치 분석에 정통. 소액 투자자도 시작할 수 있는 전략을 공개합니다.',tags:['NPL 전문','금융권 출신','10년 경력','수익률 연15%+']},
  {role:'토지 멘토',name:'김 ○ ○',title:'토지 전문 멘토 · 실전 투자자',emoji:'👨‍🏫',bg:'linear-gradient(160deg,#101a12,#182a1c)',bio:'토지 투자 전문가로 전국 수십 필지의 개발 가능 토지를 발굴·매각. 현장 답사와 함께하는 실전 교육으로 수강생들의 첫 토지 투자를 돕습니다.',tags:['토지 전문','현장 답사 동행','개발 토지 발굴']},
]

export default function InstructorsSection() {
  return (
    <section id="instructors" style={{padding:'120px 40px',background:'var(--bg)'}}>
      <style>{`
        .instructor-card{border:1px solid rgba(30,30,30,0.1);border-radius:6px;overflow:hidden;background:#fff;box-shadow:0 2px 16px rgba(0,0,0,0.04);transition:transform 0.3s,box-shadow 0.3s}
        .instructor-card:hover{transform:translateY(-6px);box-shadow:0 20px 48px rgba(0,0,0,0.1)}
      `}</style>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="block text-xs font-medium mb-3" style={{color:'#C7A66A',letterSpacing:'3px'}}>INSTRUCTORS</span>
          <h2 style={{fontFamily:"'Noto Serif KR',serif",fontSize:'clamp(28px,3.5vw,42px)',fontWeight:900,letterSpacing:'-1px',color:'var(--primary)',lineHeight:1.25}}>
            실전 경험의<br/><span style={{color:'#C7A66A'}}>전문 강사진</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {instructors.map((ins,i)=>(
            <div key={i} className="instructor-card">
              <div style={{height:260,background:ins.bg,position:'relative',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <div style={{width:110,height:110,borderRadius:'50%',border:'3px solid rgba(199,166,106,0.4)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:44,background:'rgba(199,166,106,0.1)'}}>{ins.emoji}</div>
                <div style={{position:'absolute',bottom:16,left:16,background:'rgba(199,166,106,0.9)',color:'#101826',padding:'4px 12px',borderRadius:2,fontSize:11,fontWeight:700,letterSpacing:'1px'}}>{ins.role}</div>
              </div>
              <div style={{padding:'24px 28px'}}>
                <div style={{fontFamily:"'Noto Serif KR',serif",fontSize:22,fontWeight:700,color:'var(--primary)',letterSpacing:'-0.5px',marginBottom:4}}>{ins.name}</div>
                <div className="text-xs mb-4" style={{color:'#C7A66A',letterSpacing:'0.5px'}}>{ins.title}</div>
                <p className="text-sm leading-7 mb-5" style={{color:'#6B6458'}}>{ins.bio}</p>
                <div className="flex flex-wrap gap-1.5">
                  {ins.tags.map(t=><span key={t} className="text-xs px-2.5 py-1" style={{background:'#F5EDD8',color:'#6B6458',borderRadius:2}}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
