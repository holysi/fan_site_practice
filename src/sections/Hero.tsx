import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scaleImg = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    return (
        <section ref={ref} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background with Parallax */}
            <motion.div
                style={{ scale: scaleImg }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-black/40 z-10" />
                {/* Placeholder for video/image - using a gradient for now */}
                <div className="w-full h-full bg-gradient-to-br from-gray-900 to-blue-900" />
                <img
                    src="https://images.unsplash.com/photo-1574155376612-eb72df3adc8a?q=80&w=2670&auto=format&fit=crop"
                    alt="Concert Crowd"
                    className="w-full h-full object-cover absolute inset-0 mix-blend-overlay opacity-60"
                />
            </motion.div>

            {/* Content */}
            <motion.div
                style={{ y: yText, opacity: opacityText }}
                className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto"
            >
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-xl font-sans font-light tracking-[0.2em] mb-4 uppercase text-white/80"
                >
                    每個熱愛都值得被記錄
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold tracking-tight mb-6 leading-tight"
                >
                    hidol <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-purple-500">
                        moments
                    </span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="text-base md:text-xl font-sans font-light max-w-xl mx-auto text-white/90"
                >
                    獻給每一位用生命寫下moment的你
                </motion.p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 z-20 flex flex-col items-center gap-2 text-white/70"
            >
                <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ArrowDown size={20} />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
