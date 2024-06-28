import { Box, Button, Container, CssBaseline, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Theme, ThemeProvider, Typography, colors, createTheme, outlinedInputClasses, useTheme } from "@mui/material";
import "../HomePage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const customTheme = (outerTheme: Theme) =>
    createTheme({
      palette: {
        mode: outerTheme.palette.mode,
      },
      components: {
        MuiTextField: {
          styleOverrides: {
            root: {
              '--TextField-brandBorderColor': '#E0E3E7',
              '--TextField-brandBorderHoverColor': '#3E0758',
              '--TextField-brandBorderFocusedColor': '#3E0758',
              '& label':{ color: '#69436c'},
              '& label.Mui-focused': {
                color: 'var(--TextField-brandBorderFocusedColor)',
              },
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            notchedOutline: {
              borderColor: 'var(--TextField-brandBorderColor)',
            },
            root: {
              [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: 'var(--TextField-brandBorderHoverColor)',
              },
              [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: 'var(--TextField-brandBorderFocusedColor)',
              },
            },
          },
        },
        MuiFilledInput: {
          styleOverrides: {
            root: {
              '&::before, &::after': {
                borderBottom: '2px solid var(--TextField-brandBorderColor)',
              },
              '&:hover:not(.Mui-disabled, .Mui-error):before': {
                borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
              },
              '&.Mui-focused:after': {
                borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
              },
            },
          },
        },
        MuiInput: {
          styleOverrides: {
            root: {
              '&::before': {
                borderBottom: '2px solid var(--TextField-brandBorderColor)',
              },
              '&:hover:not(.Mui-disabled, .Mui-error):before': {
                borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
              },
              '&.Mui-focused:after': {
                borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
              },
            },
          },
        },
      },
    });

export default function RegistrationForm(){
    const outerTheme = useTheme();
    const [fname, setFName] = useState("");
    const [fnameError, setFNameError] = useState(false);
    const [lname, setLName] = useState("");
    const [lnameError, setLNameError] = useState(false);
    const[age, setAge] = useState("");

    const navigate = useNavigate();

    const handleFNameChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setFName(e.target.value);
      if(e.target.validity.valid){
        setFNameError(false);
      }
      else{
        setFNameError(true);
      }
    }

    const handleLNameChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setLName(e.target.value);
      if(e.target.validity.valid){
        setLNameError(false);
      }
      else{
        setLNameError(true);
      }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if(!fnameError && !lnameError){
        const data = new FormData(event.currentTarget);

        // ----- Call API Here -----
        const dataTobeSent = {
          "firstName": data.get('fname'),
          "lastName": data.get('lname'),
          "email": data.get('email'),
          "phoneNumber": data.get('phone'),
          "gender": data.get('gender'),
          "age": data.get('age')
        }

        axios.post('http://localhost:10000/user/', dataTobeSent).then(response => {
          localStorage.setItem('id', response.data.userId);
          navigate('/quest');
        }).catch(error => {
          console.log(error);
        });
      }
    };

    return(
        <div className="registration-section" id="register">
            <Container  sx={{pt: 15}} maxWidth="xs">
                <Typography variant="h4" className="form-title">Registration</Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} maxWidth="sm">
                    <ThemeProvider theme={customTheme(outerTheme)} >
                        <TextField label="First Name" margin="normal" 
                        fullWidth required value={fname} onChange={handleFNameChange} error={fnameError}
                        helperText={fnameError ? "Please enter your first name.": ""}
                        name="fname" />
                    </ThemeProvider>

                    <ThemeProvider theme={customTheme(outerTheme)} >
                        <TextField label="Last Name" margin="normal" 
                        fullWidth required value={lname} onChange={handleLNameChange} error={lnameError}
                        helperText={lnameError ? "Please enter your last name.": ""} 
                        name="lname"/>
                    </ThemeProvider>

                    <ThemeProvider theme={customTheme(outerTheme)} >
                        <TextField  label="Email" type="email" margin="normal" fullWidth name="email" />
                    </ThemeProvider>

                    <ThemeProvider theme={customTheme(outerTheme)} >
                        <TextField label="Phone Number" margin="normal" fullWidth name="phone" />
                    </ThemeProvider>

                    <ThemeProvider theme={customTheme(outerTheme)} >
                      <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label" sx={{color: "#543457"}}>Gender</FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="gender"
                          onChange={(e) => setAge(e.target.value)}
                          row
                        >
                          <FormControlLabel value="female" control={<Radio sx={{color: "#543457",'&.Mui-checked': {color: "#3E0758",},}} />} label={<Typography color={"#543457"}>Female</Typography>} />
                          <FormControlLabel value="male" control={<Radio sx={{color: "#543457",'&.Mui-checked': {color: "#3E0758",},}} />} label={<Typography color={"#543457"}>Male</Typography>} />
                        </RadioGroup>
                      </FormControl>
                    </ThemeProvider>

                    <ThemeProvider theme={customTheme(outerTheme)} >
                        <TextField label="age" margin="normal" fullWidth name="age" type="number" />
                    </ThemeProvider>

                    <Button variant='contained' type="submit" sx={{ mt: 3 }} style={{backgroundColor:"#3E0758"}} fullWidth >Next</Button>
                </Box>
            </Container>
        </div>
    );
}