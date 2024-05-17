import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepo } from './post.repository';
import { Post } from './entities/post.entity';
import { v4 as uuidv4 } from 'uuid';
import { types } from 'cassandra-driver';

@Injectable()
export class PostsService {

  constructor(private postRepo: PostRepo){}

  create(createPostDto: CreatePostDto) {
    const newPost = new Post();
    newPost.text = createPostDto.text;
    newPost.user_id = '1';
    newPost.createdat = new Date();
    newPost.updatedat = newPost.createdat;
    newPost.id = uuidv4();
    return this.postRepo.createPost(newPost);
  }

  async findAll() {
    return await this.postRepo.getPosts();
  }

  async findOne(id: types.Uuid) {
    return await this.postRepo.getPostById(id);
  }

  update(id: types.Uuid, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: types.Uuid) {
    return `This action removes a #${id} post`;
  }
}
