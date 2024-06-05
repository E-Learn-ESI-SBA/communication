import { User } from "../../users/entities/user.entity"
import { Column, ManyToOne, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Post } from "./post.entity"

@Entity('saves')
export class Save {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => User, user=> user.votes , { onDelete: 'CASCADE' })
    user: User

    @ManyToOne(() => Post, post => post.saves, { onDelete: 'CASCADE' })
    post: Post

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;
}