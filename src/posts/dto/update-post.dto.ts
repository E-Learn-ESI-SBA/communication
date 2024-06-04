import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
    
    @ApiProperty()
    @IsString()    
    text: string;

    @ApiProperty()
    @IsString()
    header: string;

}
