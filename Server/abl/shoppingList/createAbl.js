const Joi = require("joi");
const shoppingListDao = require("../../dao/shoppingList-dao.js");

const schema = Joi.object({
  name: Joi.string().required(),
  members: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
      })
    )
    .required(),
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

    const createdList = shoppingListDao.create({
      list: value,
    });
    res.json({ createdList });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
