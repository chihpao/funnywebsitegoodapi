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
      <div
        className="text-2xl font-bold mb-4 text-center cursor-pointer p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        onClick={fetchJoke}
      >
        Random Joke
      </div>
      <div className="setup mb-4">
        <div className="p-4 rounded-md bg-gray-100 shadow-md">
          <div className="font-semibold text-gray-700 text-lg">Setup</div>
          <hr className="my-2 border-gray-300" />
          <div className="mt-2 text-gray-600">{joke.setup}</div>
        </div>
      </div>
      <div className="punchline mb-4">
        <div className="p-4 rounded-md bg-gray-100 shadow-md">
          <div className="font-semibold text-gray-700 text-lg">Punchline</div>
          <hr className="my-2 border-gray-300" />
          <div className="mt-2 text-gray-600">{joke.punchline}</div>
        </div>
      </div>
    </div>
  );
}

export default JokeComponent;