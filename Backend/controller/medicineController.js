const Medicine = require("../models/Medicine");

const createMedicine = async (req, res) => {
  try {
    console.log("REQUEST BODY:", req.body);
    const medicine = await Medicine.create(req.body);
    

    res.status(201).json({
      message: "Medicine added successfully",
      medicine,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add medicine",
      error: error.message,
    });
  }
};


const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();

    res.status(200).json({
      medicines,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch medicines",
      error: error.message,
    });
  }
};

const acceptPickup = async (req, res) => {
  try {
    const { id } = req.params;

    const medicine = await Medicine.findById(id);

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    // Pickup must already be scheduled
    if (medicine.pickupStatus !== "scheduled") {
      return res.status(400).json({
        message: "Pickup is not currently awaiting donor acceptance",
      });
    }

    // Accept the pickup
    medicine.donorAcceptedPickup = true;
    medicine.pickupStatus = "donor_accepted";

    await medicine.save();

    res.status(200).json({
      message: "Pickup accepted successfully",
      medicine,
    });
  } catch (error) {
    console.error("Accept Pickup Error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid medicine ID",
      });
    }

    res.status(500).json({
      message: "Server error while accepting pickup",
      error: error.message,
    });
  }
};

module.exports = {
  createMedicine,
  acceptPickup,
  getMedicines,
  
};