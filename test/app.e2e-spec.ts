import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist:true, //validation 처리 안된 값 오류처리
      forbidNonWhitelisted:true, //DTO에 없는 값 오류처리
      transform:true, //실제 DTO TYPE으로 변경해줌( ex)String -> number )
    }));
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/') //url 확인
      .expect(200) //응답코드 확인
      .expect('Welcome to my Movie API'); //결과값 확인
  });

  describe("/movies",()=>{
    it("GET",()=>{
      return request(app.getHttpServer())
      .get('/movies') //url 확인
      .expect(200) //응답코드 확인
      .expect([]); //결과값 확인
    });
    it("POST",()=>{
      return request(app.getHttpServer())
      .post("/movies")
      .send({
        title:"test",
        year:2000,
        genres:['test']
      })
      .expect(201);
    })
    it("POST 400",()=>{
      return request(app.getHttpServer())
      .post("/movies")
      .send({
        title:"test",
        year:2000,
        genres:['test'],
        other:"thing"
      })
      .expect(400);
    })
    it("delete",()=>{
      return request(app.getHttpServer())
      .delete('/movies')
      .expect(404)
    })
  })
  describe("/movies/:id",()=>{
    it("GET 200",()=>{
      return request(app.getHttpServer())
      .get('/movies/1')
      .expect(200);
    });
    it("GET 404",()=>{
      return request(app.getHttpServer())
      .get('/movies/999')
      .expect(404);
    });
    it("PATCH",()=>{
      return request(app.getHttpServer())
      .get('/movies/1')
      .send({title:'Updated Test'})
      .expect(200)
    });
    it("DELETE",()=>{
      return request(app.getHttpServer())
      .get('/movies/1')
      .expect(200);
    });
    it("DELETE 404",()=>{
      return request(app.getHttpServer())
      .get('/movies/999')
      .expect(404);
    });
  })  
});
