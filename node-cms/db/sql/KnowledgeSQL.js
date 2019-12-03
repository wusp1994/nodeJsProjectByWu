/**
 * sql语句
 * @type {{addUser: string, getAllUser: string, getUserById: string}}
 */
const knowledgeSqlStr = {
    addKnowledge:'insert into knowledge set ?',
    getAllKnowledge:'select * from knowledge where isDel=0',
    getKnowledgeById:'select * from knowledge where id=?',
    updateKnowledgeById:'update knowledge set ? where id = ?',
    deleteKnowledgeById:'update knowledge set isDel = 1 where id = ?'
};
module.exports = knowledgeSqlStr;