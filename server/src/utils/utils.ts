import { UserRole } from "@prisma/client";
import { sign, verify } from "jsonwebtoken";

const { TOKEN_SECRET } = process.env;

export const generateToken = (id: string, role: UserRole): string => {
  return sign({ userId: id, role: role }, TOKEN_SECRET, { expiresIn: "3d" });
};

export const authenticateToken = (
  token: string
): { userId: string; role: UserRole } => {
  return verify(token, TOKEN_SECRET) as { userId: string; role: UserRole };
};
