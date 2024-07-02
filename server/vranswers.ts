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
const directoryPath = '/path';  //csv paths

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
                let postEmailData: any[] = [];

                await new Promise<void>((resolve, reject) => {
                    fs.createReadStream(filePath)
                        .pipe(csvParser())
                        .on('data', (row: any) => {
                            rowCount++;
                            // Check if the row is for email
                            if (rowCount === 31) {
                                email = row.Question.trim(); // Assuming email is in 'Question' field
                                console.log(`Found email: ${email}`);
                            } else if (rowCount > 31 && rowCount <= 38) {
                                // Store 6 rows below email
                                postEmailData.push({
                                    name: row.id,
                                    value: row.Question
                                });
                            } else if (rowCount < 32) {
                                // Store answers until row 32
                                answers.push({
                                    id: row.id,
                                    Question: row.Question,
                                    dimension: row.dimension,
                                    Answer: parseInt(row.Answer)
                                });
                            }
                        })
                        .on('end', async () => {
                            if (email) {
                                // Process stored answers
                                // console.log(`Email found. Processing answers for ${email}`);
                                // await saveAnswers(email, answers);

                                await savePostEmailData(email, postEmailData);

                            } else {
                                console.log(`Email not found in ${file} within first 32 rows. Skipping processing.`);
                            }
                            // console.log(`CSV file ${file} processed successfully.`);
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
                        question: null                        
                    }
                });

                console.log(`Answer updated for question ${answer.id} for user ${user.userId}`);
            }
        }

    } catch (error) {
        console.error(`Error saving answers for user ${user.userId}:`, error);
    }
}


async function savePostEmailData(email: string, postEmailData: any[]) {
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
        // Initialize variables to store parsed data
        let firstTimer: number | null = null;
        let secondTimer: number | null = null;
        let thirdTimer: number | null = null;
        let mistakes: number | null = null;
        let voiceScore: number | null = null;
        let signScore: number | null = null;
        // console.log(postEmailData);

        // Map and parse each item in postEmailData
        postEmailData.forEach(item => {
            // console.log(item);
            // Split name by space to separate dimension and value
            const parts = item.name.split(' ');
            const dimensionName = parts[0].toLowerCase(); // Assuming first part is dimension name
            console.log(dimensionName);
            if (item.value != undefined){
                let value = item.value.trim(); // Trim whitespace from value

            switch (dimensionName) {
                case 'first':
                    firstTimer = parseFloat(value);
                    break;
                case 'second':
                    secondTimer = parseFloat(value);
                    break;
                case 'third':
                    if (parts.length > 1) {
                        thirdTimer = parseFloat(parts.slice(1).join(' '));  
                    }
                    break;
                case 'mistakes':
                    mistakes = parseInt(value);
                    break;
                case 'score':
                    if (parts.length > 2) {
                        const scoreType = parts.slice(2).join(' ').toLowerCase();
                        if (scoreType === 'voices') {
                            voiceScore = parseInt(value);
                        } else if (scoreType === 'signs') {
                            signScore = parseInt(value);
                        }
                    }
                    break;
                default:
                    break;
            }
            // console.log("first timer: ", firstTimer, "2nd timer: ", secondTimer, "3rd timer: ", thirdTimer, "mistakes ", mistakes, "voice: ", voiceScore, "signs: ", signScore  )
    }});
        console.log("first timer: ", firstTimer, "2nd timer: ", secondTimer, "3rd timer: ", thirdTimer, "mistakes ", mistakes, "voice: ", voiceScore, "signs: ", signScore  )

        const score = await prisma.vrScores.create({
            data: {
                userId: user.userId,
                firstTimer: firstTimer,
                secondTimer: secondTimer,
                thirdTimer: thirdTimer,
                mistakes: mistakes,
                voiceScore: voiceScore,
                signScore: signScore
            }
        });

        console.log(`Scores updated for user ${user.userId}.`);
    } catch (error) {
        console.error(`Error saving scores for user ${user.userId}:`, error);
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
