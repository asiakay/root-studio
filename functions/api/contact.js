const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_CONTACT_TYPES = new Set(['research', 'consulting']);

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request body.' }, 400);
  }

  const { name, email, message, contact_type, website } = body;

  // Honeypot — bots fill this in; real users never see it
  if (website) {
    return json({ ok: true });
  }

  // Validation
  if (!name?.trim())
    return json({ error: 'Name is required.' }, 400);
  if (!email?.trim() || !EMAIL_RE.test(email.trim()))
    return json({ error: 'A valid email address is required.' }, 400);
  if (!message?.trim())
    return json({ error: 'Message is required.' }, 400);
  if (!VALID_CONTACT_TYPES.has(contact_type))
    return json({ error: 'Invalid contact type.' }, 400);

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();

  // D1 insert — stores contact_type in project_type column until migration 0002 runs
  try {
    await env.DB.prepare(
      `INSERT INTO contact_submissions (name, email, project_type, message)
       VALUES (?, ?, ?, ?)`
    )
      .bind(cleanName, cleanEmail, contact_type, cleanMessage)
      .run();
  } catch (err) {
    console.error('D1 insert failed:', err);
    return json({ error: 'Failed to save your message. Please try again.' }, 500);
  }

  // Route email to the right inbox based on contact_type
  const toAddress = contact_type === 'consulting'
    ? 'sprints@rootstudiodeployed.com'
    : 'hello@rootstudiosystems.com';

  const resendKey = env.RESEND_API_KEY;

  if (resendKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Root Studio Systems <onboarding@resend.dev>',
          to: [toAddress],
          reply_to: cleanEmail,
          subject: `New ${contact_type} inquiry from ${cleanName}`,
          text: [
            `New ${contact_type} contact form submission`,
            ``,
            `Name:    ${cleanName}`,
            `Email:   ${cleanEmail}`,
            ``,
            `Message:`,
            cleanMessage,
          ].join('\n'),
        }),
      });

      if (!res.ok) {
        console.error('Resend error:', res.status, await res.text());
      }
    } catch (err) {
      console.error('Email notification failed (submission saved):', err);
    }
  }

  return json({ ok: true });
}

// CORS preflight for local dev
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
