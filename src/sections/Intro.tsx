import { motion } from 'framer-motion';
import ParallaxSection from '../components/ParallaxSection';

const Intro = () => {
    return (
        <section className="relative py-24 px-6 md:px-12 bg-white text-brand-dark overflow-hidden">
            <div className="max-w-4xl mx-auto md:grid md:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <div className="relative z-10 space-y-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-serif font-bold mb-6"
                    >
                        關於共同記憶這件事
                        <span className="block text-2xl md:text-3xl font-light text-brand-accent mt-2 font-sans">
                            hidol Moment
                        </span>
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="prose prose-lg text-gray-600 leading-relaxed font-sans"
                    >
                        <p>
                            一開始只是被美好的皮囊吸引，當靈魂被治癒的時候發現自己已經無法自拔。
                            記錄當下的感動和情緒， <span className="text-black font-semibold">hidol moment</span> 成了我們共同的記憶。
                        </p>
                        <p>
                            每個團體的粉絲們有著不同鮮明的個性，這個圈子有一整套神秘術語跟粉絲文化，
                            讓我們一起探索這個既瘋狂又迷人的世界吧！
                        </p>
                        <p className="border-l-4 border-brand-accent pl-4 italic text-black font-medium my-8">
                            如果你覺得推活少了點甚麼，不妨跟著hidol的大家一起把發布moment編寫我們的共同記憶吧！
                        </p>
                    </motion.div>
                </div>

                {/* Visual / Floating Elements */}
                <div className="relative h-[500px] mt-12 md:mt-0 hidden md:block">
                    {/* Using ParallaxSection for floating images */}
                    <ParallaxSection speed={0.2} className="absolute top-10 right-10 z-10">
                        <img
                            src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2670&auto=format&fit=crop"
                            alt="Lightstick concept"
                            className="w-64 h-80 object-cover shadow-2xl rounded-lg rotate-3 grayscale hover:grayscale-0 transition-all duration-500"
                        />
                    </ParallaxSection>

                    <ParallaxSection speed={-0.1} className="absolute bottom-20 left-0 z-0">
                        <div className="w-56 h-64 bg-gray-100 rounded-lg p-4 shadow-xl -rotate-6 flex items-center justify-center">
                            <p className="font-serif text-3xl font-bold text-gray-200">STAN</p>
                        </div>
                    </ParallaxSection>
                </div>
            </div>
        </section>
    );
};

export default Intro;
