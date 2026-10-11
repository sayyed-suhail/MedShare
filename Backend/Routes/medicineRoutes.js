const express = require("express");

const {
  createMedicine,
  getMedicines,
  acceptPickup,
} = require("../controller/medicineController");

const router = express.Router();

router.post("/", createMedicine);
router.get("/", getMedicines);

router.patch("/:id/accept-pickup", acceptPickup);

module.exports = router;