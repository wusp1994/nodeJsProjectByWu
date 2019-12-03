/**
 * sql语句
 * @type {{addUser: string, getAllUser: string, getUserById: string}}
 */
const productsSqlStr = {
    // 产品
    addProducts:'insert into products set ?',
    getAllProducts:'select * from products where isDel=0 order by oder_top ASC,top_time DESC,id DESC limit ?,?',
    getAllProductsNumber:'SELECT COUNT(*) as allCount FROM products where isDel=0',
    getAllProductsByType:'select * from products where isDel=0 and productsType = ? order by oder_top ASC,top_time DESC,id DESC limit ?,?',
    getAllProductsByTypeNumber:'SELECT COUNT(*) as allCount FROM products where isDel=0 and productsType = ?',
    getProductsById:'select * from products where id=?',
    updateProductsById:'update products set ? where id = ?',
    deleteProductsById:'update products set isDel = 1 where id = ?',
    // 类型
    addProductsType:'insert into products_type set ?',
    getAllProductsType:'select * from products_type where isDel=0 order by order_top ASC,id DESC',
    updateProductsTypeById:'update products_type set ? where id = ?',
    deleteProductsTypeById:'update products_type set isDel = 1 where id = ?',
};
module.exports = productsSqlStr;