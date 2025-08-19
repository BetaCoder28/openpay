import { ForbiddenException, Injectable } from '@nestjs/common';
import { PlanDto } from './dto/plans.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { OpenpayService } from 'src/utils/openpay/openpay.service';
import { CreateSubscriptionDto } from 'src/utils/openpay/dto/create-subscription.dto';

@Injectable()
export class PlansService {
  constructor(
    private prismaService: PrismaService,
    private openpayService: OpenpayService,
  ) {}

  async createPlan(newPlanData: PlanDto) {
    try {
      const openpayPlan = await this.openpayService.createPlan(newPlanData);
      return this.prismaService.plans.create({
        data: {
          name: newPlanData.name,
          amount: newPlanData.amount,
          currency: newPlanData.currency,
          repeat_every: newPlanData.repeat_every,
          repeat_unit: newPlanData.repeat_unit,
          retry_times: newPlanData.retry_times,
          status: 'active', // Valor por defecto
          status_after_retry: newPlanData.status_after_retry,
          trial_days: newPlanData.trial_days,
          openpayId: openpayPlan.id, // Guardar ID de OpenPay
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getAllPlans(){
    try{
      return this.prismaService.plans.findMany()
    }catch(error){
      console.error(error)
    }
  }

}
