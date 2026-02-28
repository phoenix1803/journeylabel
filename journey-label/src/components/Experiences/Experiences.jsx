import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import './Experiences.css'

const experiences = [
    {
        id: 1,
        title: 'Private Island Escapes',
        description: 'Secluded paradises where luxury knows no bounds',
        image: '/images/experience-island.jpg',
        tag: 'Private access',
    },
    {
        id: 2,
        title: 'Cultural Immersions',
        description: 'Authentic encounters with the world\'s most fascinating cultures',
        image: '/images/experience-culture.jpg',
        tag: 'Curated',
    },
    {
        id: 3,
        title: 'Wellness Retreats',
        description: 'Transformative journeys of mind, body and spirit',
        image: '/images/experience-wellness.jpg',
        tag: 'Restorative',
    },
]

const Experiences = () => {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

    return (
        <section className="experiences" id="experiences" ref={ref}>
            <motion.div
                className="experiences-header"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
            >
                <div className="section-label">
                    <span className="section-line" />
                    <span>Experiences</span>
                </div>
                <h2 className="experiences-title">
                    Extraordinary Moments,<br />Meticulously Crafted
                </h2>
            </motion.div>

            <div className="experiences-showcase">
                {experiences.map((exp, i) => (
                    <motion.div
                        key={exp.id}
                        className="experience-item"
                        initial={{ opacity: 0, y: 60 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: i * 0.2 }}
                    >
                        <div className="experience-image-container">
                            <img
                                src={exp.image}
                                alt={exp.title}
                                className="experience-image"
                                loading="lazy"
                            />
                            <div className="experience-tag">{exp.tag}</div>
                        </div>
                        <div className="experience-content">
                            <h3 className="experience-name">{exp.title}</h3>
                            <p className="experience-desc">{exp.description}</p>
                            <Link to="/enquiry" className="experience-link">
                                Explore the Agenda <span>&rarr;</span>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="experiences-cta"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
            >
                <p className="experiences-cta-text">
                    From honeymoons to milestone celebrations, family voyages to solo
                    expeditions — every journey is uniquely yours.
                </p>
                <Link to="/enquiry" className="experiences-cta-btn">Begin the Conversation</Link>
            </motion.div>
        </section>
    )
}

export default Experiences
