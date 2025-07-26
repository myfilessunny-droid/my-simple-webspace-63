-- Enable RLS on all website content tables
ALTER TABLE public.website_hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_mission ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_contact ENABLE ROW LEVEL SECURITY;

-- Create policies for website_hero table
CREATE POLICY "Public can read hero content" 
ON public.website_hero 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can update hero content" 
ON public.website_hero 
FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert hero content" 
ON public.website_hero 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- Create policies for website_stats table
CREATE POLICY "Public can read stats content" 
ON public.website_stats 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can update stats content" 
ON public.website_stats 
FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert stats content" 
ON public.website_stats 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- Create policies for website_mission table
CREATE POLICY "Public can read mission content" 
ON public.website_mission 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can update mission content" 
ON public.website_mission 
FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert mission content" 
ON public.website_mission 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- Create policies for website_contact table
CREATE POLICY "Public can read contact content" 
ON public.website_contact 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can update contact content" 
ON public.website_contact 
FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert contact content" 
ON public.website_contact 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');