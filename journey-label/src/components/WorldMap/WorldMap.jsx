import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import * as d3 from 'd3'
import { feature } from 'topojson-client'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './WorldMap.css'

/* ── Continent → country ISO mapping ── */
const CONTINENT_COUNTRIES = {
    Europe: [
        'FRA', 'DEU', 'ITA', 'ESP', 'GBR', 'GRC', 'PRT', 'NLD', 'BEL', 'CHE',
        'AUT', 'SWE', 'NOR', 'DNK', 'FIN', 'IRL', 'POL', 'CZE', 'ROU', 'HUN',
        'HRV', 'SVK', 'BGR', 'SRB', 'BIH', 'SVN', 'MKD', 'ALB', 'MNE', 'LTU',
        'LVA', 'EST', 'ISL', 'LUX', 'MLT', 'CYP', 'UKR', 'BLR', 'MDA',
    ],
    Asia: [
        'JPN', 'CHN', 'IND', 'THA', 'VNM', 'IDN', 'MYS', 'PHL', 'KOR', 'SGP',
        'LKA', 'PAK', 'BGD', 'NPL', 'MMR', 'KHM', 'LAO', 'TWN', 'MNG', 'ARE',
        'SAU', 'QAT', 'KWT', 'OMN', 'BHR', 'JOR', 'LBN', 'ISR', 'IRQ', 'IRN',
        'AFG', 'UZB', 'KAZ', 'TKM', 'KGZ', 'TJK', 'GEO', 'ARM', 'AZE', 'TUR',
        'MDV',
    ],
    Africa: [
        'ZAF', 'KEN', 'MAR', 'TZA', 'EGY', 'NGA', 'GHA', 'ETH', 'UGA', 'TUN',
        'DZA', 'LBY', 'SDN', 'CMR', 'CIV', 'SEN', 'MLI', 'BFA', 'NER', 'TCD',
        'COD', 'COG', 'AGO', 'MOZ', 'MDG', 'ZMB', 'ZWE', 'BWA', 'NAM', 'RWA',
        'BDI', 'MWI', 'SOM', 'ERI', 'DJI', 'GAB', 'GNQ', 'SWZ', 'LSO', 'GMB',
        'GNB', 'SLE', 'LBR', 'BEN', 'TGO', 'MRT', 'CAF',
    ],
    'North America': [
        'USA', 'CAN', 'MEX', 'GTM', 'BLZ', 'SLV', 'HND', 'NIC', 'CRI', 'PAN',
        'CUB', 'JAM', 'HTI', 'DOM', 'PRI', 'TTO',
    ],
    'South America': [
        'BRA', 'ARG', 'CHL', 'COL', 'PER', 'VEN', 'ECU', 'BOL', 'PRY', 'URY',
        'GUY', 'SUR',
    ],
    Oceania: [
        'AUS', 'NZL', 'PNG', 'FJI',
    ],
}

/* ── Featured destinations per continent ── */
const FEATURED = {
    Europe: [
        { name: 'Paris', country: 'France', img: '/images/santorini.jpg' },
        { name: 'Rome', country: 'Italy', img: '/images/gallery-2.jpg' },
        { name: 'Santorini', country: 'Greece', img: '/images/santorini.jpg' },
    ],
    Asia: [
        { name: 'Tokyo', country: 'Japan', img: '/images/experience-culture.jpg' },
        { name: 'Bali', country: 'Indonesia', img: '/images/maldives.jpg' },
        { name: 'Dubai', country: 'UAE', img: '/images/gallery-4.jpg' },
    ],
    Africa: [
        { name: 'Cape Town', country: 'South Africa', img: '/images/safari.jpg' },
        { name: 'Marrakech', country: 'Morocco', img: '/images/gallery-3.jpg' },
        { name: 'Serengeti', country: 'Tanzania', img: '/images/safari.jpg' },
    ],
    'North America': [
        { name: 'New York City', country: 'USA', img: '/images/gallery-5.jpg' },
        { name: 'Banff', country: 'Canada', img: '/images/swiss-alps.jpg' },
        { name: 'Cancún', country: 'Mexico', img: '/images/maldives.jpg' },
    ],
    'South America': [
        { name: 'Rio de Janeiro', country: 'Brazil', img: '/images/gallery-6.jpg' },
        { name: 'Machu Picchu', country: 'Peru', img: '/images/gallery-1.jpg' },
        { name: 'Buenos Aires', country: 'Argentina', img: '/images/gallery-2.jpg' },
    ],
    Oceania: [
        { name: 'Sydney', country: 'Australia', img: '/images/nsw-hero.jpg' },
        { name: 'Great Barrier Reef', country: 'Australia', img: '/images/maldives.jpg' },
        { name: 'Melbourne', country: 'Australia', img: '/images/gallery-4.jpg' },
    ],
}

