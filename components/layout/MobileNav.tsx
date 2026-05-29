'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, GraduationCap, FolderOpen, MessageSquare } from 'lucide-react'

const navItems = [
  { href: '/',          label: '홈',     Icon: Home },
  { href: '/#courses',  label: '강의',   Icon: BookOpen },
  { href: '/dashboard', label: '강의실', Icon: GraduationCap },
  { href: '/dashboard#materials', label: '자료실', Icon: FolderOpen },
  { href: '/#contact',  label: '문의',   Icon: MessageSquare },
]

export default function MobileNav() {
  const pathname = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      style={{ background: 'rgba(16,24,38,0.98)', borderTop: '1px solid rgba(199,166,106,0.15)', backdropFilter: 'blur(12px)' }}>
      <div className="flex" style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
        {navItems.map(({ href, label, Icon }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href))
          return (
            <Link key={href} href={href}
              className="flex-1 flex flex-col items-center gap-1 pt-3 pb-1 no-underline transition-colors"
              style={{ color: active ? '#C7A66A' : 'rgba(255,255,255,0.4)', fontSize: 11 }}>
              <Icon size={22} />
              <span>{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
