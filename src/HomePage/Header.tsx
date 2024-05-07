import "./HomePage.css";
import { Button, Typography } from '@mui/material';


interface HeaderProps {
    onButtonClick: () => void;
}


export default function Header({ onButtonClick }: HeaderProps){
    return(
        <>
        <div className='header-bg'></div>

        <div className='header-text'>
            <div className='col1'></div>
            <div className='text'>
                <Typography variant='h2' fontWeight={700} >User Engagement Questinnaire</Typography>
                <Button variant='outlined' sx={{ mt: 3 }} className='button' onClick={onButtonClick}>
                    Take the Questionnaire
                </Button>
            </div>
        </div>
        </>
    );
}