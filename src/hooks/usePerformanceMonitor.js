import { useEffect, useRef } from 'react';

/**
 * 效能監控 Hook
 * @param {string} componentName - 組件名稱
 * @param {boolean} enabled - 是否啟用監控（預設為開發環境）
 */
export function usePerformanceMonitor(componentName, enabled = process.env.NODE_ENV === 'development') {
  const renderCount = useRef(0);
  const startTime = useRef(performance.now());

  useEffect(() => {
    if (!enabled) return;

    renderCount.current += 1;
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;

    console.log(`🔍 [${componentName}] 渲染次數: ${renderCount.current}, 渲染時間: ${renderTime.toFixed(2)}ms`);
    
    startTime.current = performance.now();
  });

  useEffect(() => {
    if (!enabled) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name.includes(componentName)) {
          console.log(`⚡ [${componentName}] 效能指標:`, {
            name: entry.name,
            duration: entry.duration,
            startTime: entry.startTime
          });
        }
      });
    });

    observer.observe({ entryTypes: ['measure', 'navigation', 'paint'] });

    return () => observer.disconnect();
  }, [componentName, enabled]);

  return renderCount.current;
}

/**
 * 記憶體使用監控 Hook
 * @param {number} interval - 監控間隔（毫秒）
 */
export function useMemoryMonitor(interval = 5000) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    if (!performance.memory) return;

    const logMemoryUsage = () => {
      const memory = performance.memory;
      console.log('💾 記憶體使用情況:', {
        used: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
        total: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
        limit: `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`
      });
    };

    const intervalId = setInterval(logMemoryUsage, interval);
    logMemoryUsage(); // 立即執行一次

    return () => clearInterval(intervalId);
  }, [interval]);
}
