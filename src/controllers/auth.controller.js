import bcrypt from "bcrypt";
import authService from "../services/auth.service.js";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authService.findByEmail(email);

    if (!user) return res.status(404).send({message: "Invalid user or password"});

    const passwordIsValid = bcrypt.compareSync(password, user.password); // assincrono, o campareSync e sincrono retorna uma promise, entao precisamos usar await para esperar a resposta

    if (!passwordIsValid) return res.status(404).send({message: "Invalid user or password"});

    // aunthentication successful, return user data without password

    res.send("Login Ok");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao fazer login", error: error.message });
  }
};

export default { login };
