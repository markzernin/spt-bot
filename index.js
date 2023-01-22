require('./bot/middleware/command/start.command');
const {bot} = require('./bot/connections/token.connection');

// const { Telegraf, Markup }  = require('telegraf');
// const axios = require('axios');
// require('dotenv').config();
//
// const getKeyboardMenu = () => {
//     return Markup.keyboard([
//         [Markup.button.callback('📢 Помощь', 'help'), Markup.button.callback('📢 Расписание', 'timetable')],
//         [Markup.button.callback('📢 Помощь', 'help')]
//     ]).resize().oneTime()
// };
//
// let group = "ПР-19";
//
// const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
//
// bot.start(async (ctx) => {
//
// })
//
// bot.hears('📢 Расписание', async (ctx) => {
//     await ctx.reply('Введи название своей группы.\nНапример: АС-20');
//     const response = await fetch('https://spt42.ru/studentu/korpus-2/data/23.01.2023.json');
//     const json = await response.json();
//
//     const timetable = json.filter(el => el['Группа'] == group);
//
//     let text = `Расписание группы ${group}:\n\n`;
//
//     timetable.forEach((el) => {
//         text += `Номер пары: <b>${el['НомерПары']}</b>\nДисциплина: <b>${el['Дисциплина']}</b>\nПреподаватель: <b>${el['Преподаватель']}</b>\nАудитория: <b>${el['Аудитория']}</b>\n\n`;
//     });
//
//     await ctx.replyWithHTML(text);
//
// })

require('./bot/middleware/action/groupButtons.action');
require('./bot/middleware/hears/timetable.hears');

require('./bot/connections/local.connection');

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));