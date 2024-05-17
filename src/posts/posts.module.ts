import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostRepo } from './post.repository';
import { CassandraService } from 'src/cassandra/cassandra.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostRepo, CassandraService],
})
export class PostsModule {}
