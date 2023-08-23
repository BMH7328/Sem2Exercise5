const express = require("express");
const router = express.Router();

// import model into router
const Item = require("../models/item");

router.get("/", async (req, res) => {
  const { priority, purchased } = req.query;
  let filter = {};

  if (priority || purchased) {
    if (priority) {
      filter.priority = priority; // { genre: genre }
    }
    if (purchased) {
      filter.purchased = purchased; // { rating: { $gt: rating } }
    }
  }

  res.send(await Item.find(filter));
});

router.get("/:id", async (req, res) => {
  const data = await Item.findOne({ _id: req.params.id });
  res.send(data);
});

router.post("/", async (req, res) => {
  // create a placeholder for a new movie
  const newItem = new Item({
    name: req.body.name,
    quantity: req.body.quantity,
    unit: req.body.unit,
    priority: req.body.priority,
    purchased: req.body.purchased,
  });
  // save the movie into mongodb
  await newItem.save();
  res.send(newItem);
});

router.put("/:id", async (req, res) => {
  // get movie id
  const item_id = req.params.id;
  // update the movie
  const updatedItem = await Item.findByIdAndUpdate(item_id, req.body, {
    // new: true, // return the modified data
  });
  res.send(updatedItem);
});

router.put("/:id/purchased", async (req, res) => {
  // get movie id
  const item_id = req.params.id;
  // update the movie
  const purchasedItem = await Item.findByIdAndUpdate(
    item_id,
    {
      purchased: true,
    },
    {
      new: true,
    }
  );
  res.send(purchasedItem);
});

router.delete("/:id", async (req, res) => {
  // get movie id
  const item_id = req.params.id;
  // delete the movie
  const deletedItem = await Item.findByIdAndDelete(item_id);
  res.send(deletedItem);
});

module.exports = router;
