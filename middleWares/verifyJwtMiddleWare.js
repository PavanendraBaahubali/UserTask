const jwt = require("jsonwebtoken");

const verifyJwtMiddleWare = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const secretKey = process.env.SECRETKEY;
  try {
    if (!authHeader) {
      return res
        .status(404)
        .json({ message: "No token found in the authorization header" });
    }
    // extracting the token from bearer token by spliting
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Unauthorized or token not valid" });
      }
      // if there was no error, then control will go to controller.
      next();
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = verifyJwtMiddleWare;
