import { Result } from "../../core/logic/Result";
import { IUserDTO } from "../../dto/IUserDTO";

export default interface IUserService  {
  signUp(userDTO: IUserDTO): Promise<Result<IUserDTO>>;
  SignIn(email: string): Promise<Result<{ userDTO: IUserDTO, token: string }>>;
  getUsers(): Promise<Result<IUserDTO[]>>;
  getUserByEmail(email: string): Promise<Result<IUserDTO>>;
  updateUser(userDTO: IUserDTO): Promise<Result<IUserDTO>> 
}
