import { Injectable } from '@nestjs/common';
import { OpenpayService } from './openpay.service';

@Injectable()
export class UserOpenpayService {
  constructor(private readonly openpayService: OpenpayService) {}

  // Método para crear cliente
  async createCustomer(customerData: any): Promise<any> {
    try {
      const customer = await this.openpayService.makeRequest('POST', '/customers', customerData);
      console.log('Customer created successfully in OpenPay:', customer.id);
      return customer;
    } catch (error) {
      console.error('OpenPay API Error (createCustomer):', error);
      throw error;
    }
  }

  // Método para obtener cliente
  async getCustomer(customerId: string): Promise<any> {
    try {
      const customer = await this.openpayService.makeRequest('GET', `/customers/${customerId}`);
      return customer;
    } catch (error) {
      console.error('OpenPay API Error (getCustomer):', error);
      throw error;
    }
  }

  // Método para actualizar cliente
  async updateCustomer(customerId: string, customerData: any): Promise<any> {
    try {
      const customer = await this.openpayService.makeRequest('PUT', `/customers/${customerId}`, customerData);
      console.log('Customer updated successfully in OpenPay:', customerId);
      return customer;
    } catch (error) {
      console.error('OpenPay API Error (updateCustomer):', error);
      throw error;
    }
  }

  // Método para eliminar cliente de OpenPay
  async deleteCustomer(customerId: string): Promise<any> {
    try {
      const response = await this.openpayService.makeRequest('DELETE', `/customers/${customerId}`);
      console.log('Customer deleted successfully from OpenPay:', customerId);
      return response;
    } catch (error) {
      console.error('OpenPay API Error (deleteCustomer):', error);
      throw error;
    }
  }

  // Método para obtener lista de clientes
  async getCustomers(limit: number = 10, offset: number = 0): Promise<any> {
    try {
      const customers = await this.openpayService.makeRequest('GET', `/customers?limit=${limit}&offset=${offset}`);
      return customers;
    } catch (error) {
      console.error('OpenPay API Error (getCustomers):', error);
      throw error;
    }
  }
}
