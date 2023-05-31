import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import {IUserDTO} from "../dto/IUserDTO";

import { User } from "../domain/user";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { UserEmail } from "../domain/userEmail";
import { Role } from "../domain/role";

import { PhoneNumber } from '../domain/phoneNumber';

export class UserMap extends Mapper<User> {

  public static toDTO( user: User): IUserDTO {
    return {
      //id: user.id.toString(),
      name: user.name,
      email: user.email.value,
      phoneNumber: user.phoneNumber.value,
      role: user.role.name
    } as IUserDTO;
  }

  public static async toDomain (raw: any): Promise<User> {
    const userEmailOrError = UserEmail.create(raw.email);
    const phoneNumberOrError = PhoneNumber.create(raw.phoneNumber);
    const role = Role.create(raw.role);

    const userOrError = User.create({
      name: raw.name,
      email: userEmailOrError.getValue(),
      phoneNumber: phoneNumberOrError.getValue(),
      role: role.getValue(),
    }, new UniqueEntityID(raw.domainId))

    userOrError.isFailure ? console.log(userOrError.error) : '';
    
    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  public static toPersistence (user: User): any {
    const a = {
      domainId: user.id.toString(),
      email: user.email.value,
      name: user.name,
      phoneNumber: user.phoneNumber.value,
      role: user.role.name,
    }
    return a;
  }
}