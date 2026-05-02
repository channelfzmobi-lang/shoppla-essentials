ALTER TABLE public.products
  ALTER COLUMN agent_id TYPE uuid USING NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'products_agent_id_fkey'
      AND conrelid = 'public.products'::regclass
  ) THEN
    ALTER TABLE public.products
      ADD CONSTRAINT products_agent_id_fkey
      FOREIGN KEY (agent_id) REFERENCES public.agents(id) ON DELETE SET NULL;
  END IF;
END $$;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.agents;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.reviews;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE OR REPLACE VIEW public.agent_delivered_sales
WITH (security_invoker=on) AS
SELECT
  a.id AS agent_id,
  a.name AS agent_name,
  a.role AS agent_role,
  p.id AS product_id,
  p.name AS product_name,
  COUNT(o.id) AS delivered_orders,
  COALESCE(SUM(o.total), 0) AS delivered_revenue,
  COALESCE(SUM(o.qty), 0) AS delivered_units,
  MAX(o.created_at) AS last_delivered_at
FROM public.agents a
JOIN public.products p ON p.agent_id = a.id
LEFT JOIN public.orders o ON o.product_id = p.id AND o.status = 'delivered'
GROUP BY a.id, a.name, a.role, p.id, p.name;