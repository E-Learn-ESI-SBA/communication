import { User } from "../../users/entities/user.entity"
import { Column, ManyToOne, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Post } from "./post.entity"
import { CommentLike } from "./comment-like.entity"

@Entity('comments')
export class Comment {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    text: string

    @OneToMany(() => CommentLike, commentLike => commentLike.comment)
    likes: CommentLike[]

    @ManyToOne(() => User, user=> user.votes , { onDelete: 'CASCADE' })
    user: User

    @ManyToOne(() => Post, post => post.comments, { onDelete: 'CASCADE' })
    post: Post

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;
}