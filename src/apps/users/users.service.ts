import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { OpenpayService } from 'src/utils/openpay/openpay.service';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private openpayService: OpenpayService,
  ) {}

  async createUser(data: UserDto) {
    try {
      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(data.password, 10);

      // Preparar datos para OpenPay - construir dirección correctamente
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
      const openpayCustomer =
        await this.openpayService.createCustomer(openPayCustomerData);

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
      // Mejorar el manejo de errores
      console.error('Error creating user:', error);

      if (error.description) {
        throw new ForbiddenException(
          `Error creating user in OpenPay: ${error.description}`,
        );
      }

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
