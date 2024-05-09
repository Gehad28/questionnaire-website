import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa1 } from '@fortawesome/free-solid-svg-icons';

import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";

type Props = {
    id: number,
    question: string,
}

export default function Question(props: Props){
    console.log(props.id);
    return(
        <div className="question">
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                    <Typography variant="h6" className="text">
                        {props.id}. {props.question}
                    </Typography>
                </FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    row
                >
                    <FormControlLabel labelPlacement="bottom" value="1" control={<Radio sx={{color: "#543457",'&.Mui-checked': {color: "#3E0758",},}} />} label={<Typography color={"#543457"}>Strongly disagree</Typography>} />
                    <FormControlLabel labelPlacement="bottom" value="2" control={<Radio sx={{color: "#543457",'&.Mui-checked': {color: "#3E0758",},}} />} label={<Typography color={"#543457"}>Disagree</Typography>} />
                    <FormControlLabel labelPlacement="bottom" value="3" control={<Radio sx={{color: "#543457",'&.Mui-checked': {color: "#3E0758",},}} />} label={<Typography color={"#543457"}>Neutral</Typography>} />
                    <FormControlLabel labelPlacement="bottom" value="4" control={<Radio sx={{color: "#543457",'&.Mui-checked': {color: "#3E0758",},}} />} label={<Typography color={"#543457"}>Agree</Typography>} />
                    <FormControlLabel labelPlacement="bottom" value="5" control={<Radio sx={{color: "#543457",'&.Mui-checked': {color: "#3E0758",},}} />} label={<Typography color={"#543457"}>Strongly agree</Typography>} />
                </RadioGroup>
            </FormControl>
        </div>
    );
}