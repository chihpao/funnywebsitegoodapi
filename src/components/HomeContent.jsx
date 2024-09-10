import React from 'react';
import ButtonLink from './ButtonLink';

function HomeContent() {
  return (
    <div className="text-center responsive-bg">
      <h2 className="responsive-text mb-4">Welcome to My Funny Website</h2>
      <div className="button-container">
        <ButtonLink to="/joke" className="block sm:inline-block">View Random Joke</ButtonLink>
        <ButtonLink to="/meme" className="block sm:inline-block">View Random Meme</ButtonLink>
      </div>
    </div>
  );
}


export default HomeContent;