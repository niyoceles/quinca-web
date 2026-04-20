import { io } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

let socket;

export const initiateSocket = (userId) => {
  socket = io(SOCKET_URL, {
    withCredentials: true,
  });

  if (socket && userId) {
    socket.emit('join', userId);
  }
  
  return socket;
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};

export const subscribeToNotifications = (cb) => {
  if (!socket) return (true);
  socket.on('notification', (data) => {
    return cb(null, data);
  });
};
