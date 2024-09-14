import React, { useEffect, useRef, useState } from 'react';
import p5 from 'p5';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // 使用本地 WebSocket 伺服器地址

function InteractiveComponent() {
  const sketchRef = useRef();
  const [color, setColor] = useState('#ffcc00');
  const [brushSize, setBrushSize] = useState(10);
  const [isErasing, setIsErasing] = useState(false);

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
        p.background(255);
      };
    };

    const myP5 = new p5(sketch, sketchRef.current);

    return () => {
      myP5.remove();
    };
  }, [color, brushSize, isErasing]);

  const clearCanvas = () => {
    socket.emit('clear');
  };

  return (
    <div className="relative w-full h-screen bg-gray-900">
      <div ref={sketchRef} className="absolute top-0 left-0 w-full h-full z-0"></div>
      <div className="absolute top-0 left-0 w-full p-4 z-10 flex justify-between items-center bg-white bg-opacity-80 shadow-lg">
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
              {isErasing ? 'Eraser On' : 'Eraser Off'}
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
    </div>
  );
}

export default InteractiveComponent;