import React, { useState } from "react";
import { motion } from "framer-motion";

// 設定每張圖片對應的 position
const images = [
  { src: "/tata01.jpg",
    position: "center",
    mobilePosition: "center"
  },
  { src: "/tata02.jpg",
    position: "top",
    mobilePosition: "5% 50%"
  },
  { src: "/tata03.jpg",
    position: "50% 30%",
    mobilePosition: "70% center"
  },   
  { src: "/tata04.jpg",
    position: "100% 80%",
    mobilePosition: "1% center"
  }, 
  { src: "/tata05.jpg",
    position: "100% 40%",
    mobilePosition: "7% center"
  },
  { src: "/tata06.jpg",
    position: "center",
    mobilePosition: "80% center"
  },
  { src: "/tata07.jpg",
    position: "50% 30%",
    mobilePosition: "55% center"
  },
  { src: "/tata08.jpg",
    position: "60% 100%",
    mobilePosition: "center"
  }, 
  { src: "/tata09.jpg",
    position: "80% 60%",
    mobilePosition: "15% center"
  },
  { src: "/tata10.jpg",
    position: "80% 60%",
    mobilePosition: "75% center"
  }
];

const projects = [
  {
    id: 1,
    title: "一個大坑",
    img: "https://i.imgur.com/MSfsMBu.jpeg",
    url: "https://chihpao.notion.site/120daaa899518090a0e8ffef49017ccc",
  },
  {
    id: 2,
    title: "我的生活",
    img: "https://i.imgur.com/1klKIL5.jpeg",
    url: "https://www.instagram.com/bobbie__moel",
  },
  {
    id: 3,
    title: "我的專案",
    img: "https://i.imgur.com/sljKu6Z.jpeg",
    url: "https://github.com/chihpao?tab=repositories",
  },
];

const timelineEvents = [
  {
    year: 2021,
    event: "從紙箱出生",
    img: "https://i.imgur.com/5ZUdQMT.jpeg",
  },
  {
    year: 2022,
    event: "開始在筆電旁睡覺",
    img: "https://i.imgur.com/5UdxPFD.jpeg",
  },
  {
    year: 2023,
    event: "電腦椅也被占據了",
    img: "https://i.imgur.com/gi9kUwN.jpeg",
  },
  {
    year: 2024,
    event: "隨時準備偷襲媽咪",
    img: "https://i.imgur.com/vNSncQm.jpeg",
  },
  {
    year: 2025,
    event: "回眸一看百媚生",
    img: "https://i.imgur.com/Lse14kD.jpeg",
  },
];

function HeroSection() {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // 最小滑動距離
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrevious();
    }
  };

  const handlePrevious = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative h-screen">
      <div 
        className="w-full h-[calc(100vh-64px)] relative overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full relative"
          style={{
            backgroundImage: `url(${images[index].src})`,
            backgroundPosition: window.innerWidth <= 768 
              ? images[index].mobilePosition 
              : images[index].position,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />

        {/* 簡潔的箭頭按鈕 */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
          <motion.button
            onClick={handlePrevious}
            className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center hover:bg-black/50 transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>

          <motion.button
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center hover:bg-black/50 transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
}

function TransitionSection() {
  return (
    <div className="relative h-[40px] md:h-[60px] overflow-hidden bg-gradient-to-b from-transparent to-gray-900 -mt-1 -mb-1">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <svg
          className="absolute w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
        >
          {[...Array(8)].map((_, i) => (
            <motion.path
              key={i}
              d={`M 500 50 L ${
                500 + 250 * Math.cos((i * Math.PI) / 4)
              } ${50 + 250 * Math.sin((i * Math.PI) / 4)}`}
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="3"
              fill="none"
              animate={{
                opacity: [0.3, 0.8, 0.3],
                pathLength: [0, 1, 0],
                strokeWidth: ["3px", "4px", "3px"],
              }}
              style={{
                willChange: "transform",
                transformOrigin: "500px 50px",
              }}
            />
          ))}
          <motion.circle
            cx="500"
            cy="50"
            r="10"
            fill="rgba(255,255,255,0.9)"
            animate={{
              scale: [1, 3, 1],
              opacity: [0.9, 0.4, 0.9],
              r: [10, 15, 10],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              filter: "drop-shadow(0 0 4px rgba(255,255,255,0.8))",
            }}
          />
          <motion.circle
            cx="500"
            cy="50"
            r="20"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="3"
            fill="none"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.6, 0.2, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              filter: "drop-shadow(0 0 3px rgba(255,255,255,0.6))",
            }}
          />
        </svg>
      </motion.div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-2xl hover:bg-gray-50 active:bg-gray-100 transition p-4 sm:p-6 relative"
    >
      <div className="mb-4 select-none">
        <motion.div
          className="text-xl font-bold mb-4 text-center p-3 rounded-lg"
          initial={{ backgroundColor: "transparent", color: "#1F2937" }}
          whileHover={{
            scale: 1.02,
            backgroundColor: "#000000",
            color: "#FFFFFF",
            transition: { duration: 0.3 },
          }}
        >
          {project.title}
        </motion.div>
        {project.description && (
          <motion.div
            className="text-sm text-center p-3 rounded-lg mt-2"
            initial={{ backgroundColor: "transparent", color: "#4B5563" }}
            whileHover={{
              scale: 1.02,
              backgroundColor: "#000000",
              color: "#FFFFFF",
              transition: { duration: 0.3 },
            }}
          >
            {project.description}
          </motion.div>
        )}
      </div>
      <div className="relative aspect-w-16 aspect-h-10 overflow-hidden rounded-lg">
        <motion.img
          src={project.img}
          alt={project.title}
          className="object-cover w-full h-full transform"
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.4 },
          }}
        />
      </div>
    </motion.a>
  );
}

