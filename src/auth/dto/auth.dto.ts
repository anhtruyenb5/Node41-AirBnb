import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
    @ApiProperty()
    fullName: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}

export class LoginDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}