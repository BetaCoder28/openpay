import { Module } from '@nestjs/common';
import { OpenpayService } from './openpay.service';

@Module({
  providers: [OpenpayService],
  // Exportar para inyección en otros modulos
  exports: [OpenpayService]
})
export class OpenpayModule {}
