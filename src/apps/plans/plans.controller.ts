import { Body, Controller, Get, Post } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlanDto } from './dto/plans.dto';

@Controller('plans')
export class PlansController {
  constructor(private readonly planService: PlansService) {}

  @Post()
  async createPlan(@Body() cretePlanDto: PlanDto) {
    return await this.planService.createPlan(cretePlanDto);
  }

  @Get()
  async getPlans() {
    return await this.planService.getPlans();
  }
}
