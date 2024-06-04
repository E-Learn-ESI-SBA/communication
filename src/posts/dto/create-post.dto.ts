import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    text: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    header: string;

    @ApiProperty()
    @IsString({ each: true })
    images?: string[];

}
