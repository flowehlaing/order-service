import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { normalizeBasePath, toGlobalPrefix } from "./config/paths";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT || 3001);
  const host = process.env.HOST || process.env.HOSTNAME || "0.0.0.0";
  const basePath = normalizeBasePath(process.env.ORDER_BASE_PATH, "/order");

  app.enableCors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type",
  });
  const globalPrefix = toGlobalPrefix(basePath);
  if (globalPrefix) {
    app.setGlobalPrefix(globalPrefix);
  }

  await app.listen(port, host);
  console.log(`order-service listening on http://${host}:${port}${basePath}`);
}

bootstrap();
