'use client'
import { useEffect, useRef, useState } from 'react'

const stats = [
  { target: 1200, label: '누적 수강생', sub: '실전 투자자를 배출했습니다', suffix: '명+' },
  { target: 48,   label: '누적 강의',   sub: '전문 분야별 과정 운영',     suffix: '개+' },
  { target: 7,    label: '운영 기간',   sub: '검증된 교육 커리큘럼',      suffix: '년'  },
  { target: 320,  label: '수강생 낙찰 총액', sub: '실전 성과로 증명합니다', suffix: '억+' },
]

function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const step = target / 60
        let cur = 0
        const timer = setInterval(() => {
          cur += step
          if (cur >= target) { cur = target; clearInterval(timer) }
          setCount(Math.floor(cur))
        }, 25)
      }
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])
  return <span ref={ref}>{count.toLocaleString()}</span>
}

export default function StatsSection() {
  return (
    <section style={{ background:'var(--primary)', borderTop:'1px solid rgba(199,166,106,0.15)', borderBottom:'1px solid rgba(199,166,106,0.15)', padding:'64px 40px' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className="text-center py-10 px-8 relative"
            style={{ borderRight: i < 3 ? '1px solid rgba(199,166,106,0.1)' : 'none' }}>
            <div style={{ position:'absolute', top:0, left:'50%', transform:'translateX(-50%)', width:40, height:2, background:'linear-gradient(90deg,transparent,#C7A66A,transparent)' }} />
            <div className="flex items-end justify-center gap-0.5 mb-2"
              style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(44px,5vw,64px)', fontWeight:600, color:'#C7A66A', lineHeight:1 }}>
              <Counter target={s.target} />
              <span style={{ fontSize:'0.35em', color:'#E5D2A4', marginBottom:'0.3em' }}>{s.suffix}</span>
            </div>
            <div className="text-xs" style={{ color:'rgba(255,255,255,0.5)', letterSpacing:'0.5px' }}>
              <div className="text-sm font-medium mb-1" style={{ color:'rgba(255,255,255,0.8)' }}>{s.label}</div>
              {s.sub}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
