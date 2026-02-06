import { ReactLenis } from '@studio-freight/react-lenis'
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import Albums from './pages/Albums'
import Photocards from './pages/Photocards'
import FanSign from './pages/FanSign'
import Lightsticks from './pages/Lightsticks'
import Birthday from './pages/Birthday'

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function App() {
    return (
        <Router>
            <ScrollToTop />
            <ReactLenis root>
                <main className="w-full min-h-screen bg-brand-light text-brand-dark selection:bg-brand-accent selection:text-white">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/culture/albums" element={<Albums />} />
                        <Route path="/culture/photocards" element={<Photocards />} />
                        <Route path="/culture/fansign" element={<FanSign />} />
                        <Route path="/culture/lightsticks" element={<Lightsticks />} />
                        <Route path="/culture/birthday" element={<Birthday />} />
                    </Routes>
                </main>
            </ReactLenis>
        </Router>
    )
}

export default App
