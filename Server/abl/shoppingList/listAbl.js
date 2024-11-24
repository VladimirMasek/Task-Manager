const Joi = require("joi");
const shoppingListDao = require("../../dao/shoppingList-dao.js");

const schema = Joi.object({});

async function ListAbl(req, res) {
  try {
    const shoppingListList = shoppingListDao.list();
    res.json(shoppingListList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
