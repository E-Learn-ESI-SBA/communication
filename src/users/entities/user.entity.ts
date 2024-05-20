import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { Follow } from "./follow.entity";
import { Vote } from "../../posts/entities/vote.entity";
import { Post } from "../../posts/entities/post.entity";


@Entity('users')
export class User {

    @PrimaryColumn('uuid')
    id: string

    @Column()
    username: string

    @Column()
    avatar: string

    @OneToMany(() => Follow, follow => follow.followed, {cascade: true})
    @JoinColumn()
    followers: Follow[]

    @OneToMany(() => Follow, follow => follow.follower, { cascade: true })
    @JoinColumn()
    followings: Follow[]

    @OneToMany(() => Vote, vote => vote.user, { cascade: true })
    @JoinColumn()
    votes: Vote[]

    @OneToMany( () => Post, post => post.user, { cascade: true })
    @JoinColumn()
    posts: Post[]
}