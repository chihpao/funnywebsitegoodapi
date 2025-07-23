import React, { useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { ANIMATIONS } from "../../utils/animations";
import ImageGallery from "../ImageGallery";

// 時間軸事件資料
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

// 箭頭樣式組件
function TimelineArrow() {
  return (
    <motion.div
      className="absolute left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[20px] border-r-[20px] border-t-[30px] border-l-transparent border-r-transparent border-t-blue-500 z-10"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ scale: 1.1 }}
    />
  );
}

function Timeline() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openGallery = useCallback((index) => {
    setSelectedImageIndex(index);
    setGalleryOpen(true);
  }, []);

  const closeGallery = useCallback(() => {
    setGalleryOpen(false);
  }, []);

  return (
    <div className="relative w-full" style={{maxWidth: '100vw'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-400 to-purple-600 h-full hidden md:block"></div>
        {timelineEvents.map((event, index) => (
          <motion.div
            key={event.year}
            className="relative flex flex-col md:flex-row items-center mb-16 last:mb-0"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="md:hidden w-full">
              <motion.div
                className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition cursor-pointer mb-4"
                whileHover={{ scale: 1.02 }}
                onClick={() => openGallery(index)}
              >
                <div className="relative aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
                  <motion.img
                    src={event.img}
                    alt={event.event}
                    className="absolute inset-0 w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300">
                    <div className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300 text-center">
                      <span className="bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm">
                        點擊查看
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
              <div className="text-center">
                <motion.h3
                  className="text-2xl font-bold text-gray-900 mb-2"
                  whileHover={{ scale: 1.05 }}
                >
                  {event.year}
                </motion.h3>
                <motion.p
                  className="text-lg text-gray-700 font-medium"
                  whileHover={{ scale: 1.02 }}
                >
                  {event.event}
                </motion.p>
              </div>
            </div>
            <div className="hidden md:grid md:grid-cols-3 gap-4 w-full items-center">
              <div className="col-span-1">
                {index % 2 === 0 && (
                  <motion.div
                    className="text-right pr-4"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <motion.h3
                      className="text-2xl md:text-3xl font-bold text-gray-900 mb-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      {event.year}
                    </motion.h3>
                    <motion.p
                      className="text-lg md:text-xl text-gray-700 font-medium"
                      whileHover={{ x: -10 }}
                    >
                      {event.event}
                    </motion.p>
                  </motion.div>
                )}
                {index % 2 === 1 && (
                  <motion.div
                    className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => openGallery(index)}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <div className="relative aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
                      <motion.img
                        src={event.img}
                        alt={event.event}
                        className="absolute inset-0 w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300">
                        <div className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300 text-center">
                          <span className="bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm">
                            點擊查看
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              <div className="col-span-1 flex justify-center">
                <motion.div
                  className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg z-20"
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <div className="col-span-1">
                {index % 2 === 1 && (
                  <motion.div
                    className="text-left pl-4"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <motion.h3
                      className="text-2xl md:text-3xl font-bold text-gray-900 mb-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      {event.year}
                    </motion.h3>
                    <motion.p
                      className="text-lg md:text-xl text-gray-700 font-medium"
                      whileHover={{ x: 10 }}
                    >
                      {event.event}
                    </motion.p>
                  </motion.div>
                )}
                {index % 2 === 0 && (
                  <motion.div
                    className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => openGallery(index)}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <div className="relative aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
                      <motion.img
                        src={event.img}
                        alt={event.event}
                        className="absolute inset-0 w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300">
                        <div className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300 text-center">
                          <span className="bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm">
                            點擊查看
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
            {index < timelineEvents.length - 1 && (
              <div className="relative mt-8 mb-8 md:mt-0 md:mb-0">
                <TimelineArrow />
              </div>
            )}
          </motion.div>
        ))}
      </div>
      {/* 圖片相簿組件 */}
      <ImageGallery
        images={timelineEvents}
        initialIndex={selectedImageIndex}
        isOpen={galleryOpen}
        onClose={closeGallery}
      />
    </div>
  );
}

export default memo(Timeline);
