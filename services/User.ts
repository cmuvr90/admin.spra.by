import type {User as AuthUser} from "next-auth";
import {signOut} from "next-auth/react";
import {UserRole} from "@/services/types";

export class User {
  private user;

  constructor(user: AuthUser) {
    this.user = user;
  }

  getRole = (): string => this.user.role;

  getEmail = (): string => this.user.email;

  onLogout = async () => await signOut();

  isAdmin = () => this.getRole() === UserRole.ADMIN;
}
