export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activity_log: {
        Row: {
          action_type: string | null
          details: string | null
          log_id: string
          site_id: string | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          action_type?: string | null
          details?: string | null
          log_id?: string
          site_id?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          action_type?: string | null
          details?: string | null
          log_id?: string
          site_id?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      affiliate_commission: {
        Row: {
          affiliate_user_id: string | null
          amount: number | null
          commission_id: string
          order_id: string | null
          payout_date: string | null
          status: string | null
        }
        Insert: {
          affiliate_user_id?: string | null
          amount?: number | null
          commission_id?: string
          order_id?: string | null
          payout_date?: string | null
          status?: string | null
        }
        Update: {
          affiliate_user_id?: string | null
          amount?: number | null
          commission_id?: string
          order_id?: string | null
          payout_date?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_commission_affiliate_user_id_fkey"
            columns: ["affiliate_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "affiliate_commission_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["order_id"]
          },
        ]
      }
      affiliate_referral: {
        Row: {
          affiliate_user_id: string | null
          course_id: string | null
          referral_date: string | null
          referral_id: string
          referred_user_id: string | null
        }
        Insert: {
          affiliate_user_id?: string | null
          course_id?: string | null
          referral_date?: string | null
          referral_id?: string
          referred_user_id?: string | null
        }
        Update: {
          affiliate_user_id?: string | null
          course_id?: string | null
          referral_date?: string | null
          referral_id?: string
          referred_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_referral_affiliate_user_id_fkey"
            columns: ["affiliate_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "affiliate_referral_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "affiliate_referral_referred_user_id_fkey"
            columns: ["referred_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      app_integration: {
        Row: {
          app_name: string | null
          config_data: string | null
          integration_id: string
          site_id: string | null
        }
        Insert: {
          app_name?: string | null
          config_data?: string | null
          integration_id?: string
          site_id?: string | null
        }
        Update: {
          app_name?: string | null
          config_data?: string | null
          integration_id?: string
          site_id?: string | null
        }
        Relationships: []
      }
      assignment: {
        Row: {
          assignment_id: string
          description: string | null
          due_date: string | null
          lesson_id: string | null
          max_score: number | null
        }
        Insert: {
          assignment_id?: string
          description?: string | null
          due_date?: string | null
          lesson_id?: string | null
          max_score?: number | null
        }
        Update: {
          assignment_id?: string
          description?: string | null
          due_date?: string | null
          lesson_id?: string | null
          max_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "assignment_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["lesson_id"]
          },
        ]
      }
      assignment_submission: {
        Row: {
          assignment_id: string | null
          content: string | null
          feedback: string | null
          grade: number | null
          student_id: string | null
          submission_id: string
          submitted_date: string | null
        }
        Insert: {
          assignment_id?: string | null
          content?: string | null
          feedback?: string | null
          grade?: number | null
          student_id?: string | null
          submission_id?: string
          submitted_date?: string | null
        }
        Update: {
          assignment_id?: string | null
          content?: string | null
          feedback?: string | null
          grade?: number | null
          student_id?: string | null
          submission_id?: string
          submitted_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assignment_submission_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignment"
            referencedColumns: ["assignment_id"]
          },
          {
            foreignKeyName: "assignment_submission_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      certificate_template: {
        Row: {
          background_image: string | null
          cert_id: string
          design_data: string | null
          site_id: string | null
          template_name: string | null
        }
        Insert: {
          background_image?: string | null
          cert_id?: string
          design_data?: string | null
          site_id?: string | null
          template_name?: string | null
        }
        Update: {
          background_image?: string | null
          cert_id?: string
          design_data?: string | null
          site_id?: string | null
          template_name?: string | null
        }
        Relationships: []
      }
      community: {
        Row: {
          community_id: string
          created_by: string | null
          description: string | null
          name: string | null
          site_id: string | null
          type: string | null
        }
        Insert: {
          community_id?: string
          created_by?: string | null
          description?: string | null
          name?: string | null
          site_id?: string | null
          type?: string | null
        }
        Update: {
          community_id?: string
          created_by?: string | null
          description?: string | null
          name?: string | null
          site_id?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      community_settings: {
        Row: {
          community_id: string
          created_at: string | null
          id: string
          setting_id: string
          updated_at: string | null
          value: boolean | null
        }
        Insert: {
          community_id: string
          created_at?: string | null
          id?: string
          setting_id: string
          updated_at?: string | null
          value?: boolean | null
        }
        Update: {
          community_id?: string
          created_at?: string | null
          id?: string
          setting_id?: string
          updated_at?: string | null
          value?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "community_settings_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "community"
            referencedColumns: ["community_id"]
          },
          {
            foreignKeyName: "community_settings_setting_id_fkey"
            columns: ["setting_id"]
            isOneToOne: false
            referencedRelation: "settings"
            referencedColumns: ["id"]
          },
        ]
      }
      contact: {
        Row: {
          contact_id: string
          email: string | null
          name: string | null
          site_id: string | null
          source: string | null
          status: string | null
        }
        Insert: {
          contact_id?: string
          email?: string | null
          name?: string | null
          site_id?: string | null
          source?: string | null
          status?: string | null
        }
        Update: {
          contact_id?: string
          email?: string | null
          name?: string | null
          site_id?: string | null
          source?: string | null
          status?: string | null
        }
        Relationships: []
      }
      content_reports: {
        Row: {
          community_id: string
          content_id: string
          content_type: string
          created_at: string | null
          details: string | null
          id: string
          reason: string
          reporter_id: string | null
          resolved_at: string | null
          resolved_by: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          community_id: string
          content_id: string
          content_type: string
          created_at?: string | null
          details?: string | null
          id?: string
          reason: string
          reporter_id?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          community_id?: string
          content_id?: string
          content_type?: string
          created_at?: string | null
          details?: string | null
          id?: string
          reason?: string
          reporter_id?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_reports_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "community"
            referencedColumns: ["community_id"]
          },
        ]
      }
      coupon: {
        Row: {
          code: string | null
          coupon_id: string
          description: string | null
          discount_type: string | null
          discount_value: number | null
          expiration_date: string | null
          max_redemptions: number | null
          site_id: string | null
          usage_count: number | null
        }
        Insert: {
          code?: string | null
          coupon_id?: string
          description?: string | null
          discount_type?: string | null
          discount_value?: number | null
          expiration_date?: string | null
          max_redemptions?: number | null
          site_id?: string | null
          usage_count?: number | null
        }
        Update: {
          code?: string | null
          coupon_id?: string
          description?: string | null
          discount_type?: string | null
          discount_value?: number | null
          expiration_date?: string | null
          max_redemptions?: number | null
          site_id?: string | null
          usage_count?: number | null
        }
        Relationships: []
      }
      course_category: {
        Row: {
          category_id: string
          name: string | null
          site_id: string
        }
        Insert: {
          category_id?: string
          name?: string | null
          site_id: string
        }
        Update: {
          category_id?: string
          name?: string | null
          site_id?: string
        }
        Relationships: []
      }
      course_lessons: {
        Row: {
          content: string | null
          content_url: string | null
          created_at: string | null
          duration: number | null
          enable_discussion: boolean | null
          id: string
          is_compulsory: boolean | null
          is_draft: boolean | null
          is_preview: boolean | null
          position: number
          section_id: string
          title: string
          type: string | null
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          content?: string | null
          content_url?: string | null
          created_at?: string | null
          duration?: number | null
          enable_discussion?: boolean | null
          id?: string
          is_compulsory?: boolean | null
          is_draft?: boolean | null
          is_preview?: boolean | null
          position: number
          section_id: string
          title: string
          type?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          content?: string | null
          content_url?: string | null
          created_at?: string | null
          duration?: number | null
          enable_discussion?: boolean | null
          id?: string
          is_compulsory?: boolean | null
          is_draft?: boolean | null
          is_preview?: boolean | null
          position?: number
          section_id?: string
          title?: string
          type?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_lessons_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "course_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      course_module: {
        Row: {
          course_id: string | null
          module_id: string
          position: number | null
          title: string | null
        }
        Insert: {
          course_id?: string | null
          module_id?: string
          position?: number | null
          title?: string | null
        }
        Update: {
          course_id?: string | null
          module_id?: string
          position?: number | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_module_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["course_id"]
          },
        ]
      }
      course_sections: {
        Row: {
          course_id: string
          created_at: string | null
          id: string
          position: number
          title: string
          updated_at: string | null
        }
        Insert: {
          course_id: string
          created_at?: string | null
          id?: string
          position: number
          title: string
          updated_at?: string | null
        }
        Update: {
          course_id?: string
          created_at?: string | null
          id?: string
          position?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_sections_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["course_id"]
          },
        ]
      }
      courses: {
        Row: {
          category: string | null
          course_id: string
          created_at: string | null
          description: string | null
          duration: string | null
          image: string | null
          lessons: number | null
          site_id: string
          status: string | null
          students: number | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          course_id?: string
          created_at?: string | null
          description?: string | null
          duration?: string | null
          image?: string | null
          lessons?: number | null
          site_id: string
          status?: string | null
          students?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          course_id?: string
          created_at?: string | null
          description?: string | null
          duration?: string | null
          image?: string | null
          lessons?: number | null
          site_id?: string
          status?: string | null
          students?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      email_campaign: {
        Row: {
          campaign_id: string
          created_by: string | null
          name: string | null
          send_date: string | null
          site_id: string | null
          status: string | null
        }
        Insert: {
          campaign_id?: string
          created_by?: string | null
          name?: string | null
          send_date?: string | null
          site_id?: string | null
          status?: string | null
        }
        Update: {
          campaign_id?: string
          created_by?: string | null
          name?: string | null
          send_date?: string | null
          site_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_campaign_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      email_campaign_recipient: {
        Row: {
          campaign_id: string
          contact_id: string
        }
        Insert: {
          campaign_id: string
          contact_id: string
        }
        Update: {
          campaign_id?: string
          contact_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_campaign_recipient_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaign"
            referencedColumns: ["campaign_id"]
          },
          {
            foreignKeyName: "email_campaign_recipient_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contact"
            referencedColumns: ["contact_id"]
          },
        ]
      }
      email_sequence: {
        Row: {
          description: string | null
          name: string | null
          sequence_id: string
        }
        Insert: {
          description?: string | null
          name?: string | null
          sequence_id?: string
        }
        Update: {
          description?: string | null
          name?: string | null
          sequence_id?: string
        }
        Relationships: []
      }
      email_stats: {
        Row: {
          campaign_id: string | null
          clicked_at: string | null
          contact_id: string | null
          opened_at: string | null
          stat_id: string
        }
        Insert: {
          campaign_id?: string | null
          clicked_at?: string | null
          contact_id?: string | null
          opened_at?: string | null
          stat_id?: string
        }
        Update: {
          campaign_id?: string | null
          clicked_at?: string | null
          contact_id?: string | null
          opened_at?: string | null
          stat_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_stats_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "email_campaign"
            referencedColumns: ["campaign_id"]
          },
          {
            foreignKeyName: "email_stats_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contact"
            referencedColumns: ["contact_id"]
          },
        ]
      }
      enrollment: {
        Row: {
          course_id: string | null
          enroll_date: string | null
          enrollment_id: string
          progress_percent: number | null
          status: string | null
          student_id: string | null
        }
        Insert: {
          course_id?: string | null
          enroll_date?: string | null
          enrollment_id?: string
          progress_percent?: number | null
          status?: string | null
          student_id?: string | null
        }
        Update: {
          course_id?: string | null
          enroll_date?: string | null
          enrollment_id?: string
          progress_percent?: number | null
          status?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enrollment_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "enrollment_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      external_contact_mapping: {
        Row: {
          contact_id: string | null
          external_id: string | null
          external_system: string | null
          mapping_id: string
          site_id: string | null
        }
        Insert: {
          contact_id?: string | null
          external_id?: string | null
          external_system?: string | null
          mapping_id?: string
          site_id?: string | null
        }
        Update: {
          contact_id?: string | null
          external_id?: string | null
          external_system?: string | null
          mapping_id?: string
          site_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "external_contact_mapping_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contact"
            referencedColumns: ["contact_id"]
          },
        ]
      }
      funnel: {
        Row: {
          funnel_id: string
          goal: string | null
          name: string | null
          site_id: string | null
        }
        Insert: {
          funnel_id?: string
          goal?: string | null
          name?: string | null
          site_id?: string | null
        }
        Update: {
          funnel_id?: string
          goal?: string | null
          name?: string | null
          site_id?: string | null
        }
        Relationships: []
      }
      funnel_step: {
        Row: {
          funnel_id: string | null
          page_id: string | null
          step_id: string
          step_order: number | null
          step_type: string | null
        }
        Insert: {
          funnel_id?: string | null
          page_id?: string | null
          step_id?: string
          step_order?: number | null
          step_type?: string | null
        }
        Update: {
          funnel_id?: string | null
          page_id?: string | null
          step_id?: string
          step_order?: number | null
          step_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "funnel_step_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "funnel"
            referencedColumns: ["funnel_id"]
          },
        ]
      }
      integration_config: {
        Row: {
          active_flag: boolean | null
          config_data: string | null
          config_id: string
          service_type: string | null
          site_id: string | null
        }
        Insert: {
          active_flag?: boolean | null
          config_data?: string | null
          config_id?: string
          service_type?: string | null
          site_id?: string | null
        }
        Update: {
          active_flag?: boolean | null
          config_data?: string | null
          config_id?: string
          service_type?: string | null
          site_id?: string | null
        }
        Relationships: []
      }
      issued_certificate: {
        Row: {
          cert_id: string | null
          certificate_code: string | null
          course_id: string | null
          id: string
          issue_date: string | null
          student_id: string | null
        }
        Insert: {
          cert_id?: string | null
          certificate_code?: string | null
          course_id?: string | null
          id?: string
          issue_date?: string | null
          student_id?: string | null
        }
        Update: {
          cert_id?: string | null
          certificate_code?: string | null
          course_id?: string | null
          id?: string
          issue_date?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "issued_certificate_cert_id_fkey"
            columns: ["cert_id"]
            isOneToOne: false
            referencedRelation: "certificate_template"
            referencedColumns: ["cert_id"]
          },
          {
            foreignKeyName: "issued_certificate_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "issued_certificate_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      leads: {
        Row: {
          email: string | null
          first_name: string | null
          joined_on: string | null
          last_name: string | null
          status: string | null
        }
        Insert: {
          email?: string | null
          first_name?: string | null
          joined_on?: string | null
          last_name?: string | null
          status?: string | null
        }
        Update: {
          email?: string | null
          first_name?: string | null
          joined_on?: string | null
          last_name?: string | null
          status?: string | null
        }
        Relationships: []
      }
      lesson_comment: {
        Row: {
          comment_id: string
          content: string | null
          lesson_id: string | null
          parent_comment: string | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          comment_id?: string
          content?: string | null
          lesson_id?: string | null
          parent_comment?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          comment_id?: string
          content?: string | null
          lesson_id?: string | null
          parent_comment?: string | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lesson_comment_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["lesson_id"]
          },
          {
            foreignKeyName: "lesson_comment_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      lesson_completion: {
        Row: {
          completed_at: string | null
          lesson_id: string
          score: number | null
          student_id: string
        }
        Insert: {
          completed_at?: string | null
          lesson_id: string
          score?: number | null
          student_id: string
        }
        Update: {
          completed_at?: string | null
          lesson_id?: string
          score?: number | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_completion_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["lesson_id"]
          },
          {
            foreignKeyName: "lesson_completion_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      lesson_resource: {
        Row: {
          is_downloadable: boolean | null
          lesson_id: string
          media_id: string
        }
        Insert: {
          is_downloadable?: boolean | null
          lesson_id: string
          media_id: string
        }
        Update: {
          is_downloadable?: boolean | null
          lesson_id?: string
          media_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_resource_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["lesson_id"]
          },
          {
            foreignKeyName: "lesson_resource_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["media_id"]
          },
        ]
      }
      lessons: {
        Row: {
          duration: number | null
          lesson_id: string
          module_id: string | null
          position: number | null
          title: string | null
          type: string | null
        }
        Insert: {
          duration?: number | null
          lesson_id?: string
          module_id?: string | null
          position?: number | null
          title?: string | null
          type?: string | null
        }
        Update: {
          duration?: number | null
          lesson_id?: string
          module_id?: string | null
          position?: number | null
          title?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_module"
            referencedColumns: ["module_id"]
          },
        ]
      }
      live_session: {
        Row: {
          description: string | null
          duration: number | null
          external_meeting_id: string | null
          host_user_id: string | null
          join_url: string | null
          recording_url: string | null
          session_id: string
          session_type: string | null
          site_id: string | null
          start_time: string | null
          title: string | null
        }
        Insert: {
          description?: string | null
          duration?: number | null
          external_meeting_id?: string | null
          host_user_id?: string | null
          join_url?: string | null
          recording_url?: string | null
          session_id?: string
          session_type?: string | null
          site_id?: string | null
          start_time?: string | null
          title?: string | null
        }
        Update: {
          description?: string | null
          duration?: number | null
          external_meeting_id?: string | null
          host_user_id?: string | null
          join_url?: string | null
          recording_url?: string | null
          session_id?: string
          session_type?: string | null
          site_id?: string | null
          start_time?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "live_session_host_user_id_fkey"
            columns: ["host_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      media: {
        Row: {
          file_type: string | null
          file_url: string | null
          filename: string | null
          media_id: string
          site_id: string | null
          size: number | null
          uploaded_by: string | null
          uploaded_date: string | null
        }
        Insert: {
          file_type?: string | null
          file_url?: string | null
          filename?: string | null
          media_id?: string
          site_id?: string | null
          size?: number | null
          uploaded_by?: string | null
          uploaded_date?: string | null
        }
        Update: {
          file_type?: string | null
          file_url?: string | null
          filename?: string | null
          media_id?: string
          site_id?: string | null
          size?: number | null
          uploaded_by?: string | null
          uploaded_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "media_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      notification: {
        Row: {
          is_read: boolean | null
          message: string | null
          notif_id: string
          related_id: string | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          is_read?: boolean | null
          message?: string | null
          notif_id?: string
          related_id?: string | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          is_read?: boolean | null
          message?: string | null
          notif_id?: string
          related_id?: string | null
          type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      order_item: {
        Row: {
          item_price: number | null
          order_id: string | null
          order_item_id: string
          product_id: string | null
          quantity: number | null
        }
        Insert: {
          item_price?: number | null
          order_id?: string | null
          order_item_id?: string
          product_id?: string | null
          quantity?: number | null
        }
        Update: {
          item_price?: number | null
          order_id?: string | null
          order_item_id?: string
          product_id?: string | null
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "order_item_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["order_id"]
          },
          {
            foreignKeyName: "order_item_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["product_id"]
          },
        ]
      }
      orders: {
        Row: {
          amount: number | null
          currency: string | null
          order_id: string
          payment_status: string | null
          plan_id: string | null
          product_id: string | null
          purchase_date: string | null
          site_id: string | null
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          currency?: string | null
          order_id?: string
          payment_status?: string | null
          plan_id?: string | null
          product_id?: string | null
          purchase_date?: string | null
          site_id?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          currency?: string | null
          order_id?: string
          payment_status?: string | null
          plan_id?: string | null
          product_id?: string | null
          purchase_date?: string | null
          site_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "pricing_plan"
            referencedColumns: ["plan_id"]
          },
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      page: {
        Row: {
          content: string | null
          page_id: string
          site_id: string | null
          title: string | null
          type: string | null
        }
        Insert: {
          content?: string | null
          page_id?: string
          site_id?: string | null
          title?: string | null
          type?: string | null
        }
        Update: {
          content?: string | null
          page_id?: string
          site_id?: string | null
          title?: string | null
          type?: string | null
        }
        Relationships: []
      }
      payment_gateway: {
        Row: {
          config_data: string | null
          gateway_id: string
          site_id: string | null
          type: string | null
        }
        Insert: {
          config_data?: string | null
          gateway_id?: string
          site_id?: string | null
          type?: string | null
        }
        Update: {
          config_data?: string | null
          gateway_id?: string
          site_id?: string | null
          type?: string | null
        }
        Relationships: []
      }
      post: {
        Row: {
          community_id: string | null
          content: string | null
          parent_post: string | null
          post_date: string | null
          post_id: string
          title: string | null
          user_id: string | null
        }
        Insert: {
          community_id?: string | null
          content?: string | null
          parent_post?: string | null
          post_date?: string | null
          post_id?: string
          title?: string | null
          user_id?: string | null
        }
        Update: {
          community_id?: string | null
          content?: string | null
          parent_post?: string | null
          post_date?: string | null
          post_id?: string
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_community_id_fkey"
            columns: ["community_id"]
            isOneToOne: false
            referencedRelation: "community"
            referencedColumns: ["community_id"]
          },
          {
            foreignKeyName: "post_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      pricing_plan: {
        Row: {
          billing_interval: string | null
          billing_type: string | null
          currency: string | null
          is_default: boolean | null
          plan_id: string
          price: number | null
          product_id: string | null
          trial_period: number | null
        }
        Insert: {
          billing_interval?: string | null
          billing_type?: string | null
          currency?: string | null
          is_default?: boolean | null
          plan_id?: string
          price?: number | null
          product_id?: string | null
          trial_period?: number | null
        }
        Update: {
          billing_interval?: string | null
          billing_type?: string | null
          currency?: string | null
          is_default?: boolean | null
          plan_id?: string
          price?: number | null
          product_id?: string | null
          trial_period?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pricing_plan_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["product_id"]
          },
        ]
      }
      product: {
        Row: {
          description: string | null
          name: string | null
          product_id: string
          reference_id: string | null
          site_id: string | null
          type: string | null
        }
        Insert: {
          description?: string | null
          name?: string | null
          product_id?: string
          reference_id?: string | null
          site_id?: string | null
          type?: string | null
        }
        Update: {
          description?: string | null
          name?: string | null
          product_id?: string
          reference_id?: string | null
          site_id?: string | null
          type?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          display_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      question_option: {
        Row: {
          is_correct: boolean | null
          option_id: string
          option_text: string | null
          question_id: string | null
        }
        Insert: {
          is_correct?: boolean | null
          option_id?: string
          option_text?: string | null
          question_id?: string | null
        }
        Update: {
          is_correct?: boolean | null
          option_id?: string
          option_text?: string | null
          question_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "question_option_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "quiz_question"
            referencedColumns: ["question_id"]
          },
        ]
      }
      quiz: {
        Row: {
          course_id: string | null
          graded: boolean | null
          quiz_id: string
          time_limit: number | null
          title: string | null
        }
        Insert: {
          course_id?: string | null
          graded?: boolean | null
          quiz_id?: string
          time_limit?: number | null
          title?: string | null
        }
        Update: {
          course_id?: string | null
          graded?: boolean | null
          quiz_id?: string
          time_limit?: number | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["course_id"]
          },
        ]
      }
      quiz_answer: {
        Row: {
          answer_id: string
          answer_text: string | null
          attempt_id: string | null
          option_id: string | null
          question_id: string | null
        }
        Insert: {
          answer_id?: string
          answer_text?: string | null
          attempt_id?: string | null
          option_id?: string | null
          question_id?: string | null
        }
        Update: {
          answer_id?: string
          answer_text?: string | null
          attempt_id?: string | null
          option_id?: string | null
          question_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_answer_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "quiz_attempt"
            referencedColumns: ["attempt_id"]
          },
          {
            foreignKeyName: "quiz_answer_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "quiz_question"
            referencedColumns: ["question_id"]
          },
        ]
      }
      quiz_attempt: {
        Row: {
          attempt_date: string | null
          attempt_id: string
          passed_flag: boolean | null
          quiz_id: string | null
          score: number | null
          student_id: string | null
        }
        Insert: {
          attempt_date?: string | null
          attempt_id?: string
          passed_flag?: boolean | null
          quiz_id?: string | null
          score?: number | null
          student_id?: string | null
        }
        Update: {
          attempt_date?: string | null
          attempt_id?: string
          passed_flag?: boolean | null
          quiz_id?: string | null
          score?: number | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempt_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quiz"
            referencedColumns: ["quiz_id"]
          },
          {
            foreignKeyName: "quiz_attempt_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      quiz_question: {
        Row: {
          points: number | null
          question_id: string
          question_order: number | null
          question_text: string | null
          quiz_id: string | null
          type: string | null
        }
        Insert: {
          points?: number | null
          question_id?: string
          question_order?: number | null
          question_text?: string | null
          quiz_id?: string | null
          type?: string | null
        }
        Update: {
          points?: number | null
          question_id?: string
          question_order?: number | null
          question_text?: string | null
          quiz_id?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_question_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quiz"
            referencedColumns: ["quiz_id"]
          },
        ]
      }
      roles: {
        Row: {
          role_id: string
          role_name: string
        }
        Insert: {
          role_id?: string
          role_name: string
        }
        Update: {
          role_id?: string
          role_name?: string
        }
        Relationships: []
      }
      scorm_package: {
        Row: {
          course_id: string | null
          file_url: string | null
          package_id: string
          status: string | null
        }
        Insert: {
          course_id?: string | null
          file_url?: string | null
          package_id?: string
          status?: string | null
        }
        Update: {
          course_id?: string | null
          file_url?: string | null
          package_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scorm_package_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["course_id"]
          },
        ]
      }
      sequence_step: {
        Row: {
          delay_days: number | null
          email_template_id: string | null
          sequence_id: string | null
          step_id: string
        }
        Insert: {
          delay_days?: number | null
          email_template_id?: string | null
          sequence_id?: string | null
          step_id?: string
        }
        Update: {
          delay_days?: number | null
          email_template_id?: string | null
          sequence_id?: string | null
          step_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sequence_step_sequence_id_fkey"
            columns: ["sequence_id"]
            isOneToOne: false
            referencedRelation: "email_sequence"
            referencedColumns: ["sequence_id"]
          },
        ]
      }
      session_attendance: {
        Row: {
          attended_flag: boolean | null
          join_time: string | null
          leave_time: string | null
          session_id: string
          user_id: string
        }
        Insert: {
          attended_flag?: boolean | null
          join_time?: string | null
          leave_time?: string | null
          session_id: string
          user_id: string
        }
        Update: {
          attended_flag?: boolean | null
          join_time?: string | null
          leave_time?: string | null
          session_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_attendance_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "live_session"
            referencedColumns: ["session_id"]
          },
          {
            foreignKeyName: "session_attendance_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      settings: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      subscription: {
        Row: {
          end_date: string | null
          external_subscription_id: string | null
          next_billing_date: string | null
          product_id: string | null
          start_date: string | null
          status: string | null
          sub_id: string
          user_id: string | null
        }
        Insert: {
          end_date?: string | null
          external_subscription_id?: string | null
          next_billing_date?: string | null
          product_id?: string | null
          start_date?: string | null
          status?: string | null
          sub_id?: string
          user_id?: string | null
        }
        Update: {
          end_date?: string | null
          external_subscription_id?: string | null
          next_billing_date?: string | null
          product_id?: string | null
          start_date?: string | null
          status?: string | null
          sub_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscription_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "subscription_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_interactions: {
        Row: {
          call_transcript: string | null
          caller: string
          conversation_topic: string | null
          followup_needed: boolean | null
          next_followupdate: string | null
          notes: Json | null
          phone_call_duration: string
          phone_number: string
          previous_call_id: string | null
          user: string | null
          what_to_talk_about: string | null
        }
        Insert: {
          call_transcript?: string | null
          caller: string
          conversation_topic?: string | null
          followup_needed?: boolean | null
          next_followupdate?: string | null
          notes?: Json | null
          phone_call_duration: string
          phone_number: string
          previous_call_id?: string | null
          user?: string | null
          what_to_talk_about?: string | null
        }
        Update: {
          call_transcript?: string | null
          caller?: string
          conversation_topic?: string | null
          followup_needed?: boolean | null
          next_followupdate?: string | null
          notes?: Json | null
          phone_call_duration?: string
          phone_number?: string
          previous_call_id?: string | null
          user?: string | null
          what_to_talk_about?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "phonecalls_previouscallid_fkey"
            columns: ["previous_call_id"]
            isOneToOne: false
            referencedRelation: "user_interactions"
            referencedColumns: ["caller"]
          },
        ]
      }
      user_roles: {
        Row: {
          role_id: string
          site_id: string
          user_id: string
        }
        Insert: {
          role_id: string
          site_id: string
          user_id: string
        }
        Update: {
          role_id?: string
          site_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["role_id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      users: {
        Row: {
          email: string | null
          name: string | null
          password_hash: string | null
          signup_date: string | null
          site_id: string
          user_id: string
        }
        Insert: {
          email?: string | null
          name?: string | null
          password_hash?: string | null
          signup_date?: string | null
          site_id: string
          user_id?: string
        }
        Update: {
          email?: string | null
          name?: string | null
          password_hash?: string | null
          signup_date?: string | null
          site_id?: string
          user_id?: string
        }
        Relationships: []
      }
      video_view: {
        Row: {
          completed_flag: boolean | null
          country: string | null
          device: string | null
          duration_watched: number | null
          media_id: string | null
          user_id: string | null
          view_date: string | null
          view_id: string
        }
        Insert: {
          completed_flag?: boolean | null
          country?: string | null
          device?: string | null
          duration_watched?: number | null
          media_id?: string | null
          user_id?: string | null
          view_date?: string | null
          view_id?: string
        }
        Update: {
          completed_flag?: boolean | null
          country?: string | null
          device?: string | null
          duration_watched?: number | null
          media_id?: string | null
          user_id?: string | null
          view_date?: string | null
          view_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_view_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["media_id"]
          },
          {
            foreignKeyName: "video_view_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      webhook_endpoint: {
        Row: {
          event_type: string | null
          is_active: boolean | null
          secret_token: string | null
          site_id: string | null
          target_url: string | null
          webhook_id: string
        }
        Insert: {
          event_type?: string | null
          is_active?: boolean | null
          secret_token?: string | null
          site_id?: string | null
          target_url?: string | null
          webhook_id?: string
        }
        Update: {
          event_type?: string | null
          is_active?: boolean | null
          secret_token?: string | null
          site_id?: string | null
          target_url?: string | null
          webhook_id?: string
        }
        Relationships: []
      }
      webhook_log: {
        Row: {
          log_id: string
          response_body: string | null
          response_status: number | null
          sent_at: string | null
          webhook_id: string | null
        }
        Insert: {
          log_id?: string
          response_body?: string | null
          response_status?: number | null
          sent_at?: string | null
          webhook_id?: string | null
        }
        Update: {
          log_id?: string
          response_body?: string | null
          response_status?: number | null
          sent_at?: string | null
          webhook_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "webhook_log_webhook_id_fkey"
            columns: ["webhook_id"]
            isOneToOne: false
            referencedRelation: "webhook_endpoint"
            referencedColumns: ["webhook_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      avg_quiz_score: {
        Args: {
          p_student_id: string
          p_course_id: string
        }
        Returns: number
      }
      calculate_course_progress: {
        Args: {
          p_student_id: string
          p_course_id: string
        }
        Returns: number
      }
      total_revenue: {
        Args: {
          p_course_id: string
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
