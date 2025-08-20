import { Injectable } from '@nestjs/common';
import { OpenpayService } from './openpay.service';
import { PlanDto } from 'src/apps/plans/dto/plans.dto';

@Injectable()
export class PlansOpenpayService {
  constructor(private readonly openpayService: OpenpayService) {}

  // Método para crear plan
  async createPlan(planData: PlanDto): Promise<any> {
    const openPayPlanData = {
      name: planData.name,
      amount: planData.amount,
      currency: planData.currency,
      repeat_every: planData.repeat_every,
      repeat_unit: planData.repeat_unit,
      retry_times: planData.retry_times,
      status_after_retry: planData.status_after_retry.toLowerCase(), // OpenPay espera valores en minúsculas
      trial_days: planData.trial_days,
    };

    try {
      const plan = await this.openpayService.makeRequest('POST', '/plans', openPayPlanData);
      console.log('Plan created successfully in OpenPay:', plan.id);
      return plan;
    } catch (error) {
      console.error('OpenPay API Error (createPlan):', error);
      throw error;
    }
  }

  // Método para obtener plan
  async getPlan(planId: string): Promise<any> {
    try {
      const plan = await this.openpayService.makeRequest('GET', `/plans/${planId}`);
      return plan;
    } catch (error) {
      console.error('OpenPay API Error (getPlan):', error);
      throw error;
    }
  }

  // Método para actualizar plan
  async updatePlan(planId: string, planData: Partial<PlanDto>): Promise<any> {
    const openPayPlanData: any = {};
    
    if (planData.name) openPayPlanData.name = planData.name;
    if (planData.trial_days !== undefined) openPayPlanData.trial_days = planData.trial_days;

    try {
      const plan = await this.openpayService.makeRequest('PUT', `/plans/${planId}`, openPayPlanData);
      console.log('Plan updated successfully in OpenPay:', planId);
      return plan;
    } catch (error) {
      console.error('OpenPay API Error (updatePlan):', error);
      throw error;
    }
  }

  // Método para eliminar plan
  async deletePlan(planId: string): Promise<any> {
    try {
      const response = await this.openpayService.makeRequest('DELETE', `/plans/${planId}`);
      console.log('Plan deleted successfully from OpenPay:', planId);
      return response;
    } catch (error) {
      console.error('OpenPay API Error (deletePlan):', error);
      throw error;
    }
  }

  // Método para obtener lista de planes
  async getPlans(limit: number = 10, offset: number = 0): Promise<any> {
    try {
      const plans = await this.openpayService.makeRequest('GET', `/plans?limit=${limit}&offset=${offset}`);
      return plans;
    } catch (error) {
      console.error('OpenPay API Error (getPlans):', error);
      throw error;
    }
  }
}
