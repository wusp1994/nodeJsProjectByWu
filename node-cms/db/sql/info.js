/**
 * sql语句
 * @type {{addUser: string, getAllUser: string, getUserById: string}}
 */
const infoSqlStr = {
    getAllInfo:'select * from info where isdel=0',
    getInfoById:'select * from info where id=?',
    updateInfo:'update info set ? where id = ?',
    updateLogo:'update info set logoUrl = ? where id = ?'
};
module.exports = infoSqlStr;