const mongoose = require("mongoose");

const shoppingListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ownerId: { type: String, required: true },
  members: [{ id: String }],
  archived: { type: Boolean, default: false },
  dateOfCreation: { type: Date },
  itemList: [
    {
      name: { type: String, required: true },
      isDone: { type: Boolean, default: false },
    },
  ],
});

const ShoppingList = mongoose.model("ShoppingList", shoppingListSchema);

module.exports = ShoppingList;
