import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { ApiParam } from '@nestjs/swagger'

export class PostIdParamDto {

    @IsNotEmpty()
    @IsUUID()
    postId: string;

}