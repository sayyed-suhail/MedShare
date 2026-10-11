const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    salt: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Antibiotics",
        "Blood Pressure / Cardiac",
        "Pain Relief / Analgesic",
        "Diabetes & Endocrine",
        "Vitamins & Supplements",
        "Respiratory / Inhalers",
        "Other Therapeutic Class",
      ],
    },

    expiryDate: {
      type: Date,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    images: {
      type: [String],
    },

    storageConditions: {
      type: String,
    },

    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Verification status
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    // Pickup / Logistics status
    pickupStatus: {
      type: String,
      enum: [
        "not_scheduled",
        "scheduled",
        "donor_accepted",
        "pickup_completed",
        "received",
      ],
      default: "not_scheduled",
    },

    pickupDate: {
      type: Date,
    },

    pickupTimeSlot: {
      type: String,
    },

    courier: {
      type: String,
    },

    vehicleReference: {
      type: String,
    },

    logisticsNotes: {
      type: String,
    },

    donorAcceptedPickup: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Medicine", medicineSchema);