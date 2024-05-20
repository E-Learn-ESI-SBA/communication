import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UsersModule } from '../users/users.module';
import { VotesModule } from './votes/votes.module';
import { Vote } from './entities/vote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Vote]), UsersModule, VotesModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}