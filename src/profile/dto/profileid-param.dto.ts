import { IsNotEmpty,IsUUID } from "class-validator";

export class ProfileIdParamDto {

    @IsNotEmpty()
    @IsUUID()
    profileId: string;

}