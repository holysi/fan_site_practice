import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, X, ZoomIn } from 'lucide-react';
import Papa from 'papaparse';
import photocardsCsv from '../data/photocards.csv?raw';

interface PhotocardData {
    id: number;
    member: string;
    version: string;
    img: string;
    wishlist_link?: string;
    trade_link?: string;
}

const Photocards = () => {
    const [photocards, setPhotocards] = useState<PhotocardData[]>([]);
    const [selectedCard, setSelectedCard] = useState<PhotocardData | null>(null);

    useEffect(() => {
        Papa.parse(photocardsCsv, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (results) => {
                if (results.data) {
                    setPhotocards(results.data as PhotocardData[]);
                }
            },
            error: (error: Error) => console.error("Error parsing photocards CSV:", error)
        });
    }, []);

    return (
        <div className="min-h-screen bg-neutral-100 text-brand-dark p-6 md:p-12">
            <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-dark transition-colors mb-8 fixed top-6 left-6 z-40 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm">
                <ArrowLeft size={18} /> <span className="font-bold text-sm">EXIT</span>
            </Link>

            <header className="pt-20 pb-12 text-center">
                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">hidol小卡櫥窗</h1>
                <p className="text-gray-500">所有hidol發行過的小卡都在這裡可以看到</p>
            </header>

            {/* Masonry-ish Grid */}
            <div className="columns-2 md:columns-3 lg:columns-4 gap-6 max-w-7xl mx-auto space-y-6">
                {photocards.map((card, index) => (
                    <motion.div
                        key={card.id}
                        layoutId={`card-${card.id}`}
                        onClick={() => setSelectedCard(card)}
                        whileHover={{ scale: 1.05, zIndex: 10 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="relative group cursor-zoom-in break-inside-avoid"
                    >
                        <div className="rounded-xl overflow-hidden shadow-md bg-white p-2 pb-0">
                            <img
                                src={card.img}
                                alt={card.member}
                                className="w-full h-auto rounded-lg" // Aspect ratio handled by image naturally
                            />
                            <div className="p-3 text-center">
                                <h3 className="font-bold text-sm">{card.member}</h3>
                                <p className="text-xs text-gray-400">{card.version}</p>
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <div className="bg-white/90 p-2 rounded-full shadow-lg">
                                    <ZoomIn size={20} className="text-brand-dark" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedCard && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
                        onClick={() => setSelectedCard(null)}
                    >
                        <motion.div
                            layoutId={`card-${selectedCard.id}`}
                            className="relative bg-white p-2 rounded-2xl max-w-sm w-full shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()} // Prevent close on card click
                        >
                            <button
                                onClick={() => setSelectedCard(null)}
                                className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full text-white hover:bg-black transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <img
                                src={selectedCard.img}
                                alt={selectedCard.member}
                                className="w-full rounded-xl"
                            />

                            <div className="p-6 text-center">
                                <h2 className="text-3xl font-serif font-bold mb-2">{selectedCard.member}</h2>
                                <p className="text-gray-500 uppercase tracking-widest text-sm">{selectedCard.version}</p>
                                <div className="mt-6 flex justify-center gap-4">
                                    <a
                                        href={selectedCard.wishlist_link || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`bg-brand-dark text-white px-6 py-2 rounded-full text-sm font-bold transition-colors inline-block ${selectedCard.wishlist_link ? 'hover:bg-brand-accent' : 'opacity-50 cursor-not-allowed hover:bg-brand-dark'}`}
                                        onClick={(e) => !selectedCard.wishlist_link && e.preventDefault()}
                                    >
                                        Add to Wishlist
                                    </a>
                                    <a
                                        href={selectedCard.trade_link || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`border border-gray-300 px-6 py-2 rounded-full text-sm font-bold transition-colors inline-block ${selectedCard.trade_link ? 'hover:bg-gray-50 text-brand-dark' : 'opacity-50 cursor-not-allowed text-gray-400 hover:bg-transparent'}`}
                                        onClick={(e) => !selectedCard.trade_link && e.preventDefault()}
                                    >
                                        Find Trade
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Photocards;
