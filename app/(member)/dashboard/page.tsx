import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import type { Enrollment, CourseWeek } from '@/types'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('*, course:courses(*)')
    .eq('user_id', user.id)
    .eq('status', 'active')

  return (
    <div style={{ minHeight:'100vh', background:'var(--primary)' }}>
      {/* 상단바 */}
      <header style={{ background:'rgba(16,24,38,0.97)', borderBottom:'1px solid rgba(199,166,106,0.15)', height:64, display:'flex', alignItems:'center', padding:'0 32px' }}>
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div style={{ width:32,height:32,background:'linear-gradient(135deg,#C7A66A,#E5D2A4)',clipPath:'polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Cormorant Garamond',serif",fontSize:13,fontWeight:600,color:'#101826' }}>부</div>
          <span style={{ fontFamily:"'Noto Serif KR',serif",fontSize:17,fontWeight:700,color:'#fff' }}>부자해커<span style={{color:'#C7A66A'}}>스쿨</span></span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <span className="text-sm" style={{ color:'rgba(255,255,255,0.5)' }}>{profile?.full_name} 님</span>
          <form action="/api/auth/signout" method="post">
            <button className="text-xs px-3 py-1.5" style={{ background:'none',border:'1px solid rgba(255,255,255,0.15)',color:'rgba(255,255,255,0.5)',borderRadius:2,cursor:'pointer' }}>로그아웃</button>
          </form>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* 환영 */}
        <div className="mb-10">
          <h1 style={{ fontFamily:"'Noto Serif KR',serif", fontSize:28, fontWeight:900, color:'#fff', letterSpacing:'-0.5px', marginBottom:6 }}>
            안녕하세요, <span style={{color:'#C7A66A'}}>{profile?.full_name}</span> 님
          </h1>
          <p className="text-sm" style={{ color:'rgba(255,255,255,0.45)' }}>수강 중인 강의를 선택해 강의실에 입장하세요.</p>
        </div>

        {/* 강의 카드 목록 */}
        {!enrollments || enrollments.length === 0 ? (
          <div className="text-center py-24" style={{ border:'1px solid rgba(199,166,106,0.1)', borderRadius:8, background:'rgba(255,255,255,0.02)' }}>
            <div className="text-4xl mb-4">📚</div>
            <div style={{ fontFamily:"'Noto Serif KR',serif", fontSize:20, fontWeight:700, color:'#fff', marginBottom:8 }}>수강 중인 강의가 없습니다</div>
            <p className="text-sm mb-8" style={{ color:'rgba(255,255,255,0.4)' }}>관리자의 권한 부여 후 강의실에 접근 가능합니다.</p>
            <Link href="/#courses" className="inline-block px-8 py-3 font-bold text-sm no-underline"
              style={{ background:'linear-gradient(135deg,#C7A66A,#B8945A)', color:'#101826', borderRadius:2 }}>
              강의 신청하기
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {enrollments.map((enr: Enrollment) => (
              <div key={enr.id} style={{ background:'var(--card)', border:'1px solid rgba(199,166,106,0.15)', borderRadius:8, overflow:'hidden' }}>
                <div style={{ height:80, background:'linear-gradient(135deg,#101826,#1a2d4a)', display:'flex', alignItems:'center', padding:'0 24px', position:'relative' }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", position:'absolute', right:20, fontSize:72, fontWeight:600, color:'rgba(199,166,106,0.1)', lineHeight:1 }}>
                    {String((enr as {course?:{order_index?:number}}).course?.order_index??1).padStart(2,'0')}
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1" style={{ background:'rgba(199,166,106,0.9)', color:'#101826', borderRadius:2, letterSpacing:'1px', position:'relative', zIndex:1 }}>수강 중</span>
                </div>
                <div style={{ padding:'20px 24px' }}>
                  <div style={{ fontFamily:"'Noto Serif KR',serif", fontSize:17, fontWeight:700, color:'#fff', marginBottom:4, letterSpacing:'-0.3px' }}>
                    {(enr as {course?:{title?:string}}).course?.title}
                  </div>
                  <div className="text-xs mb-5" style={{ color:'rgba(255,255,255,0.4)' }}>
                    {enr.end_date ? `수강 종료: ${formatDate(enr.end_date)}` : '수강 기간 무제한'}
                  </div>
                  <Link href={`/classroom/${enr.course_id}`} className="w-full block text-center py-3 font-bold text-sm no-underline"
                    style={{ background:'linear-gradient(135deg,#C7A66A,#B8945A)', color:'#101826', borderRadius:3, letterSpacing:'0.5px' }}>
                    강의실 입장 →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
