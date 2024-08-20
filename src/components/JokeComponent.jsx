import React, { useEffect, useState } from 'react';
import axios from 'axios';

function JokeComponent() {
  const [joke, setJoke] = useState(null);

  const fetchJoke = () => {
    axios.get('https://official-joke-api.appspot.com/random_joke')
      .then(response => {
        setJoke(response.data);
      })
      .catch(error => console.error('Error fetching joke:', error));
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  if (!joke) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 bg-blue-100 rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <h1 
        className="text-2xl font-bold mb-4 text-center cursor-pointer"
        onClick={fetchJoke}
      >
        Random Joke
      </h1>
      <div className="setup mb-4">
        <div className="border border-amber-300 p-2 rounded-md bg-white">
          <div className="font-semibold text-amber-300">Setup</div>
        </div>
        <div className="border border-amber-300 p-2 rounded-md bg-white mt-2">{joke.setup}</div>
      </div>
      <div className="punchline">
        <div className="border border-amber-300 p-2 rounded-md bg-white">
          <div className="font-semibold text-amber-300">Punchline</div>
        </div>
        <div className="border border-amber-300 p-2 rounded-md bg-white mt-2">{joke.punchline}</div>
      </div>
    </div>
  );
}

export default JokeComponent;