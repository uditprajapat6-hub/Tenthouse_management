const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const bookingRoutes = require("./routes/bookingRoutes");

app.use("/api", bookingRoutes);
connectDB();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.get("/", (req, res) => {
    res.send("🚀 TentHouse Backend Running");
  });

app.listen(5000, () => console.log("🚀 Server running on port 5000"));