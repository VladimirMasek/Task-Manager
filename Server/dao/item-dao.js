const List = require("../models/shoppingList");

async function create({ listId, item }) {
  if (!item || !item.name) {
    throw {
      code: "invalidItemStructure",
      message: "'name' is required in the item structure.",
    };
  }

  const newItem = {
    name: item.name,
    isDone: false,
  };

  try {
    const updatedList = await List.findByIdAndUpdate(
      listId,
      { $push: { itemList: newItem } },
      { new: true }
    );

    if (!updatedList) {
      throw { code: "listNotFound", message: "List not found." };
    }

    return newItem;
  } catch (error) {
    throw {
      code: "failedToCreateItem",
      message: error.message,
    };
  }
}

async function remove({ listId, itemId }) {
  try {
    const updatedList = await List.findByIdAndUpdate(
      listId,
      { $pull: { itemList: { id: itemId } } },
      { new: true }
    );

    if (!updatedList) {
      throw { code: "listNotFound", message: "List not found." };
    }

    const itemRemoved = updatedList.itemList.find((item) => item.id === itemId);

    if (itemRemoved) {
      throw { code: "itemNotRemoved", message: "Failed to remove item." };
    }

    return true;
  } catch (error) {
    throw {
      code: "failedToRemoveItem",
      message: error.message,
    };
  }
}

async function update({ listId, item }) {
  if (!item || !item.id || !item.name) {
    throw {
      code: "invalidItemStructure",
      message: "'id' and 'name' are required in the item structure.",
    };
  }

  try {
    const updatedList = await List.findOneAndUpdate(
      { id: listId, "itemList.id": item.id },
      {
        $set: {
          "itemList.$.name": item.name,
          "itemList.$.isDone": item.isDone,
        },
      },
      { new: true }
    );

    if (!updatedList) {
      throw { code: "listNotFound", message: "List or item not found." };
    }

    const updatedItem = updatedList.itemList.find(
      (listItem) => listItem.id === item.id
    );

    return updatedItem;
  } catch (error) {
    throw {
      code: "failedToUpdateItem",
      message: error.message,
    };
  }
}

async function solve({ listId, itemId }) {
  try {
    const updatedList = await List.findOne({
      id: listId,
      "itemList.id": itemId,
    });

    if (!updatedList) {
      throw { code: "listNotFound", message: "List or item not found." };
    }
    const item = updatedList.itemList.find((item) => item.id === itemId);
    item.isDone = !item.isDone;

    const updatedListWithItem = await List.findOneAndUpdate(
      { id: listId, "itemList.id": itemId },
      {
        $set: {
          "itemList.$.isDone": item.isDone,
        },
      },
      { new: true }
    );

    const updatedItem = updatedListWithItem.itemList.find(
      (listItem) => listItem.id === itemId
    );

    return updatedItem;
  } catch (error) {
    throw {
      code: "failedToUpdateItem",
      message: error.message,
    };
  }
}

module.exports = {
  create,
  remove,
  update,
  solve,
};
