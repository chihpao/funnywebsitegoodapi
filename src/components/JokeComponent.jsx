import React, { useEffect, useState } from 'react';
import axios from 'axios';

function JokeComponent() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchJoke = () => {
    setLoading(true);
    axios.get('https://official-joke-api.appspot.com/random_joke')
      .then(response => {
        setJoke(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching joke:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="p-8 bg-blue-100 rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <div
        className="text-2xl font-bold mb-4 text-center cursor-pointer p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors shadow-md"
        onClick={fetchJoke}
      >
        Random Joke
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="setup mb-4">
            <div className="p-6 rounded-md bg-white shadow-lg border border-gray-200">
              <div className="font-semibold text-gray-700 text-lg">Setup</div>
              <hr className="my-2 border-gray-300" />
              <div className="mt-2 text-gray-600">{joke.setup}</div>
            </div>
          </div>
          <div className="punchline mb-4">
            <div className="p-6 rounded-md bg-white shadow-lg border border-gray-200">
              <div className="font-semibold text-gray-700 text-lg">Punchline</div>
              <hr className="my-2 border-gray-300" />
              <div className="mt-2 text-gray-600">{joke.punchline}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default JokeComponent;