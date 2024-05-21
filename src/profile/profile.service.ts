import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profilesRepo: Repository<Profile>,
    private usersService: UsersService,
  ) {}

  async create(createProfileDto: CreateProfileDto, userId: string): Promise<Profile> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const profile = this.profilesRepo.create({
      ...createProfileDto,
      user,
    });
    return this.profilesRepo.save(profile);
  }

  async findAll(): Promise<Profile[]> {
    return this.profilesRepo.find({ relations: ['experiences', 'projects', 'awards', 'skills', 'otherSkills', 'education'] });
  }

  async findOne(id: string): Promise<Profile> {
    const profile = await this.profilesRepo.findOne({ where: { id }, relations: ['experiences', 'projects', 'awards', 'skills', 'otherSkills', 'education'] });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }

  async update(id: string, updateProfileDto: UpdateProfileDto): Promise<Profile> {
    await this.profilesRepo.update(id, updateProfileDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.profilesRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Profile not found');
    }
  }
}
