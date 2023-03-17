import { app } from "../src";
import jwt from 'jsonwebtoken'
import request from 'supertest'
import httpStatus from "http-status";

const ENDPOINT = '/auth'

describe("Auth tests", () => {
  beforeAll(async () => {
    await app.db.start();
  });

  afterAll(async () => {
    await app.db.drop();
  });

  beforeEach(async () => {
    await app.db.getConnection().synchronize(true);
  });

  test("/POST - Response with a valid jwt token after login", async () => {
    const credentials = {
      email: "foo@email.com",
      password: "foobar",
    }

    await request(app.app).post('/users').send(credentials);

    const response = await request(app.app).post(`${ENDPOINT}/login`).send(credentials)

    const token = response.body.data

    const payload = jwt.verify(token, "SECRET") as jwt.JwtPayload

    expect(response.statusCode).toBe(httpStatus.OK)
    expect(response.body.statusCode).toBe(httpStatus.OK)
    expect(payload.email).toBe(credentials.email)
  })
})