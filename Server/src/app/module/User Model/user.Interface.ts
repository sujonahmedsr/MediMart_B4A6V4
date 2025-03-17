export interface userInterface {
    name: string,
    email: string,
    password: string,
    role: "admin" | "customer",
    isBlocked: boolean,
    phone?: string;
    address?: string;
    city?: string;
    image?: string
}

export interface loginInterface {
    email: string,
    password: string
}