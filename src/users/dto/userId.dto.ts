import { IsNotEmpty, IsUUID } from "class-validator";

export class UserIdParamDto {

    @IsNotEmpty()
    @IsUUID()
    userId: string;

}