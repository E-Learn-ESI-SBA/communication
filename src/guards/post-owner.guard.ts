import { BadRequestException, CanActivate, ExecutionContext, Inject, Injectable, NotFoundException, Type, UnauthorizedException, mixin } from '@nestjs/common';
import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm';
import { validate } from 'class-validator';
import { PostIdParamDto } from '../posts/dto/postid-param.dto';
import { Post } from '../posts/entities/post.entity';


export const PostOwnerGuard = (): Type<CanActivate> => {
    class ScopeGuard {
        constructor(
            @Inject(DataSource) private readonly dataSource: DataSource
        ) {}

        async canActivate(
           context: ExecutionContext,
        ): Promise<boolean> {
        
            const request = context.switchToHttp().getRequest();
        
            const params: PostIdParamDto = request.params;
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

            if (post.user.id !== request.user.id && request.user.role !== 'admin') {
              throw new UnauthorizedException("unauthorized");
            }

            request.post = post;
            return true
        }
    }
    return mixin(ScopeGuard);
}
