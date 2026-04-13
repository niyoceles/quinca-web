import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initiateSocket, disconnectSocket, subscribeToNotifications } from '../../utils/socket';
import { addRealTimeNotification } from '../../redux/actions/notificationActions';

const SocketHandler = () => {
  const dispatch = useDispatch();
  const { authenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authenticated && user && user.id) {
      // Connect and join room
      initiateSocket(user.id);

      // Listen for notifications
      subscribeToNotifications((err, data) => {
        if (err) return;
        dispatch(addRealTimeNotification(data));
      });
    }

    return () => {
      disconnectSocket();
    };
  }, [authenticated, user, dispatch]);

  return null; // This component doesn't render anything UI-wise
};

export default SocketHandler;
