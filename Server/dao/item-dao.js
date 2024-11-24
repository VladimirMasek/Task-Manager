function create({ listId, item }) {
  if (!item || !item.name) {
    throw new Error("Invalid item structure: 'name' is required.");
  }

  const generateHexId = () => {
    return Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0");
  };

  const newItem = {
    itemId: generateHexId(),
    name: item.name,
    isDone: false,
  };

  return newItem;
}

function remove({ listId, itemId }) {
  try {
    return true;
  } catch (error) {
    throw { code: "failedToRemoveItem", message: error.message };
  }
}

function update({ listId, item }) {
  try {
    const updatedItem = {
      itemId: item.id,
      name: item.name,
      isDone: item.isDone,
    };

    return updatedItem;
  } catch (error) {
    throw { code: "failedToUpdateItem", message: error.message };
  }
}

module.exports = {
  create,
  remove,
  update,
};
