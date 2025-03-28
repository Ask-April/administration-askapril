
# Integrating the Course Management Backend with a Frontend Project

This document provides instructions on how to integrate this course management system (backend) with another Lovable project (frontend).

## Overview

This project serves as the backend administration system for managing courses, while your other project will serve as the frontend for students/users. Both projects will share the same Supabase instance to access the same data.

## Integration Steps

### 1. Copy Supabase Configuration

Copy these files from this project to your frontend project:
- `src/integrations/supabase/config.ts` (contains the project URL and anon key)
- `src/integrations/supabase/types.ts` (contains TypeScript types for the database)

### 2. Initialize Supabase Client in the Frontend Project

In your frontend project, create a Supabase client using the shared configuration:

```typescript
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './path/to/config';
import type { Database } from './path/to/types';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
```

### 3. Copy the Course Service

Copy the `src/services/courseService.ts` file to your frontend project to have access to standardized methods for accessing course data.

### 4. Authentication Integration

Both applications will share the same authentication system. When a user logs in on one application, they will be logged in on the other as well (as long as they share the same domain or you've configured Supabase auth correctly).

### 5. Use the Course Service in Your Frontend

You can now use the course service in your frontend to display courses:

```typescript
import { courseService } from './path/to/courseService';
import { useEffect, useState } from 'react';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await courseService.getPublicCourses();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchCourses();
  }, []);
  
  // Render your courses...
}
```

## Roles and Permissions

This setup is designed with the following roles in mind:
- **Admin/Teacher**: Uses this application (backend) to create and manage courses
- **Students/Users**: Uses your frontend application to browse and engage with courses

The Row Level Security (RLS) policies on the Supabase database are set up to:
- Allow anyone to view published courses
- Restrict course creation, updates, and deletion to authenticated users

## Expanding the Integration

As you develop your application, you may want to add more features like:
- Enrollment tracking
- Progress tracking
- Course ratings
- Discussion forums

For each new feature, follow this pattern:
1. Create the database tables and RLS policies in Supabase
2. Create service files that can be shared between projects
3. Implement administrative features in this backend project
4. Implement user-facing features in your frontend project

## Deployment Considerations

When deploying both applications:
- They can be hosted on separate domains, but Supabase authentication configuration needs to include all domains
- Consider using environment variables for Supabase credentials in production
- Ensure both applications are using the same version of the Supabase client
