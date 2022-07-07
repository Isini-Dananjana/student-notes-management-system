const jwt = require("jsonwebtoken");

let verifyToken = function(req,res,next){

    //checking the token 
    let token = req.headers["token"];
    if (!token) {
      return res.status(403).send({ message: "Unauthorized12!" });
    }

    jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });

};

module.exports = verifyToken