const Joi = require("joi");
const itemDao = require("../../dao/item-dao.js");

const schema = Joi.object({
  listId: Joi.string().required(),
  item: Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    isDone: Joi.boolean().required(),
  }).required(),
});

async function UpdateAbl(req, res) {
  console.log("Incoming request body:", req.body);

  try {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: error.details,
      });
    }

    const updatedItem = itemDao.update({
      listId: value.listId,
      item: value.item,
    });

    res.json(updatedItem);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
