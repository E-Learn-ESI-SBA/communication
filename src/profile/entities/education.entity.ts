import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Profile } from './profile.entity';

@Entity()
export class Education {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  university: string;

  @Column()
  specialty: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column('text')
  description: string;

  @ManyToOne(() => Profile, (profile) => profile.education)
  profile: Profile;
}
