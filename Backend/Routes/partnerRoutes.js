const express = require("express");

const {
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
} = require("../controller/partnerController");

const router = express.Router();

router.get("/inventory", getInventory);

// Medicine Recived 
router.patch(
  "/medicines/:id/receive",
  receiveMedicine
);


// Get pending medicines
router.get("/medicines/pending", getPendingMedicines);


// Approve medicine
router.patch("/medicines/:id/approve", approveMedicine);


// Reject medicine
router.patch("/medicines/:id/reject", rejectMedicine);


// Schedule pickup
router.patch("/medicines/:id/schedule-pickup", schedulePickup);




// Get approved medicines
router.get("/medicines/approved", getApprovedMedicines);


// Get rejected medicines
router.get("/medicines/rejected", getRejectedMedicines);

//to take details of medicine who is pickuped

router.get("/medicines/scheduled-pickups", getScheduledPickups);

//To take details of medicine 
router.get("/medicines/:id/pickup-details", getPickupDetails);

router.patch(
  "/medicines/:id/complete-pickup",
  completePickup
);


module.exports = router;