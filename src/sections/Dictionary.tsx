import { motion } from 'framer-motion';

const terms = [
    {
        title: "追蹤",
        korean: "following",
        desc: "正式成為某位偶像的粉絲！當你開始不自覺追蹤他的每一則新動態，恭喜你！"
    },
    {
        title: "粉絲團",
        korean: "fanclubs",
        desc: "偶像發布各種TMI或粉絲們一起分享一起玩的園地"
    },
    {
        title: "群聊",
        korean: "chats",
        desc: "和粉絲們一起聊偶像的聊天群。"
    },
    {
        title: "moments",
        korean: "moments",
        desc: "每個粉絲的個人心情紀錄，可公開可私密，完整紀錄時間、地點、心情、照片等。"
    },
    {
        title: "AI鬧鐘",
        korean: "AI voice alarm",
        desc: "偶像們為各位粉絲客製化的鬧鐘，可以設定時間和內容，讓粉絲在起床時就能聽到偶像們的聲音。"
    },
    {
        title: "AI語音信",
        korean: "AI voice message",
        desc: "隨機，偶像們會用他們的聲音傳訊息給粉絲"
    }
];

const Dictionary = () => {
    return (
        <section className="py-32 px-6 bg-brand-soft">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-serif font-bold mb-4"
                    >
                        hidol名詞大辭典
                    </motion.h2>
                    <p className="text-gray-500 font-sans">hidol Dictionary for Beginners</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {terms.map((term, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10, transition: { duration: 0.3 } }}
                            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group cursor-default"
                        >
                            <div className="mb-4">
                                <h3 className="text-2xl font-bold font-serif group-hover:text-brand-accent transition-colors">
                                    {term.title}
                                </h3>
                                <span className="text-xs font-mono text-gray-400 mt-1 block">
                                    {term.korean}
                                </span>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                {term.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Dictionary;
