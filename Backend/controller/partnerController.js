const Medicine = require("../models/Medicine");



const schedulePickup = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      pickupDate,
      pickupTimeSlot,
      courier,
      vehicleReference,
      logisticsNotes,
    } = req.body;

    // Find medicine
    const medicine = await Medicine.findById(id);

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    // Only approved medicines can be scheduled
    if (medicine.status !== "approved") {
      return res.status(400).json({
        message: "Only approved medicines can be scheduled for pickup",
      });
    }

    // Check required pickup information
    if (!pickupDate || !pickupTimeSlot || !courier) {
      return res.status(400).json({
        message: "Pickup date, time slot, and courier are required",
      });
    }

    // Save pickup information
    medicine.pickupDate = pickupDate;
    medicine.pickupTimeSlot = pickupTimeSlot;
    medicine.courier = courier;
    medicine.vehicleReference = vehicleReference || "";
    medicine.logisticsNotes = logisticsNotes || "";

    // Change pickup status
    medicine.pickupStatus = "scheduled";

    // Donor has not accepted yet
    medicine.donorAcceptedPickup = false;

    await medicine.save();

    res.status(200).json({
      message: "Pickup scheduled successfully",
      medicine,
    });
  } catch (error) {
    console.error("Schedule Pickup Error:", error);

    res.status(500).json({
      message: "Server error while scheduling pickup",
      error: error.message,
    });
  }
};


const getScheduledPickups = async (req, res) => {
  try {
    const medicines = await Medicine.find({
      pickupStatus: {
        $in: [
          "scheduled",
          "donor_accepted",
          "pickup_completed",
        ],
      },
    }).sort({ pickupDate: 1 });

    res.status(200).json({
      count: medicines.length,
      medicines,
    });
  } catch (error) {
    console.error("Get Scheduled Pickups Error:", error);

    res.status(500).json({
      message: "Server error while fetching scheduled pickups",
      error: error.message,
    });
  }
};

// Get all pending medicines
const getPendingMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({
      status: "pending",
    }).sort({ createdAt: -1 });

    res.status(200).json({
      medicines,
    });
  } catch (error) {
    console.error("Error fetching pending medicines:", error);

    res.status(500).json({
      message: "Failed to fetch pending medicines",
      error: error.message,
    });
  }
};
//Recived medicine stay on frontend 
const receiveMedicine = async (req, res) => {
  try {
    const { id } = req.params;

    const medicine = await Medicine.findById(id);

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    // Medicine must be physically picked up first
    if (medicine.pickupStatus !== "pickup_completed") {
      return res.status(400).json({
        message:
          "Medicine must be picked up before it can be marked as received",
      });
    }

    medicine.pickupStatus = "received";

    await medicine.save();

    res.status(200).json({
      message: "Medicine marked as received successfully",
      medicine,
    });
  } catch (error) {
    console.error("Receive Medicine Error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid medicine ID",
      });
    }

    res.status(500).json({
      message: "Server error while receiving medicine",
      error: error.message,
    });
  }
};



const getPickupDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const medicine = await Medicine.findById(id);

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    // Medicine must have a scheduled pickup
    if (medicine.pickupStatus === "not_scheduled") {
      return res.status(400).json({
        message: "Pickup has not been scheduled for this medicine",
      });
    }

    res.status(200).json({
      medicine,
    });
  } catch (error) {
    console.error("Get Pickup Details Error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid medicine ID",
      });
    }

    res.status(500).json({
      message: "Server error while fetching pickup details",
      error: error.message,
    });
  }
};


// Approve medicine
const approveMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    // Only pending medicine can be approved
    if (medicine.status !== "pending") {
      return res.status(400).json({
        message: "Only pending medicines can be approved",
      });
    }

    medicine.status = "approved";

    await medicine.save();

    res.status(200).json({
      message: "Medicine approved successfully",
      medicine,
    });
  } catch (error) {
    console.error("Error approving medicine:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid medicine ID",
      });
    }

    res.status(500).json({
      message: "Failed to approve medicine",
      error: error.message,
    });
  }
};


// Reject medicine
const rejectMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    // Only pending medicine can be rejected
    if (medicine.status !== "pending") {
      return res.status(400).json({
        message: "Only pending medicines can be rejected",
      });
    }

    medicine.status = "rejected";

    await medicine.save();

    res.status(200).json({
      message: "Medicine rejected successfully",
      medicine,
    });
  } catch (error) {
    console.error("Error rejecting medicine:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid medicine ID",
      });
    }

    res.status(500).json({
      message: "Failed to reject medicine",
      error: error.message,
    });
  }
};
// Get all approved medicines
const getApprovedMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({
      status: "approved",
    }).sort({ updatedAt: -1 });

    res.status(200).json({
      medicines,
    });
  } catch (error) {
    console.error("Error fetching approved medicines:", error);

    res.status(500).json({
      message: "Failed to fetch approved medicines",
      error: error.message,
    });
  }
};

// Get all rejected medicines
const getRejectedMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({
      status: "rejected",
    }).sort({ updatedAt: -1 });

    res.status(200).json({
      medicines,
    });
  } catch (error) {
    console.error("Error fetching rejected medicines:", error);

    res.status(500).json({
      message: "Failed to fetch rejected medicines",
      error: error.message,
    });
  }
};


const completePickup = async (req, res) => {
  try {
    const { id } = req.params;

    const medicine = await Medicine.findById(id);

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    // Pickup can be completed only after donor accepts
    if (medicine.pickupStatus !== "donor_accepted") {
      return res.status(400).json({
        message:
          "Pickup must be accepted by the donor before it can be completed",
      });
    }

    if (!medicine.donorAcceptedPickup) {
      return res.status(400).json({
        message: "Donor has not accepted the pickup",
      });
    }

    medicine.pickupStatus = "pickup_completed";

    await medicine.save();

    res.status(200).json({
      message: "Pickup marked as completed successfully",
      medicine,
    });
  } catch (error) {
    console.error("Complete Pickup Error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid medicine ID",
      });
    }

    res.status(500).json({
      message: "Server error while completing pickup",
      error: error.message,
    });
  }
};
// Get Inventory 
const getInventory = async (req, res) => {
  try {
    const medicines = await Medicine.find({
      pickupStatus: "received",
      status: "approved",
    }).sort({ updatedAt: -1 });

    res.status(200).json({
      count: medicines.length,
      medicines,
    });
  } catch (error) {
    console.error("Get Inventory Error:", error);

    res.status(500).json({
      message: "Server error while fetching inventory",
      error: error.message,
    });
  }
};


module.exports = {
  getPendingMedicines,
  approveMedicine,
  rejectMedicine,
  getApprovedMedicines,
  getRejectedMedicines,
  schedulePickup,
  getScheduledPickups,
  getPickupDetails,
  completePickup,
  receiveMedicine,
  getInventory,
};