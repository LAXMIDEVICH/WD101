const Found = require("../models/Found");

const addFoundItem = async (req, res) => {
  const item = await Found.create({
    ...req.body,
  });
  res.status(200).json({ item });
};
const getFoundItems = async (req, res) => {
  const items = await Found.find({});
  res.status(200).json({ items });
};

module.exports = { addFoundItem, getFoundItems };
