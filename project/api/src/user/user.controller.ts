import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Patch,
  Delete,
} from '@nestjs/common';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() body) {
    return { body };
  }

  @Get()
  async list() {
    return { users: [] };
  }

  @Get(':id')
  async show(@Param() params) {
    return { users: {}, params };
  }

  @Put(':id')
  async update(@Param() params, @Body() body) {
    return { users: {}, params, body };
  }

  @Patch(':id')
  async updatePartial(@Param() params, @Body() body) {
    return { users: {}, params, body };
  }

  @Delete(':id')
  async destroy(@Param() params) {
    return { users: {}, params };
  }
}
