require("dotenv").config();
const { Telegraf } = require("telegraf");
exports.bot = new Telegraf(process.env.TELEGRAM_TOKEN);