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
        if (error) reject(error);
        else resolve(customer);
      });
    });
  }

  // Método para crear plan
  async createPlan(planData: PlanDto): Promise<any> {
    console.log('Sending to OpenPay:', JSON.stringify(planData));
    return new Promise((resolve, reject) => {
      this.openpay.plans.create(planData, (error, plan) => {
        if (error) {
          console.error('OpenPay API Error:', {
            code: error.http_code,
            error: error.description,
            details: {
              request: planData,
              response: error,
            },
          });
          reject(error);
        } else {
          resolve(plan);
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
          device_session_id: subscriptionData.device_session_id
        },
        (error, subscription) => {
          if (error) reject(error);
          else resolve(subscription);
        }
      );
    });
  }
  
}
