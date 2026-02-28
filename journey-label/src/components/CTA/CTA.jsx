import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import './CTA.css'

const CTA = () => {
    const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })

    return (
        <section className="cta-section" id="contact" ref={ref}>
            <div className="cta-bg">
                <img src="/images/contact-bg.jpg" alt="" loading="lazy" />
                <div className="cta-bg-overlay" />
            </div>

            <motion.div
                className="cta-content"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
            >
                <h2 className="cta-heading">
                    Every Journey Begins<br /><em>With a Conversation</em>
                </h2>
                <p className="cta-text">
                    Share your vision with our travel architects. Together, we’ll design
                    something that feels unmistakably yours.
                </p>
                <Link to="/enquiry" className="cta-btn">Begin the Conversation</Link>
            </motion.div>
        </section>
    )
}

export default CTA
