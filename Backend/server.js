const express = require("express");
const app = express();
const connectDB = require("./config/db");//import database connection
const medicineRoutes = require("./Routes/medicineRoutes");

const partnerRoutes=require("./Routes/partnerRoutes")
const cors = require("cors");



const PORT = 5001;

// Middleware
// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();//import Databse connnection

// Medicine routes
app.use("/api/medicines", medicineRoutes);

app.use("/api/partner", partnerRoutes); //Partner Api 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});