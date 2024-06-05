import { on } from "events";
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn,
    ManyToOne
} from "typeorm"
import { Vote } from "./vote.entity";
import { User } from "../../users/entities/user.entity";
import { Comment } from "./comment.entity";
import { Save } from "./save.entity";

@Entity('posts')
export class Post {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    header: string

    @Column()
    text: string

    //string array for images (postgres)
    @Column("simple-array", { default: [] })
    images: string[]

    @ManyToOne(() => User, user => user.posts, { onDelete: "CASCADE" })
    user: User

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

    @Column({ default: 0 })
    upvotes_count: number

    @Column({ default: 0 })
    downvotes_count: number

    @Column({ default: 0 })
    comments_count: number
    
    @OneToMany(() => Vote, vote => vote.post)
    @JoinColumn()
    votes: Vote[]

    @OneToMany(() => Save, save => save.post)
    @JoinColumn()
    saves: Save[]

    @OneToMany(() => Comment, comment => comment.post)
    @JoinColumn()
    comments: Comment[]
}