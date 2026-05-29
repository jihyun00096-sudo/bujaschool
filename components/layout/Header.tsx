'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { Profile } from '@/types'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
        if (data) setProfile(data)
      }
    })
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-shadow duration-300"
      style={{
        background: 'rgba(16,24,38,0.97)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(199,166,106,0.2)',
        boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div
            className="w-9 h-9 flex items-center justify-center text-base font-semibold"
            style={{
              background: 'linear-gradient(135deg, #C7A66A, #E5D2A4)',
              clipPath: 'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)',
              color: '#101826',
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >부</div>
          <span style={{ fontFamily: "'Noto Serif KR', serif", fontSize: 18, fontWeight: 700, color: '#fff' }}>
            부자해커<span style={{ color: '#C7A66A' }}>스쿨</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-9">
          {[['#courses','강의목록'],['#instructors','강사진'],['#reviews','수강후기'],['#system','회원강의실'],['#faq','FAQ'],['#contact','문의하기']].map(([href, label]) => (
            <a key={href} href={href}
              className="text-sm transition-colors duration-200 relative group"
              style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#E5D2A4')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
            >{label}</a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {profile ? (
            <>
              <Link href={profile.role === 'admin' ? '/admin' : '/dashboard'}
                className="px-5 py-2 text-sm font-medium transition-all duration-200"
                style={{ color: '#C7A66A', border: '1px solid rgba(199,166,106,0.3)', borderRadius: 2, textDecoration: 'none' }}>
                {profile.role === 'admin' ? '관리자' : '내 강의실'}
              </Link>
              <button onClick={handleLogout}
                className="px-5 py-2 text-sm transition-all duration-200"
                style={{ color: 'rgba(255,255,255,0.6)', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 2, cursor: 'pointer' }}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link href="/login"
                className="px-5 py-2 text-sm transition-all duration-200"
                style={{ color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(199,166,106,0.2)', borderRadius: 2, textDecoration: 'none', background: 'transparent' }}>
                로그인
              </Link>
              <Link href="/register"
                className="px-5 py-2 text-sm font-bold transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, #C7A66A, #B8945A)', color: '#101826', borderRadius: 2, textDecoration: 'none', letterSpacing: '0.5px' }}>
                무료 회원가입
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff' }}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{ background: '#0d1520', borderTop: '1px solid rgba(199,166,106,0.15)', padding: '20px 24px 28px' }}>
          {[['#courses','강의목록'],['#instructors','강사진'],['#reviews','수강후기'],['#faq','FAQ'],['#contact','문의하기']].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMobileOpen(false)}
              className="block py-3.5 text-base border-b"
              style={{ color: 'rgba(255,255,255,0.75)', borderColor: 'rgba(255,255,255,0.06)', textDecoration: 'none' }}>
              {label}
            </a>
          ))}
          <div className="flex gap-3 mt-6">
            {profile ? (
              <Link href="/dashboard" onClick={() => setMobileOpen(false)}
                className="flex-1 py-3 text-center text-sm font-bold"
                style={{ background: 'linear-gradient(135deg,#C7A66A,#B8945A)', color: '#101826', borderRadius: 3, textDecoration: 'none' }}>
                내 강의실
              </Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)}
                  className="flex-1 py-3 text-center text-sm"
                  style={{ border: '1px solid rgba(199,166,106,0.3)', color: '#C7A66A', borderRadius: 3, textDecoration: 'none' }}>
                  로그인
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)}
                  className="flex-1 py-3 text-center text-sm font-bold"
                  style={{ background: 'linear-gradient(135deg,#C7A66A,#B8945A)', color: '#101826', borderRadius: 3, textDecoration: 'none' }}>
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
