import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const saveAnswers = async (req: Request, res: Response) => {
  const { userId, answers } = req.body;

  if (!userId || !Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  try {
    const user = await prisma.user.findUnique({ 
        where: { userId } 
    });

    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const answerData = answers.map((answer: { id: number; response: number; dimension: string }) => ({
      userId,
      questionId: answer.id,
      dimension: answer.dimension,
      response: answer.response,
    }));

    const savedAnswers = await prisma.answer.createMany({
        data: answerData 
    });

    res.status(201).json({ message: 'Answers saved successfully', savedAnswers });
  } catch (error: any) {
    console.error('Error saving answers:', error);
    res.status(500).json({ error: 'An error occurred while saving answers' });
  } finally {
    await prisma.$disconnect();
  }
};


export const calculateDimensionAverages = async (req: Request, res: Response) => {
  try {
    // const { userId, answers } = req.body;
    const { userId } = req.params;

    // if (!userId || !Array.isArray(answers) || answers.length === 0) {
    //   return res.status(400).json({ error: 'Invalid input data' });
    // }
    const parsedUserId = parseInt(userId);
    if (isNaN(parsedUserId)) {
      throw new Error('Invalid userId format. Must be an integer.');
    }

    const userAnswers = await prisma.answer.findMany({
      where: { userId : parsedUserId },
    });

    // Group answers by dimension
    const answersByDimension: Record<string, number[]> = {};
    userAnswers.forEach((answer) => {
      if (!answersByDimension[answer.dimension]) {
        answersByDimension[answer.dimension] = [];
      }
      answersByDimension[answer.dimension].push(answer.response);
    });

    // Calculate average response for each dimension
    const dimensionAverages: Record<string, number> = {};
    Object.entries(answersByDimension).forEach(([dimension, responses]) => {
      const totalResponses = responses.length;
      const totalSum = responses.reduce((sum, response) => sum + response, 0);
      dimensionAverages[dimension] = totalSum / totalResponses;
    });

    let totalDimensionAverage = 0;
    Object.values(dimensionAverages).forEach((average) => {
        totalDimensionAverage += average;
    });

    res.status(201).json({ message: 'Answers saved successfully', dimensionAverages, totalDimensionAverage });
  } catch (error) {
    console.error('Error calculating dimension averages:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

