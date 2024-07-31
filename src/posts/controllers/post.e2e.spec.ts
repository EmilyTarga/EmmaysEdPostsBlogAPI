import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { database, imports } from './constant';
import mongoose from 'mongoose';

const postObject = {
  title: 'Artes Históricas',
  content: 'Obras do Leonardo',
  subject: 'Artes',
  author: 'EmMay',
};

const updatedPostObject = {
  title: 'Artes Fantásticas',
  content: 'Obras do Leonardo',
  subject: 'Artes',
  author: 'EmMay',
};

const [search, page, limit] = ['Art', 1, 2];

beforeAll(async () => {
  await mongoose.connect(database);
  await mongoose.connection.db.dropDatabase();
});

describe('Testing Emmays Ed Posts Blog post API Endpoints', () => {
  let app: INestApplication;
  let postId = '';

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports,
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('/GET posts', () => {
    it('Retrieves Main App posts', () => {
      return request(app.getHttpServer()).get('/posts').expect(200);
    });
  });

  describe('/POST posts', () => {
    it('Creates a Post', () => {
      return request(app.getHttpServer())
        .post('/posts')
        .send(postObject)
        .set('Accept', 'application/json')
        .expect(201);
    });

    it('Returns a validation error if create object has incorrect or missing data', async () => {
      const response = await request(app.getHttpServer())
        .post('/posts')
        .send()
        .set('Accept', 'application/json');

      expect(400);
      expect(response.body.message == 'Validation failed');
    });
  });

  describe('/GET posts/search', () => {
    it('Returns record matches to the search', async () => {
      const response = await request(app.getHttpServer()).get(
        `/posts/search?search=${search}&page=${page}&limit=${limit}`,
      );

      expect(200);
      expect(response.body[0].title == postObject.title);
      postId = response.body[0]._id;
    });

    it('Returns empty array if no records are found', async () => {
      const response = await request(app.getHttpServer()).get(
        `/posts/search?search=NotFoundRecord&page=${page}&limit=${limit}`,
      );

      expect(200);
      expect(response.body[0] == '');
    });
  });

  describe('/GET posts/admin', () => {
    it('Retrieves App posts paginated for Administrators', () => {
      return request(app.getHttpServer())
        .get(`/posts/admin?page=${page}&limit=${limit}`)
        .expect(200);
    });
  });

  describe('/GET post/:postId', () => {
    it("Retrieves a post with the corresponding Id provided on the request's params", async () => {
      const response = await request(app.getHttpServer()).get(
        `/posts/${postId}`,
      );

      expect(200);
      expect(response.body.title == postObject.title);
    });

    it("Returns a Post Not Found error if Request's Id doesn't have a match in database ", async () => {
      const response = await request(app.getHttpServer()).get(
        `/posts/66aa46b10a7c83fdd257d938`,
      );

      expect(404);
      expect(response.body.message == 'Post Not Found');
    });
  });

  describe('/PUT posts/:postId', () => {
    it("Updates post that has a corresponding Id of the request's params with request's provided object", () => {
      return request(app.getHttpServer())
        .put(`/posts/${postId}`)
        .send(updatedPostObject)
        .set('Accept', 'application/json')
        .expect(200);
    });

    it('Retrieves the Posts data and validate that it was correctly updated', async () => {
      const response = await request(app.getHttpServer()).get(
        `/posts/${postId}`,
      );

      expect(200);
      expect(response.body.title == updatedPostObject.title);
    });
  });

  describe('/DELETE post/:postId', () => {
    it("Deletes a post that has a correspondent Id of the request's params", () => {
      return request(app.getHttpServer())
        .delete(`/posts/${postId}`)
        .expect(200);
    });

    it('Validates that the post was correctly removed', () => {
      return request(app.getHttpServer()).get('/posts').expect(200).expect([]);
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await app.close();
  });
});
