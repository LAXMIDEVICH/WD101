const { addLostItem, getLostItems } = require("../controllers/Lost");

const router = require("express").Router();

router.post("/addLostItem", addLostItem);
router.get("/getLostItems", getLostItems);

module.exports = router;
