const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const TOKEN = "eccd804f-9eea-43c9-8950-6e12073eccf0";

  const { Authorization, authorization } = req.headers;

  let authToken = Authorization ? Authorization : authorization;

  if (!authToken) {
    return res
      .status(401)
      .json({ erro: "Você não tem permissão para acessar esta rota" });
  }

  jwt.verify(authToken, TOKEN, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .json({ auth: false, message: "Falha na autenticação do Token." });

    next();
  });
};

module.exports = { authorization };
