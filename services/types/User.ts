import {Brand} from "@/services/types/Brand";

export interface User {
  id?: string,
  firstName: string,
  lastName: string,
  email: string,
  role: UserRole,
  createdAt?: string,
  updatedAt?: string,
  brands?: Brand[]
  password?: string
  confirmPassword?: string
}

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager'
}
