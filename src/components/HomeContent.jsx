import React from 'react';
import ButtonLink from './ButtonLink';

function HomeContent() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="relative flex-grow">
        <img
          src="/tata02.jpg"
          alt="Funny"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex justify-center items-center mt-4 mb-4">
        <div className="button-container bg-white bg-opacity-75 p-4 rounded-lg">
          <ButtonLink to="/joke" className="block sm:inline-block mb-2 sm:mb-0 sm:mr-2">View Random Joke</ButtonLink>
          <ButtonLink to="/meme" className="block sm:inline-block">View Random Meme</ButtonLink>
        </div>
      </div>
    </div>
  );
}

export default HomeContent;