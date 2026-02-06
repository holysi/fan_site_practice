import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Gift, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Papa from 'papaparse';
import membersCsv from '../data/birthday_members.csv?raw';
import eventsCsv from '../data/birthday_events.csv?raw';

interface MemberData {
    id: string;
    name: string;
    avatar: string;
}

interface EventData {
    id: number;
    member: string;
    type: string;
    title: string;
    date: string;
    location: string;
    img: string;
    video?: string;
    desc: string;
}

const Birthday = () => {
    const [filter, setFilter] = useState('all');
    const [members, setMembers] = useState<MemberData[]>([]);
    const [events, setEvents] = useState<EventData[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Parse Members
        Papa.parse(membersCsv, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                if (results.data) {
                    setMembers(results.data as MemberData[]);
                }
            },
            error: (error: Error) => console.error("Error parsing members CSV:", error)
        });

        // Parse Events
        Papa.parse(eventsCsv, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (results) => {
                if (results.data) {
                    setEvents(results.data as EventData[]);
                }
            },
            error: (error: Error) => console.error("Error parsing events CSV:", error)
        });
    }, []);

    const filteredEvents = filter === 'all' ? events : events.filter(e => e.member === filter);

    return (
        <div className="min-h-screen bg-pink-50 text-brand-dark overflow-hidden flex flex-col">
            <nav className="p-6 flex items-center justify-between z-40 bg-white/50 backdrop-blur-sm sticky top-0">
                <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-dark transition-colors">
                    <ArrowLeft size={20} /> <span className="font-bold">Back</span>
                </Link>
                <h1 className="text-xl font-serif font-bold">Birthday Support Projects</h1>
            </nav>

            {/* Top Row: Members */}
            <div className="py-8 px-6 flex gap-4 overflow-x-auto no-scrollbar justify-center bg-white/30 backdrop-blur-md border-b border-white/50 z-30">
                {members.map(m => (
                    <button
                        key={m.id}
                        onClick={() => setFilter(m.id)}
                        className={`flex flex-col items-center gap-2 group transition-all duration-300 ${filter === m.id ? 'scale-110 opacity-100' : 'opacity-60 hover:opacity-100'}`}
                    >
                        <div className={`w-16 h-16 rounded-full overflow-hidden border-2 ${filter === m.id ? 'border-brand-accent shadow-lg' : 'border-transparent'}`}>
                            {m.id === 'all' ? (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 text-xs">ALL</div>
                            ) : (
                                <img src={m.avatar} alt={m.name} className="w-full h-full object-cover" />
                            )}
                        </div>
                        <span className="text-xs font-bold tracking-widest">{m.name}</span>
                    </button>
                ))}
            </div>

            {/* Bottom Row: Event River */}
            <div
                ref={scrollContainerRef}
                className="flex-1 overflow-x-auto flex items-center gap-8 px-12 py-12 cursor-grab active:cursor-grabbing no-scrollbar snap-x snap-mandatory"
                onWheel={(e) => {
                    if (scrollContainerRef.current) {
                        scrollContainerRef.current.scrollLeft += e.deltaY;
                    }
                }}
            >
                <AnimatePresence mode="popLayout">
                    {filteredEvents.map((event) => (
                        <motion.div
                            key={event.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8, x: 50 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 50 }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            onClick={() => setSelectedEvent(event)}
                            whileHover={{ scale: 1.05, y: -10 }}
                            className="relative w-[300px] md:w-[400px] aspect-[4/5] flex-shrink-0 bg-white rounded-3xl overflow-hidden shadow-xl snap-center cursor-pointer group"
                        >
                            <img src={event.img} alt={event.title} className="w-full h-full object-cover" />

                            {/* Overlay Info */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white opacity-90 group-hover:opacity-100 transition-opacity">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-brand-accent px-2 py-1 rounded text-xs font-bold uppercase">{event.type}</span>
                                    <span className="flex items-center gap-1 text-xs text-gray-300"><Calendar size={12} /> {event.date}</span>
                                </div>
                                <h3 className="text-2xl font-serif font-bold mb-1">{event.title}</h3>
                                <div className="flex items-center gap-1 text-xs text-gray-300 mb-4">
                                    <MapPin size={12} /> {event.location}
                                </div>
                                {event.video && (
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/30 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Play fill="white" className="ml-1" />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Instruction */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-400 text-xs uppercase tracking-widest animate-pulse pointer-events-none">
                Scroll Horizontal
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedEvent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6 backdrop-blur-md"
                        onClick={() => setSelectedEvent(null)}
                    >
                        <div
                            className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Media Side */}
                            <div className="w-full md:w-2/3 h-[40vh] md:h-auto bg-black relative">
                                {selectedEvent.video ? (
                                    <div className="w-full h-full flex items-center justify-center text-white">
                                        <div className="text-center">
                                            <Play size={48} className="mx-auto mb-2 opacity-50" />
                                            <p>Video Playback Placeholder</p>
                                        </div>
                                    </div>
                                ) : (
                                    <img src={selectedEvent.img} alt={selectedEvent.title} className="w-full h-full object-cover" />
                                )}
                                <button
                                    onClick={() => setSelectedEvent(null)}
                                    className="absolute top-4 left-4 bg-black/50 p-2 rounded-full text-white hover:bg-black transition-colors md:hidden"
                                >
                                    <ArrowLeft size={20} />
                                </button>
                            </div>

                            {/* Info Side */}
                            <div className="w-full md:w-1/3 p-8 flex flex-col justify-between">
                                <div>
                                    <span className="text-brand-accent font-bold tracking-widest text-xs uppercase mb-2 block">{selectedEvent.type} SUPPORT</span>
                                    <h2 className="text-3xl font-serif font-bold mb-4">{selectedEvent.title}</h2>
                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        {selectedEvent.desc}
                                    </p>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-sm text-gray-500">
                                            <div className="bg-pink-100 p-2 rounded-lg text-brand-accent"><Calendar size={18} /></div>
                                            <div>
                                                <p className="font-bold text-gray-900">Date</p>
                                                <p>{selectedEvent.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-500">
                                            <div className="bg-pink-100 p-2 rounded-lg text-brand-accent"><MapPin size={18} /></div>
                                            <div>
                                                <p className="font-bold text-gray-900">Location</p>
                                                <p>{selectedEvent.location}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-500">
                                            <div className="bg-pink-100 p-2 rounded-lg text-brand-accent"><Gift size={18} /></div>
                                            <div>
                                                <p className="font-bold text-gray-900">Organizer</p>
                                                <p>@KPopFanClub_TW</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelectedEvent(null)}
                                    className="w-full bg-brand-dark text-white py-4 rounded-xl font-bold hover:bg-brand-accent transition-colors mt-8"
                                >
                                    Close Details
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Birthday;
