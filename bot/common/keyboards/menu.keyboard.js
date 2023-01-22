const {Markup} = require("telegraf");

const getKeyboardMenu = () => {
    return Markup.keyboard([
        [Markup.button.callback('📢 Помощь', 'help'), Markup.button.callback('📖 Расписание', 'timetable')],
        [Markup.button.callback('📊 Настройки', 'settings')]
    ]).resize().oneTime()
};

module.exports = getKeyboardMenu;