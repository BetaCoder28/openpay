import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class OpenpayService {
  private readonly merchantId: string;
  private readonly privateKey: string;
  private readonly baseUrl: string;

  constructor() {
    const merchantId = process.env.OPENPAY_MERCHANT_ID;
    const privateKey = process.env.OPENPAY_PRIVATE_KEY;
    const uri = process.env.NODE_ENV === 'production'
      ? process.env.OPENPAY_URI
      : process.env.OPENPAY_TEST_URI;
    
    if (!merchantId || !privateKey || !uri) {
      throw new Error('Faltan variables de entorno para OpenPay (MERCHANT_ID, PRIVATE_KEY, URI)');
    }

    this.merchantId = merchantId;
    this.privateKey = privateKey;

    // URL base para sandbox o producción (agregar v1 al final)
    this.baseUrl = `${uri}v1`; 
  }

  getAuthHeaders() {
    const auth = Buffer.from(`${this.privateKey}:`).toString('base64');
    return {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
    };
  }

  async makeRequest(method: string, endpoint: string, data?: any) {
    const url = `${this.baseUrl}/${this.merchantId}${endpoint}`;
    
    const options: RequestInit = {
      method,
      headers: this.getAuthHeaders(),
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      const responseData = await response.json();

      if (!response.ok) {
        console.error('OpenPay API Error:', {
          status: response.status,
          error: responseData,
        });
        throw new HttpException(
          responseData.description || 'Error en la API de OpenPay',
          response.status,
        );
      }

      return responseData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Network Error:', error);
      throw new HttpException(
        'Error de conexión con OpenPay',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  getMerchantId(): string {
    return this.merchantId;
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
