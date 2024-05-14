import React from 'react';
import useChat from '@/hooks/useChat';
import { useFetchRecipient } from '@/hooks/useFetchRecipient';
import { FaceBookIcon, InstagramIcon, TelegramIcon, WhatsAppIcon } from '@/components/icons';
import avatar from '@/assets/images/avatar.png';
import web from '@/assets/images/web.svg'; 

import '@/assets/styles/leftmenu.css';

type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
};

type User = {
  name: string;
  email: string;
};

type OnlineUser = {
  userId: string;
  socketId: string;
};

type Chat = {
  id: string;
  members: User[]; 
  messages: Message[];
  origin: {
    platform: "facebook" | "instagram" | "telegram" | "web" | "whatsapp";
  };
};

interface UserChatProps {
  chat: Chat;
  user: User;
}

export const UserChat: React.FC<UserChatProps> = ({ chat, user }) => {
  const { recipientUser, error } = useFetchRecipient(chat, user);  
  
  const { onlineUsers } = useChat();

  const isOnline = onlineUsers?.some((onlineUser: OnlineUser) => onlineUser.userId === recipientUser?._id);

  const origin = chat?.origin.platform;

  const getChatIcon = () => {
    switch (origin) {
      case "facebook":
        return <FaceBookIcon />;
      case "instagram":
        return <InstagramIcon />;
      case "telegram":
        return <TelegramIcon />;
      case "web":
        return  <img src={web} style={{width: '30px', height:'30px'}} alt="Web Icon" />;
      case "whatsapp":
        return <WhatsAppIcon />;
      default:
        return <WhatsAppIcon />;
    }
  };


  return (
    <div className="messageBubble">
      <div className="avatarWithName">
        <div className='imageName'>
          <img src={avatar} alt="Avatar" className="avatar-client" />
          <div className="name">{ `${recipientUser?.name} ${recipientUser?.lastName}`}</div>
        </div>
        <div className={isOnline ? "online" : "offline"}></div>
      </div>
      <div className="messageDetails">
        <div className="companyName">Fazenda Minas Pro</div>
        {/* <div className="time">1 Minute</div> */}
      </div>
      <div className="messageLogo">{ getChatIcon() }</div>
    </div>
  );
}