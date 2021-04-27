import { authenticateToken } from "../utils/utils";
import { NextFunction, Response } from "express";
import { CustomRequest } from "../utils/types";

export const isAuth = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).send({ message: "access denied" });
  const { userId, role } = authenticateToken(token);
  console.log(role);
  if (!userId) {
    res.status(403);
  }
  req.user = { userId, role };
  next();
};
