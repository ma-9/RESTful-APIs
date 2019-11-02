const router = require("express").Router();
const mongoose = require("mongoose");

const Orders = require("../models/orders");
const Products = require("../models/products");

router.get("/", (req, res, next) => {
  Orders.find()
    .select("_id product quantity")
    .exec()
    .then(result => {
      res.status(200).json({
        message: "All Products",
        totalOrders: result.length,
        Orders: result.map(docs => {
          return {
            _id: docs._id,
            product: docs.product,
            quantity: docs.quantity,
            request: {
              type: "GET",
              url: "http://localhost:3000/orders/" + docs._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  Products.findById(req.body.productId)
    .then(product => {
      if (!product) {
        res.status(404).json({
          message: "Product Not Found"
        });
      }
      const order = new Orders({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      });
      return order.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Order Placed",
        placedOrderDetails: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity,
          request: {
            type: "GET",
            url: "http://localhost:3000/orders/" + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Product Not Found",
        error: err
      });
    });
});

router.get("/:orderID", (req, res, next) => {
  Orders.findById(req.params.orderID)
    .exec()
    .then(orders => {
      if (!orders) {
        res.status(404).json({
          message: "Order Not Found",
          fetchAll: "http://localhost:3000/orders/"
        });
      }
      res.status(200).json({
        orderDetails: orders,
        fetchAll: "http://localhost:3000/orders/"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:orderID", (req, res, next) => {
  const id = req.params.orderID;
  Orders.deleteOne({ _id: id })
    .exec()
    .then(result => {
      if (!result) {
        res.status(404).json({
          message: "there is no such Order to Delete, Kindly Check Order ID",
          fetchAll: "http://localhost:3000/orders/"
        });
      }
      res.status(200).json({
        message: "Order Deleted Successfully",
        request: {
          type: "POST",
          url: "http://localhost:3000/orders/",
          body: {
            productID: "Id of the Product",
            quantity: "Total Quantity of the Product"
          }
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

module.exports = router;
