
// Supabase Edge Function for AI content generation
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Function to generate course descriptions based on title
function generateDescription(title: string): string {
  const descriptions = [
    `Master the fundamentals of ${title} in this comprehensive course designed for beginners and intermediate learners alike. You'll gain practical skills through hands-on exercises and real-world projects.`,
    `Dive deep into ${title} with this expertly crafted course. From fundamental concepts to advanced techniques, you'll build confidence and competence through structured learning and practical applications.`,
    `Unlock your potential in ${title} through this step-by-step course. Designed with practical exercises and clear explanations, you'll quickly develop the skills needed to succeed.`,
    `This complete guide to ${title} takes you from novice to proficient through carefully structured lessons and practical projects. Perfect for those wanting to build valuable skills in this growing field.`
  ];
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

// Function to generate curriculum sections based on title and description
function generateCurriculum(title: string, description: string): any {
  // Generate some generic sections and lessons based on title
  const titleWords = title.toLowerCase().split(' ').filter(word => word.length > 3);
  
  const curriculumTemplates = [
    {
      sections: [
        {
          title: "Introduction to the Course",
          lessons: [
            { title: "Welcome and Course Overview", type: "video" },
            { title: "How to Get the Most from This Course", type: "text" },
            { title: "Setting Up Your Environment", type: "video" }
          ]
        },
        {
          title: "Core Fundamentals",
          lessons: [
            { title: `Understanding ${titleWords[0] || 'Basic'} Concepts`, type: "video" },
            { title: "Key Terminology and Frameworks", type: "pdf" },
            { title: "Hands-on Exercise: First Steps", type: "custom-code" }
          ]
        },
        {
          title: "Practical Applications",
          lessons: [
            { title: "Building Your First Project", type: "video" },
            { title: "Common Challenges and Solutions", type: "text" },
            { title: "Case Study: Real-world Example", type: "pdf" },
            { title: "Guided Practice Session", type: "live" }
          ]
        },
        {
          title: "Advanced Techniques",
          lessons: [
            { title: "Taking Your Skills Further", type: "video" },
            { title: "Optimization Strategies", type: "text" },
            { title: "Final Project", type: "custom-code" },
            { title: "Knowledge Assessment", type: "quiz" }
          ]
        }
      ]
    },
    {
      sections: [
        {
          title: "Getting Started",
          lessons: [
            { title: "Course Introduction", type: "video" },
            { title: "Prerequisites and Setup", type: "text" },
            { title: "Resource Materials", type: "downloads" }
          ]
        },
        {
          title: `${titleWords[0] || 'Basic'} Principles`,
          lessons: [
            { title: "Understanding Core Concepts", type: "video" },
            { title: "Theoretical Framework", type: "text" },
            { title: "Guided Exercise", type: "custom-code" }
          ]
        },
        {
          title: "Building Your Skills",
          lessons: [
            { title: "Intermediate Techniques", type: "video" },
            { title: "Practical Workshop", type: "live" },
            { title: "Problem-solving Strategies", type: "text" },
            { title: "Review and Practice", type: "quiz" }
          ]
        },
        {
          title: "Mastering the Craft",
          lessons: [
            { title: "Advanced Methodologies", type: "video" },
            { title: "Expert Insights", type: "pdf" },
            { title: "Capstone Project", type: "custom-code" },
            { title: "Final Assessment", type: "quiz" }
          ]
        },
        {
          title: "Next Steps",
          lessons: [
            { title: "Further Learning Resources", type: "text" },
            { title: "Career Opportunities", type: "video" },
            { title: "Course Completion Survey", type: "survey" }
          ]
        }
      ]
    }
  ];
  
  return curriculumTemplates[Math.floor(Math.random() * curriculumTemplates.length)];
}

serve(async (req) => {
  try {
    const { title, description, contentType } = await req.json();
    
    if (!title) {
      return new Response(JSON.stringify({ error: "Title is required" }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    let responseData = {};
    
    if (contentType === "description") {
      // Generate course description
      responseData = {
        content: generateDescription(title)
      };
    } 
    else if (contentType === "curriculum") {
      // Generate course curriculum
      responseData = generateCurriculum(title, description);
    }
    else {
      return new Response(JSON.stringify({ error: "Invalid content type" }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify(responseData), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});
