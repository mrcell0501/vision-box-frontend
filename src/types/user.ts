export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
};

export enum UserRole {
  ADMIN = "ADMIN",
  DEVELOPER = "DEVELOPER",
}
