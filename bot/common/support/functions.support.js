// Функция возвращает понедельник или следующий день от текущего дня
exports.getNextDate = async () => {
    let nextDay = null;
    let currentDate = new Date(); // текущая дата
    currentDate.setHours(7, 0, 0);

    if (currentDate.getDay() === 0) {
        nextDay = new Date(new Date().setDate(currentDate.getDate() + 1)).toISOString().split('T')[0]; // если сегодня ВОСКРЕСЕНЬЕ
    } else if (currentDate.getDay() === 6) {
        nextDay = new Date(new Date().setDate(currentDate.getDate() + 2)).toISOString().split('T')[0]; // если сегодня СУББОТА
    } else if (currentDate.getDay() === 5) {
        nextDay = new Date(new Date().setDate(currentDate.getDate() + 3)).toISOString().split('T')[0]; // если сегодня ПЯТНИЦА
    } else {
        nextDay = new Date(new Date().setDate(currentDate.getDate() + 1)).toISOString().split('T')[0]; // если сегодня любой день, то вернется следующий(например сегодня Четверг, то вернется Пятница)
    }
    const [year, month, day] = nextDay.split('-');
    nextDay = `${day}.${month}.${year}`;
    return nextDay;
};
// Функция будет вызываться, когда не получится отправить запрос на след день.
// Функция будет возвращать либо текущий день, либо пятницу прошлой недели
exports.getPreviousDate = async () => {
    let currentDate = new Date();
    currentDate.setHours(7, 0, 0);

    let newDate = null;

    if (currentDate.getDay() === 0) {
        newDate = new Date(new Date().setDate(currentDate.getDate() - 2)).toISOString().split('T')[0]; // если сегодня ВОСКРЕСЕНЬЕ
    } else if (currentDate.getDay() === 6) {
        newDate = new Date(new Date().setDate(currentDate.getDate() - 1)).toISOString().split('T')[0]; // если сегодня СУББОТА
    } else {
        newDate = currentDate.toISOString().split('T')[0]; // текущий день
    }

    const [year, month, day] = newDate.split('-');
    newDate = `${day}.${month}.${year}`;
    return newDate;
};