/* ── Zoom targets (approximate center + scale) ── */
const ZOOM_TARGETS = {
    Europe: { center: [15, 50], scale: 3 },
    Asia: { center: [85, 30], scale: 2.5 },
    Africa: { center: [20, 0], scale: 2.5 },
    'North America': { center: [-100, 45], scale: 2.5 },
    'South America': { center: [-60, -15], scale: 2.5 },
    Oceania: { center: [140, -25], scale: 3 },
}

const GEOJSON_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const WorldMap = () => {
    const svgRef = useRef(null)
    const containerRef = useRef(null)
    const [selectedContinent, setSelectedContinent] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [worldData, setWorldData] = useState(null)
    const navigate = useNavigate()
    const [sectionRef, inView] = useInView({ threshold: 0.1, triggerOnce: true })

    /* ── Load GeoJSON ── */
    useEffect(() => {
        fetch(GEOJSON_URL)
            .then((res) => res.json())
            .then((topo) => {
                const countries = feature(topo, topo.objects.countries)
                setWorldData(countries)
            })
            .catch(console.error)
    }, [])

    /* ── Get continent for a country ISO-numeric ── */
    const getContinent = useCallback((isoN) => {
        // We must map iso_numeric → iso_a3 via d3
        // For simplicity we use a reverse lookup
        for (const [continent, codes] of Object.entries(CONTINENT_COUNTRIES)) {
            if (codes.includes(isoN)) return continent
        }
        return null
    }, [])

    /* ── Render the map ── */
    useEffect(() => {
        if (!worldData || !svgRef.current) return

        const container = containerRef.current
        const width = container.clientWidth
        const height = Math.min(width * 0.55, 560)

        const svg = d3.select(svgRef.current)
        svg.selectAll('*').remove()
        svg.attr('viewBox', `0 0 ${width} ${height}`)

        const projection = d3.geoNaturalEarth1()
            .fitSize([width, height], worldData)

        const path = d3.geoPath().projection(projection)

        const g = svg.append('g')

        /* ── Draw countries ── */
        g.selectAll('path')
            .data(worldData.features)
            .join('path')
            .attr('d', path)
            .attr('class', 'map-country')
            .attr('fill', 'var(--map-land)')
            .attr('stroke', 'var(--map-border)')
            .attr('stroke-width', 0.5)
            .on('mouseenter', function () {
                d3.select(this).attr('fill', 'var(--pink-light)')
            })
            .on('mouseleave', function () {
                const isHighlighted = d3.select(this).classed('highlighted')
                d3.select(this).attr('fill', isHighlighted ? 'var(--pink)' : 'var(--map-land)')
            })
            .on('click', function (event, d) {
                // Find which continent this country belongs to
                const isoA3 = d.properties?.iso_a3 || d.id
                let clickedContinent = null
                for (const [cont, codes] of Object.entries(CONTINENT_COUNTRIES)) {
                    // Try matching by ISO numeric id or ISO a3
                    if (codes.includes(isoA3) || codes.includes(String(d.id))) {
                        clickedContinent = cont
                        break
                    }
                }
                // Also try matching by numeric id with d3 lookup
                if (!clickedContinent) {
                    // Fallback: try to determine by centroid position
                    const centroid = d3.geoCentroid(d)
                    if (centroid[0] > -30 && centroid[0] < 60 && centroid[1] > 35) clickedContinent = 'Europe'
                    else if (centroid[0] > 25 && centroid[1] < 35 && centroid[1] > -40) clickedContinent = 'Africa'
                    else if (centroid[0] > 60 || (centroid[0] > 25 && centroid[1] > 0 && centroid[1] < 55)) clickedContinent = 'Asia'
                    else if (centroid[0] < -30 && centroid[1] > 10) clickedContinent = 'North America'
                    else if (centroid[0] < -30 && centroid[1] <= 10) clickedContinent = 'South America'
                    else if (centroid[0] > 100 && centroid[1] < 0) clickedContinent = 'Oceania'
                }

                if (clickedContinent) {
                    handleContinentClick(clickedContinent, g, projection, width, height)
                }
            })

        /* ── Add continent labels ── */
        const continentLabels = [
            { name: 'Europe', coords: [15, 50] },
            { name: 'Asia', coords: [85, 35] },
            { name: 'Africa', coords: [20, 5] },
            { name: 'N. America', coords: [-100, 45], continent: 'North America' },
            { name: 'S. America', coords: [-60, -15], continent: 'South America' },
            { name: 'Oceania', coords: [135, -25] },
        ]

        continentLabels.forEach((label) => {
            const [x, y] = projection(label.coords)
            g.append('text')
                .attr('x', x)
                .attr('y', y)
                .attr('class', 'map-label')
                .attr('text-anchor', 'middle')
                .text(label.name)
                .style('cursor', 'pointer')
                .on('click', () => {
                    handleContinentClick(label.continent || label.name, g, projection, width, height)
                })
        })

    }, [worldData])

    /* ── Handle continent click ── */
    const handleContinentClick = useCallback((continent, g, projection, width, height) => {
        setSelectedContinent(continent)

        // Highlight countries
        g.selectAll('path')
            .classed('highlighted', false)
            .attr('fill', 'var(--map-land)')

        const codes = CONTINENT_COUNTRIES[continent] || []
        g.selectAll('path')
            .each(function (d) {
                const centroid = d3.geoCentroid(d)
                let matchedContinent = null
                if (centroid[0] > -30 && centroid[0] < 60 && centroid[1] > 35) matchedContinent = 'Europe'
                else if (centroid[0] > 25 && centroid[1] < 35 && centroid[1] > -40) matchedContinent = 'Africa'
                else if (centroid[0] > 60 || (centroid[0] > 25 && centroid[1] > 0 && centroid[1] < 55)) matchedContinent = 'Asia'
                else if (centroid[0] < -30 && centroid[1] > 10) matchedContinent = 'North America'
                else if (centroid[0] < -30 && centroid[1] <= 10) matchedContinent = 'South America'
                else if (centroid[0] > 100 && centroid[1] < 0) matchedContinent = 'Oceania'

                if (matchedContinent === continent) {
                    d3.select(this)
                        .classed('highlighted', true)
                        .transition()
                        .duration(500)
                        .attr('fill', 'var(--pink)')
                }
            })

        // Zoom into continent
        const target = ZOOM_TARGETS[continent]
        if (target) {
            const [cx, cy] = projection(target.center)
            const scale = target.scale
            g.transition()
                .duration(800)
                .attr('transform', `translate(${width / 2 - cx * scale}, ${height / 2 - cy * scale}) scale(${scale})`)
        }

        // Open modal
        setTimeout(() => setModalOpen(true), 600)
    }, [])

    const resetMap = useCallback(() => {
        setModalOpen(false)
        setSelectedContinent(null)

        if (svgRef.current) {
            const svg = d3.select(svgRef.current)
            svg.select('g')
                .transition()
                .duration(600)
                .attr('transform', 'translate(0,0) scale(1)')

            svg.selectAll('path')
                .classed('highlighted', false)
                .transition()
                .duration(400)
                .attr('fill', 'var(--map-land)')
        }
    }, [])

    const handleDestinationClick = useCallback((dest) => {
        navigate(`/enquiry?destination=${encodeURIComponent(dest.country)}`)
        setModalOpen(false)
    }, [navigate])

    return (
        <section className="world-map-section" ref={sectionRef}>
            <motion.div
                className="world-map-header"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
            >
                <div className="section-label">
                    <span className="section-line" />
                    <span>Explore</span>
                </div>
                <h2 className="world-map-title">
                    Discover Your Next <em>Destination</em>
                </h2>
                <p className="world-map-subtitle">
                    Click on any continent to explore our curated travel destinations
                </p>
            </motion.div>

            <motion.div
                className="world-map-container"
                ref={containerRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
            >
                <svg ref={svgRef} className="world-map-svg" />

                {/* Continent quick-nav pills */}
                <div className="continent-pills">
                    {Object.keys(FEATURED).map((c) => (
                        <button
                            key={c}
                            className={`pill ${selectedContinent === c ? 'pill--active' : ''}`}
                            onClick={() => {
                                if (svgRef.current && worldData) {
                                    const container = containerRef.current
                                    const width = container.clientWidth
                                    const height = Math.min(width * 0.55, 560)
                                    const projection = d3.geoNaturalEarth1().fitSize([width, height], worldData)
                                    const g = d3.select(svgRef.current).select('g')
                                    handleContinentClick(c, g, projection, width, height)
                                }
                            }}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* ── Modal ── */}
            <AnimatePresence>
                {modalOpen && selectedContinent && (
                    <motion.div
                        className="map-modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={resetMap}
                    >
                        <motion.div
                            className="map-modal"
                            initial={{ opacity: 0, y: 60, scale: 0.92 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 40, scale: 0.95 }}
                            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="map-modal-close" onClick={resetMap}>✕</button>
                            <h3 className="map-modal-title">{selectedContinent}</h3>
                            <p className="map-modal-subtitle">Featured Destinations</p>
                            <div className="map-modal-grid">
                                {(FEATURED[selectedContinent] || []).map((dest) => (
                                    <div
                                        key={dest.name}
                                        className="map-modal-card"
                                        onClick={() => handleDestinationClick(dest)}
                                    >
                                        <div className="map-modal-card-img">
                                            <img src={dest.img} alt={dest.name} />
                                        </div>
                                        <div className="map-modal-card-info">
                                            <h4>{dest.name}</h4>
                                            <span>{dest.country}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default WorldMap
