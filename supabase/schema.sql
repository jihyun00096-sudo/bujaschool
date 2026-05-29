-- =============================================
-- 부자해커스쿨 Supabase Schema
-- =============================================

-- EXTENSIONS
create extension if not exists "uuid-ossp";

-- ─── PROFILES ───────────────────────────────
create table public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  email        text not null,
  full_name    text not null default '',
  phone        text,
  role         text not null default 'student' check (role in ('student','admin')),
  memo         text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ─── COURSES ────────────────────────────────
create table public.courses (
  id                 uuid primary key default uuid_generate_v4(),
  title              text not null,
  category           text not null default '',
  description        text not null default '',
  detail_description text,
  schedule           text not null default '',
  duration_weeks     int not null default 8,
  status             text not null default 'upcoming' check (status in ('active','closed','upcoming')),
  is_published       boolean not null default false,
  order_index        int not null default 0,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

-- ─── ENROLLMENTS ────────────────────────────
create table public.enrollments (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  course_id   uuid not null references public.courses(id) on delete cascade,
  status      text not null default 'pending' check (status in ('active','expired','pending')),
  start_date  date,
  end_date    date,
  granted_by  uuid references public.profiles(id),
  granted_at  timestamptz,
  created_at  timestamptz not null default now(),
  unique(user_id, course_id)
);

-- ─── COURSE WEEKS ───────────────────────────
create table public.course_weeks (
  id                uuid primary key default uuid_generate_v4(),
  course_id         uuid not null references public.courses(id) on delete cascade,
  week_number       int not null,
  title             text not null,
  description       text,
  zoom_link         text,
  zoom_visible_from timestamptz,
  zoom_hidden_after timestamptz,
  class_date        timestamptz,
  is_completed      boolean not null default false,
  created_at        timestamptz not null default now(),
  unique(course_id, week_number)
);

-- ─── MATERIALS ──────────────────────────────
create table public.materials (
  id          uuid primary key default uuid_generate_v4(),
  course_id   uuid not null references public.courses(id) on delete cascade,
  week_id     uuid references public.course_weeks(id) on delete set null,
  title       text not null,
  file_url    text not null,
  file_type   text not null default 'pdf',
  file_size   bigint,
  is_public   boolean not null default false,
  created_at  timestamptz not null default now()
);

-- ─── NOTICES ────────────────────────────────
create table public.notices (
  id          uuid primary key default uuid_generate_v4(),
  course_id   uuid references public.courses(id) on delete cascade,
  title       text not null,
  content     text not null,
  is_pinned   boolean not null default false,
  created_by  uuid not null references public.profiles(id),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ─── REVIEWS ────────────────────────────────
create table public.reviews (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  course_id    uuid not null references public.courses(id) on delete cascade,
  rating       int not null default 5 check (rating between 1 and 5),
  content      text not null,
  review_type  text not null default '수강 후기',
  is_approved  boolean not null default false,
  is_featured  boolean not null default false,
  created_at   timestamptz not null default now()
);

-- ─── INQUIRIES ──────────────────────────────
create table public.inquiries (
  id             uuid primary key default uuid_generate_v4(),
  name           text not null,
  phone          text not null,
  course_interest text,
  message        text not null,
  status         text not null default 'pending' check (status in ('pending','in_progress','resolved')),
  admin_memo     text,
  created_at     timestamptz not null default now()
);

-- ─── AUDIT LOGS ─────────────────────────────
create table public.audit_logs (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid references public.profiles(id) on delete set null,
  action       text not null,
  target_type  text,
  target_id    uuid,
  detail       jsonb,
  created_at   timestamptz not null default now()
);

-- =============================================
-- RLS POLICIES
-- =============================================
alter table public.profiles     enable row level security;
alter table public.courses      enable row level security;
alter table public.enrollments  enable row level security;
alter table public.course_weeks enable row level security;
alter table public.materials    enable row level security;
alter table public.notices      enable row level security;
alter table public.reviews      enable row level security;
alter table public.inquiries    enable row level security;
alter table public.audit_logs   enable row level security;

-- Helper function
create or replace function public.is_admin()
returns boolean language sql security definer as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- PROFILES
create policy "본인 프로필 조회" on public.profiles for select using (auth.uid() = id);
create policy "관리자 전체 조회" on public.profiles for select using (public.is_admin());
create policy "본인 프로필 수정" on public.profiles for update using (auth.uid() = id);
create policy "관리자 수정" on public.profiles for update using (public.is_admin());
create policy "회원가입 시 생성" on public.profiles for insert with check (auth.uid() = id);

-- COURSES
create policy "공개 강의 조회" on public.courses for select using (is_published = true or public.is_admin());
create policy "관리자 강의 관리" on public.courses for all using (public.is_admin());

-- ENROLLMENTS
create policy "본인 수강 조회" on public.enrollments for select using (user_id = auth.uid() or public.is_admin());
create policy "관리자 수강 관리" on public.enrollments for all using (public.is_admin());

-- COURSE_WEEKS
create policy "수강생 주차 조회" on public.course_weeks for select using (
  public.is_admin() or exists (
    select 1 from public.enrollments
    where user_id = auth.uid() and course_id = course_weeks.course_id and status = 'active'
  )
);
create policy "관리자 주차 관리" on public.course_weeks for all using (public.is_admin());

-- MATERIALS
create policy "수강생 자료 조회" on public.materials for select using (
  is_public = true or public.is_admin() or exists (
    select 1 from public.enrollments
    where user_id = auth.uid() and course_id = materials.course_id and status = 'active'
  )
);
create policy "관리자 자료 관리" on public.materials for all using (public.is_admin());

-- NOTICES
create policy "수강생 공지 조회" on public.notices for select using (
  course_id is null or public.is_admin() or exists (
    select 1 from public.enrollments
    where user_id = auth.uid() and course_id = notices.course_id and status = 'active'
  )
);
create policy "관리자 공지 관리" on public.notices for all using (public.is_admin());

-- REVIEWS
create policy "승인된 후기 조회" on public.reviews for select using (is_approved = true or user_id = auth.uid() or public.is_admin());
create policy "본인 후기 작성" on public.reviews for insert with check (auth.uid() = user_id);
create policy "관리자 후기 관리" on public.reviews for all using (public.is_admin());

-- INQUIRIES
create policy "문의 작성" on public.inquiries for insert with check (true);
create policy "관리자 문의 관리" on public.inquiries for all using (public.is_admin());

-- AUDIT_LOGS
create policy "관리자 로그 조회" on public.audit_logs for select using (public.is_admin());
create policy "로그 기록" on public.audit_logs for insert with check (true);

-- =============================================
-- TRIGGERS
-- =============================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at before update on public.profiles
  for each row execute procedure public.handle_updated_at();
create trigger courses_updated_at before update on public.courses
  for each row execute procedure public.handle_updated_at();
create trigger notices_updated_at before update on public.notices
  for each row execute procedure public.handle_updated_at();

-- =============================================
-- SEED DATA
-- =============================================
insert into public.courses (title, category, description, schedule, duration_weeks, status, is_published, order_index) values
  ('공매·신탁공매 실전종합반', '공매·경매', '온비드 공매와 신탁공매의 모든 것을 실전 위주로 배웁니다. 물건 검색부터 낙찰 후 처리까지 완벽 마스터.', '매주 화요일 오후 7:00', 12, 'active', true, 1),
  ('NPL 종합투자반', 'NPL', '부실채권(NPL) 투자의 구조와 수익 실현 방법을 단계별로 학습. 소액으로 시작하는 NPL 실전 전략 공개.', '매주 목요일 오후 7:00', 8, 'active', true, 2),
  ('토지 실전종합투자반', '토지투자', '토지 투자의 기본부터 개발 가능 토지 발굴, 수익 실현까지. 현장 답사 병행으로 실전 감각을 키웁니다.', '매주 수요일 오후 7:00', 10, 'active', true, 3),
  ('아파트 집중낙찰반', '아파트경매', '아파트 경매의 모든 실전 노하우를 압축. 낙찰가 분석, 명도, 시세 차익 실현까지 집중 트레이닝.', '일정 협의 후 공지', 8, 'upcoming', true, 4);
