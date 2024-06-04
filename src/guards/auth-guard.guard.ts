import { CanActivate, ExecutionContext, Inject, Injectable, Type, UnauthorizedException, mixin } from '@nestjs/common';
import { ValidateToken } from '../lib/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';



export const AuthGuard = (): Type<CanActivate> => {
  class ScopeGuard {
    constructor(
      @Inject(UsersService) private readonly userService: UsersService
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
          const userToUpsert = new User()
          userToUpsert.id = user.id
          userToUpsert.avatar = user.avatar
          userToUpsert.username = user.username
          await this.userService.upsert(userToUpsert)
          return true
      } catch (e) {
          const message = e instanceof Error ? e.message : "Unauthorized";
          throw new UnauthorizedException(message);
      }

    }

  
  }
  return mixin(ScopeGuard)
}

// @Injectable()
// export class AuthGuard implements CanActivate {

//   constructor(
//     private readonly userService: UsersService
//   ) {}

// }

// }


// @Global()
// @Module({
//     providers: [UsersService],
//     imports: [UsersModule],
//     exports: [AuthGuard]
// })
// export class ApiModule {}