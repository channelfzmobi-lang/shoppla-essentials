-- Create a public storage bucket for product media
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-media',
  'product-media',
  true,
  52428800,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm', 'video/quicktime', 'application/pdf']
);

-- Allow anyone to upload files
CREATE POLICY "Anyone can upload product media"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'product-media');

-- Allow anyone to view files
CREATE POLICY "Anyone can view product media"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'product-media');

-- Allow anyone to update files
CREATE POLICY "Anyone can update product media"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'product-media');

-- Allow anyone to delete files
CREATE POLICY "Anyone can delete product media"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'product-media');