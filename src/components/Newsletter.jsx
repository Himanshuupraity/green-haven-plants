import { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import Reveal from './Reveal';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const submit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    setTimeout(() => setStatus('success'), 700);
  };

  return (
    <section className="newsletter">
      <div className="container">
        <Reveal className="newsletter__card">
          <div className="newsletter__leaf newsletter__leaf--1" aria-hidden="true" />
          <div className="newsletter__leaf newsletter__leaf--2" aria-hidden="true" />
          <span className="eyebrow eyebrow--light">Join the Verdora community</span>
          <h2>Let’s Grow Something Beautiful Together</h2>
          <p>
            Subscribe for seasonal plant-care tips, early access to new arrivals and members-only offers. No spam —
            just good green things.
          </p>
          {status === 'success' ? (
            <div className="newsletter__success">
              <CheckCircle2 size={22} />
              <span>
                You’re in! Your 15% welcome code <strong>GREEN15</strong> is on its way to {email}.
              </span>
            </div>
          ) : (
            <form className="newsletter__form" onSubmit={submit} noValidate>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Enter your email address"
                aria-label="Email address"
                aria-invalid={status === 'error'}
              />
              <button className="btn btn--gold" disabled={status === 'loading'}>
                {status === 'loading' ? 'Subscribing…' : (<>Subscribe <Send size={16} /></>)}
              </button>
            </form>
          )}
          {status === 'error' && <p className="newsletter__error">Please enter a valid email address.</p>}
        </Reveal>
      </div>
    </section>
  );
}
