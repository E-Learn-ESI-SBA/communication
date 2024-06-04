import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { Post } from '../entities/post.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';

@Injectable()
export class CommentsService {

    constructor(
        @InjectRepository(Comment) private commentRepo: Repository<Comment>,
        @InjectRepository(Post) private postRepo: Repository<Post>
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
            relations: ['user']   
        })

        if (res.length === 0) {
            throw new NotFoundException("comments not found")
        }

        return res
    }
}
