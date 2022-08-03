import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'dgram';

@WebSocketGateway({
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
})
export class TalkGateway {
  @SubscribeMessage('room:create')
  createRoom(@MessageBody() data: unknown, @ConnectedSocket() client: Socket) {
    // get user id to determine who created Room
    // Should create room in db
    // and user (id) auto join to his room

    client.emit('room:created', {
      data: {
        roomId: 'room:657289564984ds5q6d498qsd42az94d',
      },
    });
  }

  @SubscribeMessage('room:join')
  joinRoom(@MessageBody() data: unknown, @ConnectedSocket() client: Socket) {
    // get user id  to determine who joined
    // Should check if room exist and if room limit not exceeded
    client.emit('room:joined', {
      data: {},
    });
  }

  @SubscribeMessage('room:leave')
  leaveRoom(@MessageBody() data: unknown, @ConnectedSocket() client: Socket) {
    // get user id  to determine who left
    // leave room by deleting user from room users
    client.emit('room:joined', {
      data: {},
    });
  }
}
