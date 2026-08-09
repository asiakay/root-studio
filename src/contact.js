document.querySelectorAll('form[data-contact]').forEach(form => {
  const btn = form.querySelector('button[type="submit"]')
  const originalBtnText = btn?.textContent || 'Send'

  const setStatus = (msg, isError = false) => {
    let el = form.querySelector('.form-status')
    if (!el) {
      el = document.createElement('p')
      el.className = 'form-status'
      form.appendChild(el)
    }
    el.textContent = msg
    el.style.cssText = [
      'margin-top:0.8rem',
      'font-family:IBM Plex Mono,monospace',
      'font-size:0.72rem',
      'letter-spacing:0.04em',
      isError ? 'color:#C77B4C' : 'color:#C9A24B',
    ].join(';')
  }

  form.addEventListener('submit', async e => {
    e.preventDefault()
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…' }

    const data = Object.fromEntries(new FormData(form))
    data.contact_type = form.dataset.contact

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const payload = await res.json()

      if (payload.ok) {
        form.reset()
        setStatus('Message sent — we\'ll be in touch.')
        if (btn) btn.textContent = originalBtnText
      } else {
        setStatus(payload.error || 'Something went wrong. Please try again.', true)
        if (btn) { btn.disabled = false; btn.textContent = originalBtnText }
      }
    } catch {
      setStatus('Network error. Please try again.', true)
      if (btn) { btn.disabled = false; btn.textContent = originalBtnText }
    }
  })
})
