import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const FandomCulture = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"]);

    const items = [
        {
            title: "活動",
            img: "https://static.hidol.com/hidol/fanclub/45450846-7549-4035-8D7D-0AF9AC749393-183032C3-C00D-431B-B20D-7A09D653BBA9.jpeg",
            desc: "你參加過的每個活動，都在這裡留下紀錄！點擊查看歷年活動時間軸並前往回味。",
            link: "/culture/albums"
        },
        {
            title: "小卡",
            img: "https://static.hidol.com/hidol/fanclub/8F506AEC-CE60-402F-ABDD-903B5DD8A2F2-836B7B31-7032-44FA-B43D-ACAEC556F93E.jpeg",
            desc: "hidol每次活動發行的小卡，也是萬惡之源。點擊進入小卡相簿並回味或到hidol尋找交換收集的管道。",
            link: "/culture/photocards"
        },
        {
            title: "偶像介紹",
            img: "https://static.hidol.com/hidol/fanclub/cf8e70ec-939d-4f52-b18c-133aa850b8e7-1763095888141.jpg",
            desc: "透過moment我們用另一種不同方式來認這這些偶像",
            link: "/culture/lightsticks"
        },
        {
            title: "朝聖地圖",
            img: "https://static.hidol.com/hidol/fanclub/6443F038-E293-4F9E-A1AB-F22DD9CD36DD-43FDD195-0CF2-4F16-B3C8-64EAD089071E.jpeg",
            desc: "跟偶像近距離面對面聊天的夢幻時刻。點擊查看每個moment記錄到的聖地資訊。",
            link: "/culture/fansign"
        },
        {
            title: "生日應援",
            img: "https://static.hidol.com/hidol/fanclub/2F5104C4-5520-4D4D-98D1-C3AC27188623-1DCB61E3-FB2B-4E02-B31A-00D139511F66.png",
            desc: "生咖、燈箱、展覽，用盡全力祝你生日快樂！點擊查看應援河道。",
            link: "/culture/birthday"
        }
    ];

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-neutral-900 text-white">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                <div className="absolute top-10 left-10 md:top-20 md:left-20 z-10 mix-blend-difference">
                    <h2 className="text-5xl md:text-7xl font-bold font-serif text-white mb-2">
                        hidol的共同回憶
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-300 font-light">
                        粉絲們的moment在這裡被集結並重新編寫成全新的章節
                    </p>
                </div>

                <motion.div style={{ x }} className="flex gap-10 pl-[50vw]">
                    {items.map((item, index) => (
                        <Link to={item.link} key={index} className="group relative h-[60vh] w-[80vw] md:w-[400px] flex-shrink-0 overflow-hidden rounded-2xl bg-gray-800 cursor-pointer block">
                            <img
                                src={item.img}
                                alt={item.title}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent p-8 flex flex-col justify-end">
                                <h3 className="text-3xl font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    {item.desc}
                                </p>
                                <span className="mt-4 text-brand-accent text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                    Explore &rarr;
                                </span>
                            </div>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FandomCulture;
