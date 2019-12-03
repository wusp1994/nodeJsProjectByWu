/**
 * sql语句
 * @type {{addUser: string, getAllUser: string, getUserById: string}}
 */
const homeSqlStr = {
    addHome:'insert into home set ?',
    updateHome:'update home set ? where id = ?',
    getHomeList:'select * from home where isDel = 0 and type = ?',
    deleteHomeById:'update home set isDel = 1 where id = ? and type = ?'
};
module.exports = homeSqlStr;