import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Heart, Calendar, Music, Radio } from 'lucide-react';

// Static data
const projects = [
  { id: 1, title: "專案一", desc: "描述...", img: "/project1.jpg" },
  { id: 2, title: "專案二", desc: "描述...", img: "/project2.jpg" },
  { id: 3, title: "專案三", desc: "描述...", img: "/project3.jpg" }
];

const moodEmojis = {
  happy: { emoji: '😺', color: 'bg-yellow-400' },
  excited: { emoji: '🙀', color: 'bg-pink-400' },
  sleepy: { emoji: '😾', color: 'bg-blue-400' },
  hungry: { emoji: '😸', color: 'bg-green-400' }
};

const timelineEvents = [
  { year: 2020, event: "貓咪出生", icon: "🐱" },
  { year: 2021, event: "第一次外出", icon: "🌳" },
  { year: 2022, event: "學會抓老鼠", icon: "🐭" },
  { year: 2023, event: "成為網紅", icon: "⭐" }
];

function HeroSection() {
  return (
    <section className="relative h-screen">
      <div
        className="w-full h-[calc(100vh-64px)] bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/tata02.jpg')"
        }}
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
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-8"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, onClick }) {
  return (
    <motion.div
      className="group relative rounded-xl overflow-hidden shadow-lg"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={project.img}
          alt={project.title}
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <div>
          <h3 className="text-white text-xl font-bold">{project.title}</h3>
          <p className="text-gray-200 text-sm mt-2">{project.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

function MoodTracker({ mood, onMoodChange, patCount }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">現在心情</h3>
        <span className="text-sm text-gray-500">摸摸次數: {patCount}</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(moodEmojis).map(([key, { emoji, color }]) => (
          <motion.button
            key={key}
            className={`p-4 rounded-lg ${color} ${mood === key ? 'ring-2 ring-black' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onMoodChange(key)}
          >
            <span className="text-2xl">{emoji}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function Timeline() {
  return (
    <div className="relative py-8">
      <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-gray-200"></div>
      {timelineEvents.map((event, index) => (
        <motion.div
          key={event.year}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className={`flex items-center mb-8 ${
            index % 2 === 0 ? 'md:flex-row-reverse' : ''
          }`}
        >
          <div className="w-full md:w-1/2 p-4">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="text-3xl mb-2">{event.icon}</div>
              <h3 className="text-xl font-bold">{event.year}</h3>
              <p className="text-gray-600">{event.event}</p>
            </div>
          </div>
          <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-white border-4 border-blue-500 rounded-full transform -translate-x-2 md:translate-x-0"></div>
        </motion.div>
      ))}
    </div>
  );
}

function Homepage() {
  const [mood, setMood] = useState('happy');
  const [patCount, setPatCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMoodChange = useCallback((newMood) => {
    setMood(newMood);
    setPatCount(prev => prev + 1);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />

      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">作品展示</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => console.log(`Clicked project ${project.id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">互動專區</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <MoodTracker
              mood={mood}
              onMoodChange={handleMoodChange}
              patCount={patCount}
            />
            <div className="bg-white rounded-lg p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-4">收聽 Podcast</h3>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  className="w-full rounded-lg"
                  src="https://open.spotify.com/embed/show/2gMSpNkgeKlE2Nyu8Ru4gw"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">成長時間軸</h2>
          <Timeline />
        </div>
      </section>
    </div>
  );
}

export default Homepage;