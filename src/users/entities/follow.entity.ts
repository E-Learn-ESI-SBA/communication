import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";


@Entity()
export class Follow {
    
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => User, user => user.followers, { onDelete: 'CASCADE' })
    followed: User


    @ManyToOne(() => User, user => user.followings, { onDelete: 'CASCADE' })
    follower: User

}