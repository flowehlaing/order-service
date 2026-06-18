import { Module } from "@nestjs/common";
import { HealthController } from "./health.controller";
import { InventoryService } from "./inventory/inventory.service";
import { ProductsController } from "./inventory/products.controller";
import { OrdersController } from "./orders/orders.controller";
import { OrdersService } from "./orders/orders.service";

@Module({
  controllers: [HealthController, OrdersController, ProductsController],
  providers: [OrdersService, InventoryService],
})
export class AppModule {}
