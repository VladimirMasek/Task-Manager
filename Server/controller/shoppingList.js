const express = require("express");
const router = express.Router();

const CreateAbl = require("../abl/shoppingList/createAbl");
const DeleteAbl = require("../abl/shoppingList/deleteAbl");
const UpdateAbl = require("../abl/shoppingList/updateAbl");
const ArchiveAbl = require("../abl/shoppingList/archiveAbl");
const ListAbl = require("../abl/shoppingList/listAbl");
const GetAbl = require("../abl/shoppingList/getAbl");

router.post("/create", (req, res) => {
  CreateAbl(req, res);
});

router.post("/delete", (req, res) => {
  DeleteAbl(req, res);
});

router.post("/update", (req, res) => {
  UpdateAbl(req, res);
});

router.post("/archive", (req, res) => {
  ArchiveAbl(req, res);
});

router.get("/list", (req, res) => {
  ListAbl(req, res);
});

router.get("/get", (req, res) => {
  GetAbl(req, res);
});

module.exports = router;
