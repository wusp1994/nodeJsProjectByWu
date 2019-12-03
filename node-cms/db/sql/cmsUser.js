/**
 * sql语句
 * @type {{addUser: string, getAllUser: string, getUserById: string}}
 */
const userSqlStr = {
    addUser:'insert into text set ?',
    getAllUser:'select * from cms_user where isdel=0',
    getUserById:'select * from text where id=?',
    updateUser:'update text set ? where id = ?'
};
module.exports = userSqlStr;