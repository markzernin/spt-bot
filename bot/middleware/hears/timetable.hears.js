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
        let scheduleDay = null;
        let url = null;
        let response = null;
        let json = null;
        let timetable = null;
        let text = null;

        console.log(nextDay);
        console.log(previousDay);

        /*
        Переменная url содержит адрес куда будет отправлен запрос.
        Переменная nextDay содержит завтрашний день, либо понедельник следующей недели (если сегодня пятница или выходной день)
        */
        try {
            scheduleDay = nextDay;
            url = `https://spt42.ru/studentu/korpus-2/data/${scheduleDay}.json`;
            response = await fetch(url);
            json = await response.json();
        } catch (e) {
            try {
                scheduleDay = previousDay;
                url = `https://spt42.ru/studentu/korpus-2/data/${scheduleDay}.json`;
                response = await fetch(url);
                json = await response.json();
            } catch (e) {
                console.log(e);
                return await ctx.reply("Произошла ошибка. Мы уже работаем над ее исправлением!");
            }
        }

        timetable = json.filter(el => el['Группа'] === group);

        text = `Расписание группы <b>${group}</b> на <b>${scheduleDay}</b>:\n\n`;
        
        // Вспомогательная функция аналог функции array_values из PHP
        function array_values( input ) {	// Return all the values of an array
            let tmp_arr = [], cnt = 0;

            for (let key in input ){
                tmp_arr[cnt] = input[key];
                cnt++;
            }
            return tmp_arr;
        }


        let isSearch = null;
        for (let i = 0; i < 12; i++) {
            isSearch = array_values(timetable.filter((element) => {
                return element['НомерПары'] === i;
            }));
            //console.log(isSearch)
            if (isSearch) {
                if (isSearch.length === 0) {
                    continue;
                }
                if (isSearch.length === 1) {
                    text += `Номер пары: <b>${isSearch[0]['НомерПары']}</b>\nДисциплина: <b>${isSearch[0]['Дисциплина']}</b>\nПреподаватель: <b>${isSearch[0]['Преподаватель']}</b>\nАудитория: <b>${isSearch[0]['Аудитория']}</b>\n\n`;
                } else {
                    text += `Номер пары: <b>${isSearch[0]['НомерПары']}</b>\nДисциплина: <b>${isSearch[0]['Дисциплина']}</b>\nПреподаватель: <b>${isSearch[0]['Преподаватель']} / ${isSearch[1]['Преподаватель']}</b>\nАудитория: <b>${isSearch[0]['Аудитория']} / ${isSearch[1]['Аудитория']}</b>\n\n`;
                }
            }
        }
        // Старый вариант формирования строки вывода расписания
        // timetable.forEach((el) => {
        //     text += `Номер пары: <b>${el['НомерПары']}</b>\nДисциплина: <b>${el['Дисциплина']}</b>\nПреподаватель: <b>${el['Преподаватель']}</b>\nАудитория: <b>${el['Аудитория']}</b>\n\n`;
        // });
        return await ctx.replyWithHTML(text);
    } catch (e) {
        console.log(e);
    }

});
