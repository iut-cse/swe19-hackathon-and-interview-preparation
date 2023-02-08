import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { io } from 'socket.io-client';
import Image from './components/Image';

const Page = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  background-color: #46516e;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  max-height: 500px;
  overflow: auto;
  width: 400px;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding-bottom: 10px;
  margin-top: 25px;
`;

const TextArea = styled.textarea`
  width: 98%;
  height: 100px;
  border-radius: 10px;
  margin-top: 10px;
  padding-left: 10px;
  padding-top: 10px;
  font-size: 17px;
  background-color: transparent;
  border: 1px solid lightgray;
  outline: none;
  color: lightgray;
  letter-spacing: 1px;
  line-height: 20px;
  ::placeholder {
    color: lightgray;
  }
`;

const Button = styled.button`
  background-color: pink;
  width: 100%;
  border: none;
  height: 50px;
  border-radius: 10px;
  color: #46516e;
  font-size: 17px;
`;

const Form = styled.form`
  width: 400px;
`;

const MyRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const MyMessage = styled.div`
  width: 45%;
  background-color: pink;
  color: #46516e;
  padding: 10px;
  margin-right: 5px;
  text-align: center;
  border-top-right-radius: 10%;
  border-bottom-right-radius: 10%;
`;

const PartnerRow = styled(MyRow)`
  justify-content: flex-start;
`;

const PartnerMessage = styled.div`
  width: 45%;
  background-color: transparent;
  color: lightgray;
  border: 1px solid lightgray;
  padding: 10px;
  margin-left: 5px;httpServer
  text-align: center;
  border-top-left-radius: 10%;
  border-bottom-left-radius: 10%;
`

const App = () => {
  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState()

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io('http://localhost:8800/');

    socketRef.current.on('your id', id => {
      setYourID(id);
    });

    socketRef.current.on('message', msg => {
      console.log('here');
      receivedMessage(msg);
    });
  }, []);

  function receivedMessage(message) {
    console.log(message)
    setMessages(oldMsgs => [...oldMsgs, message]);
  }

  function sendMessage(e) {
    e.preventDefault();
    if (file) {
      const messageObject = {
        id: yourID,
        type: 'file',
        body: file,
        mimeType: file.type,
        fileName: file.name
      }
      setMessage('')
      setFile()
      socketRef.current.emit('send message', messageObject)
    } else {
      const messageObject = {
        id: yourID,
        type: 'text',
        body: message
      }
      setMessage('')
      socketRef.current.emit('send message', messageObject)
    }
    
  }

  function handleChange(e) {
    setMessage(e.target.value);
  }

  function selectFile(e) {
    setMessage(e.target.files[0].name)
    setFile(e.target.files[0])
  }

  function renderMessages(message, index) {
    if (message.type === 'file') {
      const blob = new Blob([message.body], {type: message.type})
      if (message.id === yourID) {
        return (
          <MyRow key={index}>
            <Image fileName={message.fileName} blob={blob} />
          </MyRow>
        )
      }
      return (
        <PartnerRow key={index}>
          <Image fileName={message.fileName} blob={blob} />
        </PartnerRow>
      )
    }

    if (message.id === yourID) {
      return (
        <MyRow key={index}>
          <MyMessage>{message.body}</MyMessage>
        </MyRow>
      )
    }
    return (
      <PartnerRow key={index}>
        <PartnerMessage>{message.body}</PartnerMessage>
      </PartnerRow>
    )

  }
  return (
    <Page>
      <Container>
        {messages.map(renderMessages)}
      </Container>
      <Form onSubmit={sendMessage}>
        <TextArea
          value={message}
          onChange={handleChange}
          placeholder='Say something...'
        />
        <input onChange={selectFile} type='file'/>
        <Button>Send</Button>
      </Form>
    </Page>
  );
};

export default App;
