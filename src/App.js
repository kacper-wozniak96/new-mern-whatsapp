/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import Pusher from 'pusher-js';
import React, { useEffect, useState } from 'react';
import './App.css';
import Chat from './components/Chat/Chat';
import Sidebar from './components/Sidebar/Sidebar';
import axios from './axios';

function App() {
  const [messages, setMessages] = useState([]);
  console.log("start apki")
  console.log(messages)
  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    console.log("jestem w pierwszym useEffect")
    axios.get('/messages/sync')
      .then((response) => {
        // console.log(response)
        console.log("siema jestem w axios")
        setMessages(response.data)
      });
  }, []);

  useEffect(() => {
    const pusher = new Pusher('5b2bf77f4143a21211ba', {
      cluster: 'eu',
    });
    console.log("jestem w drugim useEffect")
    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      // alert(JSON.stringify(newMessage));
      if (newMessage) {
        console.log("jest newMessage")
      }
      else {
        console.log("nie ma newMessage")
      }
      console.log(messages)
      setMessages([...messages, newMessage])

    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages]);

  console.log(messages)



  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
