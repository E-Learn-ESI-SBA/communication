import { BadRequestException, CanActivate, ExecutionContext, Inject,NotFoundException, Type, UnauthorizedException, mixin } from '@nestjs/common';
import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm';
import { validate } from 'class-validator';
import { ProfileIdParamDto } from '../profile/dto/profileid-param.dto' 

export const ProfileOwnerGuard = (entityClass: EntityTarget<ObjectLiteral>): Type<CanActivate> => {
  class ScopeGuard{
    constructor(
      @Inject(DataSource) private readonly dataSource: DataSource
    ) {}

    async canActivate(
      context: ExecutionContext,
    ): Promise<boolean> {
      const request = context.switchToHttp().getRequest();

      const params: ProfileIdParamDto = request.params;
      validate(params).then(errors => {
        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }
    });

      const profile = await this.dataSource.getRepository(entityClass).findOne({
        where: { id: params.profileId },
        relations: ['user'],
      });

      if (!profile) {
        throw new NotFoundException('Profile not found');
      }

      if (profile.user.id !== request.user.id && request.user.role !== 'admin') {
        throw new UnauthorizedException('Unauthorized');
      }

      request.profile = profile;
      return true;
    }
  }
  return mixin(ScopeGuard);
}
