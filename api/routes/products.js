// ============= Importing Dependencies ==============
const router = require("express").Router();
const mongoose = require("mongoose");
const Product = require("../models/products");

// ================= Handling Requests =============
router.get("/", (req, res, next) => {
  Product.find()
    .select("name price _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/products/" + doc._id
            }
          };
        })
      };
      if (response.count > 0) {
        console.log("From Database" + docs);
        res.status(200).json(response);
      } else {
        console.log("No Products ");
        res.status(400).json({
          message: "No Products"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(result => {
      const response = {
        message: "Product Created Successfully !!",
        name: result.name,
        price: result.price,
        _id: result._id,
        request: {
          type: "GET",
          url: "http://localhost:3000/products/" + result._id
        }
      };
      console.log(result);
      res.status(201).json({
        CreatedProduct: response
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/:ProductID", (req, res, next) => {
  const id = req.params.ProductID;
  Product.findById(id)
    .select("price name _id")
    .exec()
    .then(doc => {
      if (doc) {
        console.log("From Database" + doc);
        res.status(200).json({
          product: doc,
          request: {
            type: "GET",
            description: "To Get All Products Cick Below Link",
            url: "http://localhost:3000/products"
          }
        });
      } else {
        console.log("404 Product Not Found ");
        res.status(400).json({
          message: "404 Product Not Found"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:ProductID", (req, res, next) => {
  const id = req.params.ProductID;
  const updateOps = {};
  for (const Ops of req.body) {
    updateOps[Ops.propName] = Ops.value;
  }
  Product.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Product Updated",
        More: {
          updatedProduct: "http://localhost:3000/products/" + id,
          seeAllProducts: "http://localhost:3000/products"
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:ProductID", (req, res, next) => {
  const id = req.params.ProductID;
  Product.deleteOne({ _id: id })
    .exec()
    .then(result => {
      console.log("Product Deleted");
      if (result.deletedCount > 0) {
        res.status(200).json({
          message: "Product Deleted",
          More: {
            Description: "Click below to add new Product",
            typeOfRequest: "POST (Must Required)",
            url: "http://localhost:3000/products",
            body: {
              name: "String",
              price: "Number"
            }
          }
        });
      } else {
        res.status(404).json({
          message: "No Products found to Delete"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// ================ Exporting Router =====================
module.exports = router;
