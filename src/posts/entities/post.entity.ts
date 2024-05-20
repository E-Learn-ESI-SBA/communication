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

@Entity('posts')
export class Post {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    text: string

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
    
    @OneToMany(() => Vote, vote => vote.post)
    @JoinColumn()
    votes: Vote[]
}