import { Body, Controller, Delete, Get, Param, Post, Put, Res } from "@nestjs/common";
import { InventoryService } from "./inventory.service";
import { ProductInput } from "./inventory.types";

@Controller("products")
export class ProductsController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  async getProducts(@Res() res: any) {
    const result = await this.inventoryService.getProducts();
    return this.sendResult(res, result, 200);
  }

  @Post()
  async createProduct(@Body() body: ProductInput, @Res() res: any) {
    const result = await this.inventoryService.createProduct(body);
    return this.sendResult(res, result, 201);
  }

  @Put(":id")
  async updateProduct(@Param("id") id: string, @Body() body: Partial<ProductInput>, @Res() res: any) {
    const result = await this.inventoryService.updateProduct(id, body);
    return this.sendResult(res, result, 200);
  }

  @Delete(":id")
  async deleteProduct(@Param("id") id: string, @Res() res: any) {
    const result = await this.inventoryService.deleteProduct(id);
    return this.sendResult(res, result, 200);
  }

  private sendResult(res: any, result: any, successStatus: number) {
    if (result?.error) {
      return res.status(400).json(result);
    }

    return res.status(successStatus).json(result);
  }
}
