import { Injectable } from '@nestjs/common';
import * as OpenPay from 'openpay';
import * as dotenv from 'dotenv';
import { PlanDto } from 'src/apps/plans/dto/plans.dto';

dotenv.config();

@Injectable()
export class OpenpayService {
  private openpay: any;

  constructor() {
    const merchantId = process.env.OPENPAY_MERCHANT_ID;
    const privateKey = process.env.OPENPAY_PRIVATE_KEY;

    if (!merchantId || !privateKey) {
      throw new Error('Faltan variables de entorno para OpenPay');
    }

    this.openpay = new OpenPay(
      merchantId,
      privateKey,
      process.env.NODE_ENV === 'production',
    );
  }

  // Método para crear cliente
  async createCustomer(customerData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.openpay.customers.create(customerData, (error, customer) => {
        if (error) {
          console.error('OpenPay API Error (createCustomer):', {
            code: error.http_code,
            error: error.description,
            details: error,
          });
          reject(error);
        } else {
          console.log('Customer created successfully in OpenPay:', customer.id);
          resolve(customer);
        }
      });
    });
  }

  async getCustomer(customerId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.openpay.customers.get(customerId, (error, customer) => {
        if (error) {
          console.error('OpenPay API Error (getCustomer):', error);
          reject(error);
        } else {
          resolve(customer);
        }
      });
    });
  }

  // Método para crear plan
  async createPlan(planData: PlanDto): Promise<any> {
    const openPayPlanData = {
      name: planData.name,
      amount: planData.amount,
      currency: planData.currency,
      repeat_every: planData.repeat_every,
      repeat_unit: planData.repeat_unit,
      retry_times: planData.retry_times,
      status_after_retry: planData.status_after_retry.toLowerCase(), // Añadir este campo (OpenPay espera valores en minúsculas)
      trial_days: planData.trial_days,
    };

    return new Promise((resolve, reject) => {
      this.openpay.plans.create(openPayPlanData, (error, plan) => {
        if (error) reject(error);
        else resolve(plan);
      });
    });
  }

  // Método para eliminar cliente de OpenPay
  async deleteCustomer(customerId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.openpay.customers.delete(customerId, (error, response) => {
        if (error) {
          console.error('OpenPay API Error (deleteCustomer):', error);
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  // Método para crear suscripción
  async createSubscription(subscriptionData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.openpay.customers.subscriptions.create(
        subscriptionData.customer_id,
        {
          plan_id: subscriptionData.plan_id,
          card: subscriptionData.card, // Objeto con token_id
          device_session_id: subscriptionData.device_session_id,
        },
        (error, subscription) => {
          if (error) reject(error);
          else resolve(subscription);
        },
      );
    });
  }
}
