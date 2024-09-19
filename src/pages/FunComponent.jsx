// src/components/FunComponent.jsx
import React from 'react';
import { useFunLogic } from '../hooks/useFunLogic';
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

const JokeSection = ({ joke, jokeLoading, loadJoke }) => (
  <div className="p-6 bg-white rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">隨機笑話</h2>
    {jokeLoading ? (
      <LoadingSpinner />
    ) : (
      <div className="text-center">
        <p className="text-xl text-gray-700">{joke.setup}</p>
        <p className="text-xl font-bold mt-2 text-gray-900">{joke.punchline}</p>
      </div>
    )}
    <div className="flex justify-center mt-6">
      <Button onClick={loadJoke} className="bg-green-500 hover:bg-green-600">
        再來一個笑話
      </Button>
    </div>
  </div>
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
  <div className="p-6 bg-white rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">隨機梗圖</h2>
    <div className="relative w-full h-64 flex justify-center items-center mb-4">
      {memeLoading ? (
        <LoadingSpinner />
      ) : meme ? (
        <img src={meme.src} alt={meme.title} className="w-full h-full object-contain rounded-md" />
      ) : (
        <div className="text-center text-gray-700">點藍色按鈕開始</div>
      )}
    </div>
    <div className="flex justify-center space-x-4 mt-6">
      <Button
        onClick={getPreviousMeme}
        className="bg-purple-500 hover:bg-purple-600"
        disabled={currentMemeIndex <= 0}
      >
        <i className="fas fa-arrow-left"></i>
      </Button>
      <Button
        onClick={getAnotherMeme}
        className="bg-blue-500 hover:bg-blue-600"
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
        className="bg-orange-500 hover:bg-orange-600"
        disabled={currentMemeIndex >= displayedMemes.length - 1}
      >
        <i className="fas fa-arrow-right"></i>
      </Button>
    </div>
  </div>
);

function FunComponent() {
  const {
    joke,
    jokeLoading,
    loadJoke,
    meme,
    memeLoading,
    error,
    isGenerating,
    getAnotherMeme,
    getPreviousMeme,
    getNextMeme,
    currentMemeIndex,
    displayedMemes,
  } = useFunLogic();

  if (error) {
    return <div className="text-center text-red-500">Error loading meme: {error.message}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-4xl mx-auto mt-10">
      <div className="flex flex-col space-y-8">
        <JokeSection joke={joke} jokeLoading={jokeLoading} loadJoke={loadJoke} />
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
      </div>
    </div>
  );
}

export default FunComponent;