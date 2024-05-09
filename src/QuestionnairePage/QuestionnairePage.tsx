import { Box, Button, Container, Typography } from "@mui/material";
import "./QuestionnairePage.css";
import Question from "./Components/Question";
import { randomInt } from "crypto";
import Questions from "../Questions";
import { useEffect } from "react";

const shuffle = (array: any) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

export default function QuestionnairePage(){
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    const inputs = [];
    shuffle(Questions);
    for(let i = 0; i < 30; i++){
        inputs.push(<Question question={Questions[i].text} id={i+1}></Question>)
    }

    return(
        <>
        <div className="quest-page">
            <Container sx={{pt: 5, pb: 5}} maxWidth="md">
                <Typography variant="h4" className="title">Questionnaire</Typography>
                <Typography variant="h6" className="text">
                The following statements ask you to reflect on your experience of engaging with the VR Game.
                For each statement, please use the following scale to indicate what is
                most true for you.
                </Typography>

                {inputs}

                <div className="sub-button">
                    <Button variant='contained' type="submit" sx={{ mt: 3 }} style={{backgroundColor:"#3E0758"}} fullWidth >Submit</Button>
                </div>
            </Container>
            
        </div>
        </>
    );
}