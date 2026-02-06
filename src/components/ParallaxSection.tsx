import { useScroll, useTransform, motion, useSpring } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ParallaxSectionProps {
    children: ReactNode;
    className?: string;
    speed?: number; // 0 = no parallax, 0.5 = half speed, -0.5 = reverse half speed
    id?: string;
}

const ParallaxSection = ({ children, className = "", speed = 0.5, id }: ParallaxSectionProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const springConfig = { mass: 0.1, stiffness: 100, damping: 20 };
    const y = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, 100 * speed]),
        springConfig
    );

    return (
        <div ref={ref} id={id} className={`relative overflow-hidden ${className}`}>
            <motion.div style={{ y }} className="relative w-full h-full">
                {children}
            </motion.div>
        </div>
    );
};

export default ParallaxSection;
