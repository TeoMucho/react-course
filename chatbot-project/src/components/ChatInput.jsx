import { Chatbot } from 'supersimpledev';
import { useState} from 'react'
import './ChatInput.css'

export function ChatInput({chatMessages, setChatMessages, setIsLoading}) {
      const [inputText,setInputText]= useState('');
     

      function saveInputText (event) {
       setInputText(event.target.value);

      }

      async function sendMessage () {
        const newChatMessages = [
          ...chatMessages,
        {
          message: inputText,
          sender: 'user',
          id: crypto.randomUUID()
        }
      ]

         setChatMessages(newChatMessages);
        setIsLoading(true);

      const response= await Chatbot.getResponseAsync(inputText);

         setChatMessages([
          ...newChatMessages,
        {
          message: response,
          sender: 'robot',
          id: crypto.randomUUID()
        }
      ]);

        setInputText('');
        setIsLoading(false);
      }

      return (
        <>
        <div className="chat-input-container">
          <input placeholder="Send a message to Chatbot" size="30"
          className="chat-input"
          onChange={saveInputText}
          value = {inputText} 
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              sendMessage();
            } else if (event.key === 'Escape') {
              setInputText('');
            }
          }
          }
          />
          <button
          onClick={sendMessage}
          className="send-button">Send</button>
          </div>
        </>
        
      );
    }