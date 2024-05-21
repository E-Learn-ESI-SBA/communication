import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Experience } from './entities/experience.entity';
import { Project } from './entities/project.entity';
import { Award } from './entities/award.entity';
import { Skill } from './entities/skill.entity';
import { OtherSkill } from './entities/other-skill.entity';
import { Education } from './entities/education.entity';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile, Experience, Project, Award, Skill, OtherSkill, Education]),
    UsersModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
