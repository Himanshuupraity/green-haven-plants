import { useState } from 'react';
import { CheckCircle2, ChevronDown, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import Reveal from '../components/Reveal';
import { faqs, IMAGES } from '../data/content';
import { DEMO_CONTACT } from '../utils/format';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [open, setOpen] = useState(0);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  return (
    <div className="container page-pad">
      <Breadcrumb items={[{ label: 'Contact' }]} />
      <div className="contact">
        <div>
          <span className="eyebrow">We’d love to hear from you</span>
          <h1 className="page-title">Get in Touch</h1>
          <p className="lead">Questions about a plant, bulk orders for offices, or gifting? Our plant experts usually reply within a few hours.</p>
          <ul className="contact__list">
            <li><MapPin size={20} /><div><strong>Visit our studio</strong><span>{DEMO_CONTACT.address}</span></div></li>
            <li><Phone size={20} /><div><strong>Call us</strong><span>{DEMO_CONTACT.phone}</span></div></li>
            <li><Mail size={20} /><div><strong>Email</strong><span>{DEMO_CONTACT.email}</span></div></li>
            <li><Clock size={20} /><div><strong>Hours</strong><span>Mon – Sat, 9:00 AM – 7:00 PM</span></div></li>
          </ul>
          <p className="demo-tag demo-tag--block">All contact details shown are demo placeholders.</p>
          <a className="btn btn--outline" href={`https://wa.me/${DEMO_CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={16} /> Chat on WhatsApp
          </a>
        </div>

        <Reveal className="contact__card">
          {sent ? (
            <div className="contact__sent">
              <CheckCircle2 size={40} />
              <h3>Message sent!</h3>
              <p>Thanks {form.name.split(' ')[0]}, we’ll get back to you at {form.email} soon. (Demo — no message was actually sent.)</p>
              <button className="btn btn--outline" onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}>Send another</button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <h3>Send us a message</h3>
              <label className="field"><span>Your name</span><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
              <label className="field"><span>Email</span><input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
              <label className="field"><span>Message</span><textarea rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></label>
              <button className="btn btn--primary btn--lg btn--block">Send Message</button>
            </form>
          )}
          <img src={IMAGES.contact} alt="" className="contact__img" />
        </Reveal>
      </div>

      <section id="faq" className="faq">
        <h2>Frequently Asked Questions</h2>
        {faqs.map((f, i) => (
          <div key={f.q} className={`faq__item ${open === i ? 'is-open' : ''}`}>
            <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
              {f.q} <ChevronDown size={18} />
            </button>
            <div className="faq__answer"><p>{f.a}</p></div>
          </div>
        ))}
      </section>
    </div>
  );
}
