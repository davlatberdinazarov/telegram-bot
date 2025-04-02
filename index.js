require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./database"); // MongoDB ulanishi
require("./bot"); // Telegram botni yuklash
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public")); // Static fayllar uchun

// Asosiy sahifa
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Serverni ishga tushirish
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server ${PORT}-portda ishladi!`));
