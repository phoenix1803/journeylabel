import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Enquiry.css'

const holidayThemes = [
    'Pursuit of Feeling', 'Feelings Engine', 'See You in the Moment',
    'Take Me On A Story', 'James Bond', 'Adventures', 'Beach', 'Blink',
    'Eclipse', 'Field Trip', 'Food', 'Get Lost', 'Safari', 'Unusual',
]

const specialOccasions = [
    'None', 'Anniversary', 'Birthday', 'Babymoon', 'Engagement',
    'Graduation', 'Honeymoon', 'Retirement', 'Valentine\'s Day', 'Wedding',
]

const Enquiry = () => {
    const [searchParams] = useSearchParams()

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        travelDate: '',
        numDays: '',
        destination: '',
        departureCity: '',
        holidayTheme: '',
        specialOccasion: '',
        numAdults: '2',
        numChildren: '0',
        numInfants: '0',
        message: '',
    })

    const [submitted, setSubmitted] = useState(false)

    // Auto-fill from URL params
    useEffect(() => {
        const dest = searchParams.get('destination')
        const theme = searchParams.get('theme')
        const occasion = searchParams.get('occasion')

        setForm(prev => ({
            ...prev,
            ...(dest && { destination: dest }),
            ...(theme && { holidayTheme: theme }),
            ...(occasion && { specialOccasion: occasion }),
        }))
    }, [searchParams])

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        // In production, this would send data to a backend
    }

    if (submitted) {
        return (
            <main className="enquiry-page">
                <div className="enquiry-success">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="enquiry-success-inner"
                    >
                        <div className="enquiry-success-icon">✓</div>
                        <h2>Thank You!</h2>
                        <p>Your enquiry has been received. Our luxury travel experts will be in touch within 24 hours.</p>
                    </motion.div>
                </div>
            </main>
        )
    }

    return (
        <main className="enquiry-page">
            {/* Hero */}
            <section className="enquiry-hero">
                <div className="enquiry-hero-bg">
                    <img src="/images/contact-bg.jpg" alt="Enquiry" />
                    <div className="enquiry-hero-overlay" />
                </div>
                <motion.div
                    className="enquiry-hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    <span className="enquiry-hero-label">Online Enquiry</span>
                    <h1>Tell Us About Your<br /><em>Dream Journey</em></h1>
                </motion.div>
            </section>

            {/* Form */}
            <section className="enquiry-form-section">
                <motion.form
                    className="enquiry-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {/* Guest Details */}
                    <div className="form-group-title">
                        <span className="form-group-num">01</span>
                        <h3>Guest Details</h3>
                    </div>
                    <div className="form-row">
                        <div className="form-field">
                            <label htmlFor="firstName">First Name *</label>
                            <input
                                type="text" id="firstName" name="firstName"
                                value={form.firstName} onChange={handleChange} required
                                placeholder="Your first name"
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="lastName">Last Name *</label>
                            <input
                                type="text" id="lastName" name="lastName"
                                value={form.lastName} onChange={handleChange} required
                                placeholder="Your last name"
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-field">
                            <label htmlFor="mobile">Mobile No *</label>
                            <input
                                type="tel" id="mobile" name="mobile"
                                value={form.mobile} onChange={handleChange} required
                                placeholder="+91 XXXXX XXXXX"
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="email">Email *</label>
                            <input
                                type="email" id="email" name="email"
                                value={form.email} onChange={handleChange} required
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    {/* Travel Details */}
                    <div className="form-group-title">
                        <span className="form-group-num">02</span>
                        <h3>Travel Details</h3>
                    </div>
                    <div className="form-row">
                        <div className="form-field">
                            <label htmlFor="travelDate">Travel Date</label>
                            <input
                                type="date" id="travelDate" name="travelDate"
                                value={form.travelDate} onChange={handleChange}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="numDays">No. of Days</label>
                            <input
                                type="number" id="numDays" name="numDays"
                                value={form.numDays} onChange={handleChange}
                                placeholder="e.g., 7" min="1"
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-field">
                            <label htmlFor="destination">Destination</label>
                            <input
                                type="text" id="destination" name="destination"
                                value={form.destination} onChange={handleChange}
                                placeholder="Where do you dream of going?"
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="departureCity">Departure City</label>
                            <input
                                type="text" id="departureCity" name="departureCity"
                                value={form.departureCity} onChange={handleChange}
                                placeholder="Mumbai, Delhi, etc."
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-field">
                            <label htmlFor="holidayTheme">Holiday Theme</label>
                            <select
                                id="holidayTheme" name="holidayTheme"
                                value={form.holidayTheme} onChange={handleChange}
                            >
                                <option value="">Select a theme</option>
                                {holidayThemes.map(t => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-field">
                            <label htmlFor="specialOccasion">Any Special Occasion</label>
                            <select
                                id="specialOccasion" name="specialOccasion"
                                value={form.specialOccasion} onChange={handleChange}
                            >
                                <option value="">Select occasion</option>
                                {specialOccasions.map(o => (
                                    <option key={o} value={o}>{o}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Traveller Details */}
                    <div className="form-group-title">
                        <span className="form-group-num">03</span>
                        <h3>Traveller Details</h3>
                    </div>
                    <div className="form-row form-row--three">
                        <div className="form-field">
                            <label htmlFor="numAdults">No. of Adults</label>
                            <select
                                id="numAdults" name="numAdults"
                                value={form.numAdults} onChange={handleChange}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                    <option key={n} value={n}>{n}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-field">
                            <label htmlFor="numChildren">No. of Children</label>
                            <select
                                id="numChildren" name="numChildren"
                                value={form.numChildren} onChange={handleChange}
                            >
                                {[0, 1, 2, 3, 4, 5, 6].map(n => (
                                    <option key={n} value={n}>{n}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-field">
                            <label htmlFor="numInfants">Infant (under 2)</label>
                            <select
                                id="numInfants" name="numInfants"
                                value={form.numInfants} onChange={handleChange}
                            >
                                {[0, 1, 2, 3, 4].map(n => (
                                    <option key={n} value={n}>{n}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Message */}
                    <div className="form-group-title">
                        <span className="form-group-num">04</span>
                        <h3>Your Message</h3>
                    </div>
                    <div className="form-field form-field--full">
                        <label htmlFor="message">Tell us, what brings you joy?</label>
                        <textarea
                            id="message" name="message" rows="5"
                            value={form.message} onChange={handleChange}
                            placeholder="Share your travel dreams, preferences, must-haves..."
                        />
                    </div>

                    <div className="form-submit">
                        <button type="submit" className="submit-btn">
                            Send Enquiry
                        </button>
                    </div>
                </motion.form>
            </section>
        </main>
    )
}

export default Enquiry
