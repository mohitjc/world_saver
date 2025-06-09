import io from 'socket.io-client';
const socketConnection = io('https://chat.crowdsavetheworld.com');

const onSocketConnection = () => {
  // socketConnection.on("connection", (socket) => {
  //     // an object containing "my-custom-header": "1234"
  //     socket.emit('new-user')
  // });
  // try {
  //     let data = {
  //         to: 'gouravjafrain9786@gmail.com',
  //         from: 'fights@yopmail.com',
  //         messages: 'Hlw'
  //     }
  //     socketConnection.emit('new-message', data)
  //     socketConnection.on('receive-message', function (a) {
  //     })
  // } catch (err) {
  //     console.log('errr....', err)
  // }
};

const onSocketDisconnection = async () => {
  // const socket = await io("https://server-domain.com");
  // return socket
};

export { onSocketConnection, onSocketDisconnection, socketConnection };
