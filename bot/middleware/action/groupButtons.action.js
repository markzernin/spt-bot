const {bot} = require('../../connections/token.connection');
const {editGroupUser} = require('../../common/sequelize/saveUser.sequelize');
const keyboardMenu = require('../../common/keyboards/menu.keyboard');

module.exports = bot.action(/.+/, async (ctx) => {

    const group = ctx.update.callback_query.data;
    const login = String(ctx.update.callback_query.from.id);
    await ctx.answerCbQuery(`Ты выбрал группу: ${group}`);
    await editGroupUser(login, group);

    await ctx.deleteMessage();
    return await ctx.replyWithHTML(`Ты выбрал группу: <b>${group}</b>.\n\nТеперь у тебя есть возможность посмотреть расписание.`, keyboardMenu());

})