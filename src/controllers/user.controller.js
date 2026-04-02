const { json } = require("express")

const create = (req, res) => {
    // const user = req.body
    // destruct
    const { name, username, email, password, avatar, background } = req.body

    if (!name || !username || !email || !password || !avatar || !background ) {
        res.status(400).send({message: "Submit all required fields"})
    }

    // console.log(user);    

    res.status(201).send({
        user: {
            name,
            username,
            email,
            avatar,
            background
        },
        message: "User created successful"
    })
}

module.exports = {create}