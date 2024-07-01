import csvParser from 'csv-parser';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';

interface CSVRow {
    id: string;
    Question: string;
    dimension: string;
    Answer: number;
}

const prisma = new PrismaClient();
const directoryPath = 'G:/SBME/Fourth Year/Graduation Project/Vr Questionnaire/CSVFiles/try';

async function processCSVFiles(directory: string) {
    fs.readdir(directory, async (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        for (const file of files) {
            if (file.endsWith('.csv')) {
                const filePath = `${directory}/${file}`;
                let email: string | null = null;
                const answers: any[] = [];
                let rowCount = 0;

                await new Promise<void>((resolve, reject) => {
                    fs.createReadStream(filePath)
                        .pipe(csvParser())
                        .on('data', (row: any) => {
                            if (rowCount < 31) {
                                rowCount++;
                                if (row.id === 'email') {
                                    email = row.Question.trim(); 
                                    console.log(`Found email: ${email}`);
                                } else {
                                    answers.push({
                                        id: row.id,
                                        Question: row.Question,
                                        dimension: row.dimension,
                                        Answer: parseInt(row.Answer) 
                                    });
                                }
                            }
                        })
                        .on('end', async () => {
                            if (email) {
                                // Process stored answers
                                console.log(`Email found. Processing answers for ${email}`);
                                await saveAnswers(email, answers);
                            } else {
                                console.log(`Email not found in ${file} within first 32 rows. Skipping processing.`);
                            }
                            console.log(`CSV file ${file} processed successfully.`);
                            resolve();
                        })
                        .on('error', (err) => {
                            console.error(`Error reading CSV file ${file}:`, err);
                            reject(err);
                        });
                });
            }
        }
    });
}
async function saveAnswers(email: string, answers: any[]) {
    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    });

    if (!user) {
        console.log(`User with email ${email} not found in database. Answers will not be saved.`);
        return;
    }

    try {
        for (const answer of answers) {
            const existingAnswer = await prisma.answer.findFirst({
                where: {
                    userId: user.userId,
                    questionId: parseInt(answer.id),
                    dimension:answer.dimension
                }
            });

            if (existingAnswer) {
                await prisma.answer.update({
                    where: {
                        id: existingAnswer.id 
                    },
                    data: {
                        vr_response: parseInt(answer.Answer),
                        question: answer.question                        
                    }
                });

                console.log(`Answer updated for question ${answer.id} for user ${user.userId}`);
            }

            console.log(`Answer saved for question ${answer.id} for user ${user.userId}`);
        }

        console.log(`All answers saved successfully for user ${user.userId}`);
    } catch (error) {
        console.error(`Error saving answers for user ${user.userId}:`, error);
    }
}

async function main() {
    try {
        await prisma.$connect();
        await processCSVFiles(directoryPath);
    } catch (error) {
        console.error('Error during script execution:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
