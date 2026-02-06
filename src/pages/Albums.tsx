import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, Share2, Music2, Disc } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import Papa from 'papaparse';
import albumsCsv from '../data/albums.csv?raw';

interface AlbumData {
    year: string;
    title: string;
    type: string;
    sales: string;
    img: string;
    desc: string;
    link?: string;
}

const Albums = () => {
    const [albums, setAlbums] = useState<AlbumData[]>([]);
    const ref = useRef(null);

    useEffect(() => {
        Papa.parse(albumsCsv, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                if (results.data) {
                    setAlbums(results.data as AlbumData[]);
                }
            },
            error: (error: Error) => {
                console.error("Error parsing CSV:", error);
            }
        });
    }, []);
    const { scrollYProgress } = useScroll({ target: ref });
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div ref={ref} className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-brand-accent">
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-brand-accent origin-left z-50"
                style={{ scaleX }}
            />

            <nav className="fixed top-0 w-full p-6 z-40 bg-gradient-to-b from-neutral-900/80 to-transparent backdrop-blur-sm">
                <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft size={20} /> <span className="uppercase tracking-widest text-sm font-bold">Back</span>
                </Link>
            </nav>

            <header className="pt-32 pb-20 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-8xl font-serif font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-600">
                        hidol活動共同記憶
                    </h1>
                    <p className="text-gray-400 max-w-xl mx-auto text-lg md:text-xl font-light">
                        每次你參與活動寫下的moment都是我們一起見證偶像成長的歷程。
                    </p>
                </motion.div>
            </header>

            <div className="max-w-5xl mx-auto px-6 pb-32 relative">
                {/* Central Line */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gray-800 md:-translate-x-1/2" />

                <div className="space-y-24">
                    {/* Group albums by year */}
                    {Object.entries(
                        albums.reduce((acc, album) => {
                            (acc[album.year] = acc[album.year] || []).push(album);
                            return acc;
                        }, {} as Record<string, AlbumData[]>)
                    ).map(([year, yearAlbums], index) => (
                        <motion.div
                            key={year}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`relative flex flex-col md:flex-row gap-8 items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Timeline Dot */}
                            <div className="absolute left-6 md:left-1/2 top-8 w-4 h-4 bg-brand-accent rounded-full border-4 border-neutral-950 -translate-x-1/2 z-10" />

                            {/* Year Label */}
                            <div className={`md:w-1/2 flex ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} pl-12 md:pl-0 md:px-12 pt-2`}>
                                <span className="text-6xl font-bold text-gray-800 font-serif leading-none opacity-50 select-none sticky top-32">
                                    {year}
                                </span>
                            </div>

                            {/* Albums Stack */}
                            <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12 space-y-12">
                                {yearAlbums.map((album, albumIndex) => (
                                    <div key={albumIndex} className="group relative bg-neutral-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-brand-accent/50 transition-colors duration-300">
                                        {/* Image */}
                                        <div className="w-full overflow-hidden bg-black/20">
                                            <img
                                                src={album.img}
                                                alt={album.title}
                                                className="w-full h-auto max-h-[500px] object-contain mx-auto transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>

                                        {/* Text */}
                                        <div className="p-6">
                                            <div className="flex items-center gap-2 text-brand-accent text-xs font-bold uppercase tracking-wider mb-2">
                                                <Disc size={14} />
                                                {album.type}
                                            </div>
                                            <h3 className="text-2xl font-bold mb-2 font-serif group-hover:text-brand-accent transition-colors">
                                                {album.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                                                {album.desc}
                                            </p>
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                                                <span className="text-gray-500 text-sm flex items-center gap-2">
                                                    <Music2 size={16} /> moments: {album.sales}
                                                </span>
                                                <a
                                                    href={album.link || '#'}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`p-2 rounded-full transition-colors text-white ${album.link ? 'hover:bg-white/10 text-brand-accent' : 'opacity-50 cursor-not-allowed hover:bg-transparent text-gray-500'}`}
                                                    onClick={(e) => !album.link && e.preventDefault()}
                                                >
                                                    <Share2 size={18} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Albums;
