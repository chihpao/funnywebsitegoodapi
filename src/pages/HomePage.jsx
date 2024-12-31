import React from 'react';
import { motion } from 'framer-motion';

// Static data
const projects = [
  { id: 1, title: "一個大坑", img:"https://i.imgur.com/MSfsMBu.jpeg" , url: "https://chihpao.notion.site/120daaa899518090a0e8ffef49017ccc" },
  { id: 2, title: "我的生活", img: "https://i.imgur.com/1klKIL5.jpeg", url: "https://chihpao.notion.site/120daaa899518090a0e8ffef49017ccc" },
  { id: 3, title: "我的專案", img:"https://i.imgur.com/sljKu6Z.jpeg" , url: "https://chihpao.notion.site/120daaa899518090a0e8ffef49017ccc"}
];

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
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative rounded-xl overflow-hidden shadow-lg block"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="aspect-w-16 aspect-h-10">
        <img
          src={project.img}
          alt={project.title}
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <h3 className="text-white text-xl font-bold">{project.title}</h3>
      </div>
    </motion.a>
  );
}

function Timeline() {
  return (
    <div className="relative py-8">
      <motion.div 
        initial={{ height: 0 }}
        whileInView={{ height: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute left-4 md:left-1/2 w-0.5 bg-gray-200"
      />
      {timelineEvents.map((event, index) => (
        <motion.div
          key={event.year}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          className={`flex items-center mb-8 ${
            index % 2 === 0 ? 'md:flex-row-reverse' : ''
          }`}
        >
          <div className="w-full md:w-1/2 p-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg p-4 shadow-md"
            >
              <div className="text-3xl mb-2">{event.icon}</div>
              <h3 className="text-xl font-bold">{event.year}</h3>
              <p className="text-gray-600">{event.event}</p>
            </motion.div>
          </div>
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="absolute left-4 md:left-1/2 w-4 h-4 bg-white border-4 border-blue-500 rounded-full transform -translate-x-2 md:translate-x-0"
          />
        </motion.div>
      ))}
    </div>
  );
}

function Homepage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />

      <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
      </section>

      <section className="py-16 px-4 md:px-8 bg-gray-100">
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