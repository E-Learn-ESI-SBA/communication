import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';


describe('userContoller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const studentToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4NTUxMzk4LCJpYXQiOjE3MTU5NTkzOTgsImp0aSI6IjhkZWU5YzQ0YjlkOTQyYmZiYjMxNjI2ZmYyMTBkZjIxIiwiaWQiOiJjMGY2ZTg2OS04NDBiLTQ5NjMtOGM1OC02NDUzYjVkNWNhZTUiLCJhdmF0YXIiOiJkZWZhdWx0IiwidXNlcm5hbWUiOiJzdHVkZW50IiwiZW1haWwiOiJzdHVkZW50QGhvc3QuY29tIiwicm9sZSI6InN0dWRlbnQiLCJncm91cCI6Ik5vbmUiLCJ5ZWFyIjoiTm9uZSJ9.WShTxYZQ07i6fRO6SDF-REAOHOscvbUXzbFSr0Vrzlo'
  const teacherToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4NTUxNDAwLCJpYXQiOjE3MTU5NTk0MDAsImp0aSI6ImIzZDk0M2Y2ZThmMDQ5MTI5NTczMzAzZmNjYTNlY2U0IiwiaWQiOiJmMzRjNDhjYS05NDA0LTQwMzYtOTAyNi05MTdiNGExMjQwZTgiLCJhdmF0YXIiOiJkZWZhdWx0IiwidXNlcm5hbWUiOiJ0ZWFjaGVyIiwiZW1haWwiOiJ0ZWFjaGVyQGhvc3QuY29tIiwicm9sZSI6InRlYWNoZXIiLCJncm91cCI6Ik5vbmUiLCJ5ZWFyIjoiTm9uZSJ9.Z_tUqOd-UcBwLwzzuWSYppcgmIJ5AJZ6_MA63GPMwUM'
  const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4NTUxMzk3LCJpYXQiOjE3MTU5NTkzOTcsImp0aSI6IjYxN2EwNDU3MzNiNDQxNDlhNjY5Y2ZmMjkzOGQ3ZWFlIiwiaWQiOiIyMjNlYmU5Yi1jMWMyLTQ5M2EtYTdiYS02OThhOTM1NjdkYmUiLCJhdmF0YXIiOiJkZWZhdWx0IiwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AaG9zdC5jb20iLCJyb2xlIjoiYWRtaW4iLCJncm91cCI6Ik5vbmUiLCJ5ZWFyIjoiTm9uZSJ9.2UFOb8hOBkfnGpWHgkQdJcnbK6YwqbEtn9aIFA-FNBc'

  const studentId = 'c0f6e869-840b-4963-8c58-6453b5d5cae5'
  const teacherId = 'f34c48ca-9404-4036-9026-917b4a1240e8'

  let postId = ''
  // create a post for votes testing
  it('/posts (POST)', async () => {
    const postData = { text: 'This is a valid post by student' };

    const res1 =  await request(app.getHttpServer())
      .post('/posts')
      .set('Authorization', `Bearer ${studentToken}`)
      .send(postData)
      .expect(201);

    postId = res1.body.raw[0].id
    
  })


  it('/votes/:postId/up (POST)', async () => {
    // up by student
    await request(app.getHttpServer())
      .post(`/votes/${postId}/up`)
      .set('Authorization', `Bearer ${studentToken}`)
      .expect(200);
    // up by teacher
    await request(app.getHttpServer())
    .post(`/votes/${postId}/up`)
    .set('Authorization', `Bearer ${teacherToken}`)
    .expect(200);

    const res = await request(app.getHttpServer())
    .get(`/posts/${postId}`)
    .set('Authorization', `Bearer ${studentToken}`)
    .expect(200);
    
    expect(res.body.upvotes_count).toBe(2)
    
  })


  it('/votes/:postId/down (POST)', async () => {
    // down by student
    await request(app.getHttpServer())
      .post(`/votes/${postId}/down`)
      .set('Authorization', `Bearer ${studentToken}`)
      .expect(200);
    
    //down by teacher
    await request(app.getHttpServer())
    .post(`/votes/${postId}/down`)
    .set('Authorization', `Bearer ${teacherToken}`)
    .expect(200);

    const res = await request(app.getHttpServer())
    .get(`/posts/${postId}`)
    .set('Authorization', `Bearer ${studentToken}`)
    .expect(200);
    
    expect(res.body.downvotes_count).toBe(2)
    expect(res.body.upvotes_count).toBe(0)
    
  })


  it('/votes/:postId (GET)', async () => {
    const res = await request(app.getHttpServer())
    .get(`/votes/${postId}`)
    .set('Authorization', `Bearer ${studentToken}`)
    .expect(200);

    expect(res.body.length).toBe(2)
  })



  afterAll(async () => {
    await app.close();
  }
  );
});
