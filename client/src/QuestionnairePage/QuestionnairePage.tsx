import { Box, Button, Container, Modal, Pagination, Typography, createTheme, styled } from "@mui/material";
import "./QuestionnairePage.css";
import Question from "./Components/Question";
import { randomInt } from "crypto";
import Questions from "../Questions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

interface QuestionType{
    id: number,
    text: string,
    dimensionIdentifier: string
}

interface AnswerType{
    id: number,
    response: number,
    dimension: string
}

const shuffleArray = (array: QuestionType[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


export default function QuestionnairePage(){
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();

//  __________ STATES __________
    const [shuffledQuestions, setShuffledQuestions] = useState<QuestionType[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
    const [answers, setAnswers] = useState<AnswerType[]>([]);
    const [open, setOpen] = useState(false);
    const [submitState, setSubmitState] = useState(false);
    const [popText, setPopText] = useState('');


    useEffect(() => {
        // Shuffle the questions only once when the component mounts
        const shuffled = shuffleArray(Questions);
        setShuffledQuestions(shuffled);
    }, []);


//  __________ HANDELS ___________

    const handleNext = (event: React.ChangeEvent<unknown>) => {
        if (currentQuestionIndex < shuffledQuestions.length)
            setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    const handlePrev = (eveny: React.ChangeEvent<unknown>) => {
        if (currentQuestionIndex > 0)
            setCurrentQuestionIndex(currentQuestionIndex - 1);
    }

    const handleRadioChange = (questionIndex: number, selectedOption: string, q_id: number, dimension: string) => {
        if (questionIndex == shuffledQuestions.length - 1){
            setIsButtonDisabled(false);
        }
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionIndex]: selectedOption,
        }));
        setAnswers((prevAnswers) => [...prevAnswers, 
            {
                id: q_id,
                response: Number(selectedOption),
                dimension: dimension
            }
        ]);
    };

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        if(submitState){
            // ----- Call API Here -----
            const dataTobeSent = {
                userId: Number(localStorage.getItem('id')),
                answers: answers
            }
            axios.post('http://localhost:10000/question/', dataTobeSent).then(response => {
                console.log(response.data);
                navigate('/');
                // axios.get('http://localhost:10000/question/score/' + localStorage.getItem('id')).then(res => {
                //     console.log(res.data);
                // }).catch(err => {
                //     console.log(err);
                // })
            }).catch(error => {
                console.log(error);
            })
        }
        else{
            setOpen(false);
        }
    }

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const answeredQusetions = Object.keys(selectedAnswers).length;
        if(answeredQusetions == shuffledQuestions.length){
            setSubmitState(true);
            setPopText('Thank you for taking this questinnaire.');
            handleOpen();
        }
        else{
            setSubmitState(false);
        }
    }


    return(
        <>
        <div className="quest-page">
            <Container sx={{pt: 5, pb: 5}} maxWidth="md">
                <Typography variant="h4" fontWeight={700} className="title">User Experience Questionnaire</Typography>
                <Typography variant="h6" className="text">
                The following statements ask you to reflect on your experience of engaging with the VR Game.
                For each statement, please use the following scale to indicate what is
                most true for you.
                </Typography>

                <div className="questions-sec">
                    {shuffledQuestions.length > 0 && (
                            <Question 
                            question={shuffledQuestions[currentQuestionIndex].text} 
                            id={currentQuestionIndex}
                            selectedOption={selectedAnswers[currentQuestionIndex] || ''}
                            onChange={(selectedOption: string) => handleRadioChange(currentQuestionIndex, selectedOption, shuffledQuestions[currentQuestionIndex].id, shuffledQuestions[currentQuestionIndex].dimensionIdentifier)} 
                            />
                    )}

                    <div className="btns">
                        <div className="sub-btns">
                            <Button 
                            variant='contained' 
                            fullWidth
                            onClick={handlePrev}
                            disabled={currentQuestionIndex == 0 ? true : false}
                            sx={{ 
                                backgroundColor: (currentQuestionIndex == 0) ? "#4d3359" : "#3E0758",
                                color: (currentQuestionIndex == 0) ? "#d1c7e7" : "#ffffff",
                                "&.Mui-disabled": {
                                    background: "#4d3359",
                                    color: "#d1c7e7" 
                                },
                                "&:hover": {
                                    backgroundColor: (currentQuestionIndex == 0) ? "#4d3359" : "#3E0758",
                                }
                            }}
                            >
                                Previous
                            </Button>
                        </div>
                        <div className="sub-btns">
                            {
                                (currentQuestionIndex < shuffledQuestions.length - 1) ? 
                                (<Button 
                                variant='contained' 
                                style={{backgroundColor:"#3E0758"}} 
                                fullWidth
                                onClick={handleNext}
                                >
                                Next
                                </Button>)
                                :
                                (<Button 
                                variant='contained' 
                                onClick={handleSubmit} 
                                sx={{ 
                                    backgroundColor: isButtonDisabled ? "#4d3359" : "#3E0758",
                                    color: isButtonDisabled ? "#d1c7e7" : "#ffffff",
                                    "&.Mui-disabled": {
                                        background: "#4d3359",
                                        color: "#d1c7e7" 
                                    },
                                    "&:hover": {
                                        backgroundColor: isButtonDisabled ? "#4d3359" : "#3E0758",
                                    }
                                }}
                                fullWidth 
                                disabled={isButtonDisabled}
                                >
                                    Submit
                                </Button>)
                            }
                        </div>
                    </div>
                </div>
            </Container>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} alignItems="center" textAlign={'center'}>
                    <Typography sx={{ mt: 2 }} className="title">
                        {popText}
                    </Typography>
                    {submitState ? <Button variant='outlined' onClick={handleClose} sx={{ mt: 4 }} style={{color:"#3E0758", borderColor:"#3E0758" }} >Done</Button> : null}
                </Box>
            </Modal>
            
        </div>
        </>
    );
}