import React, { useEffect, useRef, useState } from 'react';
import p5 from 'p5';
import io from 'socket.io-client';
import { FaEraser } from 'react-icons/fa'; // 引入橡皮擦圖示
import { confirmAlert } from 'react-confirm-alert'; // 引入 react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css'; // 引入 react-confirm-alert 的樣式

const socket = io('http://localhost:3000'); // 使用本地 WebSocket 伺服器地址

function InteractiveComponent() {
  const sketchRef = useRef();
  const [color, setColor] = useState('#ffcc00');
  const [brushSize, setBrushSize] = useState(10);
  const [isErasing, setIsErasing] = useState(false);
  const [isMouseInCanvas, setIsMouseInCanvas] = useState(false);
  const p5Instance = useRef(null);

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
        if (p.mouseIsPressed) {
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
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        // 不要在這裡重設背景，這樣可以避免畫布被清空
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
        if (p5Instance.current.mouseIsPressed) {
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
    confirmAlert({
      title: '',
      message: '要清空畫布內容？',
      buttons: [
        {
          label: '是',
          onClick: () => {
            socket.emit('clear');
            p5Instance.current.background(255); // 本地清空畫布
          }
        },
        {
          label: '否',
          onClick: () => {}
        }
      ]
    });
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
              onChange={(e) => setBrushSize(e.target.value)}
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