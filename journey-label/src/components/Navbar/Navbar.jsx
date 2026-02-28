import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const destinationsData = {
    Africa: ['Egypt', 'Kenya', 'Morocco', 'South Africa', 'Tanzania'],
    Asia: ['India', 'Indonesia', 'Japan', 'Maldives', 'Sri Lanka', 'Thailand', 'Vietnam'],
    Europe: ['France', 'Greece', 'Iceland', 'Italy', 'Spain', 'Switzerland', 'United Kingdom'],
    'North America': ['Canada', 'Mexico', 'The USA'],
    'South America': ['Argentina', 'Brazil', 'Chile', 'Colombia', 'Peru'],
    Oceania: ['Australia', 'Fiji', 'New Zealand'],
}

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [menuLevel, setMenuLevel] = useState('main') // main | destinations | countries
    const [selectedContinent, setSelectedContinent] = useState(null)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 900)
    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60)
        const handleResize = () => setIsMobile(window.innerWidth <= 900)
        window.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [menuOpen])

    const closeMenu = useCallback(() => {
        setMenuOpen(false)
        setTimeout(() => {
            setMenuLevel('main')
            setSelectedContinent(null)
        }, 400)
    }, [])

    const handleEnquiry = (params = {}) => {
        closeMenu()
        const query = new URLSearchParams(params).toString()
        navigate(`/enquiry${query ? '?' + query : ''}`)
    }

    const mainMenuItems = [
        { label: 'Destinations', action: () => { setMenuLevel('destinations') } },
        { label: 'Experiences', action: () => { closeMenu(); navigate('/#experiences') } },
        { label: 'About Us', action: () => { closeMenu(); navigate('/about') } },
        { label: 'Contact', action: () => { closeMenu(); navigate('/enquiry') } },
    ]

    return (
        <>
            <motion.nav
                className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 2.5, ease: [0.4, 0, 0.2, 1] }}
            >
                <div className="navbar-inner">
                    <Link to="/" className="navbar-logo">
                        <img src="/images/logo.png" alt="JourneyLabel" className="navbar-logo-img" />
                    </Link>

                    <div className="navbar-right">
                        <Link to="/enquiry" className="navbar-enquire">Enquire</Link>

                        <button
                            className={`navbar-hamburger ${menuOpen ? 'active' : ''}`}
                            onClick={() => menuOpen ? closeMenu() : setMenuOpen(true)}
                            aria-label="Menu"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* ===== FULL SCREEN MENU ===== */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="menu-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="menu-overlay-inner">
                            {/* MOBILE: Single panel that swaps */}
                            {isMobile ? (
                                <div className="menu-mobile">
                                    <AnimatePresence mode="wait">
                                        {menuLevel === 'main' && (
                                            <motion.div
                                                key="main"
                                                className="menu-panel"
                                                initial={{ x: -30, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                exit={{ x: -30, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                            >
                                                {mainMenuItems.map((item, i) => (
                                                    <button key={item.label} className="menu-main-link" onClick={item.action}>
                                                        {item.label}
                                                        {item.label === 'Destinations' && <span className="menu-arrow">&rarr;</span>}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}

                                        {menuLevel === 'destinations' && (
                                            <motion.div
                                                key="destinations"
                                                className="menu-panel"
                                                initial={{ x: 30, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                exit={{ x: 30, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                            >
                                                <button className="menu-back" onClick={() => setMenuLevel('main')}>
                                                    &larr; Back
                                                </button>
                                                <p className="menu-panel-title">Continents</p>
                                                {Object.keys(destinationsData).map((continent) => (
                                                    <button
                                                        key={continent}
                                                        className="menu-sub-link"
                                                        onClick={() => { setSelectedContinent(continent); setMenuLevel('countries') }}
                                                    >
                                                        {continent}
                                                        <span className="menu-arrow">&rarr;</span>
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}

                                        {menuLevel === 'countries' && selectedContinent && (
                                            <motion.div
                                                key="countries"
                                                className="menu-panel"
                                                initial={{ x: 30, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                exit={{ x: 30, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                            >
                                                <button className="menu-back" onClick={() => setMenuLevel('destinations')}>
                                                    &larr; {selectedContinent}
                                                </button>
                                                <p className="menu-panel-title">Countries</p>
                                                {destinationsData[selectedContinent].map((country) => (
                                                    <button
                                                        key={country}
                                                        className="menu-sub-link"
                                                        onClick={() => handleEnquiry({ destination: country })}
                                                    >
                                                        {country}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                /* DESKTOP: Side-by-side panels */
                                <div className="menu-desktop">
                                    <div className="menu-desktop-main">
                                        {mainMenuItems.map((item, i) => (
                                            <motion.button
                                                key={item.label}
                                                className={`menu-main-link ${item.label === 'Destinations' && menuLevel !== 'main' ? 'active' : ''}`}
                                                onClick={item.action}
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                            >
                                                {item.label}
                                                {item.label === 'Destinations' && <span className="menu-arrow">&rarr;</span>}
                                            </motion.button>
                                        ))}

                                        <motion.div
                                            className="menu-desktop-footer"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            <p>info@journeylabel.com</p>
                                            <p>+91 (0) 123 456 7890</p>
                                        </motion.div>
                                    </div>

                                    <AnimatePresence>
                                        {menuLevel !== 'main' && (
                                            <motion.div
                                                className="menu-desktop-sub"
                                                initial={{ x: 40, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                exit={{ x: 40, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <p className="menu-panel-title">
                                                    {menuLevel === 'destinations' ? 'Select Continent' : selectedContinent}
                                                </p>

                                                {menuLevel === 'destinations' && Object.keys(destinationsData).map((continent) => (
                                                    <button
                                                        key={continent}
                                                        className={`menu-sub-link ${selectedContinent === continent ? 'active' : ''}`}
                                                        onClick={() => { setSelectedContinent(continent); setMenuLevel('countries') }}
                                                    >
                                                        {continent}
                                                        <span className="menu-arrow">&rarr;</span>
                                                    </button>
                                                ))}

                                                {menuLevel === 'countries' && selectedContinent && (
                                                    <>
                                                        <button className="menu-back-desktop" onClick={() => setMenuLevel('destinations')}>
                                                            &larr; All Continents
                                                        </button>
                                                        {destinationsData[selectedContinent].map((country) => (
                                                            <button
                                                                key={country}
                                                                className="menu-sub-link"
                                                                onClick={() => handleEnquiry({ destination: country })}
                                                            >
                                                                {country}
                                                            </button>
                                                        ))}
                                                    </>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <AnimatePresence>
                                        {menuLevel === 'countries' && selectedContinent && (
                                            <motion.div
                                                className="menu-desktop-sub"
                                                initial={{ x: 40, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                exit={{ x: 40, opacity: 0 }}
                                                transition={{ duration: 0.3, delay: 0.1 }}
                                                style={{ display: 'none' }}
                                            />
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Navbar
