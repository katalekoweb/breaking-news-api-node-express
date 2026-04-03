import userService from "../services/user.service.js";

const create = async (req, res) => {
  // const user = req.body
  // destruct
  try {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name || !username || !email || !password || !avatar || !background) {
      res.status(400).send({ message: "Submit all required fields" });
    }

    const user = await userService.create(req.body);

    if (!user) {
      res.status(400).send({ message: "Error creating user" });
    }

    res.status(201).send({
      message: "User created successful",
      user: {
        id: user._id,
        name,
        username,
        email,
        avatar,
        background,
      },
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "There was an error: ", error: error.message });
  }
};

const findAll = async (req, res) => {
  try {
    const users = await userService.findAll();

    if (users.length === 0) {
      res.status(404).send({ message: "No users found" });
    }

    res.status(200).send({
      users,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "There was an error: ", error: error.message });
  }
};

const findById = async (req, res) => {
  try {
    // const { id } = req.params
    // const id = req. params.id
    const id = req.id;
    const user = req.user;

    res.status(200).send({
      user,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "There was an error: ", error: error.message });
  }
};

const update = async (req, res) => {
  // const id = req.params.id
  try {
    const id = req.id;
    const user = req.user;

    const { name, username, email, password, avatar, background } = req.body;

    if (!name && !username && !email && !password && !avatar && !background) {
      res.status(400).send({ message: "Submit at least one required field" });
    }

    await userService.update(id, req.body);

    res.status(200).send({
      message: "User updated successful",
      user: {
        id: user._id,
        name: name || user.name,
        username: username || user.username,
        email: email || user.email,
        avatar: avatar || user.avatar,
        background: background || user.background,
      },
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "There was an error: ", error: error.message });
  }
};

export default { create, findAll, findById, update };
