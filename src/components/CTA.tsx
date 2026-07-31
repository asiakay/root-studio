import { useState, useRef, type FormEvent } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

const CTA = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      project_type: (form.elements.namedItem('project_type') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      website: (form.elements.namedItem('website') as HTMLInputElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const payload = await res.json() as { ok?: boolean; error?: string };

      if (!res.ok) {
        setErrorMsg(payload.error ?? 'Something went wrong. Please try again.');
        setStatus('error');
      } else {
        formRef.current?.reset();
        setStatus('success');
      }
    } catch {
      setErrorMsg('Network error — please check your connection and try again.');
      setStatus('error');
    }
  };

  return (
    <section className="cta" id="contact">
      <h2>Ready to get your work in front of the people it's for?</h2>
      <p className="cta-sub">Tell us what you're working on — we'll take it from there.</p>

      {status === 'success' ? (
        <div className="form-success" role="status">
          <p>Message sent. We'll be in touch soon.</p>
        </div>
      ) : (
        <form
          ref={formRef}
          className="contact-form"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Honeypot — visually hidden, skipped by keyboard and screen readers */}
          <div className="form-honeypot" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="cf-name">Name</label>
              <input
                type="text"
                id="cf-name"
                name="name"
                required
                autoComplete="name"
                placeholder="Your name"
                disabled={status === 'loading'}
              />
            </div>

            <div className="form-field">
              <label htmlFor="cf-email">Email</label>
              <input
                type="email"
                id="cf-email"
                name="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                disabled={status === 'loading'}
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="cf-project-type">Project type</label>
            <select
              id="cf-project-type"
              name="project_type"
              required
              defaultValue=""
              disabled={status === 'loading'}
            >
              <option value="" disabled>Select one…</option>
              <option value="web">Web</option>
              <option value="brand">Brand</option>
              <option value="strategy">Strategy</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="cf-message">Message</label>
            <textarea
              id="cf-message"
              name="message"
              required
              rows={5}
              placeholder="Tell us what you're building and where you're stuck — no deck required."
              disabled={status === 'loading'}
            />
          </div>

          {status === 'error' && (
            <p className="form-error" role="alert">{errorMsg}</p>
          )}

          <button
            type="submit"
            className="cta-btn"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Sending…' : 'Send message →'}
          </button>
        </form>
      )}
    </section>
  );
};

export default CTA;
