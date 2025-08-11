import { useState } from 'react'
import './App.css'
import {ChatInput} from './components/ChatInput'
import  ChatMessage  from './components/ChatMessage.jsx'
import {ChatMessages} from './components/ChatMessages.jsx'


    

  function App() {

      const [chatMessages, setChatMessages] = useState(
[{
        message: 'Hello, how can I help you?',
        sender: 'robot',
         id: 'id2'
      }
      ]
);
const [isLoading, setIsLoading] = useState(false);
  //const [chatMessages, setChatMessages] = array; 
  //const chatMessages = array[0];
  //const setChatMessages = array[1];     


      return (
     
    <div className="app-container">
       
       <ChatMessages
       chatMessages={chatMessages} 
       isLoading={isLoading}
       />
       <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages} 
         
        setIsLoading={setIsLoading}
        />
       
       
    </div>
    )
    }


export default App
