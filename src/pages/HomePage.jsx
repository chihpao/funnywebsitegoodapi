import React from 'react';
import { motion } from 'framer-motion';

// Static data
const projects = [
  { 
    id: 1, 
    title: "一個大坑", 
    img:"https://i.imgur.com/MSfsMBu.jpeg" , 
    url: "https://chihpao.notion.site/120daaa899518090a0e8ffef49017ccc" 
  },
  { id: 2, title: "我的生活", 
    img: "https://i.imgur.com/1klKIL5.jpeg", 
    url: "https://chihpao.notion.site/120daaa899518090a0e8ffef49017ccc"
  },
  { id: 3, 
    title: "我的專案", 
    img:"https://i.imgur.com/sljKu6Z.jpeg" , 
    url: "https://chihpao.notion.site/120daaa899518090a0e8ffef49017ccc"
  }
];

const timelineEvents = [
  { 
    year: 2021, 
    event: "貓咪出生", 
    img: "https://i.imgur.com/5ZUdQMT.jpeg" 
  },
  { 
    year: 2022, 
    event: "第一次外出", 
    img: "https://i.imgur.com/5UdxPFD.jpeg" 
  },
  { 
    year: 2023, 
    event: "學會抓老鼠", 
    img: "https://i.imgur.com/gi9kUwN.jpeg" 
  },
  { 
    year: 2024, 
    event: "成為網紅", 
    img: "https://i.imgur.com/vNSncQm.jpeg" 
  }
];

function HeroSection() {
  return (
    <section className="relative h-screen">
      <div
        className="w-full h-[calc(100vh-64px)] bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/tata02.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center text-white px-4"
        >
          <h1 className="text-4xl md:text-7xl font-bold mb-4 tracking-tight">TaTa</h1>
          <p className="text-lg md:text-2xl font-light">超級好貓</p>
        </motion.div>
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
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100">
          {[...Array(8)].map((_, i) => (
            <motion.path
              key={i}
              d={`M 500 50 L ${500 + 250 * Math.cos(i * Math.PI / 4)} ${50 + 250 * Math.sin(i * Math.PI / 4)}`}
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="3"
              fill="none"
              animate={{
                opacity: [0.3, 0.8, 0.3],
                pathLength: [0, 1, 0],
                rotate: [0, 360],
                strokeWidth: ["3px", "4px", "3px"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2
              }}
              style={{
                transformOrigin: "500px 50px",
                filter: "drop-shadow(0 0 2px rgba(255,255,255,0.5))"
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
              r: [10, 15, 10]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              filter: "drop-shadow(0 0 4px rgba(255,255,255,0.8))"
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
              opacity: [0.6, 0.2, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              filter: "drop-shadow(0 0 3px rgba(255,255,255,0.6))"
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
      className="block rounded-xl overflow-hidden bg-white shadow-lg 
                 hover:shadow-2xl hover:bg-gray-50 
                 active:bg-gray-100 
                 transition-all duration-300 ease-in-out
                 p-4 sm:p-6 relative"
    >
      <div className="mb-4 select-none">
        <motion.div 
          className="text-xl font-bold mb-4 text-center p-3 rounded-lg"
          initial={{ backgroundColor: "transparent", color: "#1F2937" }}
          whileHover={{ 
            scale: 1.02,
            backgroundColor: "#000000",
            color: "#FFFFFF",
            transition: { duration: 0.3 }
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
              transition: { duration: 0.3 }
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
            transition: { duration: 0.4 }
          }}
        />
      </div>
    </motion.a>
  );
}

function Timeline() {
  return (
    <div className="relative py-8">
      {/* 時間軸 - 改為黑色 */}
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-black z-[5]"
      />
      {timelineEvents.map((event, index) => (
        <motion.div
          key={event.year}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          className={`flex flex-col md:flex-row items-center mb-8 md:mb-12 relative ${
            index % 2 === 0 ? 'md:flex-row-reverse' : ''
          }`}
        >
          {/* 手機版文字顯示 - 統一寬度 */}
          <div className="flex items-center justify-center w-[calc(100%-1rem)] mx-2 md:hidden z-20">
            <div className="bg-white w-full px-4 py-2 rounded-t-md shadow-sm flex items-center justify-center">
              <span className="text-xl font-bold text-gray-900">{event.year}</span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-lg text-gray-700">{event.event}</span>
            </div>
          </div>

          {/* 圖片區塊 - 統一寬度和圓角 */}
          <div className="w-[calc(100%-1rem)] md:w-[calc(50%-2rem)] mx-2 md:mx-4 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-b-md md:rounded-xl p-3 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
            >
              <div className="relative aspect-w-16 aspect-h-9">
                <img 
                  src={event.img} 
                  alt={event.event}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
            </motion.div>
          </div>

          {/* 桌面版文字顯示 */}
          <div className={`hidden md:block w-[calc(50%-2rem)] p-4 ${
            index % 2 === 0 ? 'text-right' : 'text-left'
          }`}>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.year}</h3>
            <p className="text-gray-700 text-lg">{event.event}</p>
          </div>

          {/* 圓點 - 改為黑色且置中 */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="absolute left-1/2 top-[50%] transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-black rounded-full z-20 hidden md:block"
          />
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

      <section className="py-8 px-4 md:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <h3 className="text-xl font-bold mb-4">收聽 Podcast</h3>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-[300px] rounded-lg"
                src="https://open.spotify.com/embed/show/2gMSpNkgeKlE2Nyu8Ru4gw"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">成長時間軸</h2>
          <Timeline />
        </div>
      </section>
    </div>
  );
}

export default Homepage;