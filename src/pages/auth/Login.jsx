import {useEffect, useState} from 'react';
import logo from '../../assets/logo.svg';
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

    const handleClick = ()=> {
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
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:"Login successful",success:true}));
            route('/verify')
        }).catch(err =>{
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:"error",success:false}));
            setLoading(false)
        })
    }

    return (
        <div>
            <SimpleGrid columns={{ base: 6, md: 12 }} spacing={12}>
                <GridItem colSpan={{ base: 6, md: 6 }} display={{ base: 'none', md: 'block' }}>
                    <Stack p={{ md:"91px 165px 635px 120px"}} h="100vh" flexDirection={"column"} className="firstRow">
                        <Text className="text">Adroit</Text>
                        <Text className="firstRow-p">We evaluate and monitor the non-performing loan accounts and implement a recovery action plan to achieve timely
                            and maximum recovery at a minimal cost and appropriate turn-around time through acceptable common practices
                            aligned with legal framework and standards.</Text>
                    </Stack>
                </GridItem>
                <GridItem colSpan={{ base: 6, md: 6 }}>
                    <Stack className="items-center justify-center md:my-64 my-24 flex flex-col md:w-auto m-auto;">
                        <img alt={"logo"} src={logo}/>
                        <Stack>
                            <Stack m={{base:"45px 20px 0", md: "60px 0 0"}}>
                                <TextField size="medium" value={inputs.userName} variant="outlined"
                                           onChange={(e)=>handleChange(e, "username")}
                                           placeholder="Username" className="w-[464px]"/>
                            </Stack>
                            <Stack m={{base:"20px 20px", md: "25px 0px"}}>
                                <FormControl className="w-[464px]">
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        value={inputs.password}
                                        onChange={(e)=>handleChange(e, "password")}
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Stack>
                            <Stack m={{base:"25px 20px", md: "25px 0px"}}>
                                <Button variant="primary" bgColor="#00C795" height="50px" size='md' as={ReactLink} isLoading={loading} isDisabled={true} colorScheme={"brand"} loadingText='Submitting' onClick={handleClick}>
                                    <Text color="white">Login</Text>
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </GridItem>
            </SimpleGrid>
        </div>
    );
};
export default Login;

