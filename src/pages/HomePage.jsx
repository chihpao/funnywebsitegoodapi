import React from "react";
import HeroSection from "../components/home/HeroSection";
import TransitionSection from "../components/home/TransitionSection";
import ProjectCard from "../components/home/ProjectCard";
import Timeline from "../components/home/Timeline";

// 專案資料
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

function Homepage() {
  return (
    <div className="bg-gray-50">
      <HeroSection />
      <TransitionSection />
      
      {/* 專案展示區域 */}
      <section className="py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* TaTa 成長時間軸 */}
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