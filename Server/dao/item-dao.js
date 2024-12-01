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
  if (!itemId) {
    throw {
      code: "invalidItemStructure",
      message: "'itemId' is required.",
    };
  }

  try {
    const updatedList = await List.findByIdAndUpdate(
      listId,
      { $pull: { itemList: { _id: itemId } } },
      { new: true }
    );

    if (!updatedList) {
      throw { code: "listNotFound", message: "List not found." };
    }

    const itemStillExists = updatedList.itemList.some(
      (item) => item.id === itemId
    );

    if (itemStillExists) {
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
    const list = await List.findById(listId);

    if (!list) {
      throw { code: "listNotFound", message: "List not found." };
    }

    const itemIndex = list.itemList.findIndex(
      (listItem) => listItem.id === item.id
    );

    if (itemIndex === -1) {
      throw { code: "itemNotFound", message: "Item not found." };
    }
    list.itemList[itemIndex].name = item.name;
    list.itemList[itemIndex].isDone = item.isDone;
    const updatedList = await list.save();

    return updatedList.itemList[itemIndex];
  } catch (error) {
    throw {
      code: "failedToUpdateItem",
      message: error.message,
    };
  }
}

async function solve({ listId, itemId }) {
  if (!itemId) {
    throw {
      code: "invalidItemStructure",
      message: "'itemId' is required.",
    };
  }

  try {
    const list = await List.findById(listId);

    if (!list) {
      throw { code: "listNotFound", message: "List not found." };
    }

    const item = list.itemList.find((item) => item.id === itemId);

    if (!item) {
      throw { code: "itemNotFound", message: "Item not found." };
    }

    item.isDone = !item.isDone;

    await list.save();

    return item;
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
