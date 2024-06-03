import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { Comment } from '../entities/comment.entity';
import { UsersModule } from '../../users/users.module';


@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment]), UsersModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
