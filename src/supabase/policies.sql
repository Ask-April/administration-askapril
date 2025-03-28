
-- This is a reference file for the Supabase RLS policies already created
-- You would run these commands in the Supabase SQL editor if they haven't been applied

-- Enable row level security on the courses table
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view published courses (for the frontend)
CREATE POLICY "Anyone can view published courses"
ON public.courses
FOR SELECT
USING (status = 'published');

-- Allow authenticated users to view all courses (for the admin backend)
CREATE POLICY "Authenticated users can view all courses"
ON public.courses
FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to insert courses
CREATE POLICY "Authenticated users can insert courses"
ON public.courses
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update courses
CREATE POLICY "Authenticated users can update courses"
ON public.courses
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated users to delete courses
CREATE POLICY "Authenticated users can delete courses"
ON public.courses
FOR DELETE
TO authenticated
USING (true);

-- Note: In a production environment, you would likely want more granular policies
-- based on user roles (admin vs regular user) rather than just authentication status
