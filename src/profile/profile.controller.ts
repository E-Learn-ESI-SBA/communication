import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from  './dto/update-profile.dto';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { ProfileIdParamDto } from './dto/profileid-param.dto';
import { Profile as ProfileEntity } from './entities/profile.entity';
import { ProfileOwnerGuard } from 'src/guards/profile-owner.guard';
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @HttpCode(201)
  @ApiBody({ type: CreateProfileDto })
  create(@Body() createProfileDto: CreateProfileDto, @Req() req:( Request & { user: { id: string } })) {
    return this.profileService.create(createProfileDto, req.user.id);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':profileId')
  @HttpCode(200)
  @ApiParam({ name: 'profileId', required: true, type: 'uuid' })
  findOne(@Param() params: ProfileIdParamDto) {
    return this.profileService.findOne(params.profileId);
  }

  @Patch(':profileId')
  @UseGuards(ProfileOwnerGuard(ProfileEntity))
  @HttpCode(200)
  @ApiParam({ name: 'profileId', required: true, type: 'uuid' })
  update(@Param() params: ProfileIdParamDto, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(params.profileId, updateProfileDto);
  }

  @Delete(':profileId')
  @UseGuards(ProfileOwnerGuard(ProfileEntity))
  @HttpCode(200)
  @ApiParam({ name: 'profileId', required: true, type: 'uuid' })
  remove(@Param() params: ProfileIdParamDto) {
    return this.profileService.remove(params.profileId);
  }
}
