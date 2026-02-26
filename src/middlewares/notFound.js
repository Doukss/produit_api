export default (_req, _res, next) => {
  next(new Error("Route introuvable"));
};