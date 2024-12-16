const request = require("supertest");
const express = require("express");
const shoppingListRouter = require("../controller/shoppingList"); // path to your shoppingList router
const shoppingListDao = require("../dao/shoppingList-dao"); // path to the dao
jest.mock("../dao/shoppingList-dao"); // Mock the DAO functions

const app = express();
app.use(express.json());
app.use("/shoppingList", shoppingListRouter);

describe("Shopping List Controller", () => {
  describe("POST /shoppingList/create", () => {
    it("should create a shopping list successfully", async () => {
      const mockList = {
        name: "Groceries",
        ownerId: "owner123",
        members: [{ id: "member1" }, { id: "member2" }],
      };

      shoppingListDao.create.mockResolvedValue(mockList);

      const response = await request(app)
        .post("/shoppingList/create")
        .send({
          name: "Groceries",
          ownerId: "owner123",
          members: [{ id: "member1" }, { id: "member2" }],
        });

      expect(response.status).toBe(200);
      expect(response.body.createdList).toEqual(mockList);
      expect(shoppingListDao.create).toHaveBeenCalledWith({
        listName: "Groceries",
        listOwnerId: "owner123",
        listMembers: [{ id: "member1" }, { id: "member2" }],
      });
    });

    it("should return 400 for invalid input", async () => {
      const response = await request(app).post("/shoppingList/create").send({
        name: "Groceries",
      });

      expect(response.status).toBe(400);
      expect(response.body.code).toBe("dtoInIsNotValid");
    });

    it("should handle server errors", async () => {
      shoppingListDao.create.mockRejectedValue(new Error("Database error"));

      const response = await request(app)
        .post("/shoppingList/create")
        .send({
          name: "Groceries",
          ownerId: "owner123",
          members: [{ id: "member1" }],
        });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Database error");
    });
  });

  describe("POST /shoppingList/delete", () => {
    it("should delete a shopping list successfully", async () => {
      shoppingListDao.remove.mockResolvedValue(true);

      const response = await request(app).post("/shoppingList/delete").send({
        listId: "mockListId",
      });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(shoppingListDao.remove).toHaveBeenCalledWith({
        listId: "mockListId",
      });
    });

    it("should return 400 for invalid input", async () => {
      const response = await request(app).post("/shoppingList/delete").send({});

      expect(response.status).toBe(400);
      expect(response.body.code).toBe("dtoInIsNotValid");
    });

    it("should handle server errors", async () => {
      shoppingListDao.remove.mockRejectedValue(new Error("Database error"));

      const response = await request(app).post("/shoppingList/delete").send({
        listId: "mockListId",
      });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Database error");
    });
  });

  describe("POST /shoppingList/update", () => {
    it("should update a shopping list successfully", async () => {
      const mockUpdatedList = {
        listId: "mockListId",
        name: "Updated Groceries",
        members: [{ id: "member1" }, { id: "member2" }],
      };

      shoppingListDao.update.mockResolvedValue(mockUpdatedList);

      const response = await request(app)
        .post("/shoppingList/update")
        .send({
          listId: "mockListId",
          name: "Updated Groceries",
          members: [{ id: "member1" }, { id: "member2" }],
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toEqual(mockUpdatedList);
      expect(shoppingListDao.update).toHaveBeenCalledWith({
        list: {
          listId: "mockListId",
          name: "Updated Groceries",
          members: [{ id: "member1" }, { id: "member2" }],
        },
      });
    });

    it("should return 400 for invalid input", async () => {
      const response = await request(app).post("/shoppingList/update").send({});

      expect(response.status).toBe(400);
      expect(response.body.code).toBe("dtoInIsNotValid");
    });

    it("should handle server errors", async () => {
      shoppingListDao.update.mockRejectedValue(new Error("Database error"));

      const response = await request(app)
        .post("/shoppingList/update")
        .send({
          listId: "mockListId",
          name: "Updated Groceries",
          members: [{ id: "member1" }],
        });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Database error");
    });
  });

  describe("POST /shoppingList/archive", () => {
    it("should archive a shopping list successfully", async () => {
      const mockList = { archived: true };

      shoppingListDao.archive.mockResolvedValue(mockList);

      const response = await request(app).post("/shoppingList/archive").send({
        listId: "mockListId",
      });

      expect(response.status).toBe(200);
      expect(response.body.archived).toBe(true);
      expect(shoppingListDao.archive).toHaveBeenCalledWith({
        listId: "mockListId",
      });
    });

    it("should return 400 for invalid input", async () => {
      const response = await request(app)
        .post("/shoppingList/archive")
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.code).toBe("dtoInIsNotValid");
    });

    it("should handle server errors", async () => {
      shoppingListDao.archive.mockRejectedValue(new Error("Database error"));

      const response = await request(app).post("/shoppingList/archive").send({
        listId: "mockListId",
      });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Database error");
    });
  });

  describe("GET /shoppingList/list", () => {
    it("should return a list of shopping lists", async () => {
      const mockLists = [{ name: "Groceries" }, { name: "Shopping" }];

      shoppingListDao.list.mockResolvedValue(mockLists);

      const response = await request(app).get("/shoppingList/list");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockLists);
    });

    it("should handle server errors", async () => {
      shoppingListDao.list.mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/shoppingList/list");

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Database error");
    });
  });

  describe("GET /shoppingList/get", () => {
    it("should return a specific shopping list", async () => {
      const mockList = { name: "Groceries", listId: "mockListId" };

      shoppingListDao.get.mockResolvedValue(mockList);

      const response = await request(app)
        .get("/shoppingList/get")
        .send({ listId: "mockListId" });

      expect(response.status).toBe(200);
      expect(response.body.shoppingList).toEqual(mockList);
    });

    it("should return 404 if list not found", async () => {
      shoppingListDao.get.mockResolvedValue(null);

      const response = await request(app)
        .get("/shoppingList/get")
        .send({ listId: "mockListId" });

      expect(response.status).toBe(404);
      expect(response.body.code).toBe("listNotFound");
    });

    it("should handle server errors", async () => {
      shoppingListDao.get.mockRejectedValue(new Error("Database error"));

      const response = await request(app)
        .get("/shoppingList/get")
        .send({ listId: "mockListId" });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Database error");
    });
  });
});
