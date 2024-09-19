import useJoke from './useJoke';
import useMemes from './useMemes';

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
  };
};