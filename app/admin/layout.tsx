import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const navItems = [
  { href:'/admin',              label:'대시보드',     icon:'📊' },
  { href:'/admin/members',      label:'회원 관리',    icon:'👥' },
  { href:'/admin/courses',      label:'강의 관리',    icon:'📚' },
  { href:'/admin/enrollments',  label:'수강 권한',    icon:'🔑' },
  { href:'/admin/inquiries',    label:'상담 문의',    icon:'💬' },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') redirect('/dashboard')

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#080e18' }}>
      {/* 사이드바 */}
      <aside style={{ width:240, background:'var(--primary)', borderRight:'1px solid rgba(199,166,106,0.12)', display:'flex', flexDirection:'column', flexShrink:0 }}>
        <div style={{ padding:'24px 20px', borderBottom:'1px solid rgba(199,166,106,0.1)' }}>
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <div style={{ width:32,height:32,background:'linear-gradient(135deg,#C7A66A,#E5D2A4)',clipPath:'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Cormorant Garamond',serif",fontSize:13,fontWeight:600,color:'#101826' }}>부</div>
            <div>
              <div style={{ fontFamily:"'Noto Serif KR',serif",fontSize:15,fontWeight:700,color:'#fff' }}>부자해커<span style={{color:'#C7A66A'}}>스쿨</span></div>
              <div className="text-xs" style={{ color:'rgba(199,166,106,0.7)' }}>관리자</div>
            </div>
          </Link>
        </div>
        <nav style={{ flex:1, padding:'16px 12px' }}>
          {navItems.map(item => (
            <Link key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-3 rounded mb-1 no-underline text-sm transition-colors"
              style={{ color:'rgba(255,255,255,0.6)' }}
              onMouseEnter={e=>{ e.currentTarget.style.background='rgba(199,166,106,0.08)'; e.currentTarget.style.color='rgba(255,255,255,0.9)' }}
              onMouseLeave={e=>{ e.currentTarget.style.background='transparent'; e.currentTarget.style.color='rgba(255,255,255,0.6)' }}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div style={{ padding:'16px 20px', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
          <Link href="/dashboard" className="text-xs no-underline" style={{ color:'rgba(255,255,255,0.3)' }}>← 수강생 페이지로</Link>
        </div>
      </aside>
      {/* 메인 */}
      <main style={{ flex:1, overflow:'auto' }}>{children}</main>
    </div>
  )
}
