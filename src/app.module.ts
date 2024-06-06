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
import { Profile } from './profile/entities/profile.entity';
import { Experience } from './profile/entities/experience.entity';
import { Project } from './profile/entities/project.entity';
import { Award } from './profile/entities/award.entity';
import { Skill } from './profile/entities/skill.entity';
import { OtherSkill } from './profile/entities/other-skill.entity';
import { Education } from './profile/entities/education.entity';
import { Save } from './posts/entities/save.entity';


@Module({
  imports: [
    PostsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 99,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASS,
      database: process.env.POSTGRES_DB,
      entities: [Post, User, Save, Follow, Vote, Comment, Profile, Experience, Project, Award, Skill, OtherSkill, Education],
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
