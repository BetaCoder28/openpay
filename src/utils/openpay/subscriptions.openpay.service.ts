import { Injectable } from '@nestjs/common';
import { OpenpayService } from './openpay.service';

@Injectable()
export class SubscriptionsOpenpayService {
  constructor(private readonly openpayService: OpenpayService) {}

  // Método para crear suscripción
  async createSubscription(subscriptionData: any): Promise<any> {
    const subscriptionPayload = {
      plan_id: subscriptionData.plan_id,
      card: subscriptionData.card, // Objeto con token_id
      device_session_id: subscriptionData.device_session_id,
    };

    try {
      const subscription = await this.openpayService.makeRequest(
        'POST', 
        `/customers/${subscriptionData.customer_id}/subscriptions`, 
        subscriptionPayload
      );
      console.log('Subscription created successfully in OpenPay:', subscription.id);
      return subscription;
    } catch (error) {
      console.error('OpenPay API Error (createSubscription):', error);
      throw error;
    }
  }

  // Método para obtener suscripción
  async getSubscription(customerId: string, subscriptionId: string): Promise<any> {
    try {
      const subscription = await this.openpayService.makeRequest(
        'GET', 
        `/customers/${customerId}/subscriptions/${subscriptionId}`
      );
      return subscription;
    } catch (error) {
      console.error('OpenPay API Error (getSubscription):', error);
      throw error;
    }
  }

  // Método para actualizar suscripción
  async updateSubscription(customerId: string, subscriptionId: string, subscriptionData: any): Promise<any> {
    const updatePayload: any = {};
    
    if (subscriptionData.trial_end_date) updatePayload.trial_end_date = subscriptionData.trial_end_date;
    if (subscriptionData.card) updatePayload.card = subscriptionData.card;

    try {
      const subscription = await this.openpayService.makeRequest(
        'PUT', 
        `/customers/${customerId}/subscriptions/${subscriptionId}`, 
        updatePayload
      );
      console.log('Subscription updated successfully in OpenPay:', subscriptionId);
      return subscription;
    } catch (error) {
      console.error('OpenPay API Error (updateSubscription):', error);
      throw error;
    }
  }

  // Método para cancelar suscripción
  async cancelSubscription(customerId: string, subscriptionId: string): Promise<any> {
    try {
      const subscription = await this.openpayService.makeRequest(
        'DELETE', 
        `/customers/${customerId}/subscriptions/${subscriptionId}`
      );
      console.log('Subscription cancelled successfully in OpenPay:', subscriptionId);
      return subscription;
    } catch (error) {
      console.error('OpenPay API Error (cancelSubscription):', error);
      throw error;
    }
  }

  // Método para obtener lista de suscripciones de un cliente
  async getCustomerSubscriptions(customerId: string, limit: number = 10, offset: number = 0): Promise<any> {
    try {
      const subscriptions = await this.openpayService.makeRequest(
        'GET', 
        `/customers/${customerId}/subscriptions?limit=${limit}&offset=${offset}`
      );
      return subscriptions;
    } catch (error) {
      console.error('OpenPay API Error (getCustomerSubscriptions):', error);
      throw error;
    }
  }

  // Método para obtener todas las suscripciones del merchant
  async getAllSubscriptions(limit: number = 10, offset: number = 0): Promise<any> {
    try {
      const subscriptions = await this.openpayService.makeRequest(
        'GET', 
        `/subscriptions?limit=${limit}&offset=${offset}`
      );
      return subscriptions;
    } catch (error) {
      console.error('OpenPay API Error (getAllSubscriptions):', error);
      throw error;
    }
  }
}
