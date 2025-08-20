import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UserOpenpayService } from 'src/utils/openpay/user.openpay.service';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private userOpenpayService: UserOpenpayService,
  ) {}

  async createUser(data: UserDto) {
    let openpayCustomer: any = null;
    
    try {
      // Verificar si el email ya existe antes de crear en OpenPay
      const existingUser = await this.prismaService.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        throw new ForbiddenException(`El email ${data.email} ya está registrado`);
      }

      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(data.password, 10);

      // Preparar datos para OpenPay construir dirección
      const addressLine1 = [data.street, data.exteriorNumber]
        .filter(Boolean)
        .join(' ')
        .trim();

      const openPayCustomerData = {
        name: data.name,
        last_name: data.lastName || '',
        email: data.email,
        phone_number: data.phoneNumber || '',
        requires_account: false,
        address: {
          line1: addressLine1 || '',
          line2: data.interiorNumber || '',
          line3: data.neighborhood || '',
          postal_code: data.postalCode || '',
          city: data.city || '',
          state: data.state || '',
          country_code: data.country || 'MX',
        },
      };

      // Crear cliente en OpenPay
      openpayCustomer = await this.userOpenpayService.createCustomer(openPayCustomerData);

      // Crear usuario en la base de datos con el openpayId
      const user = await this.prismaService.user.create({
        data: {
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          password: hashedPassword,
          phoneNumber: data.phoneNumber,
          street: data.street,
          exteriorNumber: data.exteriorNumber,
          interiorNumber: data.interiorNumber,
          neighborhood: data.neighborhood,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          country: data.country,
          openpayId: openpayCustomer.id,
        },
      });

      // Eliminar la contraseña del objeto de respuesta
      const { password, ...result } = user;
      return {
        message: 'User Created Successfully',
        user: result,
      };
    } catch (error) {
      console.error('Error creating user:', error);

      // Si se creó el cliente en OpenPay pero falló la BD, eliminarlo
      if (openpayCustomer && openpayCustomer.id) {
        try {
          await this.userOpenpayService.deleteCustomer(openpayCustomer.id);
          console.log('Rollback: Customer deleted from OpenPay due to database error');
        } catch (rollbackError) {
          console.error('Error during rollback - could not delete OpenPay customer:', rollbackError);
        }
      }

      // Manejo específico de errores de Prisma
      if (error.code === 'P2002') {
        throw new ForbiddenException(`El email ${data.email} ya está registrado`);
      }

      // Errores de OpenPay
      if (error.description) {
        throw new ForbiddenException(
          `Error creating user in OpenPay: ${error.description}`,
        );
      }

      // Error genérico
      throw new ForbiddenException('Error creating user: ' + error.message);
    }
  }

  async getUserById(user_id: number) {
    try {
      const foundUser = await this.prismaService.user.findFirst({
        where: { id: user_id },
        select: {
          id: true,
          email: true,
          name: true,
          lastName: true,
          phoneNumber: true,
          openpayId: true,
          street: true,
          exteriorNumber: true,
          interiorNumber: true,
          neighborhood: true,
          city: true,
          state: true,
          postalCode: true,
          country: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!foundUser) {
        return { message: 'User not found' };
      }

      return foundUser;
    } catch (error) {
      console.error('Error getting user:', error);
      throw new ForbiddenException('Error retrieving user');
    }
  }
}
