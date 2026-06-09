import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  try {
    const SECRET = Deno.env.get('PAYSTACK_SECRET_KEY')
    if (!SECRET) throw new Error('PAYSTACK_SECRET_KEY not configured')
    const { email, amount, currency, reference, metadata, callback_url } = await req.json()
    if (!email || !amount) throw new Error('email and amount required')
    // Paystack expects amount in kobo (NGN) / cents (other currencies) - lowest denomination
    const amountMinor = Math.round(Number(amount) * 100)
    const res = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SECRET}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: amountMinor,
        currency: currency || 'NGN',
        reference,
        metadata,
        callback_url,
      }),
    })
    const data = await res.json()
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: res.ok ? 200 : 400,
    })
  } catch (e) {
    return new Response(JSON.stringify({ status: false, message: String(e?.message || e) }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
