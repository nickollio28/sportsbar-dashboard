import React from 'react';

interface NotificationProps {
  message: string;
}

const Notification: React.FC<NotificationProps> = ({ message }) => {
  return (
    <div style={{ padding: '10px', backgroundColor: '#ffcc00', borderRadius: '5px' }}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
