
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { title, description, category } = await req.json();
    console.log("Generate course content for:", { title, description, category });
    
    // In a real implementation, this would call an AI model API
    // For now, we'll generate content based on the input data
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let generatedContent = {
      title: title || "",
      description: description || "",
      category: category || "Development",
      duration: "8 hours",
      sections: []
    };
    
    // Generate enhanced title if not provided
    if (!title) {
      generatedContent.title = "Complete Guide to Modern Web Development";
    }
    
    // Generate enhanced description if not provided
    if (!description) {
      generatedContent.description = 
        "This comprehensive course covers everything you need to know about modern web development. " +
        "Starting from the fundamentals of HTML, CSS, and JavaScript, you'll progress to advanced topics " +
        "like React, state management, and backend integration. By the end of this course, you'll be able " +
        "to build full-stack web applications with confidence.";
    }
    
    // Generate some sample curriculum sections
    generatedContent.sections = [
      {
        title: "Introduction to the Course",
        lessons: [
          { title: "Welcome to the Course", type: "video" },
          { title: "Course Overview", type: "text" },
          { title: "How to Get the Most from This Course", type: "video" }
        ]
      },
      {
        title: "Getting Started",
        lessons: [
          { title: "Setting Up Your Development Environment", type: "video" },
          { title: "Essential Tools and Resources", type: "text" },
          { title: "Your First Project", type: "video" }
        ]
      },
      {
        title: "Core Concepts",
        lessons: [
          { title: "Understanding the Fundamentals", type: "video" },
          { title: "Best Practices", type: "pdf" },
          { title: "Common Patterns", type: "text" },
          { title: "Knowledge Check", type: "quiz" }
        ]
      }
    ];
    
    console.log("Generated content:", generatedContent);
    
    return new Response(
      JSON.stringify(generatedContent),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error generating course content:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
