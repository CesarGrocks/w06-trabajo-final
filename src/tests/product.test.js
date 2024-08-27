require('../models')
const request = require("supertest")
const app = require('../app')
const Category = require("../models/Category")

let TOKEN //declaracion de variable token
const BASE_URL_LOGIN = '/api/v1/users/login'
const BASE_URL = '/api/v1/products'  //esta es la ruta

let product  //declaramos por fuera del hook products por que se debe acceder fuera
let category


beforeAll(async () => {

  const hits = {
   
    email: "angus@gmail.com",
    password: "angus1234"
  }

  const res = await request(app)
           .post(BASE_URL_LOGIN)
           .send(hits)

TOKEN = res.body.token 
// console.log(res.body);

//generando categoria
    category = await Category.create({ name: 'headphones' })
    product = {
    title: 'JBL',
    description: 'the best of the best',
    price: 390,
    categoryId: category.id
}

})

afterAll(async () => {

 await category.destroy()

})

test("POST -> 'BASE_URL', should return statusCode 201, and res.body.title === product.title", async () => {
 //console.log(TOKEN);

const res = await request(app)
  .post(BASE_URL)
  .send(product)
  .set('Authorization', `Bearer ${TOKEN}`)
  console.log(res.body);
  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()

  const columns = ['title', 'description', 'price', 'categoryId'] 

  columns.forEach((column) =>  {

    expect(res.body[column]).toBeDefined()
    expect(res.body[column]).toBe(product[column])

  })

//   expect(res.body.title).toBe(product.title)
//   expect(res.body.categoryId).toBe(category.id)

})