import React, { useState } from 'react';
import Reveal from '../../motion/Reveal';
import './Contact.css';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '310fc2ee-92ae-4ca9-8701-921b48cd868a',
          from_name: 'Portfolio Contact',
          ...form,
        }),
      });
      const data = await res.json();
      setStatus(data.success ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section contact" data-section="contact">
      <div className="container">

        <Reveal>
          <div className="section-tag">
            <span className="tag-number text-mono">06</span>
            <span className="tag-label">Contact</span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="dwg-sheet">

            {/* ── Sheet border marks ── */}
            <div className="dwg-mark dwg-mark--tl" />
            <div className="dwg-mark dwg-mark--tr" />
            <div className="dwg-mark dwg-mark--bl" />
            <div className="dwg-mark dwg-mark--br" />
            <div className="dwg-center dwg-center--t" />
            <div className="dwg-center dwg-center--b" />
            <div className="dwg-center dwg-center--l" />
            <div className="dwg-center dwg-center--r" />

            <div className="dwg-inner">

              {/* ── Left: form area ── */}
              <div className="dwg-main">
                <div className="dwg-zone-label text-mono">// TRANSMISSION FORM · REQ-01</div>

                {status === 'sent' ? (
                  <div className="dwg-confirmed">
                    <p className="text-mono dwg-confirmed-title">APPROVED & TRANSMITTED</p>
                    <p className="text-mono dwg-confirmed-sub">Response within 24h · DWG SM-CTCT-001 · REV A</p>
                  </div>
                ) : (
                  <form className="dwg-form" onSubmit={handleSubmit} noValidate>

                    <div className="dwg-row">
                      <div className="dwg-field">
                        <div className="dwg-annotation">
                          <span className="dwg-dim-label text-mono">SENDER_ID</span>
                          <span className="dwg-dim-line" />
                        </div>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="your name"
                          required
                          className="dwg-input text-mono"
                          autoComplete="name"
                        />
                      </div>
                      <div className="dwg-field">
                        <div className="dwg-annotation">
                          <span className="dwg-dim-label text-mono">REPLY_ADDR</span>
                          <span className="dwg-dim-line" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          required
                          className="dwg-input text-mono"
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    <div className="dwg-field">
                      <div className="dwg-annotation">
                        <span className="dwg-dim-label text-mono">INQUIRY_TYPE</span>
                        <span className="dwg-dim-line" />
                      </div>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className="dwg-input dwg-select text-mono"
                      >
                        <option value="">SELECT TYPE</option>
                        <option value="Job Opportunity">ROLE INQUIRY</option>
                        <option value="Research Collaboration">COLLAB REQUEST</option>
                        <option value="Project Inquiry">PROJECT BRIEF</option>
                        <option value="General Question">GENERAL COMM</option>
                      </select>
                    </div>

                    <div className="dwg-field dwg-field--tall">
                      <div className="dwg-annotation">
                        <span className="dwg-dim-label text-mono">MESSAGE_BODY</span>
                        <span className="dwg-dim-line" />
                      </div>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="describe your inquiry..."
                        required
                        rows={5}
                        className="dwg-input dwg-textarea text-mono"
                      />
                    </div>

                    <div className="dwg-submit-row">
                      <button
                        type="submit"
                        className="dwg-submit text-mono"
                        disabled={status === 'sending'}
                      >
                        {status === 'sending' ? '■  PROCESSING...' : '▷  RELEASE FOR REVIEW'}
                      </button>
                      {status === 'error' && (
                        <span className="dwg-error text-mono">
                          ECR FAILED — contact shatayumehta.2000@gmail.com directly
                        </span>
                      )}
                    </div>

                  </form>
                )}
              </div>

              {/* ── Right: notes + title block ── */}
              <div className="dwg-right">

                <div className="dwg-notes">
                  <span className="dwg-notes-header text-mono">GENERAL NOTES:</span>
                  <ol className="dwg-notes-list">
                    <li className="text-mono">RESPONSE TIME &lt; 24 HOURS</li>
                    <li className="text-mono">ALL FIELDS REQUIRED</li>
                    <li className="text-mono">OPEN TO FULL-TIME &amp; RESEARCH ROLES</li>
                  </ol>

                  <div className="dwg-channels">
                    <span className="dwg-channels-label text-mono">DIRECT CHANNELS:</span>
                    <a href="mailto:shatayumehta.2000@gmail.com" className="dwg-channel text-mono">
                      <span className="dwg-ch-ref">REF-01</span> EMAIL ↗
                    </a>
                    <a href="https://www.linkedin.com/in/shatayumehta" target="_blank" rel="noopener noreferrer" className="dwg-channel text-mono">
                      <span className="dwg-ch-ref">REF-02</span> LINKEDIN ↗
                    </a>
                    <a href="https://github.com/shatayu-mehta" target="_blank" rel="noopener noreferrer" className="dwg-channel text-mono">
                      <span className="dwg-ch-ref">REF-03</span> GITHUB ↗
                    </a>
                    <a href="/ROBOTICS_ENGINEER_SHATAYU_MEHTA.pdf" target="_blank" rel="noopener noreferrer" className="dwg-channel text-mono">
                      <span className="dwg-ch-ref">REF-04</span> RESUME ↗
                    </a>
                  </div>
                </div>

                {/* Title block */}
                <div className="title-block">
                  <div className="tb-company">
                    <span className="tb-company-name text-mono">S. MEHTA ENGINEERING</span>
                    <span className="tb-company-sub text-mono">ROBOTICS · CAD · AUTONOMOUS SYSTEMS</span>
                  </div>
                  <div className="tb-row">
                    <span className="tb-key text-mono">DESIGNED BY</span>
                    <span className="tb-val text-mono">SHATAYU MEHTA</span>
                  </div>
                  <div className="tb-row">
                    <span className="tb-key text-mono">INSTITUTION</span>
                    <span className="tb-val text-mono">UNIVERSITY OF MINNESOTA</span>
                  </div>
                  <div className="tb-row">
                    <span className="tb-key text-mono">DWG NO.</span>
                    <span className="tb-val text-mono">SM-CTCT-001</span>
                  </div>
                  <div className="tb-row">
                    <span className="tb-key text-mono">STATUS</span>
                    <span className="tb-val text-mono tb-status">OPEN TO WORK</span>
                  </div>
                  <div className="tb-row">
                    <span className="tb-key text-mono">SHEET</span>
                    <span className="tb-val text-mono">1 OF 1</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </Reveal>

      </div>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p className="footer-copy">&copy; {new Date().getFullYear()} Shatayu Mehta — Robotics Engineer</p>
          <p className="footer-stack text-mono">React · Three.js · Framer Motion · Vite</p>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
