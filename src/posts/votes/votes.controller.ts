import { Controller, Get, HttpCode, Param, Post, Req, UseGuards } from '@nestjs/common';
import { VotesService } from './votes.service';
import { PostIdParamDto } from '../dto/postid-param.dto';
import { AuthGuard } from '../../guards/auth-guard.guard';
import { PostOwnerGuard } from '../../guards/post-owner.guard';
import { Post as PostEntity } from '../entities/post.entity';

@Controller('votes')
@UseGuards(new AuthGuard())
export class VotesController {
  constructor(private readonly votesService: VotesService) {}



  @Post('/:postId/up')
  @HttpCode(200)
  async upVote(
    @Req() req: Request & { user: { id: string } },
    @Param() params: PostIdParamDto,
  ) {
    return this.votesService.upVote(req.user.id, params.postId);
  }


  @Post('/:postId/down')
  @HttpCode(200)
  async downVote(
    @Req() req: Request & { user: { id: string } },
    @Param() params: PostIdParamDto,
  ) {
    return this.votesService.downVote(req.user.id, params.postId);
  }


  @Get('/:postId')
  @HttpCode(200)
  @UseGuards(PostOwnerGuard(PostEntity))
  async get_votes(
    @Param() params: PostIdParamDto,
  ) {
    return this.votesService.get_votes(params.postId)
  }
}
