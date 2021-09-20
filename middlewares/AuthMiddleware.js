const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (!req.header('Authorization')) {
    return res.status(401).send("Unauthorized");
  }

  const [schema, token] = req.header('Authorization').split(' ');
  
  if (schema != 'Bearer' && !token) {
    return res.status(401).send("Unauthorized");
  }
  
  var baseUrl = req.baseUrl;
  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        console.error(error)
        return res.status(400).send("Invalid token");
      }
      
      let user = { ...decoded };
      if (user.role === "user" && baseUrl.includes("products")) {
        return res.status(401).send("Unauthorized");
      }
      req.user = user;

      next();
    });
  } 
  catch (error) {
    console.error(error);
    return res.status(500).send("Indernal server error");
  }
};
