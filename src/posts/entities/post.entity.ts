import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('posts')
export class Post {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    text: string

    @Column()
    user_id: string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

    @Column({ default: 0 })
    upvotes_count: number

    @Column({ default: 0 })
    downvotes_count: number
}