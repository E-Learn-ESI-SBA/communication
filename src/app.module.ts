import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { CassandraModule } from './cassandra/cassandra.module';

@Module({
  imports: [PostsModule, CassandraModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
