const Joi = require("joi");
const itemDao = require("../../dao/item-dao.js");

const schema = Joi.object({
  listId: Joi.string().required(),
  itemId: Joi.string().required(),
});

async function UpdateAbl(req, res) {
  try {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: error.details,
      });
    }

    const solvedItem = await itemDao.solve({
      listId: value.listId,
      itemId: value.itemId,
    });

    res.json(solvedItem);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
