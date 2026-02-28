import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CircularTestimonials from '../CircularTestimonials/CircularTestimonials'
import './Testimonials.css'

const testimonials = [
    {
        quote: 'JourneyLabel transformed our anniversary into an experience we will cherish for a lifetime. Every detail was impeccable — from the private waterfall dinner to the helicopter transfer.',
        name: 'Priya & Arjun M.',
        designation: 'Private Safari, Kenya',
        src: '/images/testimonial-1.jpg',
    },
    {
        quote: 'We have traveled extensively with many luxury operators, but nothing compares to the level of personal attention and creativity that JourneyLabel brings to every journey.',
        name: 'The Kapoor Family',
        designation: 'Island Hopping, Maldives',
        src: '/images/testimonial-2.jpg',
    },
    {
        quote: 'The team understood exactly what we wanted without us having to explain — that rare intuition is what separates good travel from truly extraordinary travel.',
        name: 'Rohit S.',
        designation: 'Cultural Immersion, Japan',
        src: '/images/testimonial-3.jpg',
    },
]

const Testimonials = () => {
    const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true })

    return (
        <section className="testimonials" ref={ref}>
            <motion.div
                className="testimonials-header"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
            >
                <div className="section-label">
                    <span className="section-line" />
                    <span>Testimonials</span>
                </div>
                <h2 className="testimonials-heading">
                    Words From Those <em>Who&apos;ve Journeyed With Us</em>
                </h2>
            </motion.div>

            <motion.div
                className="testimonials-carousel"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <CircularTestimonials
                    testimonials={testimonials}
                    autoplay
                    colors={{
                        name: 'var(--text-primary)',
                        designation: 'var(--text-muted)',
                        testimony: 'var(--text-secondary)',
                        arrowBackground: 'var(--bg-tertiary)',
                        arrowForeground: 'var(--text-primary)',
                        arrowHoverBackground: 'var(--accent-warm)',
                    }}
                    fontSizes={{
                        name: '1.6rem',
                        designation: '0.9rem',
                        quote: '1.05rem',
                    }}
                />
            </motion.div>
        </section>
    )
}

export default Testimonials
