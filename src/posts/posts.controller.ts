import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Req, Post, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '../guards/auth-guard.guard';
import { PostIdParamDto } from './dto/postid-param.dto';
import { PostOwnerGuard } from '../guards/post-owner.guard';
import { Post as PostEntity } from './entities/post.entity';
import { User } from '../users/entities/user.entity';
import { ApiBody, ApiParam } from '@nestjs/swagger'
import { CursorQueryDto } from './dto/cursor.dto';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/saved')
  @HttpCode(HttpStatus.OK)
  getSavedPosts(
    @Req() req: (Request & { user: { id: string } }),
  ) {
    return this.postsService.getSavedPosts(req.user.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({type: CreatePostDto})
  create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: (Request & { user: { id: string } }),
  ) {
    return this.postsService.create(createPostDto, req.user as User);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(
    @Query() query: CursorQueryDto,
    @Req() req: (Request & { user: { id: string } }),
  ) {
    const page = query.page?  query.page : 0;
    const limit = query.limit? query.limit : 5;
    return this.postsService.findAll(page, limit, req.user.id);
  }

  @Get('/:postId')
  @HttpCode(HttpStatus.OK)
  @ApiParam({name: 'postId', required: true, type: 'uuid'})
  findOne(@Param() params: PostIdParamDto) {
    return this.postsService.findOne(params.postId);
  }

  @Patch('/:postId')
  @UseGuards(PostOwnerGuard())
  @HttpCode(HttpStatus.OK)
  @ApiParam({name: 'postId', required: true, type: 'uuid'})
  update(
    @Param() params: PostIdParamDto,
    @Body() updatePostDto: UpdatePostDto
  ) {
    return this.postsService.update(params.postId, updatePostDto);
  }

  @Delete('/:postId')
  @UseGuards(PostOwnerGuard())
  @HttpCode(HttpStatus.OK)
  @ApiParam({name: 'postId', required: true, type: 'uuid'})
  remove(@Param() params: PostIdParamDto) {
    return this.postsService.remove(params.postId);
  }


  @Post('/:postId/save')
  @HttpCode(HttpStatus.CREATED)
  savePost(
    @Param() params: PostIdParamDto,
    @Req() req: (Request & { user: { id: string } }),
  ) {
    // this controller can be used for both save and unsave
    return this.postsService.savePost(params.postId, req.user.id);
  }
 
}
