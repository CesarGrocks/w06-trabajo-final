const request = require('supertest')
const app = require('..app')
const Product = require('../models/Product')

let TOKEN
let cartId
let category
let product

const BASE_URL = '/api/v1/cart';
const BASE_URL_LOGIN = '/api/v1/users/login';

beforeAll(async() => {
    const hits = {
   
        email: "angus@gmail.com",
        password: "angus1234"
      };
      const res = await request(app)
        .post(BASE_URL_LOGIN)
        .send(user)

        TOKEN = res.body.token 
        //   console.log(TOKEN)

        category = await Category.create({
            name: "headphones"
        })

        // product = await Product.create()
});


test("POST -> BASE_URL, should return statusCode 200", async() => {
    const res = await request(app)
       .post(BASE_URL)
       .send()
       .set('Authorization', `Bearer ${TOKEN}`)

    //    console.log(res.body);
})