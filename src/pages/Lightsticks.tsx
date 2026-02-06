import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Camera, BookOpen, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import lightsticksCsv from '../data/lightsticks.csv?raw';

interface IdolData {
    id: number;
    name: string;
    img: string;
    desc: string;
    fanclub_link?: string;
    moment_link?: string;
    wiki_content?: string;
}

const IdolProfiles = () => {
    const [idols, setIdols] = useState<IdolData[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showWiki, setShowWiki] = useState(false);

    useEffect(() => {
        Papa.parse(lightsticksCsv, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (results) => {
                if (results.data) {
                    setIdols(results.data as IdolData[]);
                }
            },
            error: (error: Error) => console.error("Error parsing idol data:", error)
        });
    }, []);

    const nextSlide = () => setActiveIndex((prev) => (prev + 1) % idols.length);
    const prevSlide = () => setActiveIndex((prev) => (prev - 1 + idols.length) % idols.length);

    if (idols.length === 0) {
        return <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-white">Loading...</div>;
    }

    const currentIdol = idols[activeIndex];

    return (
        <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center relative overflow-hidden">
            <Link to="/" className="absolute top-6 left-6 inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors z-50">
                <ArrowLeft size={20} /> Back
            </Link>

            {/* Decorative Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-accent/20 blur-[100px] rounded-full mix-blend-screen" />
            </div>

            <div className="relative z-10 w-full max-w-6xl px-6 flex flex-col md:flex-row items-center gap-12 md:gap-24">

                {/* Text Content */}
                <div className="w-full md:w-1/3 text-center md:text-left space-y-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h2 className="text-gray-500 font-mono text-sm tracking-widest mb-2">STAR #{activeIndex + 1}</h2>
                            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 leading-tight">{currentIdol.name}</h1>
                            <p className="text-gray-400 leading-relaxed mb-8 whitespace-pre-line">{currentIdol.desc}</p>

                            <div className="flex gap-4 justify-center md:justify-start">
                                <a
                                    href={currentIdol.fanclub_link || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`bg-white/10 p-3 rounded-xl flex flex-col items-center gap-2 w-24 hover:bg-white/20 transition-colors cursor-pointer ${!currentIdol.fanclub_link && 'opacity-50 cursor-not-allowed'}`}
                                    onClick={(e) => !currentIdol.fanclub_link && e.preventDefault()}
                                >
                                    <Users size={20} className="text-brand-accent" />
                                    <span className="text-xs font-bold text-gray-300">Fanclub</span>
                                </a>
                                <a
                                    href={currentIdol.moment_link || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`bg-white/10 p-3 rounded-xl flex flex-col items-center gap-2 w-24 hover:bg-white/20 transition-colors cursor-pointer ${!currentIdol.moment_link && 'opacity-50 cursor-not-allowed'}`}
                                    onClick={(e) => !currentIdol.moment_link && e.preventDefault()}
                                >
                                    <Camera size={20} className="text-green-400" />
                                    <span className="text-xs font-bold text-gray-300">Moments</span>
                                </a>
                                <button
                                    onClick={() => setShowWiki(true)}
                                    className="bg-white/10 p-3 rounded-xl flex flex-col items-center gap-2 w-24 hover:bg-white/20 transition-colors cursor-pointer"
                                >
                                    <BookOpen size={20} className="text-blue-400" />
                                    <span className="text-xs font-bold text-gray-300">Wiki</span>
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Controls */}
                    <div className="flex gap-4 mt-8 justify-center md:justify-start">
                        <button onClick={prevSlide} className="p-4 rounded-full border border-gray-700 hover:bg-white/10 transition-colors">
                            ←
                        </button>
                        <button onClick={nextSlide} className="p-4 rounded-full border border-gray-700 hover:bg-white/10 transition-colors">
                            →
                        </button>
                    </div>
                </div>

                {/* 3D Carousel Graphic */}
                <div className="w-full md:w-2/3 h-[50vh] flex items-center justify-center relative perspective-1000">
                    <AnimatePresence mode="popLayout">
                        <motion.img
                            key={activeIndex}
                            src={currentIdol.img}
                            alt={currentIdol.name}
                            initial={{ opacity: 0, scale: 0.8, rotateY: 45, x: 200 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0, x: 0, zIndex: 10 }}
                            exit={{ opacity: 0, scale: 0.8, rotateY: -45, x: -200, zIndex: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="w-full max-w-sm object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                        />
                    </AnimatePresence>
                </div>
            </div>

            {/* Wiki Modal */}
            <AnimatePresence>
                {showWiki && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                        onClick={() => setShowWiki(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-neutral-800 text-white p-8 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto relative shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowWiki(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                            <h2 className="text-3xl font-serif font-bold mb-6 border-b border-white/10 pb-4">{currentIdol.name} - Wiki</h2>
                            <div className="prose prose-invert prose-lg max-w-none">
                                <p className="whitespace-pre-line leading-relaxed text-gray-300">
                                    {currentIdol.wiki_content || "No wiki content available."}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default IdolProfiles;
