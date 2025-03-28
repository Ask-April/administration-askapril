
import { courseService } from "@/services/courseService";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * Example API endpoint for serving course data to the frontend
 * 
 * Note: This is just an example - in practice, your frontend would likely
 * connect directly to Supabase using the shared configuration.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set CORS headers to allow requests from your frontend domain
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace with your frontend domain in production
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    if (req.method === 'GET') {
      const category = req.query.category as string | undefined;
      const id = req.query.id as string | undefined;
      
      if (id) {
        // Get a specific course
        const course = await courseService.getCourseById(id);
        return res.status(200).json(course);
      } else if (category) {
        // Get courses by category
        const courses = await courseService.getCoursesByCategory(category);
        return res.status(200).json(courses);
      } else {
        // Get all public courses
        const courses = await courseService.getPublicCourses();
        return res.status(200).json(courses);
      }
    }
    
    // Return 405 Method Not Allowed for non-GET requests
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
