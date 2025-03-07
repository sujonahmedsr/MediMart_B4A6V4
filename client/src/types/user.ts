export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  address: string | null;
  city: string | null;
  image: string | null;
  isBlocked: false;
  phone: string | null
}