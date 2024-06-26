import { Test, TestingModule } from '@nestjs/testing';
import { Head, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';


describe('postsController (e2e)', () => {
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

  // test find posts
  it('/posts (GET)', async () => {
    const res = await request(app.getHttpServer())
    .get('/posts')
    .set('Authorization', `Bearer ${studentToken}`)
    .expect(200);
    return res;
  });

  let post1Id = '' 
  let post2Id = ''

  // test create a post
  it('/posts (POST)', async () => {
    const post1Data = { 
      text: 'This is a valid post by student', 
      images: ['image1', 'image2'],
      header: 'header1'
    };
    const post2Data = { 
      text: 'this is another valid post by student' ,
      images: ['image3', 'image4'],
      header: 'header2'
    }
    const post3Data = {
      text: 'this is a valid post by teacher' ,
      images: [],
      header: 'header3'
    }

    const res1 =  await request(app.getHttpServer())
      .post('/posts')
      .set('Authorization', `Bearer ${studentToken}`)
      .send(post1Data)
      .expect(201);

    const res2 = await request(app.getHttpServer())
    .post('/posts')
    .set('Authorization', `Bearer ${studentToken}`)
    .send(post2Data)
    .expect(201);

    await request(app.getHttpServer())
    .post('/posts')
    .set('Authorization', `Bearer ${teacherToken}`)
    .send(post3Data)
    .expect(201);

    post1Id = res1.body.raw[0].id
    post2Id = res2.body.raw[0].id

    return
  });

  // test get post by id
  it('/posts/:postId (GET)', async () => {
    const res = await request(app.getHttpServer())
    .get(`/posts/${post1Id}`)
    .set('Authorization', `Bearer ${studentToken}`)
    .expect(200);

    expect(res.body.text).toBe("This is a valid post by student")
  })


  it('/posts/:postId (PATCH)', async () => {
    const postUpdates = { text: "some new desc", header: "new header"}

    await request(app.getHttpServer())
    .patch(`/posts/${post1Id}`)
    .set('Authorization', `Bearer ${studentToken}`)
    .send(postUpdates)
    .expect(200);

    // evil update by a non owner
    return await request(app.getHttpServer())
    .patch(`/posts/${post1Id}`)
    .set('Authorization', `Bearer ${teacherToken}`)
    .send(postUpdates)
    .expect(401);
  })

  // save post test
  it('/posts/:postId/save (POST)', async () => {
    await request(app.getHttpServer())
    .post(`/posts/${post1Id}/save`)
    .set('Authorization', `Bearer ${studentToken}`)
    .expect(201);

    // save by a non owner
    await request(app.getHttpServer())
    .post(`/posts/${post1Id}/save`)
    .set('Authorization', `Bearer ${teacherToken}`)
    .expect(201);

    await request(app.getHttpServer())
    .post(`/posts/${post2Id}/save`)
    .set('Authorization', `Bearer ${teacherToken}`)
    .expect(201);
  })

  // get saved posts by teacher
  it('/posts/saved (GET)', async () => {
    const res = await request(app.getHttpServer())
    .get('/posts/saved')
    .set('Authorization', `Bearer ${teacherToken}`)
    .expect(200);

    console.log(res.body)

    expect(res.body.length).toBe(2)
  })

  it('/posts/:postId (DELETE)', async () => {
    await request(app.getHttpServer())
    .delete(`/posts/${post1Id}`)
    .set('Authorization', `Bearer ${studentToken}`)
    .expect(200);

    //delete by a non creator shall be unauthorized
    await request(app.getHttpServer())
    .delete(`/posts/${post2Id}`)
    .set('Authorization', `Bearer ${teacherToken}`)
    .expect(401);

    // delete by an admin shall be authorized
    return await request(app.getHttpServer())
    .delete(`/posts/${post2Id}`)
    .set('Authorization', `Bearer ${adminToken}`)
    .expect(200);
  })


  afterAll(async () => {
    await app.close();
  }
  );
});
