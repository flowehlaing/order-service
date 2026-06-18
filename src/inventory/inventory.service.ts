import { Injectable } from "@nestjs/common";
import { joinUrl } from "../config/paths";
import { ProductInput } from "./inventory.types";

const INVENTORY_SERVICE_URL = process.env.INVENTORY_SERVICE_URL || "http://localhost:3002/inventory";

@Injectable()
export class InventoryService {
  getProducts() {
    return this.forward("/products");
  }

  createProduct(data: ProductInput) {
    return this.forward("/products", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  updateProduct(id: string, data: Partial<ProductInput>) {
    return this.forward(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteProduct(id: string) {
    await this.forward(`/products/${id}`, { method: "DELETE" });
    return { message: "Deleted" };
  }

  private async forward(path: string, init: RequestInit = {}) {
    let response: Response;

    try {
      response = await fetch(joinUrl(INVENTORY_SERVICE_URL, path), {
        ...init,
        headers: {
          "Content-Type": "application/json",
          ...(init.headers || {}),
        },
      });
    } catch {
      return { error: "inventory-service unreachable" };
    }

    const body = await this.readResponseJson(response);

    if (!response.ok) {
      return {
        error: body.error || "Inventory request failed",
      };
    }

    return body;
  }

  private async readResponseJson(response: Response): Promise<any> {
    try {
      return await response.json();
    } catch {
      return {};
    }
  }
}
