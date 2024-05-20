import { User } from "../../users/entities/user.entity"
import { Column, ManyToOne, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Post } from "./post.entity"

@Entity('votes')
export class Vote {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'enum', enum: ['up', 'down'] })
    vote: 'up' | 'down'

    @ManyToOne(() => User, user=> user.votes , { onDelete: 'CASCADE' })
    user: User

    @ManyToOne(() => Post, post => post.votes, { onDelete: 'CASCADE' })
    post: Post
}