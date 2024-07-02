//controller
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const createUser = async (req: Request, res: Response) => {
    const userData = req.body;
    try {
      // const parsedId = parseInt(userData.age);
     
      if(!userData.firstName || !userData.lastName) {
        throw new Error('Missing required data');
      }
      else{
        const newUser = await prisma.user.create({
          data: userData,
        });
        res.status(201).json({userId: newUser.userId });
      } 
    } catch (error:any) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'An error occurred while creating user' });
    } finally {
      await prisma.$disconnect();
    }
};


export const getUser = async ( req: Request , res: Response) => {

}