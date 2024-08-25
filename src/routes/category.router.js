const { getAll, create, remove, } = require('../controllers/category.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJWT');

const routerCategory = express.Router();

routerCategory.route('/')
    .get(getAll)
    .post(verifyJwt, create); //🔒

    routerCategory.route('/:id')
    .delete(verifyJwt, remove); //🔒
   

module.exports = routerCategory;