import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jWTService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async createToken(payload: any) {
    // return await this.jWTService.signAsync(payload);
  }

  async checkToken(token: string) {
    // return await this.jWTService.verifyAsync(token);
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        password: password,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async forget(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // To do: send email with reset token

    return true;
  }

  async reset(password: string, token: string) {
    // To do: check token
    // To do: update password
    const id = 0;
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
    return true;
  }
}
