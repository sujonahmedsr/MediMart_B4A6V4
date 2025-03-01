export type TgenericErrorResponse = {
  statusCode: number,
  message: string,
  error: TerrorSourcres
}

export type TerrorSourcres = {
  path: string | number,
  message: string
}[]

export type Tuser = {
  id: string
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  phone?: string;
  address?: string;
  city?: string;
  createdAt: Date;
  updatedAt: Date;
}