const protect = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey && apiKey === process.env.ADMIN_API_KEY) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized, invalid API key');
  }
};

module.exports = { protect };
