import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { OpenpayModule } from 'src/utils/openpay/openpay.module';

@Module({
  imports: [PrismaModule, OpenpayModule],
  controllers: [UserController],
  providers: [UserService]
})
export class RegisterModule {}
