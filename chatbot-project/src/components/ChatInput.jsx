import { Chatbot } from 'supersimpledev';
import { useState, useEffect} from 'react'
import './ChatInput.css'
import dayjs from 'dayjs';

export function ChatInput({chatMessages, setChatMessages, setIsLoading}) {
      const [inputText,setInputText]= useState('');
     
      useEffect(() => {
    Chatbot.addResponses({
      'Hola': 'HOLA ME GUSTAAA'
    });
  }, []);

      function saveInputText (event) {
       setInputText(event.target.value);

      }

      async function sendMessage () {
        const newChatMessages = [
          ...chatMessages,
        {
          message: inputText,
          sender: 'user',
          id: crypto.randomUUID(),
           time: dayjs().format('HH:mm'),
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
          id: crypto.randomUUID(),
          time: dayjs().format('HH:mm'),
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