import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Follow } from './entities/follow.entity';

@Injectable()
export class UsersService {


    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Follow) private followRepo: Repository<Follow>,
    ) {}


    async upsert(user: User) {
        return await this.userRepo.upsert(user, {
            conflictPaths: ['id'],
            skipUpdateIfNoValuesChanged: true,
            upsertType: 'on-duplicate-key-update'
        })
    }

    async findAll() {
        return await this.userRepo.find();
    }

    async findOne(id: string) {
        return await this.userRepo.findOne({
            where: { id }
        });
    }

    async update(id: string, user: User) {
        return await this.userRepo.update(id, user);
    }


    async follow(currentUserId: string, followedUserId: string) {
        if (currentUserId === followedUserId) throw new BadRequestException('can\'t follow oneself')

        const follow_exit = await this.followRepo.createQueryBuilder('follow')
            .select()
            .where('follow.followerId = :sender', {sender: currentUserId})
            .andWhere('follow.followedId = :receiver', {receiver: followedUserId})
            .getOne()


        if (!follow_exit) {
            await this.followRepo.createQueryBuilder('follow')
                .insert()
                .values({
                    followed: {
                        id: followedUserId
                    },
                    follower: {
                        id: currentUserId
                    }
                })
                .execute()
            
            return {
                message: "followed successfully"
            }
        }

        await this.followRepo.remove(follow_exit)

        return {
            message: "unfollowed successfully"
        }
    }


    async find_followers(userId: string) {
        const followers = await this.followRepo.find({
            where: {
                followed: {
                    id: userId
                }
            },
            relations: ['follower']
        })

        return followers
    }


    async find_followings(userId: string) {
        const followings = await this.followRepo.find({
            where: {
                follower: {
                    id: userId
                }
            }, 
            relations: ['followed']
        })

        return followings
    }

}
