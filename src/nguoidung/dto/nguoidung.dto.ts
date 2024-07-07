import { ApiProperty } from "@nestjs/swagger";

export class UserInfoDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    fullName: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    birthDay: string;

    @ApiProperty()
    gender: string;

    @ApiProperty()
    role: string;

    @ApiProperty()
    avatar: string;
}