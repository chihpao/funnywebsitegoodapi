import React, { memo } from "react";
import { motion } from "framer-motion";
import { ANIMATIONS } from "../../utils/animations";

function ProjectCard({ project }) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
      {...ANIMATIONS.scaleOnHover}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold drop-shadow-lg">{project.title}</h3>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-gray-600 text-sm mb-4">
              點擊下方按鈕探索更多內容
            </p>
          </div>
          <motion.a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            {...ANIMATIONS.buttonHover}
          >
            <span>探索</span>
            <svg 
              className="w-4 h-4 ml-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
              />
            </svg>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default memo(ProjectCard);
