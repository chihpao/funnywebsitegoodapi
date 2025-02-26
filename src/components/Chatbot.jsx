import React from 'react';
import Chatbot from 'react-chatbot-kit';

import config from './chatbot/config.jsx'
import MessageParser from './chatbot/MessageParser.js';
import ActionProvider from './chatbot/ActionProvider.js';

function AppChatbot() {
  return (
    <div className="App">
      <header className="App-header">
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </header>
    </div>
  );
}

export default AppChatbot;