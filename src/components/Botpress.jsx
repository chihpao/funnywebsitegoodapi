import { Webchat, WebchatProvider, Fab, getClient } from "@botpress/webchat";
import { buildTheme } from "@botpress/webchat-generator";
import { useState } from "react";

const { theme, style } = buildTheme({
  themeName: "prism",
  themeColor: "#634433",
});

// 替換為您的 Client ID
const clientId = "47494cc8-294e-4e3b-9602-64b1f32d1424";

export default function Botpress() {
  const client = getClient({ clientId });
  const [isWebchatOpen, setIsWebchatOpen] = useState(false);

  const toggleWebchat = () => {
    setIsWebchatOpen((prevState) => !prevState);
  };

  return (
    <div>
      {/* 添加 Webchat 的全局樣式 */}
      <style>{style}</style>

      {/* 聊天按鈕與聊天窗口容器 */}
      <div className="fixed bottom-5 right-5 z-50">
        {/* 漂浮按鈕 */}
        <button
          className="flex items-center justify-center w-12 h-12 bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition-all"
          onClick={toggleWebchat}
          aria-label="Toggle Chat"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m-9 4a9 9 0 1118 0H3z"
                />    
            </svg>  💬
        </button>

        {/* 聊天窗口 */}
        <div
        className={`absolute bottom-16 right-0 w-[90vw] max-w-[350px] h-[300px] md:h-[400px] bg-white shadow-xl rounded-lg transition-transform duration-300 ease-in-out
            ${isWebchatOpen ? "translate-x-0" : "hidden"}`}
        >
        {isWebchatOpen && (
            <WebchatProvider theme={theme} client={client}>
            <Webchat />
            </WebchatProvider>
        )}
        </div>
      </div>
    </div>
  );
}
