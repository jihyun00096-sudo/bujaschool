import type { Course } from '@/types'
import { COURSE_STATUS_LABEL } from '@/lib/utils'

const COURSE_ICONS: Record<string, string> = {
  '공매·경매':'🏛️','NPL':'💹','토지투자':'🗺️','아파트경매':'🏢'
}
const bgColors = [
  'linear-gradient(135deg,#101826,#1a2d4a)',
  'linear-gradient(135deg,#1a1a0a,#2d2a0f)',
  'linear-gradient(135deg,#0f1a10,#1a2d1b)',
  'linear-gradient(135deg,#1a0f10,#2d1a1b)',
]

export default function CoursesSection({ courses }: { courses: Course[] }) {
  const displayCourses = courses.length > 0 ? courses : [
    {id:'1',title:'공매·신탁공매 실전종합반',category:'공매·경매',description:'온비드 공매와 신탁공매의 모든 것을 실전 위주로 배웁니다.',schedule:'매주 화요일 오후 7:00',duration_weeks:12,status:'active',is_published:true,order_index:1,created_at:'',updated_at:'',detail_description:null},
    {id:'2',title:'NPL 종합투자반',category:'NPL',description:'부실채권(NPL) 투자의 구조와 수익 실현 방법을 단계별로 학습.',schedule:'매주 목요일 오후 7:00',duration_weeks:8,status:'active',is_published:true,order_index:2,created_at:'',updated_at:'',detail_description:null},
    {id:'3',title:'토지 실전종합투자반',category:'토지투자',description:'토지 투자의 기본부터 개발 가능 토지 발굴, 수익 실현까지.',schedule:'매주 수요일 오후 7:00',duration_weeks:10,status:'active',is_published:true,order_index:3,created_at:'',updated_at:'',detail_description:null},
    {id:'4',title:'아파트 집중낙찰반',category:'아파트경매',description:'아파트 경매의 모든 실전 노하우를 압축. 낙찰가 분석, 명도, 시세 차익 실현까지.',schedule:'일정 협의 후 공지',duration_weeks:8,status:'upcoming',is_published:true,order_index:4,created_at:'',updated_at:'',detail_description:null},
  ] as Course[]

  return (
    <section id="courses" style={{padding:'120px 40px',background:'var(--bg)'}}>
      <style>{`
        .course-card{background:#fff;border:1px solid rgba(30,30,30,0.08);border-radius:6px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.05);cursor:pointer;transition:transform 0.3s,box-shadow 0.3s,border-color 0.3s}
        .course-card:hover{transform:translateY(-6px);box-shadow:0 20px 48px rgba(0,0,0,0.12);border-color:rgba(199,166,106,0.3)}
        .course-btn{padding:10px 22px;background:var(--primary);color:#E5D2A4;font-size:13px;font-weight:600;letter-spacing:0.5px;border:none;border-radius:2px;cursor:pointer;transition:transform 0.2s}
        .course-btn:hover{transform:translateX(3px)}
        .view-all-link{color:#C7A66A;font-size:14px;font-weight:500;text-decoration:none;border-bottom:1px solid rgba(199,166,106,0.3);padding-bottom:4px;white-space:nowrap;transition:letter-spacing 0.2s}
        .view-all-link:hover{letter-spacing:0.5px}
      `}</style>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <span className="block text-xs font-medium mb-3" style={{color:'#C7A66A',letterSpacing:'3px'}}>COURSES</span>
            <h2 style={{fontFamily:"'Noto Serif KR',serif",fontSize:'clamp(28px,3.5vw,42px)',fontWeight:900,letterSpacing:'-1px',color:'var(--primary)',lineHeight:1.25}}>
              현재 <span style={{color:'#C7A66A'}}>모집 중</span>인<br/>강의 과정
            </h2>
          </div>
          <a href="#" className="view-all-link">전체 강의 보기 →</a>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {displayCourses.map((course, i) => (
            <div key={course.id} className="course-card">
              <div style={{height:180,background:bgColors[i%bgColors.length],position:'relative',overflow:'hidden'}}>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="text-xs font-bold px-3 py-1" style={{background:course.status==='active'?'rgba(199,166,106,0.9)':'rgba(255,255,255,0.15)',color:course.status==='active'?'#101826':'rgba(255,255,255,0.8)',border:course.status==='active'?'none':'1px solid rgba(255,255,255,0.2)',borderRadius:2,letterSpacing:'1px'}}>
                    {COURSE_STATUS_LABEL[course.status]}
                  </span>
                  <span className="text-xs px-2.5 py-1" style={{background:'rgba(0,0,0,0.3)',color:'rgba(255,255,255,0.6)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:2}}>{course.category}</span>
                </div>
                <div style={{position:'absolute',bottom:-10,right:20,fontSize:64,opacity:0.2}}>{COURSE_ICONS[course.category]??'📚'}</div>
                <div style={{position:'absolute',bottom:16,left:20,fontFamily:"'Cormorant Garamond',serif",fontSize:80,fontWeight:600,lineHeight:1,color:'#C7A66A',opacity:0.15,letterSpacing:'-3px'}}>{String(i+1).padStart(2,'0')}</div>
              </div>
              <div style={{padding:'24px 28px'}}>
                <span className="block text-xs font-medium mb-2" style={{color:'#C7A66A',letterSpacing:'2px'}}>{course.category.toUpperCase()}</span>
                <h3 style={{fontFamily:"'Noto Serif KR',serif",fontSize:20,fontWeight:700,color:'var(--primary)',letterSpacing:'-0.5px',marginBottom:8,lineHeight:1.4}}>{course.title}</h3>
                <p className="text-sm leading-7 mb-5" style={{color:'#6B6458'}}>{course.description}</p>
                <div className="flex flex-wrap gap-5 mb-5 text-sm" style={{color:'#6B6458'}}>
                  <span>📅 {course.schedule}</span>
                  <span>📚 총 {course.duration_weeks}주</span>
                </div>
                <div className="flex items-center justify-between pt-5" style={{borderTop:'1px solid rgba(30,30,30,0.08)'}}>
                  <div style={{fontFamily:"'Noto Serif KR',serif",fontSize:17,fontWeight:700,color:'var(--primary)'}}>{course.status==='upcoming'?'사전 신청 접수 중':'상담 후 결정'}</div>
                  <button className="course-btn">{course.status==='upcoming'?'사전 신청 →':'강의 신청 →'}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
