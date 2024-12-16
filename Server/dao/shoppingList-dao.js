const ShoppingList = require("../models/shoppingList");
const crypto = require("crypto");

async function create({ listName, listOwnerId, listMembers }) {
  try {
    const newList = new ShoppingList({
      name: listName,
      ownerId: listOwnerId,
      members: listMembers || [],
      archived: false,
      dateOfCreation: new Date(),
      itemList: [],
    });

    const savedList = await newList.save();
    return savedList;
  } catch (error) {
    if (error.code === 11000) {
      throw {
        code: "duplicateKeyError",
        message: "List ID already exists.",
        statusCode: 400,
      };
    }
    throw {
      code: "failedToCreateList",
      message: error.message,
      statusCode: 500,
    };
  }
}

async function remove({ listId }) {
  try {
    const result = await ShoppingList.deleteOne({ id: listId });
    if (result.deletedCount === 0) {
      throw {
        code: "listNotFound",
        message: "List not found or already deleted.",
        statusCode: 404,
      };
    }
    return true;
  } catch (error) {
    throw {
      code: "failedToRemoveList",
      message: error.message,
      statusCode: 500,
    };
  }
}

async function update({ list }) {
  try {
    const updatedList = await ShoppingList.findOneAndUpdate(
      { id: list.listId },
      { name: list.name, members: list.members },
      { new: true }
    );

    if (!updatedList) {
      throw {
        code: "listNotFound",
        message: "List not found.",
        statusCode: 404,
      };
    }

    return updatedList;
  } catch (error) {
    throw {
      code: "failedToUpdateList",
      message: error.message,
      statusCode: 500,
    };
  }
}

async function archive({ listId }) {
  try {
    const updatedList = await ShoppingList.findOneAndUpdate(
      { id: listId },
      { archived: true },
      { new: true }
    );

    if (!updatedList) {
      throw {
        code: "listNotFound",
        message: "List not found.",
        statusCode: 404,
      };
    }

    return { archived: updatedList.archived };
  } catch (error) {
    throw {
      code: "failedToArchiveList",
      message: error.message,
      statusCode: 500,
    };
  }
}

async function list() {
  try {
    const allLists = await ShoppingList.find();
    return allLists;
  } catch (error) {
    throw { code: "failedToGetLists", message: error.message, statusCode: 500 };
  }
}

async function get({ listId }) {
  try {
    const list = await ShoppingList.findOne({ id: listId });
    return list;
  } catch (error) {
    throw { code: "failedToGetList", message: error.message, statusCode: 500 };
  }
}

module.exports = {
  create,
  remove,
  update,
  archive,
  list,
  get,
};
