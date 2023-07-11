import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
    return this.prisma.user.create({ data });
  }

  async list() {
    return this.prisma.user.findMany();
  }

  async show(id: number) {
    await this.exists(id);
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(
    id: number,
    { name, email, password, birthday, role }: UpdatePutUserDto,
  ) {
    await this.exists(id);
    password = await bcrypt.hash(password, await bcrypt.genSalt());
    return this.prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password,
        birthday: birthday ? new Date(birthday) : null,
        role,
      },
    });
  }

  async updatePartial(
    id: number,
    { name, email, password, birthday, role }: UpdatePatchUserDto,
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
      data.password = await bcrypt.hash(password, await bcrypt.genSalt());
    }
    if (role) {
      data.role = role;
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
