import { Module } from '@nestjs/common';
import { OpenpayService } from './openpay.service';
import { UserOpenpayService } from './user.openpay.service';
import { PlansOpenpayService } from './plans.openpay.service';
import { SubscriptionsOpenpayService } from './subscriptions.openpay.service';

@Module({
  providers: [
    OpenpayService,
    UserOpenpayService,
    PlansOpenpayService,
    SubscriptionsOpenpayService,
  ],
  // Exportar para inyección en otros modulos
  exports: [
    OpenpayService,
    UserOpenpayService,
    PlansOpenpayService,
    SubscriptionsOpenpayService,
  ]
})
export class OpenpayModule {}
