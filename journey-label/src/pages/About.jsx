import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import './About.css'

const About = () => {
    const [ref1, inView1] = useInView({ threshold: 0.2, triggerOnce: true })
    const [ref2, inView2] = useInView({ threshold: 0.2, triggerOnce: true })
    const [ref3, inView3] = useInView({ threshold: 0.2, triggerOnce: true })

    return (
        <main className="about-page">
            {/* Hero banner */}
            <section className="about-hero">
                <div className="about-hero-bg">
                    <img src="/images/philosophy-1.jpg" alt="About JourneyLabel" />
                    <div className="about-hero-overlay" />
                </div>
                <motion.div
                    className="about-hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    <span className="about-hero-label">About Us</span>
                    <h1 className="about-hero-title">The Luxury Travel<br />Experts</h1>
                </motion.div>
            </section>

            {/* Story section */}
            <section className="about-story" ref={ref1}>
                <div className="about-story-inner">
                    <motion.div
                        className="about-story-text"
                        initial={{ opacity: 0, y: 40 }}
                        animate={inView1 ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="section-label">
                            <span className="section-line" />
                            <span>Our Story</span>
                        </div>
                        <h2>We believe travel should<br /><em>transform you.</em></h2>
                        <p>
                            JourneyLabel was born from a passion for extraordinary travel and a belief that
                            the world&apos;s most remarkable experiences should be accessible to those who seek them.
                            Founded in 2018, we have grown into India&apos;s most trusted luxury travel concierge,
                            serving discerning travellers who demand nothing less than perfection.
                        </p>
                        <p>
                            Our team of seasoned travel architects has collectively explored over 100 countries,
                            building deep relationships with the world&apos;s finest hotels, exclusive resorts, and
                            local experts. Every journey we design is a masterpiece — meticulously researched,
                            thoughtfully curated, and flawlessly executed.
                        </p>
                    </motion.div>
                    <motion.div
                        className="about-story-image"
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView1 ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <img src="/images/philosophy-2.jpg" alt="JourneyLabel team" loading="lazy" />
                    </motion.div>
                </div>
            </section>

            {/* Values section */}
            <section className="about-values" ref={ref2}>
                <motion.div
                    className="about-values-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView2 ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="section-label" style={{ justifyContent: 'center' }}>
                        <span className="section-line" />
                        <span>What Guides Us</span>
                    </div>
                    <h2>Our Core Values</h2>
                </motion.div>

                <div className="about-values-grid">
                    {[
                        { num: '01', title: 'Bespoke Curation', text: 'No two travellers are alike. Every itinerary is a unique masterpiece tailored entirely to your vision, preferences and dreams.' },
                        { num: '02', title: 'Exclusive Access', text: 'We open doors that remain closed to others — private estates, after-hours museum tours, tables at the world\'s most exclusive restaurants.' },
                        { num: '03', title: 'Unwavering Excellence', text: 'From the first consultation to your return home, every detail is managed with precision, passion and an obsession for perfection.' },
                        { num: '04', title: 'Authentic Connections', text: 'We believe the finest travel comes from genuine human connections — with cultures, communities and the remarkable people within them.' },
                    ].map((val, i) => (
                        <motion.div
                            key={val.num}
                            className="about-value-card"
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView2 ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                        >
                            <span className="about-value-num">{val.num}</span>
                            <h3>{val.title}</h3>
                            <p>{val.text}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="about-cta" ref={ref3}>
                <motion.div
                    className="about-cta-inner"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView3 ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <h2>Ready to Begin Your Journey?</h2>
                    <p>Let our experts craft the holiday of a lifetime.</p>
                    <Link to="/enquiry" className="about-cta-btn">Get in Touch</Link>
                </motion.div>
            </section>
        </main>
    )
}

export default About
