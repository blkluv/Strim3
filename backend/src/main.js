"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const AppExceptionFilter_1 = require("exceptions/AppExceptionFilter");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://localhost:3000',
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new AppExceptionFilter_1.AppExceptionFilter(app.get(core_1.HttpAdapterHost)));
    await app.listen(8080);
}
bootstrap();
