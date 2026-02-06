const Footer = () => {
    return (
        <footer className="bg-brand-dark text-white py-20 px-6 border-t border-gray-800">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                    <h3 className="text-2xl font-serif font-bold mb-2">LifeTaste ‧ 品嘗日常</h3>
                    <p className="text-gray-400 text-sm max-w-sm">
                        Original content based on "KPOP追星全解析：從入坑到日常，粉絲都懂得那些小事"
                    </p>
                </div>

                <div className="flex gap-6">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Article</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">About</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
                </div>

                <div className="text-xs text-gray-500">
                    © 2024 K-Pop Feature Report. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
