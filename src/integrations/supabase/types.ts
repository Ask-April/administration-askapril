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
      activitylog: {
        Row: {
          action_type: string | null
          details: string | null
          log_id: number
          site_id: number | null
          timestamp: string | null
          user_id: number | null
        }
        Insert: {
          action_type?: string | null
          details?: string | null
          log_id?: never
          site_id?: number | null
          timestamp?: string | null
          user_id?: number | null
        }
        Update: {
          action_type?: string | null
          details?: string | null
          log_id?: never
          site_id?: number | null
          timestamp?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "activitylog_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      affiliatecommission: {
        Row: {
          affiliate_user_id: number | null
          amount: number | null
          commission_id: number
          order_id: number | null
          payout_date: string | null
          status: string | null
        }
        Insert: {
          affiliate_user_id?: number | null
          amount?: number | null
          commission_id?: never
          order_id?: number | null
          payout_date?: string | null
          status?: string | null
        }
        Update: {
          affiliate_user_id?: number | null
          amount?: number | null
          commission_id?: never
          order_id?: number | null
          payout_date?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "affiliatecommission_affiliate_user_id_fkey"
            columns: ["affiliate_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "affiliatecommission_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["order_id"]
          },
        ]
      }
      affiliatereferral: {
        Row: {
          affiliate_user_id: number | null
          course_id: number | null
          referral_date: string | null
          referral_id: number
          referred_user_id: number | null
        }
        Insert: {
          affiliate_user_id?: number | null
          course_id?: number | null
          referral_date?: string | null
          referral_id?: never
          referred_user_id?: number | null
        }
        Update: {
          affiliate_user_id?: number | null
          course_id?: number | null
          referral_date?: string | null
          referral_id?: never
          referred_user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "affiliatereferral_affiliate_user_id_fkey"
            columns: ["affiliate_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "affiliatereferral_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "affiliatereferral_referred_user_id_fkey"
            columns: ["referred_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      appintegration: {
        Row: {
          app_name: string | null
          config_data: string | null
          integration_id: number
          site_id: number | null
        }
        Insert: {
          app_name?: string | null
          config_data?: string | null
          integration_id?: never
          site_id?: number | null
        }
        Update: {
          app_name?: string | null
          config_data?: string | null
          integration_id?: never
          site_id?: number | null
        }
        Relationships: []
      }
      assignment: {
        Row: {
          assignment_id: number
          description: string | null
          due_date: string | null
          lesson_id: number | null
          max_score: number | null
        }
        Insert: {
          assignment_id?: never
          description?: string | null
          due_date?: string | null
          lesson_id?: number | null
          max_score?: number | null
        }
        Update: {
          assignment_id?: never
          description?: string | null
          due_date?: string | null
          lesson_id?: number | null
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
      assignmentsubmission: {
        Row: {
          assignment_id: number | null
          content: string | null
          feedback: string | null
          grade: number | null
          student_id: number | null
          submission_id: number
          submitted_date: string | null
        }
        Insert: {
          assignment_id?: number | null
          content?: string | null
          feedback?: string | null
          grade?: number | null
          student_id?: number | null
          submission_id?: never
          submitted_date?: string | null
        }
        Update: {
          assignment_id?: number | null
          content?: string | null
          feedback?: string | null
          grade?: number | null
          student_id?: number | null
          submission_id?: never
          submitted_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assignmentsubmission_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignment"
            referencedColumns: ["assignment_id"]
          },
          {
            foreignKeyName: "assignmentsubmission_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      certificatetemplate: {
        Row: {
          background_image: string | null
          cert_id: number
          design_data: string | null
          site_id: number | null
          template_name: string | null
        }
        Insert: {
          background_image?: string | null
          cert_id?: never
          design_data?: string | null
          site_id?: number | null
          template_name?: string | null
        }
        Update: {
          background_image?: string | null
          cert_id?: never
          design_data?: string | null
          site_id?: number | null
          template_name?: string | null
        }
        Relationships: []
      }
      community: {
        Row: {
          community_id: number
          created_by: number | null
          description: string | null
          name: string | null
          site_id: number | null
          type: string | null
        }
        Insert: {
          community_id?: never
          created_by?: number | null
          description?: string | null
          name?: string | null
          site_id?: number | null
          type?: string | null
        }
        Update: {
          community_id?: never
          created_by?: number | null
          description?: string | null
          name?: string | null
          site_id?: number | null
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
          value: boolean
        }
        Insert: {
          community_id: string
          created_at?: string | null
          id?: string
          setting_id: string
          updated_at?: string | null
          value: boolean
        }
        Update: {
          community_id?: string
          created_at?: string | null
          id?: string
          setting_id?: string
          updated_at?: string | null
          value?: boolean
        }
        Relationships: []
      }
      contact: {
        Row: {
          contact_id: number
          email: string | null
          name: string | null
          site_id: number | null
          source: string | null
          status: string | null
        }
        Insert: {
          contact_id?: never
          email?: string | null
          name?: string | null
          site_id?: number | null
          source?: string | null
          status?: string | null
        }
        Update: {
          contact_id?: never
          email?: string | null
          name?: string | null
          site_id?: number | null
          source?: string | null
          status?: string | null
        }
        Relationships: []
      }
      content_reports: {
        Row: {
          community_id: string
          content_excerpt: string
          content_id: string
          content_type: string
          created_at: string | null
          id: string
          reason: string
          reporter_id: string
          severity: string
          status: string
          updated_at: string | null
        }
        Insert: {
          community_id: string
          content_excerpt: string
          content_id: string
          content_type: string
          created_at?: string | null
          id?: string
          reason: string
          reporter_id: string
          severity: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          community_id?: string
          content_excerpt?: string
          content_id?: string
          content_type?: string
          created_at?: string | null
          id?: string
          reason?: string
          reporter_id?: string
          severity?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      coupon: {
        Row: {
          code: string | null
          coupon_id: number
          description: string | null
          discount_type: string | null
          discount_value: number | null
          expiration_date: string | null
          max_redemptions: number | null
          site_id: number | null
          usage_count: number | null
        }
        Insert: {
          code?: string | null
          coupon_id?: never
          description?: string | null
          discount_type?: string | null
          discount_value?: number | null
          expiration_date?: string | null
          max_redemptions?: number | null
          site_id?: number | null
          usage_count?: number | null
        }
        Update: {
          code?: string | null
          coupon_id?: never
          description?: string | null
          discount_type?: string | null
          discount_value?: number | null
          expiration_date?: string | null
          max_redemptions?: number | null
          site_id?: number | null
          usage_count?: number | null
        }
        Relationships: []
      }
      coursecategory: {
        Row: {
          category_id: number
          name: string | null
          site_id: number
        }
        Insert: {
          category_id?: never
          name?: string | null
          site_id: number
        }
        Update: {
          category_id?: never
          name?: string | null
          site_id?: number
        }
        Relationships: []
      }
      coursemodule: {
        Row: {
          course_id: number | null
          module_id: number
          position: number | null
          title: string | null
        }
        Insert: {
          course_id?: number | null
          module_id?: never
          position?: number | null
          title?: string | null
        }
        Update: {
          course_id?: number | null
          module_id?: never
          position?: number | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "coursemodule_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["course_id"]
          },
        ]
      }
      courses: {
        Row: {
          course_id: number
          description: string | null
          site_id: number
          status: string | null
          title: string | null
        }
        Insert: {
          course_id?: never
          description?: string | null
          site_id: number
          status?: string | null
          title?: string | null
        }
        Update: {
          course_id?: never
          description?: string | null
          site_id?: number
          status?: string | null
          title?: string | null
        }
        Relationships: []
      }
      emailcampaign: {
        Row: {
          campaign_id: number
          created_by: number | null
          name: string | null
          send_date: string | null
          site_id: number | null
          status: string | null
        }
        Insert: {
          campaign_id?: never
          created_by?: number | null
          name?: string | null
          send_date?: string | null
          site_id?: number | null
          status?: string | null
        }
        Update: {
          campaign_id?: never
          created_by?: number | null
          name?: string | null
          send_date?: string | null
          site_id?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "emailcampaign_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      emailcampaignrecipient: {
        Row: {
          campaign_id: number
          contact_id: number
        }
        Insert: {
          campaign_id: number
          contact_id: number
        }
        Update: {
          campaign_id?: number
          contact_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "emailcampaignrecipient_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "emailcampaign"
            referencedColumns: ["campaign_id"]
          },
          {
            foreignKeyName: "emailcampaignrecipient_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contact"
            referencedColumns: ["contact_id"]
          },
        ]
      }
      emailsequence: {
        Row: {
          description: string | null
          name: string | null
          sequence_id: number
        }
        Insert: {
          description?: string | null
          name?: string | null
          sequence_id?: never
        }
        Update: {
          description?: string | null
          name?: string | null
          sequence_id?: never
        }
        Relationships: []
      }
      emailstats: {
        Row: {
          campaign_id: number | null
          clicked_at: string | null
          contact_id: number | null
          opened_at: string | null
          stat_id: number
        }
        Insert: {
          campaign_id?: number | null
          clicked_at?: string | null
          contact_id?: number | null
          opened_at?: string | null
          stat_id?: never
        }
        Update: {
          campaign_id?: number | null
          clicked_at?: string | null
          contact_id?: number | null
          opened_at?: string | null
          stat_id?: never
        }
        Relationships: [
          {
            foreignKeyName: "emailstats_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "emailcampaign"
            referencedColumns: ["campaign_id"]
          },
          {
            foreignKeyName: "emailstats_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contact"
            referencedColumns: ["contact_id"]
          },
        ]
      }
      enrollment: {
        Row: {
          course_id: number | null
          enroll_date: string | null
          enrollment_id: number
          progress_percent: number | null
          status: string | null
          student_id: number | null
        }
        Insert: {
          course_id?: number | null
          enroll_date?: string | null
          enrollment_id?: never
          progress_percent?: number | null
          status?: string | null
          student_id?: number | null
        }
        Update: {
          course_id?: number | null
          enroll_date?: string | null
          enrollment_id?: never
          progress_percent?: number | null
          status?: string | null
          student_id?: number | null
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
      externalcontactmapping: {
        Row: {
          contact_id: number | null
          external_id: string | null
          external_system: string | null
          mapping_id: number
          site_id: number | null
        }
        Insert: {
          contact_id?: number | null
          external_id?: string | null
          external_system?: string | null
          mapping_id?: never
          site_id?: number | null
        }
        Update: {
          contact_id?: number | null
          external_id?: string | null
          external_system?: string | null
          mapping_id?: never
          site_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "externalcontactmapping_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contact"
            referencedColumns: ["contact_id"]
          },
        ]
      }
      funnel: {
        Row: {
          funnel_id: number
          goal: string | null
          name: string | null
          site_id: number | null
        }
        Insert: {
          funnel_id?: never
          goal?: string | null
          name?: string | null
          site_id?: number | null
        }
        Update: {
          funnel_id?: never
          goal?: string | null
          name?: string | null
          site_id?: number | null
        }
        Relationships: []
      }
      funnelstep: {
        Row: {
          funnel_id: number | null
          page_id: number | null
          step_id: number
          step_order: number | null
          step_type: string | null
        }
        Insert: {
          funnel_id?: number | null
          page_id?: number | null
          step_id?: never
          step_order?: number | null
          step_type?: string | null
        }
        Update: {
          funnel_id?: number | null
          page_id?: number | null
          step_id?: never
          step_order?: number | null
          step_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "funnelstep_funnel_id_fkey"
            columns: ["funnel_id"]
            isOneToOne: false
            referencedRelation: "funnel"
            referencedColumns: ["funnel_id"]
          },
        ]
      }
      integrationconfig: {
        Row: {
          active_flag: boolean | null
          config_data: string | null
          config_id: number
          service_type: string | null
          site_id: number | null
        }
        Insert: {
          active_flag?: boolean | null
          config_data?: string | null
          config_id?: never
          service_type?: string | null
          site_id?: number | null
        }
        Update: {
          active_flag?: boolean | null
          config_data?: string | null
          config_id?: never
          service_type?: string | null
          site_id?: number | null
        }
        Relationships: []
      }
      issuedcertificate: {
        Row: {
          cert_id: number | null
          certificate_code: string | null
          course_id: number | null
          id: number
          issue_date: string | null
          student_id: number | null
        }
        Insert: {
          cert_id?: number | null
          certificate_code?: string | null
          course_id?: number | null
          id?: never
          issue_date?: string | null
          student_id?: number | null
        }
        Update: {
          cert_id?: number | null
          certificate_code?: string | null
          course_id?: number | null
          id?: never
          issue_date?: string | null
          student_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "issuedcertificate_cert_id_fkey"
            columns: ["cert_id"]
            isOneToOne: false
            referencedRelation: "certificatetemplate"
            referencedColumns: ["cert_id"]
          },
          {
            foreignKeyName: "issuedcertificate_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "issuedcertificate_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      lessoncomment: {
        Row: {
          comment_id: number
          content: string | null
          lesson_id: number | null
          parent_comment: number | null
          timestamp: string | null
          user_id: number | null
        }
        Insert: {
          comment_id?: never
          content?: string | null
          lesson_id?: number | null
          parent_comment?: number | null
          timestamp?: string | null
          user_id?: number | null
        }
        Update: {
          comment_id?: never
          content?: string | null
          lesson_id?: number | null
          parent_comment?: number | null
          timestamp?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lessoncomment_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["lesson_id"]
          },
          {
            foreignKeyName: "lessoncomment_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      lessoncompletion: {
        Row: {
          completed_at: string | null
          lesson_id: number
          score: number | null
          student_id: number
        }
        Insert: {
          completed_at?: string | null
          lesson_id: number
          score?: number | null
          student_id: number
        }
        Update: {
          completed_at?: string | null
          lesson_id?: number
          score?: number | null
          student_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "lessoncompletion_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["lesson_id"]
          },
          {
            foreignKeyName: "lessoncompletion_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      lessonresource: {
        Row: {
          is_downloadable: boolean | null
          lesson_id: number
          media_id: number
        }
        Insert: {
          is_downloadable?: boolean | null
          lesson_id: number
          media_id: number
        }
        Update: {
          is_downloadable?: boolean | null
          lesson_id?: number
          media_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "lessonresource_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["lesson_id"]
          },
          {
            foreignKeyName: "lessonresource_media_id_fkey"
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
          lesson_id: number
          module_id: number | null
          position: number | null
          title: string | null
          type: string | null
        }
        Insert: {
          duration?: number | null
          lesson_id?: never
          module_id?: number | null
          position?: number | null
          title?: string | null
          type?: string | null
        }
        Update: {
          duration?: number | null
          lesson_id?: never
          module_id?: number | null
          position?: number | null
          title?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "coursemodule"
            referencedColumns: ["module_id"]
          },
        ]
      }
      livesession: {
        Row: {
          description: string | null
          duration: number | null
          external_meeting_id: string | null
          host_user_id: number | null
          join_url: string | null
          recording_url: string | null
          session_id: number
          session_type: string | null
          site_id: number | null
          start_time: string | null
          title: string | null
        }
        Insert: {
          description?: string | null
          duration?: number | null
          external_meeting_id?: string | null
          host_user_id?: number | null
          join_url?: string | null
          recording_url?: string | null
          session_id?: never
          session_type?: string | null
          site_id?: number | null
          start_time?: string | null
          title?: string | null
        }
        Update: {
          description?: string | null
          duration?: number | null
          external_meeting_id?: string | null
          host_user_id?: number | null
          join_url?: string | null
          recording_url?: string | null
          session_id?: never
          session_type?: string | null
          site_id?: number | null
          start_time?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "livesession_host_user_id_fkey"
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
          media_id: number
          site_id: number | null
          size: number | null
          uploaded_by: number | null
          uploaded_date: string | null
        }
        Insert: {
          file_type?: string | null
          file_url?: string | null
          filename?: string | null
          media_id?: never
          site_id?: number | null
          size?: number | null
          uploaded_by?: number | null
          uploaded_date?: string | null
        }
        Update: {
          file_type?: string | null
          file_url?: string | null
          filename?: string | null
          media_id?: never
          site_id?: number | null
          size?: number | null
          uploaded_by?: number | null
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
          notif_id: number
          related_id: number | null
          type: string | null
          user_id: number | null
        }
        Insert: {
          is_read?: boolean | null
          message?: string | null
          notif_id?: never
          related_id?: number | null
          type?: string | null
          user_id?: number | null
        }
        Update: {
          is_read?: boolean | null
          message?: string | null
          notif_id?: never
          related_id?: number | null
          type?: string | null
          user_id?: number | null
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
      orderitem: {
        Row: {
          item_price: number | null
          order_id: number | null
          order_item_id: number
          product_id: number | null
          quantity: number | null
        }
        Insert: {
          item_price?: number | null
          order_id?: number | null
          order_item_id?: never
          product_id?: number | null
          quantity?: number | null
        }
        Update: {
          item_price?: number | null
          order_id?: number | null
          order_item_id?: never
          product_id?: number | null
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orderitem_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["order_id"]
          },
          {
            foreignKeyName: "orderitem_product_id_fkey"
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
          order_id: number
          payment_status: string | null
          plan_id: number | null
          product_id: number | null
          purchase_date: string | null
          site_id: number | null
          user_id: number | null
        }
        Insert: {
          amount?: number | null
          currency?: string | null
          order_id?: never
          payment_status?: string | null
          plan_id?: number | null
          product_id?: number | null
          purchase_date?: string | null
          site_id?: number | null
          user_id?: number | null
        }
        Update: {
          amount?: number | null
          currency?: string | null
          order_id?: never
          payment_status?: string | null
          plan_id?: number | null
          product_id?: number | null
          purchase_date?: string | null
          site_id?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "pricingplan"
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
          page_id: number
          site_id: number | null
          title: string | null
          type: string | null
        }
        Insert: {
          content?: string | null
          page_id?: never
          site_id?: number | null
          title?: string | null
          type?: string | null
        }
        Update: {
          content?: string | null
          page_id?: never
          site_id?: number | null
          title?: string | null
          type?: string | null
        }
        Relationships: []
      }
      paymentgateway: {
        Row: {
          config_data: string | null
          gateway_id: number
          site_id: number | null
          type: string | null
        }
        Insert: {
          config_data?: string | null
          gateway_id?: never
          site_id?: number | null
          type?: string | null
        }
        Update: {
          config_data?: string | null
          gateway_id?: never
          site_id?: number | null
          type?: string | null
        }
        Relationships: []
      }
      post: {
        Row: {
          community_id: number | null
          content: string | null
          parent_post: number | null
          post_date: string | null
          post_id: number
          title: string | null
          user_id: number | null
        }
        Insert: {
          community_id?: number | null
          content?: string | null
          parent_post?: number | null
          post_date?: string | null
          post_id?: never
          title?: string | null
          user_id?: number | null
        }
        Update: {
          community_id?: number | null
          content?: string | null
          parent_post?: number | null
          post_date?: string | null
          post_id?: never
          title?: string | null
          user_id?: number | null
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
      pricingplan: {
        Row: {
          billing_interval: string | null
          billing_type: string | null
          currency: string | null
          is_default: boolean | null
          plan_id: number
          price: number | null
          product_id: number | null
          trial_period: number | null
        }
        Insert: {
          billing_interval?: string | null
          billing_type?: string | null
          currency?: string | null
          is_default?: boolean | null
          plan_id?: never
          price?: number | null
          product_id?: number | null
          trial_period?: number | null
        }
        Update: {
          billing_interval?: string | null
          billing_type?: string | null
          currency?: string | null
          is_default?: boolean | null
          plan_id?: never
          price?: number | null
          product_id?: number | null
          trial_period?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pricingplan_product_id_fkey"
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
          product_id: number
          reference_id: number | null
          site_id: number | null
          type: string | null
        }
        Insert: {
          description?: string | null
          name?: string | null
          product_id?: never
          reference_id?: number | null
          site_id?: number | null
          type?: string | null
        }
        Update: {
          description?: string | null
          name?: string | null
          product_id?: never
          reference_id?: number | null
          site_id?: number | null
          type?: string | null
        }
        Relationships: []
      }
      questionoption: {
        Row: {
          is_correct: boolean | null
          option_id: number
          option_text: string | null
          question_id: number | null
        }
        Insert: {
          is_correct?: boolean | null
          option_id?: never
          option_text?: string | null
          question_id?: number | null
        }
        Update: {
          is_correct?: boolean | null
          option_id?: never
          option_text?: string | null
          question_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "questionoption_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "quizquestion"
            referencedColumns: ["question_id"]
          },
        ]
      }
      quiz: {
        Row: {
          course_id: number | null
          graded: boolean | null
          quiz_id: number
          time_limit: number | null
          title: string | null
        }
        Insert: {
          course_id?: number | null
          graded?: boolean | null
          quiz_id?: never
          time_limit?: number | null
          title?: string | null
        }
        Update: {
          course_id?: number | null
          graded?: boolean | null
          quiz_id?: never
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
      quizanswer: {
        Row: {
          answer_id: number
          answer_text: string | null
          attempt_id: number | null
          option_id: number | null
          question_id: number | null
        }
        Insert: {
          answer_id?: never
          answer_text?: string | null
          attempt_id?: number | null
          option_id?: number | null
          question_id?: number | null
        }
        Update: {
          answer_id?: never
          answer_text?: string | null
          attempt_id?: number | null
          option_id?: number | null
          question_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "quizanswer_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "quizattempt"
            referencedColumns: ["attempt_id"]
          },
          {
            foreignKeyName: "quizanswer_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "quizquestion"
            referencedColumns: ["question_id"]
          },
        ]
      }
      quizattempt: {
        Row: {
          attempt_date: string | null
          attempt_id: number
          passed_flag: boolean | null
          quiz_id: number | null
          score: number | null
          student_id: number | null
        }
        Insert: {
          attempt_date?: string | null
          attempt_id?: never
          passed_flag?: boolean | null
          quiz_id?: number | null
          score?: number | null
          student_id?: number | null
        }
        Update: {
          attempt_date?: string | null
          attempt_id?: never
          passed_flag?: boolean | null
          quiz_id?: number | null
          score?: number | null
          student_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "quizattempt_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quiz"
            referencedColumns: ["quiz_id"]
          },
          {
            foreignKeyName: "quizattempt_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      quizquestion: {
        Row: {
          points: number | null
          question_id: number
          question_order: number | null
          question_text: string | null
          quiz_id: number | null
          type: string | null
        }
        Insert: {
          points?: number | null
          question_id?: never
          question_order?: number | null
          question_text?: string | null
          quiz_id?: number | null
          type?: string | null
        }
        Update: {
          points?: number | null
          question_id?: never
          question_order?: number | null
          question_text?: string | null
          quiz_id?: number | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quizquestion_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quiz"
            referencedColumns: ["quiz_id"]
          },
        ]
      }
      roles: {
        Row: {
          role_id: number
          role_name: string
        }
        Insert: {
          role_id?: never
          role_name: string
        }
        Update: {
          role_id?: never
          role_name?: string
        }
        Relationships: []
      }
      scormpackage: {
        Row: {
          course_id: number | null
          file_url: string | null
          package_id: number
          status: string | null
        }
        Insert: {
          course_id?: number | null
          file_url?: string | null
          package_id?: never
          status?: string | null
        }
        Update: {
          course_id?: number | null
          file_url?: string | null
          package_id?: never
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scormpackage_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["course_id"]
          },
        ]
      }
      sequencestep: {
        Row: {
          delay_days: number | null
          email_template_id: number | null
          sequence_id: number | null
          step_id: number
        }
        Insert: {
          delay_days?: number | null
          email_template_id?: number | null
          sequence_id?: number | null
          step_id?: never
        }
        Update: {
          delay_days?: number | null
          email_template_id?: number | null
          sequence_id?: number | null
          step_id?: never
        }
        Relationships: [
          {
            foreignKeyName: "sequencestep_sequence_id_fkey"
            columns: ["sequence_id"]
            isOneToOne: false
            referencedRelation: "emailsequence"
            referencedColumns: ["sequence_id"]
          },
        ]
      }
      sessionattendance: {
        Row: {
          attended_flag: boolean | null
          join_time: string | null
          leave_time: string | null
          session_id: number
          user_id: number
        }
        Insert: {
          attended_flag?: boolean | null
          join_time?: string | null
          leave_time?: string | null
          session_id: number
          user_id: number
        }
        Update: {
          attended_flag?: boolean | null
          join_time?: string | null
          leave_time?: string | null
          session_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "sessionattendance_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "livesession"
            referencedColumns: ["session_id"]
          },
          {
            foreignKeyName: "sessionattendance_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      subscription: {
        Row: {
          end_date: string | null
          external_subscription_id: string | null
          next_billing_date: string | null
          product_id: number | null
          start_date: string | null
          status: string | null
          sub_id: number
          user_id: number | null
        }
        Insert: {
          end_date?: string | null
          external_subscription_id?: string | null
          next_billing_date?: string | null
          product_id?: number | null
          start_date?: string | null
          status?: string | null
          sub_id?: never
          user_id?: number | null
        }
        Update: {
          end_date?: string | null
          external_subscription_id?: string | null
          next_billing_date?: string | null
          product_id?: number | null
          start_date?: string | null
          status?: string | null
          sub_id?: never
          user_id?: number | null
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
      userroles: {
        Row: {
          role_id: number
          site_id: number
          user_id: number
        }
        Insert: {
          role_id: number
          site_id: number
          user_id: number
        }
        Update: {
          role_id?: number
          site_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "userroles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["role_id"]
          },
          {
            foreignKeyName: "userroles_user_id_fkey"
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
          site_id: number
          user_id: number
        }
        Insert: {
          email?: string | null
          name?: string | null
          password_hash?: string | null
          signup_date?: string | null
          site_id: number
          user_id?: never
        }
        Update: {
          email?: string | null
          name?: string | null
          password_hash?: string | null
          signup_date?: string | null
          site_id?: number
          user_id?: never
        }
        Relationships: []
      }
      videoview: {
        Row: {
          completed_flag: boolean | null
          country: string | null
          device: string | null
          duration_watched: number | null
          media_id: number | null
          user_id: number | null
          view_date: string | null
          view_id: number
        }
        Insert: {
          completed_flag?: boolean | null
          country?: string | null
          device?: string | null
          duration_watched?: number | null
          media_id?: number | null
          user_id?: number | null
          view_date?: string | null
          view_id?: never
        }
        Update: {
          completed_flag?: boolean | null
          country?: string | null
          device?: string | null
          duration_watched?: number | null
          media_id?: number | null
          user_id?: number | null
          view_date?: string | null
          view_id?: never
        }
        Relationships: [
          {
            foreignKeyName: "videoview_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["media_id"]
          },
          {
            foreignKeyName: "videoview_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      webhookendpoint: {
        Row: {
          event_type: string | null
          is_active: boolean | null
          secret_token: string | null
          site_id: number | null
          target_url: string | null
          webhook_id: number
        }
        Insert: {
          event_type?: string | null
          is_active?: boolean | null
          secret_token?: string | null
          site_id?: number | null
          target_url?: string | null
          webhook_id?: never
        }
        Update: {
          event_type?: string | null
          is_active?: boolean | null
          secret_token?: string | null
          site_id?: number | null
          target_url?: string | null
          webhook_id?: never
        }
        Relationships: []
      }
      webhooklog: {
        Row: {
          log_id: number
          response_body: string | null
          response_status: number | null
          sent_at: string | null
          webhook_id: number | null
        }
        Insert: {
          log_id?: never
          response_body?: string | null
          response_status?: number | null
          sent_at?: string | null
          webhook_id?: number | null
        }
        Update: {
          log_id?: never
          response_body?: string | null
          response_status?: number | null
          sent_at?: string | null
          webhook_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "webhooklog_webhook_id_fkey"
            columns: ["webhook_id"]
            isOneToOne: false
            referencedRelation: "webhookendpoint"
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
          p_student_id: number
          p_course_id: number
        }
        Returns: number
      }
      calculate_course_progress: {
        Args: {
          p_student_id: number
          p_course_id: number
        }
        Returns: number
      }
      total_revenue: {
        Args: {
          p_course_id: number
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
