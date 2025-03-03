export interface IUser {
    id: string;
    name: string;
    email: string;
    role: "customer" | "admin";
    iat?: number;
    exp?: number;
  }