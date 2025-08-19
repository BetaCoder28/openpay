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

  async createPlan(planData: PlanDto) {
    try {
      // Crear plan en OpenPay con formato correcto (todos los campos numéricos como strings)
      const openpayPlan = await this.openpayService.createPlan({
        name: planData.name,
        amount: planData.amount,
        repeat_every: planData.durationDays, 
        repeat_unit: 'month',
        trial_days: planData.trialDays.toString(),
        retry_times: planData.retryTimes,
        status_after_retry: planData.statusAfterRetry
      });
  
      // Guardar en BD con ID de OpenPay
      return this.prismaService.paymentPlans.create({
        data: {
          ...planData,
          openpayId: openpayPlan.id,
        },
      });
    } catch (error) {
      console.error('Error creating plan:', {
        request: planData,
        error: error.description || error.message
      });
      throw new Error('Failed to create plan: ' + error.description);
    }
  }

  async getPlans() {
    const plans = await this.prismaService.paymentPlans.findMany();

    return plans;
  }

  // Subscription services
  async createSubscription(subscriptionData: CreateSubscriptionDto) {
    const user = await this.prismaService.user.findUnique({
      where: { id: subscriptionData.userId },
      include: { subscriptions: true },
    });

    const plan = await this.prismaService.paymentPlans.findUnique({
      where: { id: subscriptionData.planId },
    });

    if (!user || !plan) {
      throw new ForbiddenException('Usuario o plan no encontrado');
    }

    // Crear cliente en OpenPay si no existe
    let customerId = user.openpayId;
    if (!customerId) {
      const customer = await this.openpayService.createCustomer({
        name: user.name,
        email: user.email,
        requires_account: false,
      });
      customerId = customer.id;

      // Actualizar usuario con ID de OpenPay
      await this.prismaService.user.update({
        where: { id: user.id },
        data: { openpayId: customerId },
      });
    }

    // Crear suscripción en OpenPay
    const openpaySubscription = await this.openpayService.createSubscription({
      plan_id: plan.openpayId,
      customer_id: customerId,
      card: {
        token_id: subscriptionData.cardToken // Formato de objeto con token_id
      },
      device_session_id: subscriptionData.deviceSessionId
    });

    // Guardar suscripción en BD
    return this.prismaService.subscription.create({
      data: {
        userId: user.id,
        planId: plan.id,
        openpayId: openpaySubscription.id,
        status: openpaySubscription.status,
      },
    });
  }
}
