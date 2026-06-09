import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { createClient } from 'npm:@supabase/supabase-js@2'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  try {
    const SECRET = Deno.env.get('PAYSTACK_SECRET_KEY')
    if (!SECRET) throw new Error('PAYSTACK_SECRET_KEY not configured')
    const url = new URL(req.url)
    let reference = url.searchParams.get('reference') || url.searchParams.get('trxref')
    let orderId: string | null = null
    if (!reference && req.method === 'POST') {
      const body = await req.json().catch(() => ({}))
      reference = body.reference || body.trxref
      orderId = body.order_id || null
    }
    if (!reference) throw new Error('reference required')

    const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${SECRET}` },
    })
    const data = await res.json()
    const success = data?.data?.status === 'success'

    if (success && orderId) {
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      )
      await supabase
        .from('orders')
        .update({
          status: 'paid',
          payment_method: `Paystack · ${reference}`,
        })
        .eq('id', orderId)
    }

    return new Response(JSON.stringify({ success, data: data?.data || null, message: data?.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (e) {
    return new Response(JSON.stringify({ success: false, message: String(e?.message || e) }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
