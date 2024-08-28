const User = require("./User") //importamos el modelo de user
const Category = require("./Category")//importamos Category
const Product = require("./Product")
const Cart = require("./Cart")
const Purchase = require("./Purchase")

// product --> categoryId relacion
Product.belongsTo(Category) //pertenece a category
Category.hasMany(Product) //tiene muchos productos

//relacion de Cart -> userId
Cart.belongsTo(User)
User.hasMany(Cart)

//relacion Cart -> productId
Cart.belongsTo(Product)
Product.hasMany(Cart)


//purchase solo copiamos las relaciones ya que son las mismas
//relacion de Purchase -> userId
Purchase.belongsTo(User)
User.hasMany(Cart)

//relacion Purchase -> productId
Purchase.belongsTo(Product)
Product.hasMany(Cart)