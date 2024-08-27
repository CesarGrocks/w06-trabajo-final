require('../models') // traer el model nos ayuda con categoryId
const request = require("supertest")
const app = require('../app')
const Category = require("../models/Category")

let TOKEN //declaracion de variable token
let category //declracion de category
const BASE_URL_LOGIN = '/api/v1/users/login'
const BASE_URL = '/api/v1/products'  //esta es la ruta

let product  //declaramos por fuera del hook products por que se debe acceder fuera
let productId //declaramos productId

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

    //declaramos product fuera del hook al inicio
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
//antes de que sucedan los eventos (antes de correr los tests )puedo crear rutas o agregar mas funciones 
//y se pueden agregar mas cosas despues de los tests
test("POST -> 'BASE_URL', should return statusCode 201, and res.body.title === product.title", async () => {
 //console.log(TOKEN);

const res = await request(app)
  .post(BASE_URL)
  .send(product)
  .set('Authorization', `Bearer ${TOKEN}`)

  // console.log(res.body);
  productId = res.body.id    //aqui se asigna la declaracion de productId que esta arriba
  

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

test("GET -> 'BASE_URL, should return status code 200, and res.body.length === 1", async () => {

const res = await request(app)
   .get(BASE_URL)
   
  // console.log(res.body)

   expect(res.status).toBe(200)
   expect(res.body).toBeDefined()
   expect(res.body).toHaveLength(1)

   expect(res.body[0].category.id).toBeDefined()
   expect(res.body[0].category.id).toBe(category.id)

})

test("GET -> 'BASE_URL/:id', should return status code 200, and res.body.title === product.title", async () => {

  const res = await request(app)
     .get(`${BASE_URL}/${productId}`)
     
    // console.log(res.body)
  
     expect(res.status).toBe(200)
     expect(res.body).toBeDefined()
  
     expect(res.body.category.id).toBeDefined()
     expect(res.body.category.id).toBe(category.id)
  
  })


  test("PUT -> 'BASE_URL/:id', should return status code 200, and res.body.title === updateProduct.title", async () => {
    
    const updateProduct = {
      title: 'JBL' 
    }

    const res = await request(app)
       .get(`${BASE_URL}/${productId}`)
       .send(updateProduct) //mandamos updateProduct
       .set('Authorization', `Bearer ${TOKEN}`) //autorizacion dinamica
       
      // console.log(res.body)
    
       expect(res.status).toBe(200) // que retorne status 200 de ok
       expect(res.body).toBeDefined() // que venga definido
       expect(res.body.title).toBe(updateProduct.title) // res.body.title sea igual a updatePurduct.title
    
       expect(res.body.categoryId).toBeDefined() // ya viene definido
       expect(res.body.categoryId).toBe(category.id)
    
    })

    test("DELETE -> 'BASE_URL/id', should return status code 204", async () => {
      
      const res = await request(app)
      .delete(`${BASE_URL}/${productId}`)
      .set('Authorization', `Bearer ${TOKEN}`)

      
     // console.log(res.body)
   
      expect(res.status).toBe(204) // que retorne status 204

    })

      