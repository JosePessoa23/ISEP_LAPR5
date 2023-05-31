
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { ValueObject } from "../core/domain/ValueObject";

import { Result } from "../core/logic/Result";



interface RoleProps {
  name: string;
}

export class Role extends ValueObject<RoleProps> {

  get name (): string {
    return this.props.name;
  }

  private constructor (props: RoleProps) {
    super(props);
  }

  public static create (role: string): Result<Role> {
    const name = role;

    if (name != 'Admin' && name != 'GA' && name != 'GF' && name != 'GL' && name != "empty") {
      return Result.fail<Role>('Must provide a role name')
    } else {
      const role = new Role({ name: name });
      return Result.ok<Role>( role )
    }
  }
}
