import { UserGender } from "../../enums/userEnums";

export interface IUserSearchRequest {
  all?: string[];
  gender: UserGender
  status: string;
}

