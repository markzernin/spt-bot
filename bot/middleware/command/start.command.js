const {bot} = require('../../connections/token.connection');
const {saveUser, findUser, getUser} = require('../../common/sequelize/saveUser.sequelize');
const keyboardMenu = require('../../common/keyboards/menu.keyboard');
const {Markup} = require('telegraf');

module.exports = bot.start(async (ctx) => {
    try {
        const login = String(ctx.chat.id);
        const username = ctx.chat.username ?? 'незнакомец';

        const welcomeText = `👋 Привет, <b>${username}</b>.\nТебя приветствует бот Сибирского политехнического техникума😍\n\nВыбери свою группу из списка ниже\n\nЧтобы узнать возможности бота напишите команду '/help' или выберите пункт меню 'Помощь'`;

        const user = await findUser(login);

        if (user) {
            const userData = await getUser(login);
            const groupUser = userData.dataValues.group;
            const returnText = `👋 Привет, <b>${username}</b>.\nС возвращением!\n\nТы учишься в группе <b>${groupUser}</b>`
            return await ctx.replyWithHTML(returnText, keyboardMenu());
        }

        const response = await fetch('https://spt42.ru/studentu/korpus-2/data/23.01.2023.json');
        const json = await response.json();

        let arrayGroups = [];
        let arrayGroupsButtons = [];
        json.forEach(lesson => arrayGroups.push(lesson['Группа']))

        arrayGroups = Array.from(new Set(arrayGroups)).sort((a, b) => a.localeCompare(b)); // создаём коллекцию уникальных значений

        for (let j = 0; j < arrayGroups.length; j++) {
            arrayGroupsButtons.push(Markup.button.callback(arrayGroups[j], arrayGroups[j]));
        }
        const getInlineKeyboardGroups = () => {
            return Markup.inlineKeyboard(arrayGroupsButtons, {
                columns: 4
            })
        }

        await ctx.replyWithHTML(welcomeText, getInlineKeyboardGroups());

        await saveUser(login, username);
        return;
    } catch (e) {
        console.log(e);
    }
});
