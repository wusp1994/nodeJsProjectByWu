/**
 * sql语句
 * @type {{addUser: string, getAllUser: string, getUserById: string}}
 */
const newsSqlStr = {
    addNews:'insert into news set ?',
    getAllNews:'select * from news where isDel=0',
    getNewsById:'select * from news where id=?',
    updateNewsById:'update news set ? where id = ?',
    deleteNewsById:'update news set isDel = 1 where id = ?'
};
module.exports = newsSqlStr;