const db = require('../../connections/db.connection');
const UserModel = require('../../models/user.model');


exports.saveUser = async (login, username) => {
    await db.sync();

    const user = await UserModel.findOne({ where: { login } });

    const textAfterSave = `User: ${login}-${username} is saved`;
    const textAfterUpdate = `User: ${login}-${username} has been updated`;

    if (!user) {
        await UserModel.create({ login, username });
        return textAfterSave;
    }

    if (user.username !== username) {
        await UserModel.update({ username }, { where: { login } });
    }

    return textAfterUpdate;
};

exports.findUser = async (login) => {
    await db.sync();

    const user = await UserModel.findOne({where: { login }});

    if (!user) {
        return false;
    }
    return true;
};

exports.editGroupUser = async (login, group) => {
    await db.sync();

    const textAfterUpdate = `User: ${login} has been updated`;

    await UserModel.update({ group }, { where: { login } });

    return textAfterUpdate;
};

exports.getUser = async (login) => {
    await db.sync();
    const user = UserModel.findOne({ where: { login } });

    return user;
}
