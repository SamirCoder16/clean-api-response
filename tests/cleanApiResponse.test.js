import test from "node:test";
import assert from "node:assert";
import request from "supertest";
import express from "express";

import {
  cleanApiResponse,
  errorHandler,
  HttpError,
  buildPaginationMeta,
} from "../src/index.js";

function createApp() {
  const app = express();
  app.use(cleanApiResponse);

  app.get("/success", (req, res) => {
    res.success({ name: "Samir" });
  });

  app.get("/error", (req, res) => {
    res.error("Bad Request", 400);
  });

  app.get("/throw", () => {
    throw new HttpError("Unauthorized", 401);
  });

  app.get("/pagination", (req, res) => {
    const meta = buildPaginationMeta(1, 10, 100);
    res.success([{ id: 1 }], meta);
  });

  app.use(errorHandler);

  return app;
}

test("should return standardized success response", async () => {
  const app = createApp();
  const res = await request(app).get("/success");

  assert.strictEqual(res.body.success, true);
  assert.deepStrictEqual(res.body.data, { name: "Samir" });
  assert.strictEqual(res.body.error, null);
  assert.ok(res.body.meta.requestId);
  assert.ok(res.body.meta.duration);
});

test("should return standardized error response", async () => {
  const app = createApp();
  const res = await request(app).get("/error");

  assert.strictEqual(res.status, 400);
  assert.strictEqual(res.body.success, false);
  assert.strictEqual(res.body.error.message, "Bad Request");
});

test("should handle HttpError properly", async () => {
  const app = createApp();
  const res = await request(app).get("/throw");

  assert.strictEqual(res.status, 401);
  assert.strictEqual(res.body.error.message, "Unauthorized");
});

test("should merge pagination metadata", async () => {
  const app = createApp();
  const res = await request(app).get("/pagination");

  assert.ok(res.body.meta.pagination);
  assert.strictEqual(res.body.meta.pagination.totalPages, 10);
});
