import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'FLsHAy5eMDnvU4mMKvqkD9ybvxNf2wxn9wP',
    }),
    UserModule,
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [],
  exports: [],
})
export class AuthModule {}
