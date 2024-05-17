import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ValidateToken } from 'lib/jwt';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {
 async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {
    
  const request = context.switchToHttp().getRequest();
  try {
      let token = request.headers.authorization;
      if (!token || !token.startsWith("Bearer ")) {
        throw new Error("Auth Header Not Found");
      }
      token = token.replace("Bearer ", "");
      if (!token || token.length === 0) {
        throw new Error("no token provided");
      }
      const user = await ValidateToken(token, process.env.JWT_SECRET as string | "weak");
      if (user instanceof Error) {
        throw user;
      }
      request.user = user;
      return true
  } catch (e) {
      const message = e instanceof Error ? e.message : "Unauthorized";
      throw new Error(message);
  }
}

}
