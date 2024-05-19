import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UsersModule } from '../users/users.module';
import { VotesModule } from './votes/votes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UsersModule, VotesModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
