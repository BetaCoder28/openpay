import { ForbiddenException, Injectable } from '@nestjs/common';
import { PlanDto } from './dto/plans.dto';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { PlansOpenpayService } from 'src/utils/openpay/plans.openpay.service';


@Injectable()
export class PlansService {
  constructor(
    private prismaService: PrismaService,
    private plansOpenpayService: PlansOpenpayService,
  ) {}

  async createPlan(newPlanData: PlanDto) {
    try {
      const openpayPlan = await this.plansOpenpayService.createPlan(newPlanData);
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
