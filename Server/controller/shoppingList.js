const express = require("express");
const router = express.Router();
const authenticateToken = require("../helpers/authenticateToken");

const CreateAbl = require("../abl/shoppingList/createAbl");
const DeleteAbl = require("../abl/shoppingList/deleteAbl");
const UpdateAbl = require("../abl/shoppingList/updateAbl");
const ArchiveAbl = require("../abl/shoppingList/archiveAbl");
const ListAbl = require("../abl/shoppingList/listAbl");
const GetAbl = require("../abl/shoppingList/getAbl");

router.post("/create", authenticateToken, (req, res) => {
  CreateAbl(req, res);
});

router.post("/delete", authenticateToken, (req, res) => {
  DeleteAbl(req, res);
});

router.post("/update", authenticateToken, (req, res) => {
  UpdateAbl(req, res);
});

router.post("/archive", authenticateToken, (req, res) => {
  ArchiveAbl(req, res);
});

router.get("/list", authenticateToken, (req, res) => {
  ListAbl(req, res);
});

router.get("/get", authenticateToken, (req, res) => {
  GetAbl(req, res);
});

module.exports = router;
