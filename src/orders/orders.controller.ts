import { Body, Controller, Get, HttpCode, Options, Post, Res } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderRequest } from "./orders.types";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Options()
  @HttpCode(200)
  options() {
    return {};
  }

  @Get()
  getOrders() {
    return this.ordersService.getOrders();
  }

  @Post()
  async createOrder(@Body() body: CreateOrderRequest, @Res() res: any) {
    const result = await this.ordersService.createOrder(body.items);

    if (result.error) {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);
  }
}
