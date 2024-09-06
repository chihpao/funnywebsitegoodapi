import React from 'react';
import ButtonLink from './ButtonLink';

function HomeContent() {
  return (
    <div className="text-center">
      <h2 className="text-3xl mb-4">Welcome to My Funny Website</h2>
      <div className="space-x-4">
        <ButtonLink to="/joke">View Random Joke</ButtonLink>
        <ButtonLink to="/meme">View Random Meme</ButtonLink>
      </div>
    </div>
  );
}

export default HomeContent;