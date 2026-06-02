import React, { useEffect, useState } from 'react';
import colors from '../../constants/colors';
import { contact, identity } from '../../data/info';

export interface ContactProps {}

const CONTACT_API = process.env.REACT_APP_CONTACT_API || '/api/send-email';

const validateEmail = (email: string) => {
    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const CONTACT_ROWS = [
    { icon: '✉', label: 'Email', value: null, link: `mailto:${contact.email}`, display: contact.email },
    { icon: '☎', label: 'Phone', value: contact.phone, link: null, display: null },
    { icon: '📍', label: 'Location', value: 'Gisenyi, Rwanda', link: null, display: null },
    { icon: '▶', label: 'YouTube', value: null, link: contact.youtube, display: '@callme_nour' },
    { icon: '', label: 'App Store', value: null, link: contact.appStore, display: 'Mahamat Abdoulaye Annour' },
];

const Contact: React.FC<ContactProps> = () => {
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formMessage, setFormMessage] = useState('');
    const [formMessageColor, setFormMessageColor] = useState('');

    useEffect(() => {
        setIsFormValid(validateEmail(email) && name.length > 0 && message.length > 0);
    }, [email, name, message]);

    async function submitForm() {
        if (!isFormValid) {
            setFormMessage('Please fill in all required fields.');
            setFormMessageColor('#E81123');
            return;
        }
        try {
            setIsLoading(true);
            const res = await fetch(CONTACT_API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ company, email, name, message }),
            });
            const data = (await res.json()) as { message?: string };
            if (res.ok && data.message === 'success') {
                setFormMessage(`Message sent. Thank you, ${name}!`);
                setFormMessageColor(colors.accentPrimary);
                setCompany(''); setEmail(''); setName(''); setMessage('');
            } else {
                setFormMessage('Could not send. Please try again or email directly.');
                setFormMessageColor('#E81123');
            }
        } catch {
            setFormMessage('Could not send. Please try again or email directly.');
            setFormMessageColor('#E81123');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!formMessage) return;
        const t = setTimeout(() => { setFormMessage(''); setFormMessageColor(''); }, 5000);
        return () => clearTimeout(t);
    }, [formMessage]);

    return (
        <div className="site-page-content">
            <div style={styles.pageHeader}>
                <p style={styles.eyebrow}>Get in touch</p>
                <h1 style={styles.pageTitle}>Contact</h1>
                <p style={styles.pageSubtitle}>{identity.availability}</p>
            </div>

            <div style={styles.twoCol}>
                {/* Left: contact details */}
                <div style={styles.contactDetails}>
                    <p style={styles.sectionLabel}>Reach me at</p>
                    <div style={styles.contactList}>
                        {CONTACT_ROWS.map((row) => (
                            <div key={row.label} className="contact-row">
                                <div className="contact-row__icon">{row.icon}</div>
                                {row.link ? (
                                    <a
                                        href={row.link}
                                        rel="noreferrer"
                                        target={row.link.startsWith('mailto') ? undefined : '_blank'}
                                        className="contact-row__link"
                                    >
                                        {row.display || row.value}
                                    </a>
                                ) : (
                                    <span className="contact-row__value">{row.value}</span>
                                )}
                            </div>
                        ))}
                    </div>

                    <div style={styles.socialRow}>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href={contact.github}
                            style={styles.socialLink}
                        >
                            <span style={styles.socialIcon}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </span>
                            GitHub
                        </a>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href={contact.linkedin}
                            style={styles.socialLink}
                        >
                            <span style={styles.socialIcon}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </span>
                            LinkedIn
                        </a>
                    </div>
                </div>

                {/* Right: form */}
                <div style={styles.formCol}>
                    <p style={styles.sectionLabel}>Send a message</p>
                    <div style={styles.form}>
                        <div style={styles.formRow}>
                            <div style={styles.formGroup}>
                                <label style={styles.formLabel}>
                                    Name <span style={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.formLabel}>
                                    Email <span style={styles.required}>*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.formLabel}>Company</label>
                            <input
                                type="text"
                                name="company"
                                placeholder="Company (optional)"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.formLabel}>
                                Message <span style={styles.required}>*</span>
                            </label>
                            <textarea
                                name="message"
                                placeholder="Tell me about your project…"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                        <div style={styles.formFooter}>
                            <button
                                className="site-button"
                                type="submit"
                                disabled={!isFormValid || isLoading}
                                onMouseDown={submitForm}
                            >
                                {isLoading ? <span className="loading">Sending</span> : 'Send message'}
                            </button>
                            {formMessage && (
                                <p style={Object.assign({}, styles.formFeedback, { color: formMessageColor })}>
                                    {formMessage}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    pageHeader: {
        flexDirection: 'column',
        gap: 6,
        marginBottom: 28,
        paddingBottom: 24,
        borderBottom: '0.5px solid rgba(0,0,0,0.07)',
    },
    eyebrow: {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 11,
        letterSpacing: '0.09em',
        color: '#0078D4',
    },
    pageTitle: {
        fontSize: 34,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: 'rgba(17,24,39,0.94)',
        lineHeight: 1.1,
    },
    pageSubtitle: {
        fontSize: 13,
        color: 'rgba(32,32,32,0.54)',
    },
    twoCol: {
        display: 'grid',
        gridTemplateColumns: '1fr 1.4fr',
        gap: 32,
        alignItems: 'start',
    },
    contactDetails: {
        flexDirection: 'column',
        gap: 16,
    },
    sectionLabel: {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 10,
        color: 'rgba(32,32,32,0.40)',
        letterSpacing: '0.09em',
        textTransform: 'uppercase',
        marginBottom: 6,
    },
    contactList: {
        flexDirection: 'column',
        width: '100%',
    },
    socialRow: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 4,
        flexWrap: 'wrap',
    },
    socialLink: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 12px',
        background: 'rgba(255,255,255,0.70)',
        border: '0.5px solid rgba(0,0,0,0.08)',
        borderRadius: 8,
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 11,
        color: 'rgba(32,32,32,0.72)',
        textDecoration: 'none',
        transition: 'background 0.12s ease, border-color 0.12s ease',
    },
    socialIcon: {
        display: 'flex',
        alignItems: 'center',
        color: 'rgba(32,32,32,0.54)',
    },
    formCol: {
        flexDirection: 'column',
        gap: 0,
    },
    form: {
        flexDirection: 'column',
        gap: 12,
    },
    formRow: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 10,
    },
    formGroup: {
        flexDirection: 'column',
        gap: 4,
    },
    formLabel: {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 10,
        letterSpacing: '0.07em',
        color: 'rgba(32,32,32,0.52)',
        textTransform: 'uppercase',
    },
    required: {
        color: '#E81123',
        marginLeft: 2,
    },
    formFooter: {
        flexDirection: 'column',
        gap: 8,
        marginTop: 4,
    },
    formFeedback: {
        fontSize: 12,
        fontFamily: "'IBM Plex Mono', monospace",
        letterSpacing: '0.02em',
    },
};

export default Contact;
