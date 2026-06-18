# Order Service

NestJS API service for the workshop POS demo.

The service receives orders from `pos-app` and calls `inventory-service`
internally to reduce product stock.

## Run Locally

```bash
npm install
cp .env.example .env
npm run build
npm start
```

The service listens on:

```text
http://localhost:3001/order
```

For development:

```bash
npm run dev
```

## Base Paths

The service base path is configured with `ORDER_BASE_PATH`.

```env
ORDER_BASE_PATH=/order
```

Inventory is configured as the full service base URL:

```env
INVENTORY_SERVICE_URL=http://localhost:3002/inventory
```

## Endpoints

```text
GET  /order/health
GET  /order/products
POST /order/products
PUT  /order/products/:id
DELETE /order/products/:id
GET  /order/orders
POST /order/orders
```

## Inventory Service

For local runs:

```bash
INVENTORY_SERVICE_URL=http://localhost:3002/inventory npm start
```

For Docker Compose, use Docker's internal service name:

```text
INVENTORY_SERVICE_URL=http://inventory-service:3002/inventory
```

## Docker

Build from this directory:

```bash
docker build -f deployment/Dockerfile.dev -t order-service:latest .
```

Run:

```bash
docker run --rm -p 3001:3001 \
  -e ORDER_BASE_PATH=/order \
  -e INVENTORY_SERVICE_URL=http://host.docker.internal:3002/inventory \
  order-service:latest
```

## GitHub Actions

The dev workflow builds this Dockerfile:

```text
deployment/Dockerfile.dev
```

with this build context:

```text
.
```
