import { Controller, Get, Body, Patch, Param, Delete, UseGuards, Req, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '../guards/auth-guard.guard';
import { PostIdParamDto } from './dto/postid-param.dto';
import { PostOwnerGuard } from '../guards/post-owner.guard';
import { Post as PostEntity } from './entities/post.entity';
import { User } from '../users/entities/user.entity';

@Controller('posts')
@UseGuards(new AuthGuard())
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @HttpCode(201)
  create(
    @Body() createPostDto: CreatePostDto,
    @Req() req: (Request & { user: { id: string } }),
  ) {
    return this.postsService.create(createPostDto, req.user as User);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':postId')
  @HttpCode(200)
  findOne(@Param() params: PostIdParamDto) {
    return this.postsService.findOne(params.postId);
  }

  @Patch(':postId')
  @UseGuards(PostOwnerGuard(PostEntity))
  @HttpCode(200)
  update(
    @Param() params: PostIdParamDto,
    @Body() updatePostDto: UpdatePostDto
  ) {
    return this.postsService.update(params.postId, updatePostDto);
  }

  @Delete(':postId')
  @UseGuards(PostOwnerGuard(PostEntity))
  @HttpCode(200)
  remove(@Param() params: PostIdParamDto) {
    return this.postsService.remove(params.postId);
  }
}
