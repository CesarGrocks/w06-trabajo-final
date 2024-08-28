const catchError = require('../utils/catchError');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Category = require('../models/Category');

//aplicamos el filtro where para buscar userId
const getAll = catchError(async(req, res) => {
    const userId = req.user.id //userId debe traer el user y id logeado
    const results = await Cart.findAll({
        where:{ userId },
        include: [
            {
                model: Product,
                attributes: { exclude: ['updatedAt', 'createdAt' ] }, //elegimos que atributos excluir de modelo products
                include: [                                           // elegimos cuales incluir en modelo category
                    {
                        model: Category,
                        attributes: ['name', 'id']
                    }]
            }
        ]
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const userId = req.user.id //userId debe traer el user y id
    const { productId, quantity } = req.body
    const body = { productId, quantity, userId }
    const result = await Cart.create(body) //pasamos el body
    return res.status(201).json(result);
});
//otra forma de hacerlo
// const create = catchError(async(req, res) => {
// const userId = req.user.id //userId debe traer el user y id
// const result = await Cart.create({...req.body, userId });
// return res.status(201).json(result);
// });

const getOne = catchError(async(req, res) => {
    const userId = req.user.id //userId debe traer el user y id
    const { id } = req.params;
    const result = await Cart.findByPk(id, {    //se copio y se pego include
            where:{ userId },
            include: [
                {
                    model: Product,
                    attributes: { exclude: ['updatedAt', 'createdAt' ] }, //elegimos que atributos excluir de modelo products
                    include: [                                           // elegimos cuales incluir en modelo category
                        {
                            model: Category,
                            attributes: ['name', 'id']
                        }]
                }
            ]
        }
    );
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const userId = req.user.id //userId debe traer el user y id logeado
    const { id } = req.params;
    const result = await Cart.destroy({ where: {id, userId} }); //id resive parametros y filtra userId
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const userId = req.user.id //userId debe traer el user y id logeado
    const { id } = req.params;
    const { quantity } = req.body //destructuramos quantiy y recibimos la cantidad de res.body
    const result = await Cart.update(
        { quantity },
        { where: { id, userId }, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}