import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import locationsCsv from '../data/fansign_locations.csv?raw';

// Fix Leaflet default icon issue
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

interface LocationData {
    id: number;
    name: string;
    lat: number;
    lng: number;
    img: string;
    desc?: string;
}

const heartIcon = L.divIcon({
    className: 'bg-transparent border-none overflow-visible',
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 28 28" fill="#ec4899" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full filter drop-shadow-md hover:scale-110 transition-transform duration-200 overflow-visible">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5 4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
});

const LocationCarousel = ({ group }: { group: LocationData[] }) => {
    const [index, setIndex] = useState(0);
    const loc = group[index];

    const next = () => setIndex((i) => (i + 1) % group.length);
    const prev = () => setIndex((i) => (i - 1 + group.length) % group.length);

    return (
        <div className="w-64 p-2 relative">
            {group.length > 1 && (
                <>
                    <button
                        onClick={(e) => { e.stopPropagation(); prev(); }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 z-10 bg-white shadow-md rounded-full p-1 text-brand-dark hover:bg-gray-100"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); next(); }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 z-10 bg-white shadow-md rounded-full p-1 text-brand-dark hover:bg-gray-100"
                    >
                        <ChevronRight size={16} />
                    </button>
                    <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full z-10">
                        {index + 1} / {group.length}
                    </div>
                </>
            )}

            <img src={loc.img} alt={loc.name} className="max-w-full max-h-72 w-auto h-auto rounded-lg mb-3 mx-auto block" />
            <h3 className="text-lg font-bold font-serif mb-1">{loc.name}</h3>
            <p className="text-xs text-gray-500 mb-3 whitespace-pre-line">{loc.desc}</p>
            <a
                href={`https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-brand-accent text-white py-2 rounded-lg text-sm font-bold hover:bg-red-600 transition-colors"
                onClick={(e) => e.stopPropagation()}
            >
                <MapPin size={16} /> Open in Google Maps
            </a>
        </div>
    );
};

const FanSign = () => {
    // Taiwan Center - using array format [lat, lng]
    const center: [number, number] = [23.973875, 120.982024];
    const [locations, setLocations] = useState<LocationData[]>([]);

    useEffect(() => {
        Papa.parse(locationsCsv, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: (results) => {
                if (results.data) {
                    setLocations(results.data as LocationData[]);
                }
            },
            error: (error: Error) => {
                console.error("Error parsing CSV:", error);
            }
        });
    }, []);

    useEffect(() => {
        // Fix icons only once on mount
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: markerIcon2x,
            iconUrl: markerIcon,
            shadowUrl: markerShadow,
        });
    }, []);

    return (
        <div className="h-screen w-full relative bg-gray-100">
            {/* UI Overlay */}
            <div className="absolute top-0 left-0 w-full p-6 z-[1000] pointer-events-none">
                <Link to="/" className="inline-flex items-center gap-2 text-brand-dark bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg pointer-events-auto hover:bg-white transition-colors">
                    <ArrowLeft size={18} /> <span className="font-bold">Exit Map</span>
                </Link>
            </div>

            <div className="absolute bottom-8 left-6 md:left-12 z-[1000] pointer-events-none">
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-dark drop-shadow-lg mb-2">偶像足跡</h1>
                <p className="text-gray-600 bg-white/80 backdrop-blur inline-block px-3 py-1 rounded-lg">
                    凡走過必留下足跡，追隨偶像拜訪過的每一個角落。
                </p>
            </div>

            {/* Map Wrapper with Lenis prevent */}
            <div className="w-full h-full" data-lenis-prevent>
                <MapContainer
                    center={center}
                    zoom={8}
                    scrollWheelZoom={true}
                    style={{ height: "100vh", width: "100%" }}
                    className="z-0 outline-none"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {Object.values(
                        locations.reduce((acc, loc) => {
                            const key = `${loc.lat},${loc.lng}`;
                            if (!acc[key]) acc[key] = [];
                            acc[key].push(loc);
                            return acc;
                        }, {} as Record<string, LocationData[]>)
                    ).map((group, index) => (
                        <Marker key={index} position={[group[0].lat, group[0].lng]} icon={heartIcon}>
                            <Popup className="custom-popup">
                                <LocationCarousel group={group} />
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default FanSign;
