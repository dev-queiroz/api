const authorize = (allowedTypes) => {
  return (req, res, next) => {
    const userType = req.user.user_type || req.user.enterprise_type;
    if (!allowedTypes.includes(userType)) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
};

module.exports = authorize;
