import React from 'react';
import ButtonLink from './ButtonLink';

function HomeContent() {
  return (
    <div className="text-center">
      <h2 className="text-3xl mb-4">Welcome to My Funny Website</h2>
      <div className="space-y-4 sm:space-y-0 sm:space-x-4">
        <ButtonLink to="/joke" className="block sm:inline-block">View Random Joke</ButtonLink>
        <ButtonLink to="/meme" className="block sm:inline-block">View Random Meme</ButtonLink>
      </div>
    </div>
  );
}

export default HomeContent;