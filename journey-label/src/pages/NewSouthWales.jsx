import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import './NewSouthWales.css'

const experiences = [
    {
        title: 'Family Adventures',
        description: 'From Taronga Zoo\'s harbourside wonders to Blue Mountains bushwalks, create memories that bring your family closer together.',
        image: '/images/nsw-family.jpg',
        link: '/enquiry?destination=New+South+Wales&occasion=Family',
    },
    {
        title: 'Honeymoon Escapes',
        description: 'Secluded coastal retreats, private vineyard dinners in Hunter Valley, and sunset sails across Sydney Harbour.',
        image: '/images/nsw-honeymoon.jpg',
        link: '/enquiry?destination=New+South+Wales&occasion=Honeymoon',
    },
    {
        title: 'Road Trip Discovery',
        description: 'Wind along the Grand Pacific Drive, explore hidden beaches, and discover charming coastal towns at your own pace.',
        image: '/images/nsw-roadtrip.jpg',
        link: '/enquiry?destination=New+South+Wales&theme=Adventures',
    },
]

const highlights = [
    { label: 'Sydney Opera House', detail: 'Iconic landmark & cultural heart' },
    { label: 'Blue Mountains', detail: 'World Heritage wilderness' },
    { label: 'Hunter Valley', detail: 'Australia\'s finest wine region' },
    { label: 'Byron Bay', detail: 'Bohemian coastal paradise' },
    { label: 'Bondi Beach', detail: 'Legendary surf & sand' },
    { label: 'Lord Howe Island', detail: 'Pristine island escape' },
]

const NewSouthWales = () => {
    const [ref1, inView1] = useInView({ threshold: 0.2, triggerOnce: true })
    const [ref2, inView2] = useInView({ threshold: 0.1, triggerOnce: true })
    const [ref3, inView3] = useInView({ threshold: 0.2, triggerOnce: true })

    return (
        <main className="nsw-page">
            {/* Hero */}
            <section className="nsw-hero">
                <div className="nsw-hero-bg">
                    <img src="/images/nsw-hero.jpg" alt="Sydney aerial view" />
                    <div className="nsw-hero-overlay" />
                </div>
                <motion.div
                    className="nsw-hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    <span className="nsw-hero-label">Destination</span>
                    <h1>New South Wales</h1>
                    <p className="nsw-hero-subtitle">
                        Where cosmopolitan elegance meets untouched natural beauty
                    </p>
                </motion.div>
            </section>

            {/* Intro */}
            <section className="nsw-intro" ref={ref1}>
                <motion.div
                    className="nsw-intro-inner"
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView1 ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="section-label" style={{ justifyContent: 'center' }}>
                        <span className="section-line" />
                        <span>About the Destination</span>
                    </div>
                    <h2>Start Your Adventure</h2>
                    <p>
                        New South Wales is a land of contrasts — from the cosmopolitan sophistication of Sydney
                        to the dramatic cliffs of the Blue Mountains, sun-kissed beaches of the South Coast
                        to the vine-laden valleys of Hunter Valley. Whether you seek cultural immersion,
                        family bonding, romantic getaways or solo discovery, NSW offers experiences
                        that stay with you long after the journey ends.
                    </p>
                </motion.div>
            </section>

            {/* Experience Cards */}
            <section className="nsw-experiences" ref={ref2}>
                <div className="nsw-experiences-grid">
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={exp.title}
                            className="nsw-exp-card"
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView2 ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: i * 0.15 }}
                        >
                            <div className="nsw-exp-image">
                                <img src={exp.image} alt={exp.title} loading="lazy" />
                                <div className="nsw-exp-image-overlay" />
                            </div>
                            <div className="nsw-exp-content">
                                <h3>{exp.title}</h3>
                                <p>{exp.description}</p>
                                <Link to={exp.link} className="nsw-exp-link">
                                    Enquire Now <span>&rarr;</span>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Highlights */}
            <section className="nsw-highlights" ref={ref3}>
                <motion.div
                    className="nsw-highlights-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView3 ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="section-label" style={{ justifyContent: 'center' }}>
                        <span className="section-line" />
                        <span>Must See</span>
                    </div>
                    <h2>Highlights of NSW</h2>
                </motion.div>

                <div className="nsw-highlights-grid">
                    {highlights.map((h, i) => (
                        <motion.div
                            key={h.label}
                            className="nsw-highlight-item"
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView3 ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <h4>{h.label}</h4>
                            <p>{h.detail}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="nsw-cta"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView3 ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <Link to="/enquiry?destination=New+South+Wales" className="nsw-cta-btn">
                        Plan Your NSW Journey
                    </Link>
                </motion.div>
            </section>
        </main>
    )
}

export default NewSouthWales
