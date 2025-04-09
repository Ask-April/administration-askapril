export interface Course {
  course_id: string;
  title: string | null;
  description: string | null;
  category: string | null;
  image: string | null;
  duration: string | null;
  lessons: number | null;
  status: string | null;
  students: number | null;
  site_id: string;
  created_at: string | null;
  updated_at: string | null;
  
  subtitle?: string | null;
  featured?: boolean;
  priceVisible?: boolean;
  hidden?: boolean;
  hasCertificate?: boolean;
  certificateTemplate?: string;
  hasEnrollmentLimit?: boolean;
  maxEnrollments?: number;
}

export interface CourseSection {
  id: string;
  title: string;
  course_id: string;
  position: number;
  created_at?: string;
  updated_at?: string;
}

export interface CourseLesson {
  id: string;
  title: string;
  section_id: string;
  type?: string;
  content?: string;
  content_url?: string;
  video_url?: string;
  duration?: number;
  position: number;
  is_preview?: boolean;
  is_draft?: boolean;
  is_compulsory?: boolean;
  enable_discussion?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Enrollment {
  enrollment_id: string;
  student_id: string;
  course_id: string;
  status: string;
  progress_percent: number;
  enroll_date: string;
}

export interface Category {
  category_id: string;
  site_id: string;
  name: string;
}

export interface Lead {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  source: string | null;
  status: string | null;
  joined_on: string | null;
  tags: string[] | null;
  
  name?: string;
  last_contact?: string;
}

export interface Source {
  id: string;
  name: string;
  count: number;
  conversion: string;
  trend: 'up' | 'down';
  change: string;
  created_at?: string;
  updated_at?: string;
}

export interface Profile {
  id: string;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
  display_name: string | null;
}

export interface UserRole {
  user_id: string;
  role_id: string;
  site_id: string;
}

export interface Role {
  role_id: string;
  role_name: string;
}

export interface Media {
  media_id: string;
  site_id: string | null;
  filename: string | null;
  file_type: string | null;
  file_url: string | null;
  size: number | null;
  uploaded_by: string | null;
  uploaded_date: string | null;
}

export interface Community {
  community_id: string;
  site_id: string | null;
  created_by: string | null;
  name: string | null;
  description: string | null;
  type: string | null;
}

export interface Post {
  post_id: string;
  community_id: string | null;
  user_id: string | null;
  parent_post: string | null;
  title: string | null;
  content: string | null;
  post_date: string | null;
}

export interface Order {
  order_id: string;
  site_id: string | null;
  user_id: string | null;
  product_id: string | null;
  plan_id: string | null;
  amount: number | null;
  currency: string | null;
  payment_status: string | null;
  purchase_date: string | null;
}

export interface Product {
  product_id: string;
  site_id: string | null;
  reference_id: string | null;
  type: string | null;
  name: string | null;
  description: string | null;
}

export interface PricingPlan {
  plan_id: string;
  product_id: string | null;
  price: number | null;
  billing_type: string | null;
  billing_interval: string | null;
  currency: string | null;
  trial_period: number | null;
  is_default: boolean | null;
}

export interface Subscription {
  sub_id: string;
  user_id: string | null;
  start_date: string | null;
  end_date: string | null;
  next_billing_date: string | null;
  status: string | null;
  product_id: string | null;
  external_subscription_id: string | null;
}

export interface LessonCompletion {
  student_id: string;
  lesson_id: string;
  completed_at: string | null;
  score: number | null;
}

export interface Quiz {
  quiz_id: string;
  title: string | null;
  course_id: string | null;
  graded: boolean | null;
  time_limit: number | null;
}

export interface QuizQuestion {
  question_id: string;
  quiz_id: string | null;
  question_text: string | null;
  type: string | null;
  points: number | null;
  question_order: number | null;
}

export interface QuizAttempt {
  attempt_id: string;
  quiz_id: string | null;
  student_id: string | null;
  attempt_date: string | null;
  score: number | null;
  passed_flag: boolean | null;
}

export interface Funnel {
  funnel_id: string;
  site_id: string | null;
  name: string | null;
  goal: string | null;
}

export interface FunnelStep {
  step_id: string;
  funnel_id: string | null;
  page_id: string | null;
  step_type: string | null;
  step_order: number | null;
}

export interface EmailCampaign {
  campaign_id: string;
  site_id: string | null;
  created_by: string | null;
  name: string | null;
  status: string | null;
  send_date: string | null;
}

export interface Contact {
  contact_id: string;
  site_id: string | null;
  name: string | null;
  email: string | null;
  status: string | null;
  source: string | null;
}

export interface Coupon {
  coupon_id: string;
  site_id: string | null;
  code: string | null;
  description: string | null;
  discount_type: string | null;
  discount_value: number | null;
  expiration_date: string | null;
  usage_count: number | null;
  max_redemptions: number | null;
}

export interface CertificateTemplate {
  cert_id: string;
  site_id: string | null;
  template_name: string | null;
  design_data: string | null;
  background_image: string | null;
}

export interface IssuedCertificate {
  id: string;
  cert_id: string | null;
  course_id: string | null;
  student_id: string | null;
  issue_date: string | null;
  certificate_code: string | null;
}

export interface LiveSession {
  session_id: string;
  site_id: string | null;
  title: string | null;
  description: string | null;
  session_type: string | null;
  external_meeting_id: string | null;
  join_url: string | null;
  recording_url: string | null;
  host_user_id: string | null;
  duration: number | null;
  start_time: string | null;
}

export interface SessionAttendance {
  user_id: string;
  session_id: string;
  attended_flag: boolean | null;
  join_time: string | null;
  leave_time: string | null;
}

export interface Assignment {
  assignment_id: string;
  lesson_id: string | null;
  description: string | null;
  max_score: number | null;
  due_date: string | null;
}

export interface AssignmentSubmission {
  submission_id: string;
  assignment_id: string | null;
  student_id: string | null;
  content: string | null;
  submitted_date: string | null;
  grade: number | null;
  feedback: string | null;
}

export interface IntegrationConfig {
  config_id: string;
  site_id: string | null;
  service_type: string | null;
  config_data: string | null;
  active_flag: boolean | null;
}

export interface PaymentGateway {
  gateway_id: string;
  site_id: string | null;
  type: string | null;
  config_data: string | null;
}

export interface ActivityLog {
  log_id: string;
  site_id: string | null;
  user_id: string | null;
  timestamp: string | null;
  action_type: string | null;
  details: string | null;
}

export interface Notification {
  notif_id: string;
  user_id: string | null;
  related_id: string | null;
  is_read: boolean | null;
  message: string | null;
  type: string | null;
}

export interface Setting {
  id: string;
  name: string;
  category: string;
  description: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface CommunitySettings {
  id: string;
  community_id: string;
  setting_id: string;
  value: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ContentReport {
  id: string;
  community_id: string;
  content_id: string;
  content_type: string;
  reporter_id: string | null;
  reason: string;
  details: string | null;
  status: string | null;
  resolved_by: string | null;
  resolved_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}
