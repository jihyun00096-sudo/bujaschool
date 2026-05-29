import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { formatDate, formatDateTime, isZoomVisible } from '@/lib/utils'
import type { CourseWeek, Material, Notice } from '@/types'

export default async function ClassroomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // 수강 권한 확인
  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('*, course:courses(*)')
    .eq('user_id', user.id).eq('course_id', id).eq('status', 'active').single()
  if (!enrollment) notFound()

  const course = (enrollment as {course: {title: string; schedule: string}}).course

  // 주차 목록
  const { data: weeks } = await supabase
    .from('course_weeks').select('*').eq('course_id', id).order('week_number')

  // 자료
  const { data: materials } = await supabase
    .from('materials').select('*').eq('course_id', id).order('created_at', { ascending: false })

  // 공지
  const { data: notices } = await supabase
    .from('notices').select('*').eq('course_id', id).order('is_pinned', { ascending: false }).order('created_at', { ascending: false }).limit(5)

  const today = new Date()
  const nextWeek = (weeks ?? []).find((w: CourseWeek) => w.class_date && new Date(w.class_date) >= today)
  const currentWeek = (weeks ?? []).find((w: CourseWeek) =>
    w.class_date && new Date(w.class_date).toDateString() === today.toDateString()
  ) ?? nextWeek

  return (
    <div style={{ minHeight:'100vh', background:'var(--primary)' }}>
      <header style={{ background:'rgba(16,24,38,0.97)', borderBottom:'1px solid rgba(199,166,106,0.15)', height:64, display:'flex', alignItems:'center', padding:'0 32px', position:'sticky', top:0, zIndex:50 }}>
        <Link href="/dashboard" className="flex items-center gap-2 no-underline text-sm" style={{ color:'rgba(255,255,255,0.5)' }}>
          ← 내 강의실
        </Link>
        <div className="mx-4" style={{ width:1, height:16, background:'rgba(255,255,255,0.1)' }} />
        <span style={{ fontFamily:"'Noto Serif KR',serif", fontSize:15, fontWeight:600, color:'rgba(255,255,255,0.85)' }}>
          {course.title}
        </span>
      </header>

      <div className="max-w-4xl mx-auto px-5 py-10">
        {/* 다음 LIVE 강의 */}
        <div className="mb-8 rounded-lg p-6" style={{ background:'var(--card)', border:'1px solid rgba(199,166,106,0.15)' }}>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <span className="block text-xs mb-2" style={{ color:'#C7A66A', letterSpacing:'1.5px' }}>다음 LIVE 강의</span>
              <div style={{ fontFamily:"'Noto Serif KR',serif", fontSize:20, fontWeight:700, color:'#fff', marginBottom:4 }}>
                {currentWeek
                  ? `${currentWeek.week_number}주차: ${currentWeek.title}`
                  : '강의 일정을 확인하세요'}
              </div>
              <div className="text-sm" style={{ color:'rgba(255,255,255,0.4)' }}>
                {currentWeek?.class_date ? formatDateTime(currentWeek.class_date) : course.schedule}
              </div>
            </div>
            {currentWeek && isZoomVisible(currentWeek) ? (
              <a href={currentWeek.zoom_link!} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 no-underline font-bold text-sm"
                style={{ padding:'14px 24px', background:'linear-gradient(135deg,#C7A66A,#B8945A)', color:'#101826', borderRadius:3, letterSpacing:'0.5px', whiteSpace:'nowrap' }}>
                📹 Zoom 입장
              </a>
            ) : (
              <div className="flex items-center gap-2 text-sm px-6 py-3.5"
                style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:3, color:'rgba(255,255,255,0.3)' }}>
                강의 2시간 전 공개
              </div>
            )}
          </div>
        </div>

        {/* 공지사항 */}
        {notices && notices.length > 0 && (
          <div className="mb-8">
            <h2 style={{ fontFamily:"'Noto Serif KR',serif", fontSize:18, fontWeight:700, color:'#fff', marginBottom:14 }}>📢 공지사항</h2>
            <div className="flex flex-col gap-2">
              {(notices as Notice[]).map(n => (
                <div key={n.id} className="flex items-center gap-3 px-4 py-3 rounded"
                  style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)' }}>
                  {n.is_pinned && <span className="text-xs px-2 py-0.5" style={{ background:'rgba(199,166,106,0.15)', color:'#C7A66A', border:'1px solid rgba(199,166,106,0.2)', borderRadius:2, flexShrink:0 }}>공지</span>}
                  <span className="text-sm flex-1" style={{ color:'rgba(255,255,255,0.75)' }}>{n.title}</span>
                  <span className="text-xs" style={{ color:'rgba(255,255,255,0.3)', flexShrink:0 }}>{formatDate(n.created_at)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 주차별 안내 */}
        <div className="mb-8">
          <h2 style={{ fontFamily:"'Noto Serif KR',serif", fontSize:18, fontWeight:700, color:'#fff', marginBottom:14 }}>📅 주차별 커리큘럼</h2>
          <div className="flex flex-col gap-2">
            {(weeks ?? []).map((w: CourseWeek) => {
              const isToday = w.class_date && new Date(w.class_date).toDateString() === today.toDateString()
              const isPast = w.is_completed || (w.class_date && new Date(w.class_date) < today)
              const zoomVisible = isZoomVisible(w)
              return (
                <div key={w.id}
                  className="flex items-center gap-4 px-4 py-4 rounded"
                  style={{ background: isToday ? 'rgba(199,166,106,0.05)' : 'rgba(255,255,255,0.02)', border:`1px solid ${isToday?'rgba(199,166,106,0.25)':'rgba(255,255,255,0.05)'}` }}>
                  <div style={{ width:32,height:32,background:isToday?'rgba(199,166,106,0.2)':'rgba(199,166,106,0.08)',borderRadius:2,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700,color:'#C7A66A',flexShrink:0 }}>
                    {w.week_number}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium" style={{ color: isPast ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.85)' }}>{w.title}</div>
                    {w.class_date && <div className="text-xs mt-0.5" style={{ color:'rgba(255,255,255,0.3)' }}>{formatDateTime(w.class_date)}</div>}
                  </div>
                  <div className="flex items-center gap-2">
                    {zoomVisible && (
                      <a href={w.zoom_link!} target="_blank" rel="noopener noreferrer"
                        className="text-xs px-3 py-1.5 no-underline font-bold"
                        style={{ background:'linear-gradient(135deg,#C7A66A,#B8945A)', color:'#101826', borderRadius:2 }}>
                        Zoom →
                      </a>
                    )}
                    <span className="text-xs px-2 py-1"
                      style={{ background: isPast?'rgba(34,197,94,0.12)':isToday?'rgba(199,166,106,0.12)':'rgba(255,255,255,0.04)', color: isPast?'#86efac':isToday?'#E5D2A4':'rgba(255,255,255,0.3)', border:`1px solid ${isPast?'rgba(34,197,94,0.2)':isToday?'rgba(199,166,106,0.25)':'rgba(255,255,255,0.06)'}`, borderRadius:2 }}>
                      {isPast ? '완료' : isToday ? '오늘' : '예정'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 자료실 */}
        <div>
          <h2 style={{ fontFamily:"'Noto Serif KR',serif", fontSize:18, fontWeight:700, color:'#fff', marginBottom:14 }}>📁 자료실</h2>
          {!materials || materials.length === 0 ? (
            <div className="text-center py-10 text-sm" style={{ color:'rgba(255,255,255,0.3)', background:'rgba(255,255,255,0.02)', borderRadius:6, border:'1px solid rgba(255,255,255,0.05)' }}>
              등록된 자료가 없습니다.
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {(materials as Material[]).map(m => (
                <a key={m.id} href={m.file_url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 px-4 py-3.5 rounded no-underline transition-colors"
                  style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)' }}
                  onMouseEnter={e=>(e.currentTarget.style.borderColor='rgba(199,166,106,0.2)')}
                  onMouseLeave={e=>(e.currentTarget.style.borderColor='rgba(255,255,255,0.06)')}>
                  <span style={{ fontSize:22 }}>{m.file_type==='pdf'?'📄':m.file_type==='video'?'🎬':'📎'}</span>
                  <span className="flex-1 text-sm" style={{ color:'rgba(255,255,255,0.8)' }}>{m.title}</span>
                  <span className="text-xs" style={{ color:'rgba(255,255,255,0.3)' }}>다운로드 →</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
