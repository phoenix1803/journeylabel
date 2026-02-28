import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Gallery.css'

const galleryImages = [
    { src: '/images/gallery-1.jpg', alt: 'Overwater villa at sunset', caption: 'Maldives' },
    { src: '/images/gallery-2.jpg', alt: 'Mountain lodge luxury', caption: 'Swiss Alps' },
    { src: '/images/gallery-3.jpg', alt: 'Private yacht cruise', caption: 'Amalfi Coast' },
    { src: '/images/gallery-4.jpg', alt: 'Desert glamping', caption: 'Sahara' },
    { src: '/images/gallery-5.jpg', alt: 'Tropical infinity pool', caption: 'Bali' },
    { src: '/images/gallery-6.jpg', alt: 'Temple exploration', caption: 'Kyoto' },
]

const Gallery = () => {
    const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

    return (
        <section className="gallery" ref={ref}>
            <motion.div
                className="gallery-header"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
            >
                <div className="section-label" style={{ justifyContent: 'center' }}>
                    <span className="section-line" />
                    <span>A Glimpse of Luxury</span>
                </div>
                <h2 className="gallery-title">
                    Moments Worth <em>Remembering</em>
                </h2>
            </motion.div>

            <div className="gallery-mosaic">
                {/* Row 1: large left + stacked right */}
                <motion.div
                    className="gallery-large"
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.1 }}
                >
                    <img src={galleryImages[0].src} alt={galleryImages[0].alt} loading="lazy" />
                    <div className="gallery-caption">
                        <span>{galleryImages[0].caption}</span>
                    </div>
                </motion.div>

                <div className="gallery-stack">
                    <motion.div
                        className="gallery-stack-item"
                        initial={{ opacity: 0, y: 40 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <img src={galleryImages[1].src} alt={galleryImages[1].alt} loading="lazy" />
                        <div className="gallery-caption">
                            <span>{galleryImages[1].caption}</span>
                        </div>
                    </motion.div>
                    <motion.div
                        className="gallery-stack-item"
                        initial={{ opacity: 0, y: 40 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <img src={galleryImages[2].src} alt={galleryImages[2].alt} loading="lazy" />
                        <div className="gallery-caption">
                            <span>{galleryImages[2].caption}</span>
                        </div>
                    </motion.div>
                </div>

                {/* Row 2: stacked left + large right */}
                <div className="gallery-stack">
                    <motion.div
                        className="gallery-stack-item"
                        initial={{ opacity: 0, y: 40 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <img src={galleryImages[3].src} alt={galleryImages[3].alt} loading="lazy" />
                        <div className="gallery-caption">
                            <span>{galleryImages[3].caption}</span>
                        </div>
                    </motion.div>
                    <motion.div
                        className="gallery-stack-item"
                        initial={{ opacity: 0, y: 40 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <img src={galleryImages[4].src} alt={galleryImages[4].alt} loading="lazy" />
                        <div className="gallery-caption">
                            <span>{galleryImages[4].caption}</span>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="gallery-large"
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <img src={galleryImages[5].src} alt={galleryImages[5].alt} loading="lazy" />
                    <div className="gallery-caption">
                        <span>{galleryImages[5].caption}</span>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Gallery
