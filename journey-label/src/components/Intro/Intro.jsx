import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Intro.css'

const Intro = () => {
    const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })

    return (
        <section className="intro" ref={ref}>
            <div className="intro-inner">
                <motion.div
                    className="intro-label"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="intro-line" />
                    <span>Our Promise</span>
                </motion.div>

                <motion.h2
                    className="intro-heading"
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    We don&apos;t just plan trips.
                    <br />
                    We craft <em>transformative journeys.</em>
                </motion.h2>

                <motion.p
                    className="intro-text"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    JourneyLabel is the definitive luxury travel concierge for those who demand the
                    extraordinary. Our seasoned experts have traversed the farthest reaches of the world,
                    curating truly bespoke itineraries that transcend the conventional. We unlock doors that
                    remain closed to others — private islands, exclusive cultural immersions, and experiences
                    that exist beyond the pages of any guidebook.
                </motion.p>

                <motion.div
                    className="intro-stats"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <div className="intro-stat">
                        <span className="intro-stat-number">6</span>
                        <span className="intro-stat-label">Continents Covered</span>
                    </div>
                    <div className="intro-stat-divider" />
                    <div className="intro-stat">
                        <span className="intro-stat-number">1:1</span>
                        <span className="intro-stat-label">Client to Concierge</span>
                    </div>
                    <div className="intro-stat-divider" />
                    <div className="intro-stat">
                        <span className="intro-stat-number">100%</span>
                        <span className="intro-stat-label">Bespoke Itineraries</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Intro
