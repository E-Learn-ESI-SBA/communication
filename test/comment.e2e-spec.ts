import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Comment } from 'src/posts/entities/comment.entity';


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

    let studentPostId = ''
    let teacherPostId = ''

  // create a post for votes testing
  it('/posts (POST)', async () => {
    const postData = { text: 'This is a valid post by student', images: []};

    const res1 =  await request(app.getHttpServer())
      .post('/posts')
      .set('Authorization', `Bearer ${studentToken}`)
      .send(postData)
      .expect(201);
    
    const res2 =  await request(app.getHttpServer())
      .post('/posts')
      .set('Authorization', `Bearer ${teacherToken}`)
      .send(postData)
      .expect(201);

    studentPostId = res1.body.raw[0].id
    teacherPostId = res2.body.raw[0].id
    
  })

  it('/posts/:postId/comments (POST)', async () => {
    const teacherCommentData = { text: 'This is a valid comment by teacher' };
    const studentCommentData = { text: 'This is a valid comment by student' };

    await request(app.getHttpServer())
      .post(`/posts/${studentPostId}/comments`)
      .set('Authorization', `Bearer ${teacherToken}`)
      .send(teacherCommentData)
      .expect(201);

    await request(app.getHttpServer())
      .post(`/posts/${studentPostId}/comments`)
      .set('Authorization', `Bearer ${studentToken}`)
      .send(studentCommentData)
      .expect(201);
    
    await request(app.getHttpServer())
      .post(`/posts/${teacherPostId}/comments`)
      .set('Authorization', `Bearer ${studentToken}`)
      .send(studentCommentData)
      .expect(201);
  })

  let studentComment = ''
  let teacherComment = ''
  // fetch post comments and validate the count
  it('/posts/:postId/comments (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get(`/posts/${studentPostId}/comments`)
      .set('Authorization', `Bearer ${studentToken}`)
      .expect(200);

    for (let comment of res.body) {
      if (comment.text === 'This is a valid comment by student') {
        studentComment = comment.id
      } else {
        teacherComment = comment.id
      }
    }

    const res2 = await request(app.getHttpServer())
      .get(`/posts/${teacherPostId}`)
      .set('Authorization', `Bearer ${studentToken}`)
      .expect(200);

    expect(res.body.length).toBe(res2.body.comments_count)
  })


  it('/posts/:postId/comments/:commentId (DELETE)', async () => {
    // teacher shouldnt be able to delete student's comment
    await request(app.getHttpServer())
      .delete(`/posts/${studentPostId}/comments/${studentComment}`)
      .set('Authorization', `Bearer ${teacherToken}`)
      .expect(401);

    // student should be able to delete his own comment
    await request(app.getHttpServer())
      .delete(`/posts/${studentPostId}/comments/${studentComment}`)
      .set('Authorization', `Bearer ${studentToken}`)
      .expect(200);
    
    // admin should be able to delete any comment
    await request(app.getHttpServer())
      .delete(`/posts/${studentPostId}/comments/${teacherComment}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);
  })


  // student update his comment
  it('/posts/:postId/comments/:commentId (PUT)', async () => {
    const commentData = { text: 'This is an updated comment by student' };

    const res = await request(app.getHttpServer())
      .get(`/posts/${teacherPostId}/comments`)
      .set('Authorization', `Bearer ${studentToken}`)
      .expect(200);
    
    let studentComment = ''
    for (let comment of res.body) {
      if (comment.text === 'This is a valid comment by student') {
        studentComment = comment.id
      }
    }

    // teacher shouldnt be able to update student's comment even if he is owner
    await request(app.getHttpServer())
      .put(`/posts/${teacherPostId}/comments/${studentComment}`)
      .set('Authorization', `Bearer ${teacherToken}`)
      .send({ text: 'This is an updated comment by teacher' })
      .expect(401);

    // student should be able to update his own comment
    await request(app.getHttpServer())
      .put(`/posts/${teacherPostId}/comments/${studentComment}`)
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ text: 'This is an updated comment by student' })
      .expect(200);
  })
  



  afterAll(async () => {
    await app.close();
  }
  );
});
