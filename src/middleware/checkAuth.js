import jwt from "jsonwebtoken";

import { secretKey } from "../config/default.js";

export default (request, response, next) => {
  if (request.method === "OPTIONS") {
    next();
  }

  const token = (request.headers.authorization || "").replace(/Bearer\s?/, ""); //split(' ')[1]

  if (token) {
    try {
      const decoded = jwt.verify(token, secretKey);

      request.userId = decoded._id;
      next();
    } catch (error) {
      return response.status(401).json({
        message: "No access!",
      });
    }
  } else {
    return response.status(403).json({
      message: "No access!",
    });
  }
};
