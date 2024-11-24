function create({ item }) {
  const generateHexId = () => {
    return Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0");
  };

  const newItem = {
    id: generateHexId(),
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
      id: item.id,
      name: item.name,
      isDone: item.isDone,
    };

    return updatedItem;
  } catch (error) {
    throw { code: "failedToUpdateItem", message: error.message };
  }
}

function archive({ listId }) {
  try {
    return true;
  } catch (error) {
    throw { code: "failedToArchiveList", message: error.message };
  }
}

function list() {
  try {
    return [];
  } catch (error) {
    throw { code: "failedToGetLists", message: error.message };
  }
}

function get({ listId }) {
  try {
    return {};
  } catch (error) {
    throw { code: "failedToGetList", message: error.message };
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
