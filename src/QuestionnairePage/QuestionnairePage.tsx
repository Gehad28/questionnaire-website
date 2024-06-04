import { Box, Button, Container, Modal, Pagination, Typography } from "@mui/material";
import "./QuestionnairePage.css";
import Question from "./Components/Question";
import { randomInt } from "crypto";
import Questions from "../Questions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


interface QuestionType{
    id: number,
    text: string,
    dimensionIdentifier: string
}

const shuffle = (array: any) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


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

    const [shuffledQuestions, setShuffledQuestions] = useState<QuestionType[]>([]);
    useEffect(() => {
        // Shuffle the questions only once when the component mounts
        const shuffled = shuffle(Questions);
        setShuffledQuestions(shuffled);
    }, []);

    const [page, setPage] = useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
    const handleRadioChange = (questionIndex: number, selectedOption: string) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionIndex]: selectedOption,
        }));
    };

    const [open, setOpen] = useState(false);
    const [submitState, setSubmitState] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        if(submitState){
            navigate('/');
            // ----- Call API Here -----
        }
        else{
            setOpen(false);
        }
    }


    const [popText, setPopText] = useState('');
    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const answeredQusetions = Object.keys(selectedAnswers).length;

        if(answeredQusetions == shuffledQuestions.length){
            setSubmitState(true);
            setPopText('Thank you for taking this questinnaire.');
            handleOpen();
        }
        else{
            setSubmitState(false);
            setPopText('Please answer all questions before proceeding.');
            handleOpen();
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
                            question={shuffledQuestions[page - 1].text} 
                            id={page - 1}
                            selectedOption={selectedAnswers[page - 1] || ''}
                            onChange={(selectedOption: string) => handleRadioChange(page - 1, selectedOption)} 
                            />
                    )}
                    <Pagination
                        count={shuffledQuestions.length}
                        variant="outlined"
                        color="secondary"
                        page={page}
                        onChange={handleChange}
                        className="pagination"
                    />

                    <div className="sub-button">
                        <Button variant='contained' onClick={handleSubmit} sx={{ mt: 4 }} style={{backgroundColor:"#3E0758"}} fullWidth >Submit</Button>
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