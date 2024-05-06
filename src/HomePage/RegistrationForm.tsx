import { Box, Button, Container, CssBaseline, TextField, Theme, ThemeProvider, Typography, createTheme, outlinedInputClasses, useTheme } from "@mui/material";
import "./HomePage.css";

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
              '--TextField-brandBorderHoverColor': '#4b1449',
              '--TextField-brandBorderFocusedColor': '#4b1449',
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => (console.log(event));

    return(
        <div className="registration-section">
            <Container  sx={{pt: 15}} maxWidth="xs">
                <Typography variant="h4" className="form-title">Registration</Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} maxWidth="sm">
                    <ThemeProvider theme={customTheme(outerTheme)} >
                        <TextField label="First Name" margin="normal" fullWidth />
                    </ThemeProvider>

                    <ThemeProvider theme={customTheme(outerTheme)} >
                        <TextField label="Last Name" margin="normal" fullWidth />
                    </ThemeProvider>


                    <ThemeProvider theme={customTheme(outerTheme)} >
                        <TextField label="Phone Number" margin="normal" fullWidth />
                    </ThemeProvider>

                    <ThemeProvider theme={customTheme(outerTheme)} >
                        <TextField  label="Age" margin="normal" fullWidth />
                    </ThemeProvider>

                    <Button variant='contained' type="submit" sx={{ mt: 3 }} style={{backgroundColor:"#4b1449"}} fullWidth >Next</Button>
                </Box>
            </Container>
        </div>
    );
}