// 箭頭樣式
function TimelineArrow() {
  return (
    <motion.div
      className="absolute w-8 h-24"
      animate={{
        y: ["0%", "100%"],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
    >
      <svg viewBox="0 0 32 96" className="w-full h-full">
        <motion.path
          d="M16 4 L16 72 M8 64 L16 72 L24 64"
          stroke="black"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
          }}
        />
      </svg>
    </motion.div>
  );
}

function Timeline() {
  return (
    <div className="relative py-8">
      {/* 現代化動態箭頭時間軸 */}
      <div className="hidden md:block">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full z-10">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="absolute left-1/2 transform -translate-x-1/2"
              style={{
                top: `${index * 20}%`,
                color: `hsl(${index * 30}, 70%, 50%)`,
                marginLeft: "-16px",
              }}
            >
              <TimelineArrow />
            </div>
          ))}
        </div>
      </div>

      {/* 時間軸內容 */}
      {timelineEvents.map((event, index) => (
        <motion.div
          key={event.year}
          className={`flex flex-col md:flex-row items-center mb-16 md:mb-24 relative ${
            index % 2 === 0 ? "md:flex-row-reverse" : ""
          }`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
        >
          {/* 手機版文字樣式 */}
          <div className="flex items-center justify-center w-[calc(100%-1rem)] mx-2 md:hidden z-60">
            <motion.div
              // 移除邊框與背景，只保留文字
              className="w-full text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-2xl font-bold text-gray-900">
                {event.year}
              </span>
              <span className="mx-3 text-gray-400">→</span>
              <span className="text-lg text-gray-900">{event.event}</span>
            </motion.div>
          </div>

          {/* 圖片區塊 */}
          <motion.div
            className="w-[calc(100%-1rem)] md:w-[calc(50%-4rem)] mx-2 md:mx-8 z-40"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
                <motion.img
                  src={event.img}
                  alt={event.event}
                  className="absolute inset-0 w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* 桌面版文字樣式 */}
          <motion.div
            className={`hidden md:block w-[calc(50%-4rem)] p-6 ${
              index % 2 === 0 ? "text-right pr-16" : "text-left pl-16"
            }`}
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div
              // 同樣移除背景與邊框，只保留文字
              className="text-center"
              whileHover={{ scale: 1.02 }}
            >
              <motion.h3
                className="text-3xl font-bold text-gray-900 mb-3 inline-block"
                whileHover={{ scale: 1.05 }}
              >
                {event.year}
              </motion.h3>
              <motion.p
                className="text-xl text-gray-700 leading-relaxed font-medium"
                whileHover={{ x: index % 2 === 0 ? -10 : 10 }}
              >
                {event.event}
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

function Homepage() {
  return (
    <div className="bg-gray-50">
      <HeroSection />
      <TransitionSection />
      <section className="py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
      {/* podcast section 先蓋住，因為鼠標會影響*/}
      {/* <section className="px-4 md:px-8" >
        <div className="max-w-7xl mx-auto">
          <div style={{ cursor: 'none', position: 'relative'}}>
            <h3 className="text-xl font-bold mb-4">收聽 Podcast</h3>
            <div>
              <iframe
                className="w-full h-[200px] rounded-lg mb-2"
                src="https://open.spotify.com/embed/show/2gMSpNkgeKlE2Nyu8Ru4gw"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section> */}

      <section className="px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            TaTa成長時間軸
          </h2>
          <Timeline />
        </div>
      </section>
    </div>
  );
}

export default Homepage;