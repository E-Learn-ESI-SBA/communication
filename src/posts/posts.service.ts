import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { Save } from './entities/save.entity';


@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post) private postsRepo: Repository<Post>,
    @InjectRepository(Save) private savesRepo: Repository<Save>,
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

  async findAll(page: number = 0, limit: number = 5) {
    return await this.postsRepo.find({
      relations: ['votes', 'votes.user', 'user'],
      take: limit,
      skip: page * limit,
    })
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


  async savePost(postId: string, userId: string) {
    const post = await this.postsRepo.findOne({
      where: {id: postId}
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const save = await this.savesRepo.findOne({
      where: {
        user: {id: userId},
        post: {id: postId}
      }
    });

    if (!save) {
      await this.savesRepo.insert({
        user: {
          id: userId
        },
        post: {
          id: postId
        }
      })

      return {
        message: "Post saved successfully"
      }
    } 

    await this.savesRepo.delete(save);

    return {
      message: "Post unsaved successfully"
    }
  }



  async getSavedPosts(userId: string) {
    return await this.savesRepo.find({
      where: {
        user: {id: userId}
      },
      relations: ['post']
    });
  }

}


