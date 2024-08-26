const User = require("./User") //importamos el modelo de user
const Category = require("./Category")//importamos Category
const Product = require("./Product")

// product --> categoryId relacion
Product.belongsTo(Category) //pertenece a category
Category.hasMany(Product) //tiene muchos productos