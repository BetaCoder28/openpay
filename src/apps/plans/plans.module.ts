import { Module } from '@nestjs/common';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { OpenpayModule } from 'src/utils/openpay/openpay.module';

@Module({
  imports: [PrismaModule, OpenpayModule],
  controllers: [PlansController],
  providers: [PlansService]
})
export class PlansModule {}
