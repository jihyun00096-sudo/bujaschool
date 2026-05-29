'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name:'', email:'', phone:'', password:'', confirm:'' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) return setError('필수 항목을 입력해 주세요.')
    if (form.password !== form.confirm) return setError('비밀번호가 일치하지 않습니다.')
    if (form.password.length < 6) return setError('비밀번호는 6자 이상이어야 합니다.')
    setLoading(true); setError('')
    const supabase = createClient()
    const { error: err } = await supabase.auth.signUp({
      email: form.email, password: form.password,
      options: { data: { full_name: form.name } }
    })
    if (err) { setError(err.message); setLoading(false); return }
    if (form.phone) {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) await supabase.from('profiles').update({ phone: form.phone }).eq('id', user.id)
    }
    router.push('/dashboard')
  }

  const fields = [
    { label:'이름 *', key:'name', type:'text', placeholder:'이름 입력' },
    { label:'이메일 *', key:'email', type:'email', placeholder:'example@email.com' },
    { label:'연락처', key:'phone', type:'tel', placeholder:'010-0000-0000' },
    { label:'비밀번호 *', key:'password', type:'password', placeholder:'6자 이상' },
    { label:'비밀번호 확인 *', key:'confirm', type:'password', placeholder:'비밀번호 재입력' },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16" style={{ background:'var(--primary)' }}>
      <div style={{ width:'100%', maxWidth:480 }}>
        <Link href="/" className="flex items-center gap-2.5 justify-center mb-10 no-underline">
          <div style={{ width:36,height:36,background:'linear-gradient(135deg,#C7A66A,#E5D2A4)',clipPath:'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontWeight:600,color:'#101826' }}>부</div>
          <span style={{ fontFamily:"'Noto Serif KR',serif",fontSize:20,fontWeight:700,color:'#fff' }}>부자해커<span style={{color:'#C7A66A'}}>스쿨</span></span>
        </Link>
        <div style={{ background:'var(--card)', border:'1px solid rgba(199,166,106,0.15)', borderRadius:8, padding:'40px 36px' }}>
          <h1 style={{ fontFamily:"'Noto Serif KR',serif", fontSize:24, fontWeight:700, color:'#fff', marginBottom:6 }}>회원가입</h1>
          <p className="text-sm mb-8" style={{ color:'rgba(255,255,255,0.4)' }}>부자해커스쿨 회원이 되세요</p>
          {error && <div className="text-sm mb-5 px-4 py-3 rounded" style={{ background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)', color:'#fca5a5' }}>{error}</div>}
          {fields.map(f=>(
            <div key={f.key} style={{ marginBottom:16 }}>
              <label className="block text-xs mb-2" style={{ color:'rgba(255,255,255,0.5)', letterSpacing:'0.3px' }}>{f.label}</label>
              <input type={f.type} placeholder={f.placeholder}
                value={form[f.key as keyof typeof form]}
                onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                style={{ width:'100%',padding:'13px 16px',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(199,166,106,0.15)',borderRadius:3,color:'#fff',fontSize:14,fontFamily:'inherit',outline:'none' }}
                onFocus={e=>(e.target.style.borderColor='rgba(199,166,106,0.5)')}
                onBlur={e=>(e.target.style.borderColor='rgba(199,166,106,0.15)')} />
            </div>
          ))}
          <button onClick={handleRegister} disabled={loading}
            style={{ width:'100%',padding:'14px',background:'linear-gradient(135deg,#C7A66A,#B8945A)',color:'#101826',fontSize:15,fontWeight:700,fontFamily:'inherit',border:'none',borderRadius:3,cursor:'pointer',letterSpacing:'0.5px',marginTop:8,opacity:loading?0.7:1 }}>
            {loading ? '가입 중...' : '회원가입'}
          </button>
          <p className="text-xs mt-5 text-center" style={{ color:'rgba(255,255,255,0.3)' }}>
            가입 시 <Link href="#" className="no-underline" style={{color:'rgba(199,166,106,0.7)'}}>이용약관</Link> 및 <Link href="#" className="no-underline" style={{color:'rgba(199,166,106,0.7)'}}>개인정보처리방침</Link>에 동의하는 것으로 간주됩니다.
          </p>
          <div className="text-center mt-4 text-sm" style={{ color:'rgba(255,255,255,0.4)' }}>
            이미 회원이신가요?{' '}
            <Link href="/login" className="font-medium no-underline" style={{ color:'#C7A66A' }}>로그인</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
