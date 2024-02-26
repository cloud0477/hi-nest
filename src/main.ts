import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true, //validation 처리 안된 값 오류처리
      forbidNonWhitelisted:true, //DTO에 없는 값 오류처리
      transform:true, //실제 DTO TYPE으로 변경해줌( ex)String -> number )
    }));
  await app.listen(3000);
}
bootstrap();
