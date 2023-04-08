const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
// const { authorization } = require("./services/authorization");

const TOKEN = "eccd804f-9eea-43c9-8950-6e12073eccf0";

const PORT = process.env.PORT || 3001;

const server = express();

server.use(cors());

server.use(express.json());

server.get("/", (req, res) => {
  return res.json({
    message: "API Mock - App saúde!!!😉",
    auth: {
      url: "https://api-products-dh-next.vercel.app/auth",
      method: "POST",
      body: {
        email: "example@example.com",
        password: "123",
      },
    },
    info: {
      rotas_privadas: {
        msg: "Para as rotas privadas enviar o atributo `Authorization` com o token do usuário junto ao header da requisição",
      },
    },
  });
});

//auth
server.post("/auth", async (req, res) => {
  const { email, password } = req.body;

  const token = jwt.sign(
    {
      expiresIn: "365d",
    },
    TOKEN
  );

  if (!email || !password) {
    return res
      .status(403)
      .json({ message: "Email and password values are required" });
  }

  if (email === "teste@teste.com" && password === "123456") {
    return res.status(200).json({
      name: "Jhon Doe",
      email,
      token,
    });
  }

  return res.status(400).json({ message: "Invalid email or password" });
});

server.listen(PORT, () =>
  console.log("Servidor iniciado em http://localhost:" + PORT)
);
