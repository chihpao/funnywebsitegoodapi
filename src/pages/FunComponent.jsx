import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useFunLogic } from '../API/FunApi';
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

  return <CatSection catImages={catImages} catLoading={catLoading} loadCatImages={loadCatImages} />;
}

export function DogsPage() {
  const { dogImages, dogLoading, loadDogImages } = useFunLogic();

  return <DogSection dogImages={dogImages} dogLoading={dogLoading} loadDogImages={loadDogImages} />;
}

export default function FunComponent() {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-4xl mx-auto mt-10">
      <div className="flex flex-col space-y-8">
        <Routes>
          <Route path="memes" element={<MemesPage />} />
          <Route path="cats" element={<CatsPage />} />
          <Route path="dogs" element={<DogsPage />} />
        </Routes>
      </div>
    </div>
  );
}