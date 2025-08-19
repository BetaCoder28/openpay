import { Module } from '@nestjs/common';
import { LoginModule } from './apps/login/login.module';
import { RegisterModule } from './apps/users/users.module';
import { AuthModule } from './middlewares/auth/auth.module';
import { FormModule } from './apps/form/form.module';
import { OpenpayModule } from './utils/openpay/openpay.module';
import { PlansModule } from './apps/plans/plans.module';

@Module({
  imports: [LoginModule, RegisterModule, AuthModule, FormModule, OpenpayModule, PlansModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
