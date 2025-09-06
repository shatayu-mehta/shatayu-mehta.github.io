import React, { useState } from 'react';
import './Contact.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, we'll create a mailto link
    const mailtoLink = `mailto:mehta405@umn.edu?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      value: 'mehta405@umn.edu',
      link: 'mailto:mehta405@umn.edu',
      description: 'Best for detailed discussions and project inquiries'
    },
    {
      icon: '📱',
      title: 'Phone',
      value: '+1 (763) 245-3257',
      link: 'tel:+17632453257',
      description: 'For urgent matters and direct conversations'
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: 'linkedin.com/in/shatayumehta',
      link: 'https://www.linkedin.com/in/shatayumehta',
      description: 'Professional networking and career opportunities'
    },
    {
      icon: '📍',
      title: 'Location',
      value: 'Minneapolis, MN, USA',
      link: null,
      description: 'Available for local collaborations and meetings'
    }
  ];

  const interests = [
    'VTOL Aircraft Design',
    'Autonomous Systems',
    'Robotics Research',
    'Machine Learning Applications',
    'Aerospace Engineering',
    'Rapid Prototyping',
    'Startup Opportunities',
    'Academic Collaboration'
  ];

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact-content">
          <div className="contact-header">
            <div className="section-tag">
              <span className="tag-number text-mono">06</span>
              <span className="tag-label">Contact</span>
            </div>
            <h2 className="section-title">
              Let's <span className="gradient-text">Connect</span>
            </h2>
            <p className="section-subtitle">
              Ready to collaborate on innovative robotics projects or discuss exciting opportunities
            </p>
          </div>

          <div className="contact-main">
            <div className="contact-info">
              <div className="info-section">
                <h3 className="info-title">Get In Touch</h3>
                <p className="info-description">
                  I'm always excited to connect with fellow engineers, researchers, and innovators. 
                  Whether you have a project idea, collaboration opportunity, or just want to chat 
                  about robotics and technology, I'd love to hear from you.
                </p>

                <div className="contact-methods">
                  {contactMethods.map((method, index) => (
                    <div key={index} className="contact-method">
                      <div className="method-icon">{method.icon}</div>
                      <div className="method-content">
                        <h4 className="method-title">{method.title}</h4>
                        <p className="method-description">{method.description}</p>
                        {method.link ? (
                          <a 
                            href={method.link} 
                            className="method-link"
                            target={method.link.startsWith('http') ? '_blank' : '_self'}
                            rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                          >
                            {method.value}
                          </a>
                        ) : (
                          <span className="method-value">{method.value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="interests-section">
                <h3 className="interests-title">Areas of Interest</h3>
                <p className="interests-description">
                  Topics I'm particularly passionate about and always eager to discuss:
                </p>
                <div className="interests-grid">
                  {interests.map((interest, index) => (
                    <span key={index} className="interest-tag">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div className="availability-section">
                <h3 className="availability-title">Current Availability</h3>
                <div className="availability-content">
                  <div className="availability-item">
                    <div className="availability-icon">🎓</div>
                    <div className="availability-text">
                      <h4>Graduate Student</h4>
                      <p>Currently pursuing MS in Robotics at University of Minnesota</p>
                    </div>
                  </div>
                  <div className="availability-item">
                    <div className="availability-icon">💼</div>
                    <div className="availability-text">
                      <h4>Open for Opportunities</h4>
                      <p>Seeking internships, research positions, and collaborative projects</p>
                    </div>
                  </div>
                  <div className="availability-item">
                    <div className="availability-icon">🔬</div>
                    <div className="availability-text">
                      <h4>Research Focus</h4>
                      <p>Actively involved in robotics research and academic projects</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-section">
              <div className="form-container glass-card">
                <h3 className="form-title">Send a Message</h3>
                <p className="form-description">
                  Drop me a line and I'll get back to you as soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="Collaboration Opportunity">Collaboration Opportunity</option>
                      <option value="Internship/Job Opportunity">Internship/Job Opportunity</option>
                      <option value="Research Discussion">Research Discussion</option>
                      <option value="Project Consultation">Project Consultation</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="form-textarea"
                      placeholder="Tell me about your project, idea, or how we can work together..."
                      rows={6}
                      required
                    />
                  </div>

                  <button type="submit" className="form-submit btn btn-primary">
                    <span>Send Message</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M22 2L11 13" />
                      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  </button>
                </form>

                <div className="form-footer">
                  <p className="form-note">
                    <span className="note-icon">🔒</span>
                    Your information is secure and will only be used to respond to your inquiry.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-footer">
            <div className="footer-content">
              <div className="footer-text">
                <h3>Thank you for visiting!</h3>
                <p>
                  I appreciate your interest in my work. Let's build the future of robotics together.
                </p>
              </div>
              <div className="footer-links">
                <a href="/RESUME_S_A_M.pdf" target="_blank" className="footer-link">
                  <span>Download Resume</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7,10 12,15 17,10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/shatayumehta" target="_blank" className="footer-link">
                  <span>LinkedIn Profile</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="copyright">
              <p>&copy; 2024 Shatayu Mehta. Built with passion for innovation.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
