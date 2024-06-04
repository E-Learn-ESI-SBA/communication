import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';


@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post) private postsRepo: Repository<Post>,
    private userService: UsersService
  ) {}

  async create(createPostDto: CreatePostDto, user: User) {


    const res =  await this.postsRepo.insert({
      ...createPostDto,
      user: {
        id: user.id
      }
    });

    return res
  }

  async findAll() {
    return await this.postsRepo.find();
  }

  async findOne(id: string) {
    const res = await this.postsRepo.findOne({
      where: {id}
    });
    if (!res) {
      throw new NotFoundException('Post not found');
    }
    return res;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return await this.postsRepo.update(id, updatePostDto);
  }

  async remove(id: string) {
    return await this.postsRepo.delete(id);
  }
}
