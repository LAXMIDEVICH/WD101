const Lost = require("../models/Lost");

const addLostItem = async (req, res) => {
  const item = await Lost.create({
    ...req.body,
  });
  res.status(200).json({ item });
};
const getLostItems = async (req, res) => {
  const items = await Lost.find({});
  res.status(200).json({ items });
};

module.exports = { addLostItem, getLostItems };
