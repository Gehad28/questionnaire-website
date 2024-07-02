import { Request, Response, response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const saveAnswers = async (req: Request, res: Response) => {
  const { userId, answers } = req.body;

  if (!userId || !Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  try {
    const parsedId = parseInt(userId)
    const user = await prisma.user.findUnique({ 
        where: { 
          userId: parsedId 
        }
    });

    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const answerData = answers.map((answer: { id: number; response: number; dimension: string }) => ({
      userId: parsedId,
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
    const { userId } = req.params;

    const parsedUserId = parseInt(userId);
    if (isNaN(parsedUserId)) {
      throw new Error('Invalid userId format. Must be an integer.');
    }

    const userAnswers = await prisma.answer.findMany({
      where: { userId : parsedUserId },
    });

    // Group answers by dimension
    const rehaAnswers: Record<string, number[]> = {};
    const vrAnswers: Record<string, number[]> = {};

    
    userAnswers.forEach((answer) => {
      if (!rehaAnswers[answer.dimension]) {
        rehaAnswers[answer.dimension] = [];
        vrAnswers[answer.dimension] = [];
      }
      //Reverse some answers
      if (((answer.dimension == "PU") && (answer.questionId != 13)) || ((answer.dimension == "RW") && (answer.questionId ==22))){
        const rehacomScore = Math.abs(answer.response - 6)
        rehaAnswers[answer.dimension].push(rehacomScore);

        if(answer.vr_response){
          const VrScore = Math.abs(answer.vr_response - 6)
          vrAnswers[answer.dimension].push(VrScore);
        }
      }
      else{
        rehaAnswers[answer.dimension].push(answer.response);
        if(answer.vr_response){
          const VrScore = Math.abs(answer.vr_response)
          vrAnswers[answer.dimension].push(VrScore);
        }
      }
    });

    // Calculate average response for each dimension
    const reha_dimensionAverages: Record<string, number> = {};
    const VR_dimensionAverages: Record<string, number> = {};

    Object.entries(rehaAnswers).forEach(([dimension, responses]) => {
      const totalResponses = responses.length;
      const totalSum = responses.reduce((sum, response) => sum + response, 0);
      reha_dimensionAverages[dimension] = totalSum / totalResponses;
    });

    // console.log(reha_dimensionAverages["PU"]);
    Object.entries(vrAnswers).forEach(([dimension, responses]) => {
     
      const totalResponses = responses.length;
      const totalSum = responses.reduce((sum, response) => sum + response, 0);
      
      VR_dimensionAverages[dimension] = totalSum / totalResponses;
    });

    let reha_totalDimensionAverage = 0;
    Object.values(reha_dimensionAverages).forEach((average) => {
      reha_totalDimensionAverage += average;
    });

    let VR_totalDimensionAverage = 0;
    Object.values(VR_dimensionAverages).forEach((average) => {
      VR_totalDimensionAverage += average;
    });

    const uesScore = await prisma.uesScores.create({
      data: {
        userId: parsedUserId, 
        VR_FA: VR_dimensionAverages["FA"],
        VR_RW: VR_dimensionAverages["RW"],
        VR_AE: VR_dimensionAverages["AE"],
        VR_PU: VR_dimensionAverages["PU"],
        vVR_total: VR_totalDimensionAverage,
      
        reha_FA: reha_dimensionAverages["FA"],
        reha_RW: reha_dimensionAverages["RW"],
        reha_AE: reha_dimensionAverages["AE"],
        reha_PU: reha_dimensionAverages["PU"],
        reha_total: reha_totalDimensionAverage,
      }
    });

    res.status(201).json({ message: 'Answers saved successfully', reha_dimensionAverages, reha_totalDimensionAverage, VR_dimensionAverages, VR_totalDimensionAverage });
  } catch (error) {
    console.error('Error calculating dimension averages:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

