const request = require("supertest")
const app = require('../app')
const Category = require("../models/Category")

let TOKEN //declaracion de variable token
const BASE_URL_LOGIN = '/api/v1/users/login'
const BASE_URL = '/api/v1/products'  //esta es la ruta

let product  //declaramos por fuera del hook products por que se debe acceder fuera


beforeAll(async () => {

  const hits = {
    lastName: "Young",
    email: "angus@gmail.com",
  }

  const res = await request(app)
           .post(BASE_URL_LOGIN)
           .send(hits)

TOKEN = res.body.token 
// console.log(TOKEN)

//generando categoria
const category = await Category.create({ name: 'headphones' })
  product = {
    title: 'JBL',
    description: 'the best of the best',
    price: 390,
    categoryId: category.id
}

})

test("POST -> 'BASE_URL', should return statusCode 201, and res.body.title === product.title", async () => {
 //console.log(TOKEN);

const res = await request(app)
  .post(BASE_URL)
  .send(product)
  .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.title).toBe(product.title)
  expect(res.body.categoryId).toBe(category.id)
console.log(TOKEN);
})