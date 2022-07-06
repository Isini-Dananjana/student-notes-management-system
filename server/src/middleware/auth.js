const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const accessTokenSecret = "tokensecret";
  const token = req.header("authorization");

  //check for token

  if (!token) {
    res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    //verify token
    const decoded = jwt.verify(token, "jwtSecret");
    //Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token not valid" });
  }
}
module.exports = auth;
