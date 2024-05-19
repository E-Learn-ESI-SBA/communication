import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { Follow } from "./follow.entity";


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
    followers: [Follow]

    @OneToMany(() => Follow, follow => follow.follower, { cascade: true })
    @JoinColumn()
    followings: [Follow]
}