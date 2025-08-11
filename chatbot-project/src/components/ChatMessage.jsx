import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/user.png';

export default function ChatMessage({ message, sender }) {
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

      {sender === 'user' && (
        <img
          src={UserProfileImage}
          width="50"
          alt="User"
          className="chat-message-profile"
        />
      )}
    </div>
  );
}