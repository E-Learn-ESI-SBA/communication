import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class PostIdParamDto {

    @IsNotEmpty()
    @IsUUID()
    postId: string;

}