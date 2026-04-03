import mongoose from 'mongoose';
import userService from "../services/user.service.js";

export const validateId = (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .send({ message: "Invalid id from the middleware" });
    }

    next();
  } catch (error) {
    res
      .status(500)
      .send({ message: "There was an error: ", error: error.message });
  }
};

export const validateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await userService.findById(id);

    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found from middleware" });
    }

    req.id = id;
    req.user = user;

    next();
  } catch (error) {
    res
      .status(500)
      .send({ message: "There was an error: ", error: error.message });
  }
};