import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { Post } from '../entities/post.entity';
import { Vote } from '../entities/vote.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Vote, Post]), UsersModule],
  controllers: [VotesController],
  providers: [VotesService],
})
export class VotesModule {}
