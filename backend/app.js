const express = require("express");
const path = require("path");
const connectDB = require("./db");
const cors = require("cors");
const DataModel = require("./datamodel");

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();
app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/data", async (req, res) => {
  try {
    const { name, email, userText } = req.body;
    const newData = new DataModel({ name, email, message: userText });
    await newData.save();

    res.status(201).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
