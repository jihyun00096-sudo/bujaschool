import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileNav from '@/components/layout/MobileNav'
import HeroSection from '@/components/home/HeroSection'
import StatsSection from '@/components/home/StatsSection'
import CoursesSection from '@/components/home/CoursesSection'
import WhySection from '@/components/home/WhySection'
import InstructorsSection from '@/components/home/InstructorsSection'
import ReviewsSection from '@/components/home/ReviewsSection'
import SystemSection from '@/components/home/SystemSection'
import FaqSection from '@/components/home/FaqSection'
import ContactSection from '@/components/home/ContactSection'
import { createClient } from '@/lib/supabase/server'
import type { Course } from '@/types'

export default async function HomePage() {
  const supabase = await createClient()
  let courses: Course[] = []
  try {
    const { data } = await supabase
      .from('courses')
      .select('*')
      .eq('is_published', true)
      .order('order_index')
    courses = data ?? []
  } catch {}

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <CoursesSection courses={courses} />
        <WhySection />
        <InstructorsSection />
        <ReviewsSection />
        <SystemSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <MobileNav />
    </>
  )
}
