import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }

  async list() {
    return this.prisma.user.findMany();
  }

  async show(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(
    id: number,
    { name, email, password, birthday }: UpdatePutUserDto,
  ) {
    await this.exists(id);
    return this.prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password,
        birthday: birthday ? new Date(birthday) : null,
      },
    });
  }

  async updatePartial(
    id: number,
    { name, email, password, birthday }: UpdatePatchUserDto,
  ) {
    await this.exists(id);
    const data: any = {};
    if (birthday) {
      data.birthDate = new Date(birthday);
    }
    if (name) {
      data.name = name;
    }
    if (email) {
      data.email = email;
    }
    if (password) {
      data.password = password;
    }
    return this.prisma.user.update({ where: { id }, data });
  }

  async delete(id: number) {
    await this.exists(id);
    return this.prisma.user.delete({ where: { id } });
  }

  async exists(id: number) {
    if ((await this.prisma.user.count({ where: { id } })) === 0) {
      throw new NotFoundException('O usuário não existe');
    }
  }
}
