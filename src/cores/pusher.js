import PusherJs from 'pusher-js';

class Pusher {
  server;

  setup(key) {
    this.server = new PusherJs(import.meta.env.VITE_PUSHER_KEY, {
      cluster: '',
      forceTLS: false,
      wsHost: import.meta.env.VITE_PUSHER_HOST,
      wsPort: import.meta.env.VITE_PUSHER_PORT,
      channelAuthorization: {
        endpoint: '/broadcasting/auth',
        headersProvider: () => {
          return {
            Accept: 'application/json',
            Authorization: `Bearer ${key}`,
          };
        },
      },
    });
  }
}

export default new Pusher();
