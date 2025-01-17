import { Box, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Theme, Typography, createTheme } from "@mui/material";
import { useMediaQuery } from '@mui/material';

type Props = {
    id: number,
    question: string,
    selectedOption: string;
    onChange: (selectedOption: string) => void;
}

export default function Question(props: Props){

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange((event.target as HTMLInputElement).value);
    };

    const theme = createTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    return(
            <Card 
            variant="outlined" 
            sx=
            {{ 
                mb: 2, 
                backgroundColor: "transparent", 
                border: '1px solid rgba(62, 7, 88, 0.3)', 
                minWidth: isSmallScreen ? theme.breakpoints.down('md') : 760
            }}
            >
                <CardContent>
                    <Box
                    display="flex"
                    flexDirection="column"
                    alignItems={isSmallScreen ? "flex-start" : "center"} 
                    justifyContent={isSmallScreen ? "flex-start" : "center"} 
                    style={{ minHeight: '200px' }}
                    >
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                                <Typography variant="h6" className="form-label">
                                    {props.id + 1}. {props.question}
                                </Typography>
                            </FormLabel>
                            <Box
                            display="flex"
                            flexDirection="column"
                            alignItems= {isSmallScreen ? "flex-start" : "center"} 
                            justifyContent= {isSmallScreen ? "flex-start" : "center"} 
                            style={{ minHeight: '100px' }}
                            >
                                <RadioGroup 
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    row={!isSmallScreen}
                                    value={props.selectedOption}
                                    onChange={handleChange}
                                    className="radio"
                                >
                                    <FormControlLabel labelPlacement="bottom" value="1" control={<Radio sx={{color: "#543457",'&.Mui-checked': {color: "#3E0758",},}} />} label={<Typography color={"#543457"} textAlign={'center'}>Strongly <br/> disagree</Typography>} />
                                    <FormControlLabel labelPlacement="bottom" value="2" control={<Radio sx={{color: "#543457",'&.Mui-checked': {color: "#3E0758",},}} />} label={<Typography color={"#543457"}>Disagree</Typography>} />
                                    <FormControlLabel labelPlacement="bottom" value="3" control={<Radio sx={{color: "#543457",'&.Mui-checked': {color: "#3E0758",},}} />} label={<Typography color={"#543457"}>Neutral</Typography>} />
                                    <FormControlLabel labelPlacement="bottom" value="4" control={<Radio sx={{color: "#543457",'&.Mui-checked': {color: "#3E0758",},}} />} label={<Typography color={"#543457"}>Agree</Typography>} />
                                    <FormControlLabel labelPlacement="bottom" value="5" control={<Radio sx={{color: "#543457",'&.Mui-checked': {color: "#3E0758",},}} />} label={<Typography color={"#543457"} textAlign={'center'}>Strongly <br/> agree</Typography>} />
                                </RadioGroup>
                            </Box>
                        </FormControl>
                    </Box>
                </CardContent>
            </Card>
    );
}