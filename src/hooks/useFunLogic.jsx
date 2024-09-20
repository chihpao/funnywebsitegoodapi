import useJoke from './useJoke';
import useMemes from './useMemes';
import useCats from './useCats';

export const useFunLogic = () => {
  const { joke, jokeLoading, loadJoke } = useJoke();
  const {
    memes,
    displayedMemes,
    currentMemeIndex,
    memeLoading,
    error,
    isGenerating,
    getAnotherMeme,
    getPreviousMeme,
    getNextMeme,
  } = useMemes();
  const { catImages, loading: catLoading, loadCatImages } = useCats();

  const meme = currentMemeIndex >= 0 ? memes[displayedMemes[currentMemeIndex]] : null;

  return {
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
    catImages,
    catLoading,
    loadCatImages,
  };
};