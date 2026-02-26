export default (err, req, res, _next) => {
  res.status(err.status || 500).json({
    success: false,
    error: {
      code: err.code || "INTERNAL_ERROR",
      message: err.message,
      details: err.details,
    },
  });
};