import { CanActivate, ExecutionContext, Inject, Injectable, Type, UnauthorizedException, mixin } from '@nestjs/common';
import { ValidateToken } from '../lib/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { DataSource } from 'typeorm';
import { Profile } from '../profile/entities/profile.entity';



export const AuthGuard = (): Type<CanActivate> => {
  class ScopeGuard {
    constructor(
      @Inject(UsersService) private readonly userService: UsersService,
      @Inject(DataSource) private readonly dataSource: DataSource
    ) {}

    async canActivate(
      context: ExecutionContext,
    ): Promise<boolean> {
    
      const request = context.switchToHttp().getRequest();
      try {
          let token = request.headers.authorization;
          if (!token || !token.startsWith("Bearer ")) {
            throw new UnauthorizedException("no token provided");
          }
          token = token.replace("Bearer ", "");
          if (!token || token.length === 0) {
            throw new UnauthorizedException("no token provided");
          }
          const user = await ValidateToken(token, process.env.JWT_SECRET as string | "weak");
          if (user instanceof Error) {
            throw user;
          }
          request.user = user;
          // upserting the user and profile
          const userToUpsert = new User()
          userToUpsert.id = user.id
          userToUpsert.avatar = user.avatar
          userToUpsert.username = user.username
          await this.userService.upsert(userToUpsert)
          await this.dataSource.getRepository(Profile).upsert({
            user: {
              id: user.id
            },
            image: user.avatar,
            summary: '',
          }, {
            conflictPaths: ['user.id'],
            skipUpdateIfNoValuesChanged: true,
            upsertType: 'on-duplicate-key-update'
          })
          // end
          return true
      } catch (e) {
          const message = e instanceof Error ? e.message : "Unauthorized";
          throw new UnauthorizedException(message);
      }

    }

  
  }
  return mixin(ScopeGuard)
}