import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { Post } from '../entities/post.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentLike } from '../entities/comment-like.entity';
import { cp } from 'fs';

@Injectable()
export class CommentsService {

    constructor(
        @InjectRepository(Comment) private commentRepo: Repository<Comment>,
        @InjectRepository(Post) private postRepo: Repository<Post>,
        @InjectRepository(CommentLike) private commentLikeRepo: Repository<CommentLike>,
    ) {}


    async addComment(comment: CreateCommentDto, userId: string, postId: string) {
        const res =  await this.commentRepo.insert({
            ...comment,
            user: {
                id: userId
            },
            post: {
                id: postId
            }
        })

        await this.postRepo.increment({
            id: postId
        }, 'comments_count', 1)

        return res
    }


    async deleteComment(commentId: string) {
        const res =  await this.commentRepo.delete({
            id: commentId
        })

        if (res.affected === 0) {
            throw new NotFoundException("comment not found")
        }

        await this.postRepo.decrement({
            id: commentId
        }, 'comments_count', 1)

        return res
    }

    async editComment(body: CreateCommentDto, commentId: string) {
        return this.commentRepo.update({
            id: commentId
        },
        {
            ...body
        })
    }


    async getPostComments(postId: string) {
        const res =  await this.commentRepo.find({
            where: {
                post: {
                    id: postId
                }
            },
            relations: ['user', 'likes', 'likes.user']   
        })


        return res
    }

    async likeComment(commentId: string, userId: string) {
        const existingLike = await this.commentLikeRepo.findOne({
            where: {
                comment: {
                    id: commentId
                },
                user: {
                    id: userId
                }
            }
        })

        if (existingLike) {
            return await this.commentLikeRepo.delete({
                id: existingLike.id
            })
        }
        const res = await this.commentLikeRepo.createQueryBuilder('comment_likes')
            .insert()
            .into(CommentLike)
            .values({
                comment: {
                    id: commentId
                },
                user: {
                    id: userId
                }
            })
            .execute()


        return res
    }


    async getCommentLikes(commentId: string) {
        const res =  await this.commentLikeRepo.find({
            where: {
                comment: {
                    id: commentId
                }
            },
            relations: ['user']   
        })

        return res
    }

}
