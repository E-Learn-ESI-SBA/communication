import { IsString, IsArray, IsOptional, IsNotEmpty } from 'class-validator';
import { Experience } from '../entities/experience.entity';
import { Project } from '../entities/project.entity';
import { Award } from '../entities/award.entity';
import { Skill } from '../entities/skill.entity';
import { OtherSkill } from '../entities/other-skill.entity';
import { Education } from '../entities/education.entity';

export class CreateProfileDto {
  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsNotEmpty()
  summary: string;

  @IsArray()
  @IsOptional()
  experiences?: Experience[];

  @IsArray()
  @IsOptional()
  projects?: Project[];

  @IsArray()
  @IsOptional()
  awards?: Award[];

  @IsArray()
  @IsOptional()
  skills?: Skill[];

  @IsArray()
  @IsOptional()
  otherSkills?: OtherSkill[];

  @IsArray()
  @IsOptional()
  education?: Education[];
}
