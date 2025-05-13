import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useFunLogic } from '../externalApi/FunApi';
import '@fortawesome/fontawesome-free/css/all.min.css';

const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
);

const Button = ({ onClick, disabled, children, className }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 text-white rounded-md transition-colors duration-300 ${className}`}
  >
    {children}
  </button>
);

const MemeSection = ({
  meme,
  memeLoading,
  isGenerating,
  getPreviousMeme,
  getAnotherMeme,
  getNextMeme,
  currentMemeIndex,
  displayedMemes,
}) => (
  <div className="p-6 bg-white rounded-lg shadow-lg relative z-10">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-3xl font-bold text-gray-800">Find Memes</h2>
      <div className="flex space-x-4">
        <Button
          onClick={getPreviousMeme}
          className="bg-purple-500 hover:bg-purple-700"
          disabled={currentMemeIndex <= 0}
        >
          <i className="fas fa-arrow-left"></i>
        </Button>
        <Button
          onClick={getAnotherMeme}
          className="bg-blue-500 hover:bg-blue-700"
          disabled={memeLoading || isGenerating}
        >
          {isGenerating ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mx-auto"></div>
          ) : (
            <i className="fas fa-random"></i>
          )}
        </Button>
        <Button
          onClick={getNextMeme}
          className="bg-orange-500 hover:bg-orange-700"
          disabled={currentMemeIndex >= displayedMemes.length - 1}
        >
          <i className="fas fa-arrow-right"></i>
        </Button>
      </div>
    </div>
    <div className="relative w-full h-96 flex justify-center items-center mb-4">
      {memeLoading ? (
        <LoadingSpinner />
      ) : meme ? (
        <img
          src={meme.src}
          alt={meme.title}
          className="w-full h-full object-contain rounded-md"
        />
      ) : (
        <div className="text-center text-gray-700">點藍色按鈕開始</div>
      )}
    </div>
  </div>
);

const CatSection = ({ catImages, catLoading, loadCatImages }) => (
  <div className="p-6 bg-white rounded-lg shadow-lg relative z-10">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-3xl font-bold text-gray-800">Find Cats</h2>
      <Button onClick={loadCatImages} className="bg-pink-500 hover:bg-pink-700">
        More Cats
      </Button>
    </div>
    {catLoading ? (
      <LoadingSpinner />
    ) : (
      <div className="grid grid-cols-2 gap-4">
        {catImages.map((cat, index) => (
          <img key={index} src={cat.url} alt="Cat" className="w-full h-full object-cover rounded-md" />
        ))}
      </div>
    )}
  </div>
);

const DogSection = ({ dogImages, dogLoading, loadDogImages }) => (
  <div className="p-6 bg-white rounded-lg shadow-lg relative z-10">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-3xl font-bold text-gray-800">Find Dogs</h2>
      <Button onClick={loadDogImages} className="bg-green-500 hover:bg-green-700">
        More Dogs
      </Button>
    </div>
    {dogLoading ? (
      <LoadingSpinner />
    ) : (
      <div className="grid grid-cols-2 gap-4">
        {dogImages.map((dog, index) => (
          <img key={index} src={dog} alt="Dog" className="w-full h-full object-cover rounded-md" />
        ))}
      </div>
    )}
  </div>
);

export function MemesPage() {
  const {
    meme,
    memeLoading,
    isGenerating,
    getPreviousMeme,
    getAnotherMeme,
    getNextMeme,
    currentMemeIndex,
    displayedMemes,
  } = useFunLogic();

  // 頁面加載時自動滾動到頂部
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MemeSection
      meme={meme}
      memeLoading={memeLoading}
      isGenerating={isGenerating}
      getPreviousMeme={getPreviousMeme}
      getAnotherMeme={getAnotherMeme}
      getNextMeme={getNextMeme}
      currentMemeIndex={currentMemeIndex}
      displayedMemes={displayedMemes}
    />
  );
}

export function CatsPage() {
  const { catImages, catLoading, loadCatImages } = useFunLogic();

  // 頁面加載時自動滾動到頂部
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <CatSection catImages={catImages} catLoading={catLoading} loadCatImages={loadCatImages} />;
}

export function DogsPage() {
  const { dogImages, dogLoading, loadDogImages } = useFunLogic();

  // 頁面加載時自動滾動到頂部
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <DogSection dogImages={dogImages} dogLoading={dogLoading} loadDogImages={loadDogImages} />;
}

// 隨機樂趣主頁面，包含三個選項按鈕
export function FunMainPage() {
  const navigate = useNavigate();

  // 導航到各個子頁面的函數
  const navigateToMemes = () => navigate('/fun/memes');
  const navigateToCats = () => navigate('/fun/cats');
  const navigateToDogs = () => navigate('/fun/dogs');

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">隨機樂趣</h1>
      <p className="text-lg text-gray-600 text-center mb-10">選擇一個類別，探索有趣的內容！</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 隨機迴因按鈕 */}
        <div 
          onClick={navigateToMemes} 
          className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer text-center"
        >
          <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-laugh-squint text-white text-3xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">隨機迴因</h2>
          <p className="text-white/80">探索最有趣的網路迴因</p>
        </div>

        {/* 隨機貓圖按鈕 */}
        <div 
          onClick={navigateToCats} 
          className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer text-center"
        >
          <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-cat text-white text-3xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">隨機貓圖</h2>
          <p className="text-white/80">可愛的貓咪照片集</p>
        </div>

        {/* 隨機狗圖按鈕 */}
        <div 
          onClick={navigateToDogs} 
          className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer text-center"
        >
          <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-dog text-white text-3xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">隨機狗圖</h2>
          <p className="text-white/80">可愛的狗狗照片集</p>
        </div>
      </div>
    </div>
  );
}

export default function FunComponent() {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-4xl mx-auto mt-10">
      <div className="flex flex-col space-y-8">
        <Routes>
          <Route index element={<FunMainPage />} />
          <Route path="memes" element={<MemesPage />} />
          <Route path="cats" element={<CatsPage />} />
          <Route path="dogs" element={<DogsPage />} />
        </Routes>
      </div>
    </div>
  );
}