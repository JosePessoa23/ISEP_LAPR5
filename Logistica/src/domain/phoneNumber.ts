import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";

interface PhoneNumberProps {
  value: number;
}

export class PhoneNumber extends ValueObject<PhoneNumberProps> {
  get value (): number {
    return this.props.value;
  }

  
  private constructor (props: PhoneNumberProps) {
    super(props);
  }

  public static create (phoneNumber: number): Result<PhoneNumber> {
    const guardResult = Guard.againstNullOrUndefined(phoneNumber, 'phone number');
    if (!guardResult.succeeded || phoneNumber.toString().length != 9) {
      return Result.fail<PhoneNumber>(guardResult.message);
    } else {
      return Result.ok<PhoneNumber>(new PhoneNumber({ value: phoneNumber}))
    }
  }
}