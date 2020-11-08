/* eslint-disable react/prop-types */
import { IconButton, Avatar } from '@material-ui/core';
import { AttachFile, MoreVert, Search, InsertEmoticon, Mic } from '@material-ui/icons';
import React, { useState } from 'react';
import './Chat.css';
import axios from '../../axios';

export default function Chat({ messages }) {
  const [input, setInput] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post('/messages/new', {
      message: input,
      name: 'DEMO APP',
      timestamp: 'Just now',
      received: false,
    });
    setInput('');
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen at ...</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <Search />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p className={`chat__message ${message.received && `chat__reciever`}`}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{new Date().toUTCString()}</span>
          </p>
        ))}

        {/* <p className="chat__message chat__reciever">
          <span className="chat__name">Sonny</span>
          This is message!
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p> */}
      </div>
      <div className="chat__footer">
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <form action="">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <IconButton>
          <Mic />
        </IconButton>
      </div>
    </div>
  );
}
