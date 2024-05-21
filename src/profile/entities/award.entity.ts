import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Profile } from './profile.entity';

@Entity()
export class Award {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  event: string;

  @Column()
  date: Date;

  @Column('text')
  description: string;

  @ManyToOne(() => Profile, (profile) => profile.awards)
  profile: Profile;
}
