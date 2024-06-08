import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from '../../guards/auth-guard.guard';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { PostIdParamDto } from '../dto/postid-param.dto';
import { CommentOwnerGuard } from '../../guards/comment-owner.guard';
import { Comment } from '../entities/comment.entity';
import { CommentIdParamDto } from '../dto/commentid-param.dto';


@Controller('posts/:postId/comments')
@UseGuards(AuthGuard())
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}


  @Get('')
  @HttpCode(HttpStatus.OK)
  async getPostComments(
    @Param() params: PostIdParamDto
  ) {
    return this.commentsService.getPostComments(params.postId)
  }


  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async addComment(
    @Body() body: CreateCommentDto,
    @Req() req: Request & { user: { id: string } },
    @Param() params: PostIdParamDto
  ) {
    return this.commentsService.addComment(body, req.user.id, params.postId)
  }


  @Delete('/:commentId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(CommentOwnerGuard(true))
  async deleteComment(
    @Req() req: Request & { comment: Comment }
  ) {
    return this.commentsService.deleteComment(req.comment.id)
  }


  @Put('/:commentId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(CommentOwnerGuard())
  async editComment(
    @Body() body: CreateCommentDto,
    @Param() params: CommentIdParamDto
  ) {
    return this.commentsService.editComment(body, params.commentId)
  }


  @Post('/:commentId/like')
  @HttpCode(HttpStatus.OK)
  async likeComment(
    @Req() req: Request & { user: { id: string } },
    @Param() params: CommentIdParamDto
  ) {
    return this.commentsService.likeComment(params.commentId, req.user.id)
  }


  @Get('/:commentId/likes')
  @HttpCode(HttpStatus.OK)
  async getCommentLikes(
    @Param() params: CommentIdParamDto
  ) {
    return this.commentsService.getCommentLikes(params.commentId)
  }

}
