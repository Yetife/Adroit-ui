import {useEffect, useState} from 'react';
import {createTheme, Step, StepButton, Stepper, ThemeProvider} from "@mui/material";
import themes from "../reusables/theme.jsx";
import {useNavigate} from "react-router-dom";
const ClientTimeLineComponent = ({steps, index, placement}) => {
    const searchParams = new URLSearchParams(window.location.search);
    const router = useNavigate()
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return index === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    // const handleNext = () => {
    //     const newActiveStep =
    //         isLastStep() && !allStepsCompleted()
    //             ? // It's the last step, but not all steps have been completed,
    //               // find the first step that has been completed
    //             steps.findIndex((step, i) => !(i in completed))
    //             : index + 1;
    //     setActiveStep(newActiveStep);
    // };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[index] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    const gotoStep = (step) => {
        // step === `Create form` || step === `Create interview` ? step = `Create assessment` : step
        searchParams.set('step', placement[step]);
        router({
            search:searchParams.toString()
        })
    };
    useEffect(() => {
        handleNext()
    }, [index]);

    const themeStyle = createTheme({
        components: {
            MuiStepIcon: {
                styleOverrides: {
                    root: {
                        '&.Mui-active': {
                            color: '#00C795',
                        },
                    },
                },
            },
        },
    });
    return (
        <div>
            <Stepper nonLinear activeStep={index}>
                {steps.map((label, i) => (
                    <Step key={i} completed={completed[i < index]}>
                        <ThemeProvider theme={themeStyle}>
                            <StepButton onClick={()=>gotoStep(label.name)}>
                                <p className={`${i < index ? "text-[#00C795]" : ""}`}>
                                    {label.name}
                                </p>
                            </StepButton>
                        </ThemeProvider>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
};

export default ClientTimeLineComponent;