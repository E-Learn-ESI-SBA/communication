import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Vote } from '../entities/vote.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';

@Injectable()
export class VotesService {

    constructor(
        @InjectRepository(Vote) private voteRepository: Repository<Vote>,
        @InjectRepository(Post) private postRepository: Repository<Post>
    ) {}


    async upVote(currentUserId: string, postId: string) {
        const voteExist = await this.voteRepository.createQueryBuilder('votes')
            .select()
            .where('votes.userId = :userId', {userId: currentUserId})
            .andWhere('votes.postId = :postId', {postId: postId})
            .getOne()

        if (!voteExist) {
            await this.voteRepository.createQueryBuilder('votes')
                .insert()
                .values({
                    user: {
                        id: currentUserId
                    },
                    post: {
                        id: postId
                    },
                    vote: 'up'
                })
                .execute()

            await this.postRepository.increment({ id: postId }, 'upvotes_count', 1)

            return {
                message: 'upvote added'
            }
        }

        if (voteExist.vote === 'up') {
            await this.voteRepository.remove(voteExist)
            await this.postRepository.decrement({ id: postId }, 'upvotes_count', 1)
            return {
                message: 'upvote removed'
            }
        }

        voteExist.vote = 'up'
        await this.voteRepository.save(voteExist)
        await this.postRepository.increment({ id: postId }, 'upvotes_count', 1)
        await this.postRepository.decrement({ id: postId }, 'downvotes_count', 1)
        return {
            message: 'upvote added'
        }
    }



    async downVote(currentUserId: string, postId: string) {
        const voteExist = await this.voteRepository.createQueryBuilder('votes')
            .select()
            .where('votes.userId = :userId', {userId: currentUserId})
            .andWhere('votes.postId = :postId', {postId: postId})
            .getOne()

        if (!voteExist) {
            await this.voteRepository.createQueryBuilder('votes')
                .insert()
                .values({
                    user: {
                        id: currentUserId
                    },
                    post: {
                        id: postId
                    },
                    vote: 'down'
                })
                .execute()

            await this.postRepository.increment({ id: postId }, 'downvotes_count', 1)

            return {
                message: 'downvote added'
            }
        }

        if (voteExist.vote === 'down') {
            await this.voteRepository.remove(voteExist)
            await this.postRepository.decrement({ id: postId }, 'downvotes_count', 1)
            return {
                message: 'downvote removed'
            }
        }

        voteExist.vote = 'down'
        await this.voteRepository.save(voteExist)
        await this.postRepository.increment({ id: postId }, 'downvotes_count', 1)
        await this.postRepository.decrement({ id: postId }, 'upvotes_count', 1)
        return {
            message: 'downvote added'
        }
    }


    async get_votes(postId: string) {
        const votes = await this.voteRepository.find({
            where: {
                post: {
                    id: postId
                }
            }, 
            relations: ['user']
        })

        return votes
    } 
 
}
