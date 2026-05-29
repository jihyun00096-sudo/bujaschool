export type UserRole = 'student' | 'admin'

export interface Profile {
  id: string
  email: string
  full_name: string
  phone: string | null
  role: UserRole
  memo: string | null
  created_at: string
  updated_at: string
}

export type CourseStatus = 'active' | 'closed' | 'upcoming'
export type EnrollmentStatus = 'active' | 'expired' | 'pending'

export interface Course {
  id: string
  title: string
  category: string
  description: string
  detail_description: string | null
  schedule: string
  duration_weeks: number
  status: CourseStatus
  is_published: boolean
  order_index: number
  created_at: string
  updated_at: string
}

export interface Enrollment {
  id: string
  user_id: string
  course_id: string
  status: EnrollmentStatus
  start_date: string | null
  end_date: string | null
  granted_by: string | null
  granted_at: string | null
  created_at: string
  profile?: Profile
  course?: Course
}

export interface CourseWeek {
  id: string
  course_id: string
  week_number: number
  title: string
  description: string | null
  zoom_link: string | null
  zoom_visible_from: string | null
  zoom_hidden_after: string | null
  class_date: string | null
  is_completed: boolean
  created_at: string
  materials?: Material[]
}

export interface Material {
  id: string
  course_id: string
  week_id: string | null
  title: string
  file_url: string
  file_type: string
  file_size: number | null
  is_public: boolean
  created_at: string
}

export interface Notice {
  id: string
  course_id: string | null
  title: string
  content: string
  is_pinned: boolean
  created_by: string
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  user_id: string
  course_id: string
  rating: number
  content: string
  review_type: string
  is_approved: boolean
  is_featured: boolean
  created_at: string
  profile?: Profile
  course?: Course
}

export interface Inquiry {
  id: string
  name: string
  phone: string
  course_interest: string | null
  message: string
  status: 'pending' | 'in_progress' | 'resolved'
  admin_memo: string | null
  created_at: string
}

export interface AuditLog {
  id: string
  user_id: string | null
  action: string
  target_type: string | null
  target_id: string | null
  detail: Record<string, unknown> | null
  created_at: string
  profile?: Profile
}
