import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { JwtModuleService } from './modules/shared/jwt.module';
import { ConfigModule } from './modules/shared/env.module';
import { UsersModule } from './modules/users/users.module';
import { SocketModule } from './modules/socket/socket.module';
import { AvatarModule } from './modules/shared/avatar.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { RoomtypeScalar } from './modules/rooms/entities/room.scalar';
import { TagsModule } from './modules/tags/tags.module';

const MONOGO_CONNECT_STRING = `mongodb+srv://${process.env.dbUserName}:${process.env.dbUserPassword}@cluster0.iig7z.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`;
const MongooseImportedModule = MongooseModule.forRoot(MONOGO_CONNECT_STRING, {
  keepAlive: true,
});
const GraphQLImportedModule = GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  playground: true,
  autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
  sortSchema: true,
  resolvers: { Roomtype: RoomtypeScalar },
  formatError(err) {
    err.extensions.exception['name'] = undefined;
    return {
      message: err.message,
      ...err.extensions.exception,
    };
  },
  context: ({ req, res }) => ({ req, res }),
});

@Module({
  imports: [
    ConfigModule,
    GraphQLImportedModule,
    MongooseImportedModule,
    JwtModuleService,
    AvatarModule,
    UsersModule,
    SocketModule,
    RoomsModule,
    TagsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
