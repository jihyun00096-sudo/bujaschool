'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email:'', password:'' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    setLoading(true); setError('')
    const supabase = createClient()
    const { data, error: err } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password })
    if (err) { setError('이메일 또는 비밀번호가 올바르지 않습니다.'); setLoading(false); return }
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', data.user.id).single()
    router.push(profile?.role === 'admin' ? '/admin' : '/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background:'var(--primary)' }}>
      <div style={{ width:'100%', maxWidth:440 }}>
        <Link href="/" className="flex items-center gap-2.5 justify-center mb-10 no-underline">
          <div style={{ width:36,height:36,background:'linear-gradient(135deg,#C7A66A,#E5D2A4)',clipPath:'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontWeight:600,color:'#101826' }}>부</div>
          <span style={{ fontFamily:"'Noto Serif KR',serif",fontSize:20,fontWeight:700,color:'#fff' }}>부자해커<span style={{color:'#C7A66A'}}>스쿨</span></span>
        </Link>
        <div style={{ background:'var(--card)', border:'1px solid rgba(199,166,106,0.15)', borderRadius:8, padding:'40px 36px' }}>
          <h1 style={{ fontFamily:"'Noto Serif KR',serif", fontSize:24, fontWeight:700, color:'#fff', marginBottom:6, letterSpacing:'-0.5px' }}>로그인</h1>
          <p className="text-sm mb-8" style={{ color:'rgba(255,255,255,0.4)' }}>회원 전용 강의실에 접속합니다</p>
          {error && <div className="text-sm mb-5 px-4 py-3 rounded" style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)', color:'#fca5a5' }}>{error}</div>}
          {[{label:'이메일',key:'email',type:'email',placeholder:'example@email.com'},{label:'비밀번호',key:'password',type:'password',placeholder:'비밀번호 입력'}].map(f=>(
            <div key={f.key} style={{ marginBottom:16 }}>
              <label className="block text-xs mb-2" style={{ color:'rgba(255,255,255,0.5)', letterSpacing:'0.3px' }}>{f.label}</label>
              <input type={f.type} placeholder={f.placeholder}
                value={form[f.key as keyof typeof form]}
                onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                onKeyDown={e=>e.key==='Enter'&&handleLogin()}
                style={{ width:'100%',padding:'13px 16px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(199,166,106,0.15)',borderRadius:3,color:'#fff',fontSize:14,fontFamily:'inherit',outline:'none' }}
                onFocus={e=>(e.target.style.borderColor='rgba(199,166,106,0.5)')}
                onBlur={e=>(e.target.style.borderColor='rgba(199,166,106,0.15)')} />
            </div>
          ))}
          <button onClick={handleLogin} disabled={loading}
            style={{ width:'100%',padding:'14px',background:'linear-gradient(135deg,#C7A66A,#B8945A)',color:'#101826',fontSize:15,fontWeight:700,fontFamily:'inherit',border:'none',borderRadius:3,cursor:'pointer',letterSpacing:'0.5px',marginTop:8,opacity:loading?0.7:1 }}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
          <div className="text-center mt-6 text-sm" style={{ color:'rgba(255,255,255,0.4)' }}>
            아직 회원이 아니신가요?{' '}
            <Link href="/register" className="font-medium no-underline" style={{ color:'#C7A66A' }}>회원가입</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
