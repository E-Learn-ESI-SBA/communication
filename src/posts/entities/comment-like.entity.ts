import { User } from "../../users/entities/user.entity"
import { ManyToOne, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm"
import { Comment } from "./comment.entity"

@Entity('comment_likes')
export class CommentLike {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => User, user=> user.likes , { onDelete: 'CASCADE' })
    user: User

    @ManyToOne(() => Comment, comment => comment.likes, { onDelete: 'CASCADE' })
    comment: Comment

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

}