const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/item/createAbl");
const DeleteAbl = require("../abl/item/deleteAbl");
const UpdateAbl = require("../abl/item/updateAbl");

router.post("/create", (req, res) => {
  CreateAbl(req, res);
});

router.post("/delete", (req, res) => {
  DeleteAbl(req, res);
});

router.post("/update", (req, res) => {
  UpdateAbl(req, res);
});

module.exports = router;
