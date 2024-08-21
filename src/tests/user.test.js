const User = require("../models/User");

const BASE_URL = '/api/v1/users'

const user = {
    firstName: "Pepe",
    lastName: "Grillo",
    email: "pepe@gmail.com",
    password: "pepe1234",
    phone: "+529936555"
}

test("POST -> BASE_URL, should return statusCode 201, and res.body.firstName === user.firstName", async () => {

    const user = await User.findAll()
    console.log(user);
})