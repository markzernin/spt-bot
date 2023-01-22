const {bot} = require('../../connections/token.connection');
const {getUser} = require('../../common/sequelize/saveUser.sequelize');
const {getPreviousDate, getNextDate} = require('../../common/support/functions.support');

module.exports = bot.hears(['📖 Расписание', 'Расписание', 'расписание'], async (ctx) => {
    try {
        const login = String(ctx.update.message.chat.id);
        const user = await getUser(login);
        const group = user.dataValues.group;

        if (!group) {
            return await ctx.reply('У вас не выбрана учебная группа.\nНапишите команду "/start", чтобы начать пользоваться ботом.');
        }
        // возвращает либо текущий день, либо понедельник след недели
        let nextDay = await getNextDate();
        let previousDay = await getPreviousDate();

        console.log(nextDay);

        /*
        Переменная url содержит адрес куда будет отправлен запрос.
        Переменная nextDay содержит завтрашний день, либо понедельник следующей недели (если сегодня пятница или выходной день)
        */
        let url = `https://spt42.ru/studentu/korpus-2/data/${nextDay}.json`;

        let response = await fetch(url);

        let json = null;
        let timetable = null;
        let text = null;

        if (response.status === 200) {
            json = await response.json();

            timetable = json.filter(el => el['Группа'] === group);

            text = `Расписание группы <b>${group}</b> на <b>${nextDay}</b>:\n\n`;

            timetable.forEach((el) => {
                text += `Номер пары: <b>${el['НомерПары']}</b>\nДисциплина: <b>${el['Дисциплина']}</b>\nПреподаватель: <b>${el['Преподаватель']}</b>\nАудитория: <b>${el['Аудитория']}</b>\n\n`;
            });
            return await ctx.replyWithHTML(text);
        }
        else {
            url = `https://spt42.ru/studentu/korpus-2/data/${previousDay}.json`;
            response = await fetch(url);

            if (response.status !== 200) {
                return await ctx.reply('Произошла ошибка. Попробуйте позже');
            }
            json = await response.json();

            timetable = json.filter(el => el['Группа'] === group);

            text = `Расписание группы <b>${group}</b> на <b>${previousDay}</b>:\n\n`;

            timetable.forEach((el) => {
                text += `Номер пары: <b>${el['НомерПары']}</b>\nДисциплина: <b>${el['Дисциплина']}</b>\nПреподаватель: <b>${el['Преподаватель']}</b>\nАудитория: <b>${el['Аудитория']}</b>\n\n`;
            });
            return await ctx.replyWithHTML(text);
        }
    } catch (e) {
        console.log(e);
    }

});