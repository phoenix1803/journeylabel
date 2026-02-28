import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import './Spotlight.css'

const Spotlight = () => {
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

    return (
        <section className="spotlight" ref={ref}>
            <div className="spotlight-bg">
                <img src="/images/nsw-spotlight.jpg" alt="New South Wales" />
                <div className="spotlight-overlay" />
            </div>

            <motion.div
                className="spotlight-content"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            >
                <span className="spotlight-label">Destination Spotlight</span>
                <h2 className="spotlight-title">New South Wales</h2>
                <p className="spotlight-subtitle">
                    Shared moments &amp; experiences that stay with you long after the journey ends.
                </p>
                <p className="spotlight-desc">
                    Our New South Wales itineraries blend discovery &amp; meaningful encounters
                    across coastlines &amp; nature-rich escapes.
                </p>
                <Link to="/destinations/new-south-wales" className="spotlight-btn">
                    Discuss Your Journey
                </Link>
            </motion.div>
        </section>
    )
}

export default Spotlight
