import { UserRole } from ".prisma/client";
import { Request } from "express";

export type CustomRequest = Request & {
  user?: { userId: string; role: UserRole };
};
