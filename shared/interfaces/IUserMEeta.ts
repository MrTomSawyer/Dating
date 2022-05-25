import { SexualPreferance, UserGender, UserRoles } from "../enums/userEnums";

export interface IUserMeta {
  all: number;
  gender: UserGender;
  sexualPreferance: SexualPreferance;
  role: UserRoles;
  isBanned?: boolean;
}

/**
 * @typedef IUserMeta
 * @property {integer} all.required - All Users count
 * @property {string} gender - User gender - eg: MALE
 * @property {string} sexualPreferance - User sexual preferance - eg: GAY
 * @property {boolean} isBanned - If current account is banned or not - eg: false
 * @property {string} role - User gender - eg: USER
 */
