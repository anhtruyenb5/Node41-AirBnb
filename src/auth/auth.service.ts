import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto, SignUpDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private prismaService: PrismaService) { }
    async login(model: LoginDto) {
        const { email, password } = model;

        const checkEmail = await this.prismaService.nguoiDung.findFirst({
            where: {
                email: email,
            },
        });
        if (checkEmail) {
            if (bcrypt.compareSync(password, checkEmail.pass_word)) {
                let userId = { id: checkEmail.id }
                let token = this.jwtService.sign(userId, { expiresIn: "1d", algorithm: "HS256", secret: "BI_MAT" })
                return token;
            }
            else {
                return "mật khẩu không đúng"
            }
        } else {
            return "email không đúng";
        }
    }

    async signUp(model: SignUpDto): Promise<string> {
        const { fullName, email, password } = model;
        const checkEmail = await this.prismaService.nguoiDung.findFirst({
            where: {
                email: email,
            },
        });

        if (checkEmail) {
            return 'Email đã tồn tại';
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = {
            name: fullName,
            email: email,
            pass_word: hashedPassword,
            phone: '',
            birth_day: '',
            gender: '',
            role: 'USER',
        };

        await this.prismaService.nguoiDung.create({
            data: newUser,
        });

        return 'Đăng ký thành công';
    }
}
