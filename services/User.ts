import {signOut} from "next-auth/react";
import {UserRole} from "@/services/types/User";
import {User as UserInterface} from "@/services/types/User";
import Joi from "joi";
import {Validator} from "@/services/Validator";

export class User {

  static DEFAULT = {
    firstName: '',
    lastName: '',
    role: UserRole.MANAGER,
    email: '',
    password: '',
    confirmPassword: '',
  }

  static onLogout = async () => await signOut();

  static isAdmin = (role: string) => role === UserRole.ADMIN;

  static validate = (user: UserInterface) => {
    return Validator.validate(User.getJoiScheme(), user);
  }

  static validatePass = (user: UserInterface) => {
    return Validator.validate(
      Validator.createScheme(Joi.object({
        password: Joi.string().min(5).max(25).required(),
        confirmPassword: Joi.ref('password')
      }).with('password', 'confirmPassword')),
      user
    );
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
