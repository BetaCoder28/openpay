import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor (private readonly loginService: LoginService) {}

  @Post()
  async verifyLogin(@Body() loginDto: LoginDto) {
    /* 
    "Endpoint to login "
    {
      "email" : "david@david.com",
      "password" : "david123"
    }
    */
    return await this.loginService.verifyLogin(loginDto);
  }
}
