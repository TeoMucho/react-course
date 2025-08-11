import { useState,useRef,useEffect } from 'react'
import './App.css'
import RobotProfileImage from './assets/robot.png'
import UserProfileImage from './assets/user.png'
import LoadingSpinner from './assets/loading-spinner.gif'


    function useAutoScroll(dependencies) {
        // It's highly recommend to rename this to something
        // more generic like containerRef. This will make the
        // code make more sense if we ever reuse this code in
        // other components.
        const containerRef = useRef(null);

        useEffect(() => {
         
          const containerElem = containerRef.current;
          if (containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight;
          }
       
        }, dependencies);

        return containerRef;
      }

    function ChatMessage({ message, sender }) {
      // You can also destructure props like this:
      // function ChatMessage(props) {}) {
     //const message = props.message;
     //const sender = props.sender;
     
     //const { message, sender } = props;
      /*
      if (sender === 'robot') {
        return(
              <div>
              <img src="robot.png" width="50" />
            {message}
        </div>)


      }
        */
      return (
        <div 
        className={sender=== 'user' ? 'chat-message-user' : 'chat-message-robot'}
        >
        {sender === 'robot' && (
            <img src={RobotProfileImage} width="50" className="chat-message-profile" />)}
            
            <div className="chat-message-text">
                {message}
            </div>

         {sender === 'user' && (
          <img src={UserProfileImage} width="50" className="chat-message-profile" />)}
        </div>
      );
    }

    function ChatMessages({chatMessages, isLoading}) {
      const chatMessagesRef = useAutoScroll([chatMessages]);

       

      return(
      
      <div className="chat-messages-container"
      ref = {chatMessagesRef}
>
        
        {chatMessages.map((chatMessage) => {
              return (
              <ChatMessage 
                message={chatMessage.message} 
                sender={chatMessage.sender}
                key={chatMessage.id} 
              />
            );
           })}
           {isLoading && (
        <div className="chat-message-robot">
          <img src={RobotProfileImage} width="50" className="chat-message-profile" />
          <div className="chat-message-text">
            <img src={LoadingSpinner} width="30"/>
          </div>
        </div>
      )}
      </div>
      );
    }

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
