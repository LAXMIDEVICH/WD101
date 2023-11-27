const { addFoundItem, getFoundItems } = require("../controllers/Found");

const router = require("express").Router();

router.post("/addFoundItem", addFoundItem);
router.get("/getFoundItems", getFoundItems);

module.exports = router;
