require('./bot/middleware/command/start.command');
const {bot} = require('./bot/connections/token.connection');

require('./bot/middleware/action/groupButtons.action');
require('./bot/middleware/hears/timetable.hears');

require('./bot/connections/local.connection');

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
