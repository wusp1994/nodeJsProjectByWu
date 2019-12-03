/**
 * sql语句
 * @type {{addUser: string, getAllUser: string, getUserById: string}}
 */
const userSqlStr = {
    addUser:'insert into cms_user set ?',
    getAllUser:'select * from cms_user where isdel=0',
    getUserById:'select * from cms_user where id=?',
    updateUser:'update cms_user set ? where id = ?',
    getLoginInfo:'select * from cms_user where userName =? and password = ? and isdel=0',
    getUserInfo:'select * from cms_user where userName =? and isdel=0',
};
module.exports = userSqlStr;