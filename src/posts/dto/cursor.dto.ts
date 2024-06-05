import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CursorQueryDto {

    @IsNumber()
    @Type(() => Number)
    page?: number;

    @IsNumber()
    @Type(() => Number)
    limit?: number;

    constructor(page: number, limit: number) {
        //set default values 0 and 5
        this.page = page || 0;
        this.limit = limit || 5;
    }

}