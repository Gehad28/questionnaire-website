import "./HomePage.css";
import { Button, Typography } from '@mui/material';

export default function Header(){
    return(
        <>
        <div className='header-bg'></div>

        <div className='header-text'>
            <div className='col1'></div>
            <div className='text'>
                <Typography variant='h2' fontWeight={700} >Engagement Questinnaire</Typography>
                <Button variant='outlined' sx={{ mt: 3 }} className='button' >Take the Questionnaire</Button>
            </div>
        </div>
        </>
    );
}