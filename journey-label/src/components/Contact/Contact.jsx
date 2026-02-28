import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Contact.css'

const Contact = () => {
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

    return (
        <section className="contact" id="contact" ref={ref}>
            <div className="contact-bg">
                <img src="/images/contact-bg.jpg" alt="" loading="lazy" />
                <div className="contact-bg-overlay" />
            </div>

            <div className="contact-inner">
                <motion.div
                    className="contact-content"
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="section-label" style={{ justifyContent: 'center' }}>
                        <span className="section-line" />
                        <span>Get in Touch</span>
                    </div>

                    <h2 className="contact-heading">
                        Ready to Begin Your
                        <br />
                        <em>Extraordinary Journey?</em>
                    </h2>

                    <p className="contact-text">
                        Our luxury travel experts are ready to curate your perfect journey.
                        Share your vision and let us transform it into reality.
                    </p>

                    <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-row">
                            <input type="text" placeholder="First Name" className="form-input" />
                            <input type="text" placeholder="Last Name" className="form-input" />
                        </div>
                        <input type="email" placeholder="Email Address" className="form-input" />
                        <input type="tel" placeholder="Phone Number" className="form-input" />
                        <textarea
                            placeholder="Tell us about your dream journey..."
                            className="form-textarea"
                            rows="4"
                        />
                        <button type="submit" className="form-submit">
                            Send Enquiry
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    )
}

export default Contact
