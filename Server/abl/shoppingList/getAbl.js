const Joi = require("joi");
const shoppingListDao = require("../../dao/shoppingList-dao.js");

const schema = Joi.object({
  listId: Joi.string().required(),
});

async function GetAbl(req, res) {
  try {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        code: "dtoInIsNotValid",
        message: "Input is not valid",
        validationErrors: error.details.map((detail) => detail.message),
      });
    }

    const shoppingList = await shoppingListDao.get({ listId: value.listId });

    if (!shoppingList) {
      return res.status(404).json({
        code: "listNotFound",
        message: `Shopping list with ID ${value.listId} not found.`,
      });
    }

    res.status(200).json({ shoppingList });
  } catch (e) {
    const statusCode = e.statusCode || 500;
    res.status(statusCode).json({
      code: e.code || "unexpectedError",
      message: e.message || "An unexpected error occurred.",
    });
  }
}

module.exports = GetAbl;
