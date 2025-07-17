// 共用動畫配置
export const ANIMATIONS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 }
  },
  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay: 0.3 }
  },
  slideInRight: {
    initial: { opacity: 0, x: 50 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay: 0.3 }
  },
  slideInUp: {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay: 0.2 }
  },
  slideInDown: {
    initial: { opacity: 0, y: -50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay: 0.2 }
  },
  scaleOnHover: {
    whileHover: { scale: 1.02 },
    transition: { duration: 0.2 }
  },
  scaleOnHoverLarge: {
    whileHover: { scale: 1.05 },
    transition: { duration: 0.2 }
  },
  buttonHover: {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.2 }
  },
  staggerContainer: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }
};

// 觸控配置常數
export const TOUCH_CONFIG = {
  minSwipeDistance: 50
};

// 常用的 viewport 配置
export const VIEWPORT_CONFIG = {
  once: true,
  margin: "-100px"
};

// 預設的過渡效果
export const TRANSITIONS = {
  smooth: { duration: 0.3, ease: "easeInOut" },
  spring: { type: "spring", stiffness: 300, damping: 30 },
  bounce: { type: "spring", stiffness: 400, damping: 10 }
};
