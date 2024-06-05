import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UsersModule } from '../users/users.module';
import { VotesModule } from './votes/votes.module';
import { CommentsModule } from './comments/comments.module';
import { Save } from './entities/save.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Save]), UsersModule, VotesModule, CommentsModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}