import { Request, Response, NextFunction } from "express";

export default interface IUserController  {
    signUp(req: Request, res: Response, next: NextFunction);
    signIn(req: Request, res: Response, next: NextFunction);
    getUsers(req: Request, res: Response, next: NextFunction);
    getUserByEmail(req: Request, res: Response, next: NextFunction);
    updateUser(req: Request, res: Response, next: NextFunction)
}