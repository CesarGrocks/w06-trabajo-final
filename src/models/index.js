const User = require("./User") //importamos el modelo de user
const Category = require("./Category")//importamos Category
const Product = require("./Product");

// product --> categoryId relacion
Product.belongsTo(Category)
Category.hasMany(Product)