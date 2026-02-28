import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './Hero.css'

const Hero = () => {
    const videoRef = useRef(null)
    const [videoLoaded, setVideoLoaded] = useState(false)

    useEffect(() => {
        const video = videoRef.current
        if (video) {
            video.play().catch(() => { })
        }
    }, [])

    return (
        <section className="hero">
            <div className="hero-video-wrapper">
                <video
                    ref={videoRef}
                    className={`hero-video ${videoLoaded ? 'loaded' : ''}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onLoadedData={() => setVideoLoaded(true)}
                    poster="/images/hero-poster.jpg"
                >
                    <source src="/videos/hero.mp4" type="video/mp4" />
                </video>
                <div className="hero-overlay" />
            </div>

            <div className="hero-content">
                <motion.div
                    className="hero-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, delay: 2.8 }}
                >
                    <motion.p
                        className="hero-preheading"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 3 }}
                    >
                        Ultra-Luxury Travel
                    </motion.p>
                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 3.2 }}
                    >
                        Journeys Beyond
                        <br />
                        <span>Imagination</span>
                    </motion.h1>
                    <motion.p
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 3.5 }}
                    >
                        Bespoke experiences crafted for the world&apos;s most discerning travellers
                    </motion.p>
                    <motion.div
                        className="hero-cta"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 3.8 }}
                    >
                        <Link to="/enquiry" className="hero-btn">Begin Your Journey</Link>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="hero-scroll"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 4.2 }}
                >
                    <div className="hero-scroll-line" />
                    <span>Scroll</span>
                </motion.div>
            </div>
        </section>
    )
}

export default Hero
