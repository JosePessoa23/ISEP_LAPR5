import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { UserId } from "./userId";
import { UserEmail } from "./userEmail";
import { Role } from "../domain/role";
import { Guard } from "../core/logic/Guard";
import { PhoneNumber } from "./phoneNumber";


interface UserProps {
  name: string;
  email: UserEmail;
  phoneNumber: PhoneNumber;
  role: Role;
}

export class User extends AggregateRoot<UserProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get userId (): UserId {
    return UserId.caller(this.id)
  }

  get email (): UserEmail {
    return this.props.email;
  }

  get name (): string {
    return this.props.name
  }

  get phoneNumber (): PhoneNumber {
    return this.props.phoneNumber;
  }

  get role (): Role {
    return this.props.role;
  }
  
  set role (value: Role) {
      this.props.role = value;
  }

  set name (value: string) {
    this.props.name = value;
}

set phoneNumber (value: PhoneNumber) {
  this.props.phoneNumber = value;
}

  private constructor (props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: UserProps, id?: UniqueEntityID): Result<User> {

    const guardedProps = [
      { argument: props.name, argumentName: 'nome' },
      { argument: props.email, argumentName: 'email' },
      { argument: props.role, argumentName: 'role' },
      { argument: props.phoneNumber, argumentName: 'phoneNumber' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message)
    }     
    else {
      const user = new User({
        ...props
      }, id);

      return Result.ok<User>(user);
    }
  }
}