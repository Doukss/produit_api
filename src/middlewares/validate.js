import { HttpError } from "../utils/httpError.js";

export const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false
  });

  if (error) {
    return next(
      new HttpError(
        422,
        "VALIDATION_ERROR",
        error.details.map(d => d.message).join(", ")
      )
    );
  }

  req.body = value;
  next();
};