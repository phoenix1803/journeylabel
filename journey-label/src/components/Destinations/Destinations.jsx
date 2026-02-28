import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import './Destinations.css'

const destinations = [
    {
        id: 1,
        title: 'Maldives',
        subtitle: 'Private Island Retreats',
        image: '/images/maldives.jpg',
        description: 'Crystalline waters, overwater villas and uncharted seclusion',
    },
    {
        id: 2,
        title: 'Santorini',
        subtitle: 'Aegean Splendour',
        image: '/images/santorini.jpg',
        description: 'Cliffside luxury where ancient beauty meets modern indulgence',
    },
    {
        id: 3,
        title: 'Swiss Alps',
        subtitle: 'Alpine Grandeur',
        image: '/images/swiss-alps.jpg',
        description: 'Snow-capped peaks, private chalets and world-class experiences',
    },
    {
        id: 4,
        title: 'Safari',
        subtitle: 'African Wilderness',
        image: '/images/safari.jpg',
        description: 'Untamed landscapes and exclusive wildlife encounters',
    },
]

const Destinations = () => {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

    return (
        <section className="destinations" id="destinations" ref={ref}>
            <motion.div
                className="destinations-header"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
            >
                <div className="section-label">
                    <span className="section-line" />
                    <span>Destinations</span>
                </div>
                <h2 className="destinations-title">
                    Where Will Your<br />Story Unfold?
                </h2>
            </motion.div>

            <div className="destinations-grid">
                {destinations.map((dest, i) => (
                    <motion.div
                        key={dest.id}
                        className="destination-card"
                        initial={{ opacity: 0, y: 50 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: i * 0.15 }}
                    >
                        <div className="destination-image-wrapper">
                            <img
                                src={dest.image}
                                alt={dest.title}
                                className="destination-image"
                                loading="lazy"
                            />
                            <div className="destination-image-overlay" />
                        </div>
                        <div className="destination-info">
                            <span className="destination-subtitle">{dest.subtitle}</span>
                            <h3 className="destination-name">{dest.title}</h3>
                            <p className="destination-desc">{dest.description}</p>
                            <Link to={`/enquiry?destination=${dest.title}`} className="destination-link">
                                Explore <span>&rarr;</span>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default Destinations
