// src/components/JokeComponent.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function JokeComponent() {
  const [joke, setJoke] = useState('');

  useEffect(() => {
    axios.get('https://official-joke-api.appspot.com/random_joke')
      .then(response => {
        const { setup, punchline } = response.data;
        setJoke(`${setup} - ${punchline}`);
      })
      .catch(error => console.error('Error fetching joke:', error));
  }, []);

  return (
    <div className="p-4 bg-blue-100 rounded-lg">
      <h1 className="text-lg font-bold">Random Joke</h1>
      <p>{joke}</p>
    </div>
  );
}

export default JokeComponent;
