/**
 * sql语句
 * @type {{addUser: string, getAllUser: string, getUserById: string}}
 */
const seoSqlStr = {
    addSEO:'insert into seo set ?',
    getAllSEO:'select * from seo where isDel=0',
    getSEOById:'select * from seo where id=?',
    updateSEOById:'update seo set ? where id = ?',
    deleteSEOsById:'update seo set isDel = 1 where id = ?'
};
module.exports = seoSqlStr;