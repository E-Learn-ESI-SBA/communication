import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Comment } from '../entities/comment.entity';
import { UsersModule } from '../../users/users.module';
import { CommentLike } from '../entities/comment-like.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment, CommentLike]), UsersModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
