import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateEmployeeDto {
    @ApiProperty({
        example: 'John'
    })
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({
        example: 'Keynes'
    })
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @ApiProperty({
        example: '29'
    })
    @IsString()
    @IsNotEmpty()
    age: string;
}
