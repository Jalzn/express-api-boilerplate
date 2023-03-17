import { describe, expect, test } from "@jest/globals";
import httpStatus from "http-status";
import request from "supertest";

import { app } from "../src/index";

const ENDPOINT = "/users";

describe("User tests", () => {
  beforeAll(async () => {
    await app.db.start();
  });

  afterAll(async () => {
    await app.db.drop();
  });

  beforeEach(async () => {
    await app.db.getConnection().synchronize(true);
    // TODO: Create mock data
  });

  test("/GET - Response with a list of all users", async () => {
    await request(app.app).post(ENDPOINT).send({
      email: "foo@email.com",
      password: "foobar",
    });

    await request(app.app).post(ENDPOINT).send({
      email: "bar@email.com",
      password: "foobar",
    });

    const response = await request(app.app).get(ENDPOINT).send();

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.statusCode).toBe(httpStatus.OK);
    expect(response.body.data.length).toBe(2);
  });

  test("/GET - Response with a filtered list of users", async () => {
    await request(app.app).post(ENDPOINT).send({
      email: "foo@email.com",
      password: "foobar",
    });

    await request(app.app).post(ENDPOINT).send({
      email: "bar@email.com",
      password: "foobar",
    });

    const response = await request(app.app).get(ENDPOINT).query({email: "foo@email.com"}).send();

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.statusCode).toBe(httpStatus.OK);
    expect(response.body.data.length).toBe(1);
  })

  test("/GET - Response with a user", async () => {
    await request(app.app).post(ENDPOINT).send({
      email: "foo@email.com",
      password: "foobar",
    });

    const response = await request(app.app).get(`${ENDPOINT}/1`).send();

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.statusCode).toBe(httpStatus.OK);

    const user = response.body.data;

    expect(user.email).toBe("foo@email.com");
  });

  test("/GET - Reponse with not found user error", async () => {
    const response = await request(app.app).get(`${ENDPOINT}/1`).send();

    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.body.statusCode).toBe(httpStatus.NOT_FOUND);
    expect(response.body.message).toBe("User not found");
  });

  test("/POST - Response with a new created user", async () => {
    const body = {
      email: "test@email.com",
      password: "foo",
    };

    const res = await request(app.app).post(ENDPOINT).send(body);

    expect(res.status).toBe(201);
    expect(res.body.statusCode).toBe(201);

    const user = res.body.data;

    expect(user.email).toBe(body.email);
  });

  test("/POST - Response when create user with missing fields", async () => {
    const body = {
      email: "test@email.com",
    };

    const response = await request(app.app).post(ENDPOINT).send(body);

    expect(response.statusCode).toBe(httpStatus.BAD_REQUEST);
    expect(response.body.statusCode).toBe(httpStatus.BAD_REQUEST);
    expect(response.body.message).toBe("Password is missing")
  });

  test("/POST - Response when create already exists user", async () => {
    const body = {
      email: "foo@email.com",
      password: "foobar",
    };

    await request(app.app).post(ENDPOINT).send(body);
    const response = await request(app.app).post(ENDPOINT).send(body);

    expect(response.statusCode).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    expect(response.body.statusCode).toBe(httpStatus.UNPROCESSABLE_ENTITY);
    expect(response.body.message).toBe("User already exists")
  });

  test("/PUT - Response with a updated user", async () => {
    const body = {
      email: "foo@email.com",
      password: "foobar",
    };

    const updatedBody = {
      email: "bar@email.com "
    }

    await request(app.app).post(ENDPOINT).send(body);

    const response = await request(app.app).put(`${ENDPOINT}/1`).send(updatedBody)
    const user = response.body.data

    expect(response.statusCode).toBe(httpStatus.OK)
    expect(response.body.statusCode).toBe(httpStatus.OK)
    expect(user.email).toBe(updatedBody.email)
  })

  test("/DELETE - Reponse with a deleted user", async () => {
    const body = {
      email: "foo@email.com",
      password: "foobar",
    };

    await request(app.app).post(ENDPOINT).send(body);

    const response = await request(app.app).delete(`${ENDPOINT}/1`).send()
    const user = response.body.data

    expect(response.statusCode).toBe(httpStatus.OK)
    expect(response.body.statusCode).toBe(httpStatus.OK)

    expect(user.email).toBe(body.email)
  })

  test("/DELETE - Response with not found user", async () => {
    const response = await request(app.app).delete(`${ENDPOINT}/1`).send()

    expect(response.statusCode).toBe(httpStatus.NOT_FOUND)
    expect(response.body.statusCode).toBe(httpStatus.NOT_FOUND)

    expect(response.body.message).toBe("User not found")
  })
});
