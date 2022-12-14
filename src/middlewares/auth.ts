import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AuthConfig from '../config/auth.json';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export default module.exports = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;


    if(!authHeader){
        return res.status(401).send({ error: "No token provided" });
    }


    const parts = authHeader.split(' ');

    if(!(parts.length == 2)){
        return res.status(401).send({ error: "Token error" });
    }


    const [ scheme, token ] = parts;


    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({ error: "Token malformated" })
    }


    jwt.verify(token, AuthConfig.secret, (err, decoded) => {
        if(err){
            return res.status(401).send({ error: 'Token Invalid' });
        }

        return next();
    });


};