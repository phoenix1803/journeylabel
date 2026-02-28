import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Philosophy.css'

const Philosophy = () => {
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

    return (
        <section className="philosophy" id="philosophy" ref={ref}>
            <div className="philosophy-inner">
                <div className="philosophy-left">
                    <motion.div
                        className="philosophy-image-stack"
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1 }}
                    >
                        <div className="philosophy-img-main">
                            <img src="/images/philosophy-1.jpg" alt="Luxury retreat" loading="lazy" />
                        </div>
                        <div className="philosophy-img-accent">
                            <img src="/images/philosophy-2.jpg" alt="Bespoke experience" loading="lazy" />
                        </div>
                    </motion.div>
                </div>

                <div className="philosophy-right">
                    <motion.div
                        className="section-label"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <span className="section-line" />
                        <span>Our Philosophy</span>
                    </motion.div>

                    <motion.h2
                        className="philosophy-heading"
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        It&apos;s Not Where You Go,
                        <br />
                        <em>It&apos;s How It Makes You Feel</em>
                    </motion.h2>

                    <motion.p
                        className="philosophy-text"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        Every journey we design begins with understanding who you are — your passions,
                        your dreams, the moments that matter most to you. We are not in the business of
                        selling destinations; we are in the craft of creating transformative experiences
                        that resonate long after you return.
                    </motion.p>

                    <motion.div
                        className="philosophy-features"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.7 }}
                    >
                        <div className="feature">
                            <div className="feature-number">01</div>
                            <div>
                                <h4>Bespoke Curation</h4>
                                <p>Every itinerary is a unique masterpiece tailored to your desires</p>
                            </div>
                        </div>
                        <div className="feature">
                            <div className="feature-number">02</div>
                            <div>
                                <h4>Exclusive Access</h4>
                                <p>Doors that remain closed to others open for our guests</p>
                            </div>
                        </div>
                        <div className="feature">
                            <div className="feature-number">03</div>
                            <div>
                                <h4>Dedicated Concierge</h4>
                                <p>A personal travel architect with you from vision to reality</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Philosophy
