import {signOut} from "next-auth/react";
import {UserRole} from "@/services/types/User";
import Joi from "joi";
import {Validator} from "@/services/Validator";

export class User {

  static onLogout = async () => await signOut();

  static isAdmin = (role: string) => role === UserRole.ADMIN;

  static validate = (user: any) => {
    return Validator.validate(User.getJoiScheme(), user);
  }

  static getJoiScheme = () => {
    return Validator.createScheme(Joi.object({
      firstName: Joi.string().min(1).max(30).required(),
      lastName: Joi.string().min(1).max(30).required(),
      email: Joi.string().email({tlds: {allow: ['com', 'net', 'org']}}).required(),
      role: Joi.string().valid(...Object.values(UserRole)).required()
    }))
  }
}
