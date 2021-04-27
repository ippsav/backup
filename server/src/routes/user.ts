import { User } from ".prisma/client";
import * as express from "express";
import { body, validationResult } from "express-validator";
import { prisma } from "../client/PrismaClient";
import { generateToken } from "../utils/utils";

const route = express.Router();

route.post(
  "/",
  body("username").isLength({ min: 4 }),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(405).send({
        errors,
      });
    const { username, password }: User = req.body;
    let user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (user)
      return res.status(400).send({ message: "User already registered" });
    user = await prisma.user.create({
      data: {
        password,
        username,
      },
    });
    const token = generateToken(user.id, user.role);
    return res.json({ user, token });
  }
);
route.get(
  "/",
  body("username").isLength({ min: 4 }),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(405).send({
        errors,
      });
    const { username, password }: User = req.body;
    let user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) return res.status(400).send({ message: "User not found" });
    if (user.password != password)
      return res.status(401).send({ message: "wrong password" });
    const token = generateToken(user.id, user.role);
    return res.json({ user, token });
  }
);

export default route;
