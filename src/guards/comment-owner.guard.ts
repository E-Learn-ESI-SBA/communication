import { BadRequestException, CanActivate, ExecutionContext, Inject, Injectable, NotFoundException, Type, UnauthorizedException, mixin } from '@nestjs/common';
import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm';
import { validate } from 'class-validator';
import { CommentIdParamDto } from '../posts/dto/commentid-param.dto';
import { Post } from '../posts/entities/post.entity';
import { Comment } from '../posts/entities/comment.entity';


export const CommentOwnerGuard = (postOwnerPerms: boolean=false): Type<CanActivate> => {
    class ScopeGuard {
        constructor(
            @Inject(DataSource) private readonly dataSource: DataSource
        ) {}

        async canActivate(
           context: ExecutionContext,
        ): Promise<boolean> {
        
            const request = context.switchToHttp().getRequest();
        
            const params: CommentIdParamDto = request.params;
            validate(params).then(errors => {
                if (errors.length > 0) {
                    throw new BadRequestException(errors);
                }
            });

            //fetch post from db
            const post = await this.dataSource.getRepository(Post).findOne({
                where: {id: params.postId},
                relations: ['user'],
            });

            if (!post) {
              throw new NotFoundException("Post not found");
            }

            //fetch comment from db
            const comment = await this.dataSource.getRepository(Comment).findOne({
                where: { id: params.commentId, post: { id: params.postId } },
                relations: ['user']
            })

            if (!comment) {
                throw new NotFoundException("Comment not found");
            }

            // checking if not admin and not comment owner
            if ( 
                request.user.role !== 'admin'    &&
                comment?.user.id  !== request.user.id  &&
                !(postOwnerPerms &&
                    post?.user.id === request.user.id)
            ) {
              throw new UnauthorizedException("unauthorized");
            }

            request.post = post;
            request.comment = comment
            return true
        }
    }
    return mixin(ScopeGuard);
}
