import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts/entities/post.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Follow } from './users/entities/follow.entity';
import { Vote } from './posts/entities/vote.entity';
import { Comment } from './posts/entities/comment.entity';


@Module({
  imports: [
    PostsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'communication',
      password: 'communication',
      database: 'communication',
      entities: [Post, User, Follow, Vote, Comment],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
