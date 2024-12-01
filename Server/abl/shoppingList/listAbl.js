const shoppingListDao = require("../../dao/shoppingList-dao.js");

async function ListAbl(req, res) {
  try {
    const shoppingListList = await shoppingListDao.list();
    console.log(shoppingListList);
    res.json(shoppingListList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
