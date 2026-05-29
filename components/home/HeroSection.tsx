export default function HeroSection() {
  return (
    <section id="hero" style={{ minHeight:'100vh', background:'var(--primary)', position:'relative', overflow:'hidden', display:'flex', alignItems:'center' }}>
      <style>{`
        .hero-card { background:var(--card); border:1px solid rgba(199,166,106,0.15); border-radius:8px; overflow:hidden; box-shadow:0 32px 80px rgba(0,0,0,0.5); transform:perspective(1000px) rotateY(-3deg) rotateX(2deg); transition:transform 0.5s ease; }
        .hero-card:hover { transform:perspective(1000px) rotateY(0deg) rotateX(0deg); }
        .hero-btn-primary { display:inline-flex; align-items:center; gap:8px; padding:15px 32px; background:linear-gradient(135deg,#C7A66A,#B8945A); color:#101826; font-weight:700; font-size:14px; border-radius:2px; letter-spacing:0.5px; box-shadow:0 4px 24px rgba(199,166,106,0.35); transition:transform 0.3s,box-shadow 0.3s; text-decoration:none; }
        .hero-btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 32px rgba(199,166,106,0.5); }
        .hero-btn-secondary { display:inline-flex; align-items:center; gap:8px; padding:15px 32px; background:transparent; color:rgba(255,255,255,0.8); font-size:14px; border:1px solid rgba(255,255,255,0.2); border-radius:2px; transition:border-color 0.2s,color 0.2s; text-decoration:none; }
        .hero-btn-secondary:hover { border-color:#C7A66A; color:#C7A66A; }
        .pulse-dot { width:6px; height:6px; border-radius:50%; background:#C7A66A; animation:pulseDot 2s infinite; display:inline-block; }
        .live-dot { width:7px; height:7px; border-radius:50%; background:#ef4444; animation:pulseDot 1.5s infinite; display:inline-block; }
        @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
      `}</style>
      <div style={{position:'absolute',inset:0,opacity:0.035,backgroundImage:'linear-gradient(#C7A66A 1px,transparent 1px),linear-gradient(90deg,#C7A66A 1px,transparent 1px)',backgroundSize:'80px 80px'}}/>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 70% 60% at 65% 50%, rgba(199,166,106,0.07) 0%, transparent 60%)'}}/>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full" style={{paddingTop:72}}>
        <div className="grid lg:grid-cols-2 gap-16 items-center py-24" style={{minHeight:'100vh'}}>
          <div>
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5" style={{border:'1px solid rgba(199,166,106,0.4)',borderRadius:2,background:'rgba(199,166,106,0.06)'}}>
              <span className="pulse-dot"/>
              <span className="text-xs font-medium" style={{color:'#E5D2A4',letterSpacing:'1.5px'}}>2025 신규 기수 모집 중</span>
            </div>
            <h1 style={{fontFamily:"'Noto Serif KR',serif",fontSize:'clamp(32px,4.5vw,58px)',fontWeight:900,lineHeight:1.2,color:'#fff',letterSpacing:'-1px',marginBottom:12}}>
              배우기만 하는<br/>부동산 강의는<br/><span style={{color:'#C7A66A'}}>끝났습니다.</span>
            </h1>
            <p style={{fontFamily:"'Noto Serif KR',serif",fontSize:'clamp(17px,2vw,24px)',color:'rgba(229,210,164,0.85)',marginBottom:28,lineHeight:1.5}}>실전 투자 경험을 함께 쌓아가는<br/>부자해커스쿨</p>
            <p className="text-sm leading-8 mb-12" style={{color:'rgba(255,255,255,0.45)',maxWidth:480}}>공매·낙찰부터 NPL·토지투자까지<br/>LIVE 강의 + 교재 + 실시간 질의응답으로<br/>진짜 투자자를 만들어 드립니다.</p>
            <div className="flex flex-wrap gap-3">
              <a href="#courses" className="hero-btn-primary">모집중 강의 보기 →</a>
              <a href="#reviews" className="hero-btn-secondary">수강 후기 보기 →</a>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="hero-card">
              <div className="flex items-center gap-2 px-5 py-4" style={{background:'#0D1520',borderBottom:'1px solid rgba(199,166,106,0.1)'}}>
                {['#ef4444','#f59e0b','#22c55e'].map(c=><div key={c} style={{width:10,height:10,borderRadius:'50%',background:c}}/>)}
                <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1" style={{background:'rgba(220,38,38,0.15)',border:'1px solid rgba(220,38,38,0.3)',borderRadius:2}}>
                  <span className="live-dot"/><span className="text-xs font-bold" style={{color:'#fca5a5',letterSpacing:'1px'}}>LIVE</span>
                </div>
              </div>
              <div style={{height:180,background:'linear-gradient(135deg,#0D1520,#1a2540)',display:'flex',alignItems:'center',justifyContent:'center',padding:'0 16px'}}>
                <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:4,width:'90%',height:'85%',background:'#0a111e',borderRadius:4,border:'1px solid rgba(199,166,106,0.2)',padding:8}}>
                  {['👨‍💼','👩‍💼','👨‍💼','👩‍💼','👨‍💼','👩‍💼'].map((e,i)=>(
                    <div key={i} style={{background:'#161D2C',borderRadius:3,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,border:`1px solid ${i===0?'rgba(199,166,106,0.5)':'rgba(199,166,106,0.1)'}`}}>{e}</div>
                  ))}
                </div>
              </div>
              <div className="p-5">
                <div style={{fontFamily:"'Noto Serif KR',serif",fontSize:16,fontWeight:700,color:'#fff',marginBottom:4}}>공매·신탁공매 실전종합반</div>
                <div className="text-xs mb-4" style={{color:'rgba(255,255,255,0.4)'}}>2025년 3기 모집 · 매주 화요일 오후 7시</div>
                <div className="flex gap-2 mb-4">
                  {['LIVE 강의','교재 제공','질의응답'].map(t=>(
                    <span key={t} className="text-xs px-2.5 py-1" style={{background:'rgba(199,166,106,0.08)',border:'1px solid rgba(199,166,106,0.2)',color:'#E5D2A4',borderRadius:2}}>{t}</span>
                  ))}
                </div>
                <button style={{width:'100%',padding:'12px',background:'linear-gradient(135deg,#C7A66A,#B8945A)',color:'#101826',fontSize:13,fontWeight:700,border:'none',borderRadius:3,cursor:'pointer',letterSpacing:'1px'}}>강의 신청하기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
