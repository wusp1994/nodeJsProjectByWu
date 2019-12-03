/**
 * sql语句
 * @type {{addUser: string, getAllUser: string, getUserById: string}}
 */
const aboutUsSqlStr = {
    getAllAboutUs:'select * from about_us where isdel=0',
    getAboutUsById:'select * from about_us where id=?',
    updateAboutUs:'update about_us set ? where id = ?'
};
module.exports = aboutUsSqlStr;