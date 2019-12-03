/**
 * sql语句
 * @type {{addUser: string, getAllUser: string, getUserById: string}}
 */
const feedbackSqlStr = {
    addFeedback:'insert into feed_back set ?',
    getAllFeedback:'select * from feed_back where isDel=0',
    getFeedbackById:'select * from feed_back where id=?',
    updateFeedbackById:'update feed_back set ? where id = ?',
    deleteFeedbackById:'update feed_back set isDel = 1 where id = ?'
};
module.exports = feedbackSqlStr;