import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './users.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor (private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createuserDto: UserDto) {
    return await this.userService.createUser(createuserDto)
  }

  @Get('/:id')
  async getUserById(@Param('id') user_id : number) {
    /* Endpoint to get a user by id */
    return await this.userService.getUserById(user_id);
  }

}
