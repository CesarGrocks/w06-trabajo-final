const User = require("./User") //importamos el modelo de user
const Category = require("./Category")//importamos Category
const Product = require("./Product")
const Cart = require("./Cart")

// product --> categoryId relacion
Product.belongsTo(Category) //pertenece a category
Category.hasMany(Product) //tiene muchos productos

//relacion de Cart -> userId
Cart.belongsTo(User)
User.hasMany(Cart)

//relacion Cart -> productId
Cart.belongsTo(Product)
Product.hasMany(Cart)