
-- Categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  icon TEXT DEFAULT '📦',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT DEFAULT '',
  category TEXT DEFAULT '',
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  was_price NUMERIC(10,2) DEFAULT 0,
  stock INT DEFAULT 10,
  description TEXT DEFAULT '',
  colors TEXT DEFAULT '',
  sizes TEXT DEFAULT '',
  video_url TEXT DEFAULT '',
  video_data JSONB DEFAULT NULL,
  images JSONB DEFAULT '[]'::jsonb,
  installment TEXT DEFAULT '',
  delivery_info TEXT DEFAULT '',
  shipping_notes TEXT DEFAULT '',
  return_days TEXT DEFAULT '30 days',
  warranty TEXT DEFAULT '',
  return_policy TEXT DEFAULT '',
  media_fit TEXT DEFAULT 'cover',
  media_height_desktop INT DEFAULT 640,
  media_height_mobile INT DEFAULT 320,
  page_color TEXT DEFAULT '#ffffff',
  status TEXT DEFAULT 'active',
  featured BOOLEAN DEFAULT false,
  icon TEXT DEFAULT '📦',
  content_sections JSONB DEFAULT '[]'::jsonb,
  checkout_method TEXT DEFAULT 'standard',
  payment_route TEXT DEFAULT 'pod',
  form_config JSONB DEFAULT '{}'::jsonb,
  ty_config JSONB DEFAULT '{}'::jsonb,
  gateway_config JSONB DEFAULT '{}'::jsonb,
  agent_id INT DEFAULT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number SERIAL,
  customer TEXT NOT NULL DEFAULT '',
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  address TEXT DEFAULT '',
  city TEXT DEFAULT '',
  products_text TEXT DEFAULT '',
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  qty INT DEFAULT 1,
  color TEXT DEFAULT '',
  size TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  total NUMERIC(10,2) DEFAULT 0,
  status TEXT DEFAULT 'pending',
  payment_method TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Agents table
CREATE TABLE public.agents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  whatsapp TEXT DEFAULT '',
  zoom TEXT DEFAULT '',
  email TEXT DEFAULT '',
  avatar TEXT DEFAULT '',
  avatar_color TEXT DEFAULT '#e8541a',
  avatar_img TEXT DEFAULT '',
  availability TEXT DEFAULT '',
  status TEXT DEFAULT 'online',
  bio TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Store settings table
CREATE TABLE public.store_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables (public-facing store, no auth yet)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;

-- Public read policies (storefront needs to read)
CREATE POLICY "Anyone can read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Anyone can read active products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Anyone can read agents" ON public.agents FOR SELECT USING (true);
CREATE POLICY "Anyone can read store settings" ON public.store_settings FOR SELECT USING (true);

-- Public write policies (admin panel without auth for now)
CREATE POLICY "Anyone can insert products" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update products" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete products" ON public.products FOR DELETE USING (true);

CREATE POLICY "Anyone can insert categories" ON public.categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update categories" ON public.categories FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete categories" ON public.categories FOR DELETE USING (true);

CREATE POLICY "Anyone can manage agents" ON public.agents FOR ALL USING (true);

CREATE POLICY "Anyone can manage settings" ON public.store_settings FOR ALL USING (true);

CREATE POLICY "Anyone can insert orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Anyone can update orders" ON public.orders FOR UPDATE USING (true);

-- Seed default categories
INSERT INTO public.categories (name, icon, sort_order) VALUES
  ('Furniture', '🛋️', 1),
  ('Electronics', '📱', 2),
  ('Fashion', '👗', 3),
  ('Kitchen', '🍳', 4),
  ('Bedding', '🛏️', 5),
  ('Lighting', '💡', 6),
  ('Outdoor', '🌿', 7),
  ('Beauty', '💄', 8),
  ('Sports', '🏋️', 9);
