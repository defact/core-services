import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationModule } from '../src/app';

describe('AppController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /users', async () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(401);
  });
});
