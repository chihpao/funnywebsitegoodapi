import React, { memo } from "react";
import { motion } from "framer-motion";
import { ANIMATIONS } from "../../utils/animations";

function TransitionSection() {
  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 左側文字內容 */}
          <motion.div {...ANIMATIONS.slideInLeft}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              關於這個網站
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                這是一個充滿個人色彩的網站，記錄著我和我的貓咪 TaTa 的日常生活。
                從程式開發到生活點滴，從搞笑梗圖到溫馨時刻，這裡都有我們的足跡。
              </p>
              <p>
                網站提供了各種有趣的 API 服務，包括隨機笑話、搞笑梗圖、
                以及可愛的貓咪和狗狗圖片。希望能為您的一天帶來一些歡樂！
              </p>
              <p>
                同時，這也是我學習和實踐前端技術的地方，
                使用了 React、Tailwind CSS、Framer Motion 等現代技術棧。
              </p>
            </div>
          </motion.div>

          {/* 右側圖片 */}
          <motion.div {...ANIMATIONS.slideInRight}>
            <div className="relative">
              <motion.img
                src="/tata01.jpg"
                alt="TaTa 的照片"
                className="w-full h-80 object-cover rounded-2xl shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute -bottom-6 -right-6 bg-blue-500 text-white p-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">2025</div>
                <div className="text-sm">持續更新中</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 特色功能展示 */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">API 服務</h3>
            <p className="text-gray-600">提供多種有趣的 API 端點，支援 JSON 格式回應</p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">現代設計</h3>
            <p className="text-gray-600">使用最新的前端技術，提供流暢的使用體驗</p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl">
            <div className="text-4xl mb-4">🐱</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">個人特色</h3>
            <p className="text-gray-600">充滿個人風格的內容，記錄生活中的美好時刻</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(TransitionSection);
