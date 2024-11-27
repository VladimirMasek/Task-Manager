const express = require("express");
const router = express.Router();
const authenticateToken = require("../helpers/authenticateToken");

const CreateAbl = require("../abl/item/createAbl");
const DeleteAbl = require("../abl/item/deleteAbl");
const UpdateAbl = require("../abl/item/updateAbl");

router.post("/create", authenticateToken, (req, res) => {
  CreateAbl(req, res);
});

router.post("/delete", authenticateToken, (req, res) => {
  DeleteAbl(req, res);
});

router.post("/update", authenticateToken, (req, res) => {
  UpdateAbl(req, res);
});

module.exports = router;
