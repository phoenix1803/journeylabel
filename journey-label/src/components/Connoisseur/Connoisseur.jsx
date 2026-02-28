import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import './Connoisseur.css'

const Connoisseur = () => {
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

    return (
        <section className="connoisseur" ref={ref}>
            <div className="connoisseur-inner">
                <div className="connoisseur-left">
                    <motion.div
                        className="connoisseur-header"
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <h2 className="connoisseur-heading">
                            For the <span className="accent">connoisseur</span>, the{' '}
                            <span className="accent">explorer</span>, and the{' '}
                            <span className="accent">dreamer</span>.
                        </h2>
                    </motion.div>

                    <div className="connoisseur-sketch-mobile">
                        <motion.img
                            src="/images/house.svg"
                            alt="Safari sketch"
                            className="sketch-image"
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            draggable="false"
                        />
                    </div>

                    <motion.p
                        className="connoisseur-text"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        The Élan is about travel that transforms — experiences that enrich your soul,
                        awaken your senses, and uplift the planet with every meaningful journey.
                    </motion.p>
                </div>

                <div className="connoisseur-right">
                    <motion.img
                        src="/images/house.svg"
                        alt="Safari sketch"
                        className="sketch-image sketch-desktop"
                        initial={{ opacity: 0, x: 30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, delay: 0.5 }}
                        draggable="false"
                    />
                </div>
            </div>
        </section>
    )
}

export default Connoisseur
