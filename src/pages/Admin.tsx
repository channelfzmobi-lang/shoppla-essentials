import { useEffect, useRef, useState } from 'react'

/**
 * Admin page — renders the Shoppla admin dashboard.
 *
 * Accessible at /admin. The HTML file lives at /public/admin.html.
 *
 * PASSWORD PROTECTION (optional):
 * Set the environment variable VITE_ADMIN_PASSWORD in your hosting dashboard
 * (Netlify / Vercel / Lovable env vars). If set, visitors must enter the
 * password before the admin loads. Leave unset to skip the gate.
 *
 * Lovable env vars: Project Settings → Environment Variables
 * Netlify:          Site Settings → Environment Variables
 * Vercel:           Project Settings → Environment Variables
 */

const ADMIN_PW = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined

function useAuth() {
  const required = !!ADMIN_PW
  const [authed, setAuthed] = useState(() => {
    if (!required) return true
    return sessionStorage.getItem('shoppla_admin_authed') === '1'
  })
  const login = (pw: string) => {
    if (pw === ADMIN_PW) {
      sessionStorage.setItem('shoppla_admin_authed', '1')
      setAuthed(true)
      return true
    }
    return false
  }
  return { required, authed, login }
}

function PasswordGate({ onLogin }: { onLogin: (pw: string) => boolean }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!onLogin(pw)) { setErr(true); setPw('') }
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '100vh', background: '#100e0b', fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{
        background: '#fff', borderRadius: 18, padding: '44px 40px',
        maxWidth: 400, width: '90%', textAlign: 'center',
        boxShadow: '0 24px 64px rgba(0,0,0,.4)',
      }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🔒</div>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 26, fontWeight: 900, marginBottom: 8 }}>
          Admin Access
        </h1>
        <p style={{ color: '#8a8480', fontSize: 14, marginBottom: 28, lineHeight: 1.6 }}>
          Enter your admin password to manage<br />products, orders and settings.
        </p>
        <form onSubmit={submit}>
          <input
            type="password"
            value={pw}
            onChange={e => { setPw(e.target.value); setErr(false) }}
            placeholder="Password"
            autoFocus
            style={{
              width: '100%', border: `1.5px solid ${err ? '#dc2626' : '#e5e0d6'}`,
              borderRadius: 10, padding: '13px 16px', fontSize: 15,
              outline: 'none', marginBottom: err ? 8 : 14,
              fontFamily: 'inherit', background: '#faf9f7',
            }}
          />
          {err && (
            <p style={{ color: '#dc2626', fontSize: 13, marginBottom: 12 }}>
              Incorrect password — try again
            </p>
          )}
          <button
            type="submit"
            style={{
              width: '100%', background: '#e8541a', color: '#fff',
              border: 'none', borderRadius: 10, padding: '14px',
              fontSize: 15, fontWeight: 700, cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Enter Admin →
          </button>
        </form>
      </div>
    </div>
  )
}

export default function Admin() {
  const { required, authed, login } = useAuth()
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const resize = () => {
      if (iframeRef.current) {
        iframeRef.current.style.height = `${window.innerHeight}px`
      }
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  if (required && !authed) {
    return <PasswordGate onLogin={login} />
  }

  return (
    <iframe
      ref={iframeRef}
      src="/admin.html"
      title="Shoppla Admin"
      style={{
        display: 'block',
        width: '100%',
        height: '100vh',
        border: 'none',
        overflow: 'hidden',
        background: '#f5f4f0',
      }}
      allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
    />
  )
}
