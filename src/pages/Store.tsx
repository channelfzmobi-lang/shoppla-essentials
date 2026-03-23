import { useEffect, useRef } from 'react'

/**
 * Store page — renders the full Shoppla storefront.
 *
 * The HTML file lives at /public/store.html and is served as a static asset.
 * It runs as a full SPA inside this iframe, sharing localStorage with the
 * admin panel (same origin = same storage = live sync between both).
 *
 * Products, orders, cart, wishlist and settings saved in the admin are
 * immediately visible here — no backend or API calls needed.
 */
export default function Store() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Keep iframe height = visual viewport (handles mobile address-bar resize)
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

  return (
    <iframe
      ref={iframeRef}
      src="/store.html"
      title="Shoppla Store"
      style={{
        display: 'block',
        width: '100%',
        height: '100vh',
        border: 'none',
        overflow: 'hidden',
        background: '#faf8f4',
      }}
      allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
    />
  )
}
