import { useState, type FormEvent } from 'react';
import Section from './Section';
import styles from './Contact.module.css';

type Status = 'idle' | 'sending' | 'success' | 'error';

// Public key, can use it in client side code
const WEB3FORMS_ACCESS_KEY = '841c7dd9-43dc-4b3f-bf06-b8adb784fb72';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');

    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.append('access_key', WEB3FORMS_ACCESS_KEY);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Get in touch"
      description="Have a role in mind, or a question about a project? Send a message."
    >
      <div className={styles.layout}>
        {/* TODO: swap this for an image, illustration, or animation.
            Delete the placeholder div entirely once you have something. */}
        <div className={styles.visual} aria-hidden="true">
          <p className={styles.visualHint}>Add an image, illustration, or animation here</p>
        </div>

        <div className={styles.card}>
          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Honeypot — Web3Forms' documented convention: type="checkbox", name="botcheck".
                Hidden from real users; bots tend to fill in every field they find. */}
            <input
              type="checkbox"
              name="botcheck"
              className={styles.honeypot}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className={styles.field}>
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" required autoComplete="name" />
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required autoComplete="email" />
            </div>

            <div className={styles.field}>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={5} required />
            </div>

            <button type="submit" className={styles.submit} disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>

            <p className={styles.status} role="status" aria-live="polite">
              {status === 'success' && "Thanks — I'll get back to you soon."}
              {status === 'error' && 'Something went wrong — try again, or email me directly.'}
            </p>
          </form>
        </div>
      </div>
    </Section>
  );
}
