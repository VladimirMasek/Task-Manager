function create({ list }) {
  try {
    const generateHexId = () => {
      return Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, "0");
    };

    const newList = {
      id: generateHexId(),
      name: list.name,
      owner: {
        id: generateHexId(),
      },
      members: list.members,
      archived: false,
    };

    return newList;
  } catch (error) {
    throw { code: "failedToCreateList", message: error.message };
  }
}

function remove({ listId }) {
  try {
    return true;
  } catch (error) {
    throw { code: "failedToRemoveList", message: error.message };
  }
}

function update({ list }) {
  try {
    const updatedList = {
      listId: list.listId,
      name: list.name,
      members: list.members,
    };

    return updatedList;
  } catch (error) {
    throw { code: "failedToUpdateList", message: error.message };
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
