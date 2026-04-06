import jwt from "jsonwebtoken"
import userService from "../services/user.service.js"

const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization)
      return res.status(401).send({ message: "Unauthorized" });

    const parts = authorization.split(" ");
    const [schema, token] = parts;

    if (schema !== "Bearer")
      return res.status(401).send({ message: "Unauthorized" });

    if (parts.length !== 2)
      return res.status(401).send({ message: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return res.status(401).send({ message: "Invalid token"});

      const user = await userService.findById(decoded.id);

      if (!user || !user.id) return res.status(401).send({ message: "Invalid token"});
      req.userId = decoded.id;
      req.user = user;

      return next();
    });

    
  } catch (error) {
    res
      .status(500)
      .send({ message: "There was an error: ", error: error.message });
  }
};

export default authMiddleware;
