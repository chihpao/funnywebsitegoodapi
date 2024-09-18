import React, { useEffect, useRef, useState } from 'react';
import p5 from 'p5';
import io from 'socket.io-client';
import { FaEraser } from 'react-icons/fa'; // 引入橡皮擦圖示

const socket = io('http://localhost:3050'); // 使用本地 WebSocket 伺服器地址

function InteractiveComponent() {
  const sketchRef = useRef();
  const [color, setColor] = useState('#ffcc00');
  const [brushSize, setBrushSize] = useState(10);
  const [isErasing, setIsErasing] = useState(false);
  const [isMouseInCanvas, setIsMouseInCanvas] = useState(false);
  const p5Instance = useRef(null);
  const canvasContent = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(255);

        socket.on('draw', ({ x, y, px, py, color, brushSize }) => {
          p.stroke(color);
          p.strokeWeight(brushSize);
          p.line(x, y, px, py);
        });

        socket.on('clear', () => {
          p.background(255);
        });
      };

      p.draw = () => {
        if (p.mouseIsPressed || p.touchIsDown) {
          const data = {
            x: p.mouseX,
            y: p.mouseY,
            px: p.pmouseX,
            py: p.pmouseY,
            color: isErasing ? '#ffffff' : color,
            brushSize: brushSize,
          };
          socket.emit('draw', data);
          p.stroke(data.color);
          p.strokeWeight(data.brushSize);
          p.line(data.x, data.y, data.px, data.py);
        }
      };

      p.windowResized = () => {
        if (canvasContent.current) {
          // 保存畫布內容
          canvasContent.current = p.get();
        }
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        if (canvasContent.current) {
          // 重繪畫布內容
          p.background(255); // 確保背景為白色
          p.image(canvasContent.current, 0, 0);
        }
      };

      p.touchStarted = (event) => {
        event.preventDefault(); // 防止畫布在手機上滾動
      };

      p.touchMoved = (event) => {
        event.preventDefault(); // 防止畫布在手機上滾動
      };
    };

    p5Instance.current = new p5(sketch, sketchRef.current);

    return () => {
      p5Instance.current.remove();
    };
  }, []);

  useEffect(() => {
    if (p5Instance.current) {
      p5Instance.current.draw = () => {
        if (p5Instance.current.mouseIsPressed || p5Instance.current.touchIsDown) {
          const data = {
            x: p5Instance.current.mouseX,
            y: p5Instance.current.mouseY,
            px: p5Instance.current.pmouseX,
            py: p5Instance.current.pmouseY,
            color: isErasing ? '#ffffff' : color,
            brushSize: brushSize,
          };
          socket.emit('draw', data);
          p5Instance.current.stroke(data.color);
          p5Instance.current.strokeWeight(data.brushSize);
          p5Instance.current.line(data.x, data.y, data.px, data.py);
        }
      };
    }
  }, [color, brushSize, isErasing]);

  const clearCanvas = () => {
    if (window.confirm('要清空畫布內容？')) {
      socket.emit('clear');
      p5Instance.current.background(255); // 本地清空畫布
    }
  };

  return (
    <div className="flex flex-col w-full h-screen bg-gray-900">
      <div className="w-full p-4 z-10 flex justify-between items-center bg-white bg-opacity-80 shadow-lg">
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-gray-800 mb-2">Brush Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-10 h-10 p-1 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-800 mb-2">Brush Size</label>
            <input
              type="range"
              min="1"
              max="50"
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value, 10))}
              className="w-32"
            />
            <p className="mt-2 text-gray-800 text-lg">Size: {brushSize}</p>
          </div>
          <div>
            <label className="block text-gray-800 mb-2">Eraser</label>
            <button
              onClick={() => setIsErasing(!isErasing)}
              className={`px-4 py-2 font-semibold rounded-md shadow-md transition-all ${isErasing ? 'bg-red-500 text-white' : 'bg-white text-red-500'}`}
            >
              <FaEraser />
            </button>
          </div>
        </div>
        <button
          onClick={clearCanvas}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 transition-all"
        >
          Clear Canvas
        </button>
      </div>
      <div
        ref={sketchRef}
        onMouseEnter={() => setIsMouseInCanvas(true)}
        onMouseLeave={() => setIsMouseInCanvas(false)}
        style={{
          cursor: isErasing && isMouseInCanvas ? 'cell' : 'default'
        }}
        className="flex-grow relative z-0 overflow-hidden"
      ></div>
    </div>
  );
}

export default InteractiveComponent;