import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '부자해커스쿨 | 실전 부동산 투자 교육 플랫폼',
  description: '공매·NPL·토지투자·아파트경매 실전 LIVE 강의. 배우기만 하는 부동산 강의는 끝났습니다.',
  keywords: '부동산 강의, 공매, NPL, 토지투자, 아파트경매, 실전투자, 부자해커스쿨',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600;700;900&family=Noto+Sans+KR:wght@300;400;500;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
