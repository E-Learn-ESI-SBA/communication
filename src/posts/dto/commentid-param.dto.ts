import { IsNotEmpty, IsUUID } from "class-validator";

export class CommentIdParamDto {

    @IsNotEmpty()
    @IsUUID()
    postId: string;

    @IsNotEmpty()
    @IsUUID()
    commentId: string;

}