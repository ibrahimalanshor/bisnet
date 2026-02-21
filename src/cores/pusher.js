import Pusher from 'pusher-js';
import { useAuthStore } from '../features/auth/auth.store';

const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
  cluster: '',
  enabledTransports: ['ws'],
  forceTLS: false,
  wsHost: import.meta.env.VITE_PUSHER_HOST,
  wsPort: import.meta.env.VITE_PUSHER_PORT,
  channelAuthorization: {
    endpoint: '/broadcasting/auth',
    headersProvider: () => {
      const auth = useAuthStore();

      return {
        Accept: 'application/json',
        Authorization: `Bearer ${auth.accessToken}`,
      };
    },
  },
});

pusher.connection.bind('error', (e) =>
  console.error('cannot connect to pusher : ', e),
);

export { pusher };
