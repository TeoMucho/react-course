import RobotProfileImage from '../assets/robot.png';
import NaughtyUser from '../assets/NaughtyUser.jpg';
import './ChatMessage.css';

export default function ChatMessage({ message, sender, time }) {
  return (
    <div className={sender === 'user' ? 'chat-message-user' : 'chat-message-robot'}>
      {sender === 'robot' && (
        <img
          src={RobotProfileImage}
          width="50"
          alt="Robot"
          className="chat-message-profile"
        />
      )}

      <div className="chat-message-text">{message}</div>
      <div className="chat-message-time">{time}</div>

      {sender === 'user' && (
        <img
          src={NaughtyUser}
          width="50"
          alt="User"
          className="chat-message-profile"
        />
      )}
    </div>
  );
}