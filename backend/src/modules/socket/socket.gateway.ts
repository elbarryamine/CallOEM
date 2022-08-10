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
export class SocketGateway {
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
    // leave room by deleting user from room members
    client.emit('room:leave', {
      data: {},
    });
  }
}
