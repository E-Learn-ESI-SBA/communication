import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Experience } from './experience.entity';
import { Project } from './project.entity';
import { Award } from './award.entity';
import { Skill } from './skill.entity';
import { OtherSkill } from './other-skill.entity';
import { Education } from './education.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  image: string;

  @Column('text')
  summary: string;

  @OneToMany(() => Experience, (experience) => experience.profile, { cascade: true })
  experiences: Experience[];

  @OneToMany(() => Project, (project) => project.profile, { cascade: true })
  projects: Project[];

  @OneToMany(() => Award, (award) => award.profile, { cascade: true })
  awards: Award[];

  @OneToMany(() => Skill, (skill) => skill.profile, { cascade: true })
  skills: Skill[];

  @OneToMany(() => OtherSkill, (otherSkill) => otherSkill.profile, { cascade: true })
  otherSkills: OtherSkill[];

  @OneToMany(() => Education, (education) => education.profile, { cascade: true })
  education: Education[];

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;
}
