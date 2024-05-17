import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { types } from 'cassandra-driver';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // convvert id to types.Uuid
    const ID = types.Uuid.fromString(id);
    return this.postsService.findOne(ID);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const ID = types.Uuid.fromString(id);
    return this.postsService.update(ID, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const ID = types.Uuid.fromString(id);
    return this.postsService.remove(ID);
  }
}
