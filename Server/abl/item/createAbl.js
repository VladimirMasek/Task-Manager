const Joi = require("joi");
const itemDao = require("../../dao/item-dao.js");

const schema = Joi.object({
  listId: Joi.string().required(),
  item: Joi.object({
    name: Joi.string().required(),
  }).required(),
});

async function CreateAbl(req, res) {
  try {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: error.details,
      });
      return;
    }

    const createdItem = itemDao.create({
      listId: value.listId,
      item: value.item,
    });
    res.json(createdItem);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
