require("dotenv").config();
const mongoose = require("mongoose");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDBga muvaffaqiyatli ulandi!");
  } catch (error) {
    console.error("❌ MongoDBga ulanishda xatolik:", error);
  }
})();
