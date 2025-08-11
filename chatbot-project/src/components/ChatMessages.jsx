import RobotProfileImage from '../assets/robot.png'
import LoadingSpinner from '../assets/loading-spinner.gif'
import {useAutoScroll} from './AutoScroll.jsx';
import ChatMessage from './ChatMessage.jsx';
 
 export function ChatMessages({chatMessages, isLoading}) {
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
