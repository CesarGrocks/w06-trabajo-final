const User = require("../../models/User")

const userCreate = async () => {

const user = {
    firstName: "Angus",
    lastName: "Young",
    email: "angus@gmail.com",
    password: "angus1234",
    phone: "+529955555"
}

await User.create(user)

}

module.exports = userCreate