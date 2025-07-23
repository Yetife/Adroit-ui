import {useEffect, useState} from 'react';
import logo from '../../assets/logo.png';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {
    GridItem,
    Button,
    SimpleGrid,
    Stack,
    Text,
    IconButton,
    extendTheme
} from "@chakra-ui/react";
import {Link as ReactLink, useNavigate} from 'react-router-dom';
import {FormControl, InputAdornment, OutlinedInput, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
// import {validateUser} from "../../services/api/apiService.js";
import axios, {Axios} from "axios";
import {useValidateUserMutation} from "../../store/features/user/api.js";

export const theme = extendTheme({
    colors: {
        brand: {
            50: '#f7fafc',
            500: '#718096',
            900: '#171923',
        }
    }
})

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const route = useNavigate()
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    })
    const [validateUser] = useValidateUserMutation()
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleChange = (event, fieldName) => {
        const { value, name } = event.target;
        setInputs((values) => ({ ...values, [fieldName]: value }));
    };

    useEffect(()=>{
        sessionStorage.clear()
    },[])

    const handleRoute = () => {
        window.location.href = `${import.meta.env.VITE_APP_PASSWORD_RECOVERY_URL}/?id=${import.meta.env.VITE_APP_CLIENT_ID}`;
    }

    const handleClick = ()=> {
        if (!inputs.username || !inputs.password) {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:"Username and Password is required",success:false}));
        }else{
            setLoading(true)
            validateUser({
                body: {
                    username: inputs.username,
                    userPassword: inputs.password,
                    ipAddress: "192.168.1.100",
                    latitude: "-123.4567",
                    longitude: "45.6789",
                    applicationId: import.meta.env.VITE_APP_APPLICATION_ID,
                    clientId: import.meta.env.VITE_APP_CLIENT_ID
                }
            }).then(res => {
                sessionStorage.setItem("userOtp", JSON.stringify(res.data.id));
                sessionStorage.setItem("userDetails", JSON.stringify(inputs));
                if (res.data.statusCode === 200){
                    dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:res.data.message,success:true}));
                    route('/verify')
                }else{
                    dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:res.data.message,success:false}));
                    setLoading(false)
                }
            }).catch(err =>{
                setLoading(false)
                dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:"error",success:false}));
            })
        }
    }

    return (
        <div className="flex min-h-screen">
            <SimpleGrid columns={{ base: 6, md: 12 }} spacing={12}>
                <GridItem colSpan={{ base: 6, md: 6 }} display={{ base: 'none', md: 'block' }}>
                    <Stack p={{ md:"91px 165px 835px 120px"}} h="100vh" flexDirection={"column"} className="firstRow">
                        <Text className="text">Adroit</Text>
                        <Text className="firstRow-p">We evaluate and monitor the non-performing loan accounts and implement a recovery action plan to achieve timely
                            and maximum recovery at a minimal cost and appropriate turn-around time through acceptable common practices
                            aligned with legal framework and standards.</Text>
                    </Stack>
                </GridItem>
                <GridItem colSpan={{ base: 6, md: 6 }}>
                    <Stack className="items-center justify-center md:my-36 my-24 flex flex-col md:w-auto m-auto;">
                        <img alt={"logo"} src={logo}/>
                        <Stack>
                            <Stack m={{base: "45px 20px 0", md: "60px 0 0"}}>
                                <TextField size="medium" value={inputs.userName} variant="outlined"
                                           onChange={(e) => handleChange(e, "username")}
                                           placeholder="Username" className="w-[464px]"/>
                            </Stack>
                            <Stack m={{base: "20px 20px", md: "25px 0px"}}>
                                <FormControl className="w-[464px]">
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        value={inputs.password}
                                        placeholder="Password"
                                        onChange={(e) => handleChange(e, "password")}
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Stack>
                            <Stack m={{base: "25px 20px", md: "10px 0px"}}>
                                <Button variant="primary" bgColor="#00C795" height="50px" size='md' as={ReactLink}
                                        isLoading={loading} isDisabled={true} colorScheme={"brand"}
                                        loadingText='Submitting' onClick={handleClick}>
                                    <Text color="white">Login</Text>
                                </Button>
                            </Stack>
                            <p className=" text-[16px] text-center font-medium">Forgot password?<span
                                style={{color: "#00C795"}} className="cursor-pointer font-semibold pl-1"
                                onClick={handleRoute}>Click here</span></p>

                            <div className="mt-40">
                                <p className='text-[13px] text-[#135D54] font-[500] text-center'>
                                    &copy; {new Date().getFullYear()}{" "}
                                    <a href="mailto:sheisfinancials@gmail.com" className="underline hover:text-[#0b3f38]">
                                        STILL
                                    </a>{" "}
                                    | All Rights Reserved
                                </p>
                            </div>
                        </Stack>
                    </Stack>
                </GridItem>
            </SimpleGrid>
        </div>
    );
};
export default Login;

