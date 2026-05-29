'use client'
import { useState } from 'react'

const faqs = [
  { q:'부동산 초보도 수강이 가능한가요?', a:'네, 초보자도 충분히 수강 가능합니다. 부자해커스쿨의 모든 과정은 기초 개념부터 실전까지 단계별로 구성되어 있습니다. 사전 지식이 없어도 강의를 따라오실 수 있도록 설계되었으며, 강의 중 언제든지 질문하실 수 있습니다.' },
  { q:'강의는 어떤 방식으로 진행되나요?', a:'Zoom을 활용한 실시간 LIVE 강의로 진행됩니다. 녹화 강의가 아니기 때문에 강의 중 실시간으로 질문하고 답변을 받을 수 있습니다. 강의 후에는 회원 전용 강의실에서 자료를 다운로드하고 공지사항을 확인하실 수 있습니다.' },
  { q:'교재는 어떻게 받을 수 있나요?', a:'강의 신청 완료 후 등록하신 주소로 교재가 우편 발송됩니다. 일반적으로 강의 시작 1주일 전에 발송되며, 디지털 자료는 회원 전용 자료실에서 즉시 다운로드 가능합니다.' },
  { q:'강의 수강 신청은 어떻게 하나요?', a:'홈페이지에서 회원가입 후 원하시는 강의를 선택하여 상담 신청을 하시면 됩니다. 상담 후 수강료 납입 및 등록이 완료되면 관리자가 강의실 접근 권한을 부여해 드립니다. 카카오톡 상담도 가능합니다.' },
  { q:'강의를 못 들었을 경우 어떻게 하나요?', a:'부득이한 사정으로 강의를 출석하지 못하셨을 경우 담당자에게 문의해 주세요. 녹화본 제공 여부는 강의별로 상이하므로 사전에 확인이 필요합니다. 자료실의 강의 자료는 언제든지 열람 가능합니다.' },
  { q:'환불 정책이 궁금합니다.', a:'강의 시작 전 7일까지는 전액 환불이 가능합니다. 강의 시작 후에는 소비자보호법에 따라 수강 횟수에 비례하여 환불 처리됩니다. 자세한 환불 정책은 이용약관을 참고하시거나 고객센터로 문의해 주세요.' },
]

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" style={{ padding:'120px 40px', background:'var(--primary)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="block text-xs font-medium mb-3" style={{ color:'#C7A66A', letterSpacing:'3px' }}>FAQ</span>
          <h2 style={{ fontFamily:"'Noto Serif KR',serif", fontSize:'clamp(28px,3.5vw,42px)', fontWeight:900, letterSpacing:'-1px', color:'#fff' }}>
            자주 묻는 질문
          </h2>
        </div>
        <div className="max-w-3xl mx-auto rounded-md overflow-hidden"
          style={{ border:'1px solid rgba(199,166,106,0.15)' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: i < faqs.length-1 ? '1px solid rgba(199,166,106,0.1)' : 'none' }}>
              <button
                className="w-full flex items-center justify-between gap-5 text-left transition-colors"
                style={{ padding:'22px 28px', background: open===i ? 'rgba(199,166,106,0.04)' : 'transparent', border:'none', cursor:'pointer' }}
                onClick={() => setOpen(open === i ? null : i)}>
                <span className="text-base font-medium" style={{ color:'rgba(255,255,255,0.85)', letterSpacing:'-0.2px' }}>{faq.q}</span>
                <span style={{ width:28,height:28,flexShrink:0,border:'1px solid rgba(199,166,106,0.3)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#C7A66A',fontSize:20,transition:'transform 0.3s',transform:open===i?'rotate(45deg)':'none',background:open===i?'rgba(199,166,106,0.1)':'transparent' }}>+</span>
              </button>
              <div style={{ maxHeight: open===i ? 300 : 0, overflow:'hidden', transition:'max-height 0.35s ease', padding: open===i ? '0 28px 24px' : '0 28px' }}>
                <p className="text-sm leading-7" style={{ color:'rgba(255,255,255,0.45)' }}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
