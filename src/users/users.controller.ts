import { Controller, Get, HttpCode, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth-guard.guard';
import { UsersService } from './users.service';
import { UserIdParamDto } from './dto/userId.dto';

@Controller('users')
@UseGuards(new AuthGuard())
export class UsersController {

    constructor(private usersService: UsersService) {}   

    @Post('/:userId/follow')
    @HttpCode(200)
    async follow(
        @Param() params: UserIdParamDto,
        @Req() req: Request & {user: {id: string}}
    ) {
        return this.usersService.follow(req.user.id, params.userId)
    }


    @Get('/:userId/followers')
    @HttpCode(200)
    async find_followers(
        @Param() params: UserIdParamDto
    ) {
        return this.usersService.find_followers(params.userId)
    }


    @Get('/:userId/followings')
    @HttpCode(200)
    async find_followings(
        @Param() params: UserIdParamDto
    ) {
        return this.usersService.find_followings(params.userId)
    }
}
