const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json("Access denied");

  try {
    const token = authHeader.split(" ")[1];

    if (!token)
      return res.status(401).json("Token missing");

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (verified.role !== "admin")
      return res.status(403).json("Admin only");

    req.user = verified;
    next();

  } catch (err) {
    console.log("JWT ERROR:", err.message);
    res.status(400).json("Invalid token");
  }
};
