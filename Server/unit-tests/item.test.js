const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const itemDao = require("../dao/item-dao");
const itemRouter = require("../controller/item");

jest.mock("../dao/item-dao");

const app = express();
app.use(express.json());
app.use("/item", itemRouter);

describe("Item Controller", () => {
  beforeAll(async () => {});

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("POST /item/create", () => {
    it("should create an item successfully", async () => {
      const mockItem = {
        name: "New Item",
        isDone: false,
      };

      itemDao.create.mockResolvedValue(mockItem);

      const response = await request(app)
        .post("/item/create")
        .send({
          listId: "mockListId",
          item: {
            name: "New Item",
          },
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockItem);
      expect(itemDao.create).toHaveBeenCalledWith({
        listId: "mockListId",
        item: {
          name: "New Item",
        },
      });
    });

    it("should return 400 for invalid input", async () => {
      const response = await request(app).post("/item/create").send({});

      expect(response.status).toBe(400);
      expect(response.body.code).toBe("dtoInIsNotValid");
    });

    it("should handle server errors", async () => {
      itemDao.create.mockRejectedValue(new Error("Database error"));

      const response = await request(app)
        .post("/item/create")
        .send({
          listId: "mockListId",
          item: {
            name: "New Item",
          },
        });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Database error");
    });
  });

  describe("POST /item/delete", () => {
    it("should delete an item successfully", async () => {
      itemDao.remove.mockResolvedValue(true);

      const response = await request(app).post("/item/delete").send({
        listId: "mockListId",
        itemId: "mockItemId",
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ success: true });
      expect(itemDao.remove).toHaveBeenCalledWith({
        listId: "mockListId",
        itemId: "mockItemId",
      });
    });

    it("should return 400 for invalid input", async () => {
      const response = await request(app).post("/item/delete").send({});

      expect(response.status).toBe(400);
      expect(response.body.code).toBe("dtoInIsNotValid");
    });

    it("should handle server errors", async () => {
      itemDao.remove.mockRejectedValue(new Error("Database error"));

      const response = await request(app).post("/item/delete").send({
        listId: "mockListId",
        itemId: "mockItemId",
      });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Database error");
    });
  });

  describe("POST /item/solve", () => {
    it("should mark an item as solved", async () => {
      const mockItem = { id: "mockItemId", isDone: true };
      itemDao.solve.mockResolvedValue(mockItem);

      const response = await request(app).post("/item/solve").send({
        listId: "mockListId",
        itemId: "mockItemId",
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockItem);
      expect(itemDao.solve).toHaveBeenCalledWith({
        listId: "mockListId",
        itemId: "mockItemId",
      });
    });

    it("should return 400 for invalid input", async () => {
      const response = await request(app).post("/item/solve").send({});

      expect(response.status).toBe(400);
      expect(response.body.code).toBe("dtoInIsNotValid");
    });

    it("should handle server errors", async () => {
      itemDao.solve.mockRejectedValue(new Error("Database error"));

      const response = await request(app).post("/item/solve").send({
        listId: "mockListId",
        itemId: "mockItemId",
      });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Database error");
    });
  });

  describe("POST /item/update", () => {
    it("should update an item successfully", async () => {
      const mockItem = {
        id: "mockItemId",
        name: "Updated Item",
        isDone: false,
      };
      itemDao.update.mockResolvedValue(mockItem);

      const response = await request(app).post("/item/update").send({
        listId: "mockListId",
        item: mockItem,
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockItem);
      expect(itemDao.update).toHaveBeenCalledWith({
        listId: "mockListId",
        item: mockItem,
      });
    });

    it("should return 400 for invalid input", async () => {
      const response = await request(app).post("/item/update").send({});

      expect(response.status).toBe(400);
      expect(response.body.code).toBe("dtoInIsNotValid");
    });

    it("should handle server errors", async () => {
      itemDao.update.mockRejectedValue(new Error("Database error"));

      const response = await request(app)
        .post("/item/update")
        .send({
          listId: "mockListId",
          item: {
            id: "mockItemId",
            name: "Updated Item",
            isDone: false,
          },
        });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Database error");
    });
  });
});
