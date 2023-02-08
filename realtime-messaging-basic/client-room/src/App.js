import React, { useState, useRef, useEffect } from 'react';
import immer from 'immer'
import Chat from './components/Chat';
import Form from './components/UsernameForm';
import './App.css'
import { io } from 'socket.io-client';

const initialMessageState = {
  general: [],
  random: [],
  jokes: [],
  javascript: []
}

function App() {
  const [username, setUsername] = useState("")
  const [connected, setConnected] = useState(false)
  const [currentChat, setCurrentChat] = useState({ isChannel: true, chatName: 'general', receiverId: ''})
  const [connectedRooms, setConnectedRooms] = useState(['general'])
  const [allUsers, setAllUsers] =useState([])
  const [messages, setMessages] = useState(initialMessageState)
  const [message, setMessage] = useState("")
  const socketRef = useRef()

  let body

  function handleMessageChange (e) {
    setMessage(e.target.value)
  }

  useEffect(() => {
    console.log('hit')
    setMessage("")
  },[messages])

  function handleChange (e) {
    setUsername(e.target.value)
  }

  function sendMessage () {
    const payload = {
      content: message,
      to: currentChat.isChannel ? currentChat.chatName : currentChat.receiverId,
      sender: username,
      chatName: currentChat.chatName,
      isChannel: currentChat.isChannel
    }
    console.log(payload)
    socketRef.current.emit('send message', payload)
    const newMessages = immer(messages, draft => {
      draft[currentChat.chatName].push({
        sender: username,
        content: message
      })
    })
    setMessages(newMessages)
  }

  function roomJoinCallback(incommingMessages,room) {
    const newMessages = immer(messages, draft => {
      draft[room] = incommingMessages
    })
    setMessages(newMessages)
  }

  function joinRoom (room) {
    const newConnectedRooms = immer(connectedRooms, draft=> {
      draft.push(room)
    })

    // here callback returns the messages
    socketRef.current.emit("join room", room, (messages) => roomJoinCallback(messages,room))
    setConnectedRooms(newConnectedRooms)
  }

  function toggleChat (currentChat) {
    
    if(!messages[currentChat.chatName]) {
      const newMessages = immer(messages, draft => {
        draft[currentChat.chatName] = []
      })
      setMessages(newMessages)
    }
    setCurrentChat(currentChat)
  }

  function connect () {
    setConnected(true)
    socketRef.current = io.connect('http://localhost:8900/')
    socketRef.current.emit('join server', username)
    socketRef.current.emit('join room', 'general', (messages)=> roomJoinCallback(messages,'general'))
    socketRef.current.on('new user', allUsers => {
      setAllUsers(allUsers)
    })

    socketRef.current.on('new message', ({ content, sender, chatName}) => {
      
      // sync messages with new message
      setMessages(messages => {
        // add new message to the targetted room or fast create if room not exist
        const newMessages = immer(messages, draft => {
          if (draft[chatName]){
            draft[chatName].push({ content, sender })
          } else {
            draft[chatName] = [{ content, sender }]
          }
        })

        return newMessages
      })
    })
  }

  if (connected) {
    body = (
      <Chat 
        message={message}
        handleMessageChange = {handleMessageChange}
        sendMessage = {sendMessage}
        yourId = { socketRef.current? socketRef.current.id : ""}
        allUsers = {allUsers}
        joinRoom = {joinRoom}
        connectedRooms = {connectedRooms}
        currentChat = {currentChat}
        toggleChat = {toggleChat}
        messages = {messages[currentChat.chatName]}
      />
    )
  } else {
    body = (
      <Form username={username} onChange={handleChange} connect={connect} />
    )
  }

  return (
    <div className="App">
      {body}
    </div>
  );
}

export default App;
