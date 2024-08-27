const express = require('express');
const routerUser = require('./user.router');
const routerCategory = require('./category.router');
const routerProduct = require('./products.router');
const { verifyJwt } = require('../utils/verifyJWT');
const routerCart = require('./cart.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', routerUser)
router.use("/categories", routerCategory); //doblescomillas
router.use('/products', routerProduct);
router.use('/cart', verifyJwt, routerCart)  //ruta en singular por que el carrito es individual y es privada

module.exports = router;