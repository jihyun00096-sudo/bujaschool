import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#080e18', borderTop: '1px solid rgba(199,166,106,0.1)', padding: '60px 40px 32px' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div style={{ width:36,height:36,background:'linear-gradient(135deg,#C7A66A,#E5D2A4)',clipPath:'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontWeight:600,color:'#101826' }}>부</div>
              <span style={{ fontFamily:"'Noto Serif KR',serif",fontSize:20,fontWeight:700,color:'#fff' }}>부자해커<span style={{color:'#C7A66A'}}>스쿨</span></span>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.35)', maxWidth: 260 }}>
              실전 투자 경험을 함께 쌓아가는<br />부동산 교육 플랫폼
            </p>
            <div className="text-xs leading-7" style={{ color: 'rgba(255,255,255,0.25)' }}>
              <div>상호명: 부자해커스쿨</div>
              <div>사업자등록번호: 000-00-00000</div>
              <div>대표자: 이○○</div>
              <div>이메일: info@bujahacker.kr</div>
            </div>
          </div>
          {[
            { title: '강의', links: [['#','공매·신탁공매 실전종합반'],['#','NPL 종합투자반'],['#','토지 실전종합투자반'],['#','아파트 집중낙찰반']] },
            { title: '안내', links: [['#','회사소개'],['#','강사진'],['#','수강후기'],['#','FAQ'],['#','문의하기']] },
            { title: '회원', links: [['/login','로그인'],['/register','회원가입'],['/dashboard','내 강의실'],['/dashboard','마이페이지']] },
          ].map(col => (
            <div key={col.title}>
              <div className="text-sm font-semibold mb-5" style={{ color: 'rgba(255,255,255,0.7)', letterSpacing: '0.5px' }}>{col.title}</div>
              <div className="flex flex-col gap-3">
                {col.links.map(([href, label]) => (
                  <Link key={label} href={href} className="text-sm transition-colors duration-200 no-underline"
                    style={{ color: 'rgba(255,255,255,0.35)' }}
                    onMouseEnter={e=>(e.currentTarget.style.color='#E5D2A4')}
                    onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.35)')}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-7">
          <div className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>© 2025 부자해커스쿨. All rights reserved.</div>
          <div className="flex gap-6">
            {[['#','개인정보처리방침'],['#','이용약관'],['#','사업자정보확인']].map(([href,label]) => (
              <Link key={label} href={href} className="text-xs no-underline transition-colors"
                style={{ color: 'rgba(255,255,255,0.2)' }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
