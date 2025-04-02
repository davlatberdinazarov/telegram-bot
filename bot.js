require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const User = require("./models/User"); // Foydalanuvchilarni saqlash uchun model

// Botni yaratish
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// 📌 Foydalanuvchini saqlash
const saveUser = async (msg) => {
  const chatId = msg.chat.id;
  let user = await User.findOne({ chatId });

  if (!user) {
    user = new User({
      chatId,
      username: msg.from.username,
      firstName: msg.from.first_name,
      lastName: msg.from.last_name,
    });
    await user.save();
  }
};

// 🏠 Asosiy menyu
const mainMenu = {
  reply_markup: {
    keyboard: [
      ["📷 Rasm yuborish", "🎥 Video yuborish"],
      ["🖼 Sticker yuborish", "🎵 Musiqa yuborish"],
      ["ℹ️ Yordam", "🚀 Web Site"],
    ],
    resize_keyboard: true,
  },
};

// 📌 /start komandasi
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  await saveUser(msg);

  await bot.sendMessage(
    chatId,
    "🎉 Assalomu alaykum! Botga xush kelibsiz!\nQuyidagi menyudan foydalaning:",
    mainMenu
  );
});

// 📌 Matnli buyruqlarni qayta ishlash
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  try {
    if (text === "📷 Rasm yuborish") {
      await bot.sendPhoto(chatId, "https://source.unsplash.com/random/800x600");
    } else if (text === "🎥 Video yuborish") {
      await bot.sendVideo(
        chatId,
        "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
      );
    } else if (text === "🖼 Sticker yuborish") {
      await bot.sendSticker(
        chatId,
        "https://cdn2.combot.org/meahg54/webp/22xf09fa498.webp"
      );
    } else if (text === "🎵 Musiqa yuborish") {
      await bot.sendAudio(
        chatId,
        "https://www.bensound.com/bensound-music/bensound-creativeminds.mp3",
        {
          title: "Creative Minds",
          performer: "Bensound",
        }
      );
    } else if (text === "ℹ️ Yordam") {
      await bot.sendMessage(
        chatId,
        "🆘 Yordam bo‘limi\n\n📌 Bu bot orqali rasm, video, sticker va musiqa jo‘natishingiz mumkin."
      );
    } else if (text === "🚀 Web Site") {
      await bot.sendMessage(
        chatId,
        "🌍 Saytga o'tish https://rad-frangipane-a3e447.netlify.app/",
        {
          parse_mode: "Markdown",
        }
      );
    } else if (text === "/start") {
        await bot.sendMessage(chatId, `Salom ${msg.chat.first_name} `);
    } else {
      await bot.sendMessage(
        chatId,
        "❌ Men sizni tushunmadim. Iltimos, menyudan foydalaning."
      );
    }
  } catch (error) {
    console.error("❌ Xatolik yuz berdi:", error);
    await bot.sendMessage(
      chatId,
      "⚠ Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring."
    );
  }
});

// Eksport qilish (kerak bo‘lsa)
module.exports = bot;